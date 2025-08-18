import {
    AlertTriangle,
    CheckCircle,
    DollarSign,
    Download,
    Edit,
    Eye,
    Mail,
    Search,
    TrendingUp,
    User,
    X
} from 'lucide-react';
import { useState } from 'react';
import { downloadFileByKey } from '../../utils/downloadUtils';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: 'active' | 'suspended' | 'pending' | 'verified';
    joinDate: string;
    totalLoans: number;
    activeLoans: number;
    totalBorrowed: number;
    creditScore: number;
    lastActivity: string;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
}

export function AdminCustomers() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [isExporting, setIsExporting] = useState(false);

    const customers: Customer[] = [
        {
            id: 'CUST001',
            name: 'Maria Thompson',
            email: 'maria.thompson@email.com',
            phone: '+1 (242) 555-0123',
            status: 'active',
            joinDate: '2024-06-15',
            totalLoans: 3,
            activeLoans: 1,
            totalBorrowed: 7500,
            creditScore: 720,
            lastActivity: '2025-01-15T10:30:00Z',
            isEmailVerified: true,
            isPhoneVerified: true,
        },
        {
            id: 'CUST002',
            name: 'James Wilson',
            email: 'james.wilson@email.com',
            phone: '+1 (242) 555-0124',
            status: 'verified',
            joinDate: '2024-08-22',
            totalLoans: 2,
            activeLoans: 0,
            totalBorrowed: 4200,
            creditScore: 680,
            lastActivity: '2025-01-10T14:15:00Z',
            isEmailVerified: true,
            isPhoneVerified: true,
        },
        {
            id: 'CUST003',
            name: 'Sarah Johnson',
            email: 'sarah.johnson@email.com',
            phone: '+1 (242) 555-0125',
            status: 'active',
            joinDate: '2024-09-05',
            totalLoans: 1,
            activeLoans: 1,
            totalBorrowed: 3000,
            creditScore: 750,
            lastActivity: '2025-01-14T16:45:00Z',
            isEmailVerified: true,
            isPhoneVerified: false,
        },
        {
            id: 'CUST004',
            name: 'Michael Brown',
            email: 'michael.brown@email.com',
            phone: '+1 (242) 555-0126',
            status: 'suspended',
            joinDate: '2024-07-12',
            totalLoans: 2,
            activeLoans: 0,
            totalBorrowed: 3800,
            creditScore: 520,
            lastActivity: '2024-12-20T09:20:00Z',
            isEmailVerified: true,
            isPhoneVerified: true,
        },
        {
            id: 'CUST005',
            name: 'Lisa Davis',
            email: 'lisa.davis@email.com',
            phone: '+1 (242) 555-0127',
            status: 'pending',
            joinDate: '2025-01-10',
            totalLoans: 0,
            activeLoans: 0,
            totalBorrowed: 0,
            creditScore: 0,
            lastActivity: '2025-01-10T11:00:00Z',
            isEmailVerified: false,
            isPhoneVerified: false,
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'verified': return 'bg-blue-100 text-blue-800';
            case 'suspended': return 'bg-red-100 text-red-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active': return CheckCircle;
            case 'verified': return CheckCircle;
            case 'suspended': return X;
            case 'pending': return AlertTriangle;
            default: return User;
        }
    };

    const filteredCustomers = customers.filter(customer => {
        const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = !statusFilter || customer.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleExport = () => {
        downloadFileByKey('loan-application-form', (loading) => {
            setIsExporting(loading);
        });
    };

    const handleViewCustomer = (customerId: string) => {
        // TODO: Navigate to customer detail page
        console.log('View customer:', customerId);
    };

    const handleEditCustomer = (customerId: string) => {
        // TODO: Open edit customer modal
        console.log('Edit customer:', customerId);
    };

    const handleContactCustomer = (customer: Customer) => {
        // TODO: Open contact modal or navigate to messaging
        console.log('Contact customer:', customer.email);
    };

    return (
        <div className="space-y-6">
            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle>Customer Management</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-2">
                            <Input
                                placeholder="Search by name, email, or ID..."
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
                                { value: 'verified', label: 'Verified' },
                                { value: 'suspended', label: 'Suspended' },
                                { value: 'pending', label: 'Pending' },
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

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                                <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <User className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Active Customers</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {customers.filter(c => c.status === 'active').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Borrowed</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    ${customers.reduce((sum, c) => sum + c.totalBorrowed, 0).toLocaleString()}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Avg Credit Score</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {Math.round(customers.reduce((sum, c) => sum + c.creditScore, 0) / customers.length)}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Customers Table */}
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>All Customers ({filteredCustomers.length})</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 font-medium text-gray-900">Customer</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900">Loans</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900">Total Borrowed</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900">Credit Score</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900">Join Date</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900">Last Activity</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCustomers.map((customer) => {
                                    const StatusIcon = getStatusIcon(customer.status);
                                    return (
                                        <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-3 px-4">
                                                <div>
                                                    <p className="font-medium text-gray-900">{customer.name}</p>
                                                    <p className="text-sm text-gray-500">{customer.email}</p>
                                                    <p className="text-xs text-gray-400">{customer.phone}</p>
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        {customer.isEmailVerified && (
                                                            <span className="text-xs bg-green-100 text-green-800 px-1 rounded">Email ✓</span>
                                                        )}
                                                        {customer.isPhoneVerified && (
                                                            <span className="text-xs bg-blue-100 text-blue-800 px-1 rounded">Phone ✓</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center space-x-2">
                                                    <StatusIcon className="w-4 h-4 text-gray-500" />
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                                                        {customer.status}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div>
                                                    <p className="font-semibold text-gray-900">{customer.totalLoans}</p>
                                                    <p className="text-sm text-gray-500">{customer.activeLoans} active</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <p className="font-semibold text-gray-900">${customer.totalBorrowed.toLocaleString()}</p>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${customer.creditScore >= 700 ? 'bg-green-100 text-green-800' :
                                                        customer.creditScore >= 600 ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-red-100 text-red-800'
                                                    }`}>
                                                    {customer.creditScore}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-500">
                                                {formatDate(customer.joinDate)}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-500">
                                                {formatDateTime(customer.lastActivity)}
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center space-x-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleViewCustomer(customer.id)}
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleEditCustomer(customer.id)}
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleContactCustomer(customer)}
                                                    >
                                                        <Mail className="w-4 h-4" />
                                                    </Button>
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
