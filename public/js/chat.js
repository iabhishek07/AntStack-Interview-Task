var socket = io();
var currentUser = localStorage['currentUser'];
var secretKey = localStorage['secretKey'];
var messages = document.getElementById("chats");


(function() {
  $("form").submit(function(e) {
    let li = document.createElement("li");
    e.preventDefault();
    socket.emit("chat message", {user: currentUser, message: $("#message").val(), secretKey: secretKey});
    messages.appendChild(li).append($("#message").val());
    let span = document.createElement("span");
    messages.appendChild(span).append("by " + currentUser + ": " + "just now");

    $("#message").val("");

    return false;
  });

  socket.on("received", data => {
    let li = document.createElement("li");
    let span = document.createElement("span");
    var messages = document.getElementById("chats");
    messages.appendChild(li).append(data.message);
    messages.appendChild(span).append("by " + data.sender + ": " + "just now");
    console.log("Hello bingo!");
  });
})();

(function() {
  fetch("/chats/" + secretKey)
    .then(data => {
      return data.json();
    })
    .then(json => {
      json.map(data => {
        let li = document.createElement("li");
        let span = document.createElement("span");
        messages.appendChild(li).append(data.message);
        messages
          .appendChild(span)
          .append("by " + data.sender || data.user + ": " + new Date(data.createdAt));
      });
    });
})();


let messageInput = document.getElementById("message");
let typing = document.getElementById("typing");

messageInput.addEventListener("keypress", () => {
  socket.emit("typing",{ data: { user: currentUser, message: "is typing..." }});
});

socket.on("notifyTyping", data => {
  typing.innerText = data.user + " " + data.message;
  console.log(data.user + data.message);
});

messageInput.addEventListener("keyup", () => {
  socket.emit("stopTyping", "");
});

socket.on("notifyStopTyping", () => {
  typing.innerText = "";
});