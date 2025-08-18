import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Alert } from '../ui/Alert';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs';
import { 
  User, 
  Briefcase, 
  DollarSign, 
  FileText, 
  CreditCard,
  Check,
  X,
  AlertTriangle,
  Eye,
  Download,
  Phone,
  Mail,
  MapPin,
  Calendar,
  TrendingUp,
  TrendingDown,
  Shield
} from 'lucide-react';

interface ApplicationReviewProps {
  applicationId: string;
  onApprove: () => void;
  onDecline: () => void;
  onRequestMoreInfo: () => void;
}

export function ApplicationReview({ 
  applicationId, 
  onApprove, 
  onDecline, 
  onRequestMoreInfo 
}: ApplicationReviewProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock application data
  const application = {
    id: applicationId,
    status: 'pending_review',
    submittedAt: '2025-01-15 09:30',
    customer: {
      firstName: 'Maria',
      lastName: 'Thompson',
      email: 'maria.thompson@email.com',
      phone: '+1 (242) 555-0123',
      dateOfBirth: '1985-03-15',
      nationalId: '123456789',
      address: '456 Paradise Island Dr, Nassau, Bahamas',
      city: 'Nassau',
    },
    employment: {
      status: 'full-time',
      employer: 'Atlantis Resort',
      jobTitle: 'Guest Services Manager',
      monthlyIncome: 4500,
      employmentLength: '2-5-years',
    },
    loan: {
      amount: 2500,
      term: 12, // weeks
      purpose: 'home-repair',
      apr: 18.5,
      weeklyPayment: 225,
      totalRepayment: 2700,
    },
    banking: {
      bankName: 'Bank of The Bahamas',
      accountType: 'checking',
      accountNumber: '****1234',
    },
    creditCheck: {
      score: 720,
      bureauResponse: 'success',
      tradelines: 5,
      delinquencies: 0,
      bankruptcies: 0,
      inquiries: 2,
    },
    riskAssessment: {
      dtiRatio: 18.5,
      affordabilityScore: 85,
      riskLevel: 'medium',
      flags: [],
      recommendation: 'approve',
    },
    documents: [
      { type: 'government_id', status: 'verified', uploadedAt: '2025-01-15 09:25' },
      { type: 'proof_of_income', status: 'verified', uploadedAt: '2025-01-15 09:27' },
      { type: 'proof_of_address', status: 'pending', uploadedAt: '2025-01-15 09:28' },
    ]
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      default: return 'default';
    }
  };

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'success';
      case 'pending': return 'warning';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Application Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Application Review - {application.id}
              </h1>
              <p className="text-gray-600">
                {application.customer.firstName} {application.customer.lastName} • 
                Submitted {application.submittedAt}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="warning">Pending Review</Badge>
              <Badge variant={getRiskColor(application.riskAssessment.riskLevel)}>
                {application.riskAssessment.riskLevel} Risk
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Decision Panel */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Quick Decision</h3>
              <p className="text-blue-800">
                System Recommendation: <strong>APPROVE</strong> - 
                Customer meets all criteria with {application.riskAssessment.affordabilityScore}% affordability score
              </p>
            </div>
            <div className="flex space-x-3">
              <Button onClick={onApprove} className="bg-green-600 hover:bg-green-700">
                <Check className="w-4 h-4 mr-2" />
                Approve
              </Button>
              <Button onClick={onDecline} variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                <X className="w-4 h-4 mr-2" />
                Decline
              </Button>
              <Button onClick={onRequestMoreInfo} variant="outline">
                Request Info
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Review Tabs */}
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="employment">Employment</TabsTrigger>
          <TabsTrigger value="credit">Credit</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Loan Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Loan Request
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold">${application.loan.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Term:</span>
                  <span className="font-semibold">{application.loan.term} weeks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Purpose:</span>
                  <span className="font-semibold capitalize">{application.loan.purpose.replace('-', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">APR:</span>
                  <span className="font-semibold">{application.loan.apr}%</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="text-gray-600">Total Repayment:</span>
                  <span className="font-semibold text-blue-600">${application.loan.totalRepayment.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Customer Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Customer Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-semibold text-gray-900">
                    {application.customer.firstName} {application.customer.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{application.customer.email}</p>
                  <p className="text-sm text-gray-600">{application.customer.phone}</p>
                </div>
                <div className="pt-3 border-t">
                  <p className="text-sm text-gray-600">Credit Score</p>
                  <p className="font-semibold text-green-600">{application.creditCheck.score}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Monthly Income</p>
                  <p className="font-semibold">${application.employment.monthlyIncome.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">DTI Ratio</p>
                  <p className="font-semibold">{application.riskAssessment.dtiRatio}%</p>
                </div>
              </CardContent>
            </Card>

            {/* Risk Assessment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Risk Level:</span>
                  <Badge variant={getRiskColor(application.riskAssessment.riskLevel)}>
                    {application.riskAssessment.riskLevel}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Affordability Score:</span>
                  <span className="font-semibold text-green-600">{application.riskAssessment.affordabilityScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Recommendation:</span>
                  <Badge variant="success">
                    {application.riskAssessment.recommendation}
                  </Badge>
                </div>
                {application.riskAssessment.flags.length > 0 && (
                  <div className="pt-3 border-t">
                    <p className="text-sm text-gray-600 mb-2">Risk Flags:</p>
                    {application.riskAssessment.flags.map((flag, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-yellow-700">{flag}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <p className="mt-1 text-gray-900">{application.customer.firstName} {application.customer.lastName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <p className="mt-1 text-gray-900">{application.customer.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <p className="mt-1 text-gray-900">{application.customer.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Date of Birth</label>
                    <p className="mt-1 text-gray-900">{application.customer.dateOfBirth}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">National ID</label>
                    <p className="mt-1 text-gray-900">{application.customer.nationalId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Address</label>
                    <p className="mt-1 text-gray-900">{application.customer.address}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">City</label>
                    <p className="mt-1 text-gray-900">{application.customer.city}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employment">
          <Card>
            <CardHeader>
              <CardTitle>Employment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Employment Status</label>
                    <p className="mt-1 text-gray-900 capitalize">{application.employment.status.replace('-', ' ')}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Employer</label>
                    <p className="mt-1 text-gray-900">{application.employment.employer}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Job Title</label>
                    <p className="mt-1 text-gray-900">{application.employment.jobTitle}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Monthly Income</label>
                    <p className="mt-1 text-gray-900 font-semibold">${application.employment.monthlyIncome.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Employment Length</label>
                    <p className="mt-1 text-gray-900">{application.employment.employmentLength.replace('-', ' ')}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">DTI Ratio</label>
                    <p className="mt-1 text-gray-900">{application.riskAssessment.dtiRatio}%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="credit">
          <Card>
            <CardHeader>
              <CardTitle>Credit Report Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {application.creditCheck.score}
                  </div>
                  <p className="text-sm text-gray-600">Credit Score</p>
                  <Badge variant="success" className="mt-2">Excellent</Badge>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {application.creditCheck.tradelines}
                  </div>
                  <p className="text-sm text-gray-600">Active Tradelines</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {application.creditCheck.delinquencies}
                  </div>
                  <p className="text-sm text-gray-600">Delinquencies</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">
                    {application.creditCheck.inquiries}
                  </div>
                  <p className="text-sm text-gray-600">Recent Inquiries</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Credit History Highlights</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">No bankruptcies or judgments</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">No current delinquencies</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">Stable credit utilization</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Document Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {application.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900 capitalize">
                          {doc.type.replace('_', ' ')}
                        </p>
                        <p className="text-sm text-gray-500">Uploaded {doc.uploadedAt}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={getDocumentStatusColor(doc.status)}>
                        {doc.status}
                      </Badge>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {application.documents.some(doc => doc.status === 'pending') && (
                <Alert variant="warning" className="mt-4">
                  <div>
                    <p className="font-medium">Document Review Required</p>
                    <p className="text-sm mt-1">
                      Some documents are still pending verification. Please review and approve/reject each document.
                    </p>
                  </div>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk">
          <div className="space-y-6">
            {/* Risk Score Card */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Analysis Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      {application.riskAssessment.affordabilityScore}
                    </div>
                    <p className="text-sm text-gray-600">Affordability Score</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${application.riskAssessment.affordabilityScore}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {application.riskAssessment.dtiRatio}%
                    </div>
                    <p className="text-sm text-gray-600">Debt-to-Income Ratio</p>
                    <Badge variant="success" className="mt-2">Within Limits</Badge>
                  </div>
                  <div className="text-center">
                    <Badge variant={getRiskColor(application.riskAssessment.riskLevel)} className="text-lg px-4 py-2">
                      {application.riskAssessment.riskLevel} Risk
                    </Badge>
                    <p className="text-sm text-gray-600 mt-2">Overall Assessment</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Risk Factors */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Factors Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-900 mb-3">Positive Factors</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">Excellent credit score (720+)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">Low DTI ratio (18.5%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">Stable employment (2+ years)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">Sufficient income verification</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Considerations</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-gray-700">First-time borrower with Quick Cash</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-gray-700">Recent credit inquiry (within 30 days)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Action Panel */}
      <Card className="border-gray-300">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Review Complete</h3>
              <p className="text-gray-600">
                Make your decision based on the application review above.
              </p>
            </div>
            <div className="flex space-x-3">
              <Button onClick={onApprove} size="lg" className="bg-green-600 hover:bg-green-700">
                <Check className="w-4 h-4 mr-2" />
                Approve Application
              </Button>
              <Button onClick={onDecline} size="lg" variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                <X className="w-4 h-4 mr-2" />
                Decline Application
              </Button>
              <Button onClick={onRequestMoreInfo} size="lg" variant="outline">
                Request More Information
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}