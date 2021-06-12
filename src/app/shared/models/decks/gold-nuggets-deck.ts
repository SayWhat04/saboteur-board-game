import {Deck} from './deck';
import {GoldNuggetCard} from '../cards/gold-nugget-card';
import {CardType} from '../cards/card-type-property.enum';
import {IMAGES_PATH} from '../../../configs/game-specific-const';

export class GoldNuggetsDeck extends Deck<GoldNuggetCard> {
  constructor(cards?) {
    super(cards);
  }

  fillDeck(): void {
    for (let i = 0; i < 16; i++) {
      this.cards.push(new GoldNuggetCard(CardType.GOLD_NUGGET_CARD, 1, `${IMAGES_PATH}single_gold.png`));
    }
    for (let i = 0; i < 8; i++) {
      this.cards.push(new GoldNuggetCard(CardType.GOLD_NUGGET_CARD, 2, `${IMAGES_PATH}double_gold.png`));
    }
    for (let i = 0; i < 4; i++) {
      this.cards.push(new GoldNuggetCard(CardType.GOLD_NUGGET_CARD, 3, `${IMAGES_PATH}triple_gold.png`));
    }
  }
}

