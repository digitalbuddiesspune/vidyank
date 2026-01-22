import { useState } from 'react';
import { analyticsData, initialInstitutes } from '../../data/superAdminData';

/**
 * Analytics Page
 * Growth charts placeholders and institute activity summary
 */
function Analytics() {
  const [analytics] = useState(analyticsData);

  // Placeholder chart data
  const growthData = analytics.growthData;
  const topInstitutes = analytics.topInstitutes;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Analytics</h1>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
            <p className="text-sm text-blue-100 mb-1">Total Institutes</p>
            <p className="text-4xl font-bold">{analytics.totalInstitutes}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
            <p className="text-sm text-green-100 mb-1">Active Institutes</p>
            <p className="text-4xl font-bold">{analytics.activeInstitutes}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
            <p className="text-sm text-purple-100 mb-1">Total Students</p>
            <p className="text-4xl font-bold">{analytics.totalStudents.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white">
            <p className="text-sm text-orange-100 mb-1">Total Teachers</p>
            <p className="text-4xl font-bold">{analytics.totalTeachers.toLocaleString()}</p>
          </div>
        </div>

        {/* Growth Chart Placeholder */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Institute Growth</h2>
          <div className="h-64 flex items-end justify-between space-x-4">
            {growthData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors cursor-pointer"
                  style={{
                    height: `${(data.institutes / Math.max(...growthData.map((d) => d.institutes))) * 100}%`,
                  }}
                  title={`${data.month}: ${data.institutes} institutes`}
                ></div>
                <span className="text-xs text-gray-600 mt-2">{data.month}</span>
                <span className="text-xs font-semibold text-gray-800">{data.institutes}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Chart Placeholder */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Monthly Revenue</h2>
          <div className="h-64 flex items-end justify-between space-x-4">
            {growthData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-green-500 rounded-t hover:bg-green-600 transition-colors cursor-pointer"
                  style={{
                    height: `${
                      (data.revenue / Math.max(...growthData.map((d) => d.revenue))) * 100
                    }%`,
                  }}
                  title={`${data.month}: ₹${data.revenue}`}
                ></div>
                <span className="text-xs text-gray-600 mt-2">{data.month}</span>
                <span className="text-xs font-semibold text-gray-800">₹{data.revenue}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Active Users Chart Placeholder */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Active Users Trend</h2>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
            <div className="text-center">
              <p className="text-gray-500 text-sm">Chart Placeholder</p>
              <p className="text-gray-400 text-xs mt-1">
                Active users over time visualization
              </p>
            </div>
          </div>
        </div>

        {/* Top Institutes */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Institutes by Students</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Institute Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Students
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Teachers
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topInstitutes.map((institute, index) => (
                  <tr key={institute.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index === 0 && '🥇'}
                      {index === 1 && '🥈'}
                      {index === 2 && '🥉'}
                      {index > 2 && `#${index + 1}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {institute.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {institute.city}, {institute.state}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {institute.totalStudents}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {institute.totalTeachers}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          institute.subscriptionPlan === 'Premium'
                            ? 'bg-blue-100 text-blue-800'
                            : institute.subscriptionPlan === 'Basic'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {institute.subscriptionPlan}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          institute.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {institute.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
