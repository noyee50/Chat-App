const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname + "/../public");
const port = process.env.PORT || 3000;
const app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("A new user connected");

  socket.emit("newMessage", {
    from: "Admin",
    text: "Welcom to Chat APP",
  });

  socket.broadcast.emit("newMessage", {
    from: "Admin",
    text: "New User Joined",
    createDate: new Date().getTime(),
  });

  socket.on("createMessage", (message) => {
    console.log("create message", message);
    io.emit("newMessage", {
      from: message.from,
      text: message.text,
      createDate: new Date().getTime(),
    });
  });

  socket.on("disconnect", () => {
    console.log("User was Disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server run on port ${port}`);
});
