const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// SOCKET.IO SETUP
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.set("io", io); // access io anywhere

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/movies", require("./routes/movieRoutes"));
app.use("/api/theatres", require("./routes/theatreRoutes"));
app.use("/api/shows", require("./routes/showRoutes"));
app.use("/api/screens", require("./routes/screenRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // join specific show room
  socket.on("joinShow", (showId) => {
    socket.join(showId);
  });

  // lock seat
  socket.on("lockSeat", ({ showId, seatNumber }) => {
    socket.to(showId).emit("seatLocked", seatNumber);
  });

  // unlock seat
  socket.on("unlockSeat", ({ showId, seatNumber }) => {
    socket.to(showId).emit("seatUnlocked", seatNumber);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on ${PORT}`));