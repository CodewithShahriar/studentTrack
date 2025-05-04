
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { students, courses, calculateAttendanceRate, calculateTotalGrade, getStudentMarks } from "@/data/mockData";
import { Award, Users, Book, Calendar, Plus, Search } from "lucide-react";

const AdminDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter students based on search term
  const filteredStudents = students.filter(
    student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get the top 5 students or all if filtered
  const displayedStudents = searchTerm 
    ? filteredStudents
    : students.slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users size={20} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active enrollment
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Courses
            </CardTitle>
            <Book size={20} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently offered
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Attendance
            </CardTitle>
            <Calendar size={20} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Overall attendance rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Excellent Students
            </CardTitle>
            <Award size={20} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground mt-1">
              Students with A+ grade
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Student Overview</h2>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-8 w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Link to="/students/new">
              <Button size="sm">
                <Plus className="mr-1 h-4 w-4" /> Add Student
              </Button>
            </Link>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.program}</TableCell>
                    <TableCell className="hidden md:table-cell">{student.email}</TableCell>
                    <TableCell className="text-right">
                      <Link to={`/students/${student.id}`}>
                        <Button variant="outline" size="sm">View Details</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
                {displayedStudents.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No students found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between py-4">
            <p className="text-sm text-muted-foreground">
              Showing {displayedStudents.length} of {students.length} students
            </p>
            <Link to="/students">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
