// src/components/Gallery.js
import React, { useEffect, useState, useCallback } from 'react';
import { getStorage, ref, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import { auth } from '../firebase/firebaseConfig';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const storage = getStorage();

  // Track current user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setUserEmail(user.email);
      else setUserEmail(null);
    });
    return () => unsubscribe();
  }, []);

  // Fetch images
  const fetchImages = useCallback(async () => {
    try {
      const folderRef = ref(storage, 'gallery');
      const result = await listAll(folderRef);
      const urls = await Promise.all(
        result.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return { name: itemRef.name, url, path: itemRef.fullPath };
        })
      );
      setImages(urls);
    } catch (err) {
      console.error('Error fetching images:', err);
    }
  }, [storage]);

  // Delete image
  const handleDelete = async (path) => {
    try {
      const imageRef = ref(storage, path);
      await deleteObject(imageRef);
      alert('Image deleted');
      fetchImages(); // Refresh the list
    } catch (err) {
      console.error('Error deleting image:', err);
      alert('Failed to delete image');
    }
  };

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return (
    <div style={styles.container}>
      <h2>Our Painting Projects</h2>
      <div style={styles.grid}>
        {images.map((img, index) => (
          <div key={index} style={styles.card}>
            <img
              src={img.url}
              alt={`Project ${index}`}
              style={styles.image}
              onClick={() => setEnlargedImage(img.url)}
            />
            {userEmail === 'jesus1@controla.com' && (
              <button onClick={() => handleDelete(img.path)} style={styles.deleteBtn}>Delete</button>
            )}
          </div>
        ))}
      </div>

      {enlargedImage && (
        <div style={styles.modalOverlay} onClick={() => setEnlargedImage(null)}>
          <img src={enlargedImage} alt="Enlarged" style={styles.enlargedImage} />
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: 30,
    backgroundColor: '#111',
    color: '#b59410',
    minHeight: '100vh',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
  },
  card: {
    border: '1px solid #b59410',
    borderRadius: 8,
    padding: 10,
    width: 250,
    textAlign: 'center',
    backgroundColor: '#222',
    position: 'relative',
  },
  image: {
    width: '100%',
    borderRadius: 6,
    marginBottom: 10,
    cursor: 'pointer',
  },
  deleteBtn: {
    backgroundColor: '#b59410',
    border: 'none',
    padding: '6px 12px',
    color: '#111',
    fontWeight: 'bold',
    borderRadius: 4,
    cursor: 'pointer',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  enlargedImage: {
    maxWidth: '90%',
    maxHeight: '90%',
    borderRadius: 10,
  },
};

export default Gallery;
