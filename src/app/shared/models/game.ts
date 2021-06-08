import {Player} from './player';
import {Card} from './cards/card';
import {Board} from './board/board';
import {DbBoard} from './board/db-board';
import {GoldNuggetCard} from './cards/gold-nugget-card';

export interface Game {
  boardState: Board | DbBoard;
  chatId: string;
  createdAt: number;
  currentPlayerIndex: number;
  deckState: Card[];
  discardPileState: Card[];
  finished: boolean;
  gameHost: string;
  maxNumberOfPlayers: number;
  name: string;
  players: Player[];
  roundNumber: number;
  started: boolean;
  goldNuggetsDeckState: GoldNuggetCard[];
}
