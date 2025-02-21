import { useState, useEffect } from "react";
import {
  Card,
  Table,
  Tag,
  Avatar,
  Button,
  Row,
  Col,
  Typography,
  Badge,
  Form,
  Select,
  DatePicker,
  TimePicker,
  Input,
} from "antd";
import { motion } from "framer-motion";
import {
  UserOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  MessageOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import {
  FaUserMd,
  FaCalendarCheck,
  FaHospital,
  FaCommentMedical,
  FaFileMedical,
  FaUserInjured,
} from "react-icons/fa";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const PatientDashboard = () => {
  const [stats, setStats] = useState({
    pendingApplications: 0,
    upcomingAppointments: 0,
    completedAppointments: 0,
    unreadMessages: 0,
  });

  const [doctors, setDoctors] = useState([]);
  const [applications, setApplications] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch patient dashboard data
    setStats({
      pendingApplications: 2,
      upcomingAppointments: 3,
      completedAppointments: 15,
      unreadMessages: 4,
    });

    setDoctors([
      {
        id: 1,
        name: "Dr. Sarah Johnson",
        specialization: "Cardiologist",
        rating: 4.8,
      },
    ]);

    setApplications([
      {
        id: 1,
        doctor: "Dr. Michael Brown",
        problem: "Regular check-up",
        date: "2024-02-19",
        status: "pending",
      },
    ]);

    setAppointments([
      {
        id: 1,
        doctor: "Dr. Emily White",
        date: "2024-02-21",
        time: "2:30 PM",
        type: "Follow-up",
        status: "confirmed",
      },
    ]);

    setMessages([
      {
        id: 1,
        from: "Dr. James Wilson",
        message: "Your test results are ready...",
        time: "2 hours ago",
        unread: true,
      },
    ]);
  }, []);

  const handleBookingSubmit = (values) => {
    console.log("Booking submitted:", values);
  };

  const applicationColumns = [
    {
      title: "Doctor",
      dataIndex: "doctor",
      key: "doctor",
      render: (text) => (
        <div className="flex items-center">
          <Avatar icon={<UserOutlined />} className="mr-2" />
          {text}
        </div>
      ),
    },
    {
      title: "Problem",
      dataIndex: "problem",
      key: "problem",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => (
        <span>
          <CalendarOutlined className="mr-2" />
          {text}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "pending" ? "warning" : "success"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Button
          type="primary"
          size="small"
          icon={<FaFileMedical className="mr-1" />}
        >
          View Details
        </Button>
      ),
    },
  ];

  const appointmentColumns = [
    {
      title: "Doctor",
      dataIndex: "doctor",
      key: "doctor",
      render: (text) => (
        <div className="flex items-center">
          <Avatar icon={<UserOutlined />} className="mr-2" />
          {text}
        </div>
      ),
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      key: "date",
      render: (text, record) => (
        <span>
          <CalendarOutlined className="mr-2" />
          {text} {record.time}
        </span>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "confirmed" ? "success" : "warning"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <div className="space-x-2">
          <Button type="primary" size="small" icon={<MessageOutlined />}>
            Join
          </Button>
          <Button danger size="small">
            Cancel
          </Button>
        </div>
      ),
    },
  ];

  const StatCard = ({ icon, title, value, color }) => (
    <Card bordered={false} className="hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="text-4xl" style={{ color }}>
          {icon}
        </div>
        <div className="text-right">
          <Text type="secondary">{title}</Text>
          <Title level={3} style={{ margin: 0 }}>
            {value}
          </Title>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      <Title level={2} style={{ margin: 0 }}>
        Patient Dashboard
      </Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <StatCard
              icon={<FaFileMedical />}
              title="Pending Applications"
              value={stats.pendingApplications}
              color="#1890ff"
            />
          </motion.div>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <StatCard
              icon={<FaCalendarCheck />}
              title="Upcoming Appointments"
              value={stats.upcomingAppointments}
              color="#52c41a"
            />
          </motion.div>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <StatCard
              icon={<CheckCircleOutlined />}
              title="Completed Appointments"
              value={stats.completedAppointments}
              color="#722ed1"
            />
          </motion.div>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <StatCard
              icon={<FaCommentMedical />}
              title="Unread Messages"
              value={stats.unreadMessages}
              color="#fa8c16"
            />
          </motion.div>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card
            title={
              <div className="flex items-center">
                <FaHospital className="mr-2 text-blue-500" />
                <span>Book New Appointment</span>
              </div>
            }
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleBookingSubmit}
              className="space-y-4"
            >
              <Form.Item
                name="doctorId"
                label="Select Doctor"
                rules={[{ required: true, message: "Please select a doctor" }]}
              >
                <Select placeholder="Choose a doctor">
                  {doctors.map((doctor) => (
                    <Option key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialization}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="problem"
                label="Describe Your Problem"
                rules={[
                  { required: true, message: "Please describe your problem" },
                ]}
              >
                <TextArea rows={3} />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="preferredDate"
                    label="Preferred Date"
                    rules={[
                      { required: true, message: "Please select a date" },
                    ]}
                  >
                    <DatePicker className="w-full" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="preferredTime"
                    label="Preferred Time"
                    rules={[
                      { required: true, message: "Please select a time" },
                    ]}
                  >
                    <TimePicker className="w-full" format="HH:mm" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Request Appointment
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title={
              <div className="flex items-center">
                <FaCommentMedical className="mr-2 text-green-500" />
                <span>Messages from Doctors</span>
              </div>
            }
            extra={<Button type="link">View All</Button>}
          >
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar icon={<UserOutlined />} />
                    <div>
                      <Text strong>{message.from}</Text>
                      <div className="text-sm text-gray-500">
                        {message.message}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">{message.time}</div>
                    {message.unread && <Badge status="processing" text="New" />}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card
            title={
              <div className="flex items-center">
                <FaFileMedical className="mr-2 text-purple-500" />
                <span>My Applications</span>
              </div>
            }
          >
            <Table
              columns={applicationColumns}
              dataSource={applications}
              pagination={false}
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title={
              <div className="flex items-center">
                <FaCalendarCheck className="mr-2 text-indigo-500" />
                <span>Upcoming Appointments</span>
              </div>
            }
          >
            <Table
              columns={appointmentColumns}
              dataSource={appointments}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PatientDashboard;
