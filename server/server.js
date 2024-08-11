const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/userRoute");
const messageRoutes = require("./Routes/messageRoute")
const socket =  require("socket.io");

const app = express();
require("dotenv").config();

// CORS DEFINED
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

// Routing setup 
app.use("/api/auth", authRoutes); // Ensure the base route matches the frontend
app.use("/api/messages", messageRoutes);


// DB CONNECTION
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Db connect successful");
  })
  .catch((err) => {
    console.error("Db connection error:", err);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
  
});