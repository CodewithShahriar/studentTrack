
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
  { id: "232-115-001", name: "Athia Jannat Sami", password: "athia001", role: "student" },
  { id: "232-115-003", name: "Fatema Begum", password: "fatema003", role: "student" },
  { id: "232-115-005", name: "Mehedi Hasan", password: "mehedi005", role: "student" },
  { id: "232-115-006", name: "Md. Mehrab Hasan Akhanjee", password: "mehrab006", role: "student" },
  { id: "232-115-008", name: "Md. Navid Zaman Khan", password: "navid008", role: "student" },
  { id: "232-115-010", name: "Rita Begum", password: "rita010", role: "student" },
  { id: "232-115-011", name: "Sadman Sakib Khan", password: "sadman011", role: "student" },
  { id: "232-115-013", name: "Jibran Masum Didar", password: "jibran013", role: "student" },
  { id: "232-115-015", name: "Md. Masudul Hasan Akib", password: "akib015", role: "student" },
  { id: "232-115-016", name: "Najia Akter Lubna", password: "lubna016", role: "student" },
  { id: "232-115-017", name: "Halima Jahan Chowdhury", password: "halima017", role: "student" },
  { id: "232-115-018", name: "Mehedi Hasan Emon", password: "emon018", role: "student" },
  { id: "232-115-019", name: "Fatema Jannat Ema", password: "ema019", role: "student" },
  { id: "232-115-020", name: "Md. Udoy Hossain Tahim", password: "tahim020", role: "student" },
  { id: "232-115-022", name: "Abid Shahriar", password: "abid022", role: "student" },
  { id: "232-115-025", name: "Samiya Rahman Bushra", password: "bushra025", role: "student" },
  { id: "232-115-028", name: "Fahima Akter", password: "fahima028", role: "student" },
  { id: "232-115-030", name: "Sukta Rani Chandra", password: "sukta030", role: "student" },
  { id: "232-115-031", name: "Nadia Muntaha", password: "nadia031", role: "student" },
  { id: "232-115-032", name: "Shamsun Naher", password: "naher032", role: "student" },
  { id: "232-115-033", name: "Arshika Noor", password: "arshika033", role: "student" },
  { id: "232-115-034", name: "Anij Fatema Lisa", password: "lisa034", role: "student" },
  { id: "232-115-035", name: "Samiha Jannah Najah", password: "samiha035", role: "student" },
  { id: "232-115-036", name: "Mahbuba Khanom Mumu", password: "mumu036", role: "student" },
  { id: "232-115-038", name: "Sumaya Akther Rose", password: "sumaya038", role: "student" },
  { id: "232-115-039", name: "Sadia Sharmin Tumpa", password: "tumpa039", role: "student" },
  { id: "232-115-040", name: "Jannatul Fardous", password: "fardous040", role: "student" },
  { id: "admin1", name: "Admin User", password: "admin123", role: "admin" }
];


