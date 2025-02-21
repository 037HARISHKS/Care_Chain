import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
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
  problem: {
    type: String,
    required: true,
  },
  symptoms: [{
    type: String,
  }],
  medicalHistory: {
    type: String,
    required: true,
  },
  preferredDate: {
    type: Date,
    required: true,
  },
  preferredTime: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'cancelled'],
    default: 'pending',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'emergency'],
    default: 'medium',
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
  notes: {
    type: String,
    default: '',
  },
  reviewedAt: Date,
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  rejectionReason: String,
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
  },
  notifications: [{
    type: {
      type: String,
      enum: ['submitted', 'reviewed', 'approved', 'rejected'],
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