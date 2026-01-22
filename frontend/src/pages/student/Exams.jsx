import { useState } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { studentExams } from '../../data/studentData';

/**
 * Exams Page
 * Upcoming/Completed tabs with exam cards
 */
function Exams() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Filter exams based on tab and search
  const filteredExams = studentExams.filter((exam) => {
    const matchesSearch =
      exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesTab = true;
    if (activeTab === 'upcoming') {
      matchesTab = exam.status === 'upcoming';
    } else if (activeTab === 'completed') {
      matchesTab = exam.status === 'completed';
    }

    let matchesFilter = true;
    if (filterStatus !== 'all') {
      matchesFilter = exam.status === filterStatus;
    }

    return matchesSearch && matchesTab && matchesFilter;
  });

  const upcomingExams = filteredExams.filter((exam) => exam.status === 'upcoming');
  const completedExams = filteredExams.filter((exam) => exam.status === 'completed');

  const getStatusBadge = (status, score) => {
    if (status === 'completed') {
      if (score >= 90) return 'bg-green-100 text-green-800';
      if (score >= 70) return 'bg-blue-100 text-blue-800';
      if (score >= 50) return 'bg-yellow-100 text-yellow-800';
      return 'bg-red-100 text-red-800';
    }
    return 'bg-yellow-100 text-yellow-800';
  };

  const handleStartExam = (examId) => {
    alert(`Starting exam: ${studentExams.find((e) => e.id === examId)?.title}`);
    // In a real app, this would navigate to the exam taking page
  };

  const handleViewResult = (examId) => {
    // Navigate to results page or show modal
    window.location.href = '/student/results';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Exams</h1>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'all'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All ({studentExams.length})
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'upcoming'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Upcoming ({upcomingExams.length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'completed'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Completed ({completedExams.length})
            </button>
          </nav>
        </div>

        {/* Search and Filter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Input
            type="text"
            placeholder="Search exams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Exam Cards */}
        {filteredExams.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No exams found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExams.map((exam) => (
              <div
                key={exam.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{exam.title}</h3>
                    <p className="text-sm text-gray-600">{exam.subject}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      exam.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {exam.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">📅</span>
                    <span>{exam.examDate}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">⏰</span>
                    <span>
                      {exam.startTime} - {exam.endTime} ({exam.duration} min)
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">📊</span>
                    <span>
                      {exam.totalMarks} marks • {exam.questionCount} questions
                    </span>
                  </div>
                  {exam.status === 'completed' && exam.score !== null && (
                    <div className="flex items-center text-sm">
                      <span className="mr-2">🎯</span>
                      <span
                        className={`font-semibold ${getStatusBadge(exam.status, exam.percentage).split(' ')[1]}`}
                      >
                        Score: {exam.score}/{exam.totalMarks} ({exam.percentage}%)
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  {exam.status === 'completed' ? (
                    <Button
                      variant="secondary"
                      onClick={() => handleViewResult(exam.id)}
                      className="w-full"
                    >
                      View Result
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={() => handleStartExam(exam.id)}
                      className="w-full"
                    >
                      Start Exam
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Exams;
