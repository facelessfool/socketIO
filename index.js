const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(
    "/Users/Kajal Chingsubam/Desktop/June/sampleChat" + "/index.html"
  );
});
var clients = 0;
io.on("connection", (socket) => {
  console.log("a user connected!");
  clients++;
  // setTimeout(function () {
  //   socket.emit("testEvent", {
  //     description: "Sent a message 4seconds after connection!",
  //   });
  // }, 4000);
  socket.emit("newbie", "Hey welcome to our group the 3k");
  socket.broadcast.emit("broadcast", {
    description: "enters client number  " + clients,
  });
  socket.on("disconnect", () => {
    clients--;
    socket.broadcast.emit("broadcast", {
      description: "enters client number : " + clients,
    });
  });
});

server.listen(3000, () => {
  console.log("listening on server 3000");
});
