import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { NumberGame } from './number-game/number-game';
import { PaintGame } from './paint-game/paint-game';
import { WaterGame } from './water-game/water-game';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'number-game', component: NumberGame },
  { path: 'paint-game', component: PaintGame },
  { path: 'water-game', component: WaterGame },
];
