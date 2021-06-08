import {CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';

export interface DropPredicateProvider {
  getPredicate(data?: any): (drag: CdkDrag, drop: CdkDropList) => boolean;
}
