import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { UserStats } from "~/types";

export const statsRouter = createTRPCRouter({
  getUserStats: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session?.user.id) return null;

    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      include: {
        games: true,
      },
    });

    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
      });
    }

    const games = user.games.reduce(
      (acc, game) => {
        const gameState = game.gameState;

        if (!acc[gameState]) {
          acc[gameState] = 1;
        } else {
          acc[gameState]++;
        }
        return acc;
      },
      {
        WON: 0,
        LOST: 0,
        TIE: 0,
        IN_PROGRESS: 0,
      }
    );

    return {
      games,
    };
  }),

  getTopUsersStats: publicProcedure.query(async ({ ctx }) => {
    const userStats: UserStats[] = await ctx.prisma.$queryRaw<UserStats[]>`
      SELECT "User"."id",
             "User"."name",
             Count(CASE
                   WHEN "Game"."gameState" = 'WON' THEN 1
                   end) :: INT AS "wins",
             Count(CASE
                   WHEN "Game"."gameState" = 'LOST' THEN 1
                   end) :: INT AS "losses"
      FROM   "User"
             LEFT JOIN "Game"
                    ON "User"."id" = "Game"."createdById"
      WHERE  "Game"."gameState" IN ('WON', 'LOST')
      GROUP  BY "User"."id",
                "User"."name"
      ORDER  BY "wins" DESC
      LIMIT  10; 
    `;

    return userStats;
  }),
});
