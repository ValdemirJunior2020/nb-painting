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
    <div style={styles.container}>
      <div style={styles.branding}>
        <img src="/logo.png" alt="NB Painting Logo" style={styles.logo} />
        <h1 style={styles.title}>New Beginning Painting</h1>
      </div>
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
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#000',
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  branding: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10
  },
  logo: {
    height: '50px'
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#b59410',
    margin: 0
  },
  nav: {
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
