import React, { useEffect, useState } from 'react';
import { db, auth,  } from '../firebase/firebaseConfig';
import {
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  query,
  orderBy
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const AdminDashboard = () => {
  const [estimates, setEstimates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.email === 'jesus1@controla.com') {
        setIsAdmin(true);
        await fetchEstimates();
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const fetchEstimates = async () => {
    const q = query(collection(db, 'estimates'), orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    const items = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setEstimates(items);
  };

  const handleApprove = async (id) => {
    await updateDoc(doc(db, 'estimates', id), { status: 'Approved' });
    fetchEstimates();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this estimate?")) {
      await deleteDoc(doc(db, 'estimates', id));
      fetchEstimates();
    }
  };

  const handleDownloadPDF = (estimate) => {
    const docPdf = new jsPDF();
    docPdf.addImage('/logo.png', 'PNG', 10, 8, 30, 15);

    docPdf.setFontSize(16);
    docPdf.text("Painting Estimate", 70, 20);

    autoTable(docPdf, {
      startY: 30,
      head: [['Field', 'Value']],
      body: [
        ['Name', estimate.name],
        ['Address', estimate.address],
        ['City', estimate.city],
        ['State', estimate.state],
        ['Phone', estimate.phone],
        ['Square Feet', estimate.squareFeet],
        ['Wall Height', estimate.height],
        ['Color Hex', estimate.colorHex],
        ['Notes', estimate.notes],
        ['Price', `$${estimate.price}`],
        ['Status', estimate.status || 'Pending']
      ]
    });

    docPdf.save(`Estimate-${estimate.name}.pdf`);
  };

  if (!isAdmin) return <p style={{ color: '#fff', padding: 50 }}>Access Denied. Admins only.</p>;

  return (
    <div style={{ padding: 20, backgroundColor: '#111', color: '#ffd700', minHeight: '100vh' }}>
      <h2>Admin - All Estimates</h2>
      {loading ? (
        <p>Loading estimates...</p>
      ) : (
        estimates.map((est) => (
          <div key={est.id} style={{ border: '1px solid #ffd700', padding: 15, marginBottom: 20, borderRadius: 8 }}>
            <p><strong>Name:</strong> {est.name}</p>
            <p><strong>Address:</strong> {est.address}, {est.city}, {est.state}</p>
            <p><strong>Phone:</strong> {est.phone}</p>
            <p><strong>Square Feet:</strong> {est.squareFeet}</p>
            <p><strong>Wall Height:</strong> {est.height}</p>
            <p><strong>Color:</strong> <span style={{ color: est.colorHex }}>{est.colorHex}</span></p>
            <p><strong>Price:</strong> ${est.price}</p>
            <p><strong>Notes:</strong> {est.notes || 'N/A'}</p>
            <p><strong>Status:</strong> <span style={{ color: est.status === 'Approved' ? 'lightgreen' : 'orange' }}>{est.status || 'Pending'}</span></p>
            {est.imageUrl && (
              <img src={est.imageUrl} alt="House" style={{ width: 280, marginTop: 10, borderRadius: 8 }} />
            )}
            <div style={{ marginTop: 10 }}>
              <button onClick={() => handleApprove(est.id)} style={btn.green}>Approve</button>
              <button onClick={() => handleDelete(est.id)} style={btn.red}>Delete</button>
              <button onClick={() => handleDownloadPDF(est)} style={btn.pdf}>Download PDF</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const btn = {
  green: {
    background: 'green',
    color: '#fff',
    padding: '6px 12px',
    marginRight: 10,
    border: 'none',
    cursor: 'pointer'
  },
  red: {
    background: 'crimson',
    color: '#fff',
    padding: '6px 12px',
    marginRight: 10,
    border: 'none',
    cursor: 'pointer'
  },
  pdf: {
    background: '#ffd700',
    color: '#000',
    padding: '6px 12px',
    border: 'none',
    cursor: 'pointer'
  }
};

export default AdminDashboard;
