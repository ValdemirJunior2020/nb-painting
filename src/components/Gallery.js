// src/components/Gallery.js
import React, { useEffect, useState } from 'react';
import { auth, storage } from '../firebase/firebaseConfig';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import Modal from 'react-modal';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    fetchGalleryImages();
    return () => unsubscribe();
  }, []);

  const fetchGalleryImages = async () => {
    const galleryRef = ref(storage, 'gallery/');
    const files = await listAll(galleryRef);
    const urls = await Promise.all(
      files.items.map(item => getDownloadURL(item))
    );
    setImages(urls);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const fileRef = ref(storage, `gallery/${Date.now()}-${file.name}`);
    await uploadBytes(fileRef, file);
    await fetchGalleryImages();
    setUploading(false);
  };

  return (
    <div style={styles.container}>
      <h2>Our Painting Projects</h2>

      {user?.email === 'jesus1@controla.com' && (
        <div style={styles.uploadBox}>
          <label style={styles.label}>Upload new image:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {uploading && <p>Uploading...</p>}
        </div>
      )}

      <div style={styles.grid}>
        {images.map((url, index) => (
          <div key={index} style={styles.card} onClick={() => setSelectedImage(url)}>
            <img src={url} alt={`Project ${index + 1}`} style={styles.image} />
          </div>
        ))}
      </div>

      <Modal
        isOpen={!!selectedImage}
        onRequestClose={() => setSelectedImage(null)}
        contentLabel="Image Modal"
        style={modalStyles}
        ariaHideApp={false}
      >
        <img src={selectedImage} alt="Zoomed In" style={{ width: '100%', borderRadius: 10 }} />
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
  uploadBox: {
    marginBottom: 20,
    border: '1px solid #b59410',
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#222'
  },
  label: {
    marginRight: 10,
    fontWeight: 'bold'
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
    cursor: 'pointer'
  },
  image: {
    width: '100%',
    borderRadius: 6,
    transition: 'transform 0.2s',
    boxShadow: '0 4px 8px rgba(0,0,0,0.6)'
  }
};

const modalStyles = {
  content: {
    backgroundColor: '#000',
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '90%',
    maxHeight: '90%',
    margin: 'auto'
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.8)'
  }
};

export default Gallery;
