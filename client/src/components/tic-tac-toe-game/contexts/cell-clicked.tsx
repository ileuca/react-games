import React from "react";
import { Dispatch, SetStateAction } from "react";

export type CellClicked = {
  playerId: string | undefined;
  cellIndex: number | undefined;
  playerSymbol: string | undefined;
};

export interface ICellClickedContext {
  cellClicked: CellClicked;
  setCellClicked: Dispatch<SetStateAction<CellClicked>>;
}

export const CellClickedContext = React.createContext<ICellClickedContext>({
  cellClicked: {
    playerId: undefined,
    cellIndex: undefined,
    playerSymbol: undefined,
  },
  setCellClicked: () => {},
});
