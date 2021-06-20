import {PathCard} from '../cards/path-card';
import {CardType} from '../cards/card-type-property.enum';
import {PathCardSide} from '../cards/path-card-side-property.enum';
import {EnabledField} from './enabled-field';
import {Coordinate} from './coordinate';
import {IMAGES_PATH} from '../../../configs/game-specific-const';
import {CellSide} from './cell-side.enum';

export class Board {
  cells: Array<PathCard>[][] = [];
  boardFieldsIds: Array<string> = [];
  enabledFields: Array<EnabledField> = [];
  isGoldFound = false;

  START_FIELD_ROW_INDEX = 2;
  START_FIELD_COLUMN_INDEX = 1;
  END_FIELD_ROW_FIRST_INDEX = 0;
  END_FIELD_ROW_SECOND_INDEX = 2;
  END_FIELD_ROW_THIRD_INDEX = 4;
  END_FIELD_COLUMN_INDEX = 9;

  columnsInBoard = 10;
  rowsInBoard = 5;

  maxFieldColumnIndex = this.columnsInBoard - 1;
  maxFieldRowIndex = this.rowsInBoard - 1;

  constructor() {
    this.setBoardInitialState();
  }

  setBoardInitialState() {
    this.createBoard();
    this.setStartField();
    this.setEndFields();
  }

  setBoundariesForNeighbourCells(fieldRowIndex: number, fieldColumnIndex: number, card: PathCard): void {
    // left side
    if (fieldColumnIndex > 0 && card.leftSide !== PathCardSide.NOT_SET) {
      this.cells[fieldRowIndex][fieldColumnIndex - 1][0].rightSide = card.leftSide;
    }

    // right side
    if (fieldColumnIndex < this.maxFieldColumnIndex && card.rightSide !== PathCardSide.NOT_SET) {
      this.cells[fieldRowIndex][fieldColumnIndex + 1][0].leftSide = card.rightSide;
    }

    // top side
    if (fieldRowIndex > 0 && card.topSide !== PathCardSide.NOT_SET) {
      this.cells[fieldRowIndex - 1][fieldColumnIndex][0].bottomSide = card.topSide;
    }

    // bottom side
    if (fieldRowIndex < this.maxFieldRowIndex && card.bottomSide !== PathCardSide.NOT_SET) {
      this.cells[fieldRowIndex + 1][fieldColumnIndex][0].topSide = card.bottomSide;
    }
  }

  setBoundariesForCell(fieldRowIndex: number, fieldColumnIndex: number): void {
    // left side
    if (fieldColumnIndex > 0) {
      if (this.cells[fieldRowIndex][fieldColumnIndex - 1][0].rightSide === PathCardSide.NOT_SET) {
        this.cells[fieldRowIndex][fieldColumnIndex][0].leftSide = PathCardSide.NOT_SET;
      } else {
        this.cells[fieldRowIndex][fieldColumnIndex][0].leftSide = this.cells[fieldRowIndex][fieldColumnIndex - 1][0].rightSide;
      }
    }

    // right side
    if (fieldColumnIndex < this.maxFieldColumnIndex) {
      if (this.cells[fieldRowIndex][fieldColumnIndex + 1][0].leftSide === PathCardSide.NOT_SET) {
        this.cells[fieldRowIndex][fieldColumnIndex][0].rightSide = PathCardSide.NOT_SET;
      } else {
        this.cells[fieldRowIndex][fieldColumnIndex][0].rightSide = this.cells[fieldRowIndex][fieldColumnIndex + 1][0].leftSide;
      }
    }

    // top side
    if (fieldRowIndex > 0) {
      if (this.cells[fieldRowIndex - 1][fieldColumnIndex][0].bottomSide === PathCardSide.NOT_SET) {
        this.cells[fieldRowIndex][fieldColumnIndex][0].topSide = PathCardSide.NOT_SET;
      } else {
        this.cells[fieldRowIndex][fieldColumnIndex][0].topSide = this.cells[fieldRowIndex - 1][fieldColumnIndex][0].bottomSide;
      }
    }

    // bottom side
    if (fieldRowIndex < this.maxFieldRowIndex) {
      if (this.cells[fieldRowIndex + 1][fieldColumnIndex][0].topSide === PathCardSide.NOT_SET) {
        this.cells[fieldRowIndex][fieldColumnIndex][0].bottomSide = PathCardSide.NOT_SET;
      } else {
        this.cells[fieldRowIndex][fieldColumnIndex][0].bottomSide = this.cells[fieldRowIndex + 1][fieldColumnIndex][0].topSide;
      }
    }
  }

