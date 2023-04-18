import { api } from "~/utils/api";
import useGame from "~/hooks/useGame";

const ApiTest = () => {
  const utils = api.useContext();
  const { game } = useGame();

  const submitOpponentTurn = api.turn.submitOpponentTurn.useMutation({
    onSuccess: () => {
      if (game?.gameId) {
        utils.game.getGame.refetch({ gameId: game?.gameId });
      }
    },
  });

  return (
    <button
      className="relative z-10 mt-4 rounded-md bg-indigo-700 px-4 py-2 text-sm text-white hover:bg-indigo-800"
      onClick={() =>
        submitOpponentTurn.mutate({
          gameId: game?.gameId as string,
        })
      }
    >
      Fetch AI turn
    </button>
  );
};

export default ApiTest;
