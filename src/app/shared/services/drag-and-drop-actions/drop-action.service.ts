import {Injectable} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Player} from '../../models/player';
import {Board} from '../../models/board/board';
import {PathCard} from '../../models/cards/path-card';
import {ActionCardType} from '../../models/cards/action-card-type-property.enum';
import {CardType} from '../../models/cards/card-type-property.enum';
import {PathCardSide} from '../../models/cards/path-card-side-property.enum';
import {ActionCard} from '../../models/cards/action-card';
import {DialogUtilsService} from '../dialog-utils/dialog-utils.service';
import {Card} from '../../models/cards/card';


@Injectable({
  providedIn: 'root'
})
export class DropActionService {

  constructor(private dialogUtilsService: DialogUtilsService) { // TODO: Remove, when new approach will be tested
  }
/*
  moveCardInHand(cdkDragDropEvent: CdkDragDrop<[Card]>): void {
    const dragContainer = cdkDragDropEvent.previousContainer;
    const dropContainer = cdkDragDropEvent.container;

    if (dragContainer === dropContainer) {
      moveItemInArray(dropContainer.data, cdkDragDropEvent.previousIndex, cdkDragDropEvent.currentIndex);
    }
  }

  dropToBoard(cdkDragDropEvent: CdkDragDrop<[Card], any>, fieldRowIndex: number, fieldColumnIndex: number, board: Board): void {
    const dragContainer = cdkDragDropEvent.previousContainer;
    const dropContainer = cdkDragDropEvent.container;
    const draggedCard = dragContainer.data[cdkDragDropEvent.previousIndex];

    if (dragContainer === dropContainer) {
      moveItemInArray(dropContainer.data, cdkDragDropEvent.previousIndex, cdkDragDropEvent.currentIndex);
    } else {
      // if (cdkDragDropEvent.isPointerOverContainer) {
      if (draggedCard.cardType === CardType.ACTION_CARD && draggedCard.type === ActionCardType.MAP) {
        this.dropMap(cdkDragDropEvent, fieldRowIndex, fieldColumnIndex, board);
      } else if (draggedCard.cardType === CardType.ACTION_CARD && draggedCard.type === ActionCardType.ROCK_FALL) {
        this.dropRockFall(cdkDragDropEvent, fieldRowIndex, fieldColumnIndex, board);
        board.disableEnabledFields();
      } else if (draggedCard.cardType === CardType.PATH_CARD) {
        this.dropPath(cdkDragDropEvent, fieldRowIndex, fieldColumnIndex, board);
        board.enableEnabledFields(); // TODO: Think how to rename this
      }
      // }
    }
  }

  dropToDiscardPile(cdkDragDropEvent: CdkDragDrop<[Card], any>): void {
    const dragContainer = cdkDragDropEvent.previousContainer;
    const dropContainer = cdkDragDropEvent.container;

    if (dragContainer === dropContainer) {
      moveItemInArray(dropContainer.data, cdkDragDropEvent.previousIndex, cdkDragDropEvent.currentIndex);
    } else {
      transferArrayItem(dragContainer.data, dropContainer.data,
        cdkDragDropEvent.previousIndex, 0);
    }
  }

  dropToPlayerTile(cdkDragDropEvent: CdkDragDrop<[Card], any>, player: Player): void {
    const actionCardType = (cdkDragDropEvent.previousContainer.data[cdkDragDropEvent.previousIndex] as ActionCard).type;
    const dragContainer = cdkDragDropEvent.previousContainer;
    const dropContainer = cdkDragDropEvent.container;

    switch (actionCardType) {
      case ActionCardType.REPAIR_CART_OR_PICKAXE:
        this.repairCartOrPickaxe(player);
        break;
      case ActionCardType.REPAIR_LAMP_OR_PICKAXE:
        this.repairLampOrPickaxe(player);
        break;
      case ActionCardType.REPAIR_LAMP_OR_CART:
        this.repairLampOrCart(player);
        break;
      default:
        this.setToolState(actionCardType, player);
    }

    if (dragContainer === dropContainer) {
      moveItemInArray(dropContainer.data, cdkDragDropEvent.previousIndex, cdkDragDropEvent.currentIndex);
    } else {
      transferArrayItem(dragContainer.data, dropContainer.data,
        cdkDragDropEvent.previousIndex, 0);
    }
  }

  private repairCartOrPickaxe(player: Player): void {
    if (player.isCartValid && !player.isPickaxeValid) {
      player.isPickaxeValid = true;
    } else if (!player.isCartValid && player.isPickaxeValid) {
      player.isCartValid = true;
    } else {
      const dialogRef = this.dialogUtilsService.openDoubleRepairCardDialog({
        data: {
          tools: [ActionCardType.REPAIR_CART,
            ActionCardType.REPAIR_PICKAXE]
        }
      });
      dialogRef.afterClosed().subscribe(selectedTool => {
        this.setToolState(selectedTool, player);
      });
    }

  }

  private repairLampOrPickaxe(player: Player): void {
    if (player.isLampValid && !player.isPickaxeValid) {
      player.isPickaxeValid = true;
    } else if (!player.isLampValid && player.isPickaxeValid) {
      player.isLampValid = true;
    } else {
      const dialogRef = this.dialogUtilsService.openDoubleRepairCardDialog({
        data: {
          tools: [ActionCardType.REPAIR_LAMP,
            ActionCardType.REPAIR_PICKAXE]
        }
      });
      dialogRef.afterClosed().subscribe(selectedTool => {
        this.setToolState(selectedTool, player);
      });
    }
  }

  private repairLampOrCart(player: Player) {
    if (player.isLampValid && !player.isCartValid) {
      player.isCartValid = true;
    } else if (!player.isLampValid && player.isCartValid) {
      player.isLampValid = true;
    } else {
      const dialogRef = this.dialogUtilsService.openDoubleRepairCardDialog({
        data: {
          tools: [ActionCardType.REPAIR_LAMP,
            ActionCardType.REPAIR_CART]
        }
      });
      dialogRef.afterClosed().subscribe(selectedTool => {
        this.setToolState(selectedTool, player);
      });
    }
  }

  public setToolState(actionCardType: ActionCardType, player: Player): void {
    // TODO: Re-factor to switch statement
    if (actionCardType === ActionCardType.DESTROY_PICKAXE) {
      player.isPickaxeValid = false;
    }
    if (actionCardType === ActionCardType.DESTROY_CART) {
      player.isCartValid = false;
    }
    if (actionCardType === ActionCardType.DESTROY_LAMP) {
      player.isLampValid = false;
    }

    if (actionCardType === ActionCardType.REPAIR_PICKAXE) {
      player.isPickaxeValid = true;
    }
    if (actionCardType === ActionCardType.REPAIR_CART) {
      player.isCartValid = true;
    }
    if (actionCardType === ActionCardType.REPAIR_LAMP) {
      player.isLampValid = true;
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
  }*/
}
