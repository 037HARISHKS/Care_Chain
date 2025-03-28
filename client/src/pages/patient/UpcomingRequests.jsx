import { useState, useEffect } from "react";
import { Card, Table, Tag, Avatar, Button, message, Modal } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import ReportForm from '../dashboard/ReportForm';

const UpcomingRequests = () => {
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const currentUser = useSelector((state) => state.auth.user);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  useEffect(() => {
    fetchUpcomingAppointments();
  }, []);

  const fetchUpcomingAppointments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const endpoint =
        currentUser.role === "doctor"
          ? `/api/appointments/doctor/upcoming/${currentUser.id}`
          : `/api/appointments/patient/upcoming/${currentUser.id}`;

      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(`data of ${currentUser.role}`, data);
      setAppointments(data);
    } catch (error) {
      message.error("Failed to fetch upcoming appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinMeeting = (id) => {
    // Implement join meeting functionality
    console.log("Joining meeting for appointment:", id);
  };

  const handleCancelAppointment = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/appointments/${id}/cancel`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to cancel appointment");

      message.success("Appointment cancelled successfully");
      fetchUpcomingAppointments();
    } catch (error) {
      message.error("Failed to cancel appointment: " + error.message);
    }
  };

  const handleAcceptAppointment = async (id) => {
    try {
      const response = await fetch(`/api/appointments/approve/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to accept appointment");

      message.success("Appointment accepted successfully");
      setSelectedAppointmentId(id);
      setIsModalVisible(true);
    } catch (error) {
      message.error("Failed to accept appointment: " + error.message);
    }
  };

  const handleRejectAppointment = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/appointments/reject/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to reject appointment");

      message.success("Appointment rejected successfully");
      fetchUpcomingAppointments();
    } catch (error) {
      message.error("Failed to reject appointment: " + error.message);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedAppointmentId(null);
  };

  // Patient view columns
  const patientColumns = [
    {
      title: "Doctor",
      dataIndex: "doctorId",
      key: "doctor",
      render: (doctor) => {
        console.log(doctor);
        return (
          <div className="flex items-center">
            <Avatar icon={<UserOutlined />} className="mr-2" />
            {doctor?.name}
          </div>
        );
      },
    },
    {
      title: "Problem",
      dataIndex: "problem",
      key: "problem",
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
              onClick={() => handleJoinMeeting(record._id)}
            >
              Join
            </Button>
          )}
          <Button
            danger
            size="small"
            onClick={() => handleCancelAppointment(record._id)}
          >
            Cancel
          </Button>
        </div>
      ),
    },
  ];

  // Doctor view columns
  const doctorColumns = [
    {
      title: "Patient",
      dataIndex: "patientId",
      key: "patient",
      render: (patient) => (
        console.log(patient.name),
        <div className="flex items-center">
          <Avatar icon={<UserOutlined />} className="mr-2" />
          {patient?.name || "Anonymous"}
        </div>
      ),
    },
    {
      title: "Problem",
      dataIndex: "problem",
      key: "problem",
    },
    {
      title: "Symptoms",
      dataIndex: "symptoms",
      key: "symptoms",
      render: (symptoms) => (
        <div>
          {symptoms?.map((symptom, index) => (
            <Tag key={index} color="blue" className="mb-1">
              {Array.isArray(symptom)
                ? symptom.map((s, i) => <span key={i}>{s}</span>)
                : symptom}
            </Tag>
          ))}
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
        <Tag
          color={
            status === "scheduled"
              ? "blue"
              : status === "confirmed"
              ? "green"
              : status === "cancelled"
              ? "red"
              : "orange"
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
        <div className="space-x-2">
          {record.status === "scheduled" && (
            <>
              <Button
                type="primary"
                size="small"
                onClick={() => handleAcceptAppointment(record._id)}
              >
                Accept
              </Button>
              <Button
                danger
                size="small"
                onClick={() => handleRejectAppointment(record._id)}
              >
                Reject
              </Button>
            </>
          )}
          {record.status === "confirmed" && (
            <Button
              type="primary"
              size="small"
              icon={<MessageOutlined />}
              onClick={() => handleJoinMeeting(record._id)}
            >
              Join
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card
        title={
          <div className="flex items-center">
            <CalendarOutlined className="mr-2 text-blue-500" />
            <span>
              {currentUser.role === "doctor"
                ? "Upcoming Patient Appointments"
                : "Upcoming Appointments"}
            </span>
          </div>
        }
      >
        <Table
          columns={
            currentUser.role === "doctor" ? doctorColumns : patientColumns
          }
          dataSource={appointments}
          loading={loading}
          rowKey="_id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} appointments`,
          }}
        />
      </Card>

      <Modal
        title="Add Report"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <ReportForm appointmentId={selectedAppointmentId} onClose={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default UpcomingRequests;
