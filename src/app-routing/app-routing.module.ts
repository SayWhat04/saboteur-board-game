import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../app/core/authentication/auth.guard';
import {HomeComponent} from '../app/modules/home/components/home.component';
import {GameComponent} from '../app/modules/game-instance/game/components/game.component';
import {GameLobbyComponent} from '../app/modules/game-lobby/components/game-lobby.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'game/:id', component: GameComponent, canActivate: [AuthGuard] },
  { path: 'lobby/:id', component: GameLobbyComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
