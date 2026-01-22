import { useState } from 'react';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import {
  initialInstitutes,
  subscriptionPlans,
} from '../../data/superAdminData';

/**
 * Subscriptions Page
 * Plans list and assign plan to institute
 */
function Subscriptions() {
  const [institutes] = useState(initialInstitutes);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedInstitute, setSelectedInstitute] = useState(null);

  const [assignFormData, setAssignFormData] = useState({
    instituteId: '',
    planId: '',
    expiryDate: '',
  });

  const handleOpenAssignModal = (institute = null) => {
    if (institute) {
      setSelectedInstitute(institute);
      setAssignFormData({
        instituteId: institute.id.toString(),
        planId: institute.subscriptionPlan.toLowerCase(),
        expiryDate: institute.subscriptionExpiry,
      });
    } else {
      setSelectedInstitute(null);
      setAssignFormData({
        instituteId: '',
        planId: '',
        expiryDate: '',
      });
    }
    setIsAssignModalOpen(true);
  };

  const handleCloseAssignModal = () => {
    setIsAssignModalOpen(false);
    setSelectedInstitute(null);
    setAssignFormData({
      instituteId: '',
      planId: '',
      expiryDate: '',
    });
  };

  const handleAssignPlan = (e) => {
    e.preventDefault();
    // In a real app, this would update the institute's subscription
    alert(
      `Plan ${subscriptionPlans.find((p) => p.id === assignFormData.planId)?.name} assigned successfully!`
    );
    handleCloseAssignModal();
  };

  const instituteOptions = institutes.map((institute) => ({
    value: institute.id.toString(),
    label: `${institute.name} (${institute.city})`,
  }));

  const planOptions = subscriptionPlans.map((plan) => ({
    value: plan.id,
    label: `${plan.name} - ₹${plan.price}/month`,
  }));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Subscription Plans</h1>
          <Button onClick={() => handleOpenAssignModal()}>Assign Plan</Button>
        </div>

        {/* Subscription Plans Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              className={`border-2 rounded-lg p-6 ${
                plan.id === 'premium'
                  ? 'border-blue-500 bg-blue-50'
                  : plan.id === 'basic'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300 bg-gray-50'
              }`}
            >
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">₹{plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-700">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  {plan.maxStudents === -1
                    ? 'Unlimited'
                    : `Up to ${plan.maxStudents}`}{' '}
                  students
                </p>
                <p className="text-sm text-gray-600">
                  {plan.maxTeachers === -1
                    ? 'Unlimited'
                    : `Up to ${plan.maxTeachers}`}{' '}
                  teachers
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Institutes with Subscriptions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Institute Subscriptions
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Institute
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Plan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expiry Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {institutes.map((institute) => {
                  const isExpired = new Date(institute.subscriptionExpiry) < new Date();
                  return (
                    <tr key={institute.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {institute.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            institute.subscriptionPlan === 'Premium'
                              ? 'bg-blue-100 text-blue-800'
                              : institute.subscriptionPlan === 'Basic'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {institute.subscriptionPlan}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {institute.subscriptionExpiry}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            isExpired
                              ? 'bg-red-100 text-red-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {isExpired ? 'Expired' : 'Active'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button
                          variant="secondary"
                          onClick={() => handleOpenAssignModal(institute)}
                          className="text-xs"
                        >
                          Change Plan
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Assign Plan Modal */}
      <Modal
        isOpen={isAssignModalOpen}
        onClose={handleCloseAssignModal}
        title="Assign Subscription Plan"
        size="md"
      >
        <form onSubmit={handleAssignPlan}>
          <Select
            label="Select Institute"
            value={assignFormData.instituteId}
            onChange={(e) => setAssignFormData({ ...assignFormData, instituteId: e.target.value })}
            options={instituteOptions}
            required
            disabled={!!selectedInstitute}
          />
          <Select
            label="Select Plan"
            value={assignFormData.planId}
            onChange={(e) => setAssignFormData({ ...assignFormData, planId: e.target.value })}
            options={planOptions}
            required
          />
          <Input
            label="Expiry Date"
            type="date"
            value={assignFormData.expiryDate}
            onChange={(e) => setAssignFormData({ ...assignFormData, expiryDate: e.target.value })}
            required
          />
          {assignFormData.planId && (
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Plan Details:</p>
              {(() => {
                const plan = subscriptionPlans.find((p) => p.id === assignFormData.planId);
                return plan ? (
                  <div className="text-sm text-gray-600">
                    <p>Price: ₹{plan.price}/month</p>
                    <p>
                      Students: {plan.maxStudents === -1 ? 'Unlimited' : plan.maxStudents}
                    </p>
                    <p>
                      Teachers: {plan.maxTeachers === -1 ? 'Unlimited' : plan.maxTeachers}
                    </p>
                  </div>
                ) : null;
              })()}
            </div>
          )}
          <div className="flex justify-end space-x-3 mt-6">
            <Button type="button" variant="secondary" onClick={handleCloseAssignModal}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Assign Plan
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Subscriptions;
