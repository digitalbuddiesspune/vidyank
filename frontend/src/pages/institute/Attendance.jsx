import { useState } from 'react';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import {
  initialAttendance,
  initialStudents,
  initialBatches,
  subjects,
} from '../../data/dummyData';

/**
 * Attendance Page
 * Student attendance tracking
 */
function Attendance() {
  const [attendance, setAttendance] = useState(initialAttendance);
  const [students] = useState(initialStudents);
  const [batches] = useState(initialBatches);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBatch, setFilterBatch] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const [formData, setFormData] = useState({
    studentId: '',
    batchId: '',
    date: new Date().toISOString().split('T')[0],
    status: 'present',
    subject: '',
  });

  // Filter attendance
  const filteredAttendance = attendance.filter((record) => {
    const matchesSearch =
      record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBatch = filterBatch === '' || record.batchId === parseInt(filterBatch);
    const matchesDate = filterDate === '' || record.date === filterDate;
    const matchesStatus = filterStatus === '' || record.status === filterStatus;
    return matchesSearch && matchesBatch && matchesDate && matchesStatus;
  });

  const handleOpenModal = () => {
    setFormData({
      studentId: '',
      batchId: '',
      date: new Date().toISOString().split('T')[0],
      status: 'present',
      subject: '',
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      studentId: '',
      batchId: '',
      date: new Date().toISOString().split('T')[0],
      status: 'present',
      subject: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const student = students.find((s) => s.id === parseInt(formData.studentId));
    const batch = batches.find((b) => b.id === parseInt(formData.batchId));

    // Check if attendance already exists for this student on this date
    const existingRecord = attendance.find(
      (a) =>
        a.studentId === parseInt(formData.studentId) &&
        a.date === formData.date &&
        a.subject === formData.subject
    );

    if (existingRecord) {
      // Update existing record
      setAttendance(
        attendance.map((a) =>
          a.id === existingRecord.id
            ? {
                ...a,
                status: formData.status,
              }
            : a
        )
      );
    } else {
      // Add new record
      const newRecord = {
        id: attendance.length + 1,
        studentId: parseInt(formData.studentId),
        studentName: student?.name || '',
        rollNumber: student?.rollNumber || '',
        batchId: parseInt(formData.batchId),
        batchName: batch?.name || '',
        date: formData.date,
        status: formData.status,
        subject: formData.subject,
      };
      setAttendance([...attendance, newRecord]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this attendance record?')) {
      setAttendance(attendance.filter((record) => record.id !== id));
    }
  };

  // Get students for selected batch
  const batchStudents =
    formData.batchId
      ? students.filter((s) => s.batchId === parseInt(formData.batchId))
      : [];

  const batchOptions = batches.map((batch) => ({
    value: batch.id.toString(),
    label: batch.name,
  }));

  const studentOptions = batchStudents.map((student) => ({
    value: student.id.toString(),
    label: `${student.name} (${student.rollNumber})`,
  }));

  const subjectOptions = subjects.map((subject) => ({
    value: subject,
    label: subject,
  }));

  // Calculate statistics
  const stats = {
    totalRecords: filteredAttendance.length,
    present: filteredAttendance.filter((r) => r.status === 'present').length,
    absent: filteredAttendance.filter((r) => r.status === 'absent').length,
    presentPercentage:
      filteredAttendance.length > 0
        ? (
            (filteredAttendance.filter((r) => r.status === 'present').length /
              filteredAttendance.length) *
            100
          ).toFixed(2)
        : 0,
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Attendance</h1>
          <Button onClick={handleOpenModal}>Mark Attendance</Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Total Records</p>
            <p className="text-2xl font-bold text-blue-600">{stats.totalRecords}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Present</p>
            <p className="text-2xl font-bold text-green-600">{stats.present}</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Absent</p>
            <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Present %</p>
            <p className="text-2xl font-bold text-purple-600">
              {stats.presentPercentage}%
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Input
            type="text"
            placeholder="Search by student name or roll number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            value={filterBatch}
            onChange={(e) => setFilterBatch(e.target.value)}
            options={[{ value: '', label: 'All Batches' }, ...batchOptions]}
          />
          <Input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            placeholder="Filter by date"
          />
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            options={[
              { value: '', label: 'All Status' },
              { value: 'present', label: 'Present' },
              { value: 'absent', label: 'Absent' },
            ]}
          />
        </div>

        {/* Attendance Table */}
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
                  Batch
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
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
              {filteredAttendance.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    No attendance records found
                  </td>
                </tr>
              ) : (
                filteredAttendance.map((record) => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {record.studentName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.rollNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.batchName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.date}
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(record.id)}
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

      {/* Mark Attendance Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Mark Attendance"
        size="md"
      >
        <form onSubmit={handleSubmit}>
          <Select
            label="Batch"
            value={formData.batchId}
            onChange={(e) => setFormData({ ...formData, batchId: e.target.value, studentId: '' })}
            options={batchOptions}
            required
          />
          <Select
            label="Student"
            value={formData.studentId}
            onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
            options={studentOptions}
            required
            disabled={!formData.batchId}
          />
          <Input
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
            label="Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            options={[
              { value: 'present', label: 'Present' },
              { value: 'absent', label: 'Absent' },
            ]}
            required
          />
          <div className="flex justify-end space-x-3 mt-6">
            <Button type="button" variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Mark Attendance
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Attendance;
