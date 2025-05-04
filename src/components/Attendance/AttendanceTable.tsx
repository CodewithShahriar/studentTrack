
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { students, courses, attendance, calculateAttendanceRate } from "@/data/mockData";
import { AlertTriangle, Calendar, Check, CheckCircle, Clock, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Define the type based on what's in the attendance array
type AttendanceRecord = typeof attendance[0];

const AttendanceTable: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState(courses[0].id);
  const [selectedDate, setSelectedDate] = useState("");
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([...attendance]);
  const { toast } = useToast();
  
  // Group attendance records by date
  const attendanceByDate = attendanceData
    .filter(record => record.courseId === selectedCourse)
    .reduce<Record<string, AttendanceRecord[]>>((acc, record) => {
      if (!acc[record.date]) {
        acc[record.date] = [];
      }
      acc[record.date].push(record);
      return acc;
    }, {});
  
  // Get unique dates sorted in descending order
  const dates = Object.keys(attendanceByDate).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );
  
  const handleSaveAttendance = (studentId: string, status: 'present' | 'absent' | 'late') => {
    if (!selectedDate) {
      toast({
        title: "Date not selected",
        description: "Please select a date before saving attendance.",
        variant: "destructive",
      });
      return;
    }
    
    // Find if there's an existing record
    const recordIndex = attendanceData.findIndex(
      r => r.studentId === studentId && r.date === selectedDate && r.courseId === selectedCourse
    );
    
    // Update existing or create new
    if (recordIndex >= 0) {
      const updatedAttendance = [...attendanceData];
      updatedAttendance[recordIndex] = {
        ...updatedAttendance[recordIndex],
        status
      };
      setAttendanceData(updatedAttendance);
    } else {
      // Add new attendance record with the same structure as existing records
      setAttendanceData([
        ...attendanceData,
        {
          courseId: selectedCourse,
          studentId,
          date: selectedDate,
          status
        } as AttendanceRecord
      ]);
    }
    
    toast({
      title: "Attendance saved",
      description: `Updated attendance for student ${studentId} to ${status}.`,
    });
  };
  
  const handleMarkAll = (status: 'present' | 'absent' | 'late') => {
    if (!selectedDate) {
      toast({
        title: "Date not selected",
        description: "Please select a date before marking all.",
        variant: "destructive",
      });
      return;
    }
    
    // Create a new attendance array with updated records
    const updatedAttendance = [...attendanceData];
    
    // For each student, update or create attendance record
    students.forEach(student => {
      const recordIndex = updatedAttendance.findIndex(
        r => r.studentId === student.id && r.date === selectedDate && r.courseId === selectedCourse
      );
      
      if (recordIndex >= 0) {
        // Update existing record
        updatedAttendance[recordIndex] = {
          ...updatedAttendance[recordIndex],
          status
        };
      } else {
        // Add new record
        updatedAttendance.push({
          courseId: selectedCourse,
          studentId: student.id,
          date: selectedDate,
          status
        } as AttendanceRecord);
      }
    });
    
    setAttendanceData(updatedAttendance);
    
    toast({
      title: "Bulk update successful",
      description: `Marked all students as ${status}.`,
    });
  };
  
  const getAttendanceStatus = (studentId: string): 'present' | 'absent' | 'late' | undefined => {
    if (!selectedDate) return undefined;
    
    const record = attendanceData.find(
      r => r.studentId === studentId && r.date === selectedDate && r.courseId === selectedCourse
    );
    
    return record?.status;
  };
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Add new date function
  const handleAddNewDate = () => {
    // Get current date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    
    // Check if this date already exists
    if (!dates.includes(today)) {
      setSelectedDate(today);
      toast({
        title: "New date added",
        description: `Added attendance sheet for ${formatDate(today)}.`,
      });
    } else {
      setSelectedDate(today);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end gap-6">
        <div className="space-y-2">
          <Label htmlFor="course-select">Course</Label>
          <Select
            value={selectedCourse}
            onValueChange={setSelectedCourse}
          >
            <SelectTrigger id="course-select" className="w-full md:w-[250px]">
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map((course) => (
                <SelectItem key={course.id} value={course.id}>
                  {course.code} - {course.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="date-select">Date</Label>
          <div className="flex gap-2">
            <Select
              value={selectedDate}
              onValueChange={setSelectedDate}
            >
              <SelectTrigger id="date-select" className="w-full md:w-[250px]">
                <SelectValue placeholder="Select date" />
              </SelectTrigger>
              <SelectContent>
                {dates.map((date) => (
                  <SelectItem key={date} value={date}>
                    {formatDate(date)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div>
              <Button variant="outline" onClick={handleAddNewDate}>
                <Calendar className="h-4 w-4 mr-2" /> Add New Date
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Attendance Records</CardTitle>
          <CardDescription>
            {selectedCourse && courses.find(c => c.id === selectedCourse)?.name}
            {selectedDate && ` - ${formatDate(selectedDate)}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedDate ? (
            <>
              <div className="flex justify-end mb-4 space-x-2">
                <Button size="sm" variant="outline" className="bg-green-50" onClick={() => handleMarkAll('present')}>
                  <Check className="h-4 w-4 mr-1 text-green-600" /> Mark All Present
                </Button>
                <Button size="sm" variant="outline" className="bg-amber-50" onClick={() => handleMarkAll('late')}>
                  <Clock className="h-4 w-4 mr-1 text-amber-600" /> Mark All Late
                </Button>
                <Button size="sm" variant="outline" className="bg-red-50" onClick={() => handleMarkAll('absent')}>
                  <X className="h-4 w-4 mr-1 text-red-600" /> Mark All Absent
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Overall Attendance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => {
                    const attendanceStatus = getAttendanceStatus(student.id);
                    const attendanceRate = calculateAttendanceRate(student.id, selectedCourse);
                    
                    let statusBadge;
                    if (attendanceStatus === 'present') {
                      statusBadge = <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Present</Badge>;
                    } else if (attendanceStatus === 'late') {
                      statusBadge = <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Late</Badge>;
                    } else if (attendanceStatus === 'absent') {
                      statusBadge = <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Absent</Badge>;
                    } else {
                      statusBadge = <Badge variant="outline">Not Recorded</Badge>;
                    }
                    
                    let attendanceClass = '';
                    if (attendanceRate >= 90) attendanceClass = 'attendance-good';
                    else if (attendanceRate >= 75) attendanceClass = 'attendance-warning';
                    else attendanceClass = 'attendance-danger';
                    
                    return (
                      <TableRow key={student.id}>
                        <TableCell>{student.id}</TableCell>
                        <TableCell>{student.name}</TableCell>
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
                        <TableCell>{statusBadge}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              className="h-8 w-8 p-0 text-green-600"
                              onClick={() => handleSaveAttendance(student.id, 'present')}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              className="h-8 w-8 p-0 text-amber-600"
                              onClick={() => handleSaveAttendance(student.id, 'late')}
                            >
                              <Clock className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              className="h-8 w-8 p-0 text-red-600"
                              onClick={() => handleSaveAttendance(student.id, 'absent')}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-2 opacity-30" />
              <p>Please select a date to view or record attendance.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceTable;
