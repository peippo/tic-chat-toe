import Head from "next/head";
import type { NextPage } from "next";
import { api } from "~/utils/api";
import { atom, useAtom } from "jotai";
import GameListRow from "~/components/GameListRow";

const currentPageAtom = atom<number>(0);

const Archive: NextPage = () => {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

  const {
    data: games,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    status,
    isFetchingNextPage,
  } = api.game.getGames.useInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchInterval: 10000,
    }
  );

  const handleFetchNextPage = () => {
    fetchNextPage()
      .then(() => {
        setCurrentPage((prev) => prev + 1);
      })
      .catch((error) => console.log(error));
  };

  const handleFetchPreviousPage = () => {
    fetchPreviousPage()
      .then(() => {
        setCurrentPage((prev) => prev - 1);
      })
      .catch((error) => console.log(error));
  };

  const filteredGames = games?.pages[currentPage]?.items;
  const hasPreviousPage = currentPage !== 0;

  return (
    <div className="flex h-full flex-col justify-between">
      <Head>
        <title>Games archive</title>
      </Head>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-600 text-left text-xs text-gray-300">
            <th className="p-2 font-normal">User</th>
            <th className="p-2 font-normal">Date</th>
            <th className="p-2 font-normal">State</th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {status === "success" &&
            !isFetchingNextPage &&
            filteredGames?.map((game) => (
              <GameListRow key={game.gameId} game={game} />
            ))}
        </tbody>
      </table>

      {(hasPreviousPage || hasNextPage) && (
        <div className="mt-4 flex justify-between">
          {hasPreviousPage && (
            <button
              className="m-2 flex items-center rounded-lg bg-gray-400 p-2 text-center text-gray-800 drop-shadow-button transition hover:bg-gray-400/80"
              onClick={handleFetchPreviousPage}
            >
              <span className="sr-only">Previous</span>←
            </button>
          )}
          {hasNextPage && (
            <button
              className="m-2 ml-auto flex items-center rounded-lg bg-gray-400 p-2 text-center text-gray-800 drop-shadow-button transition hover:bg-gray-400/80"
              onClick={handleFetchNextPage}
            >
              <span className="sr-only">Next</span>→
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Archive;
