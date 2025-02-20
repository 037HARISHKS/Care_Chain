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
} from "antd";
import { motion } from "framer-motion";
import {
  UserOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  TeamOutlined,
  BellOutlined,
  MessageOutlined,
  ClockCircleOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import {
  FaUserMd,
  FaCalendarCheck,
  FaUserInjured,
  FaCommentMedical,
} from "react-icons/fa";

const { Title, Text } = Typography;

const DoctorDashboard = () => {
  const [stats, setStats] = useState({
    pendingApplications: 0,
    upcomingAppointments: 0,
    completedAppointments: 0,
    totalPatients: 0,
  });

  const [applications, setApplications] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch doctor dashboard data
    setStats({
      pendingApplications: 5,
      upcomingAppointments: 8,
      completedAppointments: 120,
      totalPatients: 45,
    });

    setApplications([
      {
        id: 1,
        patientName: "John Doe",
        problem: "Chronic back pain",
        date: "2024-02-19",
        status: "pending",
      },
    ]);

    setAppointments([
      {
        id: 1,
        patientName: "Alice Smith",
        date: "2024-02-20",
        time: "10:00 AM",
        type: "Check-up",
        status: "confirmed",
      },
    ]);

    setMessages([
      {
        id: 1,
        from: "Bob Wilson",
        message: "Hello Dr., I have a question about...",
        time: "5 mins ago",
        unread: true,
      },
    ]);
  }, []);

  const applicationColumns = [
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
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
        <div className="space-x-2">
          <Button type="primary" size="small">
            Accept
          </Button>
          <Button danger size="small">
            Reject
          </Button>
        </div>
      ),
    },
  ];

  const appointmentColumns = [
    {
      title: "Patient",
      dataIndex: "patientName",
      key: "patientName",
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
        <Button type="primary" size="small" icon={<MessageOutlined />}>
          Start Session
        </Button>
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
      <div className="flex justify-between items-center mb-6">
        <Title level={2} style={{ margin: 0 }}>
          Doctor Dashboard
        </Title>
        <Button type="primary" icon={<ScheduleOutlined />} size="large">
          Schedule Availability
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <StatCard
              icon={<FaUserMd />}
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
              icon={<FaUserInjured />}
              title="Total Patients"
              value={stats.totalPatients}
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
                <FaUserMd className="mr-2 text-blue-500" />
                <span>Patient Applications</span>
              </div>
            }
            extra={<Button type="link">View All</Button>}
          >
            <Table
              columns={applicationColumns}
              dataSource={applications}
              pagination={false}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card
            title={
              <div className="flex items-center">
                <FaCommentMedical className="mr-2 text-green-500" />
                <span>Recent Messages</span>
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

      <Card
        title={
          <div className="flex items-center">
            <CalendarOutlined className="mr-2 text-indigo-500" />
            <span>Upcoming Appointments</span>
          </div>
        }
        extra={<Button type="link">View Calendar</Button>}
      >
        <Table
          columns={appointmentColumns}
          dataSource={appointments}
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default DoctorDashboard;
