import "./tic-tac-toe.css";
import BoardCell from "./components/board-cell";
import { useEffect, useState } from "react";
import GameBoard from "./components/game-board";
import GreenGameStarted from "../icons/text/greenGameStarted.png";
import RedGameStarted from "../icons/text/redGameStarted.png";

const boardCellCount = 9;

const TicTacToeGame = ({ gameRoom, socket }: any) => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [animation, setAnimation] = useState<
    "animate-GameStarted1" | "animate-GameStarted2"
  >("animate-GameStarted1");

  useEffect(() => {
    console.log();
    if (!!gameRoom) {
      setIsGameStarted(true);
    }
  }, [gameRoom]);

  return (
    <>
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

      <img
        className={`${animation}`}
        src={
          animation === "animate-GameStarted1"
            ? RedGameStarted
            : GreenGameStarted
        }
        onAnimationEnd={() => {
          setTimeout(() => {
            setAnimation((prevAnimation) => {
              return "animate-GameStarted2";
            });
          }, 1000);
        }}
      ></img>
    </>
  );
};

export default TicTacToeGame;
