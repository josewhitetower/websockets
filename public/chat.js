//Make connection

const socket = io.connect("http://" + window.location.hostname + ":4000");

// Query DOM
const message = document.getElementById("message"),
  handle = document.getElementById("handle"),
  btn = document.getElementById("send"),
  output = document.getElementById("output"),
  feedback = document.getElementById("feedback");

//emit events

btn.addEventListener("click", () => {
  socket.emit("chat", {
    message: message.value,
    handle: handle.value
  });
  message.value = "";
});

//Listen for events

socket.on("chat", data => {
  output.innerHTML += `<p><strong>${data.handle}:</strong> ${data.message}</p>`;
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
