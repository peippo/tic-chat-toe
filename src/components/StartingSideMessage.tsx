import useRandomStartingSide from "~/hooks/useRandomStartingSide";

const StartingSideMessage = () => {
  const { opponentStarts, isFirstTurn, isRandomizing } =
    useRandomStartingSide();

  if (!isFirstTurn) return <></>;

  return (
    <p className="absolute top-14 text-center text-sm text-gray-400">
      {isRandomizing && <span>Drawing starting side</span>}
      {opponentStarts === true && <span>Opponent starts...</span>}
      {opponentStarts === false && <span>You start...</span>}
    </p>
  );
};

export default StartingSideMessage;
