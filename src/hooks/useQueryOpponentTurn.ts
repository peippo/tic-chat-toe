import { api } from "~/utils/api";
import useGame from "~/hooks/useGame";
import { playerHasWinningLine } from "~/utils/game";
import { atom, useAtom } from "jotai";

export const isLoadingOpponentTurnAtom = atom(false);

const useQueryOpponentTurn = () => {
  const utils = api.useContext();
  const { game } = useGame();
  const [, setIsLoading] = useAtom(isLoadingOpponentTurnAtom);

  const { mutate: updateGameState } = api.game.updateGameState.useMutation({
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
          updateGameState({ gameId: game?.gameId, gameState: "LOST" });
        } else if (gameData?.turns.length === 9) {
          updateGameState({ gameId: game?.gameId, gameState: "TIE" });
        }

        setIsLoading(false);
      }
    },
  });

  return { queryOpponentTurn };
};

export default useQueryOpponentTurn;
