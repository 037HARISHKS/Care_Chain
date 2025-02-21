import { useState } from "react";
import { Layout } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const { Content } = Layout;

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const role = location.pathname.split("/")[2] || "patient"; // Default to patient if no role in URL

  return (
    <Layout>
      <Sidebar role={role} collapsed={collapsed} />
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 260,
          minHeight: "100vh",
          transition: "all 0.2s",
        }}
      >
        <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: "#fff",
            borderRadius: 8,
            minHeight: "calc(100vh - 112px)", // 64px header + 24px * 2 margin
            overflow: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
