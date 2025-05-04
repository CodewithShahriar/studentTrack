
import React, { useMemo } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/AuthContext";
import { courses, students, calculateAttendanceRate, calculateTotalGrade, getStudentMarks } from "@/data/mockData";
import { Calendar, CheckCircle, AlertTriangle, Award, Book } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const StudentDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  
  // Find student data
  const studentData = useMemo(() => 
    students.find(student => student.id === currentUser?.id), 
  [currentUser]);
  
  // Get student marks
  const studentMarks = useMemo(() => 
    getStudentMarks(currentUser?.id || ""), 
  [currentUser]);
  
  // Calculate GPA
  const gpa = useMemo(() => {
    if (!studentMarks.length) return 0;
    
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
    
    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  }, [studentMarks]);

  if (!studentData) {
    return <div>Student data not found.</div>;
  }

  return (
    <div className="space-y-8">
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome, {studentData.name}</CardTitle>
          <CardDescription>Your academic dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="bg-white p-4 rounded-md shadow-sm flex-grow">
              <h3 className="font-medium text-sm text-muted-foreground mb-1">Student Details</h3>
              <p className="font-semibold text-lg">{studentData.name}</p>
              <div className="mt-2 space-y-1 text-sm">
                <p><span className="text-muted-foreground">ID:</span> {studentData.id}</p>
                <p><span className="text-muted-foreground">Program:</span> {studentData.program}</p>
                <p><span className="text-muted-foreground">Semester:</span> {studentData.semester}</p>
                <p><span className="text-muted-foreground">Email:</span> {studentData.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
              <div className="bg-white p-4 rounded-md shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground mb-1">GPA</h3>
                    <p className="font-semibold text-2xl">{gpa.toFixed(2)}</p>
                  </div>
                  <Award className="text-primary h-8 w-8" />
                </div>
                <Progress className="mt-2" value={gpa * 25} />
              </div>
              <div className="bg-white p-4 rounded-md shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground mb-1">Courses</h3>
                    <p className="font-semibold text-2xl">{studentMarks.length}</p>
                  </div>
                  <Book className="text-primary h-8 w-8" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Currently enrolled</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="performance">Course Performance</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Marks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead className="hidden md:table-cell">Code</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead className="text-center">Current Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentMarks.map((mark) => {
                    const course = courses.find(c => c.id === mark.courseId);
                    if (!course) return null;
                    
                    const attendanceRate = calculateAttendanceRate(currentUser?.id || "", course.id);
                    const { grade } = calculateTotalGrade(mark);
                    
                    let attendanceClass = '';
                    if (attendanceRate >= 90) attendanceClass = 'attendance-good';
                    else if (attendanceRate >= 75) attendanceClass = 'attendance-warning';
                    else attendanceClass = 'attendance-danger';
                    
                    let gradeClass = '';
                    if (grade === 'A') gradeClass = 'grade-a';
                    else if (grade === 'B') gradeClass = 'grade-b';
                    else if (grade === 'C') gradeClass = 'grade-c';
                    else if (grade === 'D') gradeClass = 'grade-d';
                    else gradeClass = 'grade-f';
                    
                    return (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.name}</TableCell>
                        <TableCell className="hidden md:table-cell">{course.code}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {attendanceRate >= 75 ? (
                              <CheckCircle size={16} className="text-green-600 mr-2" />
                            ) : (
                              <AlertTriangle size={16} className="text-amber-500 mr-2" />
                            )}
                            <span className={attendanceClass}>{attendanceRate.toFixed(0)}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className={`${gradeClass} px-2 py-1`}>
                            {grade}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {studentMarks.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                        No course data available.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="py-4">
              <p className="text-sm text-muted-foreground">
                <Calendar className="inline mr-1 h-4 w-4" />
                Last updated: May 3, 2025
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="detailed">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Marks Breakdown</CardTitle>
              <CardDescription>Complete view of all your academic marks</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead>Class Tests</TableHead>
                      <TableHead>Presentations</TableHead>
                      <TableHead>Class Performance</TableHead>
                      <TableHead>Midterm</TableHead>
                      <TableHead>Final Exam</TableHead>
                      <TableHead>Total Marks</TableHead>
                      <TableHead>Grade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentMarks.map((mark) => {
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
                          <TableCell className="font-medium">
                            {course.name}
                            <div className="text-xs text-muted-foreground">{course.code}</div>
                          </TableCell>
                          <TableCell>{mark.classTests.join(', ')}</TableCell>
                          <TableCell>{mark.presentations.join(', ')}</TableCell>
                          <TableCell>{mark.classPerformance}</TableCell>
                          <TableCell>{mark.midterm}</TableCell>
                          <TableCell>{mark.finalExam}</TableCell>
                          <TableCell className="font-semibold">{totalMarks.toFixed(1)}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={`${gradeClass} px-2 py-1`}>
                              {grade}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {studentMarks.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                          No detailed marks available.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="py-4 flex justify-between">
              <p className="text-sm text-muted-foreground">
                <Calendar className="inline mr-1 h-4 w-4" />
                Last updated: May 3, 2025
              </p>
              <p className="text-sm text-muted-foreground">
              If you have any issues with your marks, please contact your CR
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDashboard;
