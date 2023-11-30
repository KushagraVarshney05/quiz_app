import React from 'react';
import Logout from '../Logout/Logout';
import './styles.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  // Fetch username from local storage
  const [username, setUsername] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      setUsername(localStorage.getItem('name'));
    } else {
      setUsername('');
    }
  }, [token]);

  return (
    <nav className="navbar">
      <Link className="navbar-brand" to="/home">One Stop CS</Link>
      <div className="navbar-segments">
        {token &&<Link className="navbar-segment" to="/compiler">Compiler</Link>}
        <Link className="navbar-segment" to="/home">Home</Link>
      </div>
      <div className="navbar-user">
        {token && username && <span className="username">Welcome, {username}!</span>}
        {token && <Logout />}
      </div>
      
    </nav>
  );
};

export default Navbar;
