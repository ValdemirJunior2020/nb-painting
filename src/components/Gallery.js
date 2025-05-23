// src/components/Gallery.js
import React, { useEffect, useState } from 'react';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const storage = getStorage();
        const folderRef = ref(storage, 'gallery');
        const result = await listAll(folderRef);
        const urls = await Promise.all(
          result.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            return { name: itemRef.name, url };
          })
        );
        setImages(urls);
      } catch (err) {
        console.error('Error fetching gallery images:', err);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="container text-center text-warning py-5" style={{ backgroundColor: '#111', minHeight: '100vh' }}>
      <h2 className="mb-4">Our Painting Projects</h2>
      <div className="row justify-content-center g-3">
        {images.map((img, index) => (
          <div key={index} className="col-6 col-md-4 col-lg-3">
            <img
              src={img.url}
              alt={`Project ${index}`}
              className="img-fluid rounded shadow"
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedImg(img.url)}
              data-bs-toggle="modal"
              data-bs-target="#imageModal"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      <div className="modal fade" id="imageModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content bg-dark">
            <div className="modal-body">
              {selectedImg && <img src={selectedImg} alt="Zoomed" className="img-fluid rounded" />}
            </div>
            <div className="modal-footer border-0">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
