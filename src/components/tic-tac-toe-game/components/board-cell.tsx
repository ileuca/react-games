import { FC, ReactNode, useContext, useState } from "react";
import { JsxElement } from "typescript";
import { CurrentPlayerContext } from "../contexts/current-player";

type BoardCellProps = {};
const BoardCell: FC<BoardCellProps> = () => {
  const { currentPlayer, setCurrentPlayer, players } =
    useContext(CurrentPlayerContext);
  const [effect, setEffect] = useState(false);
  const [shape, setShape] = useState<ReactNode>(undefined);
  return (
    <button
      className={`${
        effect && "animate-wiggle"
      } rounded-lg hover:bg-sky-100 bg-gray-400 shadow-inner`}
      onClick={() => {
        setEffect(true);
        if (!shape) {
          setShape(currentPlayer.playerIcon);
          setCurrentPlayer(
            players.filter((player) => player != currentPlayer)[0]
          );
        }
      }}
      onAnimationEnd={() => setEffect(false)}
    >
      {shape}
    </button>
  );
};

export default BoardCell;
