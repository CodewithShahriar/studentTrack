
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Mark, Student } from "@/data/mockData";
import GradeBadge from "./GradeBadge";
import MarksEditor from "./MarksEditor";

interface ResultRowProps {
  mark: Mark;
  student: Student | undefined;
  editingStudent: string | null;
  editedMarks: {
    classTests: number[];
    presentations: number[];
    classPerformance: number;
    midterm: number;
    finalExam: number;
  };
  totalMarks: number;
  grade: string;
  onStartEditing: (studentId: string, mark: Mark) => void;
  onSaveMarks: (studentId: string) => void;
  onMarkChange: (field: string, value: string | number, index?: number) => void;
}

const ResultRow: React.FC<ResultRowProps> = ({ 
  mark, 
  student, 
  editingStudent, 
  editedMarks,
  totalMarks,
  grade,
  onStartEditing, 
  onSaveMarks,
  onMarkChange
}) => {
  const isEditing = editingStudent === mark.studentId;

  return (
    <TableRow>
      <TableCell>
        <div>
          <p className="font-medium">{student?.name}</p>
          <p className="text-sm text-muted-foreground">{student?.id}</p>
        </div>
      </TableCell>
      
      <TableCell className="text-center">
        {isEditing ? (
          <div className="flex gap-1">
            {editedMarks.classTests.map((test: number, idx: number) => (
              <Input
                key={idx}
                type="number"
                min="0"
                max="10"
                value={test}
                onChange={(e) => onMarkChange("classTests", e.target.value, idx)}
                className="w-12 h-8 text-center p-1"
              />
            ))}
          </div>
        ) : (
          mark.classTests.join(", ")
        )}
      </TableCell>
      
      <TableCell className="text-center">
        {isEditing ? (
          <div className="flex gap-1">
            {editedMarks.presentations.map((presentation: number, idx: number) => (
              <Input
                key={idx}
                type="number"
                min="0"
                max="20"
                value={presentation}
                onChange={(e) => onMarkChange("presentations", e.target.value, idx)}
                className="w-12 h-8 text-center p-1"
              />
            ))}
          </div>
        ) : (
          mark.presentations.join(", ")
        )}
      </TableCell>
      
      <TableCell className="text-center">
        {isEditing ? (
          <Input
            type="number"
            min="0"
            max="10"
            value={editedMarks.classPerformance}
            onChange={(e) => onMarkChange("classPerformance", e.target.value)}
            className="w-16 h-8 text-center p-1 mx-auto"
          />
        ) : (
          mark.classPerformance
        )}
      </TableCell>
      
      <TableCell className="text-center">
        {isEditing ? (
          <Input
            type="number"
            min="0"
            max="30"
            value={editedMarks.midterm}
            onChange={(e) => onMarkChange("midterm", e.target.value)}
            className="w-16 h-8 text-center p-1 mx-auto"
          />
        ) : (
          mark.midterm
        )}
      </TableCell>
      
      <TableCell className="text-center">
        {isEditing ? (
          <Input
            type="number"
            min="0"
            max="50"
            value={editedMarks.finalExam}
            onChange={(e) => onMarkChange("finalExam", e.target.value)}
            className="w-16 h-8 text-center p-1 mx-auto"
          />
        ) : (
          mark.finalExam
        )}
      </TableCell>
      
      <TableCell className="text-center">
        <GradeBadge grade={grade} totalMarks={totalMarks} />
      </TableCell>
      
      <TableCell className="text-right">
        <MarksEditor 
          studentId={mark.studentId}
          isEditing={isEditing}
          editedMarks={editedMarks}
          onStartEditing={() => onStartEditing(mark.studentId, mark)}
          onSaveMarks={() => onSaveMarks(mark.studentId)}
          onMarkChange={onMarkChange}
        />
      </TableCell>
    </TableRow>
  );
};

// Add the missing import to avoid errors
import { Input } from "@/components/ui/input";

export default ResultRow;
