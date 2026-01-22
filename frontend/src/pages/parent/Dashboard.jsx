import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import {
  linkedChild,
  childResults,
  attendanceStats,
  progressData,
} from '../../data/parentData';

/**
 * Parent Dashboard Page
 * Shows child overview cards and recent exam results
 */
function Dashboard() {
  const [stats, setStats] = useState({
    avgScore: 0,
    attendancePercentage: 0,
    completedExams: 0,
  });

  useEffect(() => {
    const avgScore =
      childResults.length > 0
        ? childResults.reduce((sum, result) => sum + result.percentage, 0) /
          childResults.length
        : 0;

    setStats({
      avgScore: Math.round(avgScore),
      attendancePercentage: Math.round(attendanceStats.attendancePercentage),
      completedExams: childResults.length,
    });
  }, []);

  // Get recent results (last 5)
  const recentResults = childResults
    .sort((a, b) => new Date(b.examDate) - new Date(a.examDate))
    .slice(0, 5);

  const overviewCards = [
    {
      title: 'Average Score',
      value: `${stats.avgScore}%`,
      icon: '📊',
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
    },
    {
      title: 'Attendance %',
      value: `${stats.attendancePercentage}%`,
      icon: '✅',
      color: 'bg-green-500',
      textColor: 'text-green-600',
    },
    {
      title: 'Completed Exams',
      value: stats.completedExams,
      icon: '📝',
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
    },
  ];

  const getGradeColor = (grade) => {
    if (grade.includes('+')) return 'bg-green-100 text-green-800';
    if (grade === 'A') return 'bg-blue-100 text-blue-800';
    if (grade === 'B') return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-sm p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome, {linkedChild.name}'s Parent</h1>
        <p className="text-blue-100">
          {linkedChild.rollNumber} • {linkedChild.batchName}
        </p>
      </div>

      {/* Child Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {overviewCards.map((card, index) => (
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

      {/* Recent Exam Results */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Recent Exam Results</h2>
          <Link to="/parent/results">
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
                  Exam Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentResults.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    No results found
                  </td>
                </tr>
              ) : (
                recentResults.map((result) => (
                  <tr key={result.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {result.examTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.examDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.marksObtained} / {result.totalMarks} ({result.percentage}%)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getGradeColor(
                          result.grade
                        )}`}
                      >
                        {result.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          result.status === 'passed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {result.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link to="/parent/results">
                        <Button variant="secondary" className="text-xs">
                          View Details
                        </Button>
                      </Link>
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
