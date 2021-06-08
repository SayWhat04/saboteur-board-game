import {Card} from './cards/card';
import {PlayerRole} from './player-role.enum';
import {GoldNuggetCard} from './cards/gold-nugget-card';

export class Player {
  constructor(
    public name: string,
    public cardsInHand: Card[],
    public actionsCardUsedOnPlayer: Card[],
    public isActive: boolean,
    public isLampValid: boolean,
    public isCartValid: boolean,
    public isPickaxeValid: boolean,
    public playerRole: PlayerRole,
    public collectedGold: GoldNuggetCard[],
    public uid?: string) {
  }
}
