import { useRef } from "react";
import { SwitchTransition, Transition } from "react-transition-group";
import { useRouter } from "next/router";
import classNames from "classnames";

const FadeTransition: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const nodeRef = useRef(null);

  return (
    <SwitchTransition>
      <Transition
        timeout={500}
        mountOnEnter={true}
        unmountOnExit={true}
        key={router.asPath}
        nodeRef={nodeRef}
      >
        {(status) => (
          <div
            className={classNames(
              "h-full transition-all duration-500 ease-in-out",
              status === "entering" && "opacity-100",
              status === "entered" && "opacity-100",
              status === "exiting" && "bg-gray-800 opacity-0 blur-sm",
              status === "exited" && "bg-gray-800 opacity-0 blur-sm"
            )}
            ref={nodeRef}
          >
            {children}
          </div>
        )}
      </Transition>
    </SwitchTransition>
  );
};

export default FadeTransition;
