import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, Button, Table, Badge } from 'flowbite-react';
import { motion } from 'framer-motion';

const Appointments = () => {
  const { user } = useSelector((state) => state.auth);
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch appointments based on user role
    // This is where you'd make API calls
    setAppointments([
      {
        id: 1,
        patient: "John Smith",
        doctor: "Dr. Jane Doe",
        date: "2024-02-20",
        time: "10:00 AM",
        type: "Regular Checkup",
        status: "confirmed"
      },
      // Add more appointments...
    ]);
    setIsLoading(false);
  }, [user]);

  const handleStatusChange = (id, newStatus) => {
    // Update appointment status
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Appointments
        </h1>
        {user?.role === 'patient' && (
          <Button>Book New Appointment</Button>
        )}
      </div>

      <Card>
        <Table>
          <Table.Head>
            <Table.HeadCell>Patient</Table.HeadCell>
            <Table.HeadCell>Doctor</Table.HeadCell>
            <Table.HeadCell>Date & Time</Table.HeadCell>
            <Table.HeadCell>Type</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {appointments.map((appointment) => (
              <Table.Row key={appointment.id}>
                <Table.Cell>{appointment.patient}</Table.Cell>
                <Table.Cell>{appointment.doctor}</Table.Cell>
                <Table.Cell>
                  {appointment.date} at {appointment.time}
                </Table.Cell>
                <Table.Cell>{appointment.type}</Table.Cell>
                <Table.Cell>
                  <Badge
                    color={
                      appointment.status === 'confirmed'
                        ? 'success'
                        : appointment.status === 'pending'
                        ? 'warning'
                        : 'failure'
                    }
                  >
                    {appointment.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex gap-2">
                    <Button size="xs">View</Button>
                    {user?.role === 'doctor' && (
                      <>
                        <Button
                          size="xs"
                          color="success"
                          onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                        >
                          Accept
                        </Button>
                        <Button
                          size="xs"
                          color="failure"
                          onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
    </div>
  );
};

export default Appointments; 