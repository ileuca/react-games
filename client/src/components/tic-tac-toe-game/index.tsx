import "./tic-tac-toe.css";
import BoardCell from "./components/board-cell";
import { useEffect, useState } from "react";
import GameBoard from "./components/game-board";

const boardCellCount = 9;

const TicTacToeGame = ({ gameRoom, socket }: any) => {
  const [isGameStarted, setIsGameStarted] = useState(false);

  useEffect(() => {
    if (!!gameRoom) {
      setIsGameStarted(true);
    }
  }, [gameRoom]);

  return (
    <GameBoard>
      {Array.from(Array(boardCellCount).keys()).map((cellIndex) => (
        <BoardCell
          key={cellIndex}
          cellIndex={cellIndex}
          socket={socket}
          gameId={gameRoom}
        />
      ))}
    </GameBoard>
  );
};

export default TicTacToeGame;
