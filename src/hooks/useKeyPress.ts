import { useEffect } from "react";

type KeyEventHandler = (event?: KeyboardEvent) => void;

type UseKeyPressOptions = {
  targetKey: string;
  onKeyDown: KeyEventHandler;
  onKeyUp: KeyEventHandler;
};

export const useKeyPress = ({
  targetKey,
  onKeyDown,
  onKeyUp,
}: UseKeyPressOptions) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        onKeyDown?.(event);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        onKeyUp?.(event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [targetKey, onKeyDown, onKeyUp]);
};
