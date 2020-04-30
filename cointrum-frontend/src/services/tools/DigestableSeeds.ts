import { ILabel, ICreateSeed } from "models";

export function getDigestableSeeds(
  labels: {
    [labelid: string]: ILabel;
  },
  seedsbyLabel: {
    [labelid: string]: {
      [tempseedid: string]: ICreateSeed;
    };
  }
): { label: ILabel; seed: ICreateSeed }[] {
  let seedsnlabeles: { label: ILabel; seed: ICreateSeed }[] = [];

  for (const labelinseedbylabel of Object.keys(seedsbyLabel)) {
    for (const seed of Object.values(seedsbyLabel[labelinseedbylabel])) {
      seedsnlabeles.push({ label: labels[labelinseedbylabel], seed: seed });
    }
  }

  return seedsnlabeles;
}
