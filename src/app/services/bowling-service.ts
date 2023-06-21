import { Injectable } from '@angular/core';
import { Partie } from '../models/partie.model';
import { Observable, Subject } from 'rxjs';
import { Score } from '../models/score.model';

@Injectable({
  providedIn: 'root',
})
export class BowlingService {
  private partie = new Partie();

  private subjectPartie = new Subject<Partie>();

  public nouvellePartie(): void {
    this.partie = new Partie();

    this.subjectPartie.next(this.partie);
  }

  public lancer(): void {
    console.info('Step %d, lancé %d', this.partie.step, this.partie.lancer);

    const quilleTombee = this.faireTomberQuille();
    this.ajouterScore(quilleTombee);
    this.partie.scoreTotal = this.calculerTotalSteps(this.partie.step);

    // Mise à jour de la partie
    if (
      (this.partie.lancer < 1 && this.partie.quille > 0) ||
      (this.partie.step == 10 && this.partie.lancer < 2)
    ) {
      this.partie.lancer++;
    } else {
      this.changerStep();
    }

    this.subjectPartie.next(this.partie);
  }

  private faireTomberQuille(): number {
    const quilleTombee = Math.round(Math.random() * this.partie.quille);
    this.partie.quille = this.partie.quille - quilleTombee;

    console.info(
      'Quille tombée : %d, Il reste %d quille(s)',
      quilleTombee,
      this.partie.quille
    );

    return quilleTombee;
  }

  private changerStep(): void {
    this.partie.step++;
    this.partie.quille = 10;
    this.partie.lancer = 0;
  }

  private ajouterScore(quilleTombee: number): void {
    if (this.partie.lancer == 0) {
      this.partie.score.push(new Score(quilleTombee));
    } else {
      const score = this.partie.score[this.partie.step];

      if (this.partie.lancer == 1) {
        score.lancerDeux = quilleTombee;
      } else {
        score.lancerTrois = quilleTombee;
      }
    }
  }

  private calculerTotalSteps(step: number): number {
    const score = this.partie.score[step];
    const totalLocal =
      score.lancerUn + (score.lancerDeux ?? 0) + (score.lancerTrois ?? 0);

    if (score.lancerUn === 10) {

      score.total =
        totalLocal +
        (this.partie.score[step + 1] ? this.partie.score[step + 1].total : 0) +
        (this.partie.score[step + 2] ? this.partie.score[step + 2].total : 0);
    } else if (score.lancerUn + (score.lancerDeux ?? 0) == 10) {
      score.total =
        totalLocal +
        (this.partie.score[step + 1] ? this.partie.score[step + 1].total : 0);
    } else {
      score.total = totalLocal;
    }

    if (step > 0) {
      return score.total + this.calculerTotalSteps(step - 1);
    } else {
      return score.total;
    }
  }

  getQuille(): number {
    return this.partie.quille;
  }

  getScore(): Score[] {
    return this.partie.score;
  }

  getScoreTotal(): number {
    return this.partie.scoreTotal;
  }

  getEstTermine() {
    return this.partie.estTermine();
  }

  getUpdatePartie(): Observable<Partie> {
    return this.subjectPartie.asObservable();
  }
}
