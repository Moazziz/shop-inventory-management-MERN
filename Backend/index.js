import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { route } from './Routes/route.js';
import 'dotenv/config';
import connectDB from './Db/index.js';

const server = express(); // ✅ define the app before using it
const PORT = process.env.PORT || 8000;

// Middleware
server.use(cors({
  origin: "http://localhost:5173",
  // origin: "https://inventory2u.netlify.app",
  // origin: process.env.ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

server.use(cookieParser());
server.use(express.json({ limit: "16kb" }));
server.use(express.urlencoded({ extended: true }));

// Routes
server.use("/api", route);

server.get("/", (req, res) => {
  res.send("Hello to backend");
});

server.get("*", (req, res) => {
  res.status(404).send("404 NOT FOUND <a href='./'>Go To Home</a>");
});

// Connect to DB and start server
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`✅ Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error connecting to DB:", error);
  });
