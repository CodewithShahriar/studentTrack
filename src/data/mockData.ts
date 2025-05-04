
// Types for our data
export interface User {
  id: string;
  name: string;
  password?: string;
  role: 'admin' | 'student';
}

export interface Student {
  id: string;
  name: string;
  email: string;
  program: string;
  semester: number;
  enrollmentDate: string;
}

export interface AttendanceRecord {
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  courseId: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  creditHours: number;
}

export interface Mark {
  studentId: string;
  courseId: string;
  classTests: number[];
  presentations: number[];
  classPerformance: number;
  midterm: number;
  finalExam: number;
}

// Mock users for authentication
export const users: User[] = [
  { id: "admin1", name: "Admin User", password: "admin123", role: "admin" },
  { id: "232-115-005", name: "Mehedi Hasan", password: "mehedi005", role: "student" },
  { id: "232-115-006", name: "Mehrab Hasan", password: "mehrab006", role: "student" },
  { id: "232-115-008", name: "Navid Zaman Khan", password: "navid008", role: "student" },
  { id: "232-115-009", name: "Mona Akther Jui", password: "jui009", role: "student" },
  { id: "232-115-011", name: "Sadman Sakib", password: "sadman011", role: "student" },
];

// Mock student data
export const students: Student[] = [
  { 
    id: "232-115-005", 
    name: "Mehedi Hasan", 
    email: "mehedi.hasan@example.com", 
    program: "Computer Science and Engineering", 
    semester: 1, 
    enrollmentDate: "2022-01-15" 
  },
  { 
    id: "232-115-006", 
    name: "Mehrab Hasan", 
    email: "mehrab.hasan@example.com", 
    program: "Computer Science and Engineering", 
    semester: 1, 
    enrollmentDate: "2022-01-15" 
  },
  { 
    id: "232-115-008", 
    name: "Navid Zaman Khan", 
    email: "navid.khan@example.com", 
    program: "Computer Science and Engineering", 
    semester: 1, 
    enrollmentDate: "2022-01-15" 
  },
  { 
    id: "232-115-009", 
    name: "Mona Akther Jui", 
    email: "mona.jui@example.com", 
    program: "Computer Science and Engineering", 
    semester: 1, 
    enrollmentDate: "2022-01-15" 
  },
  { 
    id: "232-115-011", 
    name: "Sadman Sakib", 
    email: "sadman.sakib@example.com", 
    program: "Computer Science and Engineering", 
    semester: 1, 
    enrollmentDate: "2022-01-15" 
  },
];

// Mock courses
export const courses: Course[] = [
  { id: "CSE200", code: "CSE200", name: "Competitive Programming", creditHours: 3 },
  { id: "MAT216", code: "MAT216", name: "Geometry and Vector Analysis", creditHours: 3 },
  { id: "CSE231", code: "CSE231", name: "Algorithm Design and Analysis", creditHours: 3 },
  { id: "CSE211", code: "CSE211", name: "Digital Logic and Design", creditHours: 3 },
  { id: "GED431", code: "GED431", name: "Business Communication", creditHours: 3 },
];

