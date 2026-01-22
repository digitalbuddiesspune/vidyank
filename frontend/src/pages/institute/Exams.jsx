import { useState } from 'react';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import {
  initialExams,
  initialBatches,
  subjects,
  getNextExamId,
} from '../../data/dummyData';

/**
 * Exams Page
 * Create exam, publish/unpublish
 */
function Exams() {
  const [exams, setExams] = useState(initialExams);
  const [batches, setBatches] = useState(initialBatches);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
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
  });

  // Filter exams
  const filteredExams = exams.filter((exam) => {
    const matchesSearch =
      exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBatch = filterBatch === '' || exam.batchId === parseInt(filterBatch);
    const matchesStatus = filterStatus === '' || exam.status === filterStatus;
    return matchesSearch && matchesBatch && matchesStatus;
  });

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
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const batch = batches.find((b) => b.id === parseInt(formData.batchId));

    if (isEditMode) {
      setExams(
        exams.map((exam) =>
          exam.id === selectedExam.id
            ? {
                ...exam,
                ...formData,
                batchId: parseInt(formData.batchId),
                batchName: batch?.name || '',
                duration: parseInt(formData.duration),
                totalMarks: parseInt(formData.totalMarks),
                passingMarks: parseInt(formData.passingMarks),
              }
            : exam
        )
      );
    } else {
      const newExam = {
        id: getNextExamId(),
        ...formData,
        batchId: parseInt(formData.batchId),
        batchName: batch?.name || '',
        duration: parseInt(formData.duration),
        totalMarks: parseInt(formData.totalMarks),
        passingMarks: parseInt(formData.passingMarks),
        questionCount: 0,
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

  const batchOptions = batches.map((batch) => ({
    value: batch.id.toString(),
    label: batch.name,
  }));

  const subjectOptions = subjects.map((subject) => ({
    value: subject,
    label: subject,
  }));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Exams</h1>
          <Button onClick={() => handleOpenModal()}>Create Exam</Button>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Input
            type="text"
            placeholder="Search exams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={isEditMode ? 'Edit Exam' : 'Create Exam'}
        size="md"
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
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            options={subjectOptions}
            required
          />
          <Select
            label="Batch"
            value={formData.batchId}
            onChange={(e) => setFormData({ ...formData, batchId: e.target.value })}
            options={batchOptions}
            required
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
