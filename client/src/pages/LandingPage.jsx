import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Button,
  Typography,
  Card,
  Avatar,
  Carousel,
  Collapse,
  Badge,
} from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  HeartOutlined,
  MedicineBoxOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
  QuestionCircleOutlined,
  PhoneOutlined,
  MailOutlined,
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import {
  FaStethoscope,
  FaHospital,
  FaUserMd,
  FaUserInjured,
  FaCommentMedical,
  FaFileMedical,
  FaHeartbeat,
  FaClock,
  FaMobile,
} from "react-icons/fa";

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

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
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-indigo-900/30"></div>

          {/* Floating Medical Icons Background */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: 0.1,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
                style={{
                  fontSize: 20 + Math.random() * 30 + "px",
                  color: "white",
                }}
              >
                {[FaStethoscope, FaHeartbeat, FaUserMd, FaHospital][
                  Math.floor(Math.random() * 4)
                ]()}
              </motion.div>
            ))}
          </div>

          {/* Main Background Image */}
          <motion.div
            animate={{
              scale: [1, 1.02, 1],
              opacity: [0.7, 0.8, 0.7],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/images/hero-bg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              mixBlendMode: "overlay",
            }}
          ></motion.div>
        </div>

        {/* Hero Content */}
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
                className="relative"
              >
                <motion.div
                  className="absolute -top-4 -left-4 w-20 h-20 bg-blue-400/20 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                />
                <Badge.Ribbon
                  text="Healthcare Reimagined"
                  color="blue"
                  className="backdrop-blur-sm"
                >
                  <Title
                    level={1}
                    className="text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                  >
                    Your Health Journey{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
                      Starts Here
                    </span>
                  </Title>
                </Badge.Ribbon>
                <Paragraph className="text-xl text-gray-100 mb-8 leading-relaxed">
                  Experience healthcare like never before. Connect with top
                  doctors, schedule appointments, and manage your health journey
                  - all in one place.
                </Paragraph>
                <div className="flex flex-wrap gap-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      type="primary"
                      size="large"
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 border-none hover:from-blue-600 hover:to-indigo-600 h-14 px-10 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                      icon={<ArrowRightOutlined />}
                    >
                      <Link to="/register">Get Started</Link>
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="large"
                      ghost
                      className="border-2 h-14 px-10 text-lg rounded-full hover:bg-white/10 transition-all duration-300"
                    >
                      <Link to="/login">Login</Link>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="hidden lg:block relative"
            >
              <motion.div
                className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              />
              <motion.img
                src="https://cdn.create.vista.com/api/media/small/589433246/stock-photo-black-female-doctor-talking-small-girl-who-sitting-her-mother"
                alt="Healthcare Professional"
                className="w-full h-auto rounded-2xl shadow-2xl relative z-10"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{
                  clipPath: "polygon(0 10%, 100% 0, 100% 90%, 0 100%)",
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Enhanced Floating Stats */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20"
        >
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  className="text-center text-white relative group"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/5 rounded-lg -z-10"
                    whileHover={{ scale: 1.1 }}
                  />
                  <Text className="text-5xl font-bold block mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-200">
                    {stat.value}
                  </Text>
                  <Text className="text-gray-200 text-lg">{stat.label}</Text>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* How It Works Section - Enhanced */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge.Ribbon text="Simple Process" color="blue" className="mb-6">
              <Title
                level={2}
                className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
              >
                How CareChain Works
              </Title>
            </Badge.Ribbon>
            <Text className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to better healthcare management
            </Text>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <Card
                  className="h-full bg-gradient-to-br from-white to-blue-50 border-none shadow-lg rounded-2xl overflow-visible"
                  hoverable
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                  <div className="text-center pt-12">
                    <div className="text-6xl text-blue-500 mb-8 flex justify-center transform transition-transform duration-300 group-hover:scale-110">
                      {step.icon}
                    </div>
                    <Title level={3} className="mb-4 text-2xl">
                      {step.title}
                    </Title>
                    <Text className="text-gray-600 text-lg">
                      {step.description}
                    </Text>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Decorative Elements */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: 4,
          }}
        />

        <div className="container mx-auto px-4 relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge.Ribbon text="Premium Features" color="blue" className="mb-6">
              <Title
                level={2}
                className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
              >
                Why Choose CareChain?
              </Title>
            </Badge.Ribbon>
            <Text className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of healthcare with our comprehensive
              platform
            </Text>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <Card
                  hoverable
                  className="h-full bg-white border-none shadow-lg rounded-2xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
                >
                  <div className="relative">
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-300" />
                    <motion.div className="text-center relative z-10">
                      <div className="text-7xl text-blue-500 mb-8 flex justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:text-indigo-500">
                        {feature.icon}
                      </div>
                      <Title level={3} className="text-2xl mb-4">
                        {feature.title}
                      </Title>
                      <Text className="text-gray-600 text-lg leading-relaxed">
                        {feature.description}
                      </Text>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/pattern-bg.png')",
            backgroundSize: "30px",
            opacity: 0.1,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
        />

        <div className="container mx-auto px-4 relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge.Ribbon text="User Stories" color="blue" className="mb-6">
              <Title
                level={2}
                className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
              >
                What Our Users Say
              </Title>
            </Badge.Ribbon>
          </motion.div>

          <Carousel
            autoplay
            className="pb-12 -mx-4"
            dots={{ className: "custom-dots" }}
            effect="fade"
          >
            <div className="px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="group"
                  >
                    <Card className="h-full bg-white hover:shadow-xl transition-shadow duration-300 border-none rounded-2xl overflow-hidden">
                      <div className="relative pb-6">
                        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-2xl" />
                        <div className="relative flex items-center px-6 pt-10">
                          <Avatar
                            src={testimonial.avatar}
                            size={80}
                            icon={<UserOutlined />}
                            className="border-4 border-white shadow-xl"
                          />
                          <div className="ml-4">
                            <Title level={4} className="mb-0 text-xl">
                              {testimonial.name}
                            </Title>
                            <Text type="secondary" className="text-lg">
                              {testimonial.role}
                            </Text>
                          </div>
                        </div>
                      </div>
                      <Paragraph className="text-gray-600 italic text-lg leading-relaxed px-6">
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

      {/* Enhanced FAQ Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />

        <div className="container mx-auto px-4 relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge.Ribbon text="Help Center" color="blue" className="mb-6">
              <Title
                level={2}
                className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
              >
                Frequently Asked Questions
              </Title>
            </Badge.Ribbon>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Collapse
              defaultActiveKey={["1"]}
              className="bg-white rounded-2xl shadow-lg border-none"
              expandIconPosition="right"
            >
              {faqs.map((faq, index) => (
                <Panel
                  header={
                    <div className="flex items-center py-2">
                      <QuestionCircleOutlined className="text-blue-500 text-xl mr-3" />
                      <span className="text-lg font-semibold">
                        {faq.question}
                      </span>
                    </div>
                  }
                  key={index + 1}
                  className="mb-4 overflow-hidden"
                >
                  <Paragraph className="text-gray-600 text-lg leading-relaxed pl-8">
                    {faq.answer}
                  </Paragraph>
                </Panel>
              ))}
            </Collapse>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-24 bg-gradient-to-r from-blue-600 to-indigo-900 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/cta-pattern.png')",
            backgroundSize: "cover",
            opacity: 0.1,
          }}
        />

        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Title
              level={2}
              className="text-6xl font-bold mb-8 text-white leading-tight"
            >
              Ready to Transform Your Healthcare Experience?
            </Title>
            <Paragraph className="text-2xl mb-12 text-gray-200 leading-relaxed">
              Join thousands of patients and healthcare providers who trust our
              platform for better healthcare management.
            </Paragraph>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex gap-6 justify-center"
            >
              <Button
                type="primary"
                size="large"
                className="bg-white text-blue-600 border-none hover:bg-blue-50 h-16 px-12 text-xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                icon={<ArrowRightOutlined />}
              >
                <Link to="/register">Create Your Account</Link>
              </Button>
              <Button
                size="large"
                ghost
                className="border-2 h-16 px-12 text-xl rounded-full hover:bg-white/10 transition-all duration-300"
                icon={<PhoneOutlined />}
              >
                Contact Sales
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-20 relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/footer-pattern.png')",
            backgroundSize: "cover",
            opacity: 0.1,
          }}
        />
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <Title level={4} className="text-white mb-6 text-2xl">
                CareChain
              </Title>
              <Paragraph className="text-gray-400 text-lg">
                Transforming healthcare through technology and innovation.
              </Paragraph>
              <div className="flex gap-6 mt-6">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FacebookOutlined className="text-2xl hover:text-blue-400 cursor-pointer transition-colors duration-300" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <TwitterOutlined className="text-2xl hover:text-blue-400 cursor-pointer transition-colors duration-300" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <LinkedinOutlined className="text-2xl hover:text-blue-400 cursor-pointer transition-colors duration-300" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <InstagramOutlined className="text-2xl hover:text-blue-400 cursor-pointer transition-colors duration-300" />
                </motion.div>
              </div>
            </div>
            <div>
              <Title level={4} className="text-white mb-6 text-xl">
                Quick Links
              </Title>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/about"
                    className="text-gray-400 hover:text-white text-lg transition-colors duration-300"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-gray-400 hover:text-white text-lg transition-colors duration-300"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/doctors"
                    className="text-gray-400 hover:text-white text-lg transition-colors duration-300"
                  >
                    Find Doctors
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-400 hover:text-white text-lg transition-colors duration-300"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <Title level={4} className="text-white mb-6 text-xl">
                Legal
              </Title>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/privacy"
                    className="text-gray-400 hover:text-white text-lg transition-colors duration-300"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-gray-400 hover:text-white text-lg transition-colors duration-300"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cookies"
                    className="text-gray-400 hover:text-white text-lg transition-colors duration-300"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <Title level={4} className="text-white mb-6 text-xl">
                Contact
              </Title>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-400 text-lg">
                  <PhoneOutlined className="text-blue-400" /> +1 (555) 123-4567
                </li>
                <li className="flex items-center gap-3 text-gray-400 text-lg">
                  <MailOutlined className="text-blue-400" />{" "}
                  support@carechain.com
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-400">
            <Text className="text-lg">
              © 2024 CareChain. All rights reserved.
            </Text>
          </div>
        </div>
      </footer>
    </div>
  );
};

const stats = [
  { value: "50K+", label: "Active Patients" },
  { value: "1000+", label: "Expert Doctors" },
  { value: "100K+", label: "Appointments" },
  { value: "99%", label: "Satisfaction Rate" },
];

const howItWorks = [
  {
    icon: <FaUserMd className="mx-auto" />,
    title: "Create Account",
    description:
      "Sign up in minutes and complete your health profile with relevant medical history.",
  },
  {
    icon: <FaHospital className="mx-auto" />,
    title: "Find Care",
    description:
      "Browse through our network of qualified healthcare providers and choose the right one.",
  },
  {
    icon: <FaClock className="mx-auto" />,
    title: "Book & Manage",
    description:
      "Schedule appointments, get digital prescriptions, and manage your health journey.",
  },
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

const faqs = [
  {
    question: "How do I schedule an appointment?",
    answer:
      "Simply create an account, browse through our network of healthcare providers, select your preferred doctor, and choose an available time slot that works for you.",
  },
  {
    question: "Is my medical information secure?",
    answer:
      "Yes, we implement state-of-the-art security measures and comply with all healthcare data protection regulations to ensure your information is safe and confidential.",
  },
  {
    question: "Can I get digital prescriptions?",
    answer:
      "Yes, our platform enables doctors to issue digital prescriptions which you can access directly through your account and share with your pharmacy.",
  },
  {
    question: "What types of healthcare providers are available?",
    answer:
      "We have a diverse network of healthcare providers including general practitioners, specialists, mental health professionals, and more.",
  },
];

export default LandingPage;
