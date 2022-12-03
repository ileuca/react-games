import { FC, ReactNode, useState } from "react";

type BoardCellProps = {
  cellIndex: number;
};
const BoardCell: FC<BoardCellProps> = ({ cellIndex }: BoardCellProps) => {
  const [effect, setEffect] = useState(false);
  const [shape, setShape] = useState<ReactNode>(undefined);

  return (
    <button
      key={cellIndex}
      className={`${
        effect && "animate-wiggle"
      } rounded-lg hover:bg-sky-100 bg-gray-400 shadow-inner`}
      onClick={() => {}}
      onAnimationEnd={() => setEffect(false)}
    >
      {shape}
    </button>
  );
};

export default BoardCell;
