import React from 'react';

const AboutUs = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>About Us</h2>
        <p style={styles.text}>
          With over <strong>15 years</strong> of experience in painting homes and commercial properties, our team proudly delivers high-quality service and exceptional results.
        </p>
        <p style={styles.text}>
          <strong>Junior</strong> and <strong>Renato</strong> have worked side by side for more than a decade, earning the trust of countless clients. Through life’s toughest challenges—Renato undergoing <strong>8 surgeries</strong> and Junior surviving a <strong>massive stroke</strong>—they are back with hearts full of joy and renewed purpose.
        </p>
        <p style={styles.text}>
          Today, they’re building a new legacy through <strong>New Beginning Painting & Services</strong>, offering unbeatable craftsmanship and a customer-first experience that reflects their resilience and passion.
        </p>

        <div style={styles.imageContainer}>
          <div style={styles.imagePlaceholder}>[ Picture of Junior ]</div>
          <div style={styles.imagePlaceholder}>[ Picture of Renato ]</div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: 30,
    backgroundColor: '#111',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    backgroundColor: '#000',
    color: '#b59410',
    padding: 40,
    borderRadius: 12,
    boxShadow: '0 0 20px rgba(181, 148, 16, 0.5)',
    maxWidth: 900,
    width: '100%'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center'
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 1.8,
    marginBottom: 20
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    gap: 20,
    marginTop: 30,
    flexWrap: 'wrap'
  },
  imagePlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: '#222',
    color: '#888',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    fontStyle: 'italic',
    fontSize: 16,
    textAlign: 'center'
  }
};

export default AboutUs;
