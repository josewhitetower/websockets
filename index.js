const express = require("express");
const socket = require("socket.io");
const cors = require("cors");

//app setup

const app = express();

const server = app.listen(4000, () => {
  console.log("listening to request on port 4000");
});

//static files

app.use(cors());
app.use(express.static("public"));

//socket setup

const io = socket(server);

io.on("connection", socket => {
  console.log("made socket connection", socket.id);

  socket.on("chat", data => {
    io.sockets.emit("chat", data); // send data to all sockets
  });

  socket.on("typing", data => {
    console.log("object");
    socket.broadcast.emit("typing", data);
  });
});
