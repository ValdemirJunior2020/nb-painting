import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import EstimateForm from './components/EstimateForm';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import MyEstimates from './components/MyEstimates';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/estimate" element={<EstimateForm />} />
        <Route path="/my-estimates" element={<MyEstimates />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/reviews" element={<Reviews />} />
      </Routes>
    </Router>
  );
}

export default App;
