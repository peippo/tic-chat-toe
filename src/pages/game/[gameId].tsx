import Head from "next/head";
import type { NextPage } from "next";
import GameArea from "~/components/GameArea";

const Game: NextPage = () => {
  return (
    <>
      <Head>
        <title>Game</title>
      </Head>
      <GameArea />
    </>
  );
};

export default Game;
