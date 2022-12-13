import { FC, ReactNode, useContext } from "react";
import { CurrentPlayerContext } from "../contexts/current-player";
import { ThisSessionContext } from "../contexts/this-session";
import "./game-board.css";

type GameBoardProps = {
  children: ReactNode;
};

const GameBoard: FC<GameBoardProps> = ({ children }) => {
  const { currentPlayer } = useContext(CurrentPlayerContext);
  const { thisSession } = useContext(ThisSessionContext);

  return (
    <>
      <div className="alert shadow-lg bg-green-100 text-black">
        <div style={{ height: "5px" }}>
          <span className="animatePrompter">{`${
            currentPlayer.playerId === thisSession ? "You" : "Other Player"
          } with symbol ${currentPlayer.playerSymbol} has the next move`}</span>
        </div>
      </div>
      <div className="grid place-items-center  mt-10 mb-10">
        <div className="game-board">{children}</div>
      </div>
    </>
  );
};

export default GameBoard;
