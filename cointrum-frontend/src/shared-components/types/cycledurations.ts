export const cycledurations = [
  "30s",
  "1m",
  "5m",
  "30m",
  "1h",
  "6h",
  "12h",
  "1d",
  "7d",
  "30d"
] as const;

export type ICycleDurations = typeof cycledurations[number];
