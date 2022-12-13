import { useState } from "react";
import { io } from "socket.io-client";
import "./App.css";
import { SocketContext } from "./contexts/socket-context";
import { ThemeContext } from "./contexts/theme-context";
import { ToastProvider } from "./hooks/useToasts";
import ReactGames from "./react-games";

const socket = io("http://localhost:3001");

const App = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  return (
    <ToastProvider>
      <SocketContext.Provider value={{ socket }}>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <div data-theme={theme} className={"full-size"}>
            <ReactGames />
          </div>
        </ThemeContext.Provider>
      </SocketContext.Provider>
    </ToastProvider>
  );
};

export default App;
