import {DataConverter} from '../data-converter';
import {Board} from '../../models/board/board';
import {DbBoard} from '../../models/board/db-board';
import {PathCard} from '../../models/cards/path-card';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbBoardBoardConverter implements DataConverter<DbBoard, Board> {
  convert(dbBoard: DbBoard): Board {
    const board = new Board();
    const cells: Array<PathCard>[][] = [];

    for (let i = 0; i < dbBoard.rowsInBoard; i++) {
      cells[i] = [];
      for (let j = 0; j < dbBoard.columnsInBoard; j++) {
        cells[i][j] = [];
      }
    }

    dbBoard.cells.forEach(boardField => {
      cells[boardField.row][boardField.column] = boardField.cellContainment;
    });

    board.cells = cells;
    board.boardFieldsIds = dbBoard.boardFieldsIds;
    board.START_FIELD_ROW_INDEX = dbBoard.START_FIELD_ROW_INDEX;
    board.START_FIELD_COLUMN_INDEX = dbBoard.START_FIELD_COLUMN_INDEX;
    board.END_FIELD_ROW_FIRST_INDEX = dbBoard.END_FIELD_ROW_FIRST_INDEX;
    board.END_FIELD_ROW_SECOND_INDEX = dbBoard.END_FIELD_ROW_SECOND_INDEX;
    board.END_FIELD_ROW_THIRD_INDEX = dbBoard.END_FIELD_ROW_THIRD_INDEX;
    board.END_FIELD_COLUMN_INDEX = dbBoard.END_FIELD_COLUMN_INDEX;
    board.columnsInBoard = dbBoard.columnsInBoard;
    board.rowsInBoard = dbBoard.rowsInBoard;
    board.maxFieldColumnIndex = dbBoard.maxFieldColumnIndex;
    board.maxFieldRowIndex = dbBoard.maxFieldRowIndex;
    board.enabledFields = dbBoard.enabledFields;

    return board;
  }
}
