import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase/firebaseConfig';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const MyEstimates = () => {
  const [estimates, setEstimates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        alert("Please log in to view your estimates.");
        navigate('/login');
        return;
      }

      try {
        const q = query(
          collection(db, 'estimates'),
          where('userId', '==', user.uid),
          orderBy('timestamp', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const results = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setEstimates(results);
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
        <p>Loading your requests...</p>
      ) : estimates.length === 0 ? (
        <p>You haven’t submitted any estimates yet.</p>
      ) : (
        estimates.map((est) => (
          <div key={est.id} style={styles.card}>
            <p><strong>Square Feet:</strong> {est.squareFeet}</p>
            <p><strong>Color:</strong> <span style={{ color: est.colorHex }}>{est.colorHex}</span></p>
            <p><strong>Price:</strong> ${est.price}</p>
            {est.imageUrl && (
              <img src={est.imageUrl} alt="House" style={styles.image} />
            )}
            <p><strong>Notes:</strong> {est.notes || 'N/A'}</p>
            <p><strong>Submitted:</strong> {est.timestamp?.toDate().toLocaleString()}</p>
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
    color: '#b59410',
    minHeight: '100vh'
  },
  card: {
    border: '1px solid #b59410',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20
  },
  image: {
    width: '100%',
    maxWidth: 300,
    marginTop: 10,
    borderRadius: 8
  }
};

export default MyEstimates;
