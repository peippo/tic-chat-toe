import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import useGame from "~/hooks/useGame";
import { currentTurnNumberAtom } from "./TurnSlider";
import { useAtom } from "jotai";
import classNames from "classnames";

const DeleteGameButton = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const { game } = useGame();
  const [currentTurnNumber] = useAtom(currentTurnNumberAtom);

  const { mutate: deleteGame } = api.game.deleteGame.useMutation({
    onSuccess: async () => {
      await router.push("/");
    },
  });

  return (
    <div
      className={classNames(
        "absolute bottom-0 left-1/2 flex h-24 w-full -translate-x-1/2 bg-gradient-to-t from-gray-600 to-gray-600/60 px-2 transition-opacity duration-700",
        currentTurnNumber === 1 ? "opacity-100" : "opacity-0"
      )}
    >
      {game &&
        game.createdById === sessionData?.user.id &&
        currentTurnNumber === 1 && (
          <button
            className="mx-auto mb-4 flex w-48 items-center justify-center self-end rounded-lg bg-gray-400 p-1 py-3 text-gray-800 drop-shadow-button transition hover:bg-gray-400/80"
            onClick={() => deleteGame({ gameId: game?.gameId })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="14"
            >
              <path
                fill="currentColor"
                d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"
              />
            </svg>
            <span className="ml-2 text-sm">Delete game</span>
          </button>
        )}
    </div>
  );
};

export default DeleteGameButton;
