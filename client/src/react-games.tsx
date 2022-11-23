import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/layout";
import BattleShips from "./pages/battle-ships";
import TicTacToe from "./pages/tic-tac-toe";

const ReactGames = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/battle-ships" element={<BattleShips />} />
        <Route path="/tic-tac-toe" element={<TicTacToe />} />
        <Route path="/" element={<></>} />
      </Routes>
    </Layout>
  );
};

export default ReactGames;
