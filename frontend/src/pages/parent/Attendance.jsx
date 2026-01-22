import { useState } from 'react';
import { attendanceData, attendanceStats, linkedChild } from '../../data/parentData';

/**
 * Attendance Page
 * Month view / list view with present/absent summary
 */
function Attendance() {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'month'
  const [selectedMonth, setSelectedMonth] = useState('2024-03');

  // Filter attendance by selected month
  const filteredAttendance = attendanceData.filter((record) =>
    record.date.startsWith(selectedMonth)
  );

  // Group attendance by date for month view
  const attendanceByDate = filteredAttendance.reduce((acc, record) => {
    const date = record.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(record);
    return acc;
  }, {});

  // Get unique dates
  const uniqueDates = Object.keys(attendanceByDate).sort();

  // Calculate monthly stats
  const monthlyStats = {
    totalDays: filteredAttendance.length,
    presentDays: filteredAttendance.filter((a) => a.status === 'present').length,
    absentDays: filteredAttendance.filter((a) => a.status === 'absent').length,
    attendancePercentage:
      filteredAttendance.length > 0
        ? (
            (filteredAttendance.filter((a) => a.status === 'present').length /
              filteredAttendance.length) *
            100
          ).toFixed(2)
        : 0,
  };

  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getDateNumber = (dateString) => {
    const date = new Date(dateString);
    return date.getDate();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Attendance</h1>
          <div className="flex items-center space-x-4">
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setViewMode('month')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'month'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Month View
              </button>
            </div>
          </div>
        </div>

        {/* Attendance Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Total Days</p>
            <p className="text-2xl font-bold text-blue-600">{monthlyStats.totalDays}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Present Days</p>
            <p className="text-2xl font-bold text-green-600">{monthlyStats.presentDays}</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Absent Days</p>
            <p className="text-2xl font-bold text-red-600">{monthlyStats.absentDays}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Attendance %</p>
            <p className="text-2xl font-bold text-purple-600">
              {monthlyStats.attendancePercentage}%
            </p>
          </div>
        </div>

        {/* List View */}
        {viewMode === 'list' && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Day
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAttendance.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                      No attendance records found
                    </td>
                  </tr>
                ) : (
                  filteredAttendance.map((record, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getDayName(record.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.subject}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            record.status === 'present'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Month View */}
        {viewMode === 'month' && (
          <div>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {uniqueDates.map((date) => {
                const records = attendanceByDate[date];
                const hasAbsent = records.some((r) => r.status === 'absent');
                const allPresent = records.every((r) => r.status === 'present');
                const dayNumber = getDateNumber(date);
                const dayName = getDayName(date);

                return (
                  <div
                    key={date}
                    className={`border rounded-lg p-2 min-h-20 ${
                      hasAbsent
                        ? 'bg-red-50 border-red-200'
                        : allPresent
                        ? 'bg-green-50 border-green-200'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="text-xs font-semibold text-gray-700 mb-1">
                      {dayNumber}
                    </div>
                    <div className="text-xs text-gray-500 mb-1">{dayName}</div>
                    <div className="space-y-1">
                      {records.map((record, idx) => (
                        <div
                          key={idx}
                          className={`text-xs px-1 py-0.5 rounded ${
                            record.status === 'present'
                              ? 'bg-green-200 text-green-800'
                              : 'bg-red-200 text-red-800'
                          }`}
                        >
                          {record.subject.substring(0, 3)}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-100 border border-green-300 rounded mr-2"></div>
                <span>Present</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-100 border border-red-300 rounded mr-2"></div>
                <span>Absent</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Attendance;
