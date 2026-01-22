import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import {
  teacherSubjects,
  initialTeacherExams,
  currentTeacher,
} from '../../data/teacherData';

/**
 * Teacher Dashboard Page
 * Shows today's classes, upcoming exams, and quick actions
 */
function Dashboard() {
  const [todayClasses, setTodayClasses] = useState([]);
  const [upcomingExams, setUpcomingExams] = useState([]);

  useEffect(() => {
    // Get today's classes (simulate based on schedule)
    const today = new Date();
    const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
    
    // Filter classes based on day (simplified logic)
    const classes = teacherSubjects.filter((subject) => {
      if (dayName === 'Monday' || dayName === 'Wednesday' || dayName === 'Friday') {
        return subject.subject === 'Mathematics';
      } else if (dayName === 'Tuesday' || dayName === 'Thursday') {
        return subject.subject === 'Physics';
      }
      return false;
    });
    setTodayClasses(classes);

    // Get upcoming exams (published exams with future dates)
    const todayDate = new Date();
    const upcoming = initialTeacherExams
      .filter((exam) => {
        const examDate = new Date(exam.examDate);
        return examDate >= todayDate && exam.status === 'published';
      })
      .sort((a, b) => new Date(a.examDate) - new Date(b.examDate))
      .slice(0, 5);
    setUpcomingExams(upcoming);
  }, []);

  const quickActions = [
    {
      title: 'Create Exam',
      description: 'Create a new exam for your batches',
      link: '/teacher/exams',
      icon: '📝',
      color: 'bg-blue-500',
    },
    {
      title: 'Add Questions',
      description: 'Add questions to your question bank',
      link: '/teacher/questions',
      icon: '❓',
      color: 'bg-green-500',
    },
    {
      title: 'Mark Attendance',
      description: 'Mark attendance for your classes',
      link: '/teacher/attendance',
      icon: '✅',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-sm p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome, {currentTeacher.name}</h1>
        <p className="text-blue-100">
          {currentTeacher.subjects.join(' & ')} Teacher • {currentTeacher.batchNames.join(', ')}
        </p>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.link}>
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center mb-2">
                  <div className={`${action.color} rounded-full p-3 mr-3`}>
                    <span className="text-2xl">{action.icon}</span>
                  </div>
                  <h3 className="font-semibold text-gray-800">{action.title}</h3>
                </div>
                <p className="text-sm text-gray-600 ml-14">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Classes */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Today's Classes</h2>
          {todayClasses.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No classes scheduled for today</p>
          ) : (
            <div className="space-y-3">
              {todayClasses.map((classItem) => (
                <div
                  key={classItem.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">{classItem.subject}</h3>
                      <p className="text-sm text-gray-600">{classItem.batchName}</p>
                      <p className="text-xs text-gray-500 mt-1">{classItem.schedule}</p>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                      {classItem.subject}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Exams */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Exams</h2>
          {upcomingExams.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No upcoming exams</p>
          ) : (
            <div className="space-y-3">
              {upcomingExams.map((exam) => (
                <div
                  key={exam.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-800">{exam.title}</h3>
                      <p className="text-sm text-gray-600">{exam.batchName}</p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        exam.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {exam.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>📅 {exam.examDate}</span>
                    <span>⏰ {exam.startTime} - {exam.endTime}</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    {exam.questionCount} questions • {exam.totalMarks} marks
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Total Subjects</p>
            <p className="text-2xl font-bold text-blue-600">
              {new Set(teacherSubjects.map((s) => s.subject)).size}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Total Batches</p>
            <p className="text-2xl font-bold text-green-600">
              {new Set(teacherSubjects.map((s) => s.batchId)).size}
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Total Exams</p>
            <p className="text-2xl font-bold text-purple-600">
              {initialTeacherExams.length}
            </p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Published Exams</p>
            <p className="text-2xl font-bold text-orange-600">
              {initialTeacherExams.filter((e) => e.status === 'published').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
