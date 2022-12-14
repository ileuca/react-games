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

  //function that makes div with class loader tilt towards pointer
  const tilt = (e: any) => {
    const loader = document.getElementById("loaderContainer");
    if (loader) {
      const x = loader.offsetLeft + loader.offsetWidth;
      const y = loader.offsetTop + loader.offsetHeight;
      const radian = Math.atan2(e.pageX - x, e.pageY - y);
      const rotation = radian * (180 / Math.PI) * -1;
      loader.style.transform = `rotate(${rotation}deg)`;
    }
  };

  return (
    <ToastProvider>
      <SocketContext.Provider value={{ socket }}>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <div data-theme={theme} className={"full-size"} onMouseMove={tilt}>
            <ReactGames />
          </div>
        </ThemeContext.Provider>
      </SocketContext.Provider>
    </ToastProvider>
  );
};

export default App;
