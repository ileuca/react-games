import "../../App.css";
import TicTacToeGame from "../../components/tic-tac-toe-game";

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
            <button
              className="btn btn-warning"
              style={{ marginRight: "5px" }}
              onClick={() => {}}
            >
              Start Single Game
            </button>
            <div className="indicator" style={{ marginRight: "50px" }}>
              <span className="indicator-item badge badge-primary">
                {`${2} players`}
              </span>

              <button className="btn btn-success" onClick={() => {}}>
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
