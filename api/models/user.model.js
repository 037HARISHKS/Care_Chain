import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['patient', 'doctor', 'admin'],
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  profilePicture: {
    type: String,
    default: '',
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String,
  },
  insuranceDetails: {
    provider: String,
    policyNumber: String,
    expiryDate: Date,
  },
  medicalHistory: [{
    condition: String,
    diagnosedDate: Date,
    medications: [String],
    notes: String,
  }],
  // Doctor specific fields
  specialization: String,
  experience: Number,
  license: {
    number: String,
    expiryDate: Date,
    verificationStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
    },
  },
  consultationFee: Number,
  education: [{
    degree: String,
    institution: String,
    year: Number,
  }],

  ratings: [{
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    review: String,
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    date: {
      type: Date,
      default: Date.now,
    },
  }],
  averageRating: {
    type: Number,
    default: 0,
  },
  // Common fields
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active',
  },
  lastLogin: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// // Pre-save middleware to hash password
// userSchema.pre('save', async function(next) {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   this.updatedAt = Date.now();
//   next();
// });

// // Method to compare password
// userSchema.methods.comparePassword = async function(candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

// // Method to calculate average rating
// userSchema.methods.calculateAverageRating = function() {
//   if (this.ratings.length === 0) return 0;
//   const sum = this.ratings.reduce((acc, curr) => acc + curr.rating, 0);
//   return sum / this.ratings.length;
// };

const User = mongoose.model('User', userSchema);

export default User; 