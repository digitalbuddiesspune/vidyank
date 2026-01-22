/**
 * Teacher Module Dummy Data
 * Data specific to the logged-in teacher (Dr. Robert Brown - T001)
 * Assumes teacher teaches Mathematics and Physics to Batch A and Batch B
 */

let questionIdCounter = 1;
let examIdCounter = 1;
let attendanceIdCounter = 1;

// Current logged-in teacher (assumed to be Dr. Robert Brown)
export const currentTeacher = {
  id: 1,
  name: 'Dr. Robert Brown',
  email: 'robert.brown@example.com',
  employeeId: 'T001',
  subjects: ['Mathematics', 'Physics'],
  batchIds: [1, 2],
  batchNames: ['Batch A', 'Batch B'],
};

// Teacher's assigned subjects with batch mapping
export const teacherSubjects = [
  {
    id: 1,
    subject: 'Mathematics',
    batchId: 1,
    batchName: 'Batch A',
    schedule: 'Monday, Wednesday, Friday - 9:00 AM',
  },
  {
    id: 2,
    subject: 'Mathematics',
    batchId: 2,
    batchName: 'Batch B',
    schedule: 'Monday, Wednesday, Friday - 2:00 PM',
  },
  {
    id: 3,
    subject: 'Physics',
    batchId: 1,
    batchName: 'Batch A',
    schedule: 'Tuesday, Thursday - 10:00 AM',
  },
  {
    id: 4,
    subject: 'Physics',
    batchId: 2,
    batchName: 'Batch B',
    schedule: 'Tuesday, Thursday - 3:00 PM',
  },
];

// Question Bank (MCQ questions)
export const initialQuestionBank = [
  {
    id: questionIdCounter++,
    subject: 'Mathematics',
    topic: 'Algebra',
    difficulty: 'easy',
    question: 'What is the value of x in the equation 2x + 5 = 15?',
    options: ['x = 3', 'x = 5', 'x = 7', 'x = 10'],
    correctOption: 0,
    createdAt: '2024-01-15',
  },
  {
    id: questionIdCounter++,
    subject: 'Mathematics',
    topic: 'Algebra',
    difficulty: 'medium',
    question: 'Solve for x: x² - 5x + 6 = 0',
    options: ['x = 2, x = 3', 'x = 1, x = 6', 'x = -2, x = -3', 'x = 0, x = 5'],
    correctOption: 0,
    createdAt: '2024-01-16',
  },
  {
    id: questionIdCounter++,
    subject: 'Mathematics',
    topic: 'Geometry',
    difficulty: 'hard',
    question: 'What is the area of a circle with radius 7 cm? (Use π = 22/7)',
    options: ['44 cm²', '154 cm²', '308 cm²', '616 cm²'],
    correctOption: 1,
    createdAt: '2024-01-17',
  },
  {
    id: questionIdCounter++,
    subject: 'Physics',
    topic: 'Mechanics',
    difficulty: 'easy',
    question: 'What is the SI unit of force?',
    options: ['Joule', 'Newton', 'Watt', 'Pascal'],
    correctOption: 1,
    createdAt: '2024-01-18',
  },
  {
    id: questionIdCounter++,
    subject: 'Physics',
    topic: 'Mechanics',
    difficulty: 'medium',
    question: 'A car accelerates from rest to 60 km/h in 10 seconds. What is its acceleration?',
    options: ['6 m/s²', '1.67 m/s²', '10 m/s²', '60 m/s²'],
    correctOption: 1,
    createdAt: '2024-01-19',
  },
  {
    id: questionIdCounter++,
    subject: 'Physics',
    topic: 'Thermodynamics',
    difficulty: 'hard',
    question: 'What is the first law of thermodynamics?',
    options: [
      'Energy cannot be created or destroyed',
      'Entropy always increases',
      'Temperature is constant in an isolated system',
      'Pressure and volume are inversely proportional',
    ],
    correctOption: 0,
    createdAt: '2024-01-20',
  },
  {
    id: questionIdCounter++,
    subject: 'Mathematics',
    topic: 'Calculus',
    difficulty: 'hard',
    question: 'What is the derivative of f(x) = x³ + 2x² + 5x?',
    options: ['3x² + 4x + 5', 'x² + 2x + 5', '3x + 2', 'x³ + 2x²'],
    correctOption: 0,
    createdAt: '2024-01-21',
  },
  {
    id: questionIdCounter++,
    subject: 'Physics',
    topic: 'Electromagnetism',
    difficulty: 'medium',
    question: 'What is the unit of electric current?',
    options: ['Volt', 'Ampere', 'Ohm', 'Watt'],
    correctOption: 1,
    createdAt: '2024-01-22',
  },
];

