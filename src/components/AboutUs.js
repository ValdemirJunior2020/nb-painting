// src/components/About.js
import React from 'react';

const About = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>About Us</h2>

      <div style={styles.content}>
        <div style={styles.text}>
          <p>
            With over <strong>15 years of experience</strong> in painting residential homes and commercial buildings, we bring passion, craftsmanship, and attention to detail to every project.
          </p>
          <p>
            <strong>Junior and Renato</strong> have worked side-by-side for more than a decade, building a reputation rooted in professionalism, trust, and quality workmanship.
          </p>
          <p>
            Our team is dedicated to delivering not only beautiful results, but also an outstanding customer experience from start to finish.
          </p>
          <p>
            We take pride in transforming spaces and exceeding client expectations, every time.
          </p>
        </div>

        <div style={styles.imageRow}>
          <div style={styles.imageBox}>
            <img src="/junior.png" alt="Junior" style={styles.image} />
            <p style={styles.caption}>Junior – Co-Founder</p>
          </div>

          <div style={styles.imageBox}>
            <img src="/renato.jpg" alt="Renato" style={styles.image} />
            <p style={styles.caption}>Renato – Co-Founder</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: 40,
    backgroundColor: '#111',
    color: '#b59410',
    minHeight: '100vh',
    border: '1px solid #b59410',
    boxShadow: '0 0 12px #b59410',
    borderRadius: 10,
  },
  heading: {
    fontSize: '2.2em',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 30,
  },
  text: {
    maxWidth: 700,
    fontSize: '1.1em',
    lineHeight: 1.6,
  },
  imageRow: {
    display: 'flex',
    gap: 30,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  imageBox: {
    textAlign: 'center',
  },
  image: {
    width: 180,
    height: 180,
    objectFit: 'cover',
    borderRadius: '50%',
    border: '3px solid #b59410',
    boxShadow: '0 0 8px #b59410',
  },
  caption: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: '1em',
  },
};

export default About;
