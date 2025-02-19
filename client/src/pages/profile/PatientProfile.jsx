import { useState, useEffect } from 'react';
import { Card, Button, Avatar, TextInput, Label, Select } from 'flowbite-react';
import { motion } from 'framer-motion';

const PatientProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: 'John Smith',
    email: 'john@example.com',
    dateOfBirth: '1990-01-01',
    gender: 'male',
    phone: '+1234567890',
    address: '123 Main St, City, Country',
    emergencyContact: 'Jane Smith (+1987654321)',
    bloodGroup: 'O+',
    allergies: 'None',
    medicalHistory: 'No major conditions',
    insuranceDetails: 'Insurance XYZ - Policy #12345',
    profilePicture: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update profile API call here
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Information</h2>
            <Button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center space-x-4">
              <Avatar size="xl" rounded />
              {isEditing && (
                <Button size="sm">
                  Change Photo
                </Button>
              )}
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <TextInput
                  id="fullName"
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <TextInput
                  id="email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <TextInput
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={profile.dateOfBirth}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select
                  id="gender"
                  name="gender"
                  value={profile.gender}
                  onChange={handleChange}
                  disabled={!isEditing}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <TextInput
                  id="phone"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <TextInput
                  id="emergencyContact"
                  name="emergencyContact"
                  value={profile.emergencyContact}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Medical Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <Select
                  id="bloodGroup"
                  name="bloodGroup"
                  value={profile.bloodGroup}
                  onChange={handleChange}
                  disabled={!isEditing}
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="allergies">Allergies</Label>
                <TextInput
                  id="allergies"
                  name="allergies"
                  value={profile.allergies}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end space-x-4">
                <Button type="submit" color="success">
                  Save Changes
                </Button>
              </div>
            )}
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default PatientProfile; 