  enableNeighbourCells(fieldRowIndex: number, fieldColumnIndex: number, pathCard: PathCard): void {
    const maxFieldColumnIndex = this.columnsInBoard - 1;
    const maxFieldRowIndex = this.rowsInBoard - 1;

    if (pathCard.isPassage) {
      // left side
      if (fieldColumnIndex > 0 && pathCard.leftSide === PathCardSide.OPENED) {
        this.cells[fieldRowIndex][fieldColumnIndex - 1][0].enabled = true;
        this.addFieldToEnabledFields(fieldRowIndex, fieldColumnIndex - 1);

        if (this.isFieldEndField(fieldRowIndex, fieldColumnIndex - 1)) {
          this.revealEndField(fieldRowIndex, fieldColumnIndex - 1, CellSide.RIGHT);
        }
      }

      // right side
      if (fieldColumnIndex < maxFieldColumnIndex && pathCard.rightSide === PathCardSide.OPENED) {
        this.cells[fieldRowIndex][fieldColumnIndex + 1][0].enabled = true;
        this.addFieldToEnabledFields(fieldRowIndex, fieldColumnIndex + 1);

        if (this.isFieldEndField(fieldRowIndex, fieldColumnIndex + 1)) {
          this.revealEndField(fieldRowIndex, fieldColumnIndex + 1, CellSide.LEFT);
        }
      }

      // top side
      if (fieldRowIndex > 0 && pathCard.topSide === PathCardSide.OPENED) {
        this.cells[fieldRowIndex - 1][fieldColumnIndex][0].enabled = true;
        this.addFieldToEnabledFields(fieldRowIndex - 1, fieldColumnIndex);

        if (this.isFieldEndField(fieldRowIndex - 1, fieldColumnIndex)) {
          this.revealEndField(fieldRowIndex - 1, fieldColumnIndex, CellSide.BOTTOM);
        }
      }

      // bottom side
      if (fieldRowIndex < maxFieldRowIndex && pathCard.bottomSide === PathCardSide.OPENED) {
        this.cells[fieldRowIndex + 1][fieldColumnIndex][0].enabled = true;
        this.addFieldToEnabledFields(fieldRowIndex + 1, fieldColumnIndex);

        if (this.isFieldEndField(fieldRowIndex + 1, fieldColumnIndex)) {
          this.revealEndField(fieldRowIndex + 1, fieldColumnIndex, CellSide.TOP);
        }
      }
    }
  }

  private revealEndField(fieldRow: number, fieldColumn: number, enterSide: CellSide) {
    if (this.cells[fieldRow][fieldColumn].length === 3) {
      this.cells[fieldRow][fieldColumn].shift();
    }
    const endCard = this.cells[fieldRow][fieldColumn][0];

    if (endCard.cardType === CardType.GOAL_GOLD) {
      this.isGoldFound = true;
    } else {
      const endCardSides = new Map<string, PathCardSide>();
      endCardSides.set(CellSide.LEFT, endCard.leftSide);
      endCardSides.set(CellSide.RIGHT, endCard.rightSide);
      endCardSides.set(CellSide.TOP, endCard.topSide);
      endCardSides.set(CellSide.BOTTOM, endCard.bottomSide);

      if (this.shouldEndFieldBeRotated(endCardSides, enterSide)) {
        this.rotateCard(endCard);
      }
    }
    this.enableNeighbourCells(fieldRow, fieldColumn, this.cells[fieldRow][fieldColumn][0]);
    this.setBoundariesForNeighbourCells(fieldRow, fieldColumn, this.cells[fieldRow][fieldColumn][0]);
  }

  private rotateCard(endCard: PathCard) {
    endCard.isRotated = !endCard.isRotated;
    endCard.bottomSide = [endCard.topSide, endCard.topSide = endCard.bottomSide][0];
    endCard.leftSide = [endCard.rightSide, endCard.rightSide = endCard.leftSide][0];
  }

