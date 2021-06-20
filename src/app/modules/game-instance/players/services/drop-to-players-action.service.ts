import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Card} from '../../../../shared/models/cards/card';
import {Injectable} from '@angular/core';
import {ActionCardType} from '../../../../shared/models/cards/action-card-type-property.enum';
import {DialogUtilsService} from '../../../../shared/services/dialog-utils/dialog-utils.service';
import {ActionCard} from '../../../../shared/models/cards/action-card';
import {Player} from '../../../../shared/models/player';
import {DropAction} from '../../../../shared/services/drag-and-drop-actions/drop-action';
import {GamesService} from '../../../../shared/services/games/games.service';
import {Game} from '../../../../shared/models/game';
import {GameLogicController} from '../../../../shared/services/game-logic-controller.service';

@Injectable()
export class DropToPlayersActionService implements DropAction {

  constructor(private dialogUtilsService: DialogUtilsService,
              private gamesService: GamesService,
              private gameLogicController: GameLogicController) {
  }

  async drop(cdkDragDropEvent: CdkDragDrop<[Card], any>, additionalData: { player: Player, loggedUserId: string, gameId: string }) {
    const actionCardType = (cdkDragDropEvent.previousContainer.data[cdkDragDropEvent.previousIndex] as ActionCard).type;
    const dragContainer = cdkDragDropEvent.previousContainer;
    const dropContainer = cdkDragDropEvent.container;

    switch (actionCardType) {
      case ActionCardType.REPAIR_CART_OR_PICKAXE:
        this.repairCartOrPickaxe(additionalData);
        break;
      case ActionCardType.REPAIR_LAMP_OR_PICKAXE:
        this.repairLampOrPickaxe(additionalData);
        break;
      case ActionCardType.REPAIR_LAMP_OR_CART:
        this.repairLampOrCart(additionalData);
        break;
      default:
        this.setToolState(actionCardType, additionalData);
    }

    if (dragContainer === dropContainer) {
      moveItemInArray(dropContainer.data, cdkDragDropEvent.previousIndex, cdkDragDropEvent.currentIndex);
    } else {
      transferArrayItem(dragContainer.data, dropContainer.data,
        cdkDragDropEvent.previousIndex, 0);
    }
  }

  private repairCartOrPickaxe(additionalData: { player: Player, loggedUserId: string, gameId: string }): void {
    if (additionalData.player.isCartValid && !additionalData.player.isPickaxeValid) {
      additionalData.player.isPickaxeValid = true;
    } else if (!additionalData.player.isCartValid && additionalData.player.isPickaxeValid) {
      additionalData.player.isCartValid = true;
    } else {
      const dialogRef = this.dialogUtilsService.openDoubleRepairCardDialog({
        data: {
          tools: [ActionCardType.REPAIR_CART,
            ActionCardType.REPAIR_PICKAXE]
        }
      });
      dialogRef.afterClosed().subscribe(selectedTool => {
        this.setToolState(selectedTool, additionalData);
      });
    }

  }

  private repairLampOrPickaxe(additionalData: { player: Player, loggedUserId: string, gameId: string }): void {
    if (additionalData.player.isLampValid && !additionalData.player.isPickaxeValid) {
      additionalData.player.isPickaxeValid = true;
    } else if (!additionalData.player.isLampValid && additionalData.player.isPickaxeValid) {
      additionalData.player.isLampValid = true;
    } else {
      const dialogRef = this.dialogUtilsService.openDoubleRepairCardDialog({
        data: {
          tools: [ActionCardType.REPAIR_LAMP,
            ActionCardType.REPAIR_PICKAXE]
        }
      });
      dialogRef.afterClosed().subscribe(selectedTool => {
        this.setToolState(selectedTool, additionalData);
      });
    }
  }

  private repairLampOrCart(additionalData: { player: Player, loggedUserId: string, gameId: string }) {
    if (additionalData.player.isLampValid && !additionalData.player.isCartValid) {
      additionalData.player.isCartValid = true;
    } else if (!additionalData.player.isLampValid && additionalData.player.isCartValid) {
      additionalData.player.isLampValid = true;
    } else {
      const dialogRef = this.dialogUtilsService.openDoubleRepairCardDialog({
        data: {
          tools: [ActionCardType.REPAIR_LAMP,
            ActionCardType.REPAIR_CART]
        }
      });
      dialogRef.afterClosed().subscribe(selectedTool => {
        this.setToolState(selectedTool, additionalData);
      });
    }
  }

  async setToolState(actionCardType: ActionCardType, additionalData: { player: Player, loggedUserId: string, gameId: string }) {

    switch (actionCardType) {
      case ActionCardType.DESTROY_PICKAXE: {
        additionalData.player.isPickaxeValid = false;
        break;
      }
      case ActionCardType.DESTROY_CART: {
        additionalData.player.isCartValid = false;
        break;
      }
      case ActionCardType.DESTROY_LAMP: {
        additionalData.player.isLampValid = false;
        break;
      }
      case ActionCardType.REPAIR_PICKAXE: {
        additionalData.player.isPickaxeValid = true;
        break;
      }
      case ActionCardType.REPAIR_CART: {
        additionalData.player.isCartValid = true;
        break;
      }
      case ActionCardType.REPAIR_LAMP: {
        additionalData.player.isLampValid = true;
        break;
      }
      default: {
        break;
      }
    }
    await this.updateRepairedPlayer(additionalData);
  }

  private async updateRepairedPlayer(additionalData: { player: Player; loggedUserId: string; gameId: string }) {
    const currentGameSnapshot: Game = this.gamesService.getCurrentGameSnapshot();
    const tempPlayers: Player[] = currentGameSnapshot.players;
    const loggedPlayer = this.gameLogicController.getLoggedPlayer(tempPlayers, additionalData.loggedUserId);
    loggedPlayer.isPickaxeValid = additionalData.player.isPickaxeValid;
    loggedPlayer.isCartValid = additionalData.player.isCartValid;
    loggedPlayer.isLampValid = additionalData.player.isLampValid;
    this.gameLogicController.updatePlayer(tempPlayers, additionalData.loggedUserId, loggedPlayer);
    await this.gamesService.patchNonArrayValue(additionalData.gameId, {players: tempPlayers});
  }
}
