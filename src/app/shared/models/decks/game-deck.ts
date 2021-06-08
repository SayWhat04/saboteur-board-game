import {Deck} from './deck';
import {PathCard} from '../cards/path-card';
import {PathCardSide} from '../cards/path-card-side-property.enum';
import {ActionCard} from '../cards/action-card';
import {ActionCardType} from '../cards/action-card-type-property.enum';
import {CardType} from '../cards/card-type-property.enum';
import {Card} from '../cards/card';

export class GameDeck extends Deck<Card> {

  constructor() {
    super();
  }

  fillDeck(): void {
    // TODO: /assets/images/ can be put into const.
    /*
    this.cards.push(new PathCard(CardType.PATH_CARD, PathCardSide.CLOSED, PathCardSide.OPENED, PathCardSide.CLOSED, PathCardSide.OPENED,
      false, false, '/assets/images/1.png', '/assets/images/1_rotated.png', false));
    this.cards.push(new PathCard(CardType.PATH_CARD, PathCardSide.OPENED, PathCardSide.CLOSED, PathCardSide.CLOSED, PathCardSide.OPENED,
      false, false, '/assets/images/2.png', '/assets/images/2_rotated.png', false));
    this.cards.push(new PathCard(CardType.PATH_CARD, PathCardSide.CLOSED, PathCardSide.CLOSED, PathCardSide.OPENED, PathCardSide.OPENED,
      false, false, '/assets/images/3.png', '/assets/images/3_rotated.png', false));
    this.cards.push(new PathCard(CardType.PATH_CARD, PathCardSide.CLOSED, PathCardSide.OPENED, PathCardSide.CLOSED, PathCardSide.CLOSED,
      false, false, '/assets/images/4.png', '/assets/images/4_rotated.png', false));
    this.cards.push(new PathCard(CardType.PATH_CARD, PathCardSide.CLOSED, PathCardSide.CLOSED, PathCardSide.OPENED, PathCardSide.CLOSED,
      false, false, '/assets/images/5.png', '/assets/images/5_rotated.png', false));
    this.cards.push(new PathCard(CardType.PATH_CARD, PathCardSide.CLOSED, PathCardSide.OPENED, PathCardSide.OPENED, PathCardSide.OPENED,
      false, false, '/assets/images/6.png', '/assets/images/6_rotated.png', false));
    this.cards.push(new PathCard(CardType.PATH_CARD, PathCardSide.OPENED, PathCardSide.OPENED, PathCardSide.OPENED, PathCardSide.OPENED,
      false, false, '/assets/images/7.png', '/assets/images/7_rotated.png', false));
    this.cards.push(new PathCard(CardType.PATH_CARD, PathCardSide.OPENED, PathCardSide.OPENED, PathCardSide.CLOSED, PathCardSide.CLOSED,
      false, false, '/assets/images/8.png', '/assets/images/8_rotated.png', false));
    this.cards.push(new PathCard(CardType.PATH_CARD, PathCardSide.OPENED, PathCardSide.OPENED, PathCardSide.OPENED, PathCardSide.CLOSED,
      false, false, '/assets/images/9.png', '/assets/images/9_rotated.png', false));
*/
    for (let i = 0; i < 5; i++) {
      this.cards.push(new PathCard(CardType.PATH_CARD, PathCardSide.OPENED, PathCardSide.OPENED, PathCardSide.CLOSED, PathCardSide.CLOSED,
        false, false, '/assets/images/10.png', '/assets/images/10_rotated.png', true));
    }
    /*
        for (let i = 0; i < 5; i++) {
          this.cards.push(new PathCard(CardType.PATH_CARD, PathCardSide.OPENED, PathCardSide.OPENED, PathCardSide.CLOSED, PathCardSide.OPENED,
            false, false, '/assets/images/11.png', '/assets/images/11_rotated.png', true));
        }*/

    /*for (let i = 0; i < 5; i++) {
      this.cards.push(new PathCard(CardType.PATH_CARD, PathCardSide.CLOSED, PathCardSide.OPENED, PathCardSide.CLOSED, PathCardSide.OPENED,
        false, false, '/assets/images/12.png', '/assets/images/12_rotated.png', true));
    }

    for (let i = 0; i < 5; i++) {
      this.cards.push(new PathCard(CardType.PATH_CARD, PathCardSide.OPENED, PathCardSide.CLOSED, PathCardSide.CLOSED, PathCardSide.OPENED,
        false, false, '/assets/images/13.png', '/assets/images/13_rotated.png', true));
    }

    for (let i = 0; i < 5; i++) {
      this.cards.push(new PathCard(CardType.PATH_CARD, PathCardSide.CLOSED, PathCardSide.CLOSED, PathCardSide.OPENED, PathCardSide.OPENED,
        false, false, '/assets/images/14.png', '/assets/images/14_rotated.png', true));
    }*/

    for (let i = 0; i < 5; i++) {
      this.cards.push(new PathCard(CardType.PATH_CARD, PathCardSide.OPENED, PathCardSide.CLOSED, PathCardSide.OPENED, PathCardSide.OPENED,
        false, false, '/assets/images/15.png', '/assets/images/15_rotated.png', true));
    }

    for (let i = 0; i < 5; i++) {
      this.cards.push(new PathCard(CardType.PATH_CARD, PathCardSide.OPENED, PathCardSide.OPENED, PathCardSide.OPENED, PathCardSide.OPENED,
        false, false, '/assets/images/16.png', '/assets/images/16_rotated.png', true));
    }
    /*
        for (let i = 0; i < 3; i++) {
          this.cards.push(new ActionCard(CardType.ACTION_CARD, ActionCardType.ROCK_FALL, '/assets/images/rock_fall.png'));
        }*/

    /*
        for (let i = 0; i < 3; i++) {
          this.cards.push(new ActionCard(CardType.ACTION_CARD, ActionCardType.MAP, '/assets/images/map.png'));
        }*/


    this.cards.push(new ActionCard(CardType.ACTION_CARD, ActionCardType.REPAIR_LAMP_OR_CART, '/assets/images/repair_lamp_or_cart.png'));
    this.cards.push(new ActionCard(CardType.ACTION_CARD, ActionCardType.REPAIR_LAMP_OR_PICKAXE, '/assets/images/repair_lamp_or_pickaxe.png'));
    this.cards.push(new ActionCard(CardType.ACTION_CARD, ActionCardType.REPAIR_CART_OR_PICKAXE, '/assets/images/repair_pickaxe_or_cart.png'));
    /*
        for (let i = 0; i < 2; i++) {
          this.cards.push(new ActionCard(CardType.ACTION_CARD, ActionCardType.REPAIR_CART, '/assets/images/repair_cart.png'));
        }

        for (let i = 0; i < 2; i++) {
          this.cards.push(new ActionCard(CardType.ACTION_CARD, ActionCardType.REPAIR_LAMP, '/assets/images/repair_lamp.png'));
        }
        for (let i = 0; i < 2; i++) {
          this.cards.push(new ActionCard(CardType.ACTION_CARD, ActionCardType.REPAIR_PICKAXE, '/assets/images/repair_pickaxe.png'));
        }*/

    for (let i = 0; i < 3; i++) {
      this.cards.push(new ActionCard(CardType.ACTION_CARD, ActionCardType.DESTROY_CART, '/assets/images/destroy_cart.png'));
    }
    /*
        for (let i = 0; i < 3; i++) {
          this.cards.push(new ActionCard(CardType.ACTION_CARD, ActionCardType.DESTROY_LAMP, '/assets/images/destroy_lamp.png'));
        }
        for (let i = 0; i < 3; i++) {
          this.cards.push(new ActionCard(CardType.ACTION_CARD, ActionCardType.DESTROY_PICKAXE, '/assets/images/destroy_pickaxe.png'));
        }*/
  }
}

