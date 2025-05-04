
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Course } from "@/data/mockData";

interface CourseSelectorProps {
  courses: Course[];
  selectedCourse: string;
  onCourseChange: (courseId: string) => void;
}

const CourseSelector: React.FC<CourseSelectorProps> = ({
  courses,
  selectedCourse,
  onCourseChange,
}) => {
  return (
    <div className="space-y-2 max-w-md">
      <Label htmlFor="course-select">Course</Label>
      <Select
        value={selectedCourse}
        onValueChange={onCourseChange}
      >
        <SelectTrigger id="course-select">
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
  );
};

export default CourseSelector;
