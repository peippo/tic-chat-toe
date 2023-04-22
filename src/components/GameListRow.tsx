import { Prisma } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { formatDateTime } from "~/utils/game";

const GameDetails = Prisma.validator<Prisma.GameArgs>()({
  select: {
    gameId: true,
    createdAt: true,
    wonByUser: true,
  },
});

type GameWithUser = Prisma.GameGetPayload<typeof GameDetails> & {
  user: { name: string | null };
};

const GameListRow: React.FC<{ game: GameWithUser }> = ({ game }) => {
  return (
    <tr className="relative tracking-tighter hover:cursor-pointer hover:bg-gray-500/40">
      <td className="px-2 text-left">
        <span>{game.user.name?.substring(0, 7)}</span>
      </td>
      <td className="px-2 text-left">
        <Link
          href={`/view/${game.gameId}`}
          className="after:absolute after:inset-0 after:h-full after:w-full after:content-['']"
        >
          {formatDateTime(game.createdAt)}
        </Link>
      </td>
      <td className="text-center">
        {game.wonByUser === true && <span className="p-1">won</span>}
        {game.wonByUser === false && <span className="p-1">lost</span>}
        {game.wonByUser === null && (
          <span className="animate-pulse rounded-md bg-gray-600 p-1 text-gray-400">
            live
          </span>
        )}
      </td>
    </tr>
  );
};

export default GameListRow;
