import { useState, useEffect } from "react";
import { Card, Table, Tag, Avatar, Button, message } from "antd";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";
import { FaFileMedical } from "react-icons/fa";

const HistoryPatient = () => {
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplicationHistory();
  }, []);

  const fetchApplicationHistory = async () => {
    setLoading(true);
    try {
      // Replace with actual API endpoint
      const response = await fetch("/api/appointments/history");
      const data = await response.json();

      // Static data for development
      setApplications([
        {
          id: 1,
          doctor: "Dr. Michael Brown",
          problem: "Regular check-up",
          date: "2024-02-19",
          status: "completed",
        },
        {
          id: 2,
          doctor: "Dr. Sarah Johnson",
          problem: "Fever and cold",
          date: "2024-02-15",
          status: "cancelled",
        },
        // Add more static data as needed
      ]);
    } catch (error) {
      message.error("Failed to fetch appointment history");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
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
        <Tag
          color={
            status === "completed"
              ? "success"
              : status === "cancelled"
              ? "error"
              : "warning"
          }
        >
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
          icon={<FaFileMedical className="mr-1" />}
          onClick={() => handleViewDetails(record.id)}
        >
          View Details
        </Button>
      ),
    },
  ];

  const handleViewDetails = (id) => {
    // Implement view details functionality
    console.log("Viewing details for appointment:", id);
  };

  return (
    <div className="p-6">
      <Card
        title={
          <div className="flex items-center">
            <FaFileMedical className="mr-2 text-purple-500" />
            <span>Appointment History</span>
          </div>
        }
      >
        <Table
          columns={columns}
          dataSource={applications}
          loading={loading}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} appointments`,
          }}
        />
      </Card>
    </div>
  );
};

export default HistoryPatient;
