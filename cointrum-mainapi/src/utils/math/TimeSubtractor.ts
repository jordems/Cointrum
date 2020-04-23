import { ICycleDurations } from "../../types/exchange";

export default function subtractTime(
  date: number,
  interval: ICycleDurations,
  multiplier?: number
): number {
  let mul = multiplier ? multiplier : 1;

  if (interval.includes("m")) {
    const newDate = date;

    return (
      newDate - 60000 * parseInt(interval.substr(0, interval.length - 1)) * mul
    );
  } else if (interval.includes("h")) {
    const newDate = date;

    return (
      newDate -
      3600000 * parseInt(interval.substr(0, interval.length - 1)) * mul
    );
  } else if (interval.includes("d")) {
    const newDate = date;

    return (
      newDate -
      86400000 * parseInt(interval.substr(0, interval.length - 1)) * mul
    );
  }

  return date;
}
