import { useState, useEffect } from 'react';
import { Card, Button, Table, Badge } from 'flowbite-react';
import { motion } from 'framer-motion';
//import { HiOutlineUsers, HiOutlineCalendar, HiOutlineUserMd, HiOutlineCash } from 'react-icons/hi';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    totalRevenue: 0
  });

  const [recentUsers, setRecentUsers] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);

  useEffect(() => {
    // Fetch admin dashboard data
    setStats({
      totalUsers: 500,
      totalDoctors: 50,
      totalAppointments: 1200,
      totalRevenue: 50000
    });

    setRecentUsers([
      {
        id: 1,
        name: "Dr. Jane Smith",
        email: "jane@example.com",
        role: "doctor",
        status: "active",
        joinDate: "2024-02-15"
      }
      // Add more users...
    ]);

    setPendingApprovals([
      {
        id: 1,
        name: "Dr. Mike Johnson",
        specialization: "Cardiologist",
        status: "pending"
      }
      // Add more pending approvals...
    ]);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Admin Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <div className="flex items-center">
              {/* <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                <HiOutlineUsers className="h-6 w-6 text-blue-600 dark:text-blue-300" />
              </div> */}
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalUsers}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <div className="flex items-center">
              {/* <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                <HiOutlineUserMd className="h-6 w-6 text-green-600 dark:text-green-300" />
              </div> */}
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Doctors</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalDoctors}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Add similar cards for appointments and revenue */}
      </div>

      {/* Recent Users Table */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Users</h2>
          <Button size="sm">View All</Button>
        </div>
        <Table>
          <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Role</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Join Date</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {recentUsers.map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
                <Table.Cell>
                  <Badge color={user.status === 'active' ? 'success' : 'warning'}>
                    {user.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell>{user.joinDate}</Table.Cell>
                <Table.Cell>
                  <Button size="xs">View</Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>

      {/* Pending Approvals */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Pending Doctor Approvals</h2>
        </div>
        <div className="space-y-4">
          {pendingApprovals.map((doctor) => (
            <div key={doctor.id} className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <p className="font-semibold">{doctor.name}</p>
                <p className="text-sm text-gray-600">{doctor.specialization}</p>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" color="success">Approve</Button>
                <Button size="sm" color="failure">Reject</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard; 