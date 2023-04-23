import Head from "next/head";
import type { NextPage } from "next";
import GameArea from "~/components/GameArea";
import Comment from "~/components/Comment";
import TurnSlider from "~/components/TurnSlider";
import DeleteGameButton from "~/components/DeleteGameButton";
import { useRouter } from "next/router";

const Game: NextPage = () => {
  const router = useRouter();
  const { isLive } = router.query;

  return (
    <>
      <Head>
        <title>{isLive ? "Viewing live game" : "Viewing game"}</title>
      </Head>
      <GameArea isViewMode={true} />
      <div className="absolute bottom-0 left-0 right-0 flex h-36 items-end justify-center bg-gray-600">
        {!isLive && <TurnSlider />}
        <Comment isViewMode={true} />
      </div>
      <DeleteGameButton />
    </>
  );
};

export default Game;
