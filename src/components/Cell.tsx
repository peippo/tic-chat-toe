import { api } from "~/utils/api";
import useGame from "~/hooks/useGame";
import type { Cell } from "~/types";

const Cell: React.FC<Cell> = ({ x, y }) => {
  const utils = api.useContext();
  const { game } = useGame();

  const matchingTurn = game?.turns.find((turn) => turn.x === x && turn.y === y);

  const submitUserTurn = api.turn.submitUserTurn.useMutation({
    onSuccess: () => {
      // FIXME: Update query cache w/ useContext setData helper instead of refetching
      // https://trpc.io/docs/reactjs/usecontext
      if (game?.gameId) {
        utils.game.getGame.refetch({ gameId: game?.gameId });
      }
    },
  });

  if (matchingTurn) {
    return (
      <div className="pointer-events-none">
        {matchingTurn.isByUser ? "X" : "O"}
      </div>
    );
  }

  return (
    <button
      className="absolute inset-0 hover:bg-gray-400"
      onClick={() =>
        submitUserTurn.mutate({
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
