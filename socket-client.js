const { io } = require("socket.io-client");

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Connected to Socket.IO server!");
});

socket.on("dataUpdated", (data) => {
  console.log("Received dataUpdated event:", data);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});