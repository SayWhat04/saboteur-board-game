import {Game} from '../models/game';

export interface GamesState {
  loading: boolean;
  games: Game[];
}
