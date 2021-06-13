export class Coordinate {
  constructor(private rowIndex: number,
              private colIndex: number,
              private parent?: Coordinate) {
  }

  public getRowIndex(): number {
    return this.rowIndex;
  }

  public getColIndex(): number {
    return this.colIndex;
  }
}
