import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  duration: {
    type: Number, // in minutes
    default: 30,
  },
  type: {
    type: String,
    enum: ['consultation', 'follow-up', 'emergency', 'routine-checkup'],
    required: true,
  },
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'completed', 'cancelled', 'no-show'],
    default: 'scheduled',
  },
  problem: {
    type: String,
    required: true,
  },
  symptoms: [{
    type: String,
  }],
  diagnosis: {
    type: String,
    default: '',
  },
  prescription: [{
    medicine: String,
    dosage: String,
    duration: String,
    notes: String,
  }],
  notes: {
    type: String,
    default: '',
  },
  attachments: [{
    name: String,
    url: String,
    type: String,
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  followUpNeeded: {
    type: Boolean,
    default: false,
  },
  followUpDate: Date,
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'refunded'],
    default: 'pending',
  },
  paymentAmount: {
    type: Number,
    required: true,
  },
  meetingLink: {
    type: String,
    default: '',
  },
  rating: {
    score: {
      type: Number,
      min: 1,
      max: 5,
    },
    review: String,
    givenAt: Date,
  },
  notifications: [{
    type: {
      type: String,
      enum: ['reminder', 'cancellation', 'rescheduled', 'completed'],
    },
    message: String,
    sentAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['sent', 'delivered', 'read'],
      default: 'sent',
    },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware
appointmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual for appointment duration end time
appointmentSchema.virtual('endTime').get(function() {
  const [hours, minutes] = this.time.split(':');
  const startTime = new Date();
  startTime.setHours(parseInt(hours), parseInt(minutes));
  const endTime = new Date(startTime.getTime() + this.duration * 60000);
  return `${endTime.getHours()}:${endTime.getMinutes().toString().padStart(2, '0')}`;
});

// Method to check if appointment can be cancelled
appointmentSchema.methods.canBeCancelled = function() {
  const appointmentDate = new Date(this.date);
  appointmentDate.setHours(this.time.split(':')[0], this.time.split(':')[1]);
  const now = new Date();
  const hoursDifference = (appointmentDate - now) / (1000 * 60 * 60);
  return hoursDifference >= 24; // Can be cancelled if more than 24 hours before
};

// Method to generate meeting link
appointmentSchema.methods.generateMeetingLink = function() {
  // This is a placeholder. Implement actual video conferencing integration
  const baseUrl = 'https://meet.carechain.com';
  const meetingId = this._id.toString();
  this.meetingLink = `${baseUrl}/${meetingId}`;
  return this.meetingLink;
};

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment; 