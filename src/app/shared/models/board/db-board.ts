import {EnabledField} from './enabled-field';
import {DbBoardCell} from './db-board-cell';

export interface DbBoard {
  cells: Array<DbBoardCell>;
  boardFieldsIds: Array<string>;
  START_FIELD_ROW_INDEX: number;
  START_FIELD_COLUMN_INDEX: number;
  END_FIELD_ROW_FIRST_INDEX: number;
  END_FIELD_ROW_SECOND_INDEX: number;
  END_FIELD_ROW_THIRD_INDEX: number;
  END_FIELD_COLUMN_INDEX: number;
  columnsInBoard: number;
  rowsInBoard: number;
  maxFieldColumnIndex: number;
  maxFieldRowIndex: number;
  isGoldFound: boolean;
  enabledFields: Array<EnabledField>;
}
