
import React, { useMemo } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { students, courses, attendance, marks, calculateAttendanceRate, calculateTotalGrade } from "@/data/mockData";
import { ArrowLeft, Calendar, Edit } from "lucide-react";

const StudentDetail: React.FC = () => {
  const { id } = useParams();
  const { currentUser, isAdmin } = useAuth();
  
  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  // Only allow admin or the student themselves to view
  if (!isAdmin && currentUser.id !== id) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Find student data
  const student = students.find(s => s.id === id);
  if (!student) {
    return <div>Student not found.</div>;
  }
  
  // Get student marks
  const studentMarks = marks.filter(mark => mark.studentId === id);
  
  // Calculate overall stats
  const overallStats = useMemo(() => {
    if (!studentMarks.length) return { avgGrade: 'N/A', gpa: 0, totalCredits: 0 };
    
    let totalPoints = 0;
    let totalCredits = 0;
    
    studentMarks.forEach(mark => {
      const course = courses.find(c => c.id === mark.courseId);
      if (!course) return;
      
      const { grade } = calculateTotalGrade(mark);
      let gradePoint = 0;
      
      switch(grade) {
        case 'A': gradePoint = 4.0; break;
        case 'B': gradePoint = 3.0; break;
        case 'C': gradePoint = 2.0; break;
        case 'D': gradePoint = 1.0; break;
        default: gradePoint = 0;
      }
      
      totalPoints += gradePoint * course.creditHours;
      totalCredits += course.creditHours;
    });
    
    const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
    
    return { 
      gpa, 
      totalCredits,
      avgGrade: gpa >= 3.5 ? 'A' : gpa >= 2.5 ? 'B' : gpa >= 1.5 ? 'C' : gpa >= 0.5 ? 'D' : 'F'
    };
  }, [studentMarks]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <div className="flex items-center mb-2">
            <Link to="/students">
              <Button variant="ghost" size="sm" className="mr-2">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">{student.name}</h1>
          </div>
          <p className="text-muted-foreground">Student ID: {student.id}</p>
        </div>
        {isAdmin && (
          <Link to={`/students/edit/${id}`}>
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Edit Student
            </Button>
          </Link>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Program</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold">{student.program}</p>
            <p className="text-sm text-muted-foreground mt-1">Semester {student.semester}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">GPA</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold">{overallStats.gpa.toFixed(2)}</p>
            <Progress className="mt-2" value={overallStats.gpa * 25} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Badge className={`text-lg grade-${overallStats.avgGrade.toLowerCase()}`}>
                {overallStats.avgGrade}
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Credit Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold">{overallStats.totalCredits}</p>
            <p className="text-sm text-muted-foreground mt-1">Total enrolled</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="academic" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="academic">Academic Records</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="details">Personal Details</TabsTrigger>
        </TabsList>
        
        <TabsContent value="academic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Results</CardTitle>
              <CardDescription>Academic performance across all courses</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead className="text-center">Credits</TableHead>
                    <TableHead className="text-center">Class Tests</TableHead>
                    <TableHead className="text-center">Midterm</TableHead>
                    <TableHead className="text-center">Final</TableHead>
                    <TableHead className="text-center">Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentMarks.map(mark => {
                    const course = courses.find(c => c.id === mark.courseId);
                    if (!course) return null;
                    
                    const { totalMarks, grade } = calculateTotalGrade(mark);
                    
                    let gradeClass = '';
                    if (grade === 'A') gradeClass = 'grade-a';
                    else if (grade === 'B') gradeClass = 'grade-b';
                    else if (grade === 'C') gradeClass = 'grade-c';
                    else if (grade === 'D') gradeClass = 'grade-d';
                    else gradeClass = 'grade-f';
                    
                    return (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.name}</TableCell>
                        <TableCell>{course.code}</TableCell>
                        <TableCell className="text-center">{course.creditHours}</TableCell>
                        <TableCell className="text-center">{mark.classTests.join(', ')}</TableCell>
                        <TableCell className="text-center">{mark.midterm}</TableCell>
                        <TableCell className="text-center">{mark.finalExam}</TableCell>
                        <TableCell className="text-center">
                          <Badge className={`${gradeClass} px-2 py-1`}>
                            {totalMarks.toFixed(1)} ({grade})
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {studentMarks.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No course results available.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="attendance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Records</CardTitle>
              <CardDescription>Attendance history for all courses</CardDescription>
            </CardHeader>
            <CardContent>
              {studentMarks.map(mark => {
                const course = courses.find(c => c.id === mark.courseId);
                if (!course) return null;
                
                const attendanceRate = calculateAttendanceRate(id || "", course.id);
                let attendanceClass = '';
                if (attendanceRate >= 90) attendanceClass = 'attendance-good';
                else if (attendanceRate >= 75) attendanceClass = 'attendance-warning';
                else attendanceClass = 'attendance-danger';
                
                const courseAttendance = attendance.filter(
                  a => a.studentId === id && a.courseId === course.id
                ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                
                return (
                  <div key={course.id} className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{course.name} ({course.code})</h3>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className={attendanceClass}>{attendanceRate.toFixed(0)}% attendance</span>
                      </div>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-center">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {courseAttendance.map(record => {
                          let statusBadge;
                          if (record.status === 'present') {
                            statusBadge = <Badge className="bg-green-100 text-green-800">Present</Badge>;
                          } else if (record.status === 'late') {
                            statusBadge = <Badge className="bg-amber-100 text-amber-800">Late</Badge>;
                          } else {
                            statusBadge = <Badge className="bg-red-100 text-red-800">Absent</Badge>;
                          }
                          
                          return (
                            <TableRow key={`${record.courseId}-${record.date}`}>
                              <TableCell>
                                {new Date(record.date).toLocaleDateString('en-US', { 
                                  year: 'numeric', 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </TableCell>
                              <TableCell className="text-center">{statusBadge}</TableCell>
                            </TableRow>
                          );
                        })}
                        {courseAttendance.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={2} className="text-center py-4 text-muted-foreground">
                              No attendance records for this course.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Student's personal and contact details</CardDescription>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Full Name</dt>
                  <dd className="mt-1 text-lg">{student.name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Student ID</dt>
                  <dd className="mt-1 text-lg">{student.id}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                  <dd className="mt-1 text-lg">{student.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Program</dt>
                  <dd className="mt-1 text-lg">{student.program}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Current Semester</dt>
                  <dd className="mt-1 text-lg">{student.semester}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Enrollment Date</dt>
                  <dd className="mt-1 text-lg">
                    {new Date(student.enrollmentDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDetail;
