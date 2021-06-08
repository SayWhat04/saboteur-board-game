import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {GameLobbyComponent} from './components/game-lobby.component';


@NgModule({
  declarations: [
    GameLobbyComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    GameLobbyComponent
  ],
  entryComponents: [],
  providers: []
})
export class GameLobbyModule {
}
