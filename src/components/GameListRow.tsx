import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { formatDateTime } from "~/utils/game";
import type { Game } from "@prisma/client";

type GameWithUser = Game & {
  user: { name: string | null };
};

const GameListRow: React.FC<{ game: GameWithUser }> = ({ game }) => {
  const { data: sessionData } = useSession();

  return (
    <tr className="relative tracking-tighter hover:cursor-pointer hover:bg-gray-500/40">
      <td className="px-2 text-left">
        <span>{game.user.name?.substring(0, 7)}</span>
      </td>
      <td className="px-2 text-left">
        <Link
          href={
            game.gameState === "IN_PROGRESS" &&
            sessionData?.user.id === game.createdById
              ? `/play/${game.gameId}`
              : `/view/${game.gameId}`
          }
          className="after:absolute after:inset-0 after:h-full after:w-full after:content-['']"
        >
          {formatDateTime(game.createdAt)}
        </Link>
      </td>
      <td className="text-center">
        {game.gameState === "WON" && <span className="p-1">won</span>}
        {game.gameState === "LOST" && <span className="p-1">lost</span>}
        {game.gameState === "TIE" && <span className="p-1">tie</span>}
        {game.gameState === "IN_PROGRESS" && (
          <span className="animate-pulse rounded-md bg-gray-600 p-1 text-gray-400">
            live
          </span>
        )}
      </td>
    </tr>
  );
};

export default GameListRow;
