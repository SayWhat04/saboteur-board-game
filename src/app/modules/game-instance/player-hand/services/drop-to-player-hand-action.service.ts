import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Card} from '../../../../shared/models/cards/card';
import {Injectable} from '@angular/core';
import {DropAction} from '../../../../shared/services/drag-and-drop-actions/drop-action';

@Injectable()
export class DropToPlayerHandActionService implements DropAction {

  drop(cdkDragDropEvent: CdkDragDrop<[Card], any>): void {
    const dragContainer = cdkDragDropEvent.previousContainer;
    const dropContainer = cdkDragDropEvent.container;

    if (dragContainer === dropContainer) {
      moveItemInArray(dropContainer.data, cdkDragDropEvent.previousIndex, cdkDragDropEvent.currentIndex);
    }
  }
}
