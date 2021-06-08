import {ActionCardType} from './action-card-type-property.enum';
import {Card} from './card';
import {CardType} from './card-type-property.enum';

export class ActionCard extends Card {
  constructor(
    public cardType: CardType,
    public type: ActionCardType,
    public imagePath?: string) {
    super(cardType, imagePath);
  }
}
