import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { ProgressSteps } from '../components/ui/ProgressSteps';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Alert } from '../components/ui/Alert';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, ArrowLeft, Upload, Shield, CheckCircle } from 'lucide-react';
import { calculateLoan } from '../utils/loanCalculator';
import { Link, useNavigate } from 'react-router-dom';

const steps = [
  { id: 'personal', title: 'Personal Info', description: 'Basic details' },
  { id: 'employment', title: 'Employment', description: 'Income info' },
  { id: 'loan', title: 'Loan Details', description: 'Amount & term' },
  { id: 'documents', title: 'Documents', description: 'ID & proof' },
  { id: 'bank', title: 'Banking', description: 'Account details' },
  { id: 'review', title: 'Review', description: 'Confirm details' },
  { id: 'complete', title: 'Complete', description: 'Application sent' }
];

const personalInfoSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  nationalId: z.string().min(9, 'National ID must be at least 9 characters'),
  address: z.string().min(10, 'Please provide your full address'),
  city: z.string().min(2, 'City is required'),
  postalCode: z.string().optional(),
});

const employmentSchema = z.object({
  employmentStatus: z.string().min(1, 'Employment status is required'),
  employer: z.string().min(2, 'Employer name is required'),
  jobTitle: z.string().min(2, 'Job title is required'),
  monthlyIncome: z.string().min(1, 'Monthly income is required'),
  employmentLength: z.string().min(1, 'Employment length is required'),
});

const loanSchema = z.object({
  loanAmount: z.string().min(1, 'Loan amount is required'),
  loanTerm: z.string().min(1, 'Loan term is required'),
  loanPurpose: z.string().min(1, 'Loan purpose is required'),
});

const bankingSchema = z.object({
  bankName: z.string().min(1, 'Bank name is required'),
  accountType: z.string().min(1, 'Account type is required'),
  accountNumber: z.string().min(8, 'Account number must be at least 8 digits'),
  routingNumber: z.string().min(6, 'Routing number is required'),
});

type PersonalInfo = z.infer<typeof personalInfoSchema>;
type Employment = z.infer<typeof employmentSchema>;
type LoanDetails = z.infer<typeof loanSchema>;
type BankingInfo = z.infer<typeof bankingSchema>;

