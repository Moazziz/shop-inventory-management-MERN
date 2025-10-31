import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { route } from './Routes/route.js';
import 'dotenv/config';
import connectDB from './Db/index.js';

const server = express();
const PORT = process.env.PORT || 8000;

// ✅ Define allowed origins for CORS
const allowedOrigins = [
  'http://localhost:5173',              // local dev
  'https://inventory2u.netlify.app',    // production frontend
];

// ✅ Configure CORS dynamically
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn('❌ Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

// ✅ Apply middleware
server.use(cors(corsOptions));
server.use(cookieParser());
server.use(express.json({ limit: '16kb' }));
server.use(express.urlencoded({ extended: true }));

// ✅ Routes
server.use('/api', route);

server.get('/', (req, res) => {
  res.send('Hello to backend');
});

server.get('*', (req, res) => {
  res.status(404).send("404 NOT FOUND <a href='./'>Go To Home</a>");
});

// ✅ Connect to DB and start server
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error connecting to DB:', error);
  });
