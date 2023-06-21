import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Partie } from 'src/app/models/partie.model';
import { BowlingService } from 'src/app/services/bowling-service';

@Component({
  selector: 'app-controle',
  templateUrl: './controle.component.html',
  styleUrls: ['./controle.component.css'],
})
export class ControleComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();

  estTermine: boolean;

  constructor(private bowlingService: BowlingService) {
    this.estTermine = this.bowlingService.getEstTermine();
  }

  ngOnInit(): void {
    this.bowlingService
      .getUpdatePartie()
      .pipe(takeUntil(this.destroy$))
      .subscribe((partie: Partie) => {
        this.estTermine = partie.estTermine();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next('destroy');
    this.destroy$.complete();
  }

  lancer(): void {
    this.bowlingService.lancer();
  }

  nouvellePartie(): void {
    this.bowlingService.nouvellePartie();
  }
}
