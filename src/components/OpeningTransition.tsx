import { useEffect, useRef, useState } from "react";
import { Transition } from "react-transition-group";
import classNames from "classnames";

const OpeningTransition = () => {
  const [isEntering, setIsEntering] = useState(false);
  const nodeRef = useRef(null);

  const timeout = process.env.NEXT_PUBLIC_API_MODE === "mock" ? 0 : 2000;

  useEffect(() => {
    setTimeout(() => {
      setIsEntering(true);
    }, timeout);
  }, [setIsEntering]);

  return (
    <Transition timeout={1000} in={isEntering} appear={true} nodeRef={nodeRef}>
      {(status) => (
        <>
          <div
            className={classNames(
              "absolute z-40 h-1/2 w-full bg-gray-950 transition-all duration-1000 ease-in-out",
              status === "exited" && "top-0",
              status === "entering" && "-top-1/2",
              status === "entered" && "-top-1/2"
            )}
            ref={nodeRef}
          ></div>
          <div
            className={classNames(
              "absolute z-40 h-1/2 w-full bg-gray-950 transition-all duration-1000 ease-in-out",
              status === "exited" && "bottom-0",
              status === "entering" && "-bottom-1/2",
              status === "entered" && "-bottom-1/2"
            )}
            ref={nodeRef}
          ></div>
        </>
      )}
    </Transition>
  );
};

export default OpeningTransition;
