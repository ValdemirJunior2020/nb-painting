// src/components/AdminEstimates.js
import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase/firebaseConfig';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AdminEstimates = () => {
  const [estimates, setEstimates] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.email === 'jesus@controla.com') {
        setIsAdmin(true);
        const querySnapshot = await getDocs(collection(db, 'estimates'));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEstimates(data);
      } else {
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this estimate?')) {
      await deleteDoc(doc(db, 'estimates', id));
      setEstimates(estimates.filter((estimate) => estimate.id !== id));
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, 'estimates', id), {
        status: newStatus,
      });

      setEstimates((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
      );
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const filteredEstimates = statusFilter === 'All'
    ? estimates
    : estimates.filter((e) => (e.status || 'Pending') === statusFilter);

  const downloadPdf = (estimate) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('New Beginning Painting & Services', 14, 20);
    doc.setFontSize(12);
    doc.text(`Estimate ID: ${estimate.id}`, 14, 30);
    doc.text(`User ID: ${estimate.userId}`, 14, 40);
    doc.text(`Address: ${estimate.address}`, 14, 50);
    doc.text(`Phone: ${estimate.phone}`, 14, 60);
    doc.text(`Square Feet: ${estimate.squareFeet}`, 14, 70);
    doc.text(`Color: ${estimate.colorHex}`, 14, 80);
    doc.text(`Notes: ${estimate.notes}`, 14, 90);
    doc.text(`Total Price: $${estimate.price}`, 14, 100);
    doc.text(`Status: ${estimate.status || 'Pending'}`, 14, 110);
    doc.text('Contact: Valdemir Junior | Phone: 754-366-9922', 14, 130);

    doc.save(`Estimate-${estimate.id}.pdf`);
  };

  if (!isAdmin) return <p>You do not have permission to view this page.</p>;

  return (
    <div style={styles.container}>
      <h2>Admin - Painting Estimates</h2>

      <label>
        Filter by Status:
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={styles.select}
        >
          <option value="All">All</option>
          <option value="Pending">⏳ Pending</option>
          <option value="Accepted">✅ Accepted</option>
          <option value="In Progress">🔧 In Progress</option>
          <option value="Rejected">❌ Rejected</option>
        </select>
      </label>

      {filteredEstimates.length === 0 ? (
        <p>No estimates submitted yet.</p>
      ) : (
        filteredEstimates.map((estimate) => (
          <div key={estimate.id} style={styles.card}>
            <p><strong>User ID:</strong> {estimate.userId}</p>
            <p><strong>Address:</strong> {estimate.address}</p>
            <p><strong>Phone:</strong> {estimate.phone}</p>
            <p><strong>Square Feet:</strong> {estimate.squareFeet}</p>
            <p>
              <strong>Color:</strong>{' '}
              <span style={{ background: estimate.colorHex, padding: '0 10px', color: '#fff' }}>
                {estimate.colorHex}
              </span>
            </p>
            <p><strong>Notes:</strong> {estimate.notes}</p>
            <p><strong>Price:</strong> ${estimate.price}</p>
            <p>
              <strong>Status:</strong>{' '}
              <select
                value={estimate.status || 'Pending'}
                onChange={(e) => handleStatusChange(estimate.id, e.target.value)}
              >
                <option value="Pending">⏳ Pending</option>
                <option value="Accepted">✅ Accepted</option>
                <option value="In Progress">🔧 In Progress</option>
                <option value="Rejected">❌ Rejected</option>
              </select>
            </p>
            {estimate.imageUrl && (
              <img src={estimate.imageUrl} alt="Uploaded house" style={styles.image} />
            )}
            <div>
              <button onClick={() => downloadPdf(estimate)} style={styles.button}>Download PDF</button>
              <button onClick={() => handleDelete(estimate.id)} style={styles.deleteBtn}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
    marginBottom: 20,
  },
  image: {
    maxWidth: '100%',
    marginTop: 10,
  },
  deleteBtn: {
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    padding: 10,
    marginTop: 10,
    cursor: 'pointer',
    borderRadius: 4,
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: 10,
    cursor: 'pointer',
    borderRadius: 4,
  },
  select: {
    marginLeft: 10,
  },
};

export default AdminEstimates;
