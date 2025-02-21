import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
// import doctorRoutes from "./routes/doctor.route.js";
// import patientRoutes from "./routes/patient.route.js";
// import appointmentRoutes from "./routes/appointment.route.js";
// import adminRoutes from "./routes/admin.route.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log('Cant Connect to MongoDB', err);
    });

app.use('/api/auth', authRoutes);
// app.use('/api/doctor', doctorRoutes);
// app.use('/api/patient', patientRoutes);
// app.use('/api/appointment', appointmentRoutes);
// app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

