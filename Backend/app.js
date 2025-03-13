import express from 'express';
import cors from 'cors';
import { join, dirname } from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';
import http from 'http';
import cookieParser from 'cookie-parser';
import storageConfig from './storageConfig.js';


const allowedOrigin = 'http://localhost:5173';

// ----------------------------
// Environment Variables Setup
// ----------------------------
dotenv.config();

// ----------------------------
// Resolve __dirname for ES Modules
// ----------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ----------------------------
// Express App Initialization
// ----------------------------
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}));


// ----------------------------
// Serve Static Files
// ----------------------------
app.use(express.static(join(__dirname)));

// ----------------------------
// Middleware for Parsing JSON and Cookies
// ----------------------------
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ----------------------------
// MongoDB Connection
// ----------------------------
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// ----------------------------
// HTTP Server and Socket.IO Setup
// ----------------------------
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigin, 
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// ----------------------------
// Socket.IO Connection Handling
// ----------------------------
import SetupSocket from './socket/SetupSocket.js';

SetupSocket(io);

// ----------------------------
// Basic Routes (Commented Routers)
// ----------------------------
import authentication from './routers/AuthRouter.js';
import profile from './routers/ProfileRouter.js';
import group from './routers/GroupRouter.js';
import groupMembers from './routers/GroupMemberRouter.js';
import notification from './routers/NotificationRouter.js';
import groupChat from './routers/GroupChatRouter.js';
import groupSearch from './routers/GroupSearchRouter.js';
import fileSystem from './routers/FileRouter.js';
import composite from './routers/CompositeRouter.js';


app.use('/', authentication);
app.use('/', profile);
app.use('/', group);
app.use('/', groupMembers);
app.use('/', notification);
app.use('/', groupChat);
app.use('/', groupSearch);
app.use('/', fileSystem);
app.use('/', composite);


// ----------------------------
// Start HTTP Server
// ----------------------------
httpServer.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
