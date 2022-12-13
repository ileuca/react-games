const express = require("express");

const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);
  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
  });

  socket.on("joinQueue", async ({ gameRoom }) => {
    socket.join(gameRoom);
    let roomUsers = await io.in(gameRoom).fetchSockets();
    socket.to(gameRoom).emit("joinedQueue", {
      queueLength: roomUsers.length,
    });
  });
});

server.listen(3001, () => {
  console.log("Server is running");
});
