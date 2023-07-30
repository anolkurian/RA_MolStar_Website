import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

interface NavbarProps {
  loggedIn: boolean;
  handleLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ loggedIn, handleLogout }) => {
  return (
    <nav className='navbar'>
      <ul>
        {/* <li>
          <Link to="/">Home</Link>
        </li> */}
        <li>
          {loggedIn ? (
            <Link to="/" onClick={handleLogout}>Logout</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
        {loggedIn ? null : (
          <li>
            <Link to="/register">Register</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;