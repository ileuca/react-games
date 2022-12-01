import { FC, ReactNode, useContext, useState } from "react";
import { CurrentPlayerContext } from "../contexts/current-player";

type BoardCellProps = {
  cellIndex: number;
};
const BoardCell: FC<BoardCellProps> = ({ cellIndex }: BoardCellProps) => {
  const { currentPlayer, setCurrentPlayer, players } =
    useContext(CurrentPlayerContext);

  const [effect, setEffect] = useState(false);
  const [shape, setShape] = useState<ReactNode>(undefined);

  return (
    <button
      key={cellIndex}
      className={`${
        effect && "animate-wiggle"
      } rounded-lg hover:bg-sky-100 bg-gray-400 shadow-inner`}
      onClick={() => {
        setEffect(true);
        if (!shape) {
          setShape(currentPlayer.playerIcon);
          setCurrentPlayer(
            players.filter((player) => player !== currentPlayer)[0]
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
