
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LoginForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("admin");
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [studentId, setStudentId] = useState<string>("");
  const [studentName, setStudentName] = useState<string>("");
  
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(userId, password)) {
      navigate("/dashboard");
    }
  };
  
  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(studentId, studentName)) {
      navigate("/dashboard");
    }
  };
  
  return (
    <div className="max-w-md w-full">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">StudentTrack</CardTitle>
          <CardDescription>Login to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="admin" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="admin">Admin</TabsTrigger>
              <TabsTrigger value="student">Student</TabsTrigger>
            </TabsList>
            
            <TabsContent value="admin">
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="adminId">Admin ID</Label>
                  <Input 
                    id="adminId"
                    type="text" 
                    placeholder="Enter your admin ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminPassword">Password</Label>
                  <Input 
                    id="adminPassword"
                    type="password" 
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Login as Admin</Button>
              </form>
            </TabsContent>
            
            <TabsContent value="student">
              <form onSubmit={handleStudentLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input 
                    id="studentId"
                    type="text" 
                    placeholder="Enter your student ID"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="studentName">Password</Label>
                  <Input 
                    id="studentName"
                    type="password" 
                    placeholder="Enter your password"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Login as Student</Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          {/* <p>Demo credentials - Admin: admin1/admin123, Student: ST001/john123</p> */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;
