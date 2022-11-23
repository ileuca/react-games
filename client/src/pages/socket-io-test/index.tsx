import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

const SocketTest = () => {
  const messageRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

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
    socket.on("receive_message", (data) => {
      if (data) {
        setMessages((prevMessages) => {
          return [...prevMessages, `Other: ${data.message} \n`];
        });
      }
    });
  }, [socket]);

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
        <textarea
          id="messageBoard"
          disabled={true}
          value={messages}
          className="textarea textarea-secondary"
          style={{ width: 370, minHeight: 500 }}
        />
      </div>
    </div>
  );
};

export default SocketTest;
