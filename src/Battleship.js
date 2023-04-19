import { Ship } from "./Ships";
import { ships } from "./constants";

export const HORIZONTAL = "HORIZONTAL";
export const VERTICAL = "VERTICAL";

export class Battleship {
  constructor(rows, columns) {
    this.board = new Array(rows).fill(0).map(() => new Array(columns).fill(0));
    this.ships = [];
  }

  addShip(name, row, column, direction = HORIZONTAL) {
    const coordinates = [];

    for (let i = 0; i < ships[name]; i++) {
      if (direction === HORIZONTAL) {
        this.board[row][column + i] = 1;
        coordinates.push({ row, column: column + i, isHit: false });
      } else if (direction === VERTICAL) {
        this.board[row + i][column] = 1;
        coordinates.push({ row: row + i, column, isHit: false });
      }
    }

    this.ships.push(new Ship(name, coordinates));
  }

  attack(row, column) {
    if (this.board[row][column] === 1) {
      this.board[row][column] = 2;
    } else if (this.board[row][column] === 0) {
      this.board[row][column] = 3;
    }

    this.ships.forEach((ship) => {
      ship.hit(row, column);
    });
  }

  getSunkShips() {
    return this.ships.filter((ship) => ship.isSunk());
  }

  isGameOver() {
    return this.ships.every((ship) => ship.isSunk());
  }
}
