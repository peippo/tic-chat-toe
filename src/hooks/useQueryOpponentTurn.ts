import { api } from "~/utils/api";
import useGame from "~/hooks/useGame";
import { playerHasWinningLine } from "~/utils/game";
import { atom, useAtom } from "jotai";

export const isLoadingOpponentTurnAtom = atom(false);

const useQueryOpponentTurn = () => {
  const utils = api.useContext();
  const { game } = useGame();
  const [, setIsLoading] = useAtom(isLoadingOpponentTurnAtom);

  const { mutate: updateWinner } = api.game.updateWinner.useMutation({
    onSuccess: async () => {
      await utils.invalidate();
    },
  });

  const { mutate: queryOpponentTurn } = api.turn.queryOpponentTurn.useMutation({
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (newTurn) => {
      if (game?.gameId) {
        const gameData = utils.game.getGame.getData({ gameId: game.gameId });

        if (gameData) {
          utils.game.getGame.setData(
            { gameId: game.gameId },
            { ...gameData, turns: [...gameData.turns, newTurn] }
          );
        }
      }
    },
    onSettled: () => {
      if (game?.gameId) {
        const gameData = utils.game.getGame.getData({ gameId: game?.gameId });
        const opponentTurns = gameData?.turns.filter((turn) => !turn.isByUser);

        if (opponentTurns && playerHasWinningLine(opponentTurns)) {
          updateWinner({ gameId: game?.gameId, wonByUser: false });
        }

        setIsLoading(false);
      }
    },
  });

  return { queryOpponentTurn };
};

export default useQueryOpponentTurn;
