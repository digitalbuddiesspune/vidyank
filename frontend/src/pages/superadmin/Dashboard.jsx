import { useState, useEffect } from 'react';
import Button from '../../components/ui/Button';
import {
  initialInstitutes,
  initialPayments,
  analyticsData,
} from '../../data/superAdminData';

/**
 * Super Admin Dashboard Page
 * Shows stat cards and recent payments
 */
function Dashboard() {
  const [stats, setStats] = useState({
    totalInstitutes: 0,
    activeInstitutes: 0,
    totalStudents: 0,
    totalTeachers: 0,
    monthlyRevenue: 0,
    pendingPayments: 0,
  });

  useEffect(() => {
    const activeInstitutes = initialInstitutes.filter((i) => i.status === 'active').length;
    const totalStudents = initialInstitutes.reduce((sum, i) => sum + i.totalStudents, 0);
    const totalTeachers = initialInstitutes.reduce((sum, i) => sum + i.totalTeachers, 0);
    const monthlyRevenue = initialPayments
      .filter((p) => p.status === 'paid' && p.paymentDate.startsWith('2024-02'))
      .reduce((sum, p) => sum + p.amount, 0);
    const pendingPayments = initialPayments.filter((p) => p.status === 'pending').length;

    setStats({
      totalInstitutes: initialInstitutes.length,
      activeInstitutes,
      totalStudents,
      totalTeachers,
      monthlyRevenue,
      pendingPayments,
    });
  }, []);

  // Get recent payments (last 5)
  const recentPayments = initialPayments
    .sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate))
    .slice(0, 5);

  const statCards = [
    {
      title: 'Total Institutes',
      value: stats.totalInstitutes,
      icon: '🏫',
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
    },
    {
      title: 'Active Institutes',
      value: stats.activeInstitutes,
      icon: '✅',
      color: 'bg-green-500',
      textColor: 'text-green-600',
    },
    {
      title: 'Total Students',
      value: stats.totalStudents.toLocaleString(),
      icon: '👥',
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
    },
    {
      title: 'Total Teachers',
      value: stats.totalTeachers.toLocaleString(),
      icon: '👨‍🏫',
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
    },
    {
      title: 'Monthly Revenue',
      value: `₹${stats.monthlyRevenue.toLocaleString()}`,
      icon: '💰',
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600',
    },
    {
      title: 'Pending Payments',
      value: stats.pendingPayments,
      icon: '⏳',
      color: 'bg-red-500',
      textColor: 'text-red-600',
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-sm p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Super Admin Dashboard</h1>
        <p className="text-blue-100">Platform Overview & Management</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Recent Payments */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Recent Payments</h2>
          <Button variant="secondary" className="text-sm">
            View All
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Institute
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
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
              {recentPayments.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    No payments found
                  </td>
                </tr>
              ) : (
                recentPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {payment.instituteName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.plan}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{payment.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.paymentDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.method}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
                          payment.status
                        )}`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button variant="secondary" className="text-xs">
                        Invoice
                      </Button>
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