export function ApplyPage() {
  const [currentStep, setCurrentStep] = useState('personal');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [applicationData, setApplicationData] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const personalForm = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
  });

  const employmentForm = useForm<Employment>({
    resolver: zodResolver(employmentSchema),
  });

  const loanForm = useForm<LoanDetails>({
    resolver: zodResolver(loanSchema),
  });

  const bankingForm = useForm<BankingInfo>({
    resolver: zodResolver(bankingSchema),
  });

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  const goToNextStep = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      setCurrentStep(steps[nextIndex].id);
    }
  };

  const goToPreviousStep = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id);
    }
  };

  const onPersonalSubmit = (data: PersonalInfo) => {
    setApplicationData({ ...applicationData, personal: data });
    goToNextStep();
  };

  const onEmploymentSubmit = (data: Employment) => {
    setApplicationData({ ...applicationData, employment: data });
    goToNextStep();
  };

  const onLoanSubmit = (data: LoanDetails) => {
    setApplicationData({ ...applicationData, loan: data });
    goToNextStep();
  };

  const onBankingSubmit = async (data: BankingInfo) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setApplicationData({ ...applicationData, banking: data });
      goToNextStep();
    } catch (err) {
      setError('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCompleteApplication = async () => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Simulate final submission
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Navigate to completion step
      setCurrentStep('complete');
    } catch (err) {
      setError('Failed to complete application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'personal':
        return (
          <form onSubmit={personalForm.handleSubmit(onPersonalSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="First Name"
                {...personalForm.register('firstName')}
                error={personalForm.formState.errors.firstName?.message}
              />
              <Input
                label="Last Name"
                {...personalForm.register('lastName')}
                error={personalForm.formState.errors.lastName?.message}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Email Address"
                type="email"
                {...personalForm.register('email')}
                error={personalForm.formState.errors.email?.message}
              />
              <Input
                label="Phone Number"
                type="tel"
                {...personalForm.register('phone')}
                error={personalForm.formState.errors.phone?.message}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Date of Birth"
                type="date"
                {...personalForm.register('dateOfBirth')}
                error={personalForm.formState.errors.dateOfBirth?.message}
              />
              <Input
                label="National ID Number"
                {...personalForm.register('nationalId')}
                error={personalForm.formState.errors.nationalId?.message}
                helper="Your Bahamian National ID number"
              />
            </div>

            <Input
              label="Home Address"
              {...personalForm.register('address')}
              error={personalForm.formState.errors.address?.message}
              helper="Full street address including apartment/unit number"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="City"
                {...personalForm.register('city')}
                error={personalForm.formState.errors.city?.message}
              />
              <Input
                label="Postal Code (Optional)"
                {...personalForm.register('postalCode')}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <LoadingSpinner className="mr-2 w-4 h-4" />
                    Processing...
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        );

      case 'employment':
        return (
          <form onSubmit={employmentForm.handleSubmit(onEmploymentSubmit)} className="space-y-6">
            <Select
              label="Employment Status"
              {...employmentForm.register('employmentStatus')}
              error={employmentForm.formState.errors.employmentStatus?.message}
              options={[
                { value: '', label: 'Select employment status' },
                { value: 'full-time', label: 'Full-time Employee' },
                { value: 'part-time', label: 'Part-time Employee' },
                { value: 'self-employed', label: 'Self-employed' },
                { value: 'contractor', label: 'Independent Contractor' },
                { value: 'government', label: 'Government Employee' },
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Employer Name"
                {...employmentForm.register('employer')}
                error={employmentForm.formState.errors.employer?.message}
              />
              <Input
                label="Job Title"
                {...employmentForm.register('jobTitle')}
                error={employmentForm.formState.errors.jobTitle?.message}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Monthly Gross Income (BSD)"
                type="number"
                min="500"
                {...employmentForm.register('monthlyIncome')}
                error={employmentForm.formState.errors.monthlyIncome?.message}
                helper="Before taxes and deductions"
              />
              <Select
                label="Time with Current Employer"
                {...employmentForm.register('employmentLength')}
                error={employmentForm.formState.errors.employmentLength?.message}
                options={[
                  { value: '', label: 'Select time period' },
                  { value: '0-6-months', label: 'Less than 6 months' },
                  { value: '6-12-months', label: '6-12 months' },
                  { value: '1-2-years', label: '1-2 years' },
                  { value: '2-5-years', label: '2-5 years' },
                  { value: '5-plus-years', label: 'More than 5 years' },
                ]}
              />
            </div>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={goToPreviousStep}>
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back
              </Button>
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <LoadingSpinner className="mr-2 w-4 h-4" />
                    Processing...
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        );

      case 'loan':
        return (
          <form onSubmit={loanForm.handleSubmit(onLoanSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Loan Amount (BSD)"
                type="number"
                min="100"
                max="5000"
                step="50"
                {...loanForm.register('loanAmount')}
                error={loanForm.formState.errors.loanAmount?.message}
                helper="Between $100 and $5,000"
              />
              <Select
                label="Loan Term"
                {...loanForm.register('loanTerm')}
                error={loanForm.formState.errors.loanTerm?.message}
                options={[
                  { value: '', label: 'Select loan term' },
                  { value: '2', label: '2 weeks' },
                  { value: '4', label: '1 month' },
                  { value: '8', label: '2 months' },
                  { value: '12', label: '3 months' },
                  { value: '16', label: '4 months' },
                  { value: '20', label: '5 months' },
                  { value: '24', label: '6 months' },
                ]}
              />
            </div>

            <Select
              label="Loan Purpose"
              {...loanForm.register('loanPurpose')}
              error={loanForm.formState.errors.loanPurpose?.message}
              options={[
                { value: '', label: 'Select loan purpose' },
                { value: 'emergency', label: 'Emergency Expenses' },
                { value: 'medical', label: 'Medical Bills' },
                { value: 'car-repair', label: 'Car Repair' },
                { value: 'home-repair', label: 'Home Repair' },
                { value: 'education', label: 'Education Expenses' },
                { value: 'debt-consolidation', label: 'Debt Consolidation' },
                { value: 'other', label: 'Other' },
              ]}
            />

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Responsible Lending</span>
              </div>
              <p className="text-sm text-blue-800">
                We only approve loans that we believe you can afford to repay. Our underwriting 
                process considers your income, expenses, and credit history.
              </p>
            </div>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={goToPreviousStep}>
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back
              </Button>
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <LoadingSpinner className="mr-2 w-4 h-4" />
                    Processing...
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        );

      case 'documents':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Upload className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Upload Required Documents
              </h3>
              <p className="text-gray-600">
                Please upload clear photos of the following documents
              </p>
            </div>

            <div className="space-y-4">
              {[
                { name: 'Government ID', description: 'Valid Bahamian ID, passport, or driver\'s license' },
                { name: 'Proof of Income', description: 'Recent pay stub or bank statement' },
                { name: 'Proof of Address', description: 'Utility bill or bank statement (last 3 months)' },
              ].map((doc, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{doc.name}</h4>
                      <p className="text-sm text-gray-600">{doc.description}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> All documents are encrypted and stored securely. 
                We use bank-level security to protect your personal information.
              </p>
            </div>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={goToPreviousStep}>
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back
              </Button>
              <Button onClick={goToNextStep} size="lg">
                Continue
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        );

      case 'bank':
        return (
          <form onSubmit={bankingForm.handleSubmit(onBankingSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Bank Name"
                {...bankingForm.register('bankName')}
                error={bankingForm.formState.errors.bankName?.message}
                helper="Your primary bank in The Bahamas"
              />
              <Select
                label="Account Type"
                {...bankingForm.register('accountType')}
                error={bankingForm.formState.errors.accountType?.message}
                options={[
                  { value: '', label: 'Select account type' },
                  { value: 'checking', label: 'Checking Account' },
                  { value: 'savings', label: 'Savings Account' },
                ]}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Account Number"
                {...bankingForm.register('accountNumber')}
                error={bankingForm.formState.errors.accountNumber?.message}
                helper="Your bank account number"
              />
              <Input
                label="Routing Number"
                {...bankingForm.register('routingNumber')}
                error={bankingForm.formState.errors.routingNumber?.message}
                helper="Bank routing/transit number"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Secure Banking</span>
              </div>
              <p className="text-sm text-blue-800">
                Your banking information is encrypted and stored securely. We use this information 
                only for loan disbursement and payment collection.
              </p>
            </div>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={goToPreviousStep}>
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back
              </Button>
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <LoadingSpinner className="mr-2 w-4 h-4" />
                    Processing...
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        );

      case 'review':
        const loanCalculation = applicationData.loan ? calculateLoan(
          parseFloat(applicationData.loan.loanAmount),
          parseInt(applicationData.loan.loanTerm)
        ) : null;

        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Review Your Application
              </h3>
              <p className="text-gray-600">
                Please review all information before submitting your application
              </p>
            </div>

            {/* Personal Information Review */}
            {applicationData.personal && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Name:</span>
                      <span className="ml-2 font-medium">{applicationData.personal.firstName} {applicationData.personal.lastName}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Email:</span>
                      <span className="ml-2 font-medium">{applicationData.personal.email}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Phone:</span>
                      <span className="ml-2 font-medium">{applicationData.personal.phone}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Date of Birth:</span>
                      <span className="ml-2 font-medium">{applicationData.personal.dateOfBirth}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Employment Information Review */}
            {applicationData.employment && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Employment Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Employer:</span>
                      <span className="ml-2 font-medium">{applicationData.employment.employer}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Job Title:</span>
                      <span className="ml-2 font-medium">{applicationData.employment.jobTitle}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Monthly Income:</span>
                      <span className="ml-2 font-medium">${parseFloat(applicationData.employment.monthlyIncome).toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Employment Length:</span>
                      <span className="ml-2 font-medium">{applicationData.employment.employmentLength}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Loan Details Review */}
            {applicationData.loan && loanCalculation && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Loan Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Loan Amount:</span>
                        <span className="font-semibold">${parseFloat(applicationData.loan.loanAmount).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Term:</span>
                        <span className="font-semibold">{applicationData.loan.loanTerm} weeks</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Purpose:</span>
                        <span className="font-semibold capitalize">{applicationData.loan.loanPurpose.replace('-', ' ')}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">APR:</span>
                        <span className="font-semibold">{loanCalculation.apr}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Weekly Payment:</span>
                        <span className="font-semibold">${loanCalculation.weeklyPayment}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Repayment:</span>
                        <span className="font-semibold text-blue-600">${loanCalculation.totalRepayment}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Terms Agreement */}
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms-agreement"
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <div>
                    <label htmlFor="terms-agreement" className="text-sm text-gray-700">
                      I have read and agree to the{' '}
                      <Link to="/terms-of-service" className="text-blue-600 hover:text-blue-500">
                        Terms of Service
                      </Link>
                      {' '}and{' '}
                      <Link to="/privacy-policy" className="text-blue-600 hover:text-blue-500">
                        Privacy Policy
                      </Link>
                      . I understand the loan terms and repayment obligations.
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={goToPreviousStep}>
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back
              </Button>
              <Button onClick={goToNextStep} size="lg">
                Submit Application
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        );

      case 'complete':
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Application Submitted Successfully!
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Thank you for choosing Quick Cash. We're reviewing your application 
                and will notify you of our decision within 24 hours.
              </p>
            </div>

            <Card className="text-left max-w-md mx-auto">
              <CardContent>
                <h4 className="font-semibold text-gray-900 mb-3">What happens next?</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    <span>Application review (up to 24 hours)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    <span>Credit and income verification</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    <span>Loan offer and digital signing</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    <span>Funds deposited to your account</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Button asChild size="lg">
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
              <p className="text-sm text-gray-500">
                Application Reference: #QC{Date.now().toString().slice(-6)}
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Step in Development
            </h3>
            <p className="text-gray-600">
              This step is currently being built. For now, you can continue to the next step.
            </p>
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={goToPreviousStep}>
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back
              </Button>
              <Button onClick={goToNextStep} size="lg">
                Continue
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Apply for Your Loan
          </h1>
          <p className="text-lg text-gray-600">
            Complete your application in just a few minutes
          </p>
        </div>

        {/* Progress Steps */}
        <ProgressSteps 
          steps={steps} 
          currentStep={currentStep} 
          completedSteps={completedSteps} 
        />

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mt-8">
            {error}
          </Alert>
        )}

        {/* Form Content */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>
              {steps.find(s => s.id === currentStep)?.title || 'Application Step'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Shield className="w-4 h-4" />
            <span>Your information is encrypted and secure</span>
          </div>
        </div>
      </div>
    </div>
  );
}