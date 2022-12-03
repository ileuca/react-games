import { FC, ReactNode } from "react";

type GameBoardProps = {
  children: ReactNode;
};

const GameBoard: FC<GameBoardProps> = ({ children }) => {
  return (
    <>
      <div className="alert shadow-lg bg-green-100 text-black">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info flex-shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>{`${"Other Player"} with symbol  has the next move`}</span>
        </div>
      </div>
      <div className="grid place-items-center  mt-10 mb-10">
        <div className="game-board">{children}</div>
      </div>
    </>
  );
};

export default GameBoard;
