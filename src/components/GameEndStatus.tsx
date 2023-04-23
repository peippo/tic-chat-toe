import useGame from "~/hooks/useGame";

const GameEndStatus = () => {
  const { game } = useGame();
  const isGameFinished = game && game?.gameState !== "IN_PROGRESS";

  if (!isGameFinished) return <></>;

  return (
    <div className="absolute -top-3 rounded-sm border-b-4 border-gray-700 bg-gray-400 px-3 py-1">
      {game.gameState === "WON" && <p>You won!</p>}
      {game.gameState === "LOST" && <p>You lost!</p>}
      {game.gameState === "TIE" && <p>It&lsquo;s a tie!</p>}
    </div>
  );
};

export default GameEndStatus;
