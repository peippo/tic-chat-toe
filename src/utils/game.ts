import type { Turn } from "@prisma/client";
import type { Cell } from "~/types";

export const findRandomFreeCell = (occupiedCells: Cell[]): Cell | undefined => {
  const allCells = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 0, y: 2 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
  ];

  const freeCells = allCells.filter(
    (cell) =>
      !occupiedCells.some(
        (occupiedCell) => cell.x === occupiedCell.x && cell.y === occupiedCell.y
      )
  );

  const randomIndex = Math.floor(Math.random() * freeCells.length);

  return freeCells[randomIndex];
};

/* prettier-ignore */
const winLines = [
  // horizontal lines
  [ {x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0} ],
  [ {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1} ],
  [ {x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 2} ],
  
  // vertical lines
  [ {x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2} ],
  [ {x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2} ],
  [ {x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2} ],

  // diagonal lines
  [ {x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2} ],
  [ {x: 0, y: 2}, {x: 1, y: 1}, {x: 2, y: 0} ]
]

export const playerHasWinningLine = (playerTurns: Pick<Turn, "x" | "y">[]) => {
  let foundWinningLine = false;

  for (const line of winLines) {
    if (
      line.every((cell) =>
        playerTurns.some(
          (playedCell) => playedCell.x === cell.x && playedCell.y === cell.y
        )
      )
    ) {
      foundWinningLine = true;
      break;
    }
  }

  return foundWinningLine;
};
