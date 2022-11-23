import React from "react";
import { Dispatch, SetStateAction } from "react";
import { Player } from "..";

export interface ICurrentPlayerContext {
  currentPlayer: Player;
  setCurrentPlayer: Dispatch<SetStateAction<Player>>;
  players: Player[];
}

const undefinedPlayer: Player = {
  playerIcon: undefined,
  playerId: 0,
  playerSymbol: "",
};

export const CurrentPlayerContext = React.createContext<ICurrentPlayerContext>({
  currentPlayer: undefinedPlayer,
  players: [],
  setCurrentPlayer: () => {},
});
