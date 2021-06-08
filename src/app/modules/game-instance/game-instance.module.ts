import {NgModule} from '@angular/core';
import {PlayerHandComponent} from './player-hand/components/player-hand.component';
import {BoardComponent} from './board/components/board.component';
import {PlayersComponent} from './players/components/players.component';
import {ChatComponent} from './chat/components/chat.component';
import {GameStateComponent} from './game-state/components/game-state.component';
import {SharedModule} from '../../shared/shared.module';
import {GameComponent} from './game/components/game.component';
import {DropToBoardActionService} from './board/services/drop-to-board-action.service';
import {DropToPlayerPredicateService} from './players/services/drop-to-player-predicate.service';
import {DropToPlayersActionService} from './players/services/drop-to-players-action.service';
import {DropToBoardPredicateService} from './board/services/drop-to-board-predicate.service';
import {DropToDiscardPileActionService} from './game-state/services/drop-to-discard-pile-action.service';
import {DropToPlayerHandActionService} from './player-hand/services/drop-to-player-hand-action.service';

@NgModule({
  declarations: [
    BoardComponent,
    PlayerHandComponent,
    ChatComponent,
    GameStateComponent,
    PlayersComponent,
    GameComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    BoardComponent,
    PlayerHandComponent,
    ChatComponent,
    GameStateComponent,
    PlayersComponent,
    GameComponent
  ],
  entryComponents: [],
  providers: [
    DropToBoardActionService,
    DropToBoardPredicateService,
    DropToPlayersActionService,
    DropToPlayerPredicateService,
    DropToDiscardPileActionService,
    DropToPlayerHandActionService
  ]
})
export class GameInstanceModule {
}
