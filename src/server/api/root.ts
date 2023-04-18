import { createTRPCRouter } from "~/server/api/trpc";
import { gameRouter } from "~/server/api/routers/game";
import { turnRouter } from "~/server/api/routers/turn";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  game: gameRouter,
  turn: turnRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
