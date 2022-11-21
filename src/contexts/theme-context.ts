import React from "react";
import { Dispatch, SetStateAction } from "react";

export interface IThemeContext {
  theme: "light" | "dark";
  setTheme: Dispatch<SetStateAction<"light" | "dark">>;
}

export const ThemeContext = React.createContext<IThemeContext>({
  theme: "light",
  setTheme: () => {},
});
