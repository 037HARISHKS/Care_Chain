import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { useSelector } from 'react-redux';

const { TextArea } = Input;

const ReportForm = ({ appointmentId, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const currentUser = useSelector((state) => state.auth.user);

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      const formData = {
        name: values.name,
        patientId: values.patientId,
        age: values.age,
        medicineSuggested: values.medicineSuggested,
        remarks: values.remarks,
        generateReport: values.generateReport,
        appointmentId: appointmentId,
      };

      const token = localStorage.getItem('token');
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit report');
      }

      message.success('Report submitted successfully');
      form.resetFields();
      onClose(); // Close the form or modal
    } catch (error) {
      message.error(error.message || 'Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item
        name="name"
        label="Patient Name"
        rules={[{ required: true, message: 'Please enter the patient name' }]}
      >
        <Input placeholder="Enter patient name" />
      </Form.Item>

      <Form.Item
        name="patientId"
        label="Patient ID"
        rules={[{ required: true, message: 'Please enter the patient ID' }]}
      >
        <Input placeholder="Enter patient ID" />
      </Form.Item>

      <Form.Item
        name="age"
        label="Age"
        rules={[{ required: true, message: 'Please enter the age' }]}
      >
        <Input placeholder="Enter age" type="number" />
      </Form.Item>

      <Form.Item
        name="medicineSuggested"
        label="Medicine Suggested"
        rules={[{ required: true, message: 'Please enter the medicine suggested' }]}
      >
        <Input placeholder="Enter medicine suggested" />
      </Form.Item>

      <Form.Item
        name="remarks"
        label="Remarks"
        rules={[{ required: true, message: 'Please enter your remarks' }]}
      >
        <TextArea rows={4} placeholder="Enter your remarks here" />
      </Form.Item>

      <Form.Item
        name="generateReport"
        valuePropName="checked"
      >
        <Checkbox>Generate Report</Checkbox>
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