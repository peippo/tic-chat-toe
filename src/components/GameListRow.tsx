import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { formatDateTime } from "~/utils/game";
import type { Game } from "@prisma/client";
import { useRouter } from "next/router";

type GameWithUser = Game & {
  user: { name: string | null };
};

const GameListRow: React.FC<{ game: GameWithUser }> = ({ game }) => {
  const router = useRouter();
  const { data: sessionData } = useSession();

  const rowLink =
    game.gameState === "IN_PROGRESS" &&
    sessionData?.user.id === game.createdById
      ? `/play/${game.gameId}`
      : `/view/${game.gameId}`;

  return (
    <tr className="tracking-tighter hover:cursor-pointer hover:bg-gray-500/40">
      <td className="px-2 text-left" onClick={() => void router.push(rowLink)}>
        <span>{game.user.name?.substring(0, 7)}</span>
      </td>
      <td className="px-2 text-left" onClick={() => void router.push(rowLink)}>
        <Link href={rowLink} className="whitespace-nowrap">
          {formatDateTime(game.createdAt)}
        </Link>
      </td>
      <td className="text-center" onClick={() => void router.push(rowLink)}>
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
