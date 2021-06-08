import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatBadgeModule} from '@angular/material/badge';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {MapCardDialogComponent} from './components/dialogs/map-card-dialog/map-card-dialog.component';
import {DoubleRepairCardDialogComponent} from './components/dialogs/double-repair-card-dialog/double-repair-card-dialog.component';
import {NewGameCreationDialogComponent} from './components/dialogs/new-game-creation-dialog/new-game-creation-dialog.component';
import {EndGameSummaryDialogComponent} from './components/dialogs/end-game-summary-dialog/end-game-summary-dialog.component';

@NgModule({
  declarations: [
    MapCardDialogComponent,
    DoubleRepairCardDialogComponent,
    NewGameCreationDialogComponent,
    EndGameSummaryDialogComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatTableModule,
    MatChipsModule,
    MatToolbarModule,
    MatGridListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    FlexLayoutModule,
    CommonModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatTableModule,
    MatChipsModule,
    MatToolbarModule,
    MatGridListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    FlexLayoutModule,
    MapCardDialogComponent,
    DoubleRepairCardDialogComponent,
    NewGameCreationDialogComponent,
    EndGameSummaryDialogComponent
  ],
  entryComponents: [],
  providers: []
})
export class SharedModule {
}
