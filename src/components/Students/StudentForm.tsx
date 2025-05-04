
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { students } from "@/data/mockData";
import { useToast } from "@/components/ui/use-toast";

interface StudentFormProps {
  mode: "create" | "edit";
}

const StudentForm: React.FC<StudentFormProps> = ({ mode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [studentsData, setStudentsData] = useState([...students]);
  
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    program: "",
    semester: "1",
    enrollmentDate: ""
  });
  
  useEffect(() => {
    // If editing, load student data
    if (mode === "edit" && id) {
      const student = studentsData.find(s => s.id === id);
      if (student) {
        setFormData({
          id: student.id,
          name: student.name,
          email: student.email,
          program: student.program,
          semester: student.semester.toString(),
          enrollmentDate: student.enrollmentDate
        });
      }
    } else if (mode === "create") {
      // For create mode, generate a new student ID
      setFormData({
        ...formData,
        id: `ST${(studentsData.length + 1).toString().padStart(3, '0')}`,
        enrollmentDate: new Date().toISOString().split('T')[0]
      });
    }
  }, [mode, id, studentsData]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create the new student object with proper types
    const newStudent = {
      id: formData.id,
      name: formData.name,
      email: formData.email,
      program: formData.program,
      semester: parseInt(formData.semester),
      enrollmentDate: formData.enrollmentDate
    };
    
    // In a real app, this would save to the database
    if (mode === "create") {
      // Add new student
      setStudentsData([...studentsData, newStudent]);
      toast({
        title: "Student created successfully!",
        description: `${formData.name} (${formData.id}) has been added to the system.`,
      });
    } else {
      // Update existing student
      const updatedStudents = studentsData.map(student => 
        student.id === formData.id ? newStudent : student
      );
      setStudentsData(updatedStudents);
      toast({
        title: "Student updated successfully!",
        description: `${formData.name} (${formData.id}) has been updated in the system.`,
      });
    }
    
    // Redirect back to students list
    navigate("/students");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{mode === "create" ? "Add New Student" : "Edit Student"}</CardTitle>
          <CardDescription>
            {mode === "create" 
              ? "Enter the details for the new student." 
              : "Update the student information."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="id">Student ID</Label>
              <Input
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
                required
                disabled={mode === "edit"}
                placeholder="Student ID"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Student's full name"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="student@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="program">Program</Label>
              <Select
                value={formData.program}
                onValueChange={(value) => handleSelectChange("program", value)}
              >
                <SelectTrigger id="program">
                  <SelectValue placeholder="Select program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                  <SelectItem value="Business Administration">Business Administration</SelectItem>
                  <SelectItem value="Psychology">Psychology</SelectItem>
                  <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="semester">Semester</Label>
              <Select
                value={formData.semester}
                onValueChange={(value) => handleSelectChange("semester", value)}
              >
                <SelectTrigger id="semester">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <SelectItem key={sem} value={sem.toString()}>
                      Semester {sem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="enrollmentDate">Enrollment Date</Label>
              <Input
                id="enrollmentDate"
                name="enrollmentDate"
                type="date"
                value={formData.enrollmentDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            type="button"
            onClick={() => navigate("/students")}
          >
            Cancel
          </Button>
          <Button type="submit">
            {mode === "create" ? "Create Student" : "Update Student"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default StudentForm;
