import { useState, useEffect } from 'react';
import {
  initialStudents,
  initialTeachers,
  initialBatches,
  initialExams,
} from '../../data/dummyData';

/**
 * Institute Admin Dashboard Page
 * Shows overview cards with statistics
 */
function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalBatches: 0,
    upcomingExams: 0,
  });

  useEffect(() => {
    // Calculate statistics from dummy data
    const today = new Date();
    const upcomingExamsCount = initialExams.filter((exam) => {
      const examDate = new Date(exam.examDate);
      return examDate >= today && exam.status === 'published';
    }).length;

    setStats({
      totalStudents: initialStudents.length,
      totalTeachers: initialTeachers.length,
      totalBatches: initialBatches.length,
      upcomingExams: upcomingExamsCount,
    });
  }, []);

  const statCards = [
    {
      title: 'Total Students',
      value: stats.totalStudents,
      icon: '👥',
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
    },
    {
      title: 'Total Teachers',
      value: stats.totalTeachers,
      icon: '👨‍🏫',
      color: 'bg-green-500',
      textColor: 'text-green-600',
    },
    {
      title: 'Total Batches',
      value: stats.totalBatches,
      icon: '📚',
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
    },
    {
      title: 'Upcoming Exams',
      value: stats.upcomingExams,
      icon: '📝',
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Institute Dashboard</h1>

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
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Exams</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Exam Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Batch
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {initialExams.slice(0, 5).map((exam) => (
                <tr key={exam.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {exam.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {exam.batchName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {exam.examDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        exam.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {exam.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
