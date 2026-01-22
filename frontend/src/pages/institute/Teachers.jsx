import { useState } from 'react';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import {
  initialTeachers,
  initialBatches,
  subjects,
  getNextTeacherId,
} from '../../data/dummyData';

/**
 * Teachers Page
 * Add teacher, assign subjects + batch
 */
function Teachers() {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [batches, setBatches] = useState(initialBatches);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    employeeId: '',
    subjects: [],
    batchIds: [],
    status: 'active',
    joinDate: '',
  });

  // Filter teachers
  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject =
      filterSubject === '' || teacher.subjects.includes(filterSubject);
    return matchesSearch && matchesSubject;
  });

  const handleOpenModal = (teacher = null) => {
    if (teacher) {
      setSelectedTeacher(teacher);
      setIsEditMode(true);
      setFormData({
        name: teacher.name,
        email: teacher.email,
        phone: teacher.phone,
        employeeId: teacher.employeeId,
        subjects: teacher.subjects,
        batchIds: teacher.batchIds,
        status: teacher.status,
        joinDate: teacher.joinDate,
      });
    } else {
      setIsEditMode(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        employeeId: '',
        subjects: [],
        batchIds: [],
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0],
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTeacher(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      employeeId: '',
      subjects: [],
      batchIds: [],
      status: 'active',
      joinDate: '',
    });
  };

  const handleSubjectToggle = (subject) => {
    setFormData({
      ...formData,
      subjects: formData.subjects.includes(subject)
        ? formData.subjects.filter((s) => s !== subject)
        : [...formData.subjects, subject],
    });
  };

  const handleBatchToggle = (batchId) => {
    setFormData({
      ...formData,
      batchIds: formData.batchIds.includes(batchId)
        ? formData.batchIds.filter((id) => id !== batchId)
        : [...formData.batchIds, batchId],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const batchNames = batches
      .filter((b) => formData.batchIds.includes(b.id))
      .map((b) => b.name);

    if (isEditMode) {
      setTeachers(
        teachers.map((teacher) =>
          teacher.id === selectedTeacher.id
            ? {
                ...teacher,
                ...formData,
                batchNames,
              }
            : teacher
        )
      );
    } else {
      const newTeacher = {
        id: getNextTeacherId(),
        ...formData,
        batchNames,
      };
      setTeachers([...teachers, newTeacher]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      setTeachers(teachers.filter((teacher) => teacher.id !== id));
    }
  };

  const subjectOptions = subjects.map((subject) => ({
    value: subject,
    label: subject,
  }));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Teachers</h1>
          <Button onClick={() => handleOpenModal()}>Add Teacher</Button>
        </div>

        {/* Search and Filter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Input
            type="text"
            placeholder="Search by name, email, or employee ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            options={[{ value: '', label: 'All Subjects' }, ...subjectOptions]}
          />
        </div>

        {/* Teachers Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subjects
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Batches
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
              {filteredTeachers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    No teachers found
                  </td>
                </tr>
              ) : (
                filteredTeachers.map((teacher) => (
                  <tr key={teacher.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {teacher.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {teacher.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {teacher.employeeId}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {teacher.subjects.join(', ')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {teacher.batchNames?.join(', ') || 'None'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          teacher.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {teacher.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Button
                        variant="secondary"
                        onClick={() => handleOpenModal(teacher)}
                        className="text-xs"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(teacher.id)}
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
        title={isEditMode ? 'Edit Teacher' : 'Add Teacher'}
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <Input
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input
            label="Phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
          <Input
            label="Employee ID"
            value={formData.employeeId}
            onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
            required
          />
          <Input
            label="Join Date"
            type="date"
            value={formData.joinDate}
            onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
            required
          />

          {/* Subjects Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subjects <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded-lg p-3">
              {subjects.map((subject) => (
                <label
                  key={subject}
                  className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input
                    type="checkbox"
                    checked={formData.subjects.includes(subject)}
                    onChange={() => handleSubjectToggle(subject)}
                    className="mr-2"
                  />
                  <span className="text-sm">{subject}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Batches Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Batches
            </label>
            <div className="max-h-40 overflow-y-auto border rounded-lg p-3">
              {batches.map((batch) => (
                <label
                  key={batch.id}
                  className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input
                    type="checkbox"
                    checked={formData.batchIds.includes(batch.id)}
                    onChange={() => handleBatchToggle(batch.id)}
                    className="mr-2"
                  />
                  <span className="text-sm">{batch.name}</span>
                </label>
              ))}
            </div>
          </div>

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
              {isEditMode ? 'Update' : 'Add'} Teacher
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Teachers;
