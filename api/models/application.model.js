import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  originalname: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  mimetype: {
    type: String,
    required: true
  }
});

const applicationSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['consultation', 'follow-up', 'emergency', 'routine-checkup']
  },
  problem: {
    type: String,
    required: true
  },
  symptoms: [{
    type: String
  }],
  duration: {
    type: Number,
    required: true,
    min: 15,
    max: 120
  },
  attachments: [fileSchema],
  followUpNeeded: {
    type: Boolean,
    default: false
  },
  paymentAmount: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save middleware
applicationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Method to check if application can be cancelled
applicationSchema.methods.canBeCancelled = function() {
  return this.status === 'pending';
};

// Method to approve application
applicationSchema.methods.approve = async function(reviewerId) {
  this.status = 'approved';
  this.reviewedAt = new Date();
  this.reviewedBy = reviewerId;
  this.notifications.push({
    type: 'approved',
    message: 'Your application has been approved',
  });
  return this.save();
};

// Method to reject application
applicationSchema.methods.reject = async function(reviewerId, reason) {
  this.status = 'rejected';
  this.reviewedAt = new Date();
  this.reviewedBy = reviewerId;
  this.rejectionReason = reason;
  this.notifications.push({
    type: 'rejected',
    message: `Your application has been rejected. Reason: ${reason}`,
  });
  return this.save();
};

const Application = mongoose.model('Application', applicationSchema);

export default Application; 