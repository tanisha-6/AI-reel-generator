import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from '../pages/LandingPage';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import Studio from '../pages/Studio';
import Library from '../pages/Library';
import Thumbnail from '../pages/Thumbnail';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
            path="/dashboard"
            element={
                <ProtectedRoute>
                <Dashboard />
                </ProtectedRoute>
            }
        />
        <Route
            path="/studio"
            element={
            <ProtectedRoute>
                <Studio />
            </ProtectedRoute>
            }
        />
        <Route
            path="/library"
            element={
            <ProtectedRoute>
                <Library />
            </ProtectedRoute>
            }
        />
        <Route
            path="/thumbnails"
            element={
            <ProtectedRoute>
                <Thumbnail />
            </ProtectedRoute>
            }
        />
        {/* Add more routes as you build them */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;