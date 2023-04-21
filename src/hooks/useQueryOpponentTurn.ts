import { api } from "~/utils/api";
import useGame from "~/hooks/useGame";
import { playerHasWinningLine } from "~/utils/game";
import { atom, useAtom } from "jotai";

export const isLoadingOpponentTurnAtom = atom(false);

const useQueryOpponentTurn = () => {
  const utils = api.useContext();
  const { game } = useGame();
  const [_, setIsLoading] = useAtom(isLoadingOpponentTurnAtom);

  const { mutate: queryOpponentTurn } = api.turn.queryOpponentTurn.useMutation({
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
          console.log("Opponent won!");
        } else {
          setIsLoading(false);
        }
      }
    },
  });

  return { queryOpponentTurn };
};

export default useQueryOpponentTurn;
