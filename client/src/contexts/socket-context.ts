import React from "react";

export interface ISocketContext {
  socket: any;
}

export const SocketContext = React.createContext<ISocketContext>({
  socket: undefined,
});
