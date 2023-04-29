import Head from "next/head";
import type { NextPage } from "next";
import { api } from "~/utils/api";
import StatsListRow from "~/components/StatsListRow";
import LoadingSpinner from "~/components/LoadingSpinner";

const Stats: NextPage = () => {
  const { data: userStats } = api.stats.getUserStats.useQuery();
  const { data: topUsersStats, status } = api.stats.getTopUsersStats.useQuery();

  return (
    <>
      <Head>
        <title>Statistics</title>
      </Head>
      {userStats ? (
        <section className="border-b-4 border-gray-700 bg-gray-600">
          <h2 className="py-3 text-center text-xs text-gray-300">
            Personal stats
          </h2>
          <div className="flex justify-between">
            <div className="flex w-1/3 flex-col items-center border-r-2 border-gray-400 p-2 text-2xl text-gray-300">
              <h3 className="text-sm">Won</h3> {userStats.games.WON}
            </div>
            <div className="flex w-1/3 flex-col items-center border-r-2 border-gray-400 p-2 text-2xl text-gray-300">
              <h3 className="text-sm">Lost</h3> {userStats.games.LOST}
            </div>
            <div className="flex w-1/3 flex-col items-center p-2 text-2xl text-gray-300">
              <h3 className="text-sm">Tied</h3> {userStats.games.TIE}
            </div>
          </div>
        </section>
      ) : (
        <section className="border-b-4 border-gray-700 bg-gray-600">
          <h2 className="flex items-center justify-center py-3 text-center text-xs text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="10"
              className="mr-2"
            >
              <path
                fill="currentColor"
                d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"
              />
            </svg>
            Login for personal stats
          </h2>
          <div className="flex justify-between">
            <div className="flex w-1/3 flex-col items-center border-r-2 border-gray-400 p-2 text-2xl text-gray-300">
              <h3 className="text-sm">Won</h3> -
            </div>
            <div className="flex w-1/3 flex-col items-center border-r-2 border-gray-400 p-2 text-2xl text-gray-300">
              <h3 className="text-sm">Lost</h3> -
            </div>
            <div className="flex w-1/3 flex-col items-center p-2 text-2xl text-gray-300">
              <h3 className="text-sm">Tied</h3> -
            </div>
          </div>
        </section>
      )}

      <section>
        <h2 className="bg-gray-800 pb-3 pt-4 text-center text-xs text-gray-300">
          Top players
        </h2>

        <table className="w-full">
          <thead>
            <tr className="bg-gray-600 text-left text-xs text-gray-300">
              <th className="p-2 font-normal">User</th>
              <th className="w-1/5 p-2 text-center font-normal">
                W<span className="sr-only">ins</span>
              </th>
              <th className="w-1/5 p-2 text-center font-normal">
                L<span className="sr-only">osses</span>
              </th>
              <th className="w-1/5 p-2 text-center font-normal">
                W/L <span className="sr-only">ratio</span>
              </th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {status === "loading" && (
              <tr className="w-full">
                <td colSpan={4} className="pt-12">
                  <LoadingSpinner message="Loading stats" />
                </td>
              </tr>
            )}
            {status === "success" &&
              topUsersStats?.map((user) => (
                <StatsListRow key={user.id} user={user} />
              ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Stats;
