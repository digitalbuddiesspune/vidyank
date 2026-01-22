import { useState } from 'react';
import {
  initialResults,
  initialExams,
  initialStudents,
  initialBatches,
} from '../../data/dummyData';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

/**
 * Results Page
 * Display exam results
 */
function Results() {
  const [results, setResults] = useState(initialResults);
  const [exams] = useState(initialExams);
  const [students] = useState(initialStudents);
  const [batches] = useState(initialBatches);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterExam, setFilterExam] = useState('');
  const [filterBatch, setFilterBatch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Filter results
  const filteredResults = results.filter((result) => {
    const matchesSearch =
      result.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.examTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExam = filterExam === '' || result.examId === parseInt(filterExam);
    const matchesBatch = filterBatch === '' || result.batchId === parseInt(filterBatch);
    const matchesStatus = filterStatus === '' || result.status === filterStatus;
    return matchesSearch && matchesExam && matchesBatch && matchesStatus;
  });

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+':
        return 'bg-green-100 text-green-800';
      case 'A':
        return 'bg-blue-100 text-blue-800';
      case 'B':
        return 'bg-yellow-100 text-yellow-800';
      case 'C':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  const examOptions = exams.map((exam) => ({
    value: exam.id.toString(),
    label: exam.title,
  }));

  const batchOptions = batches.map((batch) => ({
    value: batch.id.toString(),
    label: batch.name,
  }));

  // Calculate statistics
  const stats = {
    totalResults: filteredResults.length,
    passed: filteredResults.filter((r) => r.status === 'passed').length,
    failed: filteredResults.filter((r) => r.status === 'failed').length,
    averagePercentage:
      filteredResults.length > 0
        ? (
            filteredResults.reduce((sum, r) => sum + r.percentage, 0) /
            filteredResults.length
          ).toFixed(2)
        : 0,
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Exam Results</h1>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Total Results</p>
            <p className="text-2xl font-bold text-blue-600">{stats.totalResults}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Passed</p>
            <p className="text-2xl font-bold text-green-600">{stats.passed}</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Failed</p>
            <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Average %</p>
            <p className="text-2xl font-bold text-purple-600">
              {stats.averagePercentage}%
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Input
            type="text"
            placeholder="Search by student, roll number, or exam..."
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
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            options={[
              { value: '', label: 'All Status' },
              { value: 'passed', label: 'Passed' },
              { value: 'failed', label: 'Failed' },
            ]}
          />
        </div>

        {/* Results Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Roll Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Exam
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Batch
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Marks Obtained
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Percentage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted At
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredResults.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                    No results found
                  </td>
                </tr>
              ) : (
                filteredResults.map((result) => (
                  <tr key={result.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {result.studentName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.rollNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.examTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.batchName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.marksObtained} / {result.totalMarks}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {result.percentage}%
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(result.submittedAt).toLocaleDateString()}
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

export default Results;
