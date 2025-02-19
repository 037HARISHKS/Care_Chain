import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to role-specific dashboard
    if (user?.role) {
      navigate(`/dashboard/${user.role}`, { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 