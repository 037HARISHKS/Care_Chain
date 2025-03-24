import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Form,
  Input,
  DatePicker,
  TimePicker,
  Select,
  InputNumber,
  Switch,
  Upload,
  Button,
  message,
} from "antd";
import {
  UploadOutlined,
  ClockCircleOutlined,
  UserOutlined,
  MedicineBoxOutlined,
} from "@ant-design/icons";
import moment from "moment";

const { TextArea } = Input;
const { Option } = Select;

const AppointmentForm = () => {
  const currentUser = useSelector((state) => state.auth);
  console.log("currentUser", currentUser);
  console.log(currentUser.user.id);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]); // This would be populated from an API

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      // Replace with actual API endpoint
      const response = await fetch("/api/doctor");
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      message.error("Failed to fetch doctors list");
    }
  };

  const onFinish = async (values) => {
    console.log("values", values);
    setLoading(true);
    try {
      // Handle file uploads
      const formData = new FormData();

      // Add all form fields to FormData
      Object.keys(values).forEach((key) => {
        if (key === "attachments" && values[key]) {
          // Handle file attachments
          values[key].forEach((file, index) => {
            if (file.originFileObj) {
              formData.append(`attachments`, file.originFileObj);
            }
          });
        } else if (key === "date" || key === "time") {
          // Format date and time
          formData.append(
            key,
            values[key].format(key === "date" ? "YYYY-MM-DD" : "HH:mm")
          );
        } else if (key === "symptoms") {
          // Handle symptoms array
          formData.append(key, JSON.stringify(values[key]));
        } else {
          // Handle other fields
          formData.append(key, values[key]);
        }
      });

      // Add user ID and status
      formData.append("patientId", currentUser.user.id);
      formData.append("paymentStatus", "pending");
      formData.append("status", "scheduled");

      // Get auth token
      const token = localStorage.getItem("token");
      console.log(formData);
      // Updated API endpoint
      const response = await fetch("/api/appointments/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type header, let browser set it with boundary
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create appointment");
      }

      message.success("Appointment scheduled successfully!");
      form.resetFields();
    } catch (error) {
      console.error("Appointment creation error:", error);
      message.error(error.message || "Failed to schedule appointment");
    } finally {
      setLoading(false);
    }
  };

  // Add file validation
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    const isPDF = file.type === "application/pdf";
    const isLt5M = file.size / 1024 / 1024 < 5;

    if (!isImage && !isPDF) {
      message.error("You can only upload image or PDF files!");
      return false;
    }
    if (!isLt5M) {
      message.error("File must be smaller than 5MB!");
      return false;
    }
    return false; // Return false to prevent auto upload
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Schedule an Appointment</h1>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          duration: 30,
          followUpNeeded: false,
          symptoms: [""],
          paymentAmount: 100,
        }}
      >
        {/* Doctor Selection */}
        <Form.Item
          name="doctorId"
          label="Select Doctor"
          rules={[{ required: true, message: "Please select a doctor" }]}
        >
          <Select
            placeholder="Choose your doctor"
            loading={!doctors.length}
            showSearch
            optionFilterProp="children"
          >
            {doctors.map((doctor) => (
              <Option key={doctor._id} value={doctor._id}>
                Dr. {doctor.name} - {doctor.specialization}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Date and Time Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            name="date"
            label="Appointment Date"
            rules={[{ required: true, message: "Please select a date" }]}
          >
            <DatePicker
              className="w-full"
              disabledDate={(current) =>
                current && current < moment().startOf("day")
              }
            />
          </Form.Item>

          <Form.Item
            name="time"
            label="Appointment Time"
            rules={[{ required: true, message: "Please select a time" }]}
          >
            <TimePicker className="w-full" format="HH:mm" minuteStep={15} />
          </Form.Item>
        </div>

        {/* Appointment Type */}
        <Form.Item
          name="type"
          label="Appointment Type"
          rules={[
            { required: true, message: "Please select appointment type" },
          ]}
        >
          <Select placeholder="Select appointment type">
            <Option value="consultation">Consultation</Option>
            <Option value="follow-up">Follow-up</Option>
            <Option value="emergency">Emergency</Option>
            <Option value="routine-checkup">Routine Checkup</Option>
          </Select>
        </Form.Item>

        {/* Problem Description */}
        <Form.Item
          name="problem"
          label="Describe Your Problem"
          rules={[{ required: true, message: "Please describe your problem" }]}
        >
          <TextArea
            rows={4}
            placeholder="Describe your medical concern in detail"
          />
        </Form.Item>

        {/* Symptoms */}
        <Form.List name="symptoms">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  label={index === 0 ? "Symptoms" : ""}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please input symptom or delete this field.",
                      },
                    ]}
                    noStyle
                  >
                    <Input
                      placeholder="Enter symptom"
                      style={{ width: "90%" }}
                    />
                  </Form.Item>
                  {fields.length > 1 && (
                    <Button
                      type="link"
                      className="ml-2"
                      onClick={() => remove(field.name)}
                    >
                      Delete
                    </Button>
                  )}
                </Form.Item>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block>
                  Add Symptom
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        {/* Duration */}
        <Form.Item
          name="duration"
          label="Duration (minutes)"
          rules={[{ required: true, message: "Please specify duration" }]}
        >
          <InputNumber min={15} max={120} step={15} className="w-full" />
        </Form.Item>

        {/* Attachments */}
        <Form.Item
          name="attachments"
          label="Upload Medical Documents"
          valuePropName="fileList"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) return e;
            return e?.fileList;
          }}
        >
          <Upload
            beforeUpload={beforeUpload}
            multiple
            maxCount={5}
            accept=".jpg,.jpeg,.png,.pdf"
          >
            <Button icon={<UploadOutlined />}>Upload Files</Button>
            <div className="text-gray-500 text-sm mt-1">
              Supported formats: JPG, PNG, PDF (max 5MB)
            </div>
          </Upload>
        </Form.Item>

        {/* Follow-up */}
        <Form.Item
          name="followUpNeeded"
          label="Follow-up Required"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        {/* Payment Amount */}
        <Form.Item
          name="paymentAmount"
          label="Consultation Fee"
          rules={[{ required: true, message: "Please enter consultation fee" }]}
        >
          <InputNumber prefix="$" className="w-full" min={0} disabled />
        </Form.Item>

        {/* Notes */}
        <Form.Item name="notes" label="Additional Notes">
          <TextArea
            rows={4}
            placeholder="Any additional information you want to provide"
          />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 h-12 text-lg"
          >
            Schedule Appointment
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AppointmentForm;
