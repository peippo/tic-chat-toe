import useGame from "~/hooks/useGame";

const GameEndStatus = () => {
  const { game } = useGame();
  const isGameFinished = game && game?.wonByUser !== null;
  const isGameWon = game?.wonByUser;

  if (!isGameFinished) return <></>;

  return (
    <div className="absolute -top-3 rounded-sm border-b-4 border-gray-700 bg-gray-400 px-3 py-1">
      {isGameWon ? <p>You won!</p> : <p>You lost!</p>}
    </div>
  );
};

export default GameEndStatus;
