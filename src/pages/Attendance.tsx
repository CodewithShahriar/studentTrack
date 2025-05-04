
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import AttendanceTable from "@/components/Attendance/AttendanceTable";

const Attendance: React.FC = () => {
  const { currentUser, isAdmin } = useAuth();
  
  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  // Redirect to dashboard if not admin
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Attendance Management</h1>
      <AttendanceTable />
    </div>
  );
};

export default Attendance;
