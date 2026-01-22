import { useState, useEffect } from 'react';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import {
  initialTeacherExams,
  initialQuestionBank,
  teacherSubjects,
  currentTeacher,
  getNextExamId,
} from '../../data/teacherData';

/**
 * Exams Page
 * Create exam, select subject + batch, attach questions from question bank, publish/unpublish
 */
function Exams() {
  const [exams, setExams] = useState(initialTeacherExams);
  const [questions] = useState(initialQuestionBank);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterBatch, setFilterBatch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    batchId: '',
    examDate: '',
    startTime: '',
    endTime: '',
    duration: '',
    totalMarks: '',
    passingMarks: '',
    status: 'draft',
    selectedQuestionIds: [],
  });

  // Filter exams
  const filteredExams = exams.filter((exam) => {
    const matchesSearch =
      exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === '' || exam.subject === filterSubject;
    const matchesBatch = filterBatch === '' || exam.batchId === parseInt(filterBatch);
    const matchesStatus = filterStatus === '' || exam.status === filterStatus;
    return matchesSearch && matchesSubject && matchesBatch && matchesStatus;
  });

  // Get batches for selected subject
  const availableBatches = formData.subject
    ? teacherSubjects
        .filter((s) => s.subject === formData.subject)
        .map((s) => ({ id: s.batchId, name: s.batchName }))
    : [];

  // Get questions for selected subject
  const availableQuestions = formData.subject
    ? questions.filter((q) => q.subject === formData.subject)
    : [];

  const handleOpenModal = (exam = null) => {
    if (exam) {
      setSelectedExam(exam);
      setIsEditMode(true);
      setFormData({
        title: exam.title,
        subject: exam.subject,
        batchId: exam.batchId.toString(),
        examDate: exam.examDate,
        startTime: exam.startTime,
        endTime: exam.endTime,
        duration: exam.duration.toString(),
        totalMarks: exam.totalMarks.toString(),
        passingMarks: exam.passingMarks.toString(),
        status: exam.status,
        selectedQuestionIds: exam.questionIds || [],
      });
    } else {
      setIsEditMode(false);
      setFormData({
        title: '',
        subject: '',
        batchId: '',
        examDate: '',
        startTime: '',
        endTime: '',
        duration: '',
        totalMarks: '',
        passingMarks: '',
        status: 'draft',
        selectedQuestionIds: [],
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedExam(null);
    setFormData({
      title: '',
      subject: '',
      batchId: '',
      examDate: '',
      startTime: '',
      endTime: '',
      duration: '',
      totalMarks: '',
      passingMarks: '',
      status: 'draft',
      selectedQuestionIds: [],
    });
  };

  const handleQuestionToggle = (questionId) => {
    setFormData({
      ...formData,
      selectedQuestionIds: formData.selectedQuestionIds.includes(questionId)
        ? formData.selectedQuestionIds.filter((id) => id !== questionId)
        : [...formData.selectedQuestionIds, questionId],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const batch = teacherSubjects.find((s) => s.batchId === parseInt(formData.batchId));

    if (isEditMode) {
      setExams(
        exams.map((exam) =>
          exam.id === selectedExam.id
            ? {
                ...exam,
                ...formData,
                batchId: parseInt(formData.batchId),
                batchName: batch?.batchName || '',
                duration: parseInt(formData.duration),
                totalMarks: parseInt(formData.totalMarks),
                passingMarks: parseInt(formData.passingMarks),
                questionIds: formData.selectedQuestionIds,
                questionCount: formData.selectedQuestionIds.length,
              }
            : exam
        )
      );
    } else {
      const newExam = {
        id: getNextExamId(),
        ...formData,
        batchId: parseInt(formData.batchId),
        batchName: batch?.batchName || '',
        duration: parseInt(formData.duration),
        totalMarks: parseInt(formData.totalMarks),
        passingMarks: parseInt(formData.passingMarks),
        questionIds: formData.selectedQuestionIds,
        questionCount: formData.selectedQuestionIds.length,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setExams([...exams, newExam]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      setExams(exams.filter((exam) => exam.id !== id));
    }
  };

  const handleTogglePublish = (exam) => {
    setExams(
      exams.map((e) =>
        e.id === exam.id
          ? { ...e, status: e.status === 'published' ? 'draft' : 'published' }
          : e
      )
    );
  };

  const subjectOptions = currentTeacher.subjects.map((subject) => ({
    value: subject,
    label: subject,
  }));

  const batchOptions = availableBatches.map((batch) => ({
    value: batch.id.toString(),
    label: batch.name,
  }));

  const uniqueSubjects = [...new Set(exams.map((e) => e.subject))];
  const subjectFilterOptions = uniqueSubjects.map((subject) => ({
    value: subject,
    label: subject,
  }));

  const uniqueBatches = [...new Set(teacherSubjects.map((s) => s.batchName))];
  const batchFilterOptions = uniqueBatches.map((batch, index) => ({
    value: teacherSubjects.find((s) => s.batchName === batch)?.batchId.toString() || '',
    label: batch,
  }));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Exams</h1>
          <Button onClick={() => handleOpenModal()}>Create Exam</Button>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Input
            type="text"
            placeholder="Search exams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            options={[{ value: '', label: 'All Subjects' }, ...subjectFilterOptions]}
          />
          <Select
            value={filterBatch}
            onChange={(e) => setFilterBatch(e.target.value)}
            options={[{ value: '', label: 'All Batches' }, ...batchFilterOptions]}
          />
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            options={[
              { value: '', label: 'All Status' },
              { value: 'published', label: 'Published' },
              { value: 'draft', label: 'Draft' },
            ]}
          />
        </div>

        {/* Exams Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Batch
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Marks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Questions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredExams.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                    No exams found
                  </td>
                </tr>
              ) : (
                filteredExams.map((exam) => (
                  <tr key={exam.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {exam.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {exam.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {exam.batchName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{exam.examDate}</div>
                      <div className="text-xs text-gray-400">
                        {exam.startTime} - {exam.endTime}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {exam.duration} min
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {exam.totalMarks} ({exam.passingMarks} pass)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {exam.questionCount || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          exam.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {exam.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Button
                        variant={exam.status === 'published' ? 'secondary' : 'success'}
                        onClick={() => handleTogglePublish(exam)}
                        className="text-xs"
                      >
                        {exam.status === 'published' ? 'Unpublish' : 'Publish'}
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => handleOpenModal(exam)}
                        className="text-xs"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(exam.id)}
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

      {/* Create/Edit Exam Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={isEditMode ? 'Edit Exam' : 'Create Exam'}
        size="xl"
      >
        <form onSubmit={handleSubmit}>
          <Input
            label="Exam Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <Select
            label="Subject"
            value={formData.subject}
            onChange={(e) =>
              setFormData({
                ...formData,
                subject: e.target.value,
                batchId: '',
                selectedQuestionIds: [],
              })
            }
            options={subjectOptions}
            required
          />
          <Select
            label="Batch"
            value={formData.batchId}
            onChange={(e) => setFormData({ ...formData, batchId: e.target.value })}
            options={batchOptions}
            required
            disabled={!formData.subject}
          />
          <Input
            label="Exam Date"
            type="date"
            value={formData.examDate}
            onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Start Time"
              type="time"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              required
            />
            <Input
              label="End Time"
              type="time"
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              required
            />
          </div>
          <Input
            label="Duration (minutes)"
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Total Marks"
              type="number"
              value={formData.totalMarks}
              onChange={(e) => setFormData({ ...formData, totalMarks: e.target.value })}
              required
            />
            <Input
              label="Passing Marks"
              type="number"
              value={formData.passingMarks}
              onChange={(e) => setFormData({ ...formData, passingMarks: e.target.value })}
              required
            />
          </div>

          {/* Question Selection */}
          {formData.subject && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Questions from Question Bank
              </label>
              <div className="max-h-60 overflow-y-auto border rounded-lg p-3">
                {availableQuestions.length === 0 ? (
                  <p className="text-sm text-gray-500">No questions available for this subject</p>
                ) : (
                  availableQuestions.map((question) => (
                    <label
                      key={question.id}
                      className="flex items-start p-2 hover:bg-gray-50 cursor-pointer rounded"
                    >
                      <input
                        type="checkbox"
                        checked={formData.selectedQuestionIds.includes(question.id)}
                        onChange={() => handleQuestionToggle(question.id)}
                        className="mt-1 mr-3"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">
                          {question.question}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {question.topic} • {question.difficulty}
                        </div>
                      </div>
                    </label>
                  ))
                )}
              </div>
              {formData.selectedQuestionIds.length > 0 && (
                <p className="text-sm text-gray-600 mt-2">
                  {formData.selectedQuestionIds.length} question(s) selected
                </p>
              )}
            </div>
          )}

          <Select
            label="Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            options={[
              { value: 'draft', label: 'Draft' },
              { value: 'published', label: 'Published' },
            ]}
            required
          />
          <div className="flex justify-end space-x-3 mt-6">
            <Button type="button" variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {isEditMode ? 'Update' : 'Create'} Exam
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Exams;
