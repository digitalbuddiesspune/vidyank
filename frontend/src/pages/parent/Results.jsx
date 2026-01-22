import { useState } from 'react';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { childResults } from '../../data/parentData';

/**
 * Results Page
 * Exam-wise result table with view details modal
 */
function Results() {
  const [selectedResult, setSelectedResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('');

  // Filter results
  const filteredResults = childResults.filter((result) => {
    const matchesSearch =
      result.examTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === '' || result.subject === filterSubject;
    return matchesSearch && matchesSubject;
  });

  const handleViewDetails = (result) => {
    setSelectedResult(result);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedResult(null);
  };

  const getGradeColor = (grade) => {
    if (grade.includes('+')) return 'bg-green-100 text-green-800';
    if (grade === 'A') return 'bg-blue-100 text-blue-800';
    if (grade === 'B') return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const uniqueSubjects = [...new Set(childResults.map((r) => r.subject))];
  const subjectOptions = uniqueSubjects.map((subject) => ({
    value: subject,
    label: subject,
  }));

  // Calculate statistics
  const stats = {
    totalResults: filteredResults.length,
    averageScore:
      filteredResults.length > 0
        ? (
            filteredResults.reduce((sum, r) => sum + r.percentage, 0) /
            filteredResults.length
          ).toFixed(2)
        : 0,
    highestScore:
      filteredResults.length > 0
        ? Math.max(...filteredResults.map((r) => r.percentage))
        : 0,
    passRate:
      filteredResults.length > 0
        ? (
            (filteredResults.filter((r) => r.status === 'passed').length /
              filteredResults.length) *
            100
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
            <p className="text-sm text-gray-600 mb-1">Average Score</p>
            <p className="text-2xl font-bold text-green-600">{stats.averageScore}%</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Highest Score</p>
            <p className="text-2xl font-bold text-purple-600">{stats.highestScore}%</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Pass Rate</p>
            <p className="text-2xl font-bold text-orange-600">{stats.passRate}%</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Input
            type="text"
            placeholder="Search by exam title or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Subjects</option>
            {subjectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Results Table */}
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
                  Percentage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
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
                      {result.examTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.examDate}
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.rank} / {result.totalStudents}
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
                      <Button
                        variant="secondary"
                        onClick={() => handleViewDetails(result)}
                        className="text-xs"
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Result Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedResult ? `${selectedResult.examTitle} - Result Details` : 'Result Details'}
        size="lg"
      >
        {selectedResult && (
          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Total Marks</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {selectedResult.totalMarks}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Marks Obtained</p>
                  <p className="text-lg font-semibold text-green-600">
                    {selectedResult.marksObtained}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Percentage</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {selectedResult.percentage}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Grade</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedResult.grade}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rank</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {selectedResult.rank} / {selectedResult.totalStudents}
                  </p>
                </div>
              </div>
            </div>

            {/* Answer Summary */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Answer Summary</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-green-600">
                    {selectedResult.correctAnswers}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Correct</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-red-600">
                    {selectedResult.wrongAnswers}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Wrong</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-yellow-600">
                    {selectedResult.skippedAnswers}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Skipped</p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="border-t pt-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subject:</span>
                  <span className="font-medium">{selectedResult.subject}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Exam Date:</span>
                  <span className="font-medium">{selectedResult.examDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Submitted At:</span>
                  <span className="font-medium">
                    {new Date(selectedResult.submittedAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      selectedResult.status === 'passed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {selectedResult.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Results;
