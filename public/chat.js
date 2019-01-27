//Make connection

const socket = io.connect("http://" + window.location.hostname + ":4000");

// Query DOM
const message = document.getElementById("message"),
  handle = document.getElementById("handle"),
  form = document.getElementById("form"),
  output = document.getElementById("output"),
  feedback = document.getElementById("feedback");

//emit events

form.addEventListener("submit", e => {
  e.preventDefault();
  socket.emit("chat", {
    message: message.value,
    handle: handle.value,
    date: moment().format("HH:mm"),
  });
  message.value = "";
});

//Listen for events

socket.on("chat", data => {
  output.innerHTML += `<p>${data.date} <strong>${data.handle}:</strong> ${data.message}</p>`;
});

let timeout;

const timeoutFunction = () => socket.emit("typing", false);

message.addEventListener("input", () => {
  socket.emit("typing", handle.value);
  clearTimeout(timeout);
  timeout = setTimeout(timeoutFunction, 2000);
});

socket.on("typing", data => {
  if (data) {
    feedback.innerHTML = `<p><em>${data} is typying a message...</em> </p>`;
  } else {
    feedback.innerHTML = "";
  }
});
