import { Battleship } from "./Battleship";
import { COLUMNS, ROWS } from "./config";
import { Direction } from "./types/battleshipt";
import { BoardFieldType } from "./types/board";

const battleshipEl = document.getElementById("battleship");
const battleship = new Battleship(ROWS, COLUMNS);

const setup = () => {
  battleship.addShip("carrier", 1, 1);
  battleship.addShip("battleship", 3, 7, Direction.Vertical);
  battleship.addShip("cruiser", 8, 1);
  battleship.addShip("submarine", 6, 2);
  battleship.addShip("destroyer", 9, 7);
};

const getBoardField = (value) => {
  if (value === BoardFieldType.SHIP) {
    return "⚓";
  } else if (value === BoardFieldType.HIT) {
    return "🔥";
  } else if (value === BoardFieldType.MISS) {
    return "💧";
  }

  return "";
};

function renderBoard() {
  const board = battleship.board.map((row, rowIndex) => {
    const rowEl = document.createElement("div");
    rowEl.classList.add("row");

    rowEl.innerHTML = row
      .map((column, columnIndex) => {
        return `<div class="cell" data-row=${rowIndex} data-column=${columnIndex}>${getBoardField(
          column
        )}</div>`;
      })
      .join("");

    return rowEl;
  });

  if (battleshipEl) {
    battleshipEl.innerHTML = "";
    battleshipEl.append(...board);

    type HTMLElementEvent<T extends HTMLElement> = Event & {
      target: T;
    };
  }
}

// main
setup();
renderBoard();

battleshipEl?.addEventListener("click", (ev: MouseEvent) => {
  if (battleship.isGameOver()) {
    alert("GAME OVER");
  } else {
    const logEl = document.getElementById("log");
    const evTarget = ev.target as HTMLDivElement;
    const row = evTarget.getAttribute("data-row") ?? 0;
    const column = evTarget.getAttribute("data-column") ?? 0;

    battleship.attack(+row, +column);
    renderBoard();

    if (logEl) {
      logEl.innerHTML = "";
    }

    battleship.getSunkShips().forEach((ship) => {
      const shipLog = document.createElement("p");
      shipLog.innerText = `You sunk my ${ship.name}!`;

      if (logEl) {
        logEl.append(shipLog);
      }
    });
  }
});
