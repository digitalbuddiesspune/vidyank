import { useState } from 'react';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import {
  initialParents,
  initialStudents,
  getNextParentId,
} from '../../data/dummyData';

/**
 * Parents Page
 * Manage parents with basic CRUD operations
 */
function Parents() {
  const [parents, setParents] = useState(initialParents);
  const [students] = useState(initialStudents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedParent, setSelectedParent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    studentId: '',
    relation: 'Father',
    status: 'active',
  });

  // Filter parents
  const filteredParents = parents.filter((parent) => {
    const matchesSearch =
      parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parent.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === '' || parent.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleOpenModal = (parent = null) => {
    if (parent) {
      setSelectedParent(parent);
      setIsEditMode(true);
      setFormData({
        name: parent.name,
        email: parent.email,
        phone: parent.phone,
        studentId: parent.studentId.toString(),
        relation: parent.relation,
        status: parent.status,
      });
    } else {
      setIsEditMode(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        studentId: '',
        relation: 'Father',
        status: 'active',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedParent(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      studentId: '',
      relation: 'Father',
      status: 'active',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const student = students.find((s) => s.id === parseInt(formData.studentId));

    if (isEditMode) {
      setParents(
        parents.map((parent) =>
          parent.id === selectedParent.id
            ? {
                ...parent,
                ...formData,
                studentId: parseInt(formData.studentId),
                studentName: student?.name || '',
              }
            : parent
        )
      );
    } else {
      const newParent = {
        id: getNextParentId(),
        ...formData,
        studentId: parseInt(formData.studentId),
        studentName: student?.name || '',
      };
      setParents([...parents, newParent]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this parent?')) {
      setParents(parents.filter((parent) => parent.id !== id));
    }
  };

  const studentOptions = students.map((student) => ({
    value: student.id.toString(),
    label: `${student.name} (${student.rollNumber})`,
  }));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Parents</h1>
          <Button onClick={() => handleOpenModal()}>Add Parent</Button>
        </div>

        {/* Search and Filter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Input
            type="text"
            placeholder="Search by name, email, or student name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            options={[
              { value: '', label: 'All Status' },
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ]}
          />
        </div>

        {/* Parents Table */}
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
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Relation
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
              {filteredParents.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    No parents found
                  </td>
                </tr>
              ) : (
                filteredParents.map((parent) => (
                  <tr key={parent.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {parent.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {parent.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {parent.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {parent.studentName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {parent.relation}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          parent.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {parent.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Button
                        variant="secondary"
                        onClick={() => handleOpenModal(parent)}
                        className="text-xs"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(parent.id)}
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
        title={isEditMode ? 'Edit Parent' : 'Add Parent'}
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
          <Select
            label="Student"
            value={formData.studentId}
            onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
            options={studentOptions}
            required
          />
          <Select
            label="Relation"
            value={formData.relation}
            onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
            options={[
              { value: 'Father', label: 'Father' },
              { value: 'Mother', label: 'Mother' },
              { value: 'Guardian', label: 'Guardian' },
            ]}
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
              {isEditMode ? 'Update' : 'Add'} Parent
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Parents;
