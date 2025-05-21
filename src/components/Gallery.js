import React from 'react';

const Gallery = () => {
  // Replace with actual images or links later
  const images = [
    { id: 1, url: '/images/project1.jpg', title: 'Luxury Interior' },
    { id: 2, url: '/images/project2.jpg', title: 'Office Refresh' },
    { id: 3, url: '/images/project3.jpg', title: 'Modern Living Room' }
  ];

  return (
    <div style={styles.container}>
      <h2>Our Painting Projects</h2>
      <div style={styles.grid}>
        {images.map((img) => (
          <div key={img.id} style={styles.card}>
            <img src={img.url} alt={img.title} style={styles.image} />
            <p>{img.title}</p>
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
    minHeight: '100vh'
  },
  grid: {
    display: 'flex',
    gap: 20,
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  card: {
    border: '1px solid #b59410',
    borderRadius: 8,
    padding: 10,
    width: 250,
    textAlign: 'center'
  },
  image: {
    width: '100%',
    borderRadius: 6,
    marginBottom: 10
  }
};

export default Gallery;
