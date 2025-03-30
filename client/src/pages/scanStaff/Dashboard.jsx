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

const { Title, Text } = Typography;
const { Option } = Select;

const ScanStaffDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    pendingScans: 5,
    completedScans: 12,
    totalPatients: 17,
    todayScans: 3,
  });
  const [scanRequests, setScanRequests] = useState();

const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedScan, setSelectedScan] = useState(null);
  const [form] = Form.useForm();

  const handleUploadReport = (scanId) => {
    setSelectedScan(scanId);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedScan(null);
    form.resetFields();
  };

  const handleFormSubmit = async (values) => {
    try {
      console.log("Form values:", values);
      message.success("Report uploaded successfully");
      handleModalClose();
      fetchScanRequests();
    } catch (error) {
      message.error("Failed to upload report");
    }
  };
  const fetchScanRequests = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/technician/fetchScanRequests`);
      const data = await response.json();

      if (data.length > 0 && Array.isArray(data[0].lab_requests)) {
        console.log("Fetched Data:", data);
        console.log("Lab Requests:", data[0].lab_requests);
        setScanRequests(data[0].lab_requests);
      } else {
        console.warn("Unexpected data format:", data);
        setScanRequests([]);
      }
    } catch (error) {
      message.error("Failed to fetch scan requests");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScanRequests();
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
          Scan Staff Dashboard
        </Title>
        <Button type="primary" icon={<FileImageOutlined />} size="large">
          New Scan Request
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
              title="Pending Scans"
              value={stats.pendingScans}
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
              title="Completed Scans"
              value={stats.completedScans}
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
              title="Today's Scans"
              value={stats.todayScans}
              color="#fa8c16"
            />
          </motion.div>
        </Col>
      </Row>

      <Card
        title={
          <div className="flex items-center">
            <FaFileMedical className="mr-2 text-blue-500" />
            <span>Scan Requests</span>
          </div>
        }
      >
        <Table dataSource={scanRequests} columns={columns} />;
      </Card>

      <Modal
        title="Upload Scan Report"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            name="reportType"
            label="Report Type"
            rules={[{ required: true, message: "Please select report type" }]}
          >
            <Select>
              <Option value="preliminary">Preliminary Report</Option>
              <Option value="final">Final Report</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="findings"
            label="Findings"
            rules={[{ required: true, message: "Please enter findings" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="impression"
            label="Impression"
            rules={[{ required: true, message: "Please enter impression" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="scanImage"
            label="Scan Image"
            rules={[{ required: true, message: "Please upload scan image" }]}
          >
            <Upload listType="picture" maxCount={1} beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Upload Report
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ScanStaffDashboard;
