import Head from "next/head";
import classNames from "classnames";
import { NextFont } from "next/dist/compiled/@next/font";
import Controls from "./Controls";

type Props = {
  children: React.ReactNode;
  font: NextFont;
};

const Layout: React.FC<Props> = ({ children, font }) => {
  return (
    <>
      <Head>
        <title>Tic-Chat-Toe</title>
        <meta name="description" content="Play Tic-Tac-Toe with ChatGPT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={classNames(
          "flex h-screen min-h-screen flex-col items-center justify-center bg-slate-800",
          font.className
        )}
      >
        <div className="relative overflow-hidden rounded-3xl border-x-2 border-b-[12px] border-t-2 border-x-purple-500 border-b-purple-800 border-t-purple-600 bg-purple-700 bg-gradient-to-t from-purple-400 via-purple-600 via-15% to-purple-800 px-8 pt-4 shadow-2xl shadow-purple-950">
          <div className="pointer-events-none absolute -top-80 right-40 h-[512px] w-40 rotate-45 bg-gradient-to-t from-cyan-400 via-cyan-500 via-10% to-slate-600 to-70% opacity-30 mix-blend-lighten"></div>
          <div className="pointer-events-none absolute -top-72 right-40 h-[512px] w-60 rotate-45 bg-gradient-to-t from-cyan-400 via-cyan-500 via-30% to-slate-600 to-80% opacity-20 mix-blend-lighten"></div>
          <div className="absolute bottom-0 right-0 h-[1px] w-64 bg-gradient-to-r from-purple-400 via-white to-purple-400"></div>

          <div className="rounded-br-4xl rounded-xl rounded-bl-3xl border-b-2 border-b-purple-400 bg-gray-900 px-4 pb-1 pt-4">
            <div className="h-96 w-64 rounded-sm border-b border-b-gray-400 bg-gradient-to-b from-gray-400 to-gray-500 p-8">
              {children}
            </div>
            <h1 className="text-center text-lg tracking-tight text-slate-400">
              Tic-<span className="text-purple-400">Chat</span>-Toe
              <span className="text-slate-600">™</span>
            </h1>
          </div>
          <Controls />
        </div>
      </main>
    </>
  );
};

export default Layout;
