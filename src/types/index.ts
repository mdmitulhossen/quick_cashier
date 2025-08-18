export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  isEmailVerified: boolean;
  role?: 'customer' | 'admin' | 'ops' | 'underwriter' | 'kyc_officer' | 'collections' | 'accountant' | 'auditor' | 'support';
  createdAt: string;
  updatedAt: string;
}

export interface LoanApplication {
  id: string;
  userId: string;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'declined' | 'cancelled';
  loanAmount: number;
  loanTerm: number; // in weeks
  loanPurpose: string;
  personalInfo: PersonalInfo;
  employmentInfo: EmploymentInfo;
  documentsUploaded: DocumentStatus[];
  creditScore?: number;
  decision?: LoanDecision;
  createdAt: string;
  updatedAt: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationalId: string;
  address: string;
  city: string;
  postalCode?: string;
}

export interface EmploymentInfo {
  employmentStatus: string;
  employer: string;
  jobTitle: string;
  monthlyIncome: number;
  employmentLength: string;
}

export interface DocumentStatus {
  type: 'government_id' | 'proof_of_income' | 'proof_of_address';
  status: 'pending' | 'uploaded' | 'verified' | 'rejected';
  fileName?: string;
  uploadedAt?: string;
  rejectionReason?: string;
}

export interface LoanDecision {
  approved: boolean;
  approvedAmount?: number;
  apr?: number;
  monthlyPayment?: number;
  totalRepayment?: number;
  decisionReason?: string;
  conditions?: string[];
  expiresAt?: string;
}

export interface Loan {
  id: string;
  applicationId: string;
  userId: string;
  status: 'approved' | 'disbursed' | 'active' | 'paid_off' | 'defaulted' | 'charged_off';
  principalAmount: number;
  currentBalance: number;
  apr: number;
  termWeeks: number;
  nextPaymentDate: string;
  nextPaymentAmount: number;
  paymentsRemaining: number;
  disbursedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  loanId: string;
  amount: number;
  type: 'scheduled' | 'extra' | 'late_fee' | 'nsf_fee';
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  dueDate: string;
  paidDate?: string;
  paymentMethod: string;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'ops' | 'underwriter' | 'kyc_officer' | 'collections' | 'accountant' | 'auditor' | 'support';
  permissions: string[];
  lastLoginAt?: string;
  isActive: boolean;
  createdAt: string;
}

export interface LoanCalculation {
  principalAmount: number;
  termWeeks: number;
  apr: number;
  weeklyPayment: number;
  monthlyPayment: number;
  totalInterest: number;
  totalRepayment: number;
  paymentSchedule: PaymentScheduleItem[];
}

export interface PaymentScheduleItem {
  paymentNumber: number;
  dueDate: string;
  paymentAmount: number;
  principalAmount: number;
  interestAmount: number;
  remainingBalance: number;
}