  private shouldEndFieldBeRotated(endCardSides: Map<string, PathCardSide>,
                                  enterSide: CellSide): boolean {
    return endCardSides.get(enterSide) !== PathCardSide.OPENED ||
      endCardSides.get(enterSide) !== PathCardSide.OPENED ||
      endCardSides.get(enterSide) !== PathCardSide.OPENED ||
      endCardSides.get(enterSide) !== PathCardSide.OPENED;
  }

  private addFieldToEnabledFields(rowIndex: number, columnIndex: number): void {
    if (!this.enabledFields.some(enField => enField.rowIndex === rowIndex && enField.columnIndex === columnIndex) &&
      this.cells[rowIndex][columnIndex].length < 2) {
      this.enabledFields.push({rowIndex, columnIndex, shouldBeEnabled: true});
    }
  }

  removeFieldFromEnabledFields(rowIndex: number, columnIndex: number): void {
    this.enabledFields = this.enabledFields.filter(enField => (enField.rowIndex !== rowIndex
      || enField.columnIndex !== columnIndex));
  }

  isFieldEndField(fieldRow: number, fieldColumn: number): boolean {
    return (fieldColumn === this.END_FIELD_COLUMN_INDEX) &&
      (fieldRow === this.END_FIELD_ROW_FIRST_INDEX ||
        fieldRow === this.END_FIELD_ROW_SECOND_INDEX ||
        fieldRow === this.END_FIELD_ROW_THIRD_INDEX);
  }

  isFieldStartField(fieldRow: number, fieldColumn: number): boolean {
    return fieldColumn === this.START_FIELD_COLUMN_INDEX &&
      fieldRow === this.START_FIELD_ROW_INDEX;
  }

  isFieldOnBoard(row: number, column: number): boolean {
    return row <= this.rowsInBoard - 1 &&
      column <= this.columnsInBoard - 1 &&
      row >= 0 && column >= 0;
  }

  isCellFilledWithPath(row: number, column: number): boolean {
    return this.cells[row][column].length === 2;
  }

  addRowAtEnd(): void {
    this.addDropIdsForNewRow();
    this.cells.push(this.generateNewRow());
    this.rowsInBoard++;
  }

  addRowAtBeginning(): void {
    this.addDropIdsForNewRow();
    this.cells.unshift(this.generateNewRow());

    this.enabledFields = this.updateEnabledFieldsRows(this.enabledFields);
    this.rowsInBoard++;
    this.START_FIELD_ROW_INDEX++;
    this.END_FIELD_ROW_FIRST_INDEX++;
    this.END_FIELD_ROW_SECOND_INDEX++;
    this.END_FIELD_ROW_THIRD_INDEX++;
  }

  private updateEnabledFieldsRows(enabledFields: Array<EnabledField>) {
    return enabledFields.map(field => {
      const updatedField: EnabledField = {
        rowIndex: field.rowIndex + 1,
        columnIndex: field.columnIndex,
        shouldBeEnabled: field.shouldBeEnabled
      };
      return updatedField;
    });
  }

  addColumnAtEnd(): void {
    this.cells.forEach((value, index) => {
      this.cells[index].push([new PathCard(CardType.PATH_CARD,
        PathCardSide.NOT_SET, PathCardSide.NOT_SET, PathCardSide.NOT_SET, PathCardSide.NOT_SET,
        false, false)]);
      this.boardFieldsIds.push(index + '' + this.columnsInBoard);
    });
    this.columnsInBoard++;
  }

  addColumnAtBeginning(): void {
    this.cells.forEach((value, index) => {
      this.cells[index].unshift([new PathCard(CardType.PATH_CARD,
        PathCardSide.NOT_SET, PathCardSide.NOT_SET, PathCardSide.NOT_SET, PathCardSide.NOT_SET,
        false, false)]);
      this.boardFieldsIds.push(index + '' + this.columnsInBoard);
    });

    this.enabledFields = this.updateEnabledFieldsColumns(this.enabledFields);
    this.columnsInBoard++;
    this.START_FIELD_COLUMN_INDEX++;
    this.END_FIELD_COLUMN_INDEX++;
  }

  private updateEnabledFieldsColumns(enabledFields: Array<EnabledField>) {
    return enabledFields.map(field => {
      const updatedField: EnabledField = {
        rowIndex: field.rowIndex,
        columnIndex: field.columnIndex + 1,
        shouldBeEnabled: field.shouldBeEnabled
      };
      return updatedField;
    });
  }

