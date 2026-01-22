import { useState } from 'react';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import {
  initialInstitutes,
  getNextInstituteId,
} from '../../data/superAdminData';

/**
 * Institutes Page
 * Add/Edit/Disable institute with search and filters
 */
function Institutes() {
  const [institutes, setInstitutes] = useState(initialInstitutes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPlan, setFilterPlan] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    city: '',
    state: '',
    contact: '',
    email: '',
    status: 'active',
  });

  // Filter institutes
  const filteredInstitutes = institutes.filter((institute) => {
    const matchesSearch =
      institute.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      institute.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      institute.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === '' || institute.status === filterStatus;
    const matchesPlan = filterPlan === '' || institute.subscriptionPlan === filterPlan;
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const handleOpenModal = (institute = null) => {
    if (institute) {
      setSelectedInstitute(institute);
      setIsEditMode(true);
      setFormData({
        name: institute.name,
        city: institute.city,
        state: institute.state,
        contact: institute.contact,
        email: institute.email,
        status: institute.status,
      });
    } else {
      setIsEditMode(false);
      setFormData({
        name: '',
        city: '',
        state: '',
        contact: '',
        email: '',
        status: 'active',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInstitute(null);
    setFormData({
      name: '',
      city: '',
      state: '',
      contact: '',
      email: '',
      status: 'active',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      setInstitutes(
        institutes.map((institute) =>
          institute.id === selectedInstitute.id
            ? { ...institute, ...formData }
            : institute
        )
      );
    } else {
      const newInstitute = {
        id: getNextInstituteId(),
        ...formData,
        subscriptionPlan: 'Free',
        subscriptionExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
        totalStudents: 0,
        totalTeachers: 0,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setInstitutes([...institutes, newInstitute]);
    }
    handleCloseModal();
  };

  const handleDisable = (id) => {
    if (window.confirm('Are you sure you want to disable this institute?')) {
      setInstitutes(
        institutes.map((institute) =>
          institute.id === id
            ? { ...institute, status: institute.status === 'active' ? 'disabled' : 'active' }
            : institute
        )
      );
    }
  };

  const uniquePlans = [...new Set(institutes.map((i) => i.subscriptionPlan))];
  const planOptions = uniquePlans.map((plan) => ({
    value: plan,
    label: plan,
  }));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Institutes</h1>
          <Button onClick={() => handleOpenModal()}>Add Institute</Button>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Input
            type="text"
            placeholder="Search institutes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            options={[
              { value: '', label: 'All Status' },
              { value: 'active', label: 'Active' },
              { value: 'disabled', label: 'Disabled' },
            ]}
          />
          <Select
            value={filterPlan}
            onChange={(e) => setFilterPlan(e.target.value)}
            options={[{ value: '', label: 'All Plans' }, ...planOptions]}
          />
        </div>

        {/* Institutes Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Institute Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subscription
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
              {filteredInstitutes.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                    No institutes found
                  </td>
                </tr>
              ) : (
                filteredInstitutes.map((institute) => (
                  <tr key={institute.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {institute.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {institute.city}, {institute.state}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{institute.contact}</div>
                      <div className="text-xs text-gray-400">{institute.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{institute.subscriptionPlan}</div>
                      <div className="text-xs text-gray-400">
                        Exp: {institute.subscriptionExpiry}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {institute.totalStudents}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {institute.totalTeachers}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          institute.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {institute.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Button
                        variant="secondary"
                        onClick={() => handleOpenModal(institute)}
                        className="text-xs"
                      >
                        Edit
                      </Button>
                      <Button
                        variant={institute.status === 'active' ? 'danger' : 'success'}
                        onClick={() => handleDisable(institute.id)}
                        className="text-xs"
                      >
                        {institute.status === 'active' ? 'Disable' : 'Enable'}
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Institute Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={isEditMode ? 'Edit Institute' : 'Add Institute'}
        size="md"
      >
        <form onSubmit={handleSubmit}>
          <Input
            label="Institute Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="City"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              required
            />
            <Input
              label="State"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              required
            />
          </div>
          <Input
            label="Contact"
            type="tel"
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            required
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Select
            label="Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            options={[
              { value: 'active', label: 'Active' },
              { value: 'disabled', label: 'Disabled' },
            ]}
            required
          />
          <div className="flex justify-end space-x-3 mt-6">
            <Button type="button" variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {isEditMode ? 'Update' : 'Add'} Institute
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Institutes;
