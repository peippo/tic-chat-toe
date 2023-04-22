import { describe, expect, it } from "vitest";
import * as utils from "./game";

describe("findRandomFreeCell", () => {
  it("should return a free cell if possible", () => {
    const occupiedCells = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ];
    const result = utils.findRandomFreeCell(occupiedCells);
    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(result?.x).toBeDefined();
    expect(result?.y).toBeDefined();
    expect(result?.x).toBeGreaterThanOrEqual(0);
    expect(result?.x).toBeLessThan(3);
    expect(result?.y).toBeGreaterThanOrEqual(0);
    expect(result?.y).toBeLessThan(3);
    expect(
      occupiedCells.some(
        (occupiedCell) =>
          occupiedCell.x === result?.x && occupiedCell.y === result?.y
      )
    ).toBeFalsy();
  });

  it("should return undefined when all cells are occupied", () => {
    const occupiedCells = [
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
    const result = utils.findRandomFreeCell(occupiedCells);
    expect(result).toBeUndefined();
  });
});

describe("playerHasWinningLine", () => {
  it("should return true if the player has a winning line", () => {
    const playerTurns = [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 2 },
    ];
    expect(utils.playerHasWinningLine(playerTurns)).toBe(true);
  });

  it("should return false if the player does not have a winning line", () => {
    const playerTurns = [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 2 },
    ];
    expect(utils.playerHasWinningLine(playerTurns)).toBe(false);
  });
});

describe("formatDateTime", () => {
  it("should format Date object to the defined shape", () => {
    expect(
      utils.formatDateTime(
        new Date(
          "Wed Jun 30 2021 00:30:22 GMT+0300 (Eastern European Summer Time)"
        )
      )
    ).toBe("Jun 30, 00:30");
  });
});
