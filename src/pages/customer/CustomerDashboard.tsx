import {
  Banknote,
  Bell,
  Calendar,
  CheckCircle,
  CreditCard,
  CreditCard as CreditCardIcon,
  DollarSign,
  Download,
  Edit,
  Eye,
  FileText,
  LogOut,
  Mail,
  Phone,
  Plus,
  Settings,
  Shield,
  TrendingUp,
  User
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { useAuth } from '../../contexts/AuthContext';
import { downloadFileByKey } from '../../utils/downloadUtils';

export function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  if (!user) {
    navigate('/login');
    return null;
  }

  const currentLoan = {
    id: 'LN001234',
    amount: 2500,
    balance: 1875,
    nextPayment: 375,
    nextPaymentDate: '2025-02-15',
    status: 'active',
    totalPaid: 625,
    paymentsRemaining: 5,
    apr: 18.5,
    term: '3 months',
    disbursedDate: '2025-01-01',
    maturityDate: '2025-04-01'
  };

  const recentTransactions = [
    {
      id: 1,
      date: '2025-01-15',
      type: 'Payment',
      amount: -375,
      status: 'completed',
      method: 'Bank Transfer',
      reference: 'PAY001234'
    },
    {
      id: 2,
      date: '2025-01-01',
      type: 'Loan Disbursement',
      amount: 2500,
      status: 'completed',
      method: 'Direct Deposit',
      reference: 'DISB001234'
    },
  ];

  const upcomingPayments = [
    { date: '2025-02-15', amount: 375, status: 'due', daysUntil: 15 },
    { date: '2025-03-15', amount: 375, status: 'upcoming', daysUntil: 45 },
    { date: '2025-04-15', amount: 375, status: 'upcoming', daysUntil: 75 },
  ];

  const paymentMethods = [
    {
      id: 1,
      type: 'Bank Account',
      details: 'Bank of Bahamas - Checking ****1234',
      isPrimary: true,
      verified: true
    },
    {
      id: 2,
      type: 'Debit Card',
      details: 'Visa ****5678',
      isPrimary: false,
      verified: true
    }
  ];

  const documents = [
    { name: 'Loan Agreement', date: '2025-01-01', status: 'signed', type: 'contract' },
    { name: 'Payment Schedule', date: '2025-01-01', status: 'active', type: 'schedule' },
    { name: 'Government ID', date: '2024-12-30', status: 'verified', type: 'identity' },
    { name: 'Proof of Income', date: '2024-12-30', status: 'verified', type: 'income' },
    { name: 'Proof of Address', date: '2024-12-30', status: 'verified', type: 'address' },
  ];

  const customerProfile = {
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    phone: user.phone,
    address: '123 Bay Street, Nassau, Bahamas',
    joinDate: user.createdAt,
    creditScore: 720,
    memberSince: '3 months'
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: CreditCard },
    { id: 'payments', label: 'Payments', icon: Calendar },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'pending': return 'text-yellow-600';
      case 'failed': return 'text-red-600';
      case 'due': return 'text-orange-600';
      case 'upcoming': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case 'signed': return 'bg-green-100 text-green-800';
      case 'verified': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-purple-100 text-purple-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDownload = (fileKey: string, fileName?: string) => {
    downloadFileByKey(fileKey, (loading) => {
      setIsDownloading(loading ? fileKey : null);
    });
  };

  const handleMakePayment = () => {
    // TODO: Implement payment modal/form
    console.log('Make payment clicked');
  };

  const handleViewSchedule = () => {
    // TODO: Navigate to payment schedule page
    console.log('View schedule clicked');
  };

  const handleViewDocument = (docName: string) => {
    // TODO: Open document viewer modal
    console.log('View document:', docName);
  };

  const handleUploadDocument = () => {
    // TODO: Implement file upload
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      console.log('Document uploaded');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back, {customerProfile.name}</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New Application
              </Button>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>

            {/* Quick Stats Card */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Account Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Credit Score</span>
                  <span className="font-semibold text-green-600">{customerProfile.creditScore}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-semibold">{customerProfile.memberSince}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Loans</span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">On-time Payments</span>
                  <span className="font-semibold text-green-600">100%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Loan Status Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Current Balance</p>
                          <p className="text-2xl font-bold text-gray-900">
                            ${currentLoan.balance.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500">
                            of ${currentLoan.amount.toLocaleString()} original
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-yellow-500">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Next Payment</p>
                          <p className="text-2xl font-bold text-gray-900">
                            ${currentLoan.nextPayment}
                          </p>
                          <p className="text-xs text-gray-500">Due {currentLoan.nextPaymentDate}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-green-500">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Progress</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {Math.round(((currentLoan.amount - currentLoan.balance) / currentLoan.amount) * 100)}%
                          </p>
                          <p className="text-xs text-gray-500">
                            {currentLoan.paymentsRemaining} payments left
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Current Loan Details */}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Current Loan - #{currentLoan.id}</CardTitle>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        Active
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Original Amount:</span>
                          <span className="font-semibold">${currentLoan.amount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Amount Paid:</span>
                          <span className="font-semibold text-green-600">${currentLoan.totalPaid.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Remaining Balance:</span>
                          <span className="font-semibold">${currentLoan.balance.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">APR:</span>
                          <span className="font-semibold">{currentLoan.apr}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Term:</span>
                          <span className="font-semibold">{currentLoan.term}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Disbursed:</span>
                          <span className="font-semibold">{currentLoan.disbursedDate}</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Next Payment:</span>
                          <span className="font-semibold">${currentLoan.nextPayment}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Due Date:</span>
                          <span className="font-semibold">{currentLoan.nextPaymentDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Maturity Date:</span>
                          <span className="font-semibold">{currentLoan.maturityDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-6">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Loan Progress</span>
                        <span>{Math.round(((currentLoan.amount - currentLoan.balance) / currentLoan.amount) * 100)}% Complete</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${((currentLoan.amount - currentLoan.balance) / currentLoan.amount) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button size="lg" className="flex-1" onClick={handleMakePayment}>
                          <DollarSign className="w-4 h-4 mr-2" />
                          Make Payment
                        </Button>
                        <Button 
                          variant="outline" 
                          size="lg" 
                          className="flex-1" 
                          onClick={() => handleDownload('loan-application-form', 'loan-statement.pdf')}
                          disabled={isDownloading === 'loan-application-form'}
                        >
                          {isDownloading === 'loan-application-form' ? (
                            <LoadingSpinner className="w-4 h-4 mr-2" />
                          ) : (
                            <Download className="w-4 h-4 mr-2" />
                          )}
                          Download Statement
                        </Button>
                        <Button variant="outline" size="lg" className="flex-1" onClick={handleViewSchedule}>
                          <Calendar className="w-4 h-4 mr-2" />
                          View Schedule
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentTransactions.map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${transaction.amount > 0 ? 'bg-green-100' : 'bg-blue-100'
                              }`}>
                              {transaction.amount > 0 ? (
                                <DollarSign className="w-4 h-4 text-green-600" />
                              ) : (
                                <CreditCard className="w-4 h-4 text-blue-600" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{transaction.type}</p>
                              <p className="text-sm text-gray-500">{transaction.date}</p>
                              <p className="text-xs text-gray-400">{transaction.method} • {transaction.reference}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-gray-900'
                              }`}>
                              {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                            </p>
                            <p className={`text-xs capitalize ${getStatusColor(transaction.status)}`}>
                              {transaction.status}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="space-y-6">
                {/* Payment Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Banknote className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">${currentLoan.totalPaid.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Total Paid</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">{currentLoan.paymentsRemaining}</div>
                      <div className="text-sm text-gray-600">Payments Left</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">100%</div>
                      <div className="text-sm text-gray-600">On-time Rate</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Upcoming Payments */}
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Payments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingPayments.map((payment, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${payment.status === 'due' ? 'bg-orange-100' : 'bg-gray-100'
                              }`}>
                              <Calendar className={`w-5 h-5 ${payment.status === 'due' ? 'text-orange-600' : 'text-gray-600'
                                }`} />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{payment.date}</p>
                              <p className="text-sm text-gray-500">
                                {payment.daysUntil} days {payment.status === 'due' ? 'overdue' : 'away'}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-gray-900">
                              ${payment.amount}
                            </p>
                            {payment.status === 'due' && (
                              <Button size="sm" className="mt-2">
                                Pay Now
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Methods */}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Payment Methods</CardTitle>
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Method
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {paymentMethods.map((method) => (
                        <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <CreditCardIcon className="w-5 h-5 text-gray-600" />
                            <div>
                              <p className="font-medium text-gray-900">{method.details}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                {method.isPrimary && (
                                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                    Primary
                                  </span>
                                )}
                                {method.verified && (
                                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                    Verified
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Payment History */}
                <Card>
                  <CardHeader>
                    <CardTitle>Payment History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Method</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Reference</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Receipt</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentTransactions.filter(t => t.amount < 0).map((transaction) => (
                            <tr key={transaction.id} className="border-b border-gray-100">
                              <td className="py-3 px-4">{transaction.date}</td>
                              <td className="py-3 px-4 font-semibold">${Math.abs(transaction.amount)}</td>
                              <td className="py-3 px-4">{transaction.method}</td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                  }`}>
                                  {transaction.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 font-mono text-sm">{transaction.reference}</td>
                              <td className="py-3 px-4">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleDownload('loan-application-form', `transaction-${transaction.reference}.pdf`)}
                                  disabled={isDownloading === 'loan-application-form'}
                                >
                                  {isDownloading === 'loan-application-form' ? (
                                    <LoadingSpinner className="w-4 h-4" />
                                  ) : (
                                    <Download className="w-4 h-4" />
                                  )}
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {documents.map((doc, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <FileText className="w-5 h-5 text-gray-600" />
                              <div>
                                <p className="font-medium text-gray-900">{doc.name}</p>
                                <p className="text-sm text-gray-500">Uploaded {doc.date}</p>
                              </div>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${getDocumentStatusColor(doc.status)}`}>
                              {doc.status}
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="flex-1"
                              onClick={() => handleViewDocument(doc.name)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="flex-1"
                              onClick={() => handleDownload('loan-application-form', `${doc.name.toLowerCase().replace(' ', '-')}.pdf`)}
                              disabled={isDownloading === 'loan-application-form'}
                            >
                              {isDownloading === 'loan-application-form' ? (
                                <LoadingSpinner className="w-4 h-4 mr-1" />
                              ) : (
                                <Download className="w-4 h-4 mr-1" />
                              )}
                              Download
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Document Upload */}
                <Card>
                  <CardHeader>
                    <CardTitle>Upload New Document</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Drag and drop files here, or click to browse</p>
                      <Button 
                        variant="outline" 
                        onClick={handleUploadDocument}
                        disabled={isUploading}
                      >
                        {isUploading ? (
                          <LoadingSpinner className="w-4 h-4 mr-2" />
                        ) : (
                          <Plus className="w-4 h-4 mr-2" />
                        )}
                        {isUploading ? 'Uploading...' : 'Choose Files'}
                      </Button>
                      <p className="text-xs text-gray-500 mt-2">
                        Supported formats: PDF, JPG, PNG (max 10MB)
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* Profile Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                          <Input value={customerProfile.name} readOnly />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                          <Input value={customerProfile.email} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                          <Input value={customerProfile.phone} />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                          <textarea
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            rows={3}
                            value={customerProfile.address}
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                          <Input value={customerProfile.joinDate} readOnly />
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <Button>
                        <Edit className="w-4 h-4 mr-2" />
                        Update Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Account Security */}
                <Card>
                  <CardHeader>
                    <CardTitle>Account Security</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Shield className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="font-medium text-gray-900">Password</p>
                            <p className="text-sm text-gray-500">Last updated 30 days ago</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Change Password
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                            <p className="text-sm text-gray-500">SMS verification enabled</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-purple-600" />
                          <div>
                            <p className="font-medium text-gray-900">Email Notifications</p>
                            <p className="text-sm text-gray-500">Payment reminders enabled</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                {/* Notification Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: 'Payment Reminders', description: 'Get notified before payments are due', enabled: true },
                        { name: 'Account Updates', description: 'Important account and security notifications', enabled: true },
                        { name: 'Marketing Communications', description: 'Special offers and product updates', enabled: false },
                        { name: 'SMS Notifications', description: 'Receive notifications via text message', enabled: true },
                      ].map((setting, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{setting.name}</p>
                            <p className="text-sm text-gray-500">{setting.description}</p>
                          </div>
                          <div className={`w-12 h-6 rounded-full p-1 transition-colors ${setting.enabled ? 'bg-blue-600' : 'bg-gray-300'
                            }`}>
                            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${setting.enabled ? 'translate-x-6' : 'translate-x-0'
                              }`}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Privacy Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy & Data</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Shield className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-900">Data Protection</span>
                        </div>
                        <p className="text-sm text-blue-800">
                          Your personal information is protected with bank-level encryption and stored securely
                          in compliance with Bahamian data protection laws.
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">Download Your Data</p>
                          <p className="text-sm text-gray-500">Get a copy of all your personal information</p>
                        </div>
                        <Button variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Request Data
                        </Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">Delete Account</p>
                          <p className="text-sm text-gray-500">Permanently delete your account and data</p>
                        </div>
                        <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}