import { useState, useEffect } from "react";
import { Card, Table, Tag, Avatar, Button, message, Modal } from "antd";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";
import { FaFileMedical } from "react-icons/fa";
import { useSelector } from "react-redux";

const AppointmentHistory = () => {
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState([]);
  const [reportDetails, setReportDetails] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetchApplicationHistory();
  }, []);

  const fetchApplicationHistory = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const endpoint =
        currentUser.role === "doctor"
          ? `/api/appointments/doctor/history/${currentUser.id}`
          : `/api/appointments/patient/history/${currentUser.id}`;

      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      message.error("Failed to fetch appointment history");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (appointmentId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/reports?appointmentId=${appointmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch report details');
      }

      const report = await response.json();
      setReportDetails(report);
      setIsModalVisible(true);
    } catch (error) {
      message.error(error.message || 'Failed to fetch report details');
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setReportDetails(null);
  };

  // Patient view columns
  const patientColumns = [
    {
      title: "Doctor",
      dataIndex: "doctorId",
      key: "doctor",
      render: (doctor) => (
        <div className="flex items-center">
          <Avatar icon={<UserOutlined />} className="mr-2" />
          {doctor?.name}
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
          {new Date(text).toLocaleDateString()}
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
          onClick={() => handleViewDetails(record.appointmentId)}
        >
          View Details
        </Button>
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
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => (
        <span>
          <CalendarOutlined className="mr-2" />
          {new Date(text).toLocaleDateString()}
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
          onClick={() => handleViewDetails(record.appointmentId)}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card
        title={
          <div className="flex items-center">
            <FaFileMedical className="mr-2 text-purple-500" />
            <span>
              {currentUser.role === "doctor"
                ? "Patient History"
                : "Appointment History"}
            </span>
          </div>
        }
      >
        <Table
          columns={
            currentUser.role === "doctor" ? doctorColumns : patientColumns
          }
          dataSource={applications}
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
        title="Report Details"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        {reportDetails && (
          <div>
            <p><strong>Patient Name:</strong> {reportDetails.name}</p>
            <p><strong>Patient ID:</strong> {reportDetails.patientId}</p>
            <p><strong>Age:</strong> {reportDetails.age}</p>
            <p><strong>Medicine Suggested:</strong> {reportDetails.medicineSuggested}</p>
            <p><strong>Remarks:</strong> {reportDetails.remarks}</p>
            <p><strong>Generate Report:</strong> {reportDetails.generateReport ? 'Yes' : 'No'}</p>
            <p><strong>Created At:</strong> {new Date(reportDetails.createdAt).toLocaleString()}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AppointmentHistory;
