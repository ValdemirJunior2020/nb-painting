import React, { useEffect, useState } from 'react';
import { db, auth,  } from '../firebase/firebaseConfig';
import {
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  orderBy,
  query
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const AdminDashboard = () => {
  const [estimates, setEstimates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.email === 'jesus1@controla.com') {
        setIsAdmin(true);
        await fetchEstimates();
      } else {
        setIsAdmin(false);
      }
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchEstimates = async () => {
    setLoading(true);
    const q = query(collection(db, 'estimates'), orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setEstimates(data);
    setLoading(false);
  };

  const deleteEstimate = async (id) => {
    await deleteDoc(doc(db, 'estimates', id));
    alert("Estimate deleted");
    fetchEstimates();
  };

  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, 'estimates', id), { status });
    fetchEstimates();
  };

  const downloadPDF = (estimate) => {
    const docPDF = new jsPDF();
    docPDF.setFontSize(16);
    docPDF.text('Painting Estimate Summary', 14, 20);

    autoTable(docPDF, {
      startY: 30,
      body: [
        ['Name', estimate.name],
        ['Phone', estimate.phone],
        ['Address', estimate.address],
        ['City', estimate.city],
        ['State', estimate.state],
        ['Square Feet', estimate.squareFeet],
        ['Height', estimate.height + ' ft'],
        ['Color', estimate.colorHex],
        ['Price', `$${estimate.price}`],
        ['Notes', estimate.notes || 'N/A'],
        ['Status', estimate.status || 'Pending'],
      ],
      theme: 'grid'
    });

    docPDF.save(`Estimate-${estimate.name || estimate.id}.pdf`);
  };

  if (checkingAuth) return <p style={styles.text}>Checking admin credentials...</p>;
  if (!isAdmin) return <p style={styles.text}>Access Denied. Admins only.</p>;

  return (
    <div style={styles.container}>
      <h2>Admin - All Estimates</h2>
      {loading ? (
        <p>Loading estimates...</p>
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

            <div style={styles.buttons}>
              <button onClick={() => updateStatus(est.id, 'Approved')} style={styles.approve}>Approve</button>
              <button onClick={() => updateStatus(est.id, 'Rejected')} style={styles.reject}>Reject</button>
              <button onClick={() => deleteEstimate(est.id)} style={styles.delete}>Delete</button>
              <button onClick={() => downloadPDF(est)} style={styles.download}>Download PDF</button>
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
    color: '#ffd700',
    textAlign: 'center',
    marginTop: 50
  },
  card: {
    border: '1px solid #ffd700',
    borderRadius: 8,
    padding: 20,
    marginBottom: 30
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
    borderRadius: 5,
    fontWeight: 'bold'
  },
  buttons: {
    marginTop: 10,
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap'
  },
  approve: {
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: 5,
    cursor: 'pointer'
  },
  reject: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: 5,
    cursor: 'pointer'
  },
  delete: {
    backgroundColor: '#8b0000',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: 5,
    cursor: 'pointer'
  },
  download: {
    backgroundColor: '#0066cc',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: 5,
    cursor: 'pointer'
  }
};

export default AdminDashboard;
