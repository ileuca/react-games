import { FC, ReactNode, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { useToasts } from "../../../hooks/useToasts";
import { CellClickedContext } from "../contexts/cell-clicked";
import { CurrentPlayerContext } from "../contexts/current-player";
import { ThisSessionContext } from "../contexts/this-session";
import "./board-cell.css";

type BoardCellProps = {
  cellIndex: number;
  socket: Socket;
  gameId: string;
};
const BoardCell: FC<BoardCellProps> = ({
  cellIndex,
  socket,
  gameId,
}: BoardCellProps) => {
  const { currentPlayer, setCurrentPlayer, players } =
    useContext(CurrentPlayerContext);
  const { thisSession } = useContext(ThisSessionContext);
  const [effect, setEffect] = useState(false);
  const [shape, setShape] = useState<ReactNode>(undefined);
  const { cellClicked } = useContext(CellClickedContext);
  const { addToast } = useToasts();
  useEffect(() => {
    if (!shape) {
      if (cellClicked.cellIndex === cellIndex) {
        setShape(
          players.find(
            (player) => player.playerSymbol === cellClicked.playerSymbol
          )?.playerIcon
        );
        setCurrentPlayer(
          players.filter((player) => player !== currentPlayer)[0]
        );
      }
    }
  }, [cellClicked]);

  return (
    <button
      key={cellIndex}
      className={`${
        effect && "animate-wiggle"
      } rounded-lg hover:bg-sky-100 bg-gray-400 shadow-inner`}
      onClick={() => {
        if (!shape) {
          if (currentPlayer.playerId === thisSession) {
            setShape(currentPlayer.playerIcon);
            setCurrentPlayer(
              players.filter((player) => player !== currentPlayer)[0]
            );
            socket.emit("cellClicked", {
              gameId: gameId,
              playerId: thisSession,
              cellIndex: cellIndex,
              playerSymbol: currentPlayer.playerSymbol,
            });
          } else {
            addToast("It's not your turn!", "error");
          }
        } else {
          addToast("You cannot mark an already marked cell!", "error");
        }
      }}
    >
      {!shape ? (
        <></>
      ) : (
        <div
          className="cellAnimation "
          onAnimationEnd={() => {
            setEffect(true);
            setTimeout(() => {
              setEffect(false);
            }, 1000);
          }}
        >
          {shape}
        </div>
      )}
    </button>
  );
};

export default BoardCell;
