import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from "react-router";
import Loader from '../components/loader';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader></Loader>
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;