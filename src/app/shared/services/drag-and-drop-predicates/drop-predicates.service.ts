import {Injectable} from '@angular/core';
import {PathCardSide} from '../../models/cards/path-card-side-property.enum';
import {CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';
import {ActionCard} from '../../models/cards/action-card';
import {ActionCardType} from '../../models/cards/action-card-type-property.enum';
import {Player} from '../../models/player';
import {Card} from '../../models/cards/card';
import {CardType} from '../../models/cards/card-type-property.enum';
import {Board} from '../../models/board/board';

@Injectable({
  providedIn: 'root'
})
export class DropPredicatesService { // TODO: Remove, when new approach will be tested
/*
  dropToBoardEnterPredicate(fieldRowIndex: number, fieldColumnIndex: number, board: Board, player?: Player) {
    return (drag: CdkDrag, drop: CdkDropList) => {
      const dropContainer = drop.data;
      const dropData = dropContainer[0];
      const dragData = drag.data;

      if (dragData.cardType === CardType.PATH_CARD &&
        (!player.isPickaxeValid || !player.isCartValid || !player.isLampValid)) {
        return false;
      }

      if (dragData.type === ActionCardType.MAP && board.isFieldEndField(fieldRowIndex, fieldColumnIndex)) {
        return true;
      }

      if (dragData.type === ActionCardType.ROCK_FALL
        && !board.isCellFilledWithPath(fieldRowIndex, fieldColumnIndex)) {
        return false;
      }

      if (dragData.type === ActionCardType.ROCK_FALL
        && !board.isFieldEndField(fieldRowIndex, fieldColumnIndex)
        && !board.isFieldStartField(fieldRowIndex, fieldColumnIndex)
        && board.isCellFilledWithPath(fieldRowIndex, fieldColumnIndex)) {
        return true;
      }

      if (dragData.cardType === CardType.ACTION_CARD && dragData.type !== ActionCardType.ROCK_FALL) {
        return false;
      }

      if (!dropData.enabled) {
        return false;
      }

      if ((dropData.leftSide === PathCardSide.CLOSED && dragData.leftSide === PathCardSide.OPENED) ||
        (dropData.rightSide === PathCardSide.CLOSED && dragData.rightSide === PathCardSide.OPENED) ||
        (dropData.topSide === PathCardSide.CLOSED && dragData.topSide === PathCardSide.OPENED) ||
        (dropData.bottomSide === PathCardSide.CLOSED && dragData.bottomSide === PathCardSide.OPENED)) {
        return false;
      }

      if ((dropData.leftSide === PathCardSide.OPENED && dragData.leftSide === PathCardSide.CLOSED) ||
        (dropData.rightSide === PathCardSide.OPENED && dragData.rightSide === PathCardSide.CLOSED) ||
        (dropData.topSide === PathCardSide.OPENED && dragData.topSide === PathCardSide.CLOSED) ||
        (dropData.bottomSide === PathCardSide.OPENED && dragData.bottomSide === PathCardSide.CLOSED)) {
        return false;
      }

      return dropContainer.length < 2;
    };
  }*/

  // TODO: Rewrite this to be more readable
  /*dropToPlayerCardEnterPredicate(currentPlayer: Player) {
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
  }*/
}
