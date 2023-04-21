import { useState, useLayoutEffect, RefObject } from "react";
import useResizeObserver from "@react-hook/resize-observer";

const useObserveHeight = (target: RefObject<HTMLDivElement>) => {
  const [height, setHeight] = useState<number>();

  useLayoutEffect(() => {
    setHeight(target.current?.getBoundingClientRect().height);
  }, [target]);

  useResizeObserver(target, (entry) => setHeight(entry.contentRect.height));

  return height;
};

export default useObserveHeight;
