import { useState, useEffect } from "react";
import { Card, Table, Tag, Avatar, Button, message } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  MessageOutlined,
} from "@ant-design/icons";

const UpcomingRequests = () => {
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchUpcomingAppointments();
  }, []);

  const fetchUpcomingAppointments = async () => {
    setLoading(true);
    try {
      // Replace with actual API endpoint
      const response = await fetch("/api/appointments/upcoming");
      const data = await response.json();

      // Static data for development
      setAppointments([
        {
          id: 1,
          doctor: "Dr. Emily White",
          date: "2024-02-21",
          time: "2:30 PM",
          type: "Follow-up",
          status: "confirmed",
        },
        {
          id: 2,
          doctor: "Dr. James Wilson",
          date: "2024-02-23",
          time: "10:00 AM",
          type: "Consultation",
          status: "pending",
        },
        // Add more static data as needed
      ]);
    } catch (error) {
      message.error("Failed to fetch upcoming appointments");
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
      render: (_, record) => (
        <div className="space-x-2">
          {record.status === "confirmed" && (
            <Button
              type="primary"
              size="small"
              icon={<MessageOutlined />}
              onClick={() => handleJoinMeeting(record.id)}
            >
              Join
            </Button>
          )}
          <Button
            danger
            size="small"
            onClick={() => handleCancelAppointment(record.id)}
          >
            Cancel
          </Button>
        </div>
      ),
    },
  ];

  const handleJoinMeeting = (id) => {
    // Implement join meeting functionality
    console.log("Joining meeting for appointment:", id);
  };

  const handleCancelAppointment = async (id) => {
    try {
      // Replace with actual API endpoint
      const response = await fetch(`/api/appointments/${id}/cancel`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Add authentication headers here
        },
      });

      if (!response.ok) throw new Error("Failed to cancel appointment");

      message.success("Appointment cancelled successfully");
      fetchUpcomingAppointments(); // Refresh the list
    } catch (error) {
      message.error("Failed to cancel appointment: " + error.message);
    }
  };

  return (
    <div className="p-6">
      <Card
        title={
          <div className="flex items-center">
            <CalendarOutlined className="mr-2 text-blue-500" />
            <span>Upcoming Appointments</span>
          </div>
        }
      >
        <Table
          columns={columns}
          dataSource={appointments}
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

export default UpcomingRequests;