// Mock student data
export const students: Student[] = [
  { id: "232-115-001", name: "Athia Jannat Sami", email: "athia001@example.com", program: "Computer Science and Engineering", semester: 4, enrollmentDate: "2023-09-01" },
  { id: "232-115-003", name: "Fatema Begum", email: "fatema003@example.com", program: "Computer Science and Engineering", semester: 4, enrollmentDate: "2023-09-01" },
  { id: "232-115-005", name: "Mehedi Hasan", email: "mehedi005@example.com", program: "Computer Science and Engineering", semester: 4, enrollmentDate: "2023-09-01" },
  { id: "232-115-006", name: "Md. Mehrab Hasan Akhanjee", email: "mehrab006@example.com", program: "Computer Science and Engineering", semester: 4, enrollmentDate: "2023-09-01" },
  { id: "232-115-008", name: "Md. Navid Zaman Khan", email: "navid008@example.com", program: "Computer Science and Engineering", semester: 4, enrollmentDate: "2023-09-01" },
  { id: "232-115-010", name: "Rita Begum", email: "rita010@example.com", program: "Computer Science and Engineering", semester: 4, enrollmentDate: "2023-09-01" },
  { id: "232-115-011", name: "Sadman Sakib Khan", email: "sadman011@example.com", program: "Computer Science and Engineering", semester: 4, enrollmentDate: "2023-09-01" },
  { id: "232-115-013", name: "Jibran Masum Didar", email: "jibran013@example.com", program: "Computer Science and Engineering", semester: 4, enrollmentDate: "2023-09-01" },
  { id: "232-115-015", name: "Md. Masudul Hasan Akib", email: "akib015@example.com", program: "Computer Science and Engineering", semester: 4, enrollmentDate: "2023-09-01" },
  { id: "232-115-016", name: "Najia Akter Lubna", email: "lubna016@example.com", program: "Computer Science and Engineering", semester: 4, enrollmentDate: "2023-09-01" },
  { id: "232-115-017", name: "Halima Jahan Chowdhury", email: "halima017@example.com", program: "Computer Science and Engineering", semester: 4, enrollmentDate: "2023-09-01" },
  { id: "232-115-018", name: "Mehedi Hasan Emon", email: "emon018@example.com", program: "Computer Science and Engineering", semester: 4, enrollmentDate: "2023-09-01" },
  { id: "232-115-019", name: "Fatema Jannat Ema", email: "ema019@example.com", program: "Computer Science and Engineering", semester: 4, enrollmentDate: "2023-09-01" },
  { id: "232-115-020", name: "Md. Udoy Hossain Tahim", email: "tahim020@example.com", program: "Computer Science and Engineering", semester: 4, enrollmentDate: "2023-09-01" },
  { id: "232-115-022", name: "Abid Shahriar", email: "abid022@example.com", program: "Computer Science and Engineering", semester: 4, enrollmentDate: "2023-09-01" },
  { id: "232-115-025", name: "Samiya Rahman Bushra", email: "bushra025@example.com", program: "Computer Science and Engineering", semester: 4, enrollmentDate: "2023-09-01" },
  { id: "232-115-028", name: "Fahima Akter", email: "fahima028@example.com", program: "Computer Science and Engineering", semester: 4, enrollmentDate: "2023-09-01" },
  { id: "232-115-030", name: "Sukta Rani Chandra", email: "sukta030@example.com", program: "Computer Science and Engineering", semester: 4, enrollmentDate: "2023-09-01" },
  { id: "232-115-031", name: "Nadia Muntaha", email: "nadia031@example.com", program: "Computer Science and Engineering", semester: 4, enrollmentDate: "2023-09-01" },
  { id: "232-115-032", name: "Shamsun Naher", email: "naher032@example.com", program: "Computer Science and Engineering", semester: 4, enrollmentDate: "2023-09-01" },
  { id: "232-115-033", name: "Arshika Noor", email: "arshika033@example.com", program: "Computer Science and Engineering", semester: 4, enrollmentDate: "2023-09-01" },
  { id: "232-115-034", name: "Anij Fatema Lisa", email: "lisa034@example.com", program: "Computer Science and Engineering", semester: 4, enrollmentDate: "2023-09-01" },
  { id: "232-115-035", name: "Samiha Jannah Najah", email: "samiha035@example.com", program: "Computer Science and Engineering", semester: 4, enrollmentDate: "2023-09-01" },
  { id: "232-115-036", name: "Mahbuba Khanom Mumu", email: "mumu036@example.com", program: "Computer Science and Engineering", semester: 4, enrollmentDate: "2023-09-01" },
  { id: "232-115-038", name: "Sumaya Akther Rose", email: "sumaya038@example.com", program: "Computer Science and Engineering", semester: 4, enrollmentDate: "2023-09-01" },
  { id: "232-115-039", name: "Sadia Sharmin Tumpa", email: "tumpa039@example.com", program: "Computer Science and Engineering", semester: 4, enrollmentDate: "2023-09-01" },
  { id: "232-115-040", name: "Jannatul Fardous", email: "fardous040@example.com", program: "Computer Science and Engineering", semester: 4, enrollmentDate: "2023-09-01" }
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

// Mock marks data
export const marks: Mark[] = [
  {
    studentId: "232-115-005",
    courseId: "CSE200",
    classTests: [7, 8, 9],
    presentations: [20, 17],
    classPerformance: 10,
    midterm: 25,
    finalExam: 38
  },
  {
    studentId: "232-115-005",
    courseId: "MAT216",
    classTests: [9, 10, 7],
    presentations: [15, 18],
    classPerformance: 9,
    midterm: 20,
    finalExam: 50
  },
  {
    studentId: "232-115-005",
    courseId: "CSE231",
    classTests: [9, 8, 9],
    presentations: [15, 20],
    classPerformance: 7,
    midterm: 22,
    finalExam: 49
  },
  {
    studentId: "232-115-005",
    courseId: "CSE211",
    classTests: [7, 7, 10],
    presentations: [15, 16],
    classPerformance: 8,
    midterm: 22,
    finalExam: 44
  },
  {
    studentId: "232-115-005",
    courseId: "GED431",
    classTests: [9, 8, 7],
    presentations: [16, 17],
    classPerformance: 8,
    midterm: 25,
    finalExam: 42
  },
  {
    studentId: "232-115-006",
    courseId: "CSE200",
    classTests: [6, 9, 10],
    presentations: [20, 20],
    classPerformance: 10,
    midterm: 21,
    finalExam: 48
  },
  {
    studentId: "232-115-006",
    courseId: "MAT216",
    classTests: [7, 9, 9],
    presentations: [17, 19],
    classPerformance: 9,
    midterm: 22,
    finalExam: 46
  },
  {
    studentId: "232-115-006",
    courseId: "CSE231",
    classTests: [6, 8, 8],
    presentations: [20, 16],
    classPerformance: 8,
    midterm: 24,
    finalExam: 44
  },
  {
    studentId: "232-115-006",
    courseId: "CSE211",
    classTests: [10, 7, 7],
    presentations: [19, 19],
    classPerformance: 9,
    midterm: 25,
    finalExam: 47
  },
  {
    studentId: "232-115-006",
    courseId: "GED431",
    classTests: [6, 8, 8],
    presentations: [14, 14],
    classPerformance: 9,
    midterm: 24,
    finalExam: 38
  },
  {
    studentId: "232-115-008",
    courseId: "CSE200",
    classTests: [6, 6, 6],
    presentations: [14, 19],
    classPerformance: 8,
    midterm: 22,
    finalExam: 36
  },
  {
    studentId: "232-115-008",
    courseId: "MAT216",
    classTests: [9, 10, 9],
    presentations: [18, 14],
    classPerformance: 8,
    midterm: 23,
    finalExam: 47
  },
  {
    studentId: "232-115-008",
    courseId: "CSE231",
    classTests: [8, 9, 6],
    presentations: [18, 14],
    classPerformance: 7,
    midterm: 21,
    finalExam: 48
  },
  {
    studentId: "232-115-008",
    courseId: "CSE211",
    classTests: [6, 6, 6],
    presentations: [20, 17],
    classPerformance: 10,
    midterm: 25,
    finalExam: 35
  },
  {
    studentId: "232-115-008",
    courseId: "GED431",
    classTests: [10, 10, 9],
    presentations: [19, 15],
    classPerformance: 9,
    midterm: 23,
    finalExam: 40
  },
  {
    studentId: "232-115-009",
    courseId: "CSE200",
    classTests: [10, 7, 8],
    presentations: [20, 15],
    classPerformance: 10,
    midterm: 24,
    finalExam: 40
  },
  {
    studentId: "232-115-009",
    courseId: "MAT216",
    classTests: [9, 10, 9],
    presentations: [17, 17],
    classPerformance: 7,
    midterm: 21,
    finalExam: 36
  },
  {
    studentId: "232-115-009",
    courseId: "CSE231",
    classTests: [9, 9, 9],
    presentations: [18, 20],
    classPerformance: 8,
    midterm: 20,
    finalExam: 43
  },
  {
    studentId: "232-115-009",
    courseId: "CSE211",
    classTests: [9, 9, 6],
    presentations: [15, 20],
    classPerformance: 9,
    midterm: 24,
    finalExam: 35
  },
  {
    studentId: "232-115-009",
    courseId: "GED431",
    classTests: [9, 7, 6],
    presentations: [16, 15],
    classPerformance: 8,
    midterm: 24,
    finalExam: 35
  },
  {
    studentId: "232-115-011",
    courseId: "CSE200",
    classTests: [7, 6, 6],
    presentations: [17, 20],
    classPerformance: 7,
    midterm: 25,
    finalExam: 37
  },
  {
    studentId: "232-115-011",
    courseId: "MAT216",
    classTests: [10, 6, 6],
    presentations: [18, 15],
    classPerformance: 10,
    midterm: 24,
    finalExam: 43
  },
  {
    studentId: "232-115-011",
    courseId: "CSE231",
    classTests: [6, 9, 10],
    presentations: [15, 18],
    classPerformance: 7,
    midterm: 21,
    finalExam: 44
  },
  {
    studentId: "232-115-011",
    courseId: "CSE211",
    classTests: [10, 9, 8],
    presentations: [14, 18],
    classPerformance: 7,
    midterm: 23,
    finalExam: 45
  },
  {
    studentId: "232-115-011",
    courseId: "GED431",
    classTests: [10, 6, 10],
    presentations: [17, 15],
    classPerformance: 10,
    midterm: 22,
    finalExam: 44
  }
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
  const classTestAverage = mark.classTests.reduce((sum, mark) => sum + mark, 0) / mark.classTests.length;

  // Use presentation as a single value (first one)
  const presentation = mark.presentations[0];

  // Use values directly for other components
  const totalMarks =
    classTestAverage + // Average of class tests
    mark.classPerformance + // Class performance
    presentation + // Presentation
    mark.midterm + // Midterm
    mark.finalExam; // Final Exam

  // Grade calculation based on totalMarks
  let grade;
  if (totalMarks >= 90) grade = 'A';
  else if (totalMarks >= 80) grade = 'B';
  else if (totalMarks >= 70) grade = 'C';
  else if (totalMarks >= 60) grade = 'D';
  else grade = 'F';

  return { totalMarks, grade };
};


// Helper function to get student marks by ID
export const getStudentMarks = (studentId: string): Mark[] => {
  return marks.filter(mark => mark.studentId === studentId);
};
