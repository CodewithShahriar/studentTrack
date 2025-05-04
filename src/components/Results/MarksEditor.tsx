
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit, Save } from "lucide-react";

interface MarksEditorProps {
  studentId: string;
  isEditing: boolean;
  editedMarks: {
    classTests: number[];
    presentations: number[];
    classPerformance: number;
    midterm: number;
    finalExam: number;
  };
  onStartEditing: () => void;
  onSaveMarks: () => void;
  onMarkChange: (field: string, value: string | number, index?: number) => void;
}

const MarksEditor: React.FC<MarksEditorProps> = ({
  studentId,
  isEditing,
  editedMarks,
  onStartEditing,
  onSaveMarks,
  onMarkChange,
}) => {
  if (isEditing) {
    return (
      <>
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
        
        <Input
          type="number"
          min="0"
          max="10"
          value={editedMarks.classPerformance}
          onChange={(e) => onMarkChange("classPerformance", e.target.value)}
          className="w-16 h-8 text-center p-1 mx-auto"
        />
        
        <Input
          type="number"
          min="0"
          max="30"
          value={editedMarks.midterm}
          onChange={(e) => onMarkChange("midterm", e.target.value)}
          className="w-16 h-8 text-center p-1 mx-auto"
        />
        
        <Input
          type="number"
          min="0"
          max="50"
          value={editedMarks.finalExam}
          onChange={(e) => onMarkChange("finalExam", e.target.value)}
          className="w-16 h-8 text-center p-1 mx-auto"
        />
        
        <Button
          size="sm"
          onClick={onSaveMarks}
          className="h-8 w-8 p-0"
        >
          <Save className="h-4 w-4" />
        </Button>
      </>
    );
  }
  
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onStartEditing}
      className="h-8 w-8 p-0"
    >
      <Edit className="h-4 w-4" />
    </Button>
  );
};

export default MarksEditor;
