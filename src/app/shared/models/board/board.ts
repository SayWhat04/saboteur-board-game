import {PathCard} from '../cards/path-card';
import {CardType} from '../cards/card-type-property.enum';
import {PathCardSide} from '../cards/path-card-side-property.enum';
import {EnabledField} from './enabled-field';
import {Coordinate} from './coordinate';

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

  public setBoardInitialState() {
    this.createBoard();
    this.setStartField();
    this.setEndFields();
  }

  public setBoundariesForNeighbourCells(fieldRowIndex: number, fieldColumnIndex: number, card: PathCard): void {
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

  public setBoundariesForCell(fieldRowIndex: number, fieldColumnIndex: number): void {
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

  public enableNeighbourCells(fieldRowIndex: number, fieldColumnIndex: number, pathCard: PathCard): void {
    // TODO: Remove this after expanding board on reveal of end field
    const maxFieldColumnIndex = this.columnsInBoard - 1;
    const maxFieldRowIndex = this.rowsInBoard - 1;

    // TODO: this can be checked elsewhere, move this one level up
    if (pathCard.isPassage) {
      // left side
      if (fieldColumnIndex > 0 && pathCard.leftSide === PathCardSide.OPENED) {
        this.cells[fieldRowIndex][fieldColumnIndex - 1][0].enabled = true;
        this.addFieldToEnabledFields(fieldRowIndex, fieldColumnIndex - 1);

        if (this.isFieldEndField(fieldRowIndex, fieldColumnIndex - 1)) {
          this.revealEndField(fieldRowIndex, fieldColumnIndex - 1, 'right');
        }
      }

      // right side
      if (fieldColumnIndex < maxFieldColumnIndex && pathCard.rightSide === PathCardSide.OPENED) {
        this.cells[fieldRowIndex][fieldColumnIndex + 1][0].enabled = true;
        this.addFieldToEnabledFields(fieldRowIndex, fieldColumnIndex + 1);

        if (this.isFieldEndField(fieldRowIndex, fieldColumnIndex + 1)) {
          this.revealEndField(fieldRowIndex, fieldColumnIndex + 1, 'left');
        }
      }

      // top side
      if (fieldRowIndex > 0 && pathCard.topSide === PathCardSide.OPENED) {
        this.cells[fieldRowIndex - 1][fieldColumnIndex][0].enabled = true;
        this.addFieldToEnabledFields(fieldRowIndex - 1, fieldColumnIndex);

        if (this.isFieldEndField(fieldRowIndex - 1, fieldColumnIndex)) {
          this.revealEndField(fieldRowIndex - 1, fieldColumnIndex, 'bottom');
        }
      }

      // bottom side
      if (fieldRowIndex < maxFieldRowIndex && pathCard.bottomSide === PathCardSide.OPENED) {
        this.cells[fieldRowIndex + 1][fieldColumnIndex][0].enabled = true;
        this.addFieldToEnabledFields(fieldRowIndex + 1, fieldColumnIndex);

        if (this.isFieldEndField(fieldRowIndex + 1, fieldColumnIndex)) {
          this.revealEndField(fieldRowIndex + 1, fieldColumnIndex, 'top');
        }
      }
    }
  }

  // TODO: Change enter side to Enum type
  private revealEndField(fieldRow: number, fieldColumn: number, enterSide: string) {
    if (this.cells[fieldRow][fieldColumn].length === 3) {
      this.cells[fieldRow][fieldColumn].shift();
    }
    const endCard = this.cells[fieldRow][fieldColumn][0];

    if (endCard.cardType === CardType.GOAL_GOLD) {
      this.isGoldFound = true;
    } else {
      const endCardSides = new Map<string, PathCardSide>();
      endCardSides.set('left', endCard.leftSide);
      endCardSides.set('right', endCard.rightSide);
      endCardSides.set('top', endCard.topSide);
      endCardSides.set('bottom', endCard.bottomSide);

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

  // TODO: Test
  private shouldEndFieldBeRotated(endCardSides: Map<string, PathCardSide>,
                                  enterSide: string): boolean {
    return endCardSides.get(enterSide) !== PathCardSide.OPENED ||
      endCardSides.get(enterSide) !== PathCardSide.OPENED ||
      endCardSides.get(enterSide) !== PathCardSide.OPENED ||
      endCardSides.get(enterSide) !== PathCardSide.OPENED;
  }

  // TODO: Check if this can be replaced with Set
  private addFieldToEnabledFields(rowIndex: number, columnIndex: number): void {
    if (!this.enabledFields.some(enField => enField.rowIndex === rowIndex && enField.columnIndex === columnIndex) &&
      this.cells[rowIndex][columnIndex].length < 2) {
      this.enabledFields.push({rowIndex, columnIndex, shouldBeEnabled: true});
    }
  }

  public removeFieldFromEnabledFields(rowIndex: number, columnIndex: number): void {
    this.enabledFields = this.enabledFields.filter(enField => (enField.rowIndex !== rowIndex
      || enField.columnIndex !== columnIndex));
  }

  public isFieldEndField(fieldRow: number, fieldColumn: number): boolean {
    return (fieldColumn === this.END_FIELD_COLUMN_INDEX) &&
      (fieldRow === this.END_FIELD_ROW_FIRST_INDEX ||
        fieldRow === this.END_FIELD_ROW_SECOND_INDEX ||
        fieldRow === this.END_FIELD_ROW_THIRD_INDEX);
  }

  public isFieldStartField(fieldRow: number, fieldColumn: number): boolean {
    return fieldColumn === this.START_FIELD_COLUMN_INDEX &&
      fieldRow === this.START_FIELD_ROW_INDEX;
  }

  public isFieldOnBoard(row: number, column: number): boolean {
    return row <= this.rowsInBoard - 1 &&
      column <= this.columnsInBoard - 1 &&
      row >= 0 && column >= 0;
  }

  public isCellFilledWithPath(row: number, column: number): boolean {
    return this.cells[row][column].length === 2;
  }

  public addRowAtEnd(): void {
    this.addDropIdsForNewRow();
    this.cells.push(this.generateNewRow());
    this.rowsInBoard++;
  }

  public addRowAtBeginning(): void {
    this.addDropIdsForNewRow();
    this.cells.unshift(this.generateNewRow());

    // TODO: Move to separate method
    this.enabledFields = this.enabledFields.map(field => {
      const updatedField: EnabledField = {
        rowIndex: field.rowIndex + 1,
        columnIndex: field.columnIndex,
        shouldBeEnabled: field.shouldBeEnabled
      };
      return updatedField;
    });

    this.rowsInBoard++;
    this.START_FIELD_ROW_INDEX++;
    this.END_FIELD_ROW_FIRST_INDEX++;
    this.END_FIELD_ROW_SECOND_INDEX++;
    this.END_FIELD_ROW_THIRD_INDEX++;
  }

  public addColumnAtEnd(): void {
    this.cells.forEach((value, index) => {
      this.cells[index].push([new PathCard(CardType.PATH_CARD,
        PathCardSide.NOT_SET, PathCardSide.NOT_SET, PathCardSide.NOT_SET, PathCardSide.NOT_SET,
        false, false)]);
      this.boardFieldsIds.push(index + '' + this.columnsInBoard);
    });
    this.columnsInBoard++;
  }

  public addColumnAtBeginning(): void {
    this.cells.forEach((value, index) => {
      this.cells[index].unshift([new PathCard(CardType.PATH_CARD,
        PathCardSide.NOT_SET, PathCardSide.NOT_SET, PathCardSide.NOT_SET, PathCardSide.NOT_SET,
        false, false)]);
      this.boardFieldsIds.push(index + '' + this.columnsInBoard);
    });

    // TODO: Move to separate method
    this.enabledFields = this.enabledFields.map(field => {
      const updatedField: EnabledField = {
        rowIndex: field.rowIndex,
        columnIndex: field.columnIndex + 1,
        shouldBeEnabled: field.shouldBeEnabled
      };
      return updatedField;
    });

    this.columnsInBoard++;
    this.START_FIELD_COLUMN_INDEX++;
    this.END_FIELD_COLUMN_INDEX++;
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
      false, false, '/assets/images/start.png', '/assets/images/start.png', true);
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
      '/assets/images/end_placeholder.png', '/assets/images/end_placeholder.png',
      true);

    const exitCards = new Array<PathCard>();
    exitCards.push(new PathCard(CardType.GOAL_DEAD_END, PathCardSide.CLOSED, PathCardSide.OPENED, PathCardSide.CLOSED, PathCardSide.OPENED,
      false, false, '/assets/images/end_1.png', '/assets/images/end_1_rotated.png', true));
    exitCards.push(new PathCard(CardType.GOAL_DEAD_END, PathCardSide.OPENED, PathCardSide.CLOSED, PathCardSide.CLOSED, PathCardSide.OPENED,
      false, false, '/assets/images/end_2.png', '/assets/images/end_2_rotated.png', true));
    exitCards.push(new PathCard(CardType.GOAL_GOLD, PathCardSide.OPENED, PathCardSide.OPENED, PathCardSide.OPENED, PathCardSide.OPENED,
      false, false, '/assets/images/gold.png', '/assets/images/gold_rotated.png', true));

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


  public getFieldsReachableFromStart(): Array<Coordinate> {
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
      const currCell = this.cells[curr.getX()][curr.getY()];

      if (!(currCell.length === 2)) {
        continue;
      }

      // left
      if (this.isFieldOnBoard(curr.getX(), curr.getY() - 1) && currCell[0].leftSide === PathCardSide.OPENED) {
        tempStack.push(new Coordinate(curr.getX(), curr.getY() - 1));
      }
      // right
      if (this.isFieldOnBoard(curr.getX(), curr.getY() + 1) && currCell[0].rightSide === PathCardSide.OPENED) {
        tempStack.push(new Coordinate(curr.getX(), curr.getY() + 1));
      }
      // top
      if (this.isFieldOnBoard(curr.getX() - 1, curr.getY()) && currCell[0].topSide === PathCardSide.OPENED) {
        tempStack.push(new Coordinate(curr.getX() - 1, curr.getY()));
      }
      // bottom
      if (this.isFieldOnBoard(curr.getX() + 1, curr.getY()) && currCell[0].bottomSide === PathCardSide.OPENED) {
        tempStack.push(new Coordinate(curr.getX() + 1, curr.getY()));
      }
    }
    visited = visited.filter(v => this.cells[v.getX()][v.getY()].length !== 2);
    return visited;
  }

  // TODO: Re-factor, re-name
  private isCoordinatePresentInArray(coordinate: Coordinate, array: Array<Coordinate>): boolean {
    return array.some(el => el.getX() === coordinate.getX() && el.getY() === coordinate.getY());
  }

  // TODO: Refactor to two separate methods
  public disableEnabledFields() {
    const reachableFields = this.getFieldsReachableFromStart();

    this.enabledFields = this.enabledFields.map(field => {
      const updatedField = {
        rowIndex: field.rowIndex,
        columnIndex: field.columnIndex,
        shouldBeEnabled: reachableFields
          .some(coordinate => coordinate.getX() === field.rowIndex && coordinate.getY() === field.columnIndex)
          ? field.shouldBeEnabled
          : false
      };
      return updatedField;
    });

    this.enabledFields
      .filter(field => field.shouldBeEnabled === false)
      .filter(field => reachableFields.some(
        reachField => reachField.getX() !== field.rowIndex && reachField.getY() !== field.columnIndex))
      .forEach(field => this.cells[field.rowIndex][field.columnIndex][0].enabled = false);
  }

  // TODO: Refactor to two separate methods
  public enableEnabledFields() {
    const reachableFields = this.getFieldsReachableFromStart();

    this.enabledFields = this.enabledFields.map(field => {
      const updatedField = {
        rowIndex: field.rowIndex,
        columnIndex: field.columnIndex,
        shouldBeEnabled: reachableFields
          .some(coordinate => coordinate.getX() === field.rowIndex && coordinate.getY() === field.columnIndex)
          ? field.shouldBeEnabled
          : false
      };
      return updatedField;
    });

    this.enabledFields
      .filter(field => field.shouldBeEnabled === false)
      .filter(field => reachableFields.some(
        reachField => reachField.getX() === field.rowIndex && reachField.getY() === field.columnIndex))
      .forEach(field => this.cells[field.rowIndex][field.columnIndex][0].enabled = true);
  }
}
