import ICandle from "../../markets/types/ICandle";

export type IBaseIndicator = (
  elements: ICandle[],
  extraelements: ICandle[]
) => ICandle[];
