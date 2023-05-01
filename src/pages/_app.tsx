import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Silkscreen } from "next/font/google";

import { api } from "~/utils/api";
import Layout from "~/components/Layout";

import "~/styles/globals.css";

const silkscreen = Silkscreen({
  subsets: ["latin"],
  variable: "--font-silkscreen",
  weight: "400",
});

if (process.env.NEXT_PUBLIC_API_MODE === "mock") {
  require("../mocks");
}

const App: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Layout font={silkscreen}>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default api.withTRPC(App);
