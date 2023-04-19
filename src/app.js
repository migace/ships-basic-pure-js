import { Battleship, HORIZONTAL, VERTICAL } from "./Battleship";

const ROWS = 10;
const COLUMNS = 10;

const battleshipEl = document.getElementById("battleship");
const battleship = new Battleship(ROWS, COLUMNS);

battleship.addShip("carrier", 1, 1);
battleship.addShip("battleship", 3, 7, VERTICAL);
battleship.addShip("cruiser", 8, 1);
battleship.addShip("submarine", 6, 2);
battleship.addShip("destroyer", 9, 7);

const getBoardField = (value) => {
  if (value === 1) {
    return "⚓";
  } else if (value === 2) {
    return "🔥";
  } else if (value === 3) {
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

  battleshipEl.innerHTML = "";
  battleshipEl.append(...board);
}

// main
renderBoard();

battleshipEl.addEventListener("click", (ev) => {
  if (battleship.isGameOver()) {
    alert("GAME OVER");
  } else {
    const logEl = document.getElementById("log");
    const row = +ev.target.dataset.row;
    const column = +ev.target.dataset.column;

    battleship.attack(row, column);
    renderBoard();

    logEl.innerHTML = "";
    battleship.getSunkShips().forEach((ship) => {
      const shipLog = document.createElement("p");
      shipLog.innerText = `You sunk my ${ship.name}!`;
      logEl.append(shipLog);
    });
  }
});
