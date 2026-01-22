import { useState } from 'react';
import {
  performanceData,
  initialTeacherExams,
  teacherSubjects,
} from '../../data/teacherData';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

/**
 * Performance Page
 * Show exam-wise analytics, student-wise progress
 */
function Performance() {
  const [performance] = useState(performanceData);
  const [exams] = useState(initialTeacherExams);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterExam, setFilterExam] = useState('');
  const [filterBatch, setFilterBatch] = useState('');

  // Filter performance data
  const filteredPerformance = performance.filter((p) => {
    const matchesSearch =
      p.examTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExam = filterExam === '' || p.examId === parseInt(filterExam);
    const matchesBatch = filterBatch === '' || p.batchId === parseInt(filterBatch);
    return matchesSearch && matchesExam && matchesBatch;
  });

  // Calculate overall statistics
  const overallStats = {
    totalExams: performance.length,
    averageScore: performance.length > 0
      ? (performance.reduce((sum, p) => sum + p.averageScore, 0) / performance.length).toFixed(2)
      : 0,
    overallPassRate: performance.length > 0
      ? (performance.reduce((sum, p) => sum + p.passRate, 0) / performance.length).toFixed(2)
      : 0,
    totalStudents: new Set(performance.flatMap((p) => p.topStudents.map((s) => s.studentId))).size,
  };

  const examOptions = exams.map((exam) => ({
    value: exam.id.toString(),
    label: exam.title,
  }));

  const batchOptions = teacherSubjects
    .filter((s, index, self) => self.findIndex((t) => t.batchId === s.batchId) === index)
    .map((s) => ({
      value: s.batchId.toString(),
      label: s.batchName,
    }));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Performance Analytics</h1>

        {/* Overall Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Total Exams</p>
            <p className="text-2xl font-bold text-blue-600">{overallStats.totalExams}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Average Score</p>
            <p className="text-2xl font-bold text-green-600">
              {overallStats.averageScore}%
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Overall Pass Rate</p>
            <p className="text-2xl font-bold text-purple-600">
              {overallStats.overallPassRate}%
            </p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Total Students</p>
            <p className="text-2xl font-bold text-orange-600">
              {overallStats.totalStudents}
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Input
            type="text"
            placeholder="Search by exam title or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            value={filterExam}
            onChange={(e) => setFilterExam(e.target.value)}
            options={[{ value: '', label: 'All Exams' }, ...examOptions]}
          />
          <Select
            value={filterBatch}
            onChange={(e) => setFilterBatch(e.target.value)}
            options={[{ value: '', label: 'All Batches' }, ...batchOptions]}
          />
        </div>

        {/* Exam-wise Performance Table */}
        <div className="overflow-x-auto mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Exam-wise Analytics</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Exam
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Batch
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Students
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Average Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Highest Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lowest Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pass Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPerformance.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                    No performance data found
                  </td>
                </tr>
              ) : (
                filteredPerformance.map((perf) => (
                  <tr key={perf.examId}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {perf.examTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {perf.batchName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {perf.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {perf.totalStudents}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {perf.averageScore}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      {perf.highestScore}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                      {perf.lowestScore}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {perf.passRate}%
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Top Students by Exam */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Top Students by Exam</h2>
          {filteredPerformance.map((perf) => (
            <div key={perf.examId} className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {perf.examTitle} - {perf.batchName}
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rank
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Roll Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Score
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Percentage
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {perf.topStudents
                      .sort((a, b) => b.score - a.score)
                      .map((student, index) => (
                        <tr key={student.studentId}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {index === 0 && '🥇'}
                            {index === 1 && '🥈'}
                            {index === 2 && '🥉'}
                            {index > 2 && `#${index + 1}`}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {student.studentName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {student.rollNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {student.score}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                student.percentage >= 90
                                  ? 'bg-green-100 text-green-800'
                                  : student.percentage >= 70
                                  ? 'bg-blue-100 text-blue-800'
                                  : student.percentage >= 50
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {student.percentage}%
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Performance;
