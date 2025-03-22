import { useState, useEffect } from "react";
import {
  Table,
  Card,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Tag,
  message,
  Drawer,
  Descriptions,
  Popconfirm,
  InputNumber,
  TimePicker,
  Row,
  Col,
  Tabs,
  DatePicker,
  Rate,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  CalendarOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import moment from "moment";

const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

const AdminForDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  const [appointments, setAppointments] = useState([]);
  const [reassignModalVisible, setReassignModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Fetch doctors on component mount
  useEffect(() => {
    fetchDoctors();
  }, []);

  // API placeholder functions
  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/doctor", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const doctorsData = await response.json();

      // Fetch appointments for each doctor
      const doctorsWithAppointments = await Promise.all(
        doctorsData.map(async (doctor) => {
          const appointmentsResponse = await fetch(
            `/api/appointments/doctorAppointments/${doctor._id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const appointmentsData = await appointmentsResponse.json();
          return {
            ...doctor,
            appointmentsCount: appointmentsData.length,
            appointments: appointmentsData,
          };
        })
      );

      setDoctors(doctorsWithAppointments);
    } catch (error) {
      message.error("Failed to fetch doctors");
    } finally {
      setLoading(false);
    }
  };

  // CRUD Operations
  const handleAddDoctor = async (values) => {
    try {
      // Format the data to match the user model structure
      const formattedData = {
        // Basic Information
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone,
        dateOfBirth: values.dateOfBirth.toISOString(),
        gender: values.gender,

        // Address
        address: {
          street: values.address?.street || "",
          city: values.address?.city || "",
          state: values.address?.state || "",
          zipCode: values.address?.zipCode || "",
          country: values.address?.country || "",
        },

        // Professional Details
        specialization: values.specialization,
        experience: values.experience,
        license: {
          number: values.license.number,
          expiryDate: values.license.expiryDate.toISOString(),
          verificationStatus: values.license.verificationStatus || "pending",
        },
        consultationFee: values.consultationFee,

        // Education
        education: values.education.map((edu) => ({
          degree: edu.degree,
          institution: edu.institution,
          year: edu.year,
        })),

        // Emergency Contact
        emergencyContact: {
          name: values.emergencyContact?.name || "",
          relationship: values.emergencyContact?.relationship || "",
          phone: values.emergencyContact?.phone || "",
        },

        // Status
        status: values.status || "active",

        // Optional fields
        profilePicture: values.profilePicture || "",
      };

      console.log("Sending doctor data:", formattedData);

      const response = await fetch("/api/auth/doctor/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add doctor");
      }

      message.success("Doctor added successfully");
      setModalVisible(false);
      form.resetFields();
      fetchDoctors();
    } catch (error) {
      console.error("Error adding doctor:", error);
      message.error(error.message || "Failed to add doctor");
    }
  };

  const handleUpdateDoctor = async (values) => {
    try {
      // Format the data to match the user model structure
      const formattedData = {
        // Basic Information
        name: values.name,
        email: values.email,
        phone: values.phone,
        dateOfBirth: values.dateOfBirth.toISOString(),
        gender: values.gender,

        // Address
        address: {
          street: values.address?.street || "",
          city: values.address?.city || "",
          state: values.address?.state || "",
          zipCode: values.address?.zipCode || "",
          country: values.address?.country || "",
        },

        // Professional Details
        specialization: values.specialization,
        experience: values.experience,
        license: {
          number: values.license.number,
          expiryDate: values.license.expiryDate.toISOString(),
          verificationStatus: values.license.verificationStatus || "pending",
        },
        consultationFee: values.consultationFee,

        // Education
        education: values.education.map((edu) => ({
          degree: edu.degree,
          institution: edu.institution,
          year: edu.year,
        })),

        // Emergency Contact
        emergencyContact: {
          name: values.emergencyContact?.name || "",
          relationship: values.emergencyContact?.relationship || "",
          phone: values.emergencyContact?.phone || "",
        },

        // Status
        status: values.status || "active",
      };

      // Get auth token
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/doctor/update/${selectedDoctor._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formattedData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update doctor");
      }

      message.success("Doctor updated successfully");
      setModalVisible(false);
      form.resetFields();
      fetchDoctors(); // Refresh the doctors list
    } catch (error) {
      console.error("Error updating doctor:", error);
      message.error(error.message || "Failed to update doctor");
    }
  };

  const handleDeleteDoctor = async (doctorId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/doctor/${doctorId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete doctor");

      message.success("Doctor deleted successfully");
      fetchDoctors();
    } catch (error) {
      message.error("Failed to delete doctor");
    }
  };

  const handleReassignAppointment = async (values) => {
    try {
      // Replace with actual API endpoint
      const response = await fetch(
        `/api/admin/appointments/${selectedAppointment.id}/reassign`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) throw new Error("Failed to reassign appointment");

      message.success("Appointment reassigned successfully");
      setReassignModalVisible(false);
      fetchDoctors();
    } catch (error) {
      message.error("Failed to reassign appointment");
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `/api/appointments/${appointmentId}/cancel`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to cancel appointment");

      message.success("Appointment cancelled successfully");
      fetchDoctors();
    } catch (error) {
      message.error("Failed to cancel appointment");
    }
  };

  // Table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      searchable: true,
    },
    {
      title: "Specialization",
      dataIndex: "specialization",
      filters: [
        { text: "Cardiologist", value: "Cardiologist" },
        { text: "Neurologist", value: "Neurologist" },
      ],
    },
    {
      title: "Experience",
      dataIndex: "experience",
      sorter: (a, b) => a.experience - b.experience,
      render: (years) => `${years} years`,
    },
    {
      title: "Appointments",
      dataIndex: "appointmentsCount",
      sorter: (a, b) => a.appointmentsCount - b.appointmentsCount,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedDoctor(record);
              setDrawerVisible(true);
            }}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedDoctor(record);
              // Convert dates to moment objects for the form
              const formValues = {
                ...record,
                dateOfBirth: record.dateOfBirth
                  ? moment(record.dateOfBirth)
                  : null,
                license: {
                  ...record.license,
                  expiryDate: record.license?.expiryDate
                    ? moment(record.license.expiryDate)
                    : null,
                },
              };
              form.setFieldsValue(formValues);
              setModalVisible(true);
            }}
          />
          <Popconfirm
            title="Are you sure you want to delete this doctor?"
            onConfirm={() => handleDeleteDoctor(record._id)}
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Search form
  const SearchForm = () => (
    <Form form={searchForm} layout="inline" className="mb-4">
      <Form.Item name="search">
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search by name, email, phone"
        />
      </Form.Item>
      <Form.Item name="specialization">
        <Select placeholder="Specialization" style={{ width: 200 }}>
          <Option value="Cardiologist">Cardiologist</Option>
          <Option value="Neurologist">Neurologist</Option>
          {/* Add more specializations */}
        </Select>
      </Form.Item>
      <Form.Item name="experience">
        <Select placeholder="Experience" style={{ width: 150 }}>
          <Option value="0-5">0-5 years</Option>
          <Option value="5-10">5-10 years</Option>
          <Option value="10+">10+ years</Option>
        </Select>
      </Form.Item>
      <Button
        type="primary"
        onClick={() => {
          /* Implement search logic */
        }}
      >
        Search
      </Button>
    </Form>
  );

  // Update the form's initial values
  const initialValues = {
    status: "active",
    license: { verificationStatus: "pending" },
    education: [{}],
    address: {},
    emergencyContact: {},
  };

  // Add form validation rules
  const formValidationRules = {
    required: { required: true, message: "This field is required" },
    email: { type: "email", message: "Please enter a valid email" },
    password: [
      { required: true, message: "Please enter password" },
      { min: 6, message: "Password must be at least 6 characters" },
    ],
  };

  return (
    <div className="p-6">
      <Card
        title="Manage Doctors"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setSelectedDoctor(null);
              form.resetFields();
              setModalVisible(true);
            }}
          >
            Add Doctor
          </Button>
        }
      >
        <SearchForm />
        <Table
          columns={columns}
          dataSource={doctors}
          loading={loading}
          rowKey="id"
        />
      </Card>

      {/* Add/Edit Doctor Modal */}
      <Modal
        title={selectedDoctor ? "Edit Doctor" : "Add Doctor"}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={selectedDoctor ? handleUpdateDoctor : handleAddDoctor}
          initialValues={initialValues}
          validateMessages={formValidationRules}
        >
          {/* Basic Information */}
          <Card title="Basic Information" className="mb-4">
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[
                    { required: true, message: "Please enter doctor name" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Please enter email" },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: "Please enter password" },
                    {
                      min: 6,
                      message: "Password must be at least 6 characters",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name="phone"
                  label="Phone"
                  rules={[
                    { required: true, message: "Please enter phone number" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="dateOfBirth"
                  label="Date of Birth"
                  rules={[
                    { required: true, message: "Please select date of birth" },
                  ]}
                >
                  <DatePicker className="w-full" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="gender"
                  label="Gender"
                  rules={[{ required: true, message: "Please select gender" }]}
                >
                  <Select>
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Card>

          {/* Address Information */}
          <Card title="Address Information" className="mb-4">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name={["address", "street"]} label="Street">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name={["address", "city"]} label="City">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item name={["address", "state"]} label="State">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name={["address", "zipCode"]} label="ZIP Code">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name={["address", "country"]} label="Country">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          {/* Professional Information */}
          <Card title="Professional Information" className="mb-4">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="specialization"
                  label="Specialization"
                  rules={[
                    { required: true, message: "Please select specialization" },
                  ]}
                >
                  <Select>
                    <Option value="Cardiology">Cardiology</Option>
                    <Option value="Neurology">Neurology</Option>
                    <Option value="Pediatrics">Pediatrics</Option>
                    <Option value="Orthopedics">Orthopedics</Option>
                    <Option value="Dermatology">Dermatology</Option>
                    <Option value="Psychiatry">Psychiatry</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="experience"
                  label="Experience (years)"
                  rules={[
                    {
                      required: true,
                      message: "Please enter years of experience",
                    },
                  ]}
                >
                  <InputNumber min={0} max={50} className="w-full" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name={["license", "number"]}
                  label="License Number"
                  rules={[
                    { required: true, message: "Please enter license number" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={["license", "expiryDate"]}
                  label="License Expiry Date"
                  rules={[
                    { required: true, message: "Please select expiry date" },
                  ]}
                >
                  <DatePicker className="w-full" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={["license", "verificationStatus"]}
                  label="Verification Status"
                >
                  <Select>
                    <Option value="pending">Pending</Option>
                    <Option value="verified">Verified</Option>
                    <Option value="rejected">Rejected</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="consultationFee"
              label="Consultation Fee"
              rules={[
                { required: true, message: "Please enter consultation fee" },
              ]}
            >
              <InputNumber
                min={0}
                className="w-full"
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>
          </Card>

          {/* Education Information */}
          <Card title="Education" className="mb-4">
            <Form.List name="education">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }, index) => (
                    <Card
                      key={key}
                      size="small"
                      title={`Education ${index + 1}`}
                      extra={
                        fields.length > 1 && (
                          <Button
                            type="link"
                            danger
                            onClick={() => remove(name)}
                          >
                            Remove
                          </Button>
                        )
                      }
                      className="mb-4"
                    >
                      <Row gutter={16}>
                        <Col span={8}>
                          <Form.Item
                            {...restField}
                            name={[name, "degree"]}
                            label="Degree"
                            rules={[
                              {
                                required: true,
                                message: "Please enter degree",
                              },
                            ]}
                          >
                            <Input placeholder="e.g., MBBS, MD" />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item
                            {...restField}
                            name={[name, "institution"]}
                            label="Institution"
                            rules={[
                              {
                                required: true,
                                message: "Please enter institution",
                              },
                            ]}
                          >
                            <Input placeholder="Institution name" />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item
                            {...restField}
                            name={[name, "year"]}
                            label="Year"
                            rules={[
                              { required: true, message: "Please enter year" },
                            ]}
                          >
                            <InputNumber
                              placeholder="Year of completion"
                              min={1950}
                              max={new Date().getFullYear()}
                              className="w-full"
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>
                  ))}
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Education
                  </Button>
                </>
              )}
            </Form.List>
          </Card>

          {/* Emergency Contact */}
          <Card title="Emergency Contact" className="mb-4">
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name={["emergencyContact", "name"]}
                  label="Contact Name"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={["emergencyContact", "relationship"]}
                  label="Relationship"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={["emergencyContact", "phone"]}
                  label="Contact Phone"
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          {/* Status */}
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
              <Option value="suspended">Suspended</Option>
            </Select>
          </Form.Item>

          <Form.Item className="mt-4">
            <Button type="primary" htmlType="submit" block>
              {selectedDoctor ? "Update Doctor" : "Add Doctor"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Doctor Details Drawer */}
      <Drawer
        title="Doctor Details"
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        width={600}
      >
        {selectedDoctor && (
          <Tabs defaultActiveKey="1">
            <TabPane tab="Profile" key="1">
              <Descriptions bordered column={1}>
                {/* Basic Information */}
                <Descriptions.Item label="Name">
                  {selectedDoctor.name}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {selectedDoctor.email}
                </Descriptions.Item>
                <Descriptions.Item label="Phone">
                  {selectedDoctor.phone}
                </Descriptions.Item>
                <Descriptions.Item label="Date of Birth">
                  {selectedDoctor.dateOfBirth
                    ? moment(selectedDoctor.dateOfBirth).format("MMMM DD, YYYY")
                    : "Not specified"}
                </Descriptions.Item>
                <Descriptions.Item label="Gender">
                  {selectedDoctor.gender}
                </Descriptions.Item>

                {/* Address */}
                <Descriptions.Item label="Address">
                  {selectedDoctor.address?.street},{" "}
                  {selectedDoctor.address?.city}
                  <br />
                  {selectedDoctor.address?.state},{" "}
                  {selectedDoctor.address?.zipCode}
                  <br />
                  {selectedDoctor.address?.country}
                </Descriptions.Item>

                {/* Professional Information */}
                <Descriptions.Item label="Specialization">
                  {selectedDoctor.specialization}
                </Descriptions.Item>
                <Descriptions.Item label="Experience">
                  {selectedDoctor.experience} years
                </Descriptions.Item>
                <Descriptions.Item label="License Number">
                  {selectedDoctor.license?.number}
                </Descriptions.Item>
                <Descriptions.Item label="License Expiry">
                  {selectedDoctor.license?.expiryDate
                    ? moment(selectedDoctor.license.expiryDate).format(
                        "MMMM DD, YYYY"
                      )
                    : "Not specified"}
                </Descriptions.Item>
                <Descriptions.Item label="License Status">
                  <Tag
                    color={
                      selectedDoctor.license?.verificationStatus === "verified"
                        ? "green"
                        : selectedDoctor.license?.verificationStatus ===
                          "rejected"
                        ? "red"
                        : "orange"
                    }
                  >
                    {selectedDoctor.license?.verificationStatus?.toUpperCase()}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Consultation Fee">
                  ${selectedDoctor.consultationFee}
                </Descriptions.Item>

                {/* Education */}
                <Descriptions.Item label="Education">
                  {selectedDoctor.education?.map((edu, index) => (
                    <div key={index} className="mb-2">
                      <strong>{edu.degree}</strong> - {edu.institution} (
                      {edu.year})
                    </div>
                  ))}
                </Descriptions.Item>

                {/* Emergency Contact */}
                <Descriptions.Item label="Emergency Contact">
                  {selectedDoctor.emergencyContact?.name} (
                  {selectedDoctor.emergencyContact?.relationship})<br />
                  Phone: {selectedDoctor.emergencyContact?.phone}
                </Descriptions.Item>

                {/* Rating */}
                <Descriptions.Item label="Rating">
                  <Rate disabled value={selectedDoctor.averageRating || 0} />
                  <span className="ml-2">
                    ({selectedDoctor.averageRating?.toFixed(1) || "No ratings"})
                  </span>
                </Descriptions.Item>

                {/* Status */}
                <Descriptions.Item label="Status">
                  <Tag
                    color={
                      selectedDoctor.status === "active"
                        ? "green"
                        : selectedDoctor.status === "suspended"
                        ? "red"
                        : "orange"
                    }
                  >
                    {selectedDoctor.status?.toUpperCase()}
                  </Tag>
                </Descriptions.Item>
              </Descriptions>
            </TabPane>
            <TabPane tab="Appointments" key="2">
              <Table
                columns={[
                  {
                    title: "Date",
                    dataIndex: "date",
                    render: (date) => moment(date).format("MMMM DD, YYYY"),
                    sorter: (a, b) =>
                      moment(a.date).unix() - moment(b.date).unix(),
                  },
                  {
                    title: "Time",
                    dataIndex: "time",
                    sorter: (a, b) => a.time.localeCompare(b.time),
                  },
                  {
                    title: "Patient",
                    dataIndex: "patientId",
                    render: (_, record) => record.patientName || "N/A",
                  },
                  {
                    title: "Type",
                    dataIndex: "type",
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
                    render: (status) => (
                      <Tag
                        color={
                          status === "scheduled"
                            ? "blue"
                            : status === "completed"
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
                    title: "Payment",
                    dataIndex: "paymentStatus",
                    render: (paymentStatus) => (
                      <Tag
                        color={
                          paymentStatus === "completed"
                            ? "green"
                            : paymentStatus === "pending"
                            ? "orange"
                            : "red"
                        }
                      >
                        {paymentStatus.toUpperCase()}
                      </Tag>
                    ),
                  },
                  {
                    title: "Actions",
                    key: "actions",
                    render: (_, record) => (
                      <Space>
                        <Button
                          type="link"
                          onClick={() => {
                            setSelectedAppointment(record);
                            setReassignModalVisible(true);
                          }}
                        >
                          Reassign
                        </Button>
                        <Popconfirm
                          title="Are you sure you want to cancel this appointment?"
                          onConfirm={() => handleCancelAppointment(record._id)}
                        >
                          <Button type="link" danger>
                            Cancel
                          </Button>
                        </Popconfirm>
                      </Space>
                    ),
                  },
                ]}
                dataSource={selectedDoctor?.appointments || []}
                rowKey="_id"
                pagination={{
                  pageSize: 5,
                  showSizeChanger: true,
                  showTotal: (total) => `Total ${total} appointments`,
                }}
              />
            </TabPane>
          </Tabs>
        )}
      </Drawer>

      {/* Reassign Appointment Modal */}
      <Modal
        title="Reassign Appointment"
        visible={reassignModalVisible}
        onCancel={() => setReassignModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleReassignAppointment}>
          {/* Add reassignment form fields */}
        </Form>
      </Modal>
    </div>
  );
};

export default AdminForDoctor;
