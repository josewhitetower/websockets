import socketIOClient from 'socket.io-client';
import moment from 'moment';

let timeout;

const timeoutFunction = () => socket.emit('typing', false);

const socket = socketIOClient('http://' + window.location.hostname + ':4000', {
  transports: ['websocket']
});

const connect = () => {
  return socket;
};

const join = user => {
  socket.emit('join', {
    user,
    action: 'join'
  });
};
const leave = handle => {
  socket.emit('leave', {
    handle,
    action: 'leave'
  });
};

const message = (message, handle) => {
  socket.emit('chat', {
    message,
    handle,
    date: moment().format('HH:mm'),
    action: 'chat'
  });
};

const typing = handle => {
  socket.emit('typing', { handle, action: 'typing' });
  clearTimeout(timeout);
  timeout = setTimeout(timeoutFunction, 2000);
};

const disconnect = () => {
  socket.desconnect();
};

const subscribe = cb => {
  socket.on('chat', data => {
    cb(data);
  });

  socket.on('typing', data => {
    cb(data);
  });

  socket.on('join', data => {
    cb(data);
  });
  socket.on('leave', data => {
    cb(data);
  });
};

export { connect, message, typing, subscribe, join, leave, disconnect };
