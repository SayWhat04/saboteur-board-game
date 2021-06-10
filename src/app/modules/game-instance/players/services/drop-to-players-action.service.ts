import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Card} from '../../../../shared/models/cards/card';
import {Injectable} from '@angular/core';
import {ActionCardType} from '../../../../shared/models/cards/action-card-type-property.enum';
import {DialogUtilsService} from '../../../../shared/services/dialog-utils/dialog-utils.service';
import {ActionCard} from '../../../../shared/models/cards/action-card';
import {Player} from '../../../../shared/models/player';
import {DropAction} from '../../../../shared/services/drag-and-drop-actions/drop-action';

@Injectable()
export class DropToPlayersActionService implements DropAction {

  constructor(private dialogUtilsService: DialogUtilsService) {
  }

  drop(cdkDragDropEvent: CdkDragDrop<[Card], any>, additionalData: { player: Player }): void {

    const actionCardType = (cdkDragDropEvent.previousContainer.data[cdkDragDropEvent.previousIndex] as ActionCard).type;
    const dragContainer = cdkDragDropEvent.previousContainer;
    const dropContainer = cdkDragDropEvent.container;

    switch (actionCardType) {
      case ActionCardType.REPAIR_CART_OR_PICKAXE:
        this.repairCartOrPickaxe(additionalData.player);
        break;
      case ActionCardType.REPAIR_LAMP_OR_PICKAXE:
        this.repairLampOrPickaxe(additionalData.player);
        break;
      case ActionCardType.REPAIR_LAMP_OR_CART:
        this.repairLampOrCart(additionalData.player);
        break;
      default:
        this.setToolState(actionCardType, additionalData.player);
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
}
