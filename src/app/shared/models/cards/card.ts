import {CardType} from './card-type-property.enum';

export class Card {
  constructor(public cardType: CardType, public imagePath?: string) {
  }
}
