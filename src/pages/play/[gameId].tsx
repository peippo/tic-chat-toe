import Head from "next/head";
import type { NextPage } from "next";
import { useAtom } from "jotai";
import { isOpponentErrorAtom } from "~/hooks/useQueryOpponentTurn";
import GameArea from "~/components/GameArea";
import Comment from "~/components/Comment";
import GameEndStatus from "~/components/GameEndStatus";
import StartingSideMessage from "~/components/StartingSideMessage";
import ErrorMessage from "~/components/ErrorMessage";

const Game: NextPage = () => {
  const [isOpponentError] = useAtom(isOpponentErrorAtom);

  return (
    <>
      <Head>
        <title>Game</title>
      </Head>
      <GameArea />
      <div className="absolute bottom-0 left-0 right-0 flex h-36 items-end justify-center bg-gray-600">
        <StartingSideMessage />
        <GameEndStatus />
        <Comment />
      </div>

      {isOpponentError && <ErrorMessage />}
    </>
  );
};

export default Game;
