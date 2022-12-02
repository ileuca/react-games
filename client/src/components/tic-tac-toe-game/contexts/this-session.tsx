import React from "react";
import { Dispatch, SetStateAction } from "react";

export interface IThisSessionContext {
  thisSession: string;
  setThisSession: Dispatch<SetStateAction<string>>;
}

export const ThisSessionContext = React.createContext<IThisSessionContext>({
  thisSession: "",
  setThisSession: () => {},
});
