import type { Cell } from "~/types";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import classNames from "classnames";
import useGame from "~/hooks/useGame";
import useSubmitUserTurn from "~/hooks/useSubmitUserTurn";
import { isLoadingOpponentTurnAtom } from "~/hooks/useQueryOpponentTurn";
import { currentTurnNumberAtom } from "./TurnSlider";
import { playerHasWinningLine } from "~/utils/game";

const CellComponent: React.FC<Cell & { isViewMode: boolean }> = ({
  x,
  y,
  isViewMode,
}) => {
  const router = useRouter();
  const { isLive } = router.query;
  const { game } = useGame();
  const { submitUserTurn } = useSubmitUserTurn();
  const [isLoadingOpponentTurn] = useAtom(isLoadingOpponentTurnAtom);
  const [currentTurnNumber] = useAtom(currentTurnNumberAtom);

  const userWinLine = playerHasWinningLine(
    game?.turns.filter((turn) => turn.isByUser) ?? []
  );
  const opponentWinLine = playerHasWinningLine(
    game?.turns.filter((turn) => !turn.isByUser) ?? []
  );
  const inWinLine =
    (userWinLine &&
      userWinLine?.some((cell) => cell.x === x && cell.y === y)) ||
    (opponentWinLine &&
      opponentWinLine?.some((cell) => cell.x === x && cell.y === y));

  if (isViewMode) {
    const turns = isLive
      ? game?.turns
      : game?.turns.slice(0, currentTurnNumber);

    const matchingTurn = turns?.find((turn) => turn.x === x && turn.y === y);
    const isLastTurn = game?.turns?.length === currentTurnNumber;

    return (
      <div
        className={classNames(
          "pointer-events-none flex h-full items-center justify-center transition-colors duration-500",
          matchingTurn ? "bg-gray-400 shadow-cell-active" : "shadow-cell",
          inWinLine && isLastTurn && "text-gray-300"
        )}
      >
        {matchingTurn ? (matchingTurn.isByUser ? "X" : "O") : null}
      </div>
    );
  }

  const isGameFinished = Boolean(game && game?.gameState !== "IN_PROGRESS");
  const matchingTurn = game?.turns.find((turn) => turn.x === x && turn.y === y);

  if (matchingTurn) {
    return (
      <div
        className={classNames(
          "pointer-events-none flex h-full items-center justify-center bg-gray-400 shadow-cell-active transition-colors duration-500",
          inWinLine && "text-gray-300"
        )}
      >
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
