import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { Avatar, Dropdown, Navbar as FlowbiteNavbar } from 'flowbite-react';

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <FlowbiteNavbar fluid className="border-b">
      <FlowbiteNavbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Healthcare System
        </span>
      </FlowbiteNavbar.Brand>
      <div className="flex md:order-2">
        {isAuthenticated ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User" rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{user?.fullName}</span>
              <span className="block truncate text-sm font-medium">{user?.email}</span>
            </Dropdown.Header>
            <Dropdown.Item as={Link} to={`/profile/${user?.role}`}>
              Profile
            </Dropdown.Item>
            <Dropdown.Item as={Link} to={`/dashboard/${user?.role}`}>
              Dashboard
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <div className="flex gap-2">
            <Link
              to="/login"
              className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </FlowbiteNavbar>
  );
};

export default Navbar; 