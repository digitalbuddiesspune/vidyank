/**
 * Parent Module Dummy Data
 * Data specific to the logged-in parent (John Doe Sr.)
 */

// Current logged-in parent
export const currentParent = {
  id: 1,
  name: 'John Doe Sr.',
  email: 'john.sr@example.com',
  phone: '1111111111',
  address: '123 Main Street, City, State 12345',
  relation: 'Father',
};

// Linked child information
export const linkedChild = {
  id: 1,
  name: 'John Doe',
  rollNumber: 'ST001',
  batchId: 1,
  batchName: 'Batch A',
  email: 'john.doe@example.com',
  admissionDate: '2024-01-15',
};

// Child's Exam Results
export const childResults = [
  {
    id: 1,
    examId: 1,
    examTitle: 'Mathematics Midterm',
    subject: 'Mathematics',
    examDate: '2024-03-15',
    totalMarks: 100,
    marksObtained: 82,
    percentage: 82,
    grade: 'A',
    status: 'passed',
    rank: 2,
    totalStudents: 25,
    correctAnswers: 4,
    wrongAnswers: 1,
    skippedAnswers: 0,
    submittedAt: '2024-03-15T11:45:00',
  },
  {
    id: 2,
    examId: 4,
    examTitle: 'Chemistry Test',
    subject: 'Chemistry',
    examDate: '2024-03-10',
    totalMarks: 50,
    marksObtained: 45,
    percentage: 90,
    grade: 'A+',
    status: 'passed',
    rank: 1,
    totalStudents: 25,
    correctAnswers: 3,
    wrongAnswers: 0,
    skippedAnswers: 0,
    submittedAt: '2024-03-10T10:50:00',
  },
  {
    id: 3,
    examId: 5,
    examTitle: 'Biology Assessment',
    subject: 'Biology',
    examDate: '2024-03-12',
    totalMarks: 50,
    marksObtained: 35,
    percentage: 70,
    grade: 'B',
    status: 'passed',
    rank: 12,
    totalStudents: 25,
    correctAnswers: 2,
    wrongAnswers: 1,
    skippedAnswers: 0,
    submittedAt: '2024-03-12T14:45:00',
  },
  {
    id: 4,
    examId: 6,
    examTitle: 'English Final Exam',
    subject: 'English',
    examDate: '2024-03-20',
    totalMarks: 100,
    marksObtained: 88,
    percentage: 88,
    grade: 'A',
    status: 'passed',
    rank: 3,
    totalStudents: 25,
    correctAnswers: 5,
    wrongAnswers: 0,
    skippedAnswers: 0,
    submittedAt: '2024-03-20T11:30:00',
  },
  {
    id: 5,
    examId: 7,
    examTitle: 'Physics Quiz',
    subject: 'Physics',
    examDate: '2024-03-18',
    totalMarks: 50,
    marksObtained: 40,
    percentage: 80,
    grade: 'A',
    status: 'passed',
    rank: 5,
    totalStudents: 25,
    correctAnswers: 3,
    wrongAnswers: 0,
    skippedAnswers: 0,
    submittedAt: '2024-03-18T14:20:00',
  },
];

// Attendance Data (Current Month - March 2024)
export const attendanceData = [
  { date: '2024-03-01', status: 'present', subject: 'Mathematics' },
  { date: '2024-03-02', status: 'present', subject: 'Physics' },
  { date: '2024-03-03', status: 'absent', subject: 'Mathematics' },
  { date: '2024-03-04', status: 'present', subject: 'Chemistry' },
  { date: '2024-03-05', status: 'present', subject: 'Biology' },
  { date: '2024-03-06', status: 'present', subject: 'English' },
  { date: '2024-03-07', status: 'present', subject: 'Mathematics' },
  { date: '2024-03-08', status: 'present', subject: 'Physics' },
  { date: '2024-03-09', status: 'present', subject: 'Mathematics' },
  { date: '2024-03-10', status: 'present', subject: 'Chemistry' },
  { date: '2024-03-11', status: 'absent', subject: 'Biology' },
  { date: '2024-03-12', status: 'present', subject: 'English' },
  { date: '2024-03-13', status: 'present', subject: 'Mathematics' },
  { date: '2024-03-14', status: 'present', subject: 'Physics' },
  { date: '2024-03-15', status: 'present', subject: 'Mathematics' },
  { date: '2024-03-16', status: 'present', subject: 'Chemistry' },
  { date: '2024-03-17', status: 'present', subject: 'Biology' },
  { date: '2024-03-18', status: 'present', subject: 'English' },
  { date: '2024-03-19', status: 'present', subject: 'Mathematics' },
  { date: '2024-03-20', status: 'present', subject: 'Physics' },
  { date: '2024-03-21', status: 'present', subject: 'Mathematics' },
  { date: '2024-03-22', status: 'absent', subject: 'Chemistry' },
  { date: '2024-03-23', status: 'present', subject: 'Biology' },
  { date: '2024-03-24', status: 'present', subject: 'English' },
  { date: '2024-03-25', status: 'present', subject: 'Mathematics' },
  { date: '2024-03-26', status: 'present', subject: 'Physics' },
  { date: '2024-03-27', status: 'present', subject: 'Mathematics' },
  { date: '2024-03-28', status: 'present', subject: 'Chemistry' },
  { date: '2024-03-29', status: 'present', subject: 'Biology' },
  { date: '2024-03-30', status: 'present', subject: 'English' },
  { date: '2024-03-31', status: 'present', subject: 'Mathematics' },
];

// Progress Data
export const progressData = {
  overallAverage: 82,
  totalExams: 5,
  completedExams: 5,
  attendancePercentage: 90.32, // 28 present out of 31 days
  subjectPerformance: [
    {
      subject: 'Mathematics',
      averageScore: 85,
      totalExams: 1,
      trend: 'up',
    },
    {
      subject: 'Chemistry',
      averageScore: 90,
      totalExams: 1,
      trend: 'up',
    },
    {
      subject: 'Biology',
      averageScore: 70,
      totalExams: 1,
      trend: 'down',
    },
    {
      subject: 'English',
      averageScore: 88,
      totalExams: 1,
      trend: 'up',
    },
    {
      subject: 'Physics',
      averageScore: 80,
      totalExams: 1,
      trend: 'up',
    },
  ],
  weakTopics: [
    { topic: 'Geometry', subject: 'Mathematics', mastery: 65, improvement: 5 },
    { topic: 'Cell Biology', subject: 'Biology', mastery: 60, improvement: 8 },
    { topic: 'Organic Chemistry', subject: 'Chemistry', mastery: 75, improvement: 10 },
  ],
  monthlyTrend: [
    { month: 'Jan', score: 75 },
    { month: 'Feb', score: 78 },
    { month: 'Mar', score: 82 },
  ],
};

// Calculate attendance stats
export const attendanceStats = {
  totalDays: attendanceData.length,
  presentDays: attendanceData.filter((a) => a.status === 'present').length,
  absentDays: attendanceData.filter((a) => a.status === 'absent').length,
  attendancePercentage:
    (attendanceData.filter((a) => a.status === 'present').length / attendanceData.length) * 100,
};
