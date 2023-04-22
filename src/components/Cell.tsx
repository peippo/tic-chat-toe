import type { Cell } from "~/types";
import { useAtom } from "jotai";
import classNames from "classnames";
import useGame from "~/hooks/useGame";
import useSubmitUserTurn from "~/hooks/useSubmitUserTurn";
import { isLoadingOpponentTurnAtom } from "~/hooks/useQueryOpponentTurn";
import { currentTurnNumberAtom } from "./TurnSlider";

const CellComponent: React.FC<Cell & { isViewMode: boolean }> = ({
  x,
  y,
  isViewMode,
}) => {
  const { game } = useGame();
  const { submitUserTurn } = useSubmitUserTurn();
  const [isLoadingOpponentTurn] = useAtom(isLoadingOpponentTurnAtom);
  const [currentTurnNumber] = useAtom(currentTurnNumberAtom);

  if (isViewMode) {
    const turns = game?.turns.slice(0, currentTurnNumber);

    const matchingTurn = turns?.find((turn) => turn.x === x && turn.y === y);

    return (
      <div
        className={classNames(
          "pointer-events-none flex h-full items-center justify-center",
          matchingTurn ? "shadow-cell-active" : "shadow-cell"
        )}
      >
        {matchingTurn ? (matchingTurn.isByUser ? "X" : "O") : null}
      </div>
    );
  }

  const isGameFinished = Boolean(game && game?.wonByUser !== null);
  const matchingTurn = game?.turns.find((turn) => turn.x === x && turn.y === y);

  if (matchingTurn) {
    return (
      <div className="pointer-events-none flex h-full items-center justify-center shadow-cell-active">
        {matchingTurn.isByUser ? "X" : "O"}
      </div>
    );
  }

  return (
    <button
      className="absolute inset-0 shadow-cell hover:bg-gray-400 disabled:hover:bg-transparent"
      disabled={isLoadingOpponentTurn || isGameFinished}
      onClick={() =>
        submitUserTurn({
          gameId: game?.gameId as string,
          x: x,
          y: y,
        })
      }
    >
      <span className="sr-only">
        Place in {x}, {y}
      </span>
    </button>
  );
};

export default CellComponent;
