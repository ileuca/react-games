import { useState } from "react";
import "./App.css";
import { ThemeContext } from "./contexts/theme-context";
import ReactGames from "./react-games";

const App = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div data-theme={theme} className={"full-size"}>
        <ReactGames />
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
