import React, { useState, useEffect } from 'react';
import { db, storage, auth } from '../firebase/firebaseConfig';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const EstimateForm = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    squareFeet: '',
    height: '',
    colorHex: '#b59410',
    notes: ''
  });

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
        alert("Please sign up or log in to submit an estimate.");
        navigate('/signup');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      return setMessage("Please log in to submit an estimate.");
    }

    try {
      const uid = auth.currentUser.uid;
      const estimateId = Date.now().toString();
      let imageUrl = '';

      if (image) {
        const imageRef = ref(storage, `estimates/${uid}/${estimateId}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      const squareFeet = parseFloat(form.squareFeet);
      const height = parseFloat(form.height);
      const totalPrice = (squareFeet * (height || 1)) * 1.5;

      await setDoc(doc(db, 'estimates', estimateId), {
        userId: uid,
        name: form.name,
        phone: form.phone,
        address: form.address,
        city: form.city,
        state: form.state,
        squareFeet: form.squareFeet,
        height: form.height,
        colorHex: form.colorHex,
        notes: form.notes,
        price: totalPrice,
        imageUrl,
        timestamp: serverTimestamp(),
        status: 'Pending'
      });

      setMessage("Your request was submitted successfully. We will contact you as soon as possible!");
      setForm({
        name: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        squareFeet: '',
        height: '',
        colorHex: '#b59410',
        notes: ''
      });
      setImage(null);
    } catch (error) {
      console.error(error);
      setMessage("Error submitting estimate.");
    }
  };

  const convertImageToPng = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            const pngFile = new File([blob], 'house.png', { type: 'image/png' });
            resolve(pngFile);
          }, 'image/png');
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div style={styles.container} className="container">
      <h2 className="text-center mb-4">Submit a Painting Quote Request</h2>
      <form onSubmit={handleSubmit} style={styles.form} className="w-100">

        <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone Number" pattern="[0-9]{10,15}" title="Enter a valid phone number" value={form.phone} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} required />
        <input type="text" name="state" placeholder="State" value={form.state} onChange={handleChange} required />
        <input type="number" name="squareFeet" placeholder="Square Feet" value={form.squareFeet} onChange={handleChange} required />
        <input type="number" name="height" placeholder="Approximate Wall Height (ft)" value={form.height} onChange={handleChange} required />

        <label>
          Select the new color you want:
          <input type="color" name="colorHex" value={form.colorHex} onChange={handleChange} style={{ marginLeft: '10px' }} />
        </label>

        <label>
          Upload a picture of your house:
          <input type="file" accept="image/*" capture="environment" onChange={async (e) => {
            if (e.target.files && e.target.files[0]) {
              const pngFile = await convertImageToPng(e.target.files[0]);
              setImage(pngFile);
            }
          }} />
        </label>

        <textarea name="notes" placeholder="Additional Notes (e.g., interior, fence, etc.)" value={form.notes} onChange={handleChange} />

        <p><strong>Total Price:</strong> ${form.squareFeet && form.height ? (form.squareFeet * form.height * 1.5).toFixed(2) : 0}</p>
        <button type="submit" className="btn btn-warning">Submit Estimate</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    padding: 30,
    backgroundColor: '#111',
    color: '#b59410',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    maxWidth: 400
  },
  message: {
    marginTop: 10,
    color: '#b59410',
    fontWeight: 'bold'
  }
};

export default EstimateForm;
