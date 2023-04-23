import { useAtom } from "jotai";
import useQueryOpponentTurn from "~/hooks/useQueryOpponentTurn";
import useGame from "~/hooks/useGame";
import { isLoadingOpponentTurnAtom } from "~/hooks/useQueryOpponentTurn";
import { useEffect } from "react";

const useRandomStartingSide = () => {
  const { game } = useGame();
  const [isLoadingOpponentTurn] = useAtom(isLoadingOpponentTurnAtom);
  const { queryOpponentTurn } = useQueryOpponentTurn();

  const opponentStarts: boolean = Math.random() < 0.5;
  const isFirstTurn = game?.turns.length === 0;

  useEffect(() => {
    if (isFirstTurn && opponentStarts && !isLoadingOpponentTurn) {
      queryOpponentTurn({
        gameId: game.gameId,
      });
    }
  }, [game, isLoadingOpponentTurn, queryOpponentTurn]);

  return { opponentStarts, isFirstTurn };
};

export default useRandomStartingSide;
