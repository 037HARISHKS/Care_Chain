import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import doctorRoutes from "./routes/doctor.route.js";
import patientRoutes from "./routes/patient.route.js";
import appointmentRoutes from "./routes/appointment.route.js";
import reportRoutes from "./routes/report.route.js";
// import adminRoutes from "./routes/admin.route.js";

dotenv.config();
const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log('Cant Connect to MongoDB', err);
    });

app.get('/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/reports', reportRoutes);
// app.use('/api/admin', adminRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something broke!', error: err.message });
});

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

