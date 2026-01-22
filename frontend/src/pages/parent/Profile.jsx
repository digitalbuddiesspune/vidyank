import { useState } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { currentParent, linkedChild } from '../../data/parentData';

/**
 * Profile Page
 * Parent details + linked child info with edit form
 */
function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentParent.name,
    email: currentParent.email,
    phone: currentParent.phone,
    address: currentParent.address,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // In a real app, this would save to backend
    alert('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: currentParent.name,
      email: currentParent.email,
      phone: currentParent.phone,
      address: currentParent.address,
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h1>

        {/* Parent Profile Card */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white mb-6">
          <div className="flex items-center space-x-6">
            <div className="h-24 w-24 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-4xl font-bold">
              {currentParent.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">{currentParent.name}</h2>
              <p className="text-blue-100 mb-2">{currentParent.email}</p>
              <div className="flex space-x-4 text-sm">
                <div>
                  <span className="text-blue-100">Relation:</span>
                  <span className="ml-2 font-semibold">{currentParent.relation}</span>
                </div>
                <div>
                  <span className="text-blue-100">Phone:</span>
                  <span className="ml-2 font-semibold">{currentParent.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Linked Child Information */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Linked Child Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Child Name
              </label>
              <input
                type="text"
                value={linkedChild.name}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Roll Number
              </label>
              <input
                type="text"
                value={linkedChild.rollNumber}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Batch
              </label>
              <input
                type="text"
                value={linkedChild.batchName}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={linkedChild.email}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Admission Date
              </label>
              <input
                type="text"
                value={linkedChild.admissionDate}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Parent Profile Form */}
        <form onSubmit={handleSave}>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Parent Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={!isEditing}
              required
            />
            
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              required
            />
            
            <Input
              label="Phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
              required
            />
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                rows="3"
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-6">
            {isEditing ? (
              <>
                <Button type="button" variant="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Save Changes
                </Button>
              </>
            ) : (
              <Button type="button" variant="primary" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
