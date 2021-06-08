import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {Card} from '../../models/cards/card';

export interface DropAction {
  drop(cdkDragDropEvent: CdkDragDrop<[Card], any>, additionalData?: any): void;
}
