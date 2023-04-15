import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { type NextPage } from "next";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const createGame = api.game.createGame.useMutation({
    onSuccess: (data) => {
      router.push(`/game/${data.gameId}`);
    },
  });

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <button
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20 disabled:cursor-not-allowed disabled:text-slate-500 disabled:hover:bg-white/10"
          onClick={() => createGame.mutate()}
          disabled={!sessionData}
        >
          {sessionData && sessionData.user?.activeGameId
            ? "Resume game"
            : "Create game"}
        </button>

        <div className="mt-16 flex flex-col items-center justify-center gap-4">
          <p className="text-center text-white">
            {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
          </p>
          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
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
