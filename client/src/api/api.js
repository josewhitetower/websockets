import socketIOClient from "socket.io-client";
import moment from "moment";

let timeout;

const timeoutFunction = () => socket.emit("typing", false);

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

const typing = handle => {
  socket.emit("typing", handle);
  clearTimeout(timeout);
  timeout = setTimeout(timeoutFunction, 2000);
};

const subscribe = cb => {
  socket.on("chat", data => {
    cb(data);
  });

  socket.on("typing", data => {
    cb(data);
  });
};

export { connect, message, typing, subscribe };
