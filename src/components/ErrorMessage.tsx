import { api } from "~/utils/api";
import useGame from "~/hooks/useGame";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { isOpponentErrorAtom } from "~/hooks/useQueryOpponentTurn";

const ErrorMessage = () => {
  const router = useRouter();
  const { game } = useGame();
  const [, setIsOpponentError] = useAtom(isOpponentErrorAtom);
  const { mutate: deleteGame } = api.game.deleteGame.useMutation({
    onSuccess: async () => {
      setIsOpponentError(false);
      await router.push("/");
    },
  });

  const handleResetClick = () => {
    if (game?.gameId) {
      deleteGame({ gameId: game?.gameId });
    }
  };

  return (
    <div className="absolute inset-0 bg-gray-900/50">
      <div className="absolute inset-5 z-20 flex flex-col items-center justify-center rounded-md border border-b-4 border-gray-900 bg-gray-800 p-4 text-center text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          width="48"
          className="mx-auto mb-5"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M224 0c8.8 0 16 7.2 16 16V64h64c35.3 0 64 28.7 64 64V256c0 35.3-28.7 64-64 64H144c-35.3 0-64-28.7-64-64V128c0-35.3 28.7-64 64-64h64V16c0-8.8 7.2-16 16-16zM16 144c0-8.8 7.2-16 16-16s16 7.2 16 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V144zm400-16c8.8 0 16 7.2 16 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V144c0-8.8 7.2-16 16-16zM160 240a16 16 0 1 0 0 32 16 16 0 1 0 0-32zm48 16a16 16 0 1 0 32 0 16 16 0 1 0 -32 0zm80-16a16 16 0 1 0 0 32 16 16 0 1 0 0-32zM96 352H352c53 0 96 43 96 96v32c0 17.7-14.3 32-32 32H352V448c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32v64H32c-17.7 0-32-14.3-32-32V448c0-53 43-96 96-96zm80 112v48H144V464c0-8.8 7.2-16 16-16s16 7.2 16 16zm48-16c8.8 0 16 7.2 16 16v48H208V464c0-8.8 7.2-16 16-16zm80 16v48H272V464c0-8.8 7.2-16 16-16s16 7.2 16 16zM119.5 119.5c-4.7 4.7-4.7 12.3 0 17L143 160l-23.5 23.5c-4.7 4.7-4.7 12.3 0 17s12.3 4.7 17 0L160 177l23.5 23.5c4.7 4.7 12.3 4.7 17 0s4.7-12.3 0-17L177 160l23.5-23.5c4.7-4.7 4.7-12.3 0-17s-12.3-4.7-17 0L160 143l-23.5-23.5c-4.7-4.7-12.3-4.7-17 0zm145 0c-4.7-4.7-12.3-4.7-17 0s-4.7 12.3 0 17L271 160l-23.5 23.5c-4.7 4.7-4.7 12.3 0 17s12.3 4.7 17 0L288 177l23.5 23.5c4.7 4.7 12.3 4.7 17 0s4.7-12.3 0-17L305 160l23.5-23.5c4.7-4.7 4.7-12.3 0-17s-12.3-4.7-17 0L288 143l-23.5-23.5z"
          />
        </svg>
        <h2 className="text-md mb-3">Beep boop!</h2>
        <p className="text-xs">
          Artificial intelligence is{" "}
          <strong className="text-gray-300">overheating</strong> and is unable
          to finish the game, sorry!
        </p>
        <button
          className="mt-5 w-32 rounded-lg bg-gray-400 py-3 text-center text-sm text-gray-800 no-underline drop-shadow-button transition hover:bg-gray-400/80"
          onClick={handleResetClick}
        >
          Reset game
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
