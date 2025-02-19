const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const socketio = require('socket.io');
const http = require('http');

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Routes will be added here
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/patients', require('./routes/patient.routes'));
app.use('/api/doctors', require('./routes/doctor.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/appointments', require('./routes/appointment.routes'));
app.use('/api/messages', require('./routes/message.routes'));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 