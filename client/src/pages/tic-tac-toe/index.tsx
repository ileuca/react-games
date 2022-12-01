import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "../../App.css";
import TicTacToeGame from "../../components/tic-tac-toe-game";

const socket = io("http://localhost:3001");

const TicTacToe = () => {
  const [currentQueue, setCurrentQueue] = useState([]);
  const [isInQueue, setIsInQueue] = useState(false);

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
    socket.on("queueJoined", (data) => {
      setCurrentQueue(data);
    });
  }, [setCurrentQueue]);

  console.log("PlayerQueue", currentQueue);

  return (
    <>
      <div
        className="card w-96 bg-base-200 shadow-xl"
        style={{ height: "90%", width: "100%" }}
      >
        <div className="navbar bg-base-200">
          <div className="navbar-start"></div>
          <div className="navbar-center hidden lg:flex"></div>
          <div className="navbar-end">
            <button className="btn btn-warning" style={{ marginRight: "5px" }}>
              Start Single Game
            </button>
            <div className="indicator" style={{ marginRight: "50px" }}>
              {isInQueue ? (
                <span className="indicator-item badge badge-secondary">
                  Searching...
                </span>
              ) : (
                <></>
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
          <TicTacToeGame />
        </div>
      </div>
    </>
  );
};

export default TicTacToe;
