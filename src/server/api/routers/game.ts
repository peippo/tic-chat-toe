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

  getGame: publicProcedure
    .input(z.object({ gameId: z.string() }))
    .query(({ ctx, input }) => {
      const game = ctx.prisma.game.findFirst({
        where: {
          gameId: input.gameId,
        },
        include: {
          turns: true,
        },
      });

      if (!game) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }

      return game;
    }),

  submitTurn: protectedProcedure
    .input(
      z.object({
        gameId: z.string(),
        x: z.number(),
        y: z.number(),
        isByUser: z.boolean().optional(),
        comment: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { gameId, x, y, isByUser = false, comment = null } = input;

      const newTurn = ctx.prisma.turn.create({
        data: {
          gameId: gameId,
          x: x,
          y: y,
          isByUser: isByUser,
          comment: comment,
        },
      });

      return newTurn;
    }),
});
