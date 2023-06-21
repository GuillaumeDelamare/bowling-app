import { Score } from './score.model';

export class Partie {
  public quille: number;

  public step: number;

  public lancer: number;

  public score: Score[];

  public scoreTotal: number;

  constructor() {
    this.quille = 10;
    this.score = [];
    this.step = 0;
    this.lancer = 0;
    this.scoreTotal = 0;
  }

  public estTermine(): boolean {
    return this.step === 9
  }
}
