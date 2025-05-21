import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';

const Navbar = () => {
  const handleLogout = () => {
    auth.signOut();
    alert("Logged out!");
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link}>Sign Up</Link>
      <Link to="/login" style={styles.link}>Login</Link>
      <Link to="/estimate" style={styles.link}>Estimate</Link>
      <Link to="/my-estimates" style={styles.link}>My Estimates</Link>
      <Link to="/admin" style={styles.link}>Admin</Link>
      <Link to="/gallery" style={styles.link}>Gallery</Link>
      <Link to="/reviews" style={styles.link}>Reviews</Link>
      <button onClick={handleLogout} style={styles.logout}>Logout</button>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#000',
    padding: 10,
    display: 'flex',
    gap: 15,
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  link: {
    color: '#ffd700',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  logout: {
    background: '#ffd700',
    border: 'none',
    padding: '5px 10px',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};

export default Navbar;
