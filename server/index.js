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
let latestPlayerQueue = [];
io.on("connection", (socket) => {
  console.log(`${socket.id} user connected`);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("joinQueue", (data) => {
    console.log(data.playerId + " joined");
    playerQueue.push(data.playerId);
    io.emit("queueJoined", playerQueue);

    if (playerQueue.length >= 2) {
      const gameId = Math.random().toString(36).substr(2, 9);
      const player1 =
        playerQueue[Math.floor(Math.random() * playerQueue.length)];
      playerQueue = playerQueue.filter((player) => player !== player1);
      const player2 =
        playerQueue[Math.floor(Math.random() * playerQueue.length)];
      playerQueue = playerQueue.filter((player) => player !== player2);
      io.sockets.sockets.forEach((socket) => {
        if (socket.id === player1 || socket.id === player2) {
          socket.join(gameId);
          console.log(socket.id + " joined " + gameId);
        }
      });
      io.in(gameId).emit("gameCreated", { gameId, player1, player2 });
      console.log("Game Created: ", gameId, player1, player2);
    }
  });
  socket.on("leaveQueue", (data) => {
    console.log(data.playerId + " left");
    playerQueue = playerQueue.filter((player) => player !== data.playerId);
    io.emit("queueJoined", playerQueue);
  });
  socket.on("pong", (data) => {
    const exists = latestPlayerQueue.includes(data.playerId);
    if (!exists) {
      latestPlayerQueue.push(data.playerId);
    }
    console.log("PlayerQueue: ", playerQueue);
  });
  socket.on("cellClicked", (data) => {
    console.log("Data", data);
    io.to(data.gameId).emit("clickedCell", data);
    console.log("Cell Clicked: ", data);
  });
});

setInterval(() => {
  playerQueue = playerQueue.filter((x) => latestPlayerQueue.includes(x));
}, 11000);

setInterval(() => {
  io.emit("ping", "ping");
}, 10000);

server.listen(3001, () => {
  console.log("Server is running");
});
