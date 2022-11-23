import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

const SocketTest = () => {
  const messageRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [receivedMessage, setReceivedMessage] = useState<string>();

  const sendMessage = () => {
    if (messageRef.current) {
      const currentMessage = messageRef.current.value;
      socket.emit("send_message", { message: currentMessage });
      setMessages((prevMessages) => {
        return [...prevMessages, `Me: ${currentMessage} \n`];
      });
      messageRef.current.value = "";
    }
  };

  useEffect(() => {
    if (!!receivedMessage) {
      setMessages((prevMessages) => {
        return [...prevMessages, ` ${receivedMessage}`];
      });
    }
  }, [receivedMessage]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      if (data) {
        setReceivedMessage(`Other: ${data.message} \n`);
      }
    });
  }, []);

  return (
    <div className="mt-20 ml-20 mr-20">
      <div className="mb-5">
        <input
          id="message"
          type="text"
          ref={messageRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          className="input input-secondary mr-5"
          placeholder="Message..."
        />
        <button onClick={sendMessage} className="btn btn-secondary">
          Send Message
        </button>
      </div>
      <div>
        <div
          id="messageBoard"
          className="textarea textarea-secondary"
          style={{ width: 370, minHeight: 500 }}
        >
          {messages.map((message) => {
            return <p>{message}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default SocketTest;
