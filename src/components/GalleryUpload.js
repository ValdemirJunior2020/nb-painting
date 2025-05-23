import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const q = query(collection(db, 'gallery'), orderBy('timestamp', 'desc'));
        const snapshot = await getDocs(q);
        const results = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setImages(results);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Our Painting Projects</h2>
      <div style={styles.grid}>
        {images.map((img) => (
          <div key={img.id} style={styles.card} onClick={() => setModalImage(img.imageUrl)}>
            <img src={img.imageUrl} alt={img.title} style={styles.image} />
            <p>{img.title}</p>
          </div>
        ))}
      </div>

      {/* Modal to show enlarged image */}
      <Modal
        isOpen={!!modalImage}
        onRequestClose={() => setModalImage(null)}
        contentLabel="Enlarged Image"
        style={{
          content: {
            backgroundColor: '#111',
            border: '2px solid #b59410',
            padding: 20,
            borderRadius: 10,
            maxWidth: '90%',
            maxHeight: '90%',
            margin: 'auto',
            textAlign: 'center'
          },
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.8)'
          }
        }}
      >
        <button onClick={() => setModalImage(null)} style={styles.closeButton}>Close</button>
        <img src={modalImage} alt="Zoomed" style={{ maxWidth: '100%', borderRadius: 10 }} />
      </Modal>
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
  title: {
    textAlign: 'center',
    fontSize: 28,
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
    transition: 'transform 0.3s ease',
    cursor: 'pointer'
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: 6,
    marginBottom: 10
  },
  closeButton: {
    backgroundColor: '#b59410',
    color: '#111',
    border: 'none',
    padding: '10px 20px',
    fontWeight: 'bold',
    borderRadius: 5,
    cursor: 'pointer',
    marginBottom: 10
  }
};

export default Gallery;
