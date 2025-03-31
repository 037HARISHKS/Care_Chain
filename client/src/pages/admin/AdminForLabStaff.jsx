import { useState } from "react";
import { Button, TextInput, Label, Alert } from "flowbite-react";
import { toast } from 'react-toastify';

const AdminForLabStaff = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    // Add other fields as necessary
  });
  const [error, setError] = useState("");

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
      const response = await fetch('/api/auth/lab-staff/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      toast.success("Lab Staff registered successfully!");
      // Reset form or redirect as necessary
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div>
      <h2>Register Lab Staff</h2>
      {error && <Alert color="failure">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <Label htmlFor="name">Name</Label>
        <TextInput id="name" name="name" onChange={handleChange} required />
        
        <Label htmlFor="email">Email</Label>
        <TextInput id="email" name="email" type="email" onChange={handleChange} required />
        
        <Label htmlFor="password">Password</Label>
        <TextInput id="password" name="password" type="password" onChange={handleChange} required />
        
        <Label htmlFor="phone">Phone</Label>
        <TextInput id="phone" name="phone" onChange={handleChange} required />
        
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default AdminForLabStaff; 