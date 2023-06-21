export class Score {
  public lancerUn: number;
  public lancerDeux?: number;
  public lancerTrois?: number;

  public total: number;

  constructor(lancerUn: number) {
    this.lancerUn = lancerUn;
    this.total = 0;
  }
}
