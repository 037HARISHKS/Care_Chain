import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
  },
  content: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['text', 'image', 'file', 'prescription', 'report'],
    default: 'text',
  },
  attachments: [{
    name: String,
    url: String,
    type: String,
    size: Number,
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  status: {
    type: String,
    enum: ['sent', 'delivered', 'read'],
    default: 'sent',
  },
  readAt: Date,
  metadata: {
    isUrgent: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      enum: ['general', 'appointment', 'prescription', 'report', 'emergency'],
      default: 'general',
    },
  },
  replyTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  },
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
messageSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Method to mark message as read
messageSchema.methods.markAsRead = async function() {
  if (this.status !== 'read') {
    this.status = 'read';
    this.readAt = new Date();
    return this.save();
  }
  return this;
};

// Method to mark message as delivered
messageSchema.methods.markAsDelivered = async function() {
  if (this.status === 'sent') {
    this.status = 'delivered';
    return this.save();
  }
  return this;
};

// Static method to get unread messages count
messageSchema.statics.getUnreadCount = async function(userId) {
  return this.countDocuments({
    receiverId: userId,
    status: { $ne: 'read' },
  });
};

// Static method to get conversation between two users
messageSchema.statics.getConversation = async function(user1Id, user2Id, limit = 50, skip = 0) {
  return this.find({
    $or: [
      { senderId: user1Id, receiverId: user2Id },
      { senderId: user2Id, receiverId: user1Id },
    ],
  })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('senderId', 'fullName profilePicture')
    .populate('receiverId', 'fullName profilePicture')
    .populate('replyTo');
};

const Message = mongoose.model('Message', messageSchema);

export default Message; 