import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, message, Space } from "antd";
import { useSelector } from "react-redux";

const { TextArea } = Input;

const ReportForm = ({ appointmentId, onClose }) => {
  const [patient, setPatient] = useState(null);
  const data = async () => {
    const response = await fetch(`/api/patient/application/${appointmentId}`);
    const data = await response.json();
    console.log("Data", data);
    setPatient(data);
    form.setFieldsValue({
      patientId: data?.patientId?._id,
      patientName: data?.patientId?.name,
    });
  };
  useEffect(() => {
    data();
  }, []);

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const currentUser = useSelector((state) => state.auth.user);

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const reportData = {
        appointmentId: appointmentId,
        patientId: patient.patientId?._id,
        patientName: patient.patientId?.name,
        age: values.age,
        prescriptions: values.prescriptions,
        suggestions: values.suggestions,

      };
      if (!values.suggestScan && !values.suggestLabTest) {
      const reportResponse = await fetch("/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reportData),
      });

      if (!reportResponse.ok) {
        throw new Error("Failed to submit report");
      }}

      if (values.suggestScan || values.suggestLabTest) {
        const technicianRequests = [];

        if (values.suggestScan) {
          technicianRequests.push({
            appointment_id: appointmentId,
            doctor_id: currentUser._id,
            doctor_name: currentUser.name,
            patient_id: patient.patientId?._id,
            patient_name: patient.patientId?.name,
            age: values.age,
            request_type: "Scan",
            scan_type: values.scanType,
            observations: values.scanObservations,
          });
        }

        if (values.suggestLabTest) {
          technicianRequests.push({
            appointment_id: appointmentId,
            doctor_id: currentUser._id,
            doctor_name: currentUser.name,
            patient_id: patient.patientId?._id,
            patient_name: patient.patientId?.name,
            age : values.age,
            request_type: "Lab Test",
            test_type: values.labTestType,
            observations: values.labTestObservations,
          });
        }

        const technicianResponse = await fetch("/api/technician/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            appointmentId: appointmentId,
            patientId: patient.patientId?._id,
            patientName: patient.patientId?.name,
            technicianRequests: technicianRequests,
          }),
        });

        if (!technicianResponse.ok) {
          throw new Error("Failed to create technician requests");
        }
      }

      message.success("Report submitted successfully");
      form.resetFields();
      onClose();
    } catch (error) {
      message.error(error.message || "Failed to submit report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item
        name="patientName"
        label="Patient Name"
        value={patient?.patientId?.name}
      >
        <Input placeholder="Enter patient name" disabled />
      </Form.Item>

      <Form.Item
        name="age"
        label="age"
      >
        <Input placeholder="Enter patient age" type="number" />
      </Form.Item>

      <Form.Item
        name="prescriptions"
        label="Prescriptions"
        rules={[{ required: true, message: "Please enter prescriptions" }]}
      >
        <TextArea rows={4} placeholder="Enter prescriptions here" />
      </Form.Item>

      <Form.Item
        name="suggestions"
        label="Suggestions"
        rules={[{ required: true, message: "Please enter suggestions" }]}
      >
        <TextArea rows={4} placeholder="Enter suggestions here" />
      </Form.Item>

      <Form.Item name="suggestScan" valuePropName="checked">
        <Checkbox>Suggest Scan</Checkbox>
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.suggestScan !== currentValues.suggestScan
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("suggestScan") ? (
            <Space
              direction="vertical"
              style={{ width: "100%", marginBottom: "16px" }}
            >
              <Form.Item
                name="scanType"
                label="Scan Type"
                rules={[{ required: true, message: "Please select scan type" }]}
              >
                <Input placeholder="Enter scan type (e.g., MRI, CT Scan, X-Ray)" />
              </Form.Item>
              <Form.Item
                name="scanObservations"
                label="Scan Observations"
                rules={[
                  { required: true, message: "Please enter scan observations" },
                ]}
              >
                <TextArea rows={3} placeholder="Enter scan observations" />
              </Form.Item>
            </Space>
          ) : null
        }
      </Form.Item>

      <Form.Item name="suggestLabTest" valuePropName="checked">
        <Checkbox>Suggest Lab Test</Checkbox>
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.suggestLabTest !== currentValues.suggestLabTest
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("suggestLabTest") ? (
            <Space
              direction="vertical"
              style={{ width: "100%", marginBottom: "16px" }}
            >
              <Form.Item
                name="labTestType"
                label="Lab Test Type"
                rules={[
                  { required: true, message: "Please select lab test type" },
                ]}
              >
                <Input placeholder="Enter lab test type (e.g., Blood Test, Urine Test)" />
              </Form.Item>
                         </Space>
          ) : null
        }
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit Report
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ReportForm;
