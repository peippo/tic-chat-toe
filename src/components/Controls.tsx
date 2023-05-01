import { useState } from "react";
import classNames from "classnames";
import { useKeyPress } from "~/hooks/useKeyPress";
import { keyBindings } from "~/utils/keybindings";

const DirectionButton: React.FC<{
  children: React.ReactNode;
  extraClasses?: string;
  onClickHandler: () => void;
  isPressed: boolean;
}> = ({ children, extraClasses, onClickHandler, isPressed = false }) => {
  return (
    <button
      onClick={onClickHandler}
      className={classNames(
        "group relative flex h-9 w-9 items-center justify-center rounded-sm shadow-md outline-none transition-all",
        !isPressed &&
          "border-x border-b-4 border-x-purple-500 border-b-purple-900 border-t-violet-950 bg-violet-800 text-gray-200",
        "active:border-b active:border-x-purple-500 active:border-b-purple-400 active:bg-violet-900 active:text-gray-300 active:shadow-none",
        isPressed &&
          "border-b border-x-purple-500 border-b-purple-400 bg-violet-900 text-gray-300 shadow-none",
        extraClasses
      )}
      tabIndex={-1}
    >
      <div
        className={classNames(
          "absolute h-full w-full border-b border-b-purple-300 border-t-purple-500 shadow-button transition-all",
          "group-active:border-transparent group-active:shadow-button-active",
          isPressed && "border-transparent shadow-button-active",
          extraClasses
        )}
      ></div>

      {children}
    </button>
  );
};

const ActionButton: React.FC<{
  children: React.ReactNode;
  extraClasses?: string;
  onClickHandler: () => void;
  isPressed: boolean;
}> = ({ children, extraClasses, onClickHandler, isPressed = false }) => {
  return (
    <button
      onClick={onClickHandler}
      className={classNames(
        "group relative flex items-center justify-center rounded-full shadow-md outline-none transition-all ease-in-out",
        !isPressed &&
          "border-x border-b-4 border-x-purple-500 border-b-purple-900 border-t-violet-950 bg-violet-800 text-gray-200",
        "active:border-b active:border-x-purple-500 active:border-b-purple-400 active:bg-violet-900 active:text-gray-300 active:shadow-none",
        isPressed &&
          "border-b border-x-purple-500 border-b-purple-400 bg-violet-900 text-gray-300 shadow-none",
        extraClasses
      )}
      tabIndex={-1}
    >
      <div
        className={classNames(
          "absolute h-full w-full rounded-full border-b border-b-purple-300 shadow-button transition-all ease-in-out",
          "group-active:border-transparent group-active:shadow-button-active",
          isPressed && "border-transparent shadow-button-active"
        )}
      ></div>
      {children}
    </button>
  );
};

const Controls = () => {
  const [upPressed, setUpPressed] = useState(false);
  const [downPressed, setDownPressed] = useState(false);
  const [leftPressed, setLeftPressed] = useState(false);
  const [rightPressed, setRightPressed] = useState(false);
  const [backPressed, setBackPressed] = useState(false);
  const [selectPressed, setSelectPressed] = useState(false);

  // TODO: button handlers, maybe set via context individually for each page route?
  const handleUp = () => {
    console.log("Up");
  };

  const handleDown = () => {
    console.log("Down");
  };

  const handleLeft = () => {
    console.log("Left");
  };

  const handleRight = () => {
    console.log("Right");
  };

  const handleBack = () => {
    console.log("Back");
  };

  const handleSelect = () => {
    console.log("Select");
  };

  /* prettier-ignore */
  {
    useKeyPress({targetKey: keyBindings.up, onKeyDown: () => setUpPressed(true), onKeyUp: () => setUpPressed(false)});
    useKeyPress({targetKey: keyBindings.down, onKeyDown: () => setDownPressed(true), onKeyUp: () => setDownPressed(false)});
    useKeyPress({targetKey: keyBindings.left, onKeyDown: () => setLeftPressed(true), onKeyUp: () => setLeftPressed(false)});
    useKeyPress({targetKey: keyBindings.right, onKeyDown: () => setRightPressed(true), onKeyUp: () => setRightPressed(false)});
    useKeyPress({targetKey: keyBindings.back, onKeyDown: () => setBackPressed(true), onKeyUp: () => setBackPressed(false)});
    useKeyPress({targetKey: keyBindings.select, onKeyDown: () => setSelectPressed(true), onKeyUp: () => setSelectPressed(false)});
  }

  return (
    <div className="mb-6 mt-5 flex items-center justify-between px-4">
      <div className="flex flex-col items-center gap-[1px]">
        <DirectionButton
          extraClasses="rounded-t-xl"
          onClickHandler={handleUp}
          isPressed={upPressed}
        >
          <span className="sr-only">Up</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            width="10"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
            />
          </svg>
        </DirectionButton>
        <div className="flex gap-[1px]">
          <span className="sr-only">Left</span>
          <DirectionButton
            extraClasses="rounded-l-xl"
            onClickHandler={handleLeft}
            isPressed={leftPressed}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 512"
              width="8"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"
              />
            </svg>
          </DirectionButton>
          <DirectionButton onClickHandler={handleDown} isPressed={downPressed}>
            <span className="sr-only">Down</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              width="10"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
              />
            </svg>
          </DirectionButton>
          <DirectionButton
            extraClasses="rounded-r-xl"
            onClickHandler={handleRight}
            isPressed={rightPressed}
          >
            <span className="sr-only">Right</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 512"
              width="8"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"
              />
            </svg>
          </DirectionButton>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <ActionButton
          extraClasses="mt-6 h-10 w-10"
          onClickHandler={handleBack}
          isPressed={backPressed}
        >
          <span className="sr-only">Back</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            width="14"
            className="-rotate-45"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
            />
          </svg>
        </ActionButton>
        <ActionButton
          extraClasses="mb-4 h-14 w-14"
          onClickHandler={handleSelect}
          isPressed={selectPressed}
        >
          <span className="sr-only">Select</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            width="18"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
            />
          </svg>
        </ActionButton>
      </div>
    </div>
  );
};

export default Controls;
