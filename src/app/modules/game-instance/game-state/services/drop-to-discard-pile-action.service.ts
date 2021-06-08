import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Card} from '../../../../shared/models/cards/card';
import {Injectable} from '@angular/core';
import {DropAction} from '../../../../shared/services/drag-and-drop-actions/drop-action';

@Injectable()
export class DropToDiscardPileActionService implements DropAction {

  drop(cdkDragDropEvent: CdkDragDrop<[Card], any>): void {
    const dragContainer = cdkDragDropEvent.previousContainer;
    const dropContainer = cdkDragDropEvent.container;

    if (dragContainer === dropContainer) {
      moveItemInArray(dropContainer.data, cdkDragDropEvent.previousIndex, cdkDragDropEvent.currentIndex);
    } else {
      transferArrayItem(dragContainer.data, dropContainer.data,
        cdkDragDropEvent.previousIndex, 0);
    }
  }
}
