import { useState } from "react";
import { useAtom } from "jotai";
import useQueryOpponentTurn from "~/hooks/useQueryOpponentTurn";
import useGame from "~/hooks/useGame";
import { isLoadingOpponentTurnAtom } from "~/hooks/useQueryOpponentTurn";
import { useEffect } from "react";

const useRandomStartingSide = () => {
  const { game } = useGame();
  const [isLoadingOpponentTurn] = useAtom(isLoadingOpponentTurnAtom);
  const { queryOpponentTurn } = useQueryOpponentTurn();

  const [opponentStarts, setOpponentStarts] = useState<boolean | null>(null);
  const isFirstTurn = game?.turns.length === 0;

  useEffect(() => {
    if (isFirstTurn && opponentStarts === null) {
      setOpponentStarts(Math.random() < 0.5);
    }
  }, [isFirstTurn, opponentStarts]);

  useEffect(() => {
    if (
      isFirstTurn &&
      opponentStarts &&
      !isLoadingOpponentTurn &&
      game &&
      game.gameId
    ) {
      queryOpponentTurn({
        gameId: game.gameId,
      });
    }
  }, [
    game,
    isLoadingOpponentTurn,
    queryOpponentTurn,
    opponentStarts,
    isFirstTurn,
  ]);

  const isRandomizing = opponentStarts === null;

  return { opponentStarts, isFirstTurn, isRandomizing };
};

export default useRandomStartingSide;
