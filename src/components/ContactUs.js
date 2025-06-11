import React from 'react';

const ContactUs = () => {
  return (
    <div style={styles.container}>
      <img src="/logo.png" alt="NB Painting Logo" style={styles.logo} />
      <h2 style={styles.heading}>Contact Us</h2>
      <p style={styles.text}>We would love to hear from you!</p>
      <p style={styles.text}>Phone 1: (754) 235-2250</p>
      <p style={styles.text}>Phone 2: (754) 366-9922</p>
      <p style={styles.text}>Email: <a href="mailto:HELPNBPAINTING@GMAIL.COM" style={styles.email}>helpnbpainting@GMAIL.COM</a></p>
      <p style={styles.text}>Serving all of South Florida</p>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    textAlign: 'center',
    backgroundColor: '#000',
    color: '#b59410',
    minHeight: '100vh'
  },
  logo: {
    width: '150px',
    marginBottom: '20px'
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#b59410'
  },
  text: {
    fontSize: '1.2rem',
    margin: '10px 0'
  },
  email: {
    color: '#b59410',
    textDecoration: 'underline'
  }
};

export default ContactUs;
