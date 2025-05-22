import React, { useEffect, useState } from 'react';
import { db, auth, storage } from '../firebase/firebaseConfig';
import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
import jsPDF from 'jspdf';

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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this estimate?")) {
      await deleteDoc(doc(db, 'estimates', id));
      fetchEstimates();
    }
  };

  const handleStatusChange = async (id, status) => {
    await updateDoc(doc(db, 'estimates', id), { status });
    fetchEstimates();
  };

  const downloadPDF = async (estimate) => {
    const docPdf = new jsPDF();
    docPdf.setFontSize(16);
    docPdf.text("Estimate Summary", 20, 20);

    const lines = [
      `Name: ${estimate.name || 'N/A'}`,
      `Phone: ${estimate.phone || 'N/A'}`,
      `Address: ${estimate.address || 'N/A'}`,
      `City: ${estimate.city || 'N/A'}`,
      `State: ${estimate.state || 'N/A'}`,
      `Height: ${estimate.height || 'N/A'} ft`,
      `Square Feet: ${estimate.squareFeet}`,
      `Color: ${estimate.colorHex}`,
      `Price: $${estimate.price}`,
      `Notes: ${estimate.notes || 'N/A'}`,
      `Submitted: ${estimate.timestamp?.toDate().toLocaleString()}`
    ];

    lines.forEach((line, i) => docPdf.text(line, 20, 30 + i * 10));
    docPdf.save(`estimate_${estimate.name || 'client'}.pdf`);
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
            <p><strong>Name:</strong> {est.name}</p>
            <p><strong>Phone:</strong> {est.phone}</p>
            <p><strong>Address:</strong> {est.address}</p>
            <p><strong>City:</strong> {est.city}</p>
            <p><strong>State:</strong> {est.state}</p>
            <p><strong>Height:</strong> {est.height} ft</p>
            <p><strong>Square Feet:</strong> {est.squareFeet}</p>
            <p><strong>Color:</strong> <span style={{ color: est.colorHex }}>{est.colorHex}</span></p>
            <p><strong>Price:</strong> ${est.price}</p>
            {est.imageUrl && (
              <img src={est.imageUrl} alt="House" style={styles.image} />
            )}
            <p><strong>Notes:</strong> {est.notes || 'N/A'}</p>
            <p><strong>Submitted:</strong> {est.timestamp?.toDate().toLocaleString()}</p>
            <p><strong>Status:</strong> {est.status || 'Pending'}</p>

            <div style={styles.buttonGroup}>
              <button style={styles.approve} onClick={() => handleStatusChange(est.id, 'Approved')}>Approve</button>
              <button style={styles.reject} onClick={() => handleStatusChange(est.id, 'Rejected')}>Reject</button>
              <button style={styles.delete} onClick={() => handleDelete(est.id)}>Delete</button>
              <button style={styles.download} onClick={() => downloadPDF(est)}>Download PDF</button>
            </div>
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
  },
  buttonGroup: {
    marginTop: 15,
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap'
  },
  approve: {
    backgroundColor: 'green',
    color: 'white',
    padding: '5px 10px',
    border: 'none',
    cursor: 'pointer'
  },
  reject: {
    backgroundColor: 'orange',
    color: 'white',
    padding: '5px 10px',
    border: 'none',
    cursor: 'pointer'
  },
  delete: {
    backgroundColor: 'red',
    color: 'white',
    padding: '5px 10px',
    border: 'none',
    cursor: 'pointer'
  },
  download: {
    backgroundColor: '#555',
    color: 'white',
    padding: '5px 10px',
    border: 'none',
    cursor: 'pointer'
  }
};

export default AdminDashboard;
