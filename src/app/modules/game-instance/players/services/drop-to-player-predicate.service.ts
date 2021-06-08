import {Injectable} from '@angular/core';
import {CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';
import {ActionCard} from '../../../../shared/models/cards/action-card';
import {ActionCardType} from '../../../../shared/models/cards/action-card-type-property.enum';
import {Player} from '../../../../shared/models/player';
import {Card} from '../../../../shared/models/cards/card';
import {CardType} from '../../../../shared/models/cards/card-type-property.enum';
import {DropPredicateProvider} from '../../../../shared/services/drag-and-drop-predicates/drop-predicate';

@Injectable()
export class DropToPlayerPredicateService implements DropPredicateProvider {

  getPredicate(currentPlayer: Player) {
    return (drag: CdkDrag, drop: CdkDropList) => {
      const dragData: Card = drag.data;
      if (dragData.cardType === CardType.PATH_CARD) {
        return false;
      } else if (dragData.cardType === CardType.ACTION_CARD) {
        const actionCardType = (dragData as ActionCard).type;
        if (actionCardType === ActionCardType.ROCK_FALL || actionCardType === ActionCardType.MAP) {
          return false;
        } else if (actionCardType === ActionCardType.REPAIR_PICKAXE && currentPlayer.isPickaxeValid) {
          return false;
        } else if (actionCardType === ActionCardType.REPAIR_CART && currentPlayer.isCartValid) {
          return false;
        } else if (actionCardType === ActionCardType.REPAIR_LAMP && currentPlayer.isLampValid) {
          return false;
        } else if (actionCardType === ActionCardType.DESTROY_PICKAXE && !currentPlayer.isPickaxeValid) {
          return false;
        } else if (actionCardType === ActionCardType.DESTROY_CART && !currentPlayer.isCartValid) {
          return false;
        } else if (actionCardType === ActionCardType.DESTROY_LAMP && !currentPlayer.isLampValid) {
          return false;
        } else if (actionCardType === ActionCardType.REPAIR_LAMP_OR_CART &&
          currentPlayer.isLampValid && currentPlayer.isCartValid) {
          return false;
        } else if (actionCardType === ActionCardType.REPAIR_LAMP_OR_PICKAXE &&
          currentPlayer.isLampValid && currentPlayer.isPickaxeValid) {
          return false;
        } else if (actionCardType === ActionCardType.REPAIR_CART_OR_PICKAXE &&
          currentPlayer.isCartValid && currentPlayer.isPickaxeValid) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    };
  }
}
