import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  medicineSuggested: {
    type: String,
    required: true,
  },
  remarks: {
    type: String,
    required: true,
  },
  generateReport: {
    type: Boolean,
    default: false,
  },
  reportFile: {
    type: String, // This will store the file path or URL
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Report = mongoose.model('Report', reportSchema);

export default Report;
