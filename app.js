const express = require("express");
const app = express();
const dateTime = require("simple-datetime-formater");
const bodyParser = require("body-parser");
const chatRouter = require("./routes/chat");
const loginRouter = require("./routes/login");
const http = require("http").Server(app);
const encryptDecrypt = require('./encryptDecrypt');
const io = require("socket.io");

const port = 5000;

app.use(bodyParser.json());
app.use("/login", loginRouter);
app.use('', chatRouter);
app.use(express.static(__dirname + "/public"));
socket = io(http);
const firebaseConnection = require("./dbconfig");
socket.on("connection", socket => {
    console.log("user connected");

    socket.on("disconnect", function () {
        console.log("user disconnected");
    });
    socket.on("typing", data => {
        socket.broadcast.emit("notifyTyping", {
            user: data.user,
            message: data.message
        });
    });
    socket.on("stopTyping", () => {
        socket.broadcast.emit("notifyStopTyping");
    });

    socket.on("chat message", function (data) {
        socket.broadcast.emit("received", { message: data.message, user: data.user });
        const cipher = encryptDecrypt.cipher(data.secretKey);
        firebaseConnection.firestore().collection('chats').add(
            { message: cipher(data.message) , sender: data.user, createdAt: Date.now() }
        );
    });
});

http.listen(port, () => {
    console.log("Running on Port: " + port);
});