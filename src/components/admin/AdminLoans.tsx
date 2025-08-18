import {
    Activity,
    AlertTriangle,
    CheckCircle,
    Clock,
    CreditCard,
    DollarSign,
    Download,
    Edit,
    Eye,
    Search,
    TrendingUp,
    X
} from 'lucide-react';
import { useState } from 'react';
import { downloadFileByKey } from '../../utils/downloadUtils';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

interface Loan {
    id: string;
    customerName: string;
    customerId: string;
    amount: number;
    balance: number;
    term: string;
    status: 'active' | 'paid' | 'defaulted' | 'pending' | 'approved';
    disbursedDate: string;
    maturityDate: string;
    nextPaymentDate: string;
    nextPaymentAmount: number;
    totalPaid: number;
    apr: number;
    paymentsRemaining: number;
    lastPaymentDate?: string;
    riskScore: number;
}

export function AdminLoans() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [isExporting, setIsExporting] = useState(false);

    const loans: Loan[] = [
        {
            id: 'LN001234',
            customerName: 'Maria Thompson',
            customerId: 'CUST001',
            amount: 2500,
            balance: 1875,
            term: '3 months',
            status: 'active',
            disbursedDate: '2025-01-01',
            maturityDate: '2025-04-01',
            nextPaymentDate: '2025-02-15',
            nextPaymentAmount: 375,
            totalPaid: 625,
            apr: 18.5,
            paymentsRemaining: 5,
            lastPaymentDate: '2025-01-15',
            riskScore: 720,
        },
        {
            id: 'LN001235',
            customerName: 'James Wilson',
            customerId: 'CUST002',
            amount: 1200,
            balance: 0,
            term: '2 months',
            status: 'paid',
            disbursedDate: '2024-11-01',
            maturityDate: '2025-01-01',
            nextPaymentDate: '2025-01-01',
            nextPaymentAmount: 0,
            totalPaid: 1200,
            apr: 16.2,
            paymentsRemaining: 0,
            lastPaymentDate: '2025-01-01',
            riskScore: 680,
        },
        {
            id: 'LN001236',
            customerName: 'Sarah Johnson',
            customerId: 'CUST003',
            amount: 3000,
            balance: 3000,
            term: '4 months',
            status: 'pending',
            disbursedDate: '2025-01-15',
            maturityDate: '2025-05-15',
            nextPaymentDate: '2025-02-15',
            nextPaymentAmount: 750,
            totalPaid: 0,
            apr: 19.1,
            paymentsRemaining: 4,
            riskScore: 750,
        },
        {
            id: 'LN001237',
            customerName: 'Michael Brown',
            customerId: 'CUST004',
            amount: 800,
            balance: 800,
            term: '1 month',
            status: 'defaulted',
            disbursedDate: '2024-12-01',
            maturityDate: '2025-01-01',
            nextPaymentDate: '2025-01-01',
            nextPaymentAmount: 800,
            totalPaid: 0,
            apr: 25.0,
            paymentsRemaining: 1,
            riskScore: 520,
        },
        {
            id: 'LN001238',
            customerName: 'Lisa Davis',
            customerId: 'CUST005',
            amount: 1500,
            balance: 1500,
            term: '3 months',
            status: 'approved',
            disbursedDate: '2025-01-20',
            maturityDate: '2025-04-20',
            nextPaymentDate: '2025-02-20',
            nextPaymentAmount: 500,
            totalPaid: 0,
            apr: 17.8,
            paymentsRemaining: 3,
            riskScore: 690,
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'paid': return 'bg-blue-100 text-blue-800';
            case 'defaulted': return 'bg-red-100 text-red-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'approved': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active': return Activity;
            case 'paid': return CheckCircle;
            case 'defaulted': return X;
            case 'pending': return Clock;
            case 'approved': return CheckCircle;
            default: return Clock;
        }
    };

    const filteredLoans = loans.filter(loan => {
        const matchesSearch = loan.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            loan.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = !statusFilter || loan.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatCurrency = (amount: number) => {
        return `$${amount.toLocaleString()}`;
    };

    const calculatePortfolioMetrics = () => {
        const activeLoans = loans.filter(loan => loan.status === 'active');
        const totalDisbursed = loans.reduce((sum, loan) => sum + loan.amount, 0);
        const totalOutstanding = loans.reduce((sum, loan) => sum + loan.balance, 0);
        const totalCollected = loans.reduce((sum, loan) => sum + loan.totalPaid, 0);
        const defaultedAmount = loans.filter(loan => loan.status === 'defaulted')
            .reduce((sum, loan) => sum + loan.balance, 0);

        return {
            totalLoans: loans.length,
            activeLoans: activeLoans.length,
            totalDisbursed,
            totalOutstanding,
            totalCollected,
            defaultedAmount,
            collectionRate: totalDisbursed > 0 ? ((totalCollected / totalDisbursed) * 100) : 0,
        };
    };

    const metrics = calculatePortfolioMetrics();

    const handleExport = () => {
        downloadFileByKey('loan-application-form', (loading) => {
            setIsExporting(loading);
        });
    };

    const handleViewLoan = (loanId: string) => {
        // TODO: Navigate to loan detail page
        console.log('View loan:', loanId);
    };

    const handleEditLoan = (loanId: string) => {
        // TODO: Open edit loan modal
        console.log('Edit loan:', loanId);
    };

    const handleCollectPayment = (loan: Loan) => {
        // TODO: Open payment collection modal
        console.log('Collect payment for loan:', loan.id);
    };

    return (
        <div className="space-y-6">
            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle>Loan Portfolio Management</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-2">
                            <Input
                                placeholder="Search by customer name or loan ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                icon={<Search className="w-4 h-4" />}
                            />
                        </div>
                        <Select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            options={[
                                { value: '', label: 'All Statuses' },
                                { value: 'active', label: 'Active' },
                                { value: 'paid', label: 'Paid' },
                                { value: 'defaulted', label: 'Defaulted' },
                                { value: 'pending', label: 'Pending' },
                                { value: 'approved', label: 'Approved' },
                            ]}
                        />
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleExport}
                            disabled={isExporting}
                        >
                            {isExporting ? (
                                <LoadingSpinner className="w-4 h-4 mr-2" />
                            ) : (
                                <Download className="w-4 h-4 mr-2" />
                            )}
                            {isExporting ? 'Exporting...' : 'Export'}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Portfolio Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Loans</p>
                                <p className="text-2xl font-bold text-gray-900">{metrics.totalLoans}</p>
                                <p className="text-sm text-gray-500">{metrics.activeLoans} active</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <CreditCard className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Disbursed</p>
                                <p className="text-2xl font-bold text-gray-900">{formatCurrency(metrics.totalDisbursed)}</p>
                                <p className="text-sm text-gray-500">{formatCurrency(metrics.totalOutstanding)} outstanding</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Collection Rate</p>
                                <p className="text-2xl font-bold text-gray-900">{metrics.collectionRate.toFixed(1)}%</p>
                                <p className="text-sm text-gray-500">{formatCurrency(metrics.totalCollected)} collected</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Defaulted Amount</p>
                                <p className="text-2xl font-bold text-gray-900">{formatCurrency(metrics.defaultedAmount)}</p>
                                <p className="text-sm text-gray-500">Requires attention</p>
                            </div>
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                <AlertTriangle className="w-6 h-6 text-red-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Loans Table */}
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>All Loans ({filteredLoans.length})</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 font-medium text-gray-900">Loan</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900">Customer</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900">Balance</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900">Next Payment</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900">APR</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLoans.map((loan) => {
                                    const StatusIcon = getStatusIcon(loan.status);
                                    return (
                                        <tr key={loan.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-3 px-4">
                                                <div>
                                                    <p className="font-medium text-gray-900">#{loan.id}</p>
                                                    <p className="text-sm text-gray-500">{loan.term}</p>
                                                    <p className="text-xs text-gray-400">
                                                        {formatDate(loan.disbursedDate)} - {formatDate(loan.maturityDate)}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <p className="font-medium text-gray-900">{loan.customerName}</p>
                                                <p className="text-sm text-gray-500">#{loan.customerId}</p>
                                            </td>
                                            <td className="py-3 px-4">
                                                <p className="font-semibold text-gray-900">{formatCurrency(loan.amount)}</p>
                                                <p className="text-sm text-gray-500">{formatCurrency(loan.totalPaid)} paid</p>
                                            </td>
                                            <td className="py-3 px-4">
                                                <p className="font-semibold text-gray-900">{formatCurrency(loan.balance)}</p>
                                                <p className="text-sm text-gray-500">{loan.paymentsRemaining} payments left</p>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center space-x-2">
                                                    <StatusIcon className="w-4 h-4 text-gray-500" />
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(loan.status)}`}>
                                                        {loan.status}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div>
                                                    <p className="font-medium text-gray-900">{formatDate(loan.nextPaymentDate)}</p>
                                                    <p className="text-sm text-gray-500">{formatCurrency(loan.nextPaymentAmount)}</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${loan.apr <= 15 ? 'bg-green-100 text-green-800' :
                                                        loan.apr <= 20 ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-red-100 text-red-800'
                                                    }`}>
                                                    {loan.apr}%
                                                </span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center space-x-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleViewLoan(loan.id)}
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleEditLoan(loan.id)}
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    {loan.status === 'active' && (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleCollectPayment(loan)}
                                                        >
                                                            <DollarSign className="w-4 h-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
