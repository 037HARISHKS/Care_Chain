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
  Modal,
  Form,
  Input,
  Upload,
  message,
  Select,
} from "antd";
import { motion } from "framer-motion";
import {
  UserOutlined,
  FileImageOutlined,
  UploadOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { FaUserInjured, FaFileMedical } from "react-icons/fa";
import TestReportForm from './TestReportForm';

const { Title, Text } = Typography;
const { Option } = Select;

const LabStaffDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    pendingTests: 5,
    completedTests: 12,
    totalPatients: 17,
    todayTests: 3,
  });
  const [testRequests, setTestRequests] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [form] = Form.useForm();

  const [isReportModalVisible, setIsReportModalVisible] = useState(false);

  const handleUploadReport = (testId) => {
    setSelectedTest(testId);
    setIsReportModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedTest(null);
    form.resetFields();
  };

  const handleFormSubmit = async (values) => {
    try {
      console.log("Form values:", values);
      message.success("Report uploaded successfully");
      handleModalClose();
      fetchTestRequests();
    } catch (error) {
      message.error("Failed to upload report");
    }
  };

  const handleReportModalClose = () => {
    setIsReportModalVisible(false);
  };

  const handleReportFormSubmit = () => {
    fetchTestRequests();
    handleReportModalClose();
  };

  const fetchTestRequests = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/technician/fetchScanRequests`);
      const data = await response.json();

      if (data.length > 0 && Array.isArray(data[0].lab_requests)) {
        console.log("Fetched Data:", data);
        console.log("Lab Requests:", data[0].lab_requests);
        setTestRequests(data[0].lab_requests);
      } else {
        console.warn("Unexpected data format:", data);
        setTestRequests([]);
      }
    } catch (error) {
      message.error("Failed to fetch test requests");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestRequests();
  }, []);

  const columns = [
    {
      title: "appointment_id",
      dataIndex: "appointment_id",
      key: "appointment_id",
    },
    {
      title: "doctor_name",
      dataIndex: "doctor_name",
      key: "doctor_name",
    },
    {
      title: "observations",
      dataIndex: "observations",
      key: "observations",
    },
    {
      title: "patient_id",
      dataIndex: "patient_id",
      key: "patient_id",
    },
    {
      title: "patient_name",
      dataIndex: "patient_name",
      key: "patient_name",
    },
    {
      title: "test_status",
      dataIndex: "test_status",
      key: "test_status",
    },
    {
      title: "test_type",
      dataIndex: "test_type",
      key: "test_type",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          icon={<FaFileMedical className="mr-1" />}
          onClick={() => handleUploadReport(record.appointment_id)}
        >
          Make Test Report
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
          Lab Staff Dashboard
        </Title>
        <Button type="primary" icon={<FileImageOutlined />} size="large" onClick={() => setIsReportModalVisible(true)}>
          New Test Request
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
              icon={<ClockCircleOutlined />}
              title="Pending Tests"
              value={stats.pendingTests}
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
              icon={<CheckCircleOutlined />}
              title="Completed Tests"
              value={stats.completedTests}
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
              icon={<FaUserInjured />}
              title="Total Patients"
              value={stats.totalPatients}
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
              icon={<FileTextOutlined />}
              title="Today's Tests"
              value={stats.todayTests}
              color="#fa8c16"
            />
          </motion.div>
        </Col>
      </Row>

      <Card
        title={
          <div className="flex items-center">
            <FaFileMedical className="mr-2 text-blue-500" />
            <span>Test Requests</span>
          </div>
        }
      >
        <Table dataSource={testRequests} columns={columns} />
      </Card>

      <Modal
        title="Upload Test Report"
        visible={isReportModalVisible}
        onCancel={handleReportModalClose}
        footer={null}
      >
        <TestReportForm onClose={handleReportModalClose} onSubmit={handleReportFormSubmit} />
      </Modal>
    </div>
  );
};

export default LabStaffDashboard; 