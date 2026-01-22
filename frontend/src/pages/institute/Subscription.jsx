import { useState } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

/**
 * Subscription Page
 * Display subscription information and manage subscription
 */
function Subscription() {
  const [subscription, setSubscription] = useState({
    plan: 'Premium',
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    studentsLimit: 500,
    teachersLimit: 50,
    storageLimit: 100, // GB
    price: 999,
    billingCycle: 'monthly',
    autoRenew: true,
  });

  const plans = [
    {
      name: 'Basic',
      price: 299,
      studentsLimit: 100,
      teachersLimit: 10,
      storageLimit: 10,
      features: [
        'Up to 100 students',
        'Up to 10 teachers',
        '10 GB storage',
        'Basic support',
        'Email notifications',
      ],
    },
    {
      name: 'Premium',
      price: 999,
      studentsLimit: 500,
      teachersLimit: 50,
      storageLimit: 100,
      features: [
        'Up to 500 students',
        'Up to 50 teachers',
        '100 GB storage',
        'Priority support',
        'Email & SMS notifications',
        'Advanced analytics',
        'Custom branding',
      ],
    },
    {
      name: 'Enterprise',
      price: 2999,
      studentsLimit: -1, // Unlimited
      teachersLimit: -1, // Unlimited
      storageLimit: 500,
      features: [
        'Unlimited students',
        'Unlimited teachers',
        '500 GB storage',
        '24/7 support',
        'All notification channels',
        'Advanced analytics',
        'Custom branding',
        'API access',
        'Dedicated account manager',
      ],
    },
  ];

  const handleUpgrade = (plan) => {
    if (window.confirm(`Are you sure you want to upgrade to ${plan.name} plan?`)) {
      setSubscription({
        ...subscription,
        plan: plan.name,
        price: plan.price,
        studentsLimit: plan.studentsLimit,
        teachersLimit: plan.teachersLimit,
        storageLimit: plan.storageLimit,
      });
      alert(`Successfully upgraded to ${plan.name} plan!`);
    }
  };

  const handleToggleAutoRenew = () => {
    setSubscription({
      ...subscription,
      autoRenew: !subscription.autoRenew,
    });
  };

  const currentPlan = plans.find((p) => p.name === subscription.plan);

  return (
    <div className="space-y-6">
      {/* Current Subscription */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Subscription</h1>

        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">Current Plan: {subscription.plan}</h2>
              <p className="text-blue-100 mb-4">
                {subscription.status === 'active' ? 'Active' : 'Inactive'} • Renews on{' '}
                {subscription.endDate}
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-blue-100">Students Limit</p>
                  <p className="text-xl font-bold">
                    {subscription.studentsLimit === -1
                      ? 'Unlimited'
                      : subscription.studentsLimit}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-blue-100">Teachers Limit</p>
                  <p className="text-xl font-bold">
                    {subscription.teachersLimit === -1
                      ? 'Unlimited'
                      : subscription.teachersLimit}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-blue-100">Storage</p>
                  <p className="text-xl font-bold">{subscription.storageLimit} GB</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">${subscription.price}</p>
              <p className="text-blue-100">per {subscription.billingCycle}</p>
            </div>
          </div>
        </div>

        {/* Subscription Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-3">Subscription Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Plan:</span>
                <span className="font-medium">{subscription.plan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span
                  className={`font-medium ${
                    subscription.status === 'active'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {subscription.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Start Date:</span>
                <span className="font-medium">{subscription.startDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">End Date:</span>
                <span className="font-medium">{subscription.endDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Billing Cycle:</span>
                <span className="font-medium capitalize">{subscription.billingCycle}</span>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-3">Auto Renewal</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                Automatically renew subscription
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={subscription.autoRenew}
                  onChange={handleToggleAutoRenew}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            {subscription.autoRenew && (
              <p className="text-xs text-gray-500 mt-2">
                Your subscription will automatically renew on {subscription.endDate}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Available Plans */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`border-2 rounded-lg p-6 ${
                plan.name === subscription.plan
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200'
              }`}
            >
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
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
              <Button
                variant={plan.name === subscription.plan ? 'secondary' : 'primary'}
                className="w-full"
                onClick={() => handleUpgrade(plan)}
                disabled={plan.name === subscription.plan}
              >
                {plan.name === subscription.plan ? 'Current Plan' : 'Upgrade'}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2024-01-01
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ${subscription.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {subscription.plan}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Paid
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Button variant="secondary" className="text-xs">
                    Download
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Subscription;
