import ICandle from "../../markets/types/ICandle";
import { IPHDSElement } from "../../../models/PHDSElement";

export type IBaseIndicator = (
  candles: ICandle[],
  lastknowndocument?: IPHDSElement
) => ICandle[];
