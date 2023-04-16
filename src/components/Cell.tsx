import { api } from "~/utils/api";
import useGame from "~/hooks/useGame";

const Cell: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  const utils = api.useContext();
  const { game } = useGame();

  const matchingTurn = game?.turns.find((turn) => turn.x === x && turn.y === y);

  const submitTurn = api.game.submitTurn.useMutation({
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
        submitTurn.mutate({
          gameId: game?.gameId as string,
          x: x,
          y: y,
          isByUser: true,
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
