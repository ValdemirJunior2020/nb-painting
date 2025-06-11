import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut();
    alert("Logged out!");
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link}>Home</Link>
      <Link to="/signup" style={styles.link}>Sign Up</Link>
      <Link to="/login" style={styles.link}>Login</Link>
      <Link to="/estimate" style={styles.link}>Estimate</Link>
      <Link to="/contact" style={styles.link}>Contact Us</Link>
      <Link to="/my-estimates" style={styles.link}>My Estimates</Link>
      {user?.email === 'jesus1@controla.com' && (
        <Link to="/admin" style={styles.link}>Admin</Link>
      )}
      <Link to="/projects" style={styles.link}>Gallery</Link>
      <Link to="/reviews" style={styles.link}>Reviews</Link>
      <Link to="/about" style={styles.link}>About Us</Link>
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
    color: '#b59410',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  logout: {
    background: '#b59410',
    border: 'none',
    padding: '5px 10px',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};

export default Navbar;
