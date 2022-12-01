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

let playerQueue = [];

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("joinQueue", (data) => {
    console.log(data.playerId + " joined");
    playerQueue.push(data.playerId);
    io.emit("queueJoined", playerQueue);
  });
  socket.on("leaveQueue", (data) => {
    console.log(data.playerId + " left");
    playerQueue = playerQueue.filter((player) => player !== data.playerId);
    io.emit("queueJoined", playerQueue);
  });
});

server.listen(3001, () => {
  console.log("Server is running");
});
