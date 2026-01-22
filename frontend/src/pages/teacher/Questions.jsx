import { useState } from 'react';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import {
  initialQuestionBank,
  topics,
  difficultyLevels,
  currentTeacher,
  getNextQuestionId,
} from '../../data/teacherData';

/**
 * Questions Page
 * Question bank with add/edit/delete, tag by subject + topic + difficulty
 */
function Questions() {
  const [questions, setQuestions] = useState(initialQuestionBank);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterTopic, setFilterTopic] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');

  const [formData, setFormData] = useState({
    subject: '',
    topic: '',
    difficulty: 'easy',
    question: '',
    options: ['', '', '', ''],
    correctOption: 0,
  });

  // Filter questions
  const filteredQuestions = questions.filter((question) => {
    const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === '' || question.subject === filterSubject;
    const matchesTopic = filterTopic === '' || question.topic === filterTopic;
    const matchesDifficulty = filterDifficulty === '' || question.difficulty === filterDifficulty;
    return matchesSearch && matchesSubject && matchesTopic && matchesDifficulty;
  });

  // Get available topics based on selected subject
  const availableTopics = formData.subject ? topics[formData.subject] || [] : [];

  const handleOpenModal = (question = null) => {
    if (question) {
      setSelectedQuestion(question);
      setIsEditMode(true);
      setFormData({
        subject: question.subject,
        topic: question.topic,
        difficulty: question.difficulty,
        question: question.question,
        options: question.options,
        correctOption: question.correctOption,
      });
    } else {
      setIsEditMode(false);
      setFormData({
        subject: currentTeacher.subjects[0] || '',
        topic: '',
        difficulty: 'easy',
        question: '',
        options: ['', '', '', ''],
        correctOption: 0,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedQuestion(null);
    setFormData({
      subject: '',
      topic: '',
      difficulty: 'easy',
      question: '',
      options: ['', '', '', ''],
      correctOption: 0,
    });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      setQuestions(
        questions.map((q) =>
          q.id === selectedQuestion.id
            ? {
                ...q,
                ...formData,
                options: formData.options,
              }
            : q
        )
      );
    } else {
      const newQuestion = {
        id: getNextQuestionId(),
        ...formData,
        options: formData.options,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setQuestions([...questions, newQuestion]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      setQuestions(questions.filter((question) => question.id !== id));
    }
  };

  const subjectOptions = currentTeacher.subjects.map((subject) => ({
    value: subject,
    label: subject,
  }));

  const topicOptions = availableTopics.map((topic) => ({
    value: topic,
    label: topic,
  }));

  // Get unique values for filters
  const uniqueSubjects = [...new Set(questions.map((q) => q.subject))];
  const uniqueTopics = [...new Set(questions.map((q) => q.topic))];

  const subjectFilterOptions = uniqueSubjects.map((subject) => ({
    value: subject,
    label: subject,
  }));

  const topicFilterOptions = uniqueTopics.map((topic) => ({
    value: topic,
    label: topic,
  }));

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Question Bank</h1>
          <Button onClick={() => handleOpenModal()}>Add Question</Button>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            options={[{ value: '', label: 'All Subjects' }, ...subjectFilterOptions]}
          />
          <Select
            value={filterTopic}
            onChange={(e) => setFilterTopic(e.target.value)}
            options={[{ value: '', label: 'All Topics' }, ...topicFilterOptions]}
          />
          <Select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            options={[
              { value: '', label: 'All Difficulties' },
              ...difficultyLevels,
            ]}
          />
        </div>

        {/* Questions Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Question
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Topic
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Difficulty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Options
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Correct Answer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredQuestions.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    No questions found
                  </td>
                </tr>
              ) : (
                filteredQuestions.map((question) => (
                  <tr key={question.id}>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                      {question.question}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {question.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {question.topic}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(
                          question.difficulty
                        )}`}
                      >
                        {question.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                      <ol className="list-decimal list-inside">
                        {question.options.map((opt, idx) => (
                          <li key={idx} className="text-xs">
                            {opt}
                          </li>
                        ))}
                      </ol>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      {question.options[question.correctOption]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Button
                        variant="secondary"
                        onClick={() => handleOpenModal(question)}
                        className="text-xs"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(question.id)}
                        className="text-xs"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Total Questions</p>
            <p className="text-2xl font-bold text-blue-600">{questions.length}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Easy Questions</p>
            <p className="text-2xl font-bold text-green-600">
              {questions.filter((q) => q.difficulty === 'easy').length}
            </p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Medium Questions</p>
            <p className="text-2xl font-bold text-yellow-600">
              {questions.filter((q) => q.difficulty === 'medium').length}
            </p>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Hard Questions</p>
            <p className="text-2xl font-bold text-red-600">
              {questions.filter((q) => q.difficulty === 'hard').length}
            </p>
          </div>
        </div>
      </div>

      {/* Add/Edit Question Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={isEditMode ? 'Edit Question' : 'Add Question'}
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <Select
            label="Subject"
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value, topic: '' })
            }
            options={subjectOptions}
            required
          />
          <Select
            label="Topic"
            value={formData.topic}
            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            options={topicOptions}
            required
            disabled={!formData.subject}
          />
          <Select
            label="Difficulty"
            value={formData.difficulty}
            onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
            options={difficultyLevels}
            required
          />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Options <span className="text-red-500">*</span>
            </label>
            {formData.options.map((option, index) => (
              <div key={index} className="mb-2 flex items-center">
                <input
                  type="radio"
                  name="correctOption"
                  checked={formData.correctOption === index}
                  onChange={() => setFormData({ ...formData, correctOption: index })}
                  className="mr-2"
                />
                <Input
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  required
                  className="mb-0"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <Button type="button" variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {isEditMode ? 'Update' : 'Add'} Question
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Questions;
