import { useState } from 'react';
import { Card, Button, Avatar, TextInput, Label, Select, Textarea } from 'flowbite-react';
import { motion } from 'framer-motion';

const DoctorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: 'Dr. Jane Smith',
    email: 'dr.jane@example.com',
    specialization: 'Cardiologist',
    experience: '15',
    education: 'MD - Cardiology, MBBS',
    clinicAddress: '456 Medical Center, City, Country',
    consultationFee: '150',
    phone: '+1234567890',
    availability: {
      monday: { start: '09:00', end: '17:00' },
      tuesday: { start: '09:00', end: '17:00' },
      wednesday: { start: '09:00', end: '17:00' },
      thursday: { start: '09:00', end: '17:00' },
      friday: { start: '09:00', end: '17:00' }
    },
    bio: 'Experienced cardiologist with 15 years of practice...',
    profilePicture: null,
    license: 'LIC-12345'
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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Doctor Profile</h2>
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
                <Label htmlFor="specialization">Specialization</Label>
                <TextInput
                  id="specialization"
                  name="specialization"
                  value={profile.specialization}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="experience">Years of Experience</Label>
                <TextInput
                  id="experience"
                  name="experience"
                  type="number"
                  value={profile.experience}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Professional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="education">Education</Label>
                <TextInput
                  id="education"
                  name="education"
                  value={profile.education}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="license">Medical License</Label>
                <TextInput
                  id="license"
                  name="license"
                  value={profile.license}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="consultationFee">Consultation Fee ($)</Label>
                <TextInput
                  id="consultationFee"
                  name="consultationFee"
                  type="number"
                  value={profile.consultationFee}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
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
            </div>

            {/* Bio */}
            <div>
              <Label htmlFor="bio">Professional Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                disabled={!isEditing}
                rows={4}
              />
            </div>

            {/* Clinic Address */}
            <div>
              <Label htmlFor="clinicAddress">Clinic Address</Label>
              <TextInput
                id="clinicAddress"
                name="clinicAddress"
                value={profile.clinicAddress}
                onChange={handleChange}
                disabled={!isEditing}
              />
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

export default DoctorProfile; 