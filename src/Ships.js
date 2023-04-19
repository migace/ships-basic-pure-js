export class Ship {
  constructor(name, coordinates) {
    this.name = name;
    this.coordinates = coordinates;
  }

  isSunk() {
    return this.coordinates.every((coordinate) => coordinate.isHit);
  }

  hit(row, column) {
    this.coordinates.forEach((coordinate) => {
      if (coordinate.row === row && coordinate.column === column) {
        coordinate.isHit = true;
      }
    });
  }
}
