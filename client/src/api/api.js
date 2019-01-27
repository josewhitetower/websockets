import socketIOClient from "socket.io-client";
import moment from "moment";

const socket = socketIOClient("http://" + window.location.hostname + ":4000", {
  transports: ["websocket"]
});

const connect = () => {
  return socket;
};

const message = (message, handle) => {
  socket.emit("chat", {
    message,
    handle,
    date: moment().format("HH:mm")
  });
};

export { connect, message };
