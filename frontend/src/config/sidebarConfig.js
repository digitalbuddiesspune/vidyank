/**
 * Sidebar Configuration
 * Role-based menu items for different user roles
 * Each role has its own set of navigation menu items
 */
export const sidebarConfig = {
  SUPER_ADMIN: [
    { name: "Dashboard", path: "/superadmin/dashboard" },
    { name: "Institutes", path: "/superadmin/institutes" },
    { name: "Subscriptions", path: "/superadmin/subscriptions" },
    { name: "Payments", path: "/superadmin/payments" },
    { name: "Analytics", path: "/superadmin/analytics" },
    { name: "Settings", path: "/superadmin/settings" },
  ],

  INSTITUTE_ADMIN: [
    { name: "Dashboard", path: "/institute/dashboard" },
    { name: "Students", path: "/institute/students" },
    { name: "Teachers", path: "/institute/teachers" },
    { name: "Parents", path: "/institute/parents" },
    { name: "Batches", path: "/institute/batches" },
    { name: "Exams", path: "/institute/exams" },
    { name: "Questions", path: "/institute/questions" },
    { name: "Results", path: "/institute/results" },
    { name: "Attendance", path: "/institute/attendance" },
    { name: "Subscription", path: "/institute/subscription" },
  ],

  TEACHER: [
    { name: "Dashboard", path: "/teacher/dashboard" },
    { name: "My Subjects", path: "/teacher/subjects" },
    { name: "Question Bank", path: "/teacher/questions" },
    { name: "Exams", path: "/teacher/exams" },
    { name: "Attendance", path: "/teacher/attendance" },
    { name: "Performance", path: "/teacher/performance" },
  ],

  STUDENT: [
    { name: "Dashboard", path: "/student/dashboard" },
    { name: "My Exams", path: "/student/exams" },
    { name: "Practice Tests", path: "/student/practice" },
    { name: "Results", path: "/student/results" },
    { name: "Progress", path: "/student/progress" },
    { name: "Profile", path: "/student/profile" },
  ],

  PARENT: [
    { name: "Dashboard", path: "/parent/dashboard" },
    { name: "Child Results", path: "/parent/results" },
    { name: "Attendance", path: "/parent/attendance" },
    { name: "Progress", path: "/parent/progress" },
    { name: "Profile", path: "/parent/profile" },
  ],

  PUBLIC: [
    { name: "Home", path: "/" },
    { name: "Practice Tests", path: "/practice" },
    { name: "Mock Tests", path: "/mock-tests" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
  ],
};
