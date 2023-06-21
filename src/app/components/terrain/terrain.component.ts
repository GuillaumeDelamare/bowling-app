import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Partie } from 'src/app/models/partie.model';
import { BowlingService } from 'src/app/services/bowling-service';

@Component({
  selector: 'app-terrain',
  templateUrl: './terrain.component.html',
  styleUrls: ['./terrain.component.css']
})
export class TerrainComponent implements OnInit, OnDestroy {
  nombreQuilles = 0;

  private readonly destroy$ = new Subject();

  constructor(private bowlingService: BowlingService) {
    this.nombreQuilles = this.bowlingService.getQuille();
  }

  ngOnDestroy(): void {
    this.destroy$.next('destroy');
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.watchPartie();
  }

  watchPartie() {
    this.bowlingService
      .getUpdatePartie()
      .pipe(takeUntil(this.destroy$))
      .subscribe((partie: Partie) => (this.nombreQuilles = partie.quille));
  }
}
