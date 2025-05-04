
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import AdminDashboard from "@/components/Dashboard/AdminDashboard";
import StudentDashboard from "@/components/Dashboard/StudentDashboard";

const Dashboard: React.FC = () => {
  const { currentUser, isAdmin } = useAuth();
  
  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {isAdmin ? <AdminDashboard /> : <StudentDashboard />}
    </div>
  );
};

export default Dashboard;