// Updated attendance
export const attendance: AttendanceRecord[] = [
  // Mehedi Hasan's attendance for CSE200
  { studentId: "232-115-005", date: "2023-10-01", status: "present", courseId: "CSE200" },
  { studentId: "232-115-005", date: "2023-10-03", status: "present", courseId: "CSE200" },
  { studentId: "232-115-005", date: "2023-10-05", status: "absent", courseId: "CSE200" },
  { studentId: "232-115-005", date: "2023-10-08", status: "present", courseId: "CSE200" },
  { studentId: "232-115-005", date: "2023-10-10", status: "present", courseId: "CSE200" },
  { studentId: "232-115-005", date: "2023-10-12", status: "late", courseId: "CSE200" },
  { studentId: "232-115-005", date: "2023-10-15", status: "present", courseId: "CSE200" },
  { studentId: "232-115-005", date: "2023-10-17", status: "present", courseId: "CSE200" },
  { studentId: "232-115-005", date: "2023-10-19", status: "present", courseId: "CSE200" },
  { studentId: "232-115-005", date: "2023-10-22", status: "absent", courseId: "CSE200" },

  // Mehedi Hasan's attendance for CSE231
  { studentId: "232-115-005", date: "2023-10-02", status: "present", courseId: "CSE231" },
  { studentId: "232-115-005", date: "2023-10-04", status: "present", courseId: "CSE231" },
  { studentId: "232-115-005", date: "2023-10-06", status: "present", courseId: "CSE231" },
  { studentId: "232-115-005", date: "2023-10-09", status: "late", courseId: "CSE231" },
  { studentId: "232-115-005", date: "2023-10-11", status: "present", courseId: "CSE231" },
  { studentId: "232-115-005", date: "2023-10-13", status: "present", courseId: "CSE231" },
  { studentId: "232-115-005", date: "2023-10-16", status: "absent", courseId: "CSE231" },
  { studentId: "232-115-005", date: "2023-10-18", status: "present", courseId: "CSE231" },
  { studentId: "232-115-005", date: "2023-10-20", status: "present", courseId: "CSE231" },
  { studentId: "232-115-005", date: "2023-10-23", status: "present", courseId: "CSE231" },

  // Mehrab Hasan's attendance for CSE200
  { studentId: "232-115-006", date: "2023-10-01", status: "present", courseId: "CSE200" },
  { studentId: "232-115-006", date: "2023-10-03", status: "present", courseId: "CSE200" },
  { studentId: "232-115-006", date: "2023-10-05", status: "present", courseId: "CSE200" },
  { studentId: "232-115-006", date: "2023-10-08", status: "present", courseId: "CSE200" },
  { studentId: "232-115-006", date: "2023-10-10", status: "late", courseId: "CSE200" },
  { studentId: "232-115-006", date: "2023-10-12", status: "present", courseId: "CSE200" },
  { studentId: "232-115-006", date: "2023-10-15", status: "absent", courseId: "CSE200" },
  { studentId: "232-115-006", date: "2023-10-17", status: "present", courseId: "CSE200" },
  { studentId: "232-115-006", date: "2023-10-19", status: "present", courseId: "CSE200" },
  { studentId: "232-115-006", date: "2023-10-22", status: "present", courseId: "CSE200" },
];

// Updated mock marks
export const marks: Mark[] = [
  {
    studentId: "232-115-005",
    courseId: "CSE200",
    classTests: [8, 7, 9],
    presentations: [16, 18],
    classPerformance: 9,
    midterm: 23,
    finalExam: 43
  },
  {
    studentId: "232-115-005",
    courseId: "CSE231",
    classTests: [6, 7, 8],
    presentations: [15, 14],
    classPerformance: 8,
    midterm: 21,
    finalExam: 38
  },
  {
    studentId: "232-115-006",
    courseId: "CSE200",
    classTests: [9, 8, 10],
    presentations: [18, 19],
    classPerformance: 9,
    midterm: 25,
    finalExam: 46
  },
  {
    studentId: "232-115-006",
    courseId: "CSE211",
    classTests: [7, 8, 6],
    presentations: [16, 15],
    classPerformance: 7,
    midterm: 22,
    finalExam: 40
  },
  {
    studentId: "232-115-008",
    courseId: "GED431",
    classTests: [8, 9, 7],
    presentations: [17, 16],
    classPerformance: 8,
    midterm: 24,
    finalExam: 42
  },
];

// Helper function to calculate student's attendance rate
export const calculateAttendanceRate = (studentId: string, courseId: string): number => {
  const studentAttendance = attendance.filter(
    a => a.studentId === studentId && a.courseId === courseId
  );
  
  if (studentAttendance.length === 0) return 0;
  
  const totalClasses = studentAttendance.length;
  const presentClasses = studentAttendance.filter(a => a.status === "present" || a.status === "late").length;
  
  return (presentClasses / totalClasses) * 100;
};

// Helper function to calculate student's total grade
export const calculateTotalGrade = (mark: Mark): { totalMarks: number; grade: string } => {
  const classTestTotal = mark.classTests.reduce((sum, mark) => sum + mark, 0);
  const presentationsTotal = mark.presentations.reduce((sum, mark) => sum + mark, 0);
  
  // Assuming: class tests (10% each), presentations (10% each), class performance (10%), midterm (20%), final (40%)
  const totalMarks = 
    (classTestTotal / mark.classTests.length) + // Average of class tests (out of 10)
    (presentationsTotal / mark.presentations.length) + // Average of presentations (out of 10)
    mark.classPerformance + // Class performance (out of 10)
    (mark.midterm * 2) / 10 + // Midterm converted to out of 10
    (mark.finalExam * 4) / 10; // Final exam converted to out of 10
    
  // Grade calculation based on percentage
  const percentage = (totalMarks / 10) * 100;
  
  let grade;
  if (percentage >= 90) grade = 'A';
  else if (percentage >= 80) grade = 'B';
  else if (percentage >= 70) grade = 'C';
  else if (percentage >= 60) grade = 'D';
  else grade = 'F';
  
  return { totalMarks, grade };
};

// Helper function to get student marks by ID
export const getStudentMarks = (studentId: string): Mark[] => {
  return marks.filter(mark => mark.studentId === studentId);
};
