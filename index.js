const express = require("express");
const app = express();
const socketio = require("socket.io");
const {
  addUsers,
  getUser,
  getUsersInRoom,
  removeUser
} = require("./routes/users");

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log("sever started on ", port);
});

const io = socketio(server);
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

/*const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://chatapp:chatapp123@chatapp-5clmq.mongodb.net/test?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    console.log("mongo db has connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
connectDB();
*/

//connect to socket
let count = 0;
io.on(`connection`, socket => {
  console.log("We have a new connnection");
  console.log((count += 1) + " users connected");

  socket.on("join", ({ name }, callback) => {
    console.log(name);
    const { user } = addUsers({ id: socket.id, name });
    callback(user.room);
    console.log(user.room);
    socket.emit(`message`, {
      user: "admin",
      text: `${user.name} ,Welcome to the room ${user.room}`
    });

    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name} has joined the chat`
    });
    socket.join(user.room);
    io
      .to(user.room)
      .emit("roomData", { room: user.room, users: getUsersInRoom(user.room) });
    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });
    io
      .to(user.room)
      .emit("roomData", { room: user.room, users: getUsersInRoom(user.room) });
    callback();
  });
  socket.on("disconnect", () => {
    count -= 1;
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left the chat`
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room)
      });
    }
  });
});

//routes

app.use(cors());
//serve static assets in production

if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
