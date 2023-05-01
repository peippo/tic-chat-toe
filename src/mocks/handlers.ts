import { trpcMsw } from "~/utils/api";

export const handlers = [
  trpcMsw.stats.getTopUsersStats.query((_, res, ctx) =>
    res(
      ctx.status(200),
      ctx.data([
        {
          id: "clh3cua6v00004khzt34eq9ej",
          name: "WALL-E",
          wins: 10,
          losses: 2,
        },
        {
          id: "clh3cuaai001a4khzumxzj27c",
          name: "Robocop",
          wins: 7,
          losses: 1,
        },
        {
          id: "clh3cuaai001a4khzumxzj27w",
          name: "HAL9000",
          wins: 5,
          losses: 2,
        },
      ])
    )
  ),

  trpcMsw.game.getGames.query((_, res, ctx) => {
    const date = new Date();

    return res(
      ctx.status(200),
      ctx.data({
        nextCursor: undefined,
        items: [
          {
            gameId: "clh3cua9a000q4khzlftauu1y",
            createdAt: date,
            createdById: "clh3cua6v00004khzt34eq9ej",
            gameState: "TIE",
            user: {
              name: "WALL-E",
            },
          },
          {
            gameId: "clh3cua8j000e4khz955zo3bz",
            createdAt: date,
            createdById: "clh3cua6v00004khzt34eq9ej",
            gameState: "LOST",
            user: {
              name: "WALL-E",
            },
          },
          {
            gameId: "clh3cua7600024khz4zg5833t",
            createdAt: date,
            createdById: "clh3cua6v00004khzt34eq9ej",
            gameState: "WON",
            user: {
              name: "WALL-E",
            },
          },
        ],
      })
    );
  }),
];
