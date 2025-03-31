import React, { useState } from 'react';
import { Form, Input, Upload, Button, Select, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const TestReportForm = ({ onClose, onSubmit }) => {
  const [fileList, setFileList] = useState([]);

  const handleFinish = async (values) => {
    try {
      // Extract the file path from the uploaded file
      const scanImage = fileList.length > 0 ? fileList[0].thumbUrl : '';

      // Include appointmentId in the values
      const appointmentId = values.appointmentId; // Ensure this is passed correctly
      const reportData = { ...values, scanImage, appointmentId };

      const response = await fetch('/api/scan-reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      });

      if (!response.ok) {
        throw new Error('Failed to create scan report');
      }

      message.success('Scan report created successfully');
      onSubmit(); // Call the onSubmit prop to refresh data or close modal
      onClose(); // Close the form
    } catch (error) {
      message.error(error.message || 'Failed to create scan report');
    }
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <Form layout="vertical" onFinish={handleFinish}>
      <Form.Item
        name="appointmentId"
        label="Appointment ID"
        rules={[{ required: true, message: 'Please enter appointment ID' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="reportType"
        label="Report Type"
        rules={[{ required: true, message: 'Please select report type' }]}
      >
        <Select>
          <Option value="Preliminary">Preliminary Report</Option>
          <Option value="Final">Final Report</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="findings"
        label="Findings"
        rules={[{ required: true, message: 'Please enter findings' }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="impression"
        label="Impression"
        rules={[{ required: true, message: 'Please enter impression' }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="scanImage"
        label="Scan Image"
        rules={[{ required: true, message: 'Please upload scan image' }]}
      >
        <Upload
          listType="picture"
          maxCount={1}
          beforeUpload={() => false}
          onChange={handleUploadChange}
        >
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Create Report
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TestReportForm; 