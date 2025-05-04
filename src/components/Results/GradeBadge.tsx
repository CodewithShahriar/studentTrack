
import React from "react";
import { Badge } from "@/components/ui/badge";

interface GradeBadgeProps {
  grade: string;
  totalMarks: number;
}

const GradeBadge: React.FC<GradeBadgeProps> = ({ grade, totalMarks }) => {
  const getGradeClass = (grade: string): string => {
    switch(grade) {
      case 'A+': return 'grade-a+';
      case 'A': return 'grade-a';
      case 'A-': return 'grade-a-';
      case 'B+': return 'grade-b+';
      case 'B': return 'grade-b';
      case 'B-': return 'grade-b-';
      case 'C+': return 'grade-c+';
      case 'C': return 'grade-c';
      default: return 'grade-f';
    }
  };

  return (
    <Badge className={`${getGradeClass(grade)} px-2 py-1`}>
      {totalMarks.toFixed(1)} ({grade})
    </Badge>
  );
};

export default GradeBadge;
