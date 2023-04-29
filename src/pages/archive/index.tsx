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
    <>
      <Head>
        <title>Games archive</title>
      </Head>
      <div className="flex h-full flex-col justify-between">
        <div className="bg-gray-600">
          <h2 className="py-3 text-center text-xs text-gray-300">
            Games archive
          </h2>
        </div>
        <table className="mb-auto mt-0 w-full">
          <thead>
            <tr className="bg-gray-600 text-left text-xs text-gray-300">
              <th className="border-b-4 border-r-2 border-b-gray-700 border-r-gray-400 px-2 py-1 font-normal">
                User
              </th>
              <th className="border-b-4 border-r-2 border-b-gray-700 border-r-gray-400 px-2 py-1 font-normal">
                Date
              </th>
              <th className="border-b-4 border-b-gray-700 px-2 py-1 font-normal">
                State
              </th>
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
                className="m-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gray-350 text-center text-gray-800 drop-shadow-button transition hover:bg-gray-350/80"
                onClick={handleFetchPreviousPage}
              >
                <span className="sr-only">Previous</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="14"
                >
                  <path
                    fill="currentColor"
                    d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l160-160c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 96 184 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-184 0 0 96c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-160-160z"
                  />
                </svg>
              </button>
            )}
            {hasNextPage && (
              <button
                className="m-3 ml-auto flex h-9 w-9 items-center justify-center rounded-lg bg-gray-350 text-center text-gray-800 drop-shadow-button transition hover:bg-gray-350/80"
                onClick={handleFetchNextPage}
              >
                <span className="sr-only">Next</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="14"
                >
                  <path
                    fill="currentColor"
                    d="M438.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6l0-96L40 320c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40l184 0 0-96c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l160 160z"
                  />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Archive;
