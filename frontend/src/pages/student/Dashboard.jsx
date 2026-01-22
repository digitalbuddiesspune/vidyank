import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { studentExams, currentStudent } from '../../data/studentData';

/**
 * Student Dashboard Page
 * Shows stats cards and recent exams
 */
function Dashboard() {
  const [stats, setStats] = useState({
    totalExams: 0,
    completed: 0,
    pending: 0,
    avgScore: 0,
  });

  useEffect(() => {
    const completed = studentExams.filter((exam) => exam.status === 'completed');
    const pending = studentExams.filter((exam) => exam.status === 'upcoming');
    const avgScore =
      completed.length > 0
        ? completed.reduce((sum, exam) => sum + exam.percentage, 0) / completed.length
        : 0;

    setStats({
      totalExams: studentExams.length,
      completed: completed.length,
      pending: pending.length,
      avgScore: Math.round(avgScore),
    });
  }, []);

  // Get recent exams (last 5)
  const recentExams = studentExams
    .sort((a, b) => new Date(b.examDate) - new Date(a.examDate))
    .slice(0, 5);

  const statCards = [
    {
      title: 'Total Exams',
      value: stats.totalExams,
      icon: '📝',
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: '✅',
      color: 'bg-green-500',
      textColor: 'text-green-600',
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: '⏳',
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
    },
    {
      title: 'Avg Score',
      value: `${stats.avgScore}%`,
      icon: '📊',
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
    },
  ];

  const getStatusBadge = (status, score) => {
    if (status === 'completed') {
      if (score >= 90) return 'bg-green-100 text-green-800';
      if (score >= 70) return 'bg-blue-100 text-blue-800';
      if (score >= 50) return 'bg-yellow-100 text-yellow-800';
      return 'bg-red-100 text-red-800';
    }
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-sm p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome, {currentStudent.name}</h1>
        <p className="text-blue-100">
          {currentStudent.rollNumber} • {currentStudent.batchName}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                <p className={`text-3xl font-bold ${card.textColor}`}>{card.value}</p>
              </div>
              <div className={`${card.color} rounded-full p-4`}>
                <span className="text-3xl">{card.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Exams */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Recent Exams</h2>
          <Link to="/student/exams">
            <Button variant="secondary" className="text-sm">
              View All
            </Button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentExams.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No exams found
                  </td>
                </tr>
              ) : (
                recentExams.map((exam) => (
                  <tr key={exam.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {exam.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {exam.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {exam.examDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          exam.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {exam.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {exam.score !== null ? (
                        <span className={`font-medium ${getStatusBadge(exam.status, exam.percentage).split(' ')[1]}`}>
                          {exam.score}/{exam.totalMarks} ({exam.percentage}%)
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {exam.status === 'completed' ? (
                        <Link to="/student/results">
                          <Button variant="secondary" className="text-xs">
                            View Result
                          </Button>
                        </Link>
                      ) : (
                        <Link to="/student/exams">
                          <Button variant="primary" className="text-xs">
                            Start
                          </Button>
                        </Link>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
