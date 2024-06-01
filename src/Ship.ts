import { CoordinateType } from "./types/ship";

export class Ship {
  name: string;
  coordinates: CoordinateType[];

  constructor(name: string, coordinates: CoordinateType[]) {
    this.name = name;
    this.coordinates = coordinates;
  }

  isSunk(): boolean {
    return this.coordinates.every((coordinate) => coordinate.isHit);
  }

  hit(row: number, column: number) {
    this.coordinates = this.coordinates.map((coordinate) => {
      if (coordinate.row === row && coordinate.column === column) {
        return {
          ...coordinate,
          isHit: true,
        };
      }

      return coordinate;
    });
  }
}
