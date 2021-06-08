import {DataConverter} from '../data-converter';
import {Board} from '../../models/board/board';
import {DbBoard} from '../../models/board/db-board';
import {DbBoardCell} from '../../models/board/db-board-cell';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoardToDbBoardConverter implements DataConverter<Board, DbBoard> {
  convert(board: Board): DbBoard {
    // TODO: This should be changed, this is only one field of dbBoard
    const dbBoardCells = new Array<DbBoardCell>();

    for (let i = 0; i < board.rowsInBoard; i++) {
      for (let j = 0; j < board.columnsInBoard; j++) {
        // TODO: Rename this
        const singleCell = board.cells[i][j];
        const dbSingleCell = new Array<{}>();

        // TODO: Change to map function
        singleCell.forEach(card => {
          const dbCard = {
            cardType: card.cardType,
            leftSide: card.leftSide,
            rightSide: card.rightSide,
            topSide: card.topSide,
            bottomSide: card.bottomSide,
            enabled: card.enabled,
            isRotated: card.isRotated,
            imagePath: card.imagePath ? card.imagePath : '',
            imagePathRotated: card.imagePathRotated ? card.imagePathRotated : '',
            isPassage: card.isPassage ? card.isPassage : false
          };
          dbSingleCell.push(dbCard);
        });

        const cell: DbBoardCell = {
          row: i,
          column: j,
          cellContainment: dbSingleCell
        };
        dbBoardCells.push(cell);
      }
    }

    const dbBoard: DbBoard = {
      cells: dbBoardCells,
      boardFieldsIds: board.boardFieldsIds,
      START_FIELD_ROW_INDEX: board.START_FIELD_ROW_INDEX,
      START_FIELD_COLUMN_INDEX: board.START_FIELD_COLUMN_INDEX,
      END_FIELD_ROW_FIRST_INDEX: board.END_FIELD_ROW_FIRST_INDEX,
      END_FIELD_ROW_SECOND_INDEX: board.END_FIELD_ROW_SECOND_INDEX,
      END_FIELD_ROW_THIRD_INDEX: board.END_FIELD_ROW_THIRD_INDEX,
      END_FIELD_COLUMN_INDEX: board.END_FIELD_COLUMN_INDEX,
      columnsInBoard: board.columnsInBoard,
      rowsInBoard: board.rowsInBoard,
      maxFieldColumnIndex: board.maxFieldColumnIndex,
      maxFieldRowIndex: board.maxFieldRowIndex,
      isGoldFound: board.isGoldFound,
      enabledFields: board.enabledFields
    };

    return dbBoard;
  }
}
