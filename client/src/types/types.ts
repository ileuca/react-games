import { ReactNode } from "react";

export type CellClicked = {
  cellIndex: number | undefined;
  playerSymbol: string | undefined;
};

export type Player = {
  playerId: string;
  playerSymbol: string;
  playerIcon: ReactNode;
};
