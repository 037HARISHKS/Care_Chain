import { useState, useEffect } from 'react';
import { Card, Button } from 'flowbite-react';
import { motion } from 'framer-motion';

const PatientDashboard = () => {
  const [stats, setStats] = useState({
    upcomingAppointments: 0,
    completedAppointments: 0,
    prescriptions: 0,
    messages: 0
  });

  const [recentAppointments, setRecentAppointments] = useState([]);

  useEffect(() => {
    // Fetch patient dashboard data
    // This is where you'd make API calls to get the actual data
    setStats({
      upcomingAppointments: 2,
      completedAppointments: 5,
      prescriptions: 3,
      messages: 1
    });

    setRecentAppointments([
      {
        id: 1,
        doctor: "Dr. John Doe",
        date: "2024-02-20",
        time: "10:00 AM",
        status: "upcoming"
      },
      // Add more appointments...
    ]);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Patient Dashboard
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
                <p className="text-3xl font-bold text-blue-600">{value}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Upcoming Appointments */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Upcoming Appointments
        </h2>
        <div className="grid gap-4">
          {recentAppointments.map((appointment) => (
            <Card key={appointment.id}>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{appointment.doctor}</p>
                  <p className="text-sm text-gray-600">
                    {appointment.date} at {appointment.time}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm">Reschedule</Button>
                  <Button size="sm" color="failure">Cancel</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button>Book New Appointment</Button>
          <Button>View Medical History</Button>
          <Button>Message Doctor</Button>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard; 