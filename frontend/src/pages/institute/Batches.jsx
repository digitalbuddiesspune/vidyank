import { useState, useEffect } from 'react';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import {
  initialBatches,
  initialStudents,
  initialTeachers,
  getNextBatchId,
} from '../../data/dummyData';

/**
 * Batches Page
 * Create batch, assign students, assign teachers, batch timetable
 */
function Batches() {
  const [batches, setBatches] = useState(initialBatches);
  const [students, setStudents] = useState(initialStudents);
  const [teachers, setTeachers] = useState(initialTeachers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isTimetableModalOpen, setIsTimetableModalOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'active',
  });

  // Filter batches
  const filteredBatches = batches.filter((batch) =>
    batch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    batch.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (batch = null) => {
    if (batch) {
      setSelectedBatch(batch);
      setIsEditMode(true);
      setFormData({
        name: batch.name,
        code: batch.code,
        description: batch.description,
        startDate: batch.startDate,
        endDate: batch.endDate,
        status: batch.status,
      });
    } else {
      setIsEditMode(false);
      setFormData({
        name: '',
        code: '',
        description: '',
        startDate: '',
        endDate: '',
        status: 'active',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBatch(null);
    setFormData({
      name: '',
      code: '',
      description: '',
      startDate: '',
      endDate: '',
      status: 'active',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      setBatches(
        batches.map((batch) =>
          batch.id === selectedBatch.id
            ? { ...batch, ...formData }
            : batch
        )
      );
    } else {
      const newBatch = {
        id: getNextBatchId(),
        ...formData,
        studentIds: [],
        studentCount: 0,
        teacherIds: [],
        teacherCount: 0,
        timetable: {},
      };
      setBatches([...batches, newBatch]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this batch?')) {
      setBatches(batches.filter((batch) => batch.id !== id));
      // Remove batch assignment from students
      setStudents(
        students.map((student) =>
          student.batchId === id ? { ...student, batchId: null, batchName: '' } : student
        )
      );
    }
  };

  const handleOpenAssignModal = (batch) => {
    setSelectedBatch(batch);
    setIsAssignModalOpen(true);
  };

  const handleAssignStudents = (studentIds) => {
    const updatedBatch = {
      ...selectedBatch,
      studentIds,
      studentCount: studentIds.length,
    };
    setBatches(batches.map((b) => (b.id === selectedBatch.id ? updatedBatch : b)));
    // Update students with batch assignment
    setStudents(
      students.map((student) => {
        if (studentIds.includes(student.id)) {
          return { ...student, batchId: selectedBatch.id, batchName: selectedBatch.name };
        } else if (student.batchId === selectedBatch.id) {
          return { ...student, batchId: null, batchName: '' };
        }
        return student;
      })
    );
    setIsAssignModalOpen(false);
    setSelectedBatch(null);
  };

  const handleAssignTeachers = (teacherIds) => {
    const updatedBatch = {
      ...selectedBatch,
      teacherIds,
      teacherCount: teacherIds.length,
    };
    setBatches(batches.map((b) => (b.id === selectedBatch.id ? updatedBatch : b)));
    setIsAssignModalOpen(false);
    setSelectedBatch(null);
  };

  const handleOpenTimetableModal = (batch) => {
    setSelectedBatch(batch);
    setIsTimetableModalOpen(true);
  };

  const handleSaveTimetable = (timetable) => {
    setBatches(
      batches.map((b) =>
        b.id === selectedBatch.id ? { ...b, timetable } : b
      )
    );
    setIsTimetableModalOpen(false);
    setSelectedBatch(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Batches</h1>
          <Button onClick={() => handleOpenModal()}>Create Batch</Button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search batches..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Batches Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Students
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teachers
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
              {filteredBatches.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No batches found
                  </td>
                </tr>
              ) : (
                filteredBatches.map((batch) => (
                  <tr key={batch.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {batch.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {batch.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {batch.studentCount || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {batch.teacherCount || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          batch.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {batch.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Button
                        variant="secondary"
                        onClick={() => handleOpenModal(batch)}
                        className="text-xs"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => handleOpenAssignModal(batch)}
                        className="text-xs"
                      >
                        Assign
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => handleOpenTimetableModal(batch)}
                        className="text-xs"
                      >
                        Timetable
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(batch.id)}
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

      {/* Create/Edit Batch Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={isEditMode ? 'Edit Batch' : 'Create Batch'}
        size="md"
      >
        <form onSubmit={handleSubmit}>
          <Input
            label="Batch Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Batch Code"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            required
          />
          <Input
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <Input
            label="Start Date"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            required
          />
          <Input
            label="End Date"
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            required
          />
          <Select
            label="Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            options={[
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ]}
            required
          />
          <div className="flex justify-end space-x-3 mt-6">
            <Button type="button" variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {isEditMode ? 'Update' : 'Create'} Batch
            </Button>
          </div>
        </form>
      </Modal>

      {/* Assign Students/Teachers Modal */}
      <AssignModal
        isOpen={isAssignModalOpen}
        onClose={() => {
          setIsAssignModalOpen(false);
          setSelectedBatch(null);
        }}
        batch={selectedBatch}
        students={students}
        teachers={teachers}
        onAssignStudents={handleAssignStudents}
        onAssignTeachers={handleAssignTeachers}
      />

      {/* Timetable Modal */}
      <TimetableModal
        isOpen={isTimetableModalOpen}
        onClose={() => {
          setIsTimetableModalOpen(false);
          setSelectedBatch(null);
        }}
        batch={selectedBatch}
        onSave={handleSaveTimetable}
      />
    </div>
  );
}

// Assign Modal Component
function AssignModal({
  isOpen,
  onClose,
  batch,
  students,
  teachers,
  onAssignStudents,
  onAssignTeachers,
}) {
  const [activeTab, setActiveTab] = useState('students');
  const [selectedStudentIds, setSelectedStudentIds] = useState(
    batch?.studentIds || []
  );
  const [selectedTeacherIds, setSelectedTeacherIds] = useState(
    batch?.teacherIds || []
  );

  useEffect(() => {
    if (batch) {
      setSelectedStudentIds(batch.studentIds || []);
      setSelectedTeacherIds(batch.teacherIds || []);
    }
  }, [batch]);

  const handleStudentToggle = (studentId) => {
    setSelectedStudentIds((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleTeacherToggle = (teacherId) => {
    setSelectedTeacherIds((prev) =>
      prev.includes(teacherId)
        ? prev.filter((id) => id !== teacherId)
        : [...prev, teacherId]
    );
  };

  const handleSave = () => {
    if (activeTab === 'students') {
      onAssignStudents(selectedStudentIds);
    } else {
      onAssignTeachers(selectedTeacherIds);
    }
  };

  if (!batch) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Assign to ${batch.name}`}
      size="lg"
    >
      <div className="mb-4">
        <div className="flex space-x-2 border-b">
          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'students'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500'
            }`}
          >
            Students
          </button>
          <button
            onClick={() => setActiveTab('teachers')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'teachers'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500'
            }`}
          >
            Teachers
          </button>
        </div>
      </div>

      {activeTab === 'students' && (
        <div className="max-h-96 overflow-y-auto">
          {students.map((student) => (
            <label
              key={student.id}
              className="flex items-center p-3 hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedStudentIds.includes(student.id)}
                onChange={() => handleStudentToggle(student.id)}
                className="mr-3"
              />
              <div>
                <div className="font-medium">{student.name}</div>
                <div className="text-sm text-gray-500">{student.email}</div>
              </div>
            </label>
          ))}
        </div>
      )}

      {activeTab === 'teachers' && (
        <div className="max-h-96 overflow-y-auto">
          {teachers.map((teacher) => (
            <label
              key={teacher.id}
              className="flex items-center p-3 hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedTeacherIds.includes(teacher.id)}
                onChange={() => handleTeacherToggle(teacher.id)}
                className="mr-3"
              />
              <div>
                <div className="font-medium">{teacher.name}</div>
                <div className="text-sm text-gray-500">
                  {teacher.subjects.join(', ')}
                </div>
              </div>
            </label>
          ))}
        </div>
      )}

      <div className="flex justify-end space-x-3 mt-6">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Assignments
        </Button>
      </div>
    </Modal>
  );
}

// Timetable Modal Component
function TimetableModal({ isOpen, onClose, batch, onSave }) {
  const [timetable, setTimetable] = useState(batch?.timetable || {});

  useEffect(() => {
    if (batch) {
      setTimetable(batch.timetable || {});
    }
  }, [batch]);

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  const [editingDay, setEditingDay] = useState(null);
  const [editingValue, setEditingValue] = useState('');

  const handleEdit = (day) => {
    setEditingDay(day);
    setEditingValue(timetable[day]?.join('\n') || '');
  };

  const handleSaveDay = (day) => {
    const classes = editingValue
      .split('\n')
      .filter((line) => line.trim())
      .map((line) => line.trim());
    setTimetable({ ...timetable, [day]: classes });
    setEditingDay(null);
    setEditingValue('');
  };

  const handleSaveAll = () => {
    onSave(timetable);
  };

  if (!batch) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Timetable - ${batch.name}`}
      size="xl"
    >
      <div className="space-y-4">
        {days.map((day) => (
          <div key={day} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold capitalize">{day}</h3>
              {editingDay !== day && (
                <Button
                  variant="secondary"
                  onClick={() => handleEdit(day)}
                  className="text-xs"
                >
                  Edit
                </Button>
              )}
            </div>
            {editingDay === day ? (
              <div>
                <textarea
                  value={editingValue}
                  onChange={(e) => setEditingValue(e.target.value)}
                  className="w-full p-2 border rounded"
                  rows="4"
                  placeholder="Enter classes (one per line), e.g., Mathematics: 9:00 AM"
                />
                <div className="flex space-x-2 mt-2">
                  <Button
                    variant="primary"
                    onClick={() => handleSaveDay(day)}
                    className="text-xs"
                  >
                    Save
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setEditingDay(null);
                      setEditingValue('');
                    }}
                    className="text-xs"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                {timetable[day] && timetable[day].length > 0 ? (
                  <ul className="list-disc list-inside">
                    {timetable[day].map((cls, idx) => (
                      <li key={idx} className="text-sm text-gray-700">
                        {cls}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No classes scheduled</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-end space-x-3 mt-6">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSaveAll}>
          Save Timetable
        </Button>
      </div>
    </Modal>
  );
}

export default Batches;
