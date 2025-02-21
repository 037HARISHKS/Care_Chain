import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Button, TextInput, Label, Alert, Select } from "flowbite-react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "patient",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await dispatch(login(formData)).unwrap();
      navigate(`/dashboard/${formData.role}`);
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full space-y-8"
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Sign in to access your healthcare dashboard
            </p>
          </div>

          {error && (
            <Alert color="failure" className="mt-4">
              {error}
            </Alert>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="role"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Select Role
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
                  <option value="admin">Admin</option>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="email"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Email address
                </Label>
                <TextInput
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
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
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>

              <Link
                to="/forgot-password"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full"
              gradientDuoTone="purpleToBlue"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>

            <div className="text-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign up
                </Link>
              </span>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-900 opacity-90"></div>
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center text-white space-y-6">
            <h2 className="text-4xl font-bold mb-4">
              Healthcare Management System
            </h2>
            <p className="text-xl">
              Access your healthcare dashboard to manage appointments, view
              medical records, and communicate with healthcare providers.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="text-center p-4 bg-white bg-opacity-10 rounded-lg">
                <p className="text-3xl font-bold mb-2">500+</p>
                <p className="text-sm">Healthcare Providers</p>
              </div>
              <div className="text-center p-4 bg-white bg-opacity-10 rounded-lg">
                <p className="text-3xl font-bold mb-2">10K+</p>
                <p className="text-sm">Satisfied Patients</p>
              </div>
            </div>
          </div>
        </div>
        <img
          src="/medical-bg.jpg"
          alt="Healthcare"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default Login;
