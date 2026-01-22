import { useState } from 'react';
import { progressData, linkedChild } from '../../data/parentData';

/**
 * Progress Page
 * Analytics UI with score trend, subject-wise performance, weak topics
 */
function Progress() {
  const [progress] = useState(progressData);

  // Placeholder chart data
  const chartData = progress.monthlyTrend;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Progress Analytics</h1>
          <p className="text-gray-600">
            Performance overview for {linkedChild.name} ({linkedChild.rollNumber})
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
            <p className="text-sm text-blue-100 mb-1">Overall Average</p>
            <p className="text-4xl font-bold">{progress.overallAverage}%</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
            <p className="text-sm text-green-100 mb-1">Total Exams</p>
            <p className="text-4xl font-bold">{progress.totalExams}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
            <p className="text-sm text-purple-100 mb-1">Completed Exams</p>
            <p className="text-4xl font-bold">{progress.completedExams}</p>
          </div>
        </div>

        {/* Score Trend Chart */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Score Trend</h2>
          <div className="h-64 flex items-end justify-between space-x-2">
            {chartData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors cursor-pointer"
                  style={{ height: `${(data.score / 100) * 100}%` }}
                  title={`${data.month}: ${data.score}%`}
                ></div>
                <span className="text-xs text-gray-600 mt-2">{data.month}</span>
                <span className="text-xs font-semibold text-gray-800">{data.score}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Subject-wise Performance */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Subject-wise Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {progress.subjectPerformance.map((subject, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{subject.subject}</h3>
                    <p className="text-sm text-gray-600">{subject.totalExams} exam(s)</p>
                  </div>
                  <span
                    className={`text-2xl ${
                      subject.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {subject.trend === 'up' ? '📈' : '📉'}
                  </span>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Average Score</span>
                    <span className="font-semibold text-gray-900">{subject.averageScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        subject.averageScore >= 80
                          ? 'bg-green-500'
                          : subject.averageScore >= 60
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${subject.averageScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weak Topics */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Weak Topics - Need Improvement</h2>
          <div className="space-y-4">
            {progress.weakTopics.map((topic, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{topic.topic}</h3>
                    <p className="text-sm text-gray-600">{topic.subject}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Mastery</p>
                    <p className="text-xl font-bold text-gray-900">{topic.mastery}%</p>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        topic.mastery >= 70
                          ? 'bg-green-500'
                          : topic.mastery >= 50
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${topic.mastery}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Improvement: <span className="font-semibold text-green-600">+{topic.improvement}%</span>
                  </span>
                  <span className="text-xs text-gray-500">
                    {topic.mastery < 70 ? 'Needs Practice' : 'Good Progress'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Progress;
