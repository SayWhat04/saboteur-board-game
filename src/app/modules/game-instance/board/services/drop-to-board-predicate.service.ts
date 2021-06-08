import {Injectable} from '@angular/core';
import {PathCardSide} from '../../../../shared/models/cards/path-card-side-property.enum';
import {CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';
import {ActionCardType} from '../../../../shared/models/cards/action-card-type-property.enum';
import {Player} from '../../../../shared/models/player';
import {CardType} from '../../../../shared/models/cards/card-type-property.enum';
import {Board} from '../../../../shared/models/board/board';
import {DropPredicateProvider} from '../../../../shared/services/drag-and-drop-predicates/drop-predicate';

@Injectable()
export class DropToBoardPredicateService implements DropPredicateProvider {

  getPredicate(data: { fieldRowIndex: number, fieldColumnIndex: number, board: Board, player: Player }) {
    return (drag: CdkDrag, drop: CdkDropList) => {
      const dropContainer = drop.data;
      const dropData = dropContainer[0];
      const dragData = drag.data;

      if (dragData.cardType === CardType.PATH_CARD &&
        (!data.player.isPickaxeValid || !data.player.isCartValid || !data.player.isLampValid)) {
        return false;
      }

      if (dragData.type === ActionCardType.MAP && data.board.isFieldEndField(data.fieldRowIndex, data.fieldColumnIndex)) {
        return true;
      }

      if (dragData.type === ActionCardType.ROCK_FALL
        && !data.board.isCellFilledWithPath(data.fieldRowIndex, data.fieldColumnIndex)) {
        return false;
      }

      if (dragData.type === ActionCardType.ROCK_FALL
        && !data.board.isFieldEndField(data.fieldRowIndex, data.fieldColumnIndex)
        && !data.board.isFieldStartField(data.fieldRowIndex, data.fieldColumnIndex)
        && data.board.isCellFilledWithPath(data.fieldRowIndex, data.fieldColumnIndex)) {
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
  }

}
