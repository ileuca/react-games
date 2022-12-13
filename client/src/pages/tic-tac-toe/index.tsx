import {
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { io } from "socket.io-client";
import "../../App.css";
import TicTacToeGame from "../../components/tic-tac-toe-game";
import { ReactComponent as XIcon } from "../../components/icons/svg/x-icon.svg";
import { ReactComponent as OIcon } from "../../components/icons/svg/o-icon.svg";
import {
  CurrentPlayerContext,
  undefinedPlayer,
} from "../../components/tic-tac-toe-game/contexts/current-player";
import { ThisSessionContext } from "../../components/tic-tac-toe-game/contexts/this-session";
import {
  CellClicked,
  CellClickedContext,
} from "../../components/tic-tac-toe-game/contexts/cell-clicked";
import { SocketContext } from "../../contexts/socket-context";

export type Player = {
  playerId: string;
  playerSymbol: string;
  playerIcon: ReactNode;
};

const defaultPlayers: Player[] = [
  { playerId: "1", playerSymbol: "X", playerIcon: <XIcon /> },
  { playerId: "2", playerSymbol: "O", playerIcon: <OIcon /> },
];

const TicTacToe = () => {
  const { socket } = useContext(SocketContext);
  const [currentQueue, setCurrentQueue] = useState([]);
  const [isInQueue, setIsInQueue] = useState(false);
  const [gameType, setGameType] = useState<"single" | "multi" | undefined>();
  const [gameId, setGameId] = useState<string | undefined>();
  const [currentPlayer, setCurrentPlayer] = useState<Player>(undefinedPlayer);
  const [players, setPlayers] = useState<Player[]>(defaultPlayers);
  const [thisSession, setThisSession] = useState<string>(socket.id);
  const [cellClicked, setCellClicked] = useState<CellClicked>({
    cellIndex: undefined,
    playerSymbol: undefined,
  });

  console.log("cellClicked", cellClicked);

  const joinQueue = () => {
    if (isInQueue) {
      socket.emit("leaveQueue", { playerId: socket.id });
      setIsInQueue(false);
    } else {
      socket.emit("joinQueue", { playerId: socket.id });
      setIsInQueue(true);
    }
  };

  useEffect(() => {
    setThisSession(socket.id);
  }, [setThisSession]);

  useEffect(() => {
    socket.on("ping", () => {
      socket.emit("pong", { playerId: socket.id });
    });

    socket.on("queueJoined", (data: SetStateAction<never[]>) => {
      setCurrentQueue(data);
    });

    socket.on(
      "gameCreated",
      (data: {
        gameId: SetStateAction<string | undefined>;
        player1: any;
        player2: any;
      }) => {
        setGameType("multi");
        setGameId(data.gameId);
        const player1: Player = {
          playerId: data.player1,
          playerSymbol: "X",
          playerIcon: <XIcon />,
        };
        const player2: Player = {
          playerId: data.player2,
          playerSymbol: "O",
          playerIcon: <OIcon />,
        };
        setPlayers([player1, player2]);
        setCurrentPlayer(player1);
        socket.emit("leaveQueue", { playerId: socket.id });
        setIsInQueue(false);
      }
    );

    socket.on("clickedCell", (data: { cellIndex: any; playerSymbol: any }) => {
      setCellClicked({
        cellIndex: data.cellIndex,
        playerSymbol: data.playerSymbol,
      });
    });
  }, [setCurrentQueue]);

  return (
    <CurrentPlayerContext.Provider
      value={{ players, currentPlayer, setCurrentPlayer }}
    >
      <ThisSessionContext.Provider value={{ thisSession, setThisSession }}>
        <CellClickedContext.Provider value={{ cellClicked, setCellClicked }}>
          <>
            <div
              className="card w-96 bg-base-200 shadow-xl"
              style={{ height: "90%", width: "100%" }}
            >
              <div className="navbar bg-base-200">
                <div className="navbar-start"></div>
                <div className="navbar-center hidden lg:flex"></div>
                <div className="navbar-end">
                  <button
                    className="btn btn-warning"
                    style={{ marginRight: "5px" }}
                    onClick={() => {
                      setGameType("single");
                      setCurrentPlayer(players[0]);
                    }}
                  >
                    Start Single Game
                  </button>
                  <div className="indicator" style={{ marginRight: "50px" }}>
                    {isInQueue ? (
                      <span className="indicator-item badge badge-secondary">
                        Searching...
                      </span>
                    ) : (
                      <span className="indicator-item badge badge-primary">
                        {`${currentQueue.length} players`}
                      </span>
                    )}
                    <button className="btn btn-success" onClick={joinQueue}>
                      {isInQueue ? "Leave Queue" : "Join Queue"}
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="card  bg-base-300 shadow-xl"
                style={{ height: "90%", width: "100%" }}
              >
                {gameType === "single" ? (
                  <TicTacToeGame gameRoom={undefined} />
                ) : gameType === "multi" ? (
                  <TicTacToeGame gameRoom={gameId} socket={socket} />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </>
        </CellClickedContext.Provider>
      </ThisSessionContext.Provider>
    </CurrentPlayerContext.Provider>
  );
};

export default TicTacToe;
