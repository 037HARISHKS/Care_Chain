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
  Input,
  Select,
  Statistic,
  Progress,
  List,
  Dropdown,
} from "antd";
import { motion } from "framer-motion";
import {
  UserOutlined,
  CalendarOutlined,
  DollarOutlined,
  SettingOutlined,
  SearchOutlined,
  BellOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import {
  FaUserMd,
  FaUserInjured,
  FaCalendarCheck,
  FaChartLine,
  FaHospital,
  FaCog,
} from "react-icons/fa";

const { Title, Text } = Typography;
const { Search } = Input;

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalPatients: 0,
    totalAppointments: 0,
    totalRevenue: 0,
  });

  const [users, setUsers] = useState([]);
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  useEffect(() => {
    // Fetch admin dashboard data
    setStats({
      totalDoctors: 150,
      totalPatients: 1200,
      totalAppointments: 450,
      totalRevenue: 25000,
    });

    setUsers([
      {
        id: 1,
        name: "Dr. Sarah Johnson",
        email: "sarah@example.com",
        role: "doctor",
        status: "active",
        joinDate: "2024-02-15",
      },
      {
        id: 2,
        name: "John Smith",
        email: "john@example.com",
        role: "patient",
        status: "active",
        joinDate: "2024-02-16",
      },
    ]);

    setPendingDoctors([
      {
        id: 1,
        name: "Dr. Michael Brown",
        specialization: "Cardiologist",
        experience: "10 years",
        status: "pending",
      },
    ]);

    setRecentActivity([
      {
        id: 1,
        action: "New Registration",
        user: "Emily White",
        role: "patient",
        time: "5 minutes ago",
      },
      {
        id: 2,
        action: "Appointment Booked",
        user: "Dr. James Wilson",
        role: "doctor",
        time: "10 minutes ago",
      },
    ]);
  }, []);

  const userColumns = [
    {
      title: "User",
      key: "user",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Avatar icon={<UserOutlined />} />
          <div>
            <Text strong>{record.name}</Text>
            <div className="text-gray-500 text-sm">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag color={role === "doctor" ? "blue" : "green"}>
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "success" : "warning"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Join Date",
      dataIndex: "joinDate",
      key: "joinDate",
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Dropdown
          menu={{
            items: [
              { key: "1", label: "Edit" },
              { key: "2", label: "Disable" },
              { key: "3", label: "Delete" },
            ],
          }}
          trigger={["click"]}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const StatCard = ({ icon, title, value, prefix, suffix, color, percent }) => (
    <Card bordered={false} className="hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="text-4xl mb-4" style={{ color }}>
          {icon}
        </div>
        <Dropdown
          menu={{
            items: [
              { key: "1", label: "View Details" },
              { key: "2", label: "Download Report" },
            ],
          }}
          trigger={["click"]}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      </div>
      <Statistic
        title={title}
        value={value}
        prefix={prefix}
        suffix={suffix}
        valueStyle={{ color }}
      />
      {percent && (
        <div className="mt-2">
          <Progress percent={percent} showInfo={false} strokeColor={color} />
          <div className="flex justify-between text-xs mt-1">
            <span className="text-gray-500">Progress</span>
            <span style={{ color }}>{percent}%</span>
          </div>
        </div>
      )}
    </Card>
  );

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <Title level={2} style={{ margin: 0 }}>
          Admin Dashboard
        </Title>
        <div className="flex gap-3">
          <Button icon={<BellOutlined />} />
          <Button type="primary" icon={<FaCog />}>
            Settings
          </Button>
        </div>
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
              title="Total Doctors"
              value={stats.totalDoctors}
              color="#1890ff"
              percent={75}
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
              icon={<FaUserInjured />}
              title="Total Patients"
              value={stats.totalPatients}
              color="#52c41a"
              percent={85}
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
              icon={<FaCalendarCheck />}
              title="Total Appointments"
              value={stats.totalAppointments}
              color="#722ed1"
              percent={65}
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
              icon={<DollarOutlined />}
              title="Total Revenue"
              value={stats.totalRevenue}
              prefix="$"
              color="#fa8c16"
              percent={90}
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
                <span>User Management</span>
              </div>
            }
            extra={
              <div className="flex gap-3">
                <Search
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: 200 }}
                />
                <Select
                  value={filterRole}
                  onChange={setFilterRole}
                  style={{ width: 120 }}
                >
                  <Select.Option value="all">All Roles</Select.Option>
                  <Select.Option value="doctor">Doctors</Select.Option>
                  <Select.Option value="patient">Patients</Select.Option>
                </Select>
              </div>
            }
          >
            <Table
              columns={userColumns}
              dataSource={filteredUsers}
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title={
              <div className="flex items-center">
                <FaChartLine className="mr-2 text-green-500" />
                <span>Recent Activity</span>
              </div>
            }
          >
            <List
              dataSource={recentActivity}
              renderItem={(item) => (
                <List.Item>
                  <div className="flex items-center w-full">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <Badge status="processing" />
                        <Text strong className="ml-2">
                          {item.action}
                        </Text>
                      </div>
                      <div className="text-gray-500 text-sm ml-4">
                        {item.user} • {item.role}
                      </div>
                    </div>
                    <Text type="secondary" className="text-sm">
                      {item.time}
                    </Text>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title={
          <div className="flex items-center">
            <FaUserMd className="mr-2 text-purple-500" />
            <span>Pending Doctor Approvals</span>
          </div>
        }
      >
        <List
          dataSource={pendingDoctors}
          renderItem={(doctor) => (
            <List.Item
              actions={[
                <Button type="primary" icon={<CheckCircleOutlined />}>
                  Approve
                </Button>,
                <Button danger icon={<CloseCircleOutlined />}>
                  Reject
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={doctor.name}
                description={
                  <Text type="secondary">
                    {doctor.specialization} • {doctor.experience}
                  </Text>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default AdminDashboard;
