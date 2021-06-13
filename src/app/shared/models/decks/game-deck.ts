import {Deck} from './deck';
import {PathCard} from '../cards/path-card';
import {PathCardSide} from '../cards/path-card-side-property.enum';
import {ActionCard} from '../cards/action-card';
import {ActionCardType} from '../cards/action-card-type-property.enum';
import {CardType} from '../cards/card-type-property.enum';
import {Card} from '../cards/card';
import {IMAGES_PATH} from '../../../configs/game-specific-const';

export class GameDeck extends Deck<Card> {
  constructor() {
    super();
  }

  fillDeck(): void {
    /*
    this.cards.push(new PathCard(CardType.PATH_CARD, PathCardSide.CLOSED, PathCardSide.OPENED, PathCardSide.CLOSED, PathCardSide.OPENED,
      false, false, `${IMAGES_PATH}1.png`, `${IMAGES_PATH}1_rotated.png`, false));
    this.cards.push(new PathCard(CardType.PATH_CARD, PathCardSide.OPENED, PathCardSide.CLOSED, PathCardSide.CLOSED, PathCardSide.OPENED,
      false, false, `${IMAGES_PATH}2.png`, `${IMAGES_PATH}2_rotated.png`, false));
    this.cards.push(new PathCard(CardType.PATH_CARD, PathCardSide.CLOSED, PathCardSide.CLOSED, PathCardSide.OPENED, PathCardSide.OPENED,
      false, false, `${IMAGES_PATH}3.png`, `${IMAGES_PATH}3_rotated.png`, false));
    this.cards.push(new PathCard(CardType.PATH_CARD, PathCardSide.CLOSED, PathCardSide.OPENED, PathCardSide.CLOSED, PathCardSide.CLOSED,
      false, false, `${IMAGES_PATH}4.png`, `${IMAGES_PATH}4_rotated.png`, false));
    this.cards.push(new PathCard(CardType.PATH_CARD, PathCardSide.CLOSED, PathCardSide.CLOSED, PathCardSide.OPENED, PathCardSide.CLOSED,
      false, false, `${IMAGES_PATH}5.png`, `${IMAGES_PATH}5_rotated.png`, false));
    this.cards.push(new PathCard(CardType.PATH_CARD, PathCardSide.CLOSED, PathCardSide.OPENED, PathCardSide.OPENED, PathCardSide.OPENED,
      false, false, `${IMAGES_PATH}6.png`, `${IMAGES_PATH}6_rotated.png`, false));
    this.cards.push(new PathCard(CardType.PATH_CARD, PathCardSide.OPENED, PathCardSide.OPENED, PathCardSide.OPENED, PathCardSide.OPENED,
      false, false, `${IMAGES_PATH}7.png`, `${IMAGES_PATH}7_rotated.png`, false));
    this.cards.push(new PathCard(CardType.PATH_CARD, PathCardSide.OPENED, PathCardSide.OPENED, PathCardSide.CLOSED, PathCardSide.CLOSED,
      false, false, `${IMAGES_PATH}8.png`, `${IMAGES_PATH}8_rotated.png`, false));
    this.cards.push(new PathCard(CardType.PATH_CARD, PathCardSide.OPENED, PathCardSide.OPENED, PathCardSide.OPENED, PathCardSide.CLOSED,
      false, false, `${IMAGES_PATH}9.png`, `${IMAGES_PATH}9_rotated.png`, false));

    for (let i = 0; i < 5; i++) {
      this.cards.push(new PathCard(CardType.PATH_CARD, PathCardSide.OPENED, PathCardSide.OPENED, PathCardSide.CLOSED, PathCardSide.CLOSED,
        false, false, `${IMAGES_PATH}10.png`, `${IMAGES_PATH}10_rotated.png`, true));
    }

    for (let i = 0; i < 5; i++) {
      this.cards.push(new PathCard(CardType.PATH_CARD, PathCardSide.OPENED, PathCardSide.OPENED, PathCardSide.CLOSED, PathCardSide.OPENED,
        false, false, `${IMAGES_PATH}11.png`, `${IMAGES_PATH}11_rotated.png`, true));
    }

    for (let i = 0; i < 5; i++) {
      this.cards.push(new PathCard(CardType.PATH_CARD, PathCardSide.CLOSED, PathCardSide.OPENED, PathCardSide.CLOSED, PathCardSide.OPENED,
        false, false, `${IMAGES_PATH}12.png`, `${IMAGES_PATH}12_rotated.png`, true));
    }

    for (let i = 0; i < 5; i++) {
      this.cards.push(new PathCard(CardType.PATH_CARD, PathCardSide.OPENED, PathCardSide.CLOSED, PathCardSide.CLOSED, PathCardSide.OPENED,
        false, false, `${IMAGES_PATH}13.png`, `${IMAGES_PATH}13_rotated.png`, true));
    }

    for (let i = 0; i < 5; i++) {
      this.cards.push(new PathCard(CardType.PATH_CARD, PathCardSide.CLOSED, PathCardSide.CLOSED, PathCardSide.OPENED, PathCardSide.OPENED,
        false, false, `${IMAGES_PATH}14.png`, `${IMAGES_PATH}14_rotated.png`, true));
    }

    for (let i = 0; i < 5; i++) {
      this.cards.push(new PathCard(CardType.PATH_CARD, PathCardSide.OPENED, PathCardSide.CLOSED, PathCardSide.OPENED, PathCardSide.OPENED,
        false, false, `${IMAGES_PATH}15.png`, `${IMAGES_PATH}15_rotated.png`, true));
    }

    for (let i = 0; i < 5; i++) {
      this.cards.push(new PathCard(CardType.PATH_CARD, PathCardSide.OPENED, PathCardSide.OPENED, PathCardSide.OPENED, PathCardSide.OPENED,
        false, false, `${IMAGES_PATH}16.png`, `${IMAGES_PATH}16_rotated.png`, true));
    }

    for (let i = 0; i < 3; i++) {
      this.cards.push(new ActionCard(CardType.ACTION_CARD, ActionCardType.ROCK_FALL, `${IMAGES_PATH}rock_fall.png`));
    }*/

    for (let i = 0; i < 3; i++) {
      this.cards.push(new ActionCard(CardType.ACTION_CARD, ActionCardType.MAP, `${IMAGES_PATH}map.png`));
    }

    this.cards.push(new ActionCard(CardType.ACTION_CARD, ActionCardType.REPAIR_LAMP_OR_CART,
      `${IMAGES_PATH}repair_lamp_or_cart.png`));
    this.cards.push(new ActionCard(CardType.ACTION_CARD, ActionCardType.REPAIR_LAMP_OR_PICKAXE,
      `${IMAGES_PATH}repair_lamp_or_pickaxe.png`));
    this.cards.push(new ActionCard(CardType.ACTION_CARD, ActionCardType.REPAIR_CART_OR_PICKAXE,
      `${IMAGES_PATH}repair_pickaxe_or_cart.png`));

    for (let i = 0; i < 2; i++) {
      this.cards.push(new ActionCard(CardType.ACTION_CARD, ActionCardType.REPAIR_CART, `${IMAGES_PATH}repair_cart.png`));
    }

    for (let i = 0; i < 2; i++) {
      this.cards.push(new ActionCard(CardType.ACTION_CARD, ActionCardType.REPAIR_LAMP, `${IMAGES_PATH}repair_lamp.png`));
    }
    for (let i = 0; i < 2; i++) {
      this.cards.push(new ActionCard(CardType.ACTION_CARD, ActionCardType.REPAIR_PICKAXE, `${IMAGES_PATH}repair_pickaxe.png`));
    }

    for (let i = 0; i < 3; i++) {
      this.cards.push(new ActionCard(CardType.ACTION_CARD, ActionCardType.DESTROY_CART, `${IMAGES_PATH}destroy_cart.png`));
    }

    for (let i = 0; i < 3; i++) {
      this.cards.push(new ActionCard(CardType.ACTION_CARD, ActionCardType.DESTROY_LAMP, `${IMAGES_PATH}destroy_lamp.png`));
    }
    for (let i = 0; i < 3; i++) {
      this.cards.push(new ActionCard(CardType.ACTION_CARD, ActionCardType.DESTROY_PICKAXE, `${IMAGES_PATH}destroy_pickaxe.png`));
    }
  }
}

