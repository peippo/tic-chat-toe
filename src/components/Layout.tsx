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
        <div className="rounded-3xl border-x-2 border-b-[12px] border-t-2 border-x-purple-500 border-b-purple-800 border-t-purple-600 bg-purple-700 bg-gradient-to-t from-purple-400 via-purple-600 via-15% to-purple-800 px-8 pt-4 shadow-2xl shadow-purple-950">
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