  private generateNewRow() {
    const newRow: Array<PathCard>[] = [];
    for (let i = 0; i < this.columnsInBoard; i++) {
      newRow.push([new PathCard(CardType.PATH_CARD,
        PathCardSide.NOT_SET, PathCardSide.NOT_SET, PathCardSide.NOT_SET, PathCardSide.NOT_SET,
        false, false)]);
    }
    return newRow;
  }

  private addDropIdsForNewRow() {
    for (let i = 0; i < this.columnsInBoard; i++) {
      this.boardFieldsIds.push(this.rowsInBoard + '' + i);
    }
  }

  private createBoard() {
    for (let i = 0; i < this.rowsInBoard; i++) {
      this.cells[i] = [];
      for (let j = 0; j < this.columnsInBoard; j++) {
        this.cells[i][j] = [new PathCard(CardType.PATH_CARD,
          PathCardSide.NOT_SET, PathCardSide.NOT_SET, PathCardSide.NOT_SET, PathCardSide.NOT_SET,
          false, false)];
        this.boardFieldsIds.push(i + '' + j);
      }
    }
  }

  private setStartField() {
    const startTile = new PathCard(CardType.PATH_CARD, PathCardSide.OPENED, PathCardSide.OPENED, PathCardSide.OPENED, PathCardSide.OPENED,
      false, false, `${IMAGES_PATH}start.png`, `${IMAGES_PATH}start.png`, true);
    this.cells[this.START_FIELD_ROW_INDEX][this.START_FIELD_COLUMN_INDEX].unshift(startTile);

    this.enableNeighbourCells(this.START_FIELD_ROW_INDEX, this.START_FIELD_COLUMN_INDEX,
      this.cells[this.START_FIELD_ROW_INDEX][this.START_FIELD_COLUMN_INDEX][0]);
    this.setBoundariesForNeighbourCells(this.START_FIELD_ROW_INDEX, this.START_FIELD_COLUMN_INDEX,
      this.cells[this.START_FIELD_ROW_INDEX][this.START_FIELD_COLUMN_INDEX][0]);
  }

  private setEndFields() {
    const endFieldPlaceholder = new PathCard(CardType.PLACEHOLDER,
      PathCardSide.OPENED, PathCardSide.OPENED, PathCardSide.OPENED, PathCardSide.OPENED,
      false, false,
      `${IMAGES_PATH}end_placeholder.png`, `${IMAGES_PATH}end_placeholder.png`,
      true);

    const exitCards = new Array<PathCard>();
    exitCards.push(new PathCard(CardType.GOAL_DEAD_END, PathCardSide.CLOSED, PathCardSide.OPENED, PathCardSide.CLOSED, PathCardSide.OPENED,
      false, false, `${IMAGES_PATH}end_1.png`, `${IMAGES_PATH}end_1_rotated.png`, true));
    exitCards.push(new PathCard(CardType.GOAL_DEAD_END, PathCardSide.OPENED, PathCardSide.CLOSED, PathCardSide.CLOSED, PathCardSide.OPENED,
      false, false, `${IMAGES_PATH}end_2.png`, `${IMAGES_PATH}end_2_rotated.png`, true));
    exitCards.push(new PathCard(CardType.GOAL_GOLD, PathCardSide.OPENED, PathCardSide.OPENED, PathCardSide.OPENED, PathCardSide.OPENED,
      false, false, `${IMAGES_PATH}gold.png`, `${IMAGES_PATH}gold_rotated.png`, true));

    const firstRandomIndex = Math.floor(Math.random() * exitCards.length);
    this.cells[this.END_FIELD_ROW_FIRST_INDEX][this.END_FIELD_COLUMN_INDEX].unshift(exitCards.splice(firstRandomIndex, 1)[0]);
    this.cells[this.END_FIELD_ROW_FIRST_INDEX][this.END_FIELD_COLUMN_INDEX].unshift(JSON.parse(JSON.stringify(endFieldPlaceholder)));

    const secondRandomIndex = Math.floor(Math.random() * exitCards.length);
    this.cells[this.END_FIELD_ROW_SECOND_INDEX][this.END_FIELD_COLUMN_INDEX].unshift(exitCards.splice(secondRandomIndex, 1)[0]);
    this.cells[this.END_FIELD_ROW_SECOND_INDEX][this.END_FIELD_COLUMN_INDEX].unshift(JSON.parse(JSON.stringify(endFieldPlaceholder)));

    const thirdRandomIndex = Math.floor(Math.random() * exitCards.length);
    this.cells[this.END_FIELD_ROW_THIRD_INDEX][this.END_FIELD_COLUMN_INDEX].unshift(exitCards.splice(thirdRandomIndex, 1)[0]);
    this.cells[this.END_FIELD_ROW_THIRD_INDEX][this.END_FIELD_COLUMN_INDEX].unshift(JSON.parse(JSON.stringify(endFieldPlaceholder)));
  }

