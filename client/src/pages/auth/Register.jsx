import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Button,
  TextInput,
  Label,
  Select,
  FileInput,
  Progress,
} from "flowbite-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { toast } from "react-toastify";
import React from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/slices/authSlice';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: "patient",
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    address: "",
    // Patient specific
    emergencyContact: "",
    insuranceDetails: "",
    // Doctor specific
    specialization: "",
    experience: "",
    clinicAddress: "",
    consultationFee: "",
    education: "",
    license: "",
    profilePicture: null,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch('/api/auth/' + formData.role + '/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          address: formData.address,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          emergencyContact: formData.emergencyContact,
          insuranceDetails: formData.insuranceDetails,
          specialization: formData.specialization,
          experience: formData.experience,
          clinicAddress: formData.clinicAddress,
          consultationFee: formData.consultationFee,
          education: formData.education,
          license: formData.license,
          profilePicture: formData.profilePicture,
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const data = await response.json();
      dispatch(loginSuccess({ user: data.user, token: data.token }));
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.message || "Registration failed. Please try again.");
    }
  };

  const progressPercentage =
    (step / (formData.role === "patient" ? 3 : 3)) * 100;

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div>
              <Label
                htmlFor="role"
                className="text-gray-700 dark:text-gray-300"
              >
                Register as
              </Label>
              <Select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="mt-1"
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </Select>
            </div>
            <div>
              <Label
                htmlFor="email"
                className="text-gray-700 dark:text-gray-300"
              >
                Email
              </Label>
              <TextInput
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label
                htmlFor="password"
                className="text-gray-700 dark:text-gray-300"
              >
                Password
              </Label>
              <TextInput
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label
                htmlFor="confirmPassword"
                className="text-gray-700 dark:text-gray-300"
              >
                Confirm Password
              </Label>
              <TextInput
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div>
              <Label
                htmlFor="fullName"
                className="text-gray-700 dark:text-gray-300"
              >
                Full Name
              </Label>
              <TextInput
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label
                htmlFor="dateOfBirth"
                className="text-gray-700 dark:text-gray-300"
              >
                Date of Birth
              </Label>
              <TextInput
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label
                htmlFor="gender"
                className="text-gray-700 dark:text-gray-300"
              >
                Gender
              </Label>
              <Select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="mt-1"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Select>
            </div>
            <div>
              <Label
                htmlFor="phone"
                className="text-gray-700 dark:text-gray-300"
              >
                Phone Number
              </Label>
              <TextInput
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
          </motion.div>
        );

      case 3:
        return formData.role === "patient" ? (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div>
              <Label
                htmlFor="emergencyContact"
                className="text-gray-700 dark:text-gray-300"
              >
                Emergency Contact
              </Label>
              <TextInput
                id="emergencyContact"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label
                htmlFor="insuranceDetails"
                className="text-gray-700 dark:text-gray-300"
              >
                Insurance Details
              </Label>
              <TextInput
                id="insuranceDetails"
                name="insuranceDetails"
                value={formData.insuranceDetails}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div>
              <Label
                htmlFor="specialization"
                className="text-gray-700 dark:text-gray-300"
              >
                Specialization
              </Label>
              <TextInput
                id="specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label
                htmlFor="experience"
                className="text-gray-700 dark:text-gray-300"
              >
                Years of Experience
              </Label>
              <TextInput
                id="experience"
                name="experience"
                type="number"
                value={formData.experience}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label
                htmlFor="consultationFee"
                className="text-gray-700 dark:text-gray-300"
              >
                Consultation Fee
              </Label>
              <TextInput
                id="consultationFee"
                name="consultationFee"
                type="number"
                value={formData.consultationFee}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label
                htmlFor="license"
                className="text-gray-700 dark:text-gray-300"
              >
                Medical License
              </Label>
              <FileInput
                id="license"
                name="license"
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-md w-full space-y-8"
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Create Account
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Join our healthcare platform
            </p>
          </div>

          <div className="mb-8">
            <Progress progress={progressPercentage} size="lg" color="blue" />
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
              Step {step} of {formData.role === "patient" ? "3" : "3"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {renderStep()}

            <div className="flex justify-between gap-4">
              {step > 1 && (
                <Button
                  type="button"
                  color="light"
                  onClick={prevStep}
                  className="w-full"
                >
                  Previous
                </Button>
              )}
              {step < (formData.role === "patient" ? 3 : 3) ? (
                <Button
                  type="button"
                  gradientDuoTone="purpleToBlue"
                  onClick={nextStep}
                  className="w-full"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  gradientDuoTone="purpleToBlue"
                  className="w-full"
                >
                  Complete Registration
                </Button>
              )}
            </div>

            {step === 1 && (
              <div className="text-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Sign in
                  </Link>
                </span>
              </div>
            )}
          </form>
        </motion.div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-900 opacity-90"></div>
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center text-white space-y-6">
            <h2 className="text-4xl font-bold mb-4">
              Join Our Healthcare Network
            </h2>
            <p className="text-xl">
              {formData.role === "patient"
                ? "Get access to top healthcare providers and manage your health journey efficiently."
                : "Connect with patients and grow your practice with our comprehensive platform."}
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="text-center p-4 bg-white bg-opacity-10 rounded-lg">
                <p className="text-3xl font-bold mb-2">Easy</p>
                <p className="text-sm">Registration Process</p>
              </div>
              <div className="text-center p-4 bg-white bg-opacity-10 rounded-lg">
                <p className="text-3xl font-bold mb-2">Secure</p>
                <p className="text-sm">Data Protection</p>
              </div>
            </div>
          </div>
        </div>
        <img
          src="/medical-register-bg.jpg"
          alt="Healthcare Registration"
          className="object-cover w-full h-full"
        />
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default Register;
