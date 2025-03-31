import mongoose from 'mongoose';

const scanReportSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true,
  },
  reportType: {
    type: String,
    enum: ['Preliminary', 'Final'],
    required: true,
  },
  findings: {
    type: String,
    required: true,
  },
  impression: {
    type: String,
    required: true,
  },
  scanImage: {
    type: String, // URL or path to the uploaded image
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ScanReport = mongoose.model('ScanReport', scanReportSchema);

export default ScanReport; 