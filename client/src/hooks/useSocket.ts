import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

const useSocket = (socket: Socket, gameRoom: string) => {
  const [currentQueueLength, setCurrentQueueLength] = useState(0);

  useEffect(() => {
    socket.on("joinedQueue", ({ queueLength }) => {
      setCurrentQueueLength(queueLength);
    });
  }, []);

  const joinQueue = () => {
    socket.emit("joinQueue", { gameRoom });
  };

  return {
    currentQueueLength,
    joinQueue,
  };
};

export default useSocket;
