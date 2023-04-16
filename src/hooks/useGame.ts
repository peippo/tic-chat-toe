import { useRouter } from "next/router";
import { api } from "~/utils/api";

const useGame = () => {
  const router = useRouter();
  const { gameId } = router.query;

  const { data: game, status } = api.game.getGame.useQuery(
    {
      gameId: gameId as string,
    },
    { enabled: !!gameId }
  );

  return { game, status };
};

export default useGame;
