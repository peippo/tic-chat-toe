import { User } from "@prisma/client";

export type Cell = {
  x: number;
  y: number;
};

export type UserStats = Pick<User, "id" | "name"> & {
  wins: number;
  losses: number;
};
