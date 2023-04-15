import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const gameRouter = createTRPCRouter({
  createGame: protectedProcedure.mutation(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });

    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
      });
    }

    // Unfinished active game found
    if (user.activeGameId) {
      const gameExists = await ctx.prisma.game.findFirst({
        where: { gameId: user.activeGameId },
      });

      if (gameExists) {
        return {
          gameId: user.activeGameId,
        };
      }
    }

    // Create new game
    const newGame = await ctx.prisma.game.create({
      data: {
        createdById: ctx.session.user.id,
      },
    });

    await ctx.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        activeGameId: newGame.gameId,
      },
    });

    return newGame;
  }),
});
