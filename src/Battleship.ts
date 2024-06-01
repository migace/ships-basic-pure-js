import { Ship } from "./Ship";
import { ships } from "./constants";
import { Direction } from "./types/battleshipt";
import { CoordinateType } from "./types/ship";

export class Battleship {
  board: number[][];
  ships: Ship[];

  constructor(rows: number, columns: number) {
    this.board = new Array(rows).fill(0).map(() => new Array(columns).fill(0));
    this.ships = [];
  }

  addShip(
    name: string,
    row: number,
    column: number,
    direction = Direction.Horizontal
  ) {
    const coordinates: CoordinateType[] = [];

    for (let i = 0; i < ships[name]; i++) {
      if (direction === Direction.Horizontal) {
        this.board[row][column + i] = 1;
        coordinates.push({ row, column: column + i, isHit: false });
      } else if (direction === Direction.Vertical) {
        this.board[row + i][column] = 1;
        coordinates.push({ row: row + i, column, isHit: false });
      }
    }

    this.ships.push(new Ship(name, coordinates));
  }

  attack(row: number, column: number) {
    if (this.board[row][column] === 1) {
      this.board[row][column] = 2;
    } else if (this.board[row][column] === 0) {
      this.board[row][column] = 3;
    }

    this.ships.forEach((ship) => {
      ship.hit(row, column);
    });
  }

  getSunkShips(): Ship[] {
    return this.ships.filter((ship) => ship.isSunk());
  }

  isGameOver(): boolean {
    return this.ships.every((ship) => ship.isSunk());
  }
}
