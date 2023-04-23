import React from "react";
import type { UserStats } from "~/types";

const StatsListRow: React.FC<{ user: UserStats }> = ({ user }) => {
  return (
    <tr className="tracking-tighter">
      <td className="px-2 text-left">
        <span>{user.name?.substring(0, 7)}</span>
      </td>
      <td className="px-2 text-center">{user.wins}</td>
      <td className="text-center">{user.losses}</td>
      <td className="text-center">
        {user.losses === 0 ? user.wins : user.wins / user.losses}
      </td>
    </tr>
  );
};

export default StatsListRow;
