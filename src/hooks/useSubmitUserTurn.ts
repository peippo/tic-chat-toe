import { api } from "~/utils/api";
import useGame from "~/hooks/useGame";
import useQueryOpponentTurn from "~/hooks/useQueryOpponentTurn";
import { playerHasWinningLine } from "~/utils/game";

const useSubmitUserTurn = () => {
  const utils = api.useContext();
  const { game } = useGame();
  const { queryOpponentTurn } = useQueryOpponentTurn();

  const { mutate: updateGameState } = api.game.updateGameState.useMutation({
    onSuccess: async () => {
      await utils.invalidate();
    },
  });

  const { mutate: submitUserTurn } = api.turn.submitUserTurn.useMutation({
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
        const userTurns = gameData?.turns.filter((turn) => turn.isByUser);

        if (userTurns && playerHasWinningLine(userTurns)) {
          updateGameState({ gameId: game?.gameId, gameState: "WON" });
        } else if (gameData?.turns.length === 9) {
          updateGameState({ gameId: game?.gameId, gameState: "TIE" });
        } else {
          queryOpponentTurn({
            gameId: game?.gameId,
          });
        }
      }
    },
  });

  return { submitUserTurn };
};

export default useSubmitUserTurn;
