import "./tic-tac-toe.css";
import BoardCell from "./components/board-cell";
import GameBoard from "./components/game-board";

const boardCellCount = 9;

const TicTacToeGame = () => {
  return (
    <GameBoard>
      {Array.from(Array(boardCellCount).keys()).map((cellIndex) => (
        <BoardCell key={cellIndex} cellIndex={cellIndex} />
      ))}
    </GameBoard>
  );
};

export default TicTacToeGame;
