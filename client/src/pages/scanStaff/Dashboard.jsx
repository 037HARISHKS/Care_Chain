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

  const [scanRequests, setScanRequests] = useState([]);

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

      if (Array.isArray(data) && data.length > 0) {
        const { lab_requests } = data[0]; // Destructure lab_requests
        setScanRequests(Array.isArray(lab_requests) ? lab_requests : []); // Ensure it's an array
      } else {
        setScanRequests([]); // Default empty array if data is not as expected
      }

      console.log("Fetched Data:", data);
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
      title: "Patient",
      dataIndex: "patientName",
      key: "patient",
      render: (text) => (
        <div className="flex items-center">
          <Avatar icon={<UserOutlined />} className="mr-2" />
          {text}
        </div>
      ),
    },
    {
      title: "Doctor",
      dataIndex: "doctorName",
      key: "doctor",
    },
    {
      title: "Scan Type",
      dataIndex: "scanType",
      key: "scanType",
      render: (type) => (
        <Tag
          color={
            type === "MRI"
              ? "blue"
              : type === "X-Ray"
              ? "green"
              : type === "CT Scan"
              ? "purple"
              : "orange"
          }
        >
          {type}
        </Tag>
      ),
    },
    {
      title: "Body Part",
      dataIndex: "bodyPart",
      key: "bodyPart",
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      key: "datetime",
      render: (text, record) => (
        <span>
          <CalendarOutlined className="mr-2" />
          {text} {record.time}
        </span>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority) => (
        <Tag
          color={
            priority === "high"
              ? "red"
              : priority === "medium"
              ? "orange"
              : "green"
          }
        >
          {priority.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "completed" ? "success" : "warning"}>
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
          icon={<UploadOutlined />}
          onClick={() => handleUploadReport(record.id)}
          disabled={record.status === "completed"}
        >
          Upload Report
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
        <Table
          columns={columns}
          dataSource={scanRequests}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} scan requests`,
          }}
        />
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
