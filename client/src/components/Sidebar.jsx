import { useState } from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  CalendarOutlined,
  MessageOutlined,
  SettingOutlined,
  FileTextOutlined,
  TeamOutlined,
  DollarOutlined,
  BellOutlined,
  MedicineBoxOutlined,
  BarChartOutlined,
  ClockCircleOutlined,
  ProfileOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import {
  FaUserMd,
  FaHospital,
  FaFileMedical,
  FaUserInjured,
} from "react-icons/fa";

const { Sider } = Layout;

const Sidebar = ({ role, collapsed }) => {
  const location = useLocation();

  const adminMenuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: <Link to="/dashboard/admin">Dashboard</Link>,
    },
    {
      key: "user-management",
      icon: <TeamOutlined />,
      label: "User Management",
      children: [
        {
          key: "doctors",
          icon: <FaUserMd />,
          label: <Link to="/dashboard/admin/doctors">Doctors</Link>,
        },
        {
          key: "patients",
          icon: <FaUserInjured />,
          label: <Link to="/dashboard/admin/patients">Patients</Link>,
        },
      ],
    },
    {
      key: "appointments",
      icon: <CalendarOutlined />,
      label: <Link to="/dashboard/admin/appointments">Appointments</Link>,
    },
    {
      key: "applications",
      icon: <FileTextOutlined />,
      label: <Link to="/dashboard/admin/applications">Applications</Link>,
    },
    {
      key: "reports",
      icon: <BarChartOutlined />,
      label: "Reports",
      children: [
        {
          key: "revenue",
          icon: <DollarOutlined />,
          label: <Link to="/dashboard/admin/reports/revenue">Revenue</Link>,
        },
        {
          key: "analytics",
          icon: <BarChartOutlined />,
          label: <Link to="/dashboard/admin/reports/analytics">Analytics</Link>,
        },
      ],
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: <Link to="/dashboard/admin/settings">Settings</Link>,
    },
  ];

  const doctorMenuItems = [
    {
      key: "appointments",
      icon: <CalendarOutlined />,
      label: "Appointments",
      children: [
        {
          key: "upcoming",
          icon: <ClockCircleOutlined />,
          label: (
            <Link to="/dashboard/doctor/upcoming">Upcoming</Link>
          ),
        },
        {
          key: "completed",
          icon: <CheckCircleOutlined />,
          label: (
            <Link to="/dashboard/doctor/completed">Completed</Link>
          ),
        },
      ],
    },
    // {
    //   key: "patients",
    //   icon: <FaUserInjured />,
    //   label: "Patients",
    //   children: [
    //     {
    //       key: "my-patients",
    //       icon: <TeamOutlined />,
    //       label: <Link to="/dashboard/doctor/patients">My Patients</Link>,
    //     },
    //     {
    //       key: "applications",
    //       icon: <FileTextOutlined />,
    //       label: <Link to="/dashboard/doctor/applications">Applications</Link>,
    //     },
    //   ],
    // },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: <Link to="/dashboard/doctor/profile">Profile</Link>,
    },
  ];

  const patientMenuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: <Link to="/dashboard/patient">Dashboard</Link>,
    },
    {
      key: "appointments",
      icon: <CalendarOutlined />,
      label: "Appointments",
      children: [
        {
          key: "book",
          icon: <FaHospital />,
          label: (
            <Link to="/dashboard/patient/book">Book New</Link>
          ),
        },
        {
          key: "upcoming",
          icon: <ClockCircleOutlined />,
          label: (
            <Link to="/dashboard/patient/upcoming">Upcoming</Link>
          ),
        },
        {
          key: "history",
          icon: <ProfileOutlined />,
          label: (
            <Link to="/dashboard/patient/history">Completed</Link>
          ),
        },
      ],
    },
    {
      key: "medical-records",
      icon: <FaFileMedical />,
      label: <Link to="/dashboard/patient/records">Medical Records</Link>,
    }
  ];

  const getMenuItems = () => {
    switch (role) {
      case "admin":
        return adminMenuItems;
      case "doctor":
        return doctorMenuItems;
      case "patient":
        return patientMenuItems;
      default:
        return [];
    }
  };

  return (
    <Sider
      collapsed={collapsed}
      width={260}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
      className="bg-black dark:bg-green-800 border-r  border-gray-200 dark:border-gray-700"
    >
      <div className="p-4">
        <Link to="/" className="flex items-center justify-center">
          <FaHospital className="text-2xl text-blue-500" />
          {!collapsed && (
            <span className="ml-2 text-lg font-semibold text-gray-800 dark:text-white">
              CareChain
            </span>
          )}
        </Link>
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={[location.pathname.split("/").pop()]}
        defaultOpenKeys={[
          "appointments",
          "patients",
          "user-management",
          "reports",
        ]}
        items={getMenuItems()}
        className="border-r-0 mt-3 h-[calc(100vh-80px)]"
      />
    </Sider>
  );
};

export default Sidebar;
