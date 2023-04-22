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

  getGames: publicProcedure
    .input(
      z.object({
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const limit = 15;
      const { cursor } = input;
      const lastFiveMinutes = new Date(
        Date.now() - 5 * 60 * 1000
      ).toISOString();

      const items = await ctx.prisma.game.findMany({
        take: limit + 1,
        select: {
          gameId: true,
          createdAt: true,
          wonByUser: true,
          user: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        where: {
          OR: [
            {
              createdAt: { gte: lastFiveMinutes },
            },
            { OR: [{ wonByUser: true }, { wonByUser: false }] },
          ],
        },
        cursor: cursor ? { gameId: cursor } : undefined,
      });

      let nextCursor: typeof cursor | undefined = undefined;

      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem?.gameId;
      }

      return {
        items,
        nextCursor,
      };
    }),

  updateWinner: protectedProcedure
    .input(z.object({ gameId: z.string(), wonByUser: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
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

      await ctx.prisma.game.update({
        where: {
          gameId: input.gameId,
        },
        data: {
          wonByUser: input.wonByUser,
        },
      });

      await ctx.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          activeGameId: null,
        },
      });
    }),
});
