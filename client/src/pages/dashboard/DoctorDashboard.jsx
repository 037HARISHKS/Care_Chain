import { useState, useEffect } from 'react';
import { Card, Button, Badge, Avatar } from 'flowbite-react';
import { motion } from 'framer-motion';

const DoctorDashboard = () => {
  const [stats, setStats] = useState({
    todayAppointments: 0,
    totalPatients: 0,
    pendingRequests: 0,
    totalEarnings: 0
  });

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch doctor dashboard data
    setStats({
      todayAppointments: 8,
      totalPatients: 150,
      pendingRequests: 5,
      totalEarnings: 15000
    });

    setAppointments([
      {
        id: 1,
        patient: "John Smith",
        time: "09:00 AM",
        type: "Regular Checkup",
        status: "pending"
      },
      {
        id: 2,
        patient: "Sarah Johnson",
        time: "10:30 AM",
        type: "Follow-up",
        status: "confirmed"
      }
    ]);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Doctor Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(stats).map(([key, value], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="text-3xl font-bold text-blue-600">
                  {key === 'totalEarnings' ? `$${value}` : value}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Today's Appointments
          </h2>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <Card key={appointment.id}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <Avatar rounded />
                    <div>
                      <p className="font-semibold">{appointment.patient}</p>
                      <p className="text-sm text-gray-600">{appointment.time} - {appointment.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge color={appointment.status === 'confirmed' ? 'success' : 'warning'}>
                      {appointment.status}
                    </Badge>
                    <Button size="sm">View Details</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Quick Actions
          </h2>
          <Card>
            <div className="space-y-4">
              <Button className="w-full">Update Availability</Button>
              <Button className="w-full">View Patient Records</Button>
              <Button className="w-full">Check Messages</Button>
              <Button className="w-full" color="success">Start Consultation</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard; 