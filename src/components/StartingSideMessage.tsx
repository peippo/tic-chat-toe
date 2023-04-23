import useRandomStartingSide from "~/hooks/useRandomStartingSide";

const StartingSideMessage = () => {
  const { opponentStarts, isFirstTurn } = useRandomStartingSide();

  if (!isFirstTurn) return <></>;

  return (
    <>
      <p className="absolute top-14 text-center text-sm text-gray-400">
        {opponentStarts ? (
          <span>Opponent starts...</span>
        ) : (
          <span>You start...</span>
        )}
      </p>
    </>
  );
};

export default StartingSideMessage;
