import { OpenAIChat } from "langchain/llms";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { findRandomFreeCell } from "~/utils/game";
import { env } from "~/env.mjs";

import type { ChatCompletionRequestMessageRoleEnum } from "openai";
import type { Turn } from "@prisma/client";
import type { Cell } from "~/types";

export const turnRouter = createTRPCRouter({
  submitUserTurn: protectedProcedure
    .input(
      z.object({
        gameId: z.string(),
        x: z.number(),
        y: z.number(),
        comment: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { gameId, x, y } = input;

      const newTurn = ctx.prisma.turn.create({
        data: {
          gameId: gameId,
          x: x,
          y: y,
          isByUser: true,
        },
      });

      return newTurn;
    }),

  queryOpponentTurn: protectedProcedure
    .input(
      z.object({
        gameId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const previousTurns = await ctx.prisma.turn.findMany({
        where: {
          gameId: input.gameId,
        },
        orderBy: { createdAt: "asc" },
      });

      const prefixMessages: {
        role: ChatCompletionRequestMessageRoleEnum;
        content: string;
      }[] = [
        {
          role: "system",
          content: "You are a professional tic-tac-toe player",
        },
        {
          role: "user",
          content:
            'We are playing tic-tac-toe on a 3x3 grid. I will tell you the X & Y coordinates for moves, you will respond with X & Y coordinates with your move, and a short comment about your latest move, the situation of the game or just general chit-chat - add variation to your messages. The grid starts from zero, left top corner is 0, 0. Provide your answer in JSON format, reply with only the answer and never include any other commentary, for example: \'{ "x": 2, "y": 1, "comment": "What do you think of this move!" }\' or \'{ "x": 0, "y": 2, "comment": "Nice day for a game of tic-tac-toe" }\'',
        },
      ];

      const previousTurnsExcludingLatest = [...previousTurns];
      const latestTurn = previousTurnsExcludingLatest.pop();

      previousTurnsExcludingLatest.forEach((turn: Turn) => {
        prefixMessages.push({
          role: turn.isByUser ? "user" : "assistant",
          content: turn.comment
            ? `{ x: ${turn.x}, y: ${turn.y}, comment: ${turn.comment}}`
            : `{ x: ${turn.x}, y: ${turn.y}}`,
        });
      });

      const loggedMessages = prefixMessages.slice(2);

      const model = new OpenAIChat({
        modelName: "gpt-3.5-turbo",
        prefixMessages: prefixMessages,
      });

      const prompt = latestTurn
        ? JSON.stringify({
            x: latestTurn.x,
            y: latestTurn.y,
          })
        : "You will start";

      const response = await model.call(prompt);

      type OpponentTurn = (Cell & { comment?: string }) | undefined;
      let opponentTurn: OpponentTurn = {
        x: 0,
        y: 0,
      };

      let responseType: "json" | "parsed" | "random" = "json";

      if (response) {
        try {
          // Correct reply format
          opponentTurn = JSON.parse(response) as OpponentTurn;
        } catch {
          // Wrong format, try to parse the content
          const parsedNumbers = response
            .match(/^\d+|\d+\b|\d+(?=\w)/g)
            ?.map((number) => parseInt(number));

          const commentPart = response.match(
            /(?<=comment[^a-zA-Z]*)([a-zA-Z]).*/g
          );

          const parsedComment = commentPart
            ? commentPart[0]?.replace(/[{}"]/g, "")
            : "";

          if (
            parsedNumbers &&
            typeof parsedNumbers[0] === "number" &&
            typeof parsedNumbers[1] === "number"
          ) {
            opponentTurn = {
              x: parsedNumbers[0],
              y: parsedNumbers[1],
              comment: parsedComment,
            };
            responseType = "parsed";
          } else {
            // No cell coordinates found, use a random one
            opponentTurn = findRandomFreeCell(previousTurns);
            responseType = "random";
          }
        }
      }

      /* prettier-ignore */
      if (env.NODE_ENV === "development") {
        console.log("------------------------");
        console.log("HISTORY: ", loggedMessages);
        console.log("PROMPT:  ", prompt);
        console.log("REPLY:   ", response);
        console.log("MOVE:    ", `${JSON.stringify(opponentTurn)} (${responseType})`);
        console.log("------------------------");
      }

      if (!opponentTurn) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }

      const newTurn = ctx.prisma.turn.create({
        data: {
          gameId: input.gameId,
          x: opponentTurn.x,
          y: opponentTurn.y,
          isByUser: false,
          comment: opponentTurn.comment ?? "",
        },
      });

      return newTurn;
    }),
});
