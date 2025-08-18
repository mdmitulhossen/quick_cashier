import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { ProgressSteps } from '../ui/ProgressSteps';
import { Alert } from '../ui/Alert';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ArrowRight, ArrowLeft, Upload, Shield, CheckCircle, DollarSign } from 'lucide-react';
import { calculateLoan } from '../../utils/loanCalculator';

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

interface LoanApplicationFormProps {
  onComplete: (data: any) => void;
  initialData?: any;
}

export function LoanApplicationForm({ onComplete, initialData = {} }: LoanApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState('personal');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [applicationData, setApplicationData] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { id: 'personal', title: 'Personal Info', description: 'Basic details' },
    { id: 'employment', title: 'Employment', description: 'Income info' },
    { id: 'loan', title: 'Loan Details', description: 'Amount & term' },
    { id: 'documents', title: 'Documents', description: 'ID & proof' },
    { id: 'banking', title: 'Banking', description: 'Account details' },
    { id: 'review', title: 'Review', description: 'Confirm details' },
  ];

  const personalForm = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: initialData.personal || {}
  });

  const employmentForm = useForm<Employment>({
    resolver: zodResolver(employmentSchema),
    defaultValues: initialData.employment || {}
  });

  const loanForm = useForm<LoanDetails>({
    resolver: zodResolver(loanSchema),
    defaultValues: initialData.loan || {}
  });

  const bankingForm = useForm<BankingInfo>({
    resolver: zodResolver(bankingSchema),
    defaultValues: initialData.banking || {}
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

  const onBankingSubmit = (data: BankingInfo) => {
    setApplicationData({ ...applicationData, banking: data });
    goToNextStep();
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      onComplete(applicationData);
    } catch (error) {
      console.error('Application submission failed:', error);
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
              <Button type="submit" size="lg">
                Continue
                <ArrowRight className="ml-2 w-4 h-4" />
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
              <Button type="submit" size="lg">
                Continue
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </form>
        );

      case 'loan':
        const watchedAmount = loanForm.watch('loanAmount');
        const watchedTerm = loanForm.watch('loanTerm');
        
        const loanCalculation = watchedAmount && watchedTerm ? 
          calculateLoan(parseFloat(watchedAmount), parseInt(watchedTerm)) : null;

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

            {/* Live Calculation Preview */}
            {loanCalculation && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-blue-900 mb-3">Payment Preview</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-blue-600">Weekly Payment</p>
                      <p className="font-semibold text-blue-900">${loanCalculation.weeklyPayment}</p>
                    </div>
                    <div>
                      <p className="text-blue-600">Monthly Payment</p>
                      <p className="font-semibold text-blue-900">${loanCalculation.monthlyPayment}</p>
                    </div>
                    <div>
                      <p className="text-blue-600">APR</p>
                      <p className="font-semibold text-blue-900">{loanCalculation.apr}%</p>
                    </div>
                    <div>
                      <p className="text-blue-600">Total Cost</p>
                      <p className="font-semibold text-blue-900">${loanCalculation.totalRepayment}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

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

            <Alert variant="info">
              <div>
                <p className="font-medium">Responsible Lending</p>
                <p className="text-sm mt-1">
                  We only approve loans that we believe you can afford to repay. Our underwriting 
                  process considers your income, expenses, and credit history.
                </p>
              </div>
            </Alert>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={goToPreviousStep}>
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back
              </Button>
              <Button type="submit" size="lg">
                Continue
                <ArrowRight className="ml-2 w-4 h-4" />
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
                { 
                  name: 'Government ID', 
                  description: 'Valid Bahamian ID, passport, or driver\'s license',
                  required: true,
                  uploaded: false
                },
                { 
                  name: 'Proof of Income', 
                  description: 'Recent pay stub or bank statement',
                  required: true,
                  uploaded: false
                },
                { 
                  name: 'Proof of Address', 
                  description: 'Utility bill or bank statement (last 3 months)',
                  required: true,
                  uploaded: false
                },
              ].map((doc, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        doc.uploaded ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        {doc.uploaded ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <Upload className="w-4 h-4 text-gray-600" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{doc.name}</h4>
                        <p className="text-sm text-gray-600">{doc.description}</p>
                        {doc.required && (
                          <span className="text-xs text-red-600">Required</span>
                        )}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      {doc.uploaded ? 'Replace' : 'Upload'}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <Alert variant="warning">
              <div>
                <p className="font-medium">Document Requirements</p>
                <p className="text-sm mt-1">
                  All documents must be clear, legible, and current. Documents in languages other than English 
                  must include certified translations.
                </p>
              </div>
            </Alert>

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

      case 'banking':
        return (
          <form onSubmit={bankingForm.handleSubmit(onBankingSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Bank Name"
                {...bankingForm.register('bankName')}
                error={bankingForm.formState.errors.bankName?.message}
                options={[
                  { value: '', label: 'Select your bank' },
                  { value: 'bank-of-bahamas', label: 'Bank of The Bahamas' },
                  { value: 'commonwealth-bank', label: 'Commonwealth Bank' },
                  { value: 'scotiabank', label: 'Scotiabank (Bahamas)' },
                  { value: 'royal-bank', label: 'Royal Bank of Canada' },
                  { value: 'cibc', label: 'CIBC FirstCaribbean' },
                  { value: 'other', label: 'Other' },
                ]}
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

            <Alert variant="info">
              <div>
                <p className="font-medium">Secure Banking Information</p>
                <p className="text-sm mt-1">
                  Your banking information is encrypted and stored securely. We use this information 
                  only for loan disbursement and payment collection as authorized in your loan agreement.
                </p>
              </div>
            </Alert>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={goToPreviousStep}>
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back
              </Button>
              <Button type="submit" size="lg">
                Continue
                <ArrowRight className="ml-2 w-4 h-4" />
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

            {/* Application Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Info Summary */}
              {applicationData.personal && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{applicationData.personal.firstName} {applicationData.personal.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{applicationData.personal.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">{applicationData.personal.phone}</span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Employment Summary */}
              {applicationData.employment && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Employment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Employer:</span>
                      <span className="font-medium">{applicationData.employment.employer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Income:</span>
                      <span className="font-medium">${parseFloat(applicationData.employment.monthlyIncome).toLocaleString()}/month</span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Loan Summary */}
            {applicationData.loan && loanCalculation && (
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                    Loan Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-blue-700">Loan Amount:</span>
                        <span className="font-semibold text-blue-900">${parseFloat(applicationData.loan.loanAmount).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Term:</span>
                        <span className="font-semibold text-blue-900">{applicationData.loan.loanTerm} weeks</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">APR:</span>
                        <span className="font-semibold text-blue-900">{loanCalculation.apr}%</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-blue-700">Weekly Payment:</span>
                        <span className="font-semibold text-blue-900">${loanCalculation.weeklyPayment}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Total Interest:</span>
                        <span className="font-semibold text-blue-900">${loanCalculation.totalInterest}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Total Repayment:</span>
                        <span className="font-semibold text-blue-900">${loanCalculation.totalRepayment}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Terms Agreement */}
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms-agreement"
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    required
                  />
                  <div>
                    <label htmlFor="terms-agreement" className="text-sm text-yellow-800">
                      I have read and agree to the loan terms, understand the repayment obligations, 
                      and authorize Quick Cash to process this application and perform credit checks.
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
              <Button 
                onClick={handleFinalSubmit} 
                size="lg" 
                disabled={isSubmitting}
                className="min-w-[140px]"
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
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
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <ProgressSteps 
        steps={steps} 
        currentStep={currentStep} 
        completedSteps={completedSteps} 
      />

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
  );
}