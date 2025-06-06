import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase/firebaseConfig';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { generateEstimatePDF } from '../utils/generateEstimatePDF';

const MyEstimates = () => {
  const [estimates, setEstimates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        alert("Please sign up or log in to view your estimates.");
        navigate('/signup');
        return;
      }

      try {
        const q = query(
          collection(db, 'estimates'),
          where('userId', '==', user.uid),
          orderBy('timestamp', 'desc')
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setEstimates(data);
      } catch (error) {
        console.error("Error fetching estimates:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h2>My Painting Estimates</h2>
      {loading ? (
        <p>Loading...</p>
      ) : estimates.length === 0 ? (
        <p>You haven’t submitted any estimates yet.</p>
      ) : (
        estimates.map(est => (
          <div key={est.id} style={styles.card}>
            <p><strong>Name:</strong> {est.name}</p>
            <p><strong>Phone:</strong> {est.phone}</p>
            <p><strong>Address:</strong> {est.address}</p>
            <p><strong>City:</strong> {est.city}</p>
            <p><strong>State:</strong> {est.state}</p>
            <p><strong>Height:</strong> {est.height} ft</p>
            <p><strong>Square Feet:</strong> {est.squareFeet}</p>
            <p><strong>Color:</strong> <span style={{ color: est.colorHex }}>{est.colorHex}</span></p>
            <p><strong>Price:</strong> ${est.price}</p>
            {est.imageUrl && <img src={est.imageUrl} alt="House" style={styles.image} />}
            <p><strong>Notes:</strong> {est.notes || 'N/A'}</p>
            <p><strong>Submitted:</strong> {est.timestamp?.toDate().toLocaleString()}</p>
            <p><strong>Status:</strong>{' '}
              <span style={{
                ...styles.badge,
                backgroundColor:
                  est.status === 'Approved' ? 'green' :
                    est.status === 'Rejected' ? 'red' : 'gray'
              }}>
                {est.status || 'Pending'}
              </span>
            </p>
            <button
              onClick={() => generateEstimatePDF(est)}
              style={styles.downloadBtn}
            >
              Download PDF
            </button>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: 30,
    backgroundColor: '#111',
    color: '#ffd700',
    minHeight: '100vh'
  },
  card: {
    border: '1px solid #ffd700',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20
  },
  image: {
    width: '100%',
    maxWidth: 300,
    marginTop: 10,
    borderRadius: 8
  },
  badge: {
    padding: '5px 12px',
    color: 'white',
    borderRadius: '5px',
    fontWeight: 'bold'
  },
  downloadBtn: {
    marginTop: 10,
    backgroundColor: '#ffd700',
    border: 'none',
    padding: '8px 16px',
    borderRadius: 4,
    color: '#111',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};

export default MyEstimates;
