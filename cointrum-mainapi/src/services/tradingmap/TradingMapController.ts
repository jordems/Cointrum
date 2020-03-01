import { ITradingMap } from "../../models/TradingMap";
import TradingMap from "../../models/TradingMap";
import { Request, Response } from "express";

export class TradingMapController {
  public getTradingMaps(req: Request, res: Response) {
    TradingMap.find({}, (err, tradingMaps) => {
      if (err) {
        res.status(400).send(err);
      }
      res.json(tradingMaps);
    });
  }

  public createTradingMap({ body }: Request, res: Response) {
    const newTradingMap: ITradingMap = new TradingMap(body);

    newTradingMap.save((err, tradingMap) => {
      if (err) {
        res.status(400).send(err);
      }
      res.json(tradingMap);
    });
  }

  public getTradingMapbyID({ params }: Request, res: Response) {
    TradingMap.findById(params.tradingmapid, (err, contact) => {
      if (err) {
        res.send(err);
      }
      res.json(contact);
    });
  }
  public editTradingMap({ params, body }: Request, res: Response) {
    TradingMap.findByIdAndUpdate(
      params.tradingmapid,
      body,
      { new: true },
      (err, updatedTradingMap) => {
        if (err) {
          res.send(err);
        } else if (updatedTradingMap == null) {
          res.json({
            updated: false,
            message: "Didn't Find Document to Delete"
          });
        } else {
          res.json(updatedTradingMap);
        }
      }
    );
  }

  public removeTradingMap({ params }: Request, res: Response) {
    TradingMap.findByIdAndRemove(
      params.tradingmapid,
      (err, removedTradingMap) => {
        if (err) {
          res.send(err);
        } else if (removedTradingMap == null) {
          res.json({
            removed: false,
            message: "Didn't Find Document to Delete"
          });
        } else {
          res.json({ removed: true, message: "Successfully deleted contact!" });
        }
      }
    );
  }
}
