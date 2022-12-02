import React from "react";
import { Dispatch, SetStateAction } from "react";
import { Player } from "../../../pages/tic-tac-toe";

export interface ICurrentPlayerContext {
  currentPlayer: Player;
  setCurrentPlayer: Dispatch<SetStateAction<Player>>;
  players: Player[];
}

export const undefinedPlayer: Player = {
  playerIcon: undefined,
  playerId: "0",
  playerSymbol: "",
};

export const CurrentPlayerContext = React.createContext<ICurrentPlayerContext>({
  currentPlayer: undefinedPlayer,
  players: [],
  setCurrentPlayer: () => {},
});
