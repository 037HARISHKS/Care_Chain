import { useState } from "react";
import { Button, TextInput, Label, Alert } from "flowbite-react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const AdminLoginForScanStaff = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch('/api/auth/scan-staff/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      // Handle successful login (e.g., store token, redirect)
      toast.success("Scan Staff logged in successfully!");
      navigate(`/dashboard/scan-staff`); // Redirect to the appropriate dashboard
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login Scan Staff</h2>
      {error && <Alert color="failure">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <Label htmlFor="email">Email</Label>
        <TextInput id="email" name="email" type="email" onChange={handleChange} required />
        
        <Label htmlFor="password">Password</Label>
        <TextInput id="password" name="password" type="password" onChange={handleChange} required />
        
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default AdminLoginForScanStaff; 