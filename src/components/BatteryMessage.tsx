import { useState, useEffect } from "react";
import useSessionStorage from "~/hooks/useSessionStorage";

const BatteryMessage = () => {
  const [hideBatteryMessage, setHideBatteryMessage] =
    useSessionStorage<boolean>("hide-battery-message", false);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || hideBatteryMessage) {
    return <></>;
  }

  return (
    <div className="absolute inset-0 bg-gray-900/50">
      <div className="absolute inset-5 z-20 flex flex-col items-center justify-center rounded-md border border-b-4 border-gray-900 bg-gray-800 p-4 text-center text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          width="48"
          className="mx-auto mb-5"
        >
          <path
            fill="currentColor"
            d="M464 160c8.8 0 16 7.2 16 16V336c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16H464zM80 96C35.8 96 0 131.8 0 176V336c0 44.2 35.8 80 80 80H464c44.2 0 80-35.8 80-80V320c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32V176c0-44.2-35.8-80-80-80H80zm80 96H96V320h64V192z"
          />
        </svg>
        <h2 className="text-md mb-3">Battery level critical!</h2>
        <p className="text-xs">
          Artificial intelligence level set to{" "}
          <strong className="text-gray-300">low</strong> to preserve battery
        </p>
        <button
          className="mt-5 w-20 rounded-lg bg-gray-400 py-3 text-center text-sm text-gray-800 no-underline drop-shadow-button transition hover:bg-gray-400/80"
          onClick={() => setHideBatteryMessage(true)}
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default BatteryMessage;
