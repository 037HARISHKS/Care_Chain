import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, TextInput, Label, Select, FileInput } from 'flowbite-react';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: 'patient',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    address: '',
    // Patient specific
    emergencyContact: '',
    insuranceDetails: '',
    // Doctor specific
    specialization: '',
    experience: '',
    clinicAddress: '',
    consultationFee: '',
    education: '',
    license: '',
    profilePicture: null
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add registration logic here
    try {
      // Submit form data
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="role">Register as</Label>
              <Select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <TextInput
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <TextInput
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <TextInput
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <TextInput
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <TextInput
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <TextInput
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        );

      case 3:
        return formData.role === 'patient' ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <TextInput
                id="emergencyContact"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="insuranceDetails">Insurance Details</Label>
              <TextInput
                id="insuranceDetails"
                name="insuranceDetails"
                value={formData.insuranceDetails}
                onChange={handleChange}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <Label htmlFor="specialization">Specialization</Label>
              <TextInput
                id="specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="experience">Years of Experience</Label>
              <TextInput
                id="experience"
                name="experience"
                type="number"
                value={formData.experience}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="consultationFee">Consultation Fee</Label>
              <TextInput
                id="consultationFee"
                name="consultationFee"
                type="number"
                value={formData.consultationFee}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="license">Medical License</Label>
              <FileInput
                id="license"
                name="license"
                onChange={handleChange}
                required
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
      >
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Step {step} of {formData.role === 'patient' ? '3' : '3'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {renderStep()}

          <div className="flex justify-between">
            {step > 1 && (
              <Button
                type="button"
                color="light"
                onClick={prevStep}
              >
                Previous
              </Button>
            )}
            {step < (formData.role === 'patient' ? 3 : 3) ? (
              <Button
                type="button"
                onClick={nextStep}
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                color="success"
              >
                Complete Registration
              </Button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Register; 