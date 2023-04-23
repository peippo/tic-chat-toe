import { useRouter } from "next/router";
import { api } from "~/utils/api";

const useGame = () => {
  const router = useRouter();
  const { isLive, gameId } = router.query;

  const { data: game, status } = api.game.getGame.useQuery(
    {
      gameId: gameId as string,
    },
    { enabled: !!gameId, refetchInterval: isLive ? 3000 : false }
  );

  return { game, status };
};

export default useGame;
