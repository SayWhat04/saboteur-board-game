import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Card} from '../../../../shared/models/cards/card';
import {Injectable} from '@angular/core';
import {Board} from '../../../../shared/models/board/board';
import {CardType} from '../../../../shared/models/cards/card-type-property.enum';
import {ActionCardType} from '../../../../shared/models/cards/action-card-type-property.enum';
import {PathCardSide} from '../../../../shared/models/cards/path-card-side-property.enum';
import {PathCard} from '../../../../shared/models/cards/path-card';
import {DialogUtilsService} from '../../../../shared/services/dialog-utils/dialog-utils.service';
import {DropAction} from '../../../../shared/services/drag-and-drop-actions/drop-action';

@Injectable()
export class DropToBoardActionService implements DropAction {

  constructor(private dialogUtilsService: DialogUtilsService) {
  }

  drop(cdkDragDropEvent: CdkDragDrop<[Card], any>,
       additionalData: { fieldRowIndex: number, fieldColumnIndex: number, board: Board }): void {

    const dragContainer = cdkDragDropEvent.previousContainer;
    const dropContainer = cdkDragDropEvent.container;
    const draggedCard = dragContainer.data[cdkDragDropEvent.previousIndex];

    if (dragContainer === dropContainer) {
      moveItemInArray(dropContainer.data, cdkDragDropEvent.previousIndex, cdkDragDropEvent.currentIndex);
    } else {
      if (draggedCard.cardType === CardType.ACTION_CARD && draggedCard.type === ActionCardType.MAP) {
        this.dropMap(cdkDragDropEvent, additionalData.fieldRowIndex, additionalData.fieldColumnIndex, additionalData.board);
      } else if (draggedCard.cardType === CardType.ACTION_CARD && draggedCard.type === ActionCardType.ROCK_FALL) {
        this.dropRockFall(cdkDragDropEvent, additionalData.fieldRowIndex, additionalData.fieldColumnIndex, additionalData.board);
        additionalData.board.disableEnabledFields();
      } else if (draggedCard.cardType === CardType.PATH_CARD) {
        this.dropPath(cdkDragDropEvent, additionalData.fieldRowIndex, additionalData.fieldColumnIndex, additionalData.board);
        additionalData.board.enableEnabledFields(); // TODO: Think how to rename this
      }
    }
  }

  private dropMap(cdkDragDropEvent: CdkDragDrop<[Card], any>, fieldRowIndex: number, fieldColumnIndex: number, board: Board): void {
    const boardElement = board.cells[fieldRowIndex][fieldColumnIndex];

    transferArrayItem(cdkDragDropEvent.previousContainer.data,
      [],
      cdkDragDropEvent.previousIndex, 0);

    this.dialogUtilsService.openMapCardDialog({
      data: {
        // TODO: This in not intuitive. Why 2?
        url: boardElement[boardElement.length - 2].imagePath
      }
    });
  }

  private dropRockFall(cdkDragDropEvent: CdkDragDrop<[Card], any>, fieldRowIndex: number, fieldColumnIndex: number, board: Board): void {
    board.cells[fieldRowIndex][fieldColumnIndex].splice(0, 1);

    // TODO: This can be removed and replaced with saving card in discard pile in DB
    transferArrayItem(cdkDragDropEvent.previousContainer.data,
      [],
      cdkDragDropEvent.previousIndex, 0);
  }

  private dropPath(cdkDragDropEvent: CdkDragDrop<[Card], any>, fieldRowIndex: number, fieldColumnIndex: number, board: Board): void {
    const dragContainer = cdkDragDropEvent.previousContainer;
    const dropContainer = cdkDragDropEvent.container;
    const draggedCard = dragContainer.data[cdkDragDropEvent.previousIndex];

    // left side
    if (fieldColumnIndex === 0 && draggedCard.isPassage &&
      draggedCard.leftSide === PathCardSide.OPENED) {
      board.addColumnAtBeginning();
      fieldColumnIndex++;
    }

    // right side
    if (fieldColumnIndex === board.columnsInBoard - 1 &&
      draggedCard.isPassage && draggedCard.rightSide === PathCardSide.OPENED) {
      board.addColumnAtEnd();
    }

    // top side
    if (fieldRowIndex === 0 && draggedCard.isPassage &&
      draggedCard.topSide === PathCardSide.OPENED) {
      board.addRowAtBeginning();
      fieldRowIndex++;
    }

    // bottom side
    if (fieldRowIndex === board.rowsInBoard - 1 &&
      draggedCard.isPassage && draggedCard.bottomSide === PathCardSide.OPENED) {
      board.addRowAtEnd();
    }

    board.enableNeighbourCells(fieldRowIndex, fieldColumnIndex, draggedCard);
    board.removeFieldFromEnabledFields(fieldRowIndex, fieldColumnIndex);
    transferArrayItem(dragContainer.data, dropContainer.data,
      cdkDragDropEvent.previousIndex, 0);
    board.setBoundariesForNeighbourCells(fieldRowIndex, fieldColumnIndex, dropContainer.data[0] as PathCard);
  }
}
