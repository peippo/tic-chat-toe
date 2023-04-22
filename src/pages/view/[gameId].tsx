import Head from "next/head";
import type { NextPage } from "next";
import GameArea from "~/components/GameArea";
import Comment from "~/components/Comment";
import TurnSlider from "~/components/TurnSlider";

const Game: NextPage = () => {
  return (
    <>
      <Head>
        <title>Viewing game</title>
      </Head>
      <GameArea isViewMode={true} />
      <div className="absolute bottom-0 left-0 right-0 flex h-36 items-end justify-center bg-gray-600">
        <TurnSlider />
        <Comment isViewMode={true} />
      </div>
    </>
  );
};

export default Game;
