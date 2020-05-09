import GenericController from "../../utils/GenericController";
import PHDSElement, { IPHDSElement } from "../../models/PHDSElement";

import IMarket from "../../utils/markets/IMarket";
import subtractTime from "../../utils/math/TimeSubtractor";
import { IndicatorDecorator } from "../../utils/math/IndicatorDecorator";
import ICandle from "../../utils/markets/types/ICandle";
import APIMarketConsumer from "../../utils/markets/APIMarketConsumer";
import ICurrencyPair from "../../types/ICurrencyPair";

export default class PHDSController extends GenericController<IPHDSElement> {
  private currencyPair: ICurrencyPair;
  constructor(currencyPair: ICurrencyPair) {
    super(PHDSElement(currencyPair));

    this.currencyPair = currencyPair;
  }

  async getPHDS(start?: number, end?: number): Promise<IPHDSElement[]> {
    // By default set startTime for last interval (current time - interval)
    const currentTime = new Date().getTime(); // in UTC milliseconds

    const startTime = start
      ? start
      : subtractTime(currentTime, this.currencyPair.interval);

    const endTime = end ? end : currentTime;

    // First check if current Info is in db
    const results = await this.getExistingDBResults(startTime, endTime);

    // Check if there is any missing zones in data
    let missingZones = this.findMissingZones(results, startTime, endTime);

    if (missingZones.length === 0) {
      return results;
    } else {
      // ELSE Fill mongo with data upto and including current current query. Then return current query
      let lastKnownDocuments = await this.queryDocuments({}, { _id: -1 }, 30);
      lastKnownDocuments = lastKnownDocuments.reverse();

      let marketAPIConsumer = APIMarketConsumer.getInstance(
        this.currencyPair.exchange
      );

      try {
        const candleSections = await marketAPIConsumer.findSectionfromHistoricalData(
          this.currencyPair,
          endTime,
          lastKnownDocuments
        );

        let finalresults: IPHDSElement[] = [...results];

        let batches: IPHDSElement[][] = [];

        for (const section of candleSections) {
          let batch: any[] = [];
          for (const candle of section) {
            batch.push({
              _id: candle.openTime,
              ...candle,
            });
          }
          batches.push(batch);
        }

        const condition = (section: IPHDSElement[]): boolean => {
          if (section[0] && section[0].openTime > startTime) {
            return true;
          } else {
            return false;
          }
        };

        const batchresults = await this.insertMultipleBatches(
          batches,
          condition
        );

        finalresults = [...finalresults, ...batchresults];

        //const sections = await Promise.all(sectionPromises);

        // Not with additional zones added, Resort the result array
        //freshresults.sort((a, b) => a._id - b._id);
        console.log("end");
        if (!start && finalresults.length === 0) {
          // if binance doesn't have any now, pull an earlier interval
          return this.getPHDS(
            subtractTime(startTime, this.currencyPair.interval),
            endTime
          );
        } else {
          return finalresults;
        }
      } catch (e) {
        console.log(e);
        throw new Error(e);
      }
    }
  }

  private getExistingDBResults(start?: number, end?: number) {
    let query: any = {
      _id: { $gte: start },
    };

    if (end) {
      query = {
        ...query,
        closeTime: { $lte: end },
      };
    }

    return this.queryDocuments(query);
  }

  findMissingZones(
    phdselements: IPHDSElement[],
    start: number,
    end: number
  ): Array<[number, number]> {
    if (phdselements.length === 0) {
      return [[start, end]];
    }

    let untouchedZones: Array<[number, number]> = [];
    let startidx = 0;
    let currentValue = phdselements[0];

    // Check for Missing Zone from Start to first Element
    if (
      start < subtractTime(currentValue.openTime, this.currencyPair.interval)
    ) {
      untouchedZones.push([start, currentValue.openTime - 1]);
    }

    // Find Missing Sections between PHDS Elements
    for (let x = 1; x < phdselements.length; x++) {
      const nextValue = phdselements[x];

      if (nextValue.openTime === currentValue.closeTime + 1) {
        startidx = x;
      } else {
        untouchedZones.push([
          phdselements[startidx].closeTime + 1,
          nextValue.openTime - 1,
        ]);
      }
      currentValue = nextValue;
    }

    // Add Section from after last PHDS Element to `end`
    if (
      end &&
      currentValue.closeTime < subtractTime(end, this.currencyPair.interval)
    ) {
      untouchedZones.push([currentValue.closeTime + 1, end - 1]);
    }

    return untouchedZones;
  }
}
