import {
    AlertTriangle,
    Check,
    CheckCircle,
    Clock,
    Download,
    Edit,
    Eye,
    Search,
    X
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { downloadFileByKey } from '../../utils/downloadUtils';

interface Application {
    id: string;
    customerName: string;
    email: string;
    phone: string;
    amount: number;
    term: string;
    status: string;
    priority: string;
    submittedAt: string;
    assignedTo?: string;
}

export function AdminApplications() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');
    const [isExporting, setIsExporting] = useState(false);

    const applications: Application[] = [
        {
            id: 'QC001267',
            customerName: 'Maria Thompson',
            email: 'maria.thompson@email.com',
            phone: '+1 (242) 555-0123',
            amount: 2500,
            term: '3 months',
            status: 'pending_review',
            priority: 'high',
            submittedAt: '2025-01-15T10:30:00Z',
            assignedTo: 'John Admin'
        },
        {
            id: 'QC001266',
            customerName: 'James Wilson',
            email: 'james.wilson@email.com',
            phone: '+1 (242) 555-0124',
            amount: 1200,
            term: '2 months',
            status: 'kyc_required',
            priority: 'medium',
            submittedAt: '2025-01-15T09:15:00Z',
            assignedTo: 'Sarah Underwriter'
        },
        {
            id: 'QC001265',
            customerName: 'Sarah Johnson',
            email: 'sarah.johnson@email.com',
            phone: '+1 (242) 555-0125',
            amount: 3000,
            term: '4 months',
            status: 'approved',
            priority: 'low',
            submittedAt: '2025-01-14T16:45:00Z',
            assignedTo: 'Mike KYC'
        },
        {
            id: 'QC001264',
            customerName: 'Michael Brown',
            email: 'michael.brown@email.com',
            phone: '+1 (242) 555-0126',
            amount: 800,
            term: '1 month',
            status: 'declined',
            priority: 'medium',
            submittedAt: '2025-01-14T14:20:00Z',
            assignedTo: 'Lisa Collections'
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending_review': return 'bg-yellow-100 text-yellow-800';
            case 'kyc_required': return 'bg-blue-100 text-blue-800';
            case 'approved': return 'bg-green-100 text-green-800';
            case 'declined': return 'bg-red-100 text-red-800';
            case 'under_review': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'bg-red-100 text-red-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'low': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending_review': return Clock;
            case 'kyc_required': return AlertTriangle;
            case 'approved': return CheckCircle;
            case 'declined': return X;
            case 'under_review': return Eye;
            default: return Clock;
        }
    };

    const filteredApplications = applications.filter(app => {
        const matchesSearch = app.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = !statusFilter || app.status === statusFilter;
        const matchesPriority = !priorityFilter || app.priority === priorityFilter;

        return matchesSearch && matchesStatus && matchesPriority;
    });

    const formatDate = (dateString: string) => {
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

    const handleViewApplication = (appId: string) => {
        // TODO: Navigate to application review page
        console.log('View application:', appId);
    };

    const handleEditApplication = (appId: string) => {
        // TODO: Open edit modal
        console.log('Edit application:', appId);
    };

    const handleApproveApplication = (appId: string) => {
        // TODO: Implement approval logic
        console.log('Approve application:', appId);
    };

    const handleDeclineApplication = (appId: string) => {
        // TODO: Implement decline logic
        console.log('Decline application:', appId);
    };

    return (
        <div className="space-y-6">
            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle>Applications</CardTitle>
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
                                { value: 'pending_review', label: 'Pending Review' },
                                { value: 'kyc_required', label: 'KYC Required' },
                                { value: 'under_review', label: 'Under Review' },
                                { value: 'approved', label: 'Approved' },
                                { value: 'declined', label: 'Declined' },
                            ]}
                        />
                        <Select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            options={[
                                { value: '', label: 'All Priorities' },
                                { value: 'high', label: 'High Priority' },
                                { value: 'medium', label: 'Medium Priority' },
                                { value: 'low', label: 'Low Priority' },
                            ]}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Applications Table */}
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>All Applications ({filteredApplications.length})</CardTitle>
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
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 font-medium text-gray-900">Application</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900">Customer</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900">Priority</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900">Submitted</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900">Assigned To</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredApplications.map((app) => {
                                    const StatusIcon = getStatusIcon(app.status);
                                    return (
                                        <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center space-x-2">
                                                    <StatusIcon className="w-4 h-4 text-gray-500" />
                                                    <span className="font-medium text-gray-900">#{app.id}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div>
                                                    <p className="font-medium text-gray-900">{app.customerName}</p>
                                                    <p className="text-sm text-gray-500">{app.email}</p>
                                                    <p className="text-xs text-gray-400">{app.phone}</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div>
                                                    <p className="font-semibold text-gray-900">${app.amount.toLocaleString()}</p>
                                                    <p className="text-sm text-gray-500">{app.term}</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                                                    {app.status.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(app.priority)}`}>
                                                    {app.priority}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-500">
                                                {formatDate(app.submittedAt)}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-500">
                                                {app.assignedTo || 'Unassigned'}
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center space-x-2">
                                                    <Button 
                                                        variant="ghost" 
                                                        size="sm"
                                                        onClick={() => handleViewApplication(app.id)}
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="sm"
                                                        onClick={() => handleEditApplication(app.id)}
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    {app.status === 'pending_review' && (
                                                        <>
                                                            <Button 
                                                                variant="ghost" 
                                                                size="sm" 
                                                                className="text-green-600"
                                                                onClick={() => handleApproveApplication(app.id)}
                                                            >
                                                                <Check className="w-4 h-4" />
                                                            </Button>
                                                            <Button 
                                                                variant="ghost" 
                                                                size="sm" 
                                                                className="text-red-600"
                                                                onClick={() => handleDeclineApplication(app.id)}
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </Button>
                                                        </>
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