// Teacher's Exams
export const initialTeacherExams = [
  {
    id: examIdCounter++,
    title: 'Mathematics Midterm - Batch A',
    subject: 'Mathematics',
    batchId: 1,
    batchName: 'Batch A',
    examDate: '2024-03-15',
    startTime: '10:00',
    endTime: '12:00',
    duration: 120,
    totalMarks: 100,
    passingMarks: 40,
    status: 'published',
    questionIds: [1, 2, 3],
    questionCount: 3,
    createdAt: '2024-02-01',
  },
  {
    id: examIdCounter++,
    title: 'Physics Quiz - Batch B',
    subject: 'Physics',
    batchId: 2,
    batchName: 'Batch B',
    examDate: '2024-03-18',
    startTime: '2:00',
    endTime: '3:00',
    duration: 60,
    totalMarks: 50,
    passingMarks: 20,
    status: 'published',
    questionIds: [4, 5],
    questionCount: 2,
    createdAt: '2024-02-05',
  },
  {
    id: examIdCounter++,
    title: 'Mathematics Final - Batch B',
    subject: 'Mathematics',
    batchId: 2,
    batchName: 'Batch B',
    examDate: '2024-03-25',
    startTime: '2:00',
    endTime: '4:00',
    duration: 120,
    totalMarks: 100,
    passingMarks: 40,
    status: 'draft',
    questionIds: [1, 2, 7],
    questionCount: 3,
    createdAt: '2024-02-10',
  },
];

// Attendance Records
export const initialAttendance = [
  {
    id: attendanceIdCounter++,
    batchId: 1,
    batchName: 'Batch A',
    subject: 'Mathematics',
    date: '2024-03-01',
    studentId: 1,
    studentName: 'John Doe',
    rollNumber: 'ST001',
    status: 'present',
  },
  {
    id: attendanceIdCounter++,
    batchId: 1,
    batchName: 'Batch A',
    subject: 'Mathematics',
    date: '2024-03-01',
    studentId: 2,
    studentName: 'Jane Smith',
    rollNumber: 'ST002',
    status: 'present',
  },
  {
    id: attendanceIdCounter++,
    batchId: 1,
    batchName: 'Batch A',
    subject: 'Physics',
    date: '2024-03-02',
    studentId: 1,
    studentName: 'John Doe',
    rollNumber: 'ST001',
    status: 'present',
  },
  {
    id: attendanceIdCounter++,
    batchId: 1,
    batchName: 'Batch A',
    subject: 'Physics',
    date: '2024-03-02',
    studentId: 2,
    studentName: 'Jane Smith',
    rollNumber: 'ST002',
    status: 'absent',
  },
  {
    id: attendanceIdCounter++,
    batchId: 2,
    batchName: 'Batch B',
    subject: 'Mathematics',
    date: '2024-03-01',
    studentId: 3,
    studentName: 'Mike Johnson',
    rollNumber: 'ST003',
    status: 'present',
  },
  {
    id: attendanceIdCounter++,
    batchId: 2,
    batchName: 'Batch B',
    subject: 'Mathematics',
    date: '2024-03-01',
    studentId: 4,
    studentName: 'Sarah Williams',
    rollNumber: 'ST004',
    status: 'absent',
  },
];

// Performance Data (Exam Results)
export const performanceData = [
  {
    examId: 1,
    examTitle: 'Mathematics Midterm - Batch A',
    batchId: 1,
    batchName: 'Batch A',
    subject: 'Mathematics',
    totalStudents: 2,
    averageScore: 88.5,
    highestScore: 95,
    lowestScore: 82,
    passRate: 100,
    topStudents: [
      { studentId: 2, studentName: 'Jane Smith', rollNumber: 'ST002', score: 95, percentage: 95 },
      { studentId: 1, studentName: 'John Doe', rollNumber: 'ST001', score: 82, percentage: 82 },
    ],
  },
  {
    examId: 2,
    examTitle: 'Physics Quiz - Batch B',
    batchId: 2,
    batchName: 'Batch B',
    subject: 'Physics',
    totalStudents: 2,
    averageScore: 75,
    highestScore: 90,
    lowestScore: 60,
    passRate: 100,
    topStudents: [
      { studentId: 3, studentName: 'Mike Johnson', rollNumber: 'ST003', score: 90, percentage: 90 },
      { studentId: 4, studentName: 'Sarah Williams', rollNumber: 'ST004', score: 60, percentage: 60 },
    ],
  },
];

// Students in teacher's batches (from institute data)
export const teacherStudents = [
  { id: 1, name: 'John Doe', rollNumber: 'ST001', batchId: 1, batchName: 'Batch A' },
  { id: 2, name: 'Jane Smith', rollNumber: 'ST002', batchId: 1, batchName: 'Batch A' },
  { id: 3, name: 'Mike Johnson', rollNumber: 'ST003', batchId: 2, batchName: 'Batch B' },
  { id: 4, name: 'Sarah Williams', rollNumber: 'ST004', batchId: 2, batchName: 'Batch B' },
];

// Topics for subjects
export const topics = {
  Mathematics: ['Algebra', 'Geometry', 'Calculus', 'Trigonometry', 'Statistics'],
  Physics: ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics', 'Waves'],
};

// Difficulty levels
export const difficultyLevels = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

// Export ID generators
export const getNextQuestionId = () => questionIdCounter++;
export const getNextExamId = () => examIdCounter++;
export const getNextAttendanceId = () => attendanceIdCounter++;
