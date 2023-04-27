const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

type GameState = {
  gameState: "WON" | "LOST" | "TIE";
};

type Turn = {
  x: number;
  y: number;
  isByUser: boolean;
  comment?: string;
};

type TurnSequence = {
  WON: Turn[];
  LOST: Turn[];
  TIE: Turn[];
};

async function main() {
  const users = [{ name: "WALL-E" }, { name: "HAL9000" }];

  const gameStates: GameState[] = [
    { gameState: "WON" },
    { gameState: "LOST" },
    { gameState: "TIE" },
  ];

  const turns: TurnSequence = {
    WON: [
      { x: 0, y: 0, isByUser: true },
      {
        x: 0,
        y: 1,
        isByUser: false,
        comment: "Good move, but I see what you're trying to do.",
      },
      { x: 1, y: 1, isByUser: true },
      {
        x: 1,
        y: 0,
        isByUser: false,
        comment: "Going for the win, are we? Let's see how this plays out.",
      },
      { x: 2, y: 2, isByUser: true },
    ],
    LOST: [
      {
        x: 1,
        y: 1,
        isByUser: false,
        comment:
          "I am taking the center square. It's an important strategic move in tic-tac-toe.",
      },
      { x: 0, y: 0, isByUser: true },
      {
        x: 0,
        y: 1,
        isByUser: false,
        comment: "Good move, but I see what you're trying to do.",
      },
      { x: 0, y: 2, isByUser: true },
      {
        x: 2,
        y: 1,
        isByUser: false,
        comment: "Nice move, but not nice enough",
      },
    ],
    TIE: [
      {
        x: 1,
        y: 1,
        isByUser: false,
        comment:
          "I am taking the center square. It's an important strategic move in tic-tac-toe.",
      },
      { x: 0, y: 0, isByUser: true },
      {
        x: 0,
        y: 1,
        isByUser: false,
        comment: "Good move, but I see what you're trying to do.",
      },
      { x: 0, y: 2, isByUser: true },
      {
        x: 2,
        y: 2,
        isByUser: false,
        comment: "Nice move, but not nice enough",
      },
      { x: 1, y: 0, isByUser: true },
      { x: 2, y: 0, isByUser: false, comment: "I am blocking your win." },
      { x: 2, y: 1, isByUser: true },
      { x: 1, y: 2, isByUser: false, comment: "Looks like it's a tie!" },
    ],
  };

  for (const userData of users) {
    const user = await prisma.user.create({
      data: userData,
    });

    for (const gameState of gameStates) {
      const game = await prisma.game.create({
        data: {
          user: { connect: { id: user.id } },
          gameState: gameState.gameState,
        },
      });

      for (const turnData of turns[gameState.gameState]) {
        await prisma.turn.create({
          data: {
            ...turnData,
            game: { connect: { gameId: game.gameId } },
          },
        });
      }
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
