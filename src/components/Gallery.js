import React from 'react';

const Gallery = () => {
  const images = [
    { id: 1, url: '/houses/house-1.jpg', title: 'Luxury Exterior' },
    { id: 2, url: '/houses/house-2.jpg', title: 'beatiful Finish' },
    { id: 3, url: '/houses/house-3.jpg', title: 'Modern House Paint' }
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Our Painting Projects</h2>
      <div style={styles.grid}>
        {images.map((img) => (
          <div key={img.id} style={styles.card}>
            <img src={img.url} alt={img.title} style={styles.image} />
            <p style={styles.title}>{img.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: 30,
    backgroundColor: '#111',
    color: '#b59410',
    minHeight: '100vh',
    textAlign: 'center'
  },
  heading: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: 30
  },
  grid: {
    display: 'flex',
    gap: 20,
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  card: {
    border: '1px solid #b59410',
    borderRadius: 12,
    padding: 15,
    width: 270,
    boxShadow: '0 4px 12px rgba(255, 215, 0, 0.15)',
    backgroundColor: '#1c1c1c'
  },
  image: {
    width: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
    height: 200,
    marginBottom: 10,
    border: '2px solid #b59410'
  },
  title: {
    fontWeight: 'bold'
  }
};

export default Gallery;
