import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 to-indigo-900 h-screen">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-center mx-auto max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6"
            >
              Welcome to Healthcare Management System
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-200 mb-8"
            >
              Connecting Patients with Healthcare Professionals
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-x-4"
            >
              <Link
                to="/register"
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition duration-300"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition duration-300"
              >
                Login
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const features = [
  {
    icon: "🏥",
    title: "Online Appointments",
    description: "Book appointments with doctors instantly from anywhere."
  },
  {
    icon: "💊",
    title: "Digital Prescriptions",
    description: "Get and manage your prescriptions digitally."
  },
  {
    icon: "💬",
    title: "Chat with Doctors",
    description: "Real-time communication with healthcare professionals."
  }
];

export default LandingPage; 