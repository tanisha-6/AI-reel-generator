import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from '../pages/LandingPage';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import ProtectedRoute from './ProtectedRoute';

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
        {/* Add more routes as you build them */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;