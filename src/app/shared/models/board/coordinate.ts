// TODO: Re-factor to change x -> rowIndex, y -> colIndex
export class Coordinate {
  constructor(private x: number,
              private y: number,
              private parent?: Coordinate) {
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }
}
