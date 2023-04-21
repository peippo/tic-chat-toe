import Head from "next/head";
import type { NextPage } from "next";
import useGame from "~/hooks/useGame";
import GameArea from "~/components/GameArea";
import Comment from "~/components/Comment";

const Game: NextPage = () => {
  const { game } = useGame();

  const isGameFinished = game && game?.wonByUser !== null;
  const isGameWon = game?.wonByUser;

  return (
    <>
      <Head>
        <title>Game</title>
      </Head>
      <GameArea />
      <div className="absolute bottom-0 left-0 right-0 flex h-36 items-end justify-center bg-gray-600">
        {isGameFinished && (
          <div className="absolute -top-3 rounded-sm border-b-4 border-gray-700 bg-gray-400 px-3 py-1">
            {isGameWon ? <p>You won!</p> : <p>You lost!</p>}
          </div>
        )}

        <Comment />
      </div>
    </>
  );
};

export default Game;
