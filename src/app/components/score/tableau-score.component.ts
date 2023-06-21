import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Partie } from 'src/app/models/partie.model';
import { Score } from 'src/app/models/score.model';
import { BowlingService } from 'src/app/services/bowling-service';

@Component({
  selector: 'app-tableau-score',
  templateUrl: './tableau-score.component.html',
  styleUrls: ['./tableau-score.component.css'],
})
export class TableauScoreComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();

  scores: Score[];

  scoreTotal: number;

  constructor(private bowlingService: BowlingService) {
    this.scores = bowlingService.getScore();
    this.scoreTotal = bowlingService.getScoreTotal();
  }

  ngOnInit(): void {
    this.bowlingService
      .getUpdatePartie()
      .pipe(takeUntil(this.destroy$))
      .subscribe((partie: Partie) => {
        this.scores = partie.score;
        this.scoreTotal = partie.scoreTotal;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next('destroy');
    this.destroy$.complete();
  }
}
