import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { type NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const { mutate: createGame } = api.game.createGame.useMutation({
    onSuccess: (data) => {
      router.push(`/play/${data.gameId}`);
    },
  });

  return (
    <>
      <div className="flex h-full flex-col items-center justify-between gap-2 pb-5">
        <div className="relative mb-5 flex w-full flex-col items-center bg-gray-600 pt-5">
          <h1 className="-mb-1 text-2xl text-gray-300 drop-shadow-text">
            Tic-<span className="text-gray-400">Chat</span>-Toe
            <span className="text-xl text-gray-400">™</span>
          </h1>
          <p className="mb-4 text-xs text-gray-400 drop-shadow-text">
            Powered by ChatGPT
          </p>

          <button
            className="z-10 -mb-3 w-48 rounded-lg bg-gray-800 py-3 text-sm font-semibold text-gray-400 no-underline drop-shadow-button transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-gray-800/40 disabled:text-gray-500/50 disabled:hover:bg-gray-800/40"
            onClick={() => createGame()}
            disabled={!sessionData}
          >
            {sessionData && sessionData.user?.activeGameId
              ? "Resume game"
              : "Create game"}
          </button>
          <Image
            src="/xo-divider.png"
            alt=""
            width="800"
            height="400"
            className="absolute -bottom-[56px]"
          />
        </div>

        <Link
          className="w-40 rounded-lg bg-gray-400 py-3 text-center text-xs font-semibold text-gray-800 no-underline drop-shadow-button transition hover:bg-gray-400/80"
          href="/archive"
        >
          Games archive
        </Link>
        <Link
          className="w-40 rounded-lg bg-gray-400 py-3 text-center text-xs font-semibold text-gray-800 no-underline drop-shadow-button transition hover:bg-gray-400/80"
          href="/scores"
        >
          High scores
        </Link>

        <div className="mt-auto flex flex-col items-center justify-center gap-2">
          <p className="text-center text-sm text-gray-800">
            {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
          </p>
          <button
            className="w-40 rounded-lg bg-gray-400 py-3 text-center text-xs font-semibold text-gray-800 no-underline drop-shadow-button transition hover:bg-gray-400/80"
            onClick={sessionData ? () => void signOut() : () => void signIn()}
          >
            {sessionData ? "Sign out" : "Sign in"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
