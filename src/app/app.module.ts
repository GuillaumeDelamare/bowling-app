import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ControleComponent } from './components/controle/controle.component';
import { TerrainComponent } from './components/terrain/terrain.component';
import { TableauScoreComponent } from './components/score/tableau-score.component';

@NgModule({
  declarations: [
    AppComponent,
    TerrainComponent,
    TableauScoreComponent,
    ControleComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
