import {Card} from './card';
import {CardType} from './card-type-property.enum';

export class GoldNuggetCard extends Card {
  constructor(
    public cardType: CardType,
    public value: number,
    public imagePath?: string) {
    super(cardType, imagePath);
  }
}
