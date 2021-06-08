import {Game} from '../models/game';

export interface GameState {
  loading: boolean;
  game: Game;
}
