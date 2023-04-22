import { useRef } from "react";
import { useAtom } from "jotai";
import classNames from "classnames";
import useGame from "~/hooks/useGame";
import { isLoadingOpponentTurnAtom } from "~/hooks/useQueryOpponentTurn";
import useObserveHeight from "~/hooks/useObserveHeight";
import { currentTurnNumberAtom } from "./TurnSlider";

const Comment: React.FC<{ isViewMode?: boolean }> = ({ isViewMode }) => {
  const { game } = useGame();
  const [isLoading] = useAtom(isLoadingOpponentTurnAtom);
  const [currentTurnNumber] = useAtom(currentTurnNumberAtom);
  const contentRef = useRef(null);
  const height = useObserveHeight(contentRef) ?? 0;

  const turns = isViewMode
    ? game?.turns.slice(0, currentTurnNumber) ?? []
    : game?.turns ?? [];
  const opponentTurns = turns?.filter((turn) => !turn.isByUser);
  const latestOpponentTurn = opponentTurns?.pop();

  return (
    <div
      className={classNames(
        "relative w-full px-2 transition-opacity duration-700",
        latestOpponentTurn?.comment ? "opacity-100" : "opacity-0"
      )}
    >
      <div
        className="relative mb-4 flex w-full items-center justify-center overflow-hidden rounded-sm bg-gray-900 transition-all"
        style={{
          transition: "0.3s",
          height: `${height}px`,
        }}
      >
        <div className="mx-auto h-fit w-fit text-gray-400" ref={contentRef}>
          {isLoading ? (
            <p className="animate-bounce p-3 text-2xl leading-none">...</p>
          ) : (
            <p className="p-3 text-center text-xs">
              {latestOpponentTurn?.comment}
            </p>
          )}
        </div>
      </div>
      <div className="absolute bottom-2 right-1/2 h-0 w-0 translate-x-1/2 border-x-8 border-t-8 border-gray-900 border-x-transparent"></div>
    </div>
  );
};

export default Comment;
