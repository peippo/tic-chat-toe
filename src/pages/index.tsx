import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import useUpdatedSessionData from "~/hooks/useUpdatedSessionData";
import { type NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const { mutate: createGame } = api.game.createGame.useMutation({
    onSuccess: async (data) => {
      await router.push(`/play/${data.gameId}`);
    },
  });

  // Update session data to get the current activeGameId state
  useUpdatedSessionData();

  return (
    <>
      <div className="flex h-full flex-col items-center justify-between gap-2 pb-5">
        <div className="relative mb-7 flex w-full flex-col items-center bg-gray-600 pt-6">
          <h1 className="-mb-1 text-2xl text-gray-300 drop-shadow-text">
            Tic-<span className="text-gray-400">Chat</span>-Toe
            <span className="text-xl text-gray-400">™</span>
          </h1>
          <p className="mb-4 text-xs text-gray-350 drop-shadow-text">
            Powered by ChatGPT
          </p>

          <button
            className="text-md z-10 -mb-3 mt-2 w-48 rounded-lg bg-gray-800 py-3 text-gray-400 drop-shadow-button transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:text-gray-500/50 disabled:hover:bg-gray-800"
            onClick={() => createGame()}
            disabled={!sessionData}
          >
            {sessionData && sessionData.user?.activeGameId
              ? "Resume game"
              : "New game"}
          </button>
          <Image
            src="/xo-divider.png"
            alt=""
            width="224"
            height="112"
            className="absolute -bottom-[56px]"
            priority={true}
            draggable={false}
          />
        </div>

        <Link
          className="w-40 rounded-lg bg-gray-350 py-3 text-center text-xs text-gray-800 no-underline drop-shadow-button transition hover:bg-gray-350/80"
          href="/archive"
        >
          Games archive
        </Link>
        <Link
          className="w-40 rounded-lg bg-gray-350 py-3 text-center text-xs text-gray-800 no-underline drop-shadow-button transition hover:bg-gray-350/80"
          href="/stats"
        >
          Statistics
        </Link>

        <div className="mt-auto flex flex-col items-center justify-center gap-2">
          <p className="text-center text-sm text-gray-800">
            {sessionData ? (
              <span>
                Logged in
                {sessionData.user.name && (
                  <span> as {sessionData.user.name.substring(0, 7)}</span>
                )}
              </span>
            ) : (
              <span>Login to play</span>
            )}
          </p>
          <button
            className="w-40 rounded-lg bg-gray-350 py-3 text-center text-xs text-gray-800 drop-shadow-button transition hover:bg-gray-350/80"
            onClick={sessionData ? () => void signOut() : () => void signIn()}
          >
            {sessionData ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
