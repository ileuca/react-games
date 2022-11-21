import { useState } from "react";
import "./App.css";

function App() {
  const [theme, setTheme] = useState<string>("light");
  return (
    <div data-theme={theme} className={"full-size"}>
      <button
        className="btn btn-primary btn-md"
        onClick={() => {
          setTheme((prevTheme) => {
            if (prevTheme == "light") {
              return "dark";
            } else {
              return "light";
            }
          });
        }}
      >
        Change Theme
      </button>
    </div>
  );
}

export default App;
