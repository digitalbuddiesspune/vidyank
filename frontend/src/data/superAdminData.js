/**
 * Super Admin Module Dummy Data
 * Data for Super Admin dashboard and management
 */

let instituteIdCounter = 1;
let paymentIdCounter = 1;

// Initial Institutes Data
export const initialInstitutes = [
  {
    id: instituteIdCounter++,
    name: 'ABC School',
    city: 'Mumbai',
    state: 'Maharashtra',
    contact: '9876543210',
    email: 'admin@abcschool.com',
    status: 'active',
    subscriptionPlan: 'Premium',
    subscriptionExpiry: '2024-12-31',
    totalStudents: 500,
    totalTeachers: 50,
    createdAt: '2023-01-15',
  },
  {
    id: instituteIdCounter++,
    name: 'XYZ Academy',
    city: 'Delhi',
    state: 'Delhi',
    contact: '9876543211',
    email: 'admin@xyzacademy.com',
    status: 'active',
    subscriptionPlan: 'Basic',
    subscriptionExpiry: '2024-11-30',
    totalStudents: 300,
    totalTeachers: 30,
    createdAt: '2023-02-20',
  },
  {
    id: instituteIdCounter++,
    name: 'PQR College',
    city: 'Bangalore',
    state: 'Karnataka',
    contact: '9876543212',
    email: 'admin@pqrcollege.com',
    status: 'active',
    subscriptionPlan: 'Premium',
    subscriptionExpiry: '2024-12-31',
    totalStudents: 800,
    totalTeachers: 80,
    createdAt: '2023-03-10',
  },
  {
    id: instituteIdCounter++,
    name: 'LMN Institute',
    city: 'Chennai',
    state: 'Tamil Nadu',
    contact: '9876543213',
    email: 'admin@lmninstitute.com',
    status: 'disabled',
    subscriptionPlan: 'Free',
    subscriptionExpiry: '2024-10-15',
    totalStudents: 150,
    totalTeachers: 15,
    createdAt: '2023-04-05',
  },
  {
    id: instituteIdCounter++,
    name: 'DEF High School',
    city: 'Pune',
    state: 'Maharashtra',
    contact: '9876543214',
    email: 'admin@defhighschool.com',
    status: 'active',
    subscriptionPlan: 'Basic',
    subscriptionExpiry: '2024-11-20',
    totalStudents: 400,
    totalTeachers: 40,
    createdAt: '2023-05-12',
  },
];

// Subscription Plans
export const subscriptionPlans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    features: [
      'Up to 50 students',
      'Up to 5 teachers',
      'Basic support',
      'Email notifications',
    ],
    maxStudents: 50,
    maxTeachers: 5,
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 299,
    features: [
      'Up to 500 students',
      'Up to 50 teachers',
      'Priority support',
      'Email & SMS notifications',
      'Basic analytics',
    ],
    maxStudents: 500,
    maxTeachers: 50,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 999,
    features: [
      'Unlimited students',
      'Unlimited teachers',
      '24/7 support',
      'All notification channels',
      'Advanced analytics',
      'Custom branding',
      'API access',
    ],
    maxStudents: -1, // Unlimited
    maxTeachers: -1, // Unlimited
  },
];

// Payment History
export const initialPayments = [
  {
    id: paymentIdCounter++,
    instituteId: 1,
    instituteName: 'ABC School',
    amount: 999,
    plan: 'Premium',
    paymentDate: '2024-01-01',
    status: 'paid',
    method: 'Credit Card',
    transactionId: 'TXN001',
    invoiceUrl: '#',
  },
  {
    id: paymentIdCounter++,
    instituteId: 2,
    instituteName: 'XYZ Academy',
    amount: 299,
    plan: 'Basic',
    paymentDate: '2024-01-05',
    status: 'paid',
    method: 'Bank Transfer',
    transactionId: 'TXN002',
    invoiceUrl: '#',
  },
  {
    id: paymentIdCounter++,
    instituteId: 3,
    instituteName: 'PQR College',
    amount: 999,
    plan: 'Premium',
    paymentDate: '2024-01-10',
    status: 'paid',
    method: 'Credit Card',
    transactionId: 'TXN003',
    invoiceUrl: '#',
  },
  {
    id: paymentIdCounter++,
    instituteId: 4,
    instituteName: 'LMN Institute',
    amount: 0,
    plan: 'Free',
    paymentDate: '2024-01-15',
    status: 'paid',
    method: 'N/A',
    transactionId: 'N/A',
    invoiceUrl: '#',
  },
  {
    id: paymentIdCounter++,
    instituteId: 5,
    instituteName: 'DEF High School',
    amount: 299,
    plan: 'Basic',
    paymentDate: '2024-01-20',
    status: 'pending',
    method: 'Bank Transfer',
    transactionId: 'TXN005',
    invoiceUrl: '#',
  },
  {
    id: paymentIdCounter++,
    instituteId: 1,
    instituteName: 'ABC School',
    amount: 999,
    plan: 'Premium',
    paymentDate: '2024-02-01',
    status: 'paid',
    method: 'Credit Card',
    transactionId: 'TXN006',
    invoiceUrl: '#',
  },
  {
    id: paymentIdCounter++,
    instituteId: 2,
    instituteName: 'XYZ Academy',
    amount: 299,
    plan: 'Basic',
    paymentDate: '2024-02-05',
    status: 'failed',
    method: 'Credit Card',
    transactionId: 'TXN007',
    invoiceUrl: '#',
  },
  {
    id: paymentIdCounter++,
    instituteId: 3,
    instituteName: 'PQR College',
    amount: 999,
    plan: 'Premium',
    paymentDate: '2024-02-10',
    status: 'paid',
    method: 'Credit Card',
    transactionId: 'TXN008',
    invoiceUrl: '#',
  },
];

// Analytics Data
export const analyticsData = {
  totalInstitutes: initialInstitutes.length,
  activeInstitutes: initialInstitutes.filter((i) => i.status === 'active').length,
  totalStudents: initialInstitutes.reduce((sum, i) => sum + i.totalStudents, 0),
  totalTeachers: initialInstitutes.reduce((sum, i) => sum + i.totalTeachers, 0),
  monthlyRevenue: initialPayments
    .filter((p) => p.status === 'paid' && p.paymentDate.startsWith('2024-02'))
    .reduce((sum, p) => sum + p.amount, 0),
  growthData: [
    { month: 'Jan', institutes: 3, revenue: 2297 },
    { month: 'Feb', institutes: 5, revenue: 2597 },
    { month: 'Mar', institutes: 5, revenue: 2597 },
  ],
  topInstitutes: initialInstitutes
    .sort((a, b) => b.totalStudents - a.totalStudents)
    .slice(0, 5),
};

// Platform Settings
export const initialSettings = {
  platformName: 'ExamPlatform',
  supportEmail: 'support@examplatform.com',
  theme: 'light',
  logo: null,
};

// Export ID generators
export const getNextInstituteId = () => instituteIdCounter++;
export const getNextPaymentId = () => paymentIdCounter++;
