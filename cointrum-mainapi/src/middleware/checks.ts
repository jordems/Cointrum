import { Request, Response, NextFunction } from "express";
import { HTTP400Error } from "../utils/httpErrors";

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
