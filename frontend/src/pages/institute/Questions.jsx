import { useState, useEffect } from 'react';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import {
  initialQuestions,
  initialExams,
  questionTypes,
  getNextQuestionId,
} from '../../data/dummyData';

/**
 * Questions Page
 * Add questions to selected exam
 */
function Questions() {
  const [questions, setQuestions] = useState(initialQuestions);
  const [exams, setExams] = useState(initialExams);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedExamId, setSelectedExamId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    examId: '',
    question: '',
    type: 'multiple_choice',
    options: ['', '', '', ''],
    correctAnswer: '',
    marks: '',
    order: '',
  });

  // Filter questions by selected exam
  const filteredQuestions = questions.filter((question) => {
    const matchesExam = selectedExamId === '' || question.examId === parseInt(selectedExamId);
    const matchesSearch =
      question.question.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesExam && matchesSearch;
  });

  // Update exam question count when questions change
  useEffect(() => {
    const examQuestionCounts = {};
    questions.forEach((q) => {
      examQuestionCounts[q.examId] = (examQuestionCounts[q.examId] || 0) + 1;
    });
    setExams((prevExams) =>
      prevExams.map((exam) => ({
        ...exam,
        questionCount: examQuestionCounts[exam.id] || 0,
      }))
    );
  }, [questions]);

  const handleOpenModal = (question = null) => {
    if (question) {
      setSelectedQuestion(question);
      setIsEditMode(true);
      setFormData({
        examId: question.examId.toString(),
        question: question.question,
        type: question.type,
        options: question.options.length > 0 ? question.options : ['', '', '', ''],
        correctAnswer: question.correctAnswer,
        marks: question.marks.toString(),
        order: question.order.toString(),
      });
    } else {
      setIsEditMode(false);
      setFormData({
        examId: selectedExamId || '',
        question: '',
        type: 'multiple_choice',
        options: ['', '', '', ''],
        correctAnswer: '',
        marks: '',
        order: (filteredQuestions.length + 1).toString(),
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedQuestion(null);
    setFormData({
      examId: '',
      question: '',
      type: 'multiple_choice',
      options: ['', '', '', ''],
      correctAnswer: '',
      marks: '',
      order: '',
    });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredOptions = formData.options.filter((opt) => opt.trim() !== '');

    if (isEditMode) {
      setQuestions(
        questions.map((q) =>
          q.id === selectedQuestion.id
            ? {
                ...q,
                ...formData,
                examId: parseInt(formData.examId),
                options: filteredOptions,
                marks: parseFloat(formData.marks),
                order: parseInt(formData.order),
              }
            : q
        )
      );
    } else {
      const newQuestion = {
        id: getNextQuestionId(),
        examId: parseInt(formData.examId),
        question: formData.question,
        type: formData.type,
        options: filteredOptions,
        correctAnswer: formData.correctAnswer,
        marks: parseFloat(formData.marks),
        order: parseInt(formData.order),
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

  const examOptions = exams.map((exam) => ({
    value: exam.id.toString(),
    label: `${exam.title} (${exam.batchName})`,
  }));

  const selectedExam = exams.find((e) => e.id === parseInt(selectedExamId));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Questions</h1>
          <Button
            onClick={() => handleOpenModal()}
            disabled={!selectedExamId}
          >
            Add Question
          </Button>
        </div>

        {/* Exam Selection and Search */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Select
            label="Select Exam"
            value={selectedExamId}
            onChange={(e) => setSelectedExamId(e.target.value)}
            options={[{ value: '', label: 'All Exams' }, ...examOptions]}
          />
          <Input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {selectedExam && (
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Selected Exam:</span> {selectedExam.title} |{' '}
              <span className="font-semibold">Total Marks:</span> {selectedExam.totalMarks} |{' '}
              <span className="font-semibold">Questions Added:</span>{' '}
              {filteredQuestions.length}
            </p>
          </div>
        )}

        {/* Questions Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Question
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Options
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Correct Answer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Marks
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
                    {selectedExamId
                      ? 'No questions found for this exam'
                      : 'Please select an exam to view questions'}
                  </td>
                </tr>
              ) : (
                filteredQuestions
                  .sort((a, b) => a.order - b.order)
                  .map((question) => (
                    <tr key={question.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {question.order}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                        {question.question}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                          {question.type.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                        {question.options.length > 0 ? (
                          <ul className="list-disc list-inside">
                            {question.options.map((opt, idx) => (
                              <li key={idx} className="text-xs">
                                {opt}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-green-600">
                        {question.correctAnswer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {question.marks}
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
            label="Exam"
            value={formData.examId}
            onChange={(e) => setFormData({ ...formData, examId: e.target.value })}
            options={examOptions}
            required
            disabled={isEditMode}
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
          <Select
            label="Question Type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            options={questionTypes}
            required
          />
          {(formData.type === 'multiple_choice' || formData.type === 'true_false') && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Options <span className="text-red-500">*</span>
              </label>
              {formData.options.map((option, index) => (
                <Input
                  key={index}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  required
                />
              ))}
            </div>
          )}
          <Input
            label="Correct Answer"
            value={formData.correctAnswer}
            onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
            required
            placeholder={
              formData.type === 'essay'
                ? 'Leave empty for essay questions'
                : 'Enter correct answer'
            }
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Marks"
              type="number"
              step="0.01"
              value={formData.marks}
              onChange={(e) => setFormData({ ...formData, marks: e.target.value })}
              required
            />
            <Input
              label="Order"
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: e.target.value })}
              required
            />
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
