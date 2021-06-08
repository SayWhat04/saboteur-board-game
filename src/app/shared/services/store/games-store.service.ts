import {Injectable} from '@angular/core';
import {GamesState} from '../../states/games-state';
import {StoreService} from './store.service';

@Injectable({
  providedIn: 'root'
})
export class GamesStore extends StoreService<GamesState> {
  protected store = 'games';

  constructor() {
    super({
      loading: true,
      games: [],
    });
  }
}
