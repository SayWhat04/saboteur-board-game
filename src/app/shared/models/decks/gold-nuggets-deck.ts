import {Deck} from './deck';
import {GoldNuggetCard} from '../cards/gold-nugget-card';
import {CardType} from '../cards/card-type-property.enum';

export class GoldNuggetsDeck extends Deck<GoldNuggetCard> {
  constructor(cards?) {
    super(cards);
  }

  fillDeck(): void {
    for (let i = 0; i < 16; i++) {
      this.cards.push(new GoldNuggetCard(CardType.GOLD_NUGGET_CARD, 1, '/assets/images/single_gold.png'));
    }
    for (let i = 0; i < 8; i++) {
      this.cards.push(new GoldNuggetCard(CardType.GOLD_NUGGET_CARD, 2, '/assets/images/double_gold.png'));
    }
    for (let i = 0; i < 4; i++) {
      this.cards.push(new GoldNuggetCard(CardType.GOLD_NUGGET_CARD, 3, '/assets/images/triple_gold.png'));
    }
  }
}

