export const cycledurations = [
  "1m",
  "3m",
  "5m",
  "15m",
  "30m",
  "1h",
  "2h",
  "4h",
  "6h",
  "8h",
  "12h",
  "1d",
  "3d",
  "1w",
  "1M",
] as const;

export type ICycleDurations = typeof cycledurations[number];

export function intervalToMS(interval: ICycleDurations) {
  switch (interval) {
    case "1m":
      return 60000;
    case "3m":
      return 60000 * 3;
    case "5m":
      return 60000 * 5;
    case "15m":
      return 60000 * 15;
    case "30m":
      return 60000 * 30;
    case "1h":
      return 60000 * 60;
    case "2h":
      return 60000 * 60 * 2;
    case "4h":
      return 60000 * 60 * 4;
    case "6h":
      return 60000 * 60 * 6;
    case "8h":
      return 60000 * 60 * 8;
    case "12h":
      return 60000 * 60 * 12;
    case "1d":
      return 60000 * 60 * 24;
    case "3d":
      return 60000 * 60 * 24 * 3;
    case "1w":
      return 60000 * 60 * 24 * 7;
    case "1M":
      return 60000 * 60 * 24 * 30;
  }
}