  getFieldsReachableFromStart(): Array<Coordinate> {
    let visited = new Array<Coordinate>();
    const tempStack = new Array<Coordinate>();
    const start = new Coordinate(this.START_FIELD_ROW_INDEX, this.START_FIELD_COLUMN_INDEX);
    tempStack.push(start);

    while (!(tempStack.length === 0)) {
      const curr = tempStack.pop();

      if (this.isCoordinatePresentInArray(curr, visited)) {
        continue;
      }
      visited.push(curr);
      const currCell = this.cells[curr.getRowIndex()][curr.getColIndex()];

      if (!(currCell.length === 2)) {
        continue;
      }

      // left
      if (this.isFieldOnBoard(curr.getRowIndex(), curr.getColIndex() - 1) && currCell[0].leftSide === PathCardSide.OPENED) {
        tempStack.push(new Coordinate(curr.getRowIndex(), curr.getColIndex() - 1));
      }
      // right
      if (this.isFieldOnBoard(curr.getRowIndex(), curr.getColIndex() + 1) && currCell[0].rightSide === PathCardSide.OPENED) {
        tempStack.push(new Coordinate(curr.getRowIndex(), curr.getColIndex() + 1));
      }
      // top
      if (this.isFieldOnBoard(curr.getRowIndex() - 1, curr.getColIndex()) && currCell[0].topSide === PathCardSide.OPENED) {
        tempStack.push(new Coordinate(curr.getRowIndex() - 1, curr.getColIndex()));
      }
      // bottom
      if (this.isFieldOnBoard(curr.getRowIndex() + 1, curr.getColIndex()) && currCell[0].bottomSide === PathCardSide.OPENED) {
        tempStack.push(new Coordinate(curr.getRowIndex() + 1, curr.getColIndex()));
      }
    }
    visited = visited.filter(v => this.cells[v.getRowIndex()][v.getColIndex()].length !== 2);
    return visited;
  }

  private isCoordinatePresentInArray(coordinate: Coordinate, array: Array<Coordinate>): boolean {
    return array.some(el => el.getRowIndex() === coordinate.getRowIndex() && el.getColIndex() === coordinate.getColIndex());
  }

  disablePreviouslyEnabledFields() {
    const reachableFields = this.getFieldsReachableFromStart();
    this.enabledFields = this.updateEnabledFields(reachableFields);

    this.enabledFields
      .filter(field => field.shouldBeEnabled === false)
      .filter(field => reachableFields.some(
        reachField => reachField.getRowIndex() !== field.rowIndex && reachField.getColIndex() !== field.columnIndex))
      .forEach(field => this.cells[field.rowIndex][field.columnIndex][0].enabled = false);
  }

  private updateEnabledFields(reachableFields: Array<Coordinate>) {
    return this.enabledFields.map(field => {
      const updatedField = {
        rowIndex: field.rowIndex,
        columnIndex: field.columnIndex,
        shouldBeEnabled: reachableFields
          .some(coordinate => coordinate.getRowIndex() === field.rowIndex && coordinate.getColIndex() === field.columnIndex)
          ? field.shouldBeEnabled
          : false
      };
      return updatedField;
    });
  }

  enablePreviouslyEnabledFields() {
    const reachableFields = this.getFieldsReachableFromStart();
    this.enabledFields = this.updateEnabledFields(reachableFields);

    this.enabledFields
      .filter(field => field.shouldBeEnabled === false)
      .filter(field => reachableFields.some(
        reachField => reachField.getRowIndex() === field.rowIndex && reachField.getColIndex() === field.columnIndex))
      .forEach(field => this.cells[field.rowIndex][field.columnIndex][0].enabled = true);
  }
}
