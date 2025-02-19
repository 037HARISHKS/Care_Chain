import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const menuItems = {
    patient: [
      { path: '/dashboard/patient', icon: '📊', label: 'Dashboard' },
      { path: '/appointments', icon: '📅', label: 'Appointments' },
      { path: '/chat', icon: '💬', label: 'Messages' },
      { path: '/profile', icon: '👤', label: 'Profile' },
    ],
    doctor: [
      { path: '/dashboard/doctor', icon: '📊', label: 'Dashboard' },
      { path: '/appointments', icon: '📅', label: 'Appointments' },
      { path: '/patients', icon: '👥', label: 'Patients' },
      { path: '/chat', icon: '💬', label: 'Messages' },
      { path: '/profile', icon: '👤', label: 'Profile' },
    ],
    admin: [
      { path: '/dashboard/admin', icon: '📊', label: 'Dashboard' },
      { path: '/users', icon: '👥', label: 'Users' },
      { path: '/doctors', icon: '👨‍⚕️', label: 'Doctors' },
      { path: '/settings', icon: '⚙️', label: 'Settings' },
    ],
  };

  const currentMenuItems = menuItems[user?.role] || [];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 h-full shadow-lg">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
          <span className="text-xl font-semibold text-gray-800 dark:text-white">
            Healthcare System
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <ul className="p-4 space-y-2">
            {currentMenuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                      : ''
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => {/* Add logout logic */}}
          >
            <span className="mr-3">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 