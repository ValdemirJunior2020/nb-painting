import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const images = [
  { id: 1, url: '/houses/house-1.jpg', title: 'Luxury Exterior' },
  { id: 2, url: '/houses/house-2.jpg', title: 'Beautiful Finish' },
  { id: 3, url: '/houses/house-3.jpg', title: 'Modern House Paint' },
  { id: 4, url: '/houses/house-4.jpg', title: 'Homeless Community' }
];

const Gallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const handleImageClick = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Our Painting Projects</h2>
      <div style={styles.grid}>
        {images.map((img, index) => (
          <div key={img.id} style={styles.card} onClick={() => handleImageClick(index)}>
            <img src={img.url} alt={img.title} style={styles.image} />
            <p style={styles.caption}>{img.title}</p>
          </div>
        ))}
      </div>

      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex].url}
          nextSrc={images[(photoIndex + 1) % images.length].url}
          prevSrc={images[(photoIndex + images.length - 1) % images.length].url}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
          imageCaption={images[photoIndex].title}
        />
      )}
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
  heading: {
    textAlign: 'center',
    marginBottom: 20
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
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
    transition: 'transform 0.3s ease',
    cursor: 'pointer'
  },
  image: {
    width: '100%',
    borderRadius: 10,
    marginBottom: 10,
    transition: 'transform 0.3s ease'
  },
  caption: {
    fontWeight: 'bold'
  }
};

export default Gallery;
