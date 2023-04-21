import Head from "next/head";
import type { NextPage } from "next";
import GameArea from "~/components/GameArea";
import Comment from "~/components/Comment";

const Game: NextPage = () => {
  return (
    <>
      <Head>
        <title>Game</title>
      </Head>
      <GameArea />
      <div className="absolute bottom-0 left-0 right-0 flex h-36 items-end justify-center bg-gray-600">
        <Comment />
      </div>
    </>
  );
};

export default Game;
