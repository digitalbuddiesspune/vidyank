import { useState, useEffect } from 'react';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import {
  initialStudents,
  initialBatches,
  initialParents,
  getNextStudentId,
} from '../../data/dummyData';

/**
 * Students Page
 * Manage all students in the institute with CRUD operations
 */
function Students() {
  const [students, setStudents] = useState(initialStudents);
  const [batches, setBatches] = useState(initialBatches);
  const [parents, setParents] = useState(initialParents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBatch, setFilterBatch] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    rollNumber: '',
    batchId: '',
    parentId: '',
    status: 'active',
    admissionDate: '',
  });

  // Filter students
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBatch = filterBatch === '' || student.batchId === parseInt(filterBatch);
    return matchesSearch && matchesBatch;
  });

  const handleOpenModal = (student = null) => {
    if (student) {
      setSelectedStudent(student);
      setIsEditMode(true);
      setFormData({
        name: student.name,
        email: student.email,
        phone: student.phone,
        rollNumber: student.rollNumber,
        batchId: student.batchId.toString(),
        parentId: student.parentId.toString(),
        status: student.status,
        admissionDate: student.admissionDate,
      });
    } else {
      setIsEditMode(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        rollNumber: '',
        batchId: '',
        parentId: '',
        status: 'active',
        admissionDate: new Date().toISOString().split('T')[0],
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      rollNumber: '',
      batchId: '',
      parentId: '',
      status: 'active',
      admissionDate: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const batch = batches.find((b) => b.id === parseInt(formData.batchId));
    const parent = parents.find((p) => p.id === parseInt(formData.parentId));

    if (isEditMode) {
      // Update student
      setStudents(
        students.map((student) =>
          student.id === selectedStudent.id
            ? {
                ...student,
                ...formData,
                batchId: parseInt(formData.batchId),
                parentId: parseInt(formData.parentId),
                batchName: batch?.name || '',
              }
            : student
        )
      );
    } else {
      // Add new student
      const newStudent = {
        id: getNextStudentId(),
        ...formData,
        batchId: parseInt(formData.batchId),
        parentId: parseInt(formData.parentId),
        batchName: batch?.name || '',
      };
      setStudents([...students, newStudent]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter((student) => student.id !== id));
    }
  };

  const batchOptions = batches.map((batch) => ({
    value: batch.id.toString(),
    label: batch.name,
  }));

  const parentOptions = parents.map((parent) => ({
    value: parent.id.toString(),
    label: `${parent.name} (${parent.studentName})`,
  }));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Students</h1>
          <Button onClick={() => handleOpenModal()}>Add Student</Button>
        </div>

        {/* Search and Filter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Input
            type="text"
            placeholder="Search by name, email, or roll number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            value={filterBatch}
            onChange={(e) => setFilterBatch(e.target.value)}
            options={[{ value: '', label: 'All Batches' }, ...batchOptions]}
          />
        </div>

        {/* Students Table */}
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
                  Roll Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Batch
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
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No students found
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.rollNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.batchName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          student.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Button
                        variant="secondary"
                        onClick={() => handleOpenModal(student)}
                        className="text-xs"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(student.id)}
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
        title={isEditMode ? 'Edit Student' : 'Add Student'}
        size="md"
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
            label="Roll Number"
            value={formData.rollNumber}
            onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
            required
          />
          <Select
            label="Batch"
            value={formData.batchId}
            onChange={(e) => setFormData({ ...formData, batchId: e.target.value })}
            options={batchOptions}
            required
          />
          <Select
            label="Parent"
            value={formData.parentId}
            onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
            options={parentOptions}
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
          <Input
            label="Admission Date"
            type="date"
            value={formData.admissionDate}
            onChange={(e) => setFormData({ ...formData, admissionDate: e.target.value })}
            required
          />
          <div className="flex justify-end space-x-3 mt-6">
            <Button type="button" variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {isEditMode ? 'Update' : 'Add'} Student
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Students;
