import { Request, Response, NextFunction } from "express";
import { HTTP400Error } from "../utils/httpErrors";
import {
  altcurrencies,
  basecurrencies,
  cycledurations,
  exchanges,
  IExchanges,
} from "../types/exchange";

export const checkSearchParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.query.q) {
    throw new HTTP400Error("Missing q parameter");
  } else {
    next();
  }
};

export const checkCreationHubParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next();
};

export const checkLearningHubParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.params.tradingmapid) {
    throw new HTTP400Error("Missing tradingmapid path parameter");
  } else {
    next();
  }
};

export const checkLearningHubLabelsParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.params.tradingmapid) {
    throw new HTTP400Error("Missing tradingmapid path parameter");
  } else if (!req.params.labelid) {
    throw new HTTP400Error("Missing labelid path parameter");
  } else {
    next();
  }
};

export const checkTradingHubParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.params.tradingmapid) {
    throw new HTTP400Error("Missing tradingmapid path parameter");
  } else {
    next();
  }
};

export const checkTradingHubClassifierParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.params.tradingmapid) {
    throw new HTTP400Error("Missing tradingmapid path parameter");
  } else if (!req.params.classifierid) {
    throw new HTTP400Error("Missing classifierid path parameter");
  } else {
    next();
  }
};

export const checkphdsParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    !req.params.exchange ||
    !exchanges.includes(req.params.exchange as IExchanges)
  ) {
    throw new HTTP400Error("Missing tradingmapid path parameter");
  } else if (
    !req.query.basecurrency &&
    !basecurrencies.includes(req.query.basecurrency)
  ) {
    throw new HTTP400Error("Missing/Invalid BaseCurrency query parameter");
  } else if (
    !req.query.altcurrency &&
    !altcurrencies.includes(req.query.altcurrency)
  ) {
    throw new HTTP400Error("Missing/Invalid AltCurrency query parameter");
  } else if (
    !req.query.interval &&
    !cycledurations.includes(req.query.interval)
  ) {
    throw new HTTP400Error("Missing/Invalid interval query parameter");
  } else if (
    req.query.start &&
    (req.query.start > Date.now() || req.query.start < 1494572400000)
  ) {
    throw new HTTP400Error("start time out of range");
  } else if (
    req.query.end &&
    (req.query.end > Date.now() || req.query.start < 1494572400000)
  ) {
    throw new HTTP400Error("end time out of range");
  } else {
    next();
  }
};
