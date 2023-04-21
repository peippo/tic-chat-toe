import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { type NextPage } from "next";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const { mutate: createGame } = api.game.createGame.useMutation({
    onSuccess: (data) => {
      router.push(`/game/${data.gameId}`);
    },
  });

  return (
    <>
      <div className="flex flex-col items-center gap-2 p-4">
        <button
          className="rounded-full bg-white/20 px-10 py-3 font-semibold text-gray-800 no-underline transition hover:bg-white/30 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-gray-500/60 disabled:hover:bg-white/10"
          onClick={() => createGame()}
          disabled={!sessionData}
        >
          {sessionData && sessionData.user?.activeGameId
            ? "Resume game"
            : "Create game"}
        </button>

        <div className="mt-16 flex flex-col items-center justify-center gap-4">
          <p className="text-center text-gray-800">
            {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
          </p>
          <button
            className="rounded-full bg-white/20 px-10 py-3 font-semibold text-gray-800 no-underline transition hover:bg-white/30"
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
