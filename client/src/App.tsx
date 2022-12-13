import { useState } from "react";
import { io } from "socket.io-client";
import "./App.css";
import { SocketContext } from "./contexts/socket-context";
import { ThemeContext } from "./contexts/theme-context";
import ReactGames from "./react-games";

let socket = io("http://localhost:3001");

const App = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  return (
    <SocketContext.Provider value={{ socket }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div data-theme={theme} className={"full-size"}>
          <ReactGames />
        </div>
      </ThemeContext.Provider>
    </SocketContext.Provider>
  );
};

export default App;
