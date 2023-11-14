const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:4200",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter(user => user.socketId !== socketId)
}

const getUser = userId => {
  return users.find(user => user.userId === userId)
}

io.on("connection", (socket) => {
  // When connect
  console.log("user connected.");
  // Take userId and sockedId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id)
    io.emit("getUsers", users)
  });

  // Send and get message
  socket.on("sendMessage", ({senderId, receiverId, message}) => {
    const user = getUser(receiverId)
    if(user) {
      io.to(user.socketId).emit("getMessage", {
        senderId, receiverId, message
      })
    }

  })

  // When disconnect
  socket.on("disconnect", () => {
    console.log("user disconnected")
    removeUser(socket.id)
    io.emit("getUsers", users)
  })
});
