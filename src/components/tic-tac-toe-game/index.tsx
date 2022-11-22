import "./tic-tac-toe.css";
import { ReactComponent as XIcon } from "../icons/svg/x-icon.svg";
import { ReactComponent as OIcon } from "../icons/svg/o-icon.svg";
import BoardCell from "./components/board-cell";
import { ReactNode, useState } from "react";
import GameBoard from "./components/game-board";
import { CurrentPlayerContext } from "./contexts/current-player";

export type Player = {
  playerId: number;
  playerSymbol: string;
  playerIcon: ReactNode;
};

const player1 = {
  playerId: 1,
  playerSymbol: "X",
  playerIcon: <XIcon />,
};
const player2 = {
  playerId: 2,
  playerSymbol: "O",
  playerIcon: <OIcon />,
};

const TicTacToeGame = () => {
  const [currentPlayer, setCurrentPlayer] = useState<Player>(player1);
  const players: Player[] = [player1, player2];
  return (
    <CurrentPlayerContext.Provider
      value={{ currentPlayer, setCurrentPlayer, players }}
    >
      <GameBoard>
        <BoardCell />
        <BoardCell />
        <BoardCell />
        <BoardCell />
        <BoardCell />
        <BoardCell />
        <BoardCell />
        <BoardCell />
        <BoardCell />
      </GameBoard>
    </CurrentPlayerContext.Provider>
  );
};

export default TicTacToeGame;
