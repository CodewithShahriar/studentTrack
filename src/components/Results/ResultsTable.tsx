
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
import { useToast } from "@/components/ui/use-toast";
import { courses, students, marks, calculateTotalGrade } from "@/data/mockData";
import CourseSelector from "./CourseSelector";
import ResultRow from "./ResultRow";

const ResultsTable: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState(courses[0].id);
  const [editingStudent, setEditingStudent] = useState<string | null>(null);
  const [editedMarks, setEditedMarks] = useState<Record<string, any>>({});
  const [marksData, setMarksData] = useState([...marks]);
  const { toast } = useToast();
  
  const courseMarks = marksData.filter(mark => mark.courseId === selectedCourse);
  
  const startEditing = (studentId: string, mark: typeof marks[0]) => {
    setEditingStudent(studentId);
    setEditedMarks({
      classTests: [...mark.classTests],
      presentations: [...mark.presentations],
      classPerformance: mark.classPerformance,
      midterm: mark.midterm,
      finalExam: mark.finalExam
    });
  };
  
  const handleMarkChange = (field: string, value: string | number, index?: number) => {
    if (field === "classTests" || field === "presentations") {
      const newArray = [...editedMarks[field]];
      if (index !== undefined) {
        newArray[index] = Number(value);
        setEditedMarks({...editedMarks, [field]: newArray});
      }
    } else {
      setEditedMarks({...editedMarks, [field]: Number(value)});
    }
  };
  
  const saveMarks = (studentId: string) => {
    // Find the mark index to update
    const markIndex = marksData.findIndex(
      mark => mark.studentId === studentId && mark.courseId === selectedCourse
    );
    
    if (markIndex !== -1) {
      // Update existing mark
      const updatedMarks = [...marksData];
      updatedMarks[markIndex] = {
        ...updatedMarks[markIndex],
        classTests: [...editedMarks.classTests],
        presentations: [...editedMarks.presentations],
        classPerformance: editedMarks.classPerformance,
        midterm: editedMarks.midterm,
        finalExam: editedMarks.finalExam
      };
      
      setMarksData(updatedMarks);
    } else {
      // Create new mark
      const newMark = {
        id: `mark-${marksData.length + 1}`,
        courseId: selectedCourse,
        studentId: studentId,
        classTests: [...editedMarks.classTests],
        presentations: [...editedMarks.presentations],
        classPerformance: editedMarks.classPerformance,
        midterm: editedMarks.midterm,
        finalExam: editedMarks.finalExam
      };
      
      setMarksData([...marksData, newMark]);
    }
    
    toast({
      title: "Marks updated",
      description: `Updated marks for student ${studentId}.`,
    });
    
    setEditingStudent(null);
  };

  return (
    <div className="space-y-6">
      <CourseSelector 
        courses={courses}
        selectedCourse={selectedCourse}
        onCourseChange={setSelectedCourse}
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Student Results</CardTitle>
          <CardDescription>
            {courses.find(c => c.id === selectedCourse)?.name} - Manage student marks and grades
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead className="text-center">Tests (10%)</TableHead>
                <TableHead className="text-center">Presentations (10%)</TableHead>
                <TableHead className="text-center">Class Performance (10%)</TableHead>
                <TableHead className="text-center">Midterm (20%)</TableHead>
                <TableHead className="text-center">Final Exam (40%)</TableHead>
                <TableHead className="text-center">Total</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courseMarks.map((mark) => {
                const student = students.find(s => s.id === mark.studentId);
                const { totalMarks, grade } = calculateTotalGrade(mark);
                
                return (
                  <ResultRow
                    key={mark.studentId}
                    mark={mark}
                    student={student}
                    editingStudent={editingStudent}
                    editedMarks={editedMarks}
                    totalMarks={totalMarks}
                    grade={grade}
                    onStartEditing={startEditing}
                    onSaveMarks={saveMarks}
                    onMarkChange={handleMarkChange}
                  />
                );
              })}
              {courseMarks.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No results found for this course.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsTable;
