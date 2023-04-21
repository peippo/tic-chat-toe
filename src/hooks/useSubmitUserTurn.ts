import { api } from "~/utils/api";
import useGame from "~/hooks/useGame";
import useQueryOpponentTurn, {
  isLoadingOpponentTurnAtom,
} from "~/hooks/useQueryOpponentTurn";
import { playerHasWinningLine } from "~/utils/game";
import { useAtom } from "jotai";

const useSubmitUserTurn = () => {
  const utils = api.useContext();
  const { game } = useGame();
  const { queryOpponentTurn } = useQueryOpponentTurn();
  const [_, setIsLoadingOpponentTurn] = useAtom(isLoadingOpponentTurnAtom);

  const { mutate: submitUserTurn } = api.turn.submitUserTurn.useMutation({
    onMutate: () => {
      setIsLoadingOpponentTurn(true);
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
        const userTurns = gameData?.turns.filter((turn) => turn.isByUser);

        if (userTurns && playerHasWinningLine(userTurns)) {
          console.log("User won!");
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
