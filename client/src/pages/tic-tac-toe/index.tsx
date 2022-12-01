import { useEffect } from "react";
import { io } from "socket.io-client";
import "../../App.css";
import TicTacToeGame from "../../components/tic-tac-toe-game";

const socket = io("http://localhost:3001");

const TicTacToe = () => {
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
            <button className="btn btn-success" onClick={() => {}}>
              Look For Players
            </button>
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
