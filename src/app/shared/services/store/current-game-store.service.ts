import {Injectable} from '@angular/core';
import {StoreService} from './store.service';
import {GameState} from '../../states/game-state';
import {Game} from '../../models/game';

@Injectable({
  providedIn: 'root'
})
export class CurrentGameStore extends StoreService<GameState> {
  protected store = 'currentGame';

  constructor() {
    super({
      loading: true,
      game: {} as Game,
    });
  }
}

