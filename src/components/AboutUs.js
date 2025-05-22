import React from 'react';

const About = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>About Us</h2>

      <div style={styles.content}>
        <div style={styles.text}>
          <p>
            With over <strong>15 years of experience</strong> in painting residential homes and commercial buildings, we bring passion and excellence to every project.
          </p>
          <p>
            <strong>Junior and Renato</strong> have worked side-by-side for more than a decade, building a reputation based on trust, quality, and reliability.
          </p>
          <p>
            Through life's challenges — including Renato's <strong>8 surgeries</strong> and Junior's <strong>massive stroke</strong> — they never gave up. Instead, they returned with even more heart and determination.
          </p>
          <p>
            Their mission now is stronger than ever: to deliver the <strong>best customer service</strong> and <strong>exceptional painting quality</strong> with a heart full of joy and gratitude.
          </p>
        </div>

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
  );
};

const styles = {
  container: {
    padding: 40,
    backgroundColor: '#111',
    color: '#b59410',
    minHeight: '100vh',
    fontSize: '18px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)'
  },
  heading: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center'
  },
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 40,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  text: {
    maxWidth: 500,
    lineHeight: '1.8'
  },
  imageBox: {
    textAlign: 'center'
  },
  image: {
    width: 280,
    borderRadius: '50%',
    boxShadow: '0 0 10px rgba(255, 215, 0, 0.4)',
    border: '2px solid #b59410'
  },
  caption: {
    marginTop: 10,
    fontStyle: 'italic',
    fontWeight: 'bold'
  }
};

export default About;
