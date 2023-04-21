import type { Cell } from "~/types";
import useGame from "~/hooks/useGame";
import useSubmitUserTurn from "~/hooks/useSubmitUserTurn";
import { useAtom } from "jotai";
import { isLoadingOpponentTurnAtom } from "~/hooks/useQueryOpponentTurn";

const Cell: React.FC<Cell> = ({ x, y }) => {
  const { game } = useGame();
  const { submitUserTurn } = useSubmitUserTurn();
  const [isLoadingOpponentTurn] = useAtom(isLoadingOpponentTurnAtom);
  const isGameFinished = Boolean(game && game?.wonByUser !== null);

  const matchingTurn = game?.turns.find((turn) => turn.x === x && turn.y === y);

  if (matchingTurn) {
    return (
      <div className="pointer-events-none">
        {matchingTurn.isByUser ? "X" : "O"}
      </div>
    );
  }

  return (
    <button
      className="absolute inset-0 hover:bg-gray-400 disabled:hover:bg-transparent"
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

export default Cell;
