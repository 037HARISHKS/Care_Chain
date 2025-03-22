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
  Spin,
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
import { useSelector } from "react-redux";

const { Title, Text } = Typography;

const DoctorDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    pendingApplications: 0,
    upcomingAppointments: 0,
    completedAppointments: 0,
    totalPatients: 0,
  });
  const [applications, setApplications] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [messages, setMessages] = useState([]);
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Fetch all data in parallel
      const [
        statsResponse,
        applicationsResponse,
        appointmentsResponse,
        messagesResponse,
      ] = await Promise.all([
        fetch(`/api/appointments/doctor/stats/${currentUser.id}`, { headers }),
        fetch(`/api/appointments/doctor/pending/${currentUser.id}`, {
          headers,
        }),
        fetch(`/api/appointments/doctor/upcoming/${currentUser.id}`, {
          headers,
        }),
        fetch(`/api/messages/doctor/${currentUser._id}`, { headers }),
      ]);

      if (
        !statsResponse.ok ||
        !applicationsResponse.ok ||
        !appointmentsResponse.ok ||
        !messagesResponse.ok
      ) {
        throw new Error("Failed to fetch dashboard data");
      }

      const [statsData, applicationsData, appointmentsData, messagesData] =
        await Promise.all([
          statsResponse.json(),
          applicationsResponse.json(),
          appointmentsResponse.json(),
          messagesResponse.json(),
        ]);

      setStats(statsData);
      setApplications(applicationsData);
      setAppointments(appointmentsData);
      setMessages(messagesData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      message.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptApplication = async (applicationId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `/api/appointments/${applicationId}/approve`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to accept application");

      message.success("Application accepted successfully");
      fetchDashboardData(); // Refresh data
    } catch (error) {
      message.error("Failed to accept application");
    }
  };

  const handleRejectApplication = async (applicationId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `/api/appointments/${applicationId}/reject`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to reject application");

      message.success("Application rejected successfully");
      fetchDashboardData(); // Refresh data
    } catch (error) {
      message.error("Failed to reject application");
    }
  };

  const handleStartSession = async (appointmentId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `/api/appointments/${appointmentId}/start-session`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to start session");

      message.success("Session started successfully");
      // Navigate to video call or session page
      // navigate(`/session/${appointmentId}`);
    } catch (error) {
      message.error("Failed to start session");
    }
  };

  const applicationColumns = [
    {
      title: "Patient Name",
      dataIndex: ["patientId", "name"],
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
          {new Date(text).toLocaleDateString()}
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
      render: (_, record) => (
        <div className="space-x-2">
          <Button
            type="primary"
            size="small"
            onClick={() => handleAcceptApplication(record._id)}
          >
            Accept
          </Button>
          <Button
            danger
            size="small"
            onClick={() => handleRejectApplication(record._id)}
          >
            Reject
          </Button>
        </div>
      ),
    },
  ];

  const appointmentColumns = [
    {
      title: "Patient",
      dataIndex: ["patientId", "name"],
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
          {new Date(text).toLocaleDateString()} {record.time}
        </span>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <Tag
          color={
            type === "consultation"
              ? "blue"
              : type === "follow-up"
              ? "green"
              : type === "emergency"
              ? "red"
              : "orange"
          }
        >
          {type.toUpperCase()}
        </Tag>
      ),
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
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          icon={<MessageOutlined />}
          onClick={() => handleStartSession(record._id)}
        >
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

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
              rowKey="_id"
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
                  key={message._id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar icon={<UserOutlined />} />
                    <div>
                      <Text strong>{message.from?.name || "Anonymous"}</Text>
                      <div className="text-sm text-gray-500">
                        {message.content}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </div>
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
          rowKey="_id"
        />
      </Card>
    </div>
  );
};

export default DoctorDashboard;
