import { IPHDSElement } from "models";

export function getPriceDisplayFormat(phdselement: IPHDSElement): string {
  const openValue = phdselement.open;

  const numberParts = openValue.toString().split(".");

  if (numberParts.length > 1) {
    const decimalPlaces = openValue.toString().split(".")[1].length;
    return `.${decimalPlaces}f`;
  } else {
    return ".0f";
  }
}
