import { join } from "path";
import { useContext, useState } from "react";
import "../../App.css";
import TicTacToeGame from "../../components/tic-tac-toe-game";
import { SocketContext } from "../../contexts/socket-context";
import useSocket from "../../hooks/useSocket";

const TicTacToe = () => {
  const { socket } = useContext(SocketContext);
  const { joinQueue, currentQueueLength } = useSocket(socket, "tic-tac-toe");

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
            <button
              className="btn btn-warning"
              style={{ marginRight: "5px" }}
              onClick={() => {}}
            >
              Start Single Game
            </button>
            <div className="indicator" style={{ marginRight: "50px" }}>
              <span className="indicator-item badge badge-primary">
                {`${currentQueueLength} players`}
              </span>

              <button className="btn btn-success" onClick={joinQueue}>
                {"Join Queue"}
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
