import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Layout,
  Menu,
  Button,
  Avatar,
  Dropdown,
  Space,
  Badge,
  Input,
  Typography,
} from "antd";
import {
  UserOutlined,
  BellOutlined,
  SearchOutlined,
  SettingOutlined,
  LogoutOutlined,
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { FaHospital } from "react-icons/fa";
import { motion } from "framer-motion";

const { Header } = Layout;
const { Text } = Typography;

const Navbar = ({ collapsed, setCollapsed }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Sign Out",
      danger: true,
    },
  ];

  const handleMenuClick = ({ key }) => {
    switch (key) {
      case "profile":
        navigate(`/profile/${user?.role}`);
        break;
      case "dashboard":
        navigate(`/dashboard/${user?.role}`);
        break;
      case "settings":
        navigate("/settings");
        break;
      case "logout":
        handleLogout();
        break;
      default:
        break;
    }
  };

  const notificationItems = [
    {
      key: "1",
      label: (
        <div className="flex flex-col">
          <Text strong>New Appointment</Text>
          <Text type="secondary">Dr. Sarah Johnson - 2:30 PM</Text>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="flex flex-col">
          <Text strong>Message Received</Text>
          <Text type="secondary">New message from your doctor</Text>
        </div>
      ),
    },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <Header
        className="px-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="flex items-center">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="mr-4"
          />
          <Link to="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <FaHospital className="text-2xl text-blue-500 mr-2" />
              <Text strong className="text-lg hidden md:inline">
                CareChain
              </Text>
            </motion.div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined />}
            className="hidden md:flex max-w-xs"
          />

          {isAuthenticated ? (
            <Space size="large">
              <Dropdown
                menu={{
                  items: notificationItems,
                  onClick: handleMenuClick,
                }}
                placement="bottomRight"
                arrow
              >
                <Badge count={2} className="cursor-pointer">
                  <Avatar
                    icon={<BellOutlined />}
                    className="bg-gray-100 text-gray-600"
                  />
                </Badge>
              </Dropdown>

              <Dropdown
                menu={{
                  items: userMenuItems,
                  onClick: handleMenuClick,
                }}
                placement="bottomRight"
                arrow
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Space className="cursor-pointer">
                    <Avatar
                      src={user?.avatar}
                      icon={<UserOutlined />}
                      className="bg-blue-500"
                    />
                    <div className="hidden md:flex flex-col">
                      <Text strong>{user?.fullName || "User Name"}</Text>
                      <Text type="secondary" className="text-xs">
                        {user?.role?.charAt(0).toUpperCase() +
                          user?.role?.slice(1)}
                      </Text>
                    </div>
                  </Space>
                </motion.div>
              </Dropdown>
            </Space>
          ) : (
            <Space>
              <Link to="/login">
                <Button type="text">Login</Button>
              </Link>
              <Link to="/register">
                <Button type="primary">Register</Button>
              </Link>
            </Space>
          )}
        </div>
      </Header>
    </div>
  );
};

export default Navbar;
