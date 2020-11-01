const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const test = 'a';
const test = 'a';
const test = 'a';
const test = 'a';



const test = 's';


const { generateMessage, generateLocationMessage } = require("./utils/message");
const publicPath = path.join(__dirname + "/../public");
const port = process.env.PORT || 3000;
const app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("A new user connected");

  socket.emit(
    "newMessage",
    generateMessage("Admin", "Welcome To The Jungle!!")
  );

  socket.broadcast.emit(
    "newMessage",
    generateMessage("Admin", "New User Joined", new Date().getTime())
  );

  socket.on("createMessage", (message, callback) => {
    console.log("create message", message);
    io.emit(
      "newMessage",
      generateMessage(message.from, message.text, new Date().getTime()),
      callback("This is Server..")
    );
  });

  socket.on("createLocationMessage", (coords) => {
    io.emit(
      "newLocationMessage",
      generateLocationMessage("Admin", coords.lat, coords.lng)
    );
  });

  socket.on("disconnect", () => {
    console.log("User was Disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server run on port ${port}`);
});
