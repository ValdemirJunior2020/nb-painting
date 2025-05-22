import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase/firebaseConfig';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const AdminDashboard = () => {
  const [estimates, setEstimates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === 'jesus1@controla.com') {

        setIsAdmin(true);
        fetchEstimates();
      } else {
        setIsAdmin(false);
      }
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchEstimates = async () => {
    try {
      const q = query(collection(db, 'estimates'), orderBy('timestamp', 'desc'));
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
  };

  if (checkingAuth) {
    return <p style={styles.text}>Checking admin credentials...</p>;
  }

  if (!isAdmin) {
    return <p style={styles.text}>Access Denied. Admins only.</p>;
  }

  return (
    <div style={styles.container}>
      <h2>Admin - All Estimates</h2>
      {loading ? (
        <p>Loading estimates...</p>
      ) : (
        estimates.map((est) => (
          <div key={est.id} style={styles.card}>
            <p><strong>Phone Number:</strong> {est.phoneNumber || 'N/A'}</p>
            <p><strong>Address:</strong> {est.address || 'N/A'}</p>
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
    color: '#ffd700',
    minHeight: '100vh'
  },
  text: {
    textAlign: 'center',
    paddingTop: 100,
    color: '#ffd700',
    fontSize: 18
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
  }
};

export default AdminDashboard;
