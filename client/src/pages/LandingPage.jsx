import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button, Typography, Card, Avatar, Carousel } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  HeartOutlined,
  MedicineBoxOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import {
  FaStethoscope,
  FaHospital,
  FaUserMd,
  FaUserInjured,
  FaCommentMedical,
  FaFileMedical,
} from "react-icons/fa";

const { Title, Text, Paragraph } = Typography;

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/50 to-indigo-900/50"></div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2091&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              mixBlendMode: "overlay",
            }}
          ></div>
        </div>

        <div className="relative container mx-auto px-4 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Title
                  level={1}
                  className="text-5xl lg:text-6xl font-bold text-white mb-6"
                >
                  Your Health Journey Starts Here
                </Title>
                <Paragraph className="text-xl text-gray-100 mb-8">
                  Experience healthcare like never before. Connect with top
                  doctors, schedule appointments, and manage your health journey
                  - all in one place.
                </Paragraph>
                <div className="flex flex-wrap gap-4">
                  <Button
                    type="primary"
                    size="large"
                    className="bg-white text-blue-600 border-none hover:bg-blue-50"
                    icon={<ArrowRightOutlined />}
                  >
                    <Link to="/register">Get Started</Link>
                  </Button>
                  <Button size="large" ghost className="border-2">
                    <Link to="/login">Login</Link>
                  </Button>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="hidden lg:block"
            >
              <img
                src="/hero-doctor.png"
                alt="Healthcare"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  className="text-center text-white"
                >
                  <Text className="text-3xl font-bold block mb-1">
                    {stat.value}
                  </Text>
                  <Text className="text-gray-200">{stat.label}</Text>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Title level={2} className="text-4xl font-bold mb-4">
              Why Choose CareChain?
            </Title>
            <Text className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of healthcare with our comprehensive
              platform
            </Text>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants} className="group">
                <Card
                  hoverable
                  className="h-full transition-all duration-300 hover:shadow-xl"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center"
                  >
                    <div className="text-5xl text-blue-500 mb-6 flex justify-center">
                      {feature.icon}
                    </div>
                    <Title level={3} className="mb-4">
                      {feature.title}
                    </Title>
                    <Text className="text-gray-600">{feature.description}</Text>
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Title level={2} className="text-4xl font-bold mb-4">
              What Our Users Say
            </Title>
          </motion.div>

          <Carousel autoplay className="pb-12">
            <div className="px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="group"
                  >
                    <Card className="h-full bg-gray-50 hover:shadow-lg transition-shadow">
                      <div className="flex items-center mb-6">
                        <Avatar
                          src={testimonial.avatar}
                          size={64}
                          icon={<UserOutlined />}
                        />
                        <div className="ml-4">
                          <Title level={4} className="mb-0">
                            {testimonial.name}
                          </Title>
                          <Text type="secondary">{testimonial.role}</Text>
                        </div>
                      </div>
                      <Paragraph className="text-gray-600 italic">
                        "{testimonial.comment}"
                      </Paragraph>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </Carousel>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-indigo-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <Title level={2} className="text-4xl font-bold mb-8 text-white">
              Ready to Transform Your Healthcare Experience?
            </Title>
            <Paragraph className="text-xl mb-8 text-gray-200">
              Join thousands of patients and healthcare providers who trust our
              platform for better healthcare management.
            </Paragraph>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="primary"
                size="large"
                className="bg-white text-blue-600 border-none hover:bg-blue-50"
                icon={<ArrowRightOutlined />}
              >
                <Link to="/register">Create Your Account</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const stats = [
  { value: "10K+", label: "Active Patients" },
  { value: "500+", label: "Expert Doctors" },
  { value: "50K+", label: "Appointments" },
  { value: "98%", label: "Satisfaction Rate" },
];

const features = [
  {
    icon: <FaStethoscope className="mx-auto" />,
    title: "Expert Healthcare",
    description:
      "Connect with qualified healthcare professionals and specialists for personalized care and treatment.",
  },
  {
    icon: <FaCommentMedical className="mx-auto" />,
    title: "Easy Communication",
    description:
      "Direct messaging with your healthcare providers ensures clear and timely communication.",
  },
  {
    icon: <FaFileMedical className="mx-auto" />,
    title: "Digital Records",
    description:
      "Access your medical history, prescriptions, and test results anytime, anywhere securely.",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Patient",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    comment:
      "CareChain has revolutionized how I manage my healthcare. Booking appointments and accessing my medical records has never been easier!",
  },
  {
    name: "Dr. Michael Chen",
    role: "Cardiologist",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    comment:
      "As a doctor, this platform helps me manage my practice efficiently. The patient communication tools are excellent.",
  },
  {
    name: "Emily Rodriguez",
    role: "Patient",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    comment:
      "The digital prescriptions and appointment reminders are game-changers. I love how everything is organized in one place.",
  },
];

export default LandingPage;
