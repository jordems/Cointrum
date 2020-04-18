export interface ICreateSeed {
  tempid: string;
  data: {
    start: { timestamp: any };
    end: { timestamp: any };
    max: number;
  };
}
