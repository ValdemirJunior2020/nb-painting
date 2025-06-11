import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import Login from './components/Login';
import EstimateForm from './components/EstimateForm';
import MyEstimates from './components/MyEstimates';
import AdminDashboard from './components/AdminDashboard';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import LandingPage from './components/LandingPage';
import GalleryUpload from './components/GalleryUpload'; // NEW
import AboutUs from './components/AboutUs'; // ✅ Make sure this file exists
import ContactUs from './components/ContactUs';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/upload-gallery" element={<GalleryUpload />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route path="/login" element={<Login />} />
        <Route path="/estimate" element={<EstimateForm />} />
        <Route path="/my-estimates" element={<MyEstimates />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/projects" element={<Gallery />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;
