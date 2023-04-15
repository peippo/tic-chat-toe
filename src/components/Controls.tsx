import classNames from "classnames";

const DirectionButton: React.FC<{
  children: React.ReactNode;
  extraClasses?: string;
}> = ({ children, extraClasses }) => {
  return (
    <button
      className={classNames(
        "flex h-9 w-9 items-center justify-center rounded-sm shadow-md transition-all",
        "border-x border-b-2 border-x-purple-500 border-b-purple-400 border-t-violet-950 bg-gradient-to-t from-violet-700 to-violet-900 text-gray-200",
        "active:border-b-0 active:border-t-2 active:border-x-violet-900 active:text-gray-300 active:shadow-none",
        extraClasses
      )}
    >
      {children}
    </button>
  );
};

const ActionButton: React.FC<{
  children: React.ReactNode;
  extraClasses?: string;
}> = ({ children, extraClasses }) => {
  return (
    <button
      className={classNames(
        "flex items-center justify-center rounded-full shadow-md transition-all",
        "border-x border-b-2 border-x-purple-500 border-b-purple-400 border-t-violet-950 bg-gradient-to-t from-violet-700 to-violet-900 text-gray-200",
        "active:border-b-0 active:border-t-2 active:border-x-violet-900 active:text-gray-300 active:shadow-none",
        extraClasses
      )}
    >
      {children}
    </button>
  );
};

const Controls = () => {
  return (
    <div className="mb-6 mt-4 flex items-center justify-between">
      <div className="flex flex-col items-center gap-[1px]">
        <DirectionButton extraClasses="rounded-t-xl">
          <span className="sr-only">Up</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            width="10"
          >
            <path
              fill="currentColor"
              d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
            />
          </svg>
        </DirectionButton>
        <div className="flex gap-[1px]">
          <span className="sr-only">Left</span>
          <DirectionButton extraClasses="rounded-l-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 512"
              width="8"
            >
              <path
                fill="currentColor"
                d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"
              />
            </svg>
          </DirectionButton>
          <DirectionButton>
            <span className="sr-only">Down</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              width="10"
            >
              <path
                fill="currentColor"
                d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
              />
            </svg>
          </DirectionButton>
          <DirectionButton extraClasses="rounded-r-xl">
            <span className="sr-only">Right</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 512"
              width="8"
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
        <ActionButton extraClasses="mt-6 h-10 w-10">
          <span className="sr-only">Back</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            width="14"
          >
            <path
              fill="currentColor"
              d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
            />
          </svg>
        </ActionButton>
        <ActionButton extraClasses="mb-4 h-14 w-14">
          <span className="sr-only">Ok</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            width="18"
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
