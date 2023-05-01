import { useEffect } from "react";
import classNames from "classnames";
import { atom, useAtom } from "jotai";
import useGame from "~/hooks/useGame";

export const currentTurnNumberAtom = atom(1);

const TurnSlider = () => {
  const { game } = useGame();
  const [currentTurnNumber, setCurrentTurnNumber] = useAtom(
    currentTurnNumberAtom
  );

  const turnsCount = game?.turns.length;

  useEffect(() => {
    setCurrentTurnNumber(1);
  }, [setCurrentTurnNumber]);

  if (!turnsCount) return <></>;

  return (
    <div className="absolute -top-3 flex items-center justify-center rounded-sm border-b-4 border-gray-700 bg-gray-350 p-3">
      <button
        onClick={() => setCurrentTurnNumber(Math.max(currentTurnNumber - 1, 1))}
        className="text-sm tracking-tighter"
      >
        <span className="sr-only">View previous turn</span>
        <span aria-hidden="true">&lt;&lt;</span>
      </button>
      <div className="relative flex items-center px-2">
        <label className="sr-only" htmlFor="turn-slider">
          Browse game turns
        </label>
        <input
          id="turn-slider"
          type="range"
          min="1"
          max={turnsCount}
          step="1"
          value={currentTurnNumber}
          onChange={(event) => setCurrentTurnNumber(Number(event.target.value))}
          className="relative z-10 h-1 max-w-[10rem] cursor-pointer appearance-none bg-gray-700 accent-gray-800 hover:accent-gray-800"
        />

        <div className="absolute inset-0 flex items-center justify-between px-4">
          {Array.from({ length: turnsCount }, (_, i) => (
            <span
              key={i}
              className={classNames(
                "relative block h-4 w-[1px] border-l border-r border-gray-700",
                "after:absolute after:left-1/2 after:top-1/2 after:block after:h-2 after:w-2 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-gray-700"
              )}
            ></span>
          ))}
        </div>
      </div>
      <button
        onClick={() =>
          setCurrentTurnNumber(Math.min(currentTurnNumber + 1, turnsCount))
        }
        className="text-sm tracking-tighter"
      >
        <span className="sr-only">View next turn</span>
        <span aria-hidden="true">&gt;&gt;</span>
      </button>
    </div>
  );
};

export default TurnSlider;
