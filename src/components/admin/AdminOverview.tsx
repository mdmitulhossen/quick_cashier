import {
    Activity,
    BarChart3,
    CreditCard,
    DollarSign,
    Edit,
    Eye,
    FileText,
    TrendingDown,
    TrendingUp,
    Users
} from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

interface StatsCardProps {
    title: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
    color: string;
    icon: React.ComponentType<{ className?: string }>;
}

function StatsCard({ title, value, change, trend, color, icon: Icon }: StatsCardProps) {
    const colorClasses = {
        yellow: 'bg-yellow-100 text-yellow-600',
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
        purple: 'bg-purple-100 text-purple-600',
        red: 'bg-red-100 text-red-600',
    };

    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">{title}</p>
                        <p className="text-2xl font-bold text-gray-900">{value}</p>
                        <div className="flex items-center mt-1">
                            {trend === 'up' ? (
                                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                            ) : (
                                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                            )}
                            <span className={`text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                {change}
                            </span>
                        </div>
                    </div>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color as keyof typeof colorClasses]}`}>
                        <Icon className="w-6 h-6" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

interface RecentApplicationProps {
    id: string;
    name: string;
    amount: string;
    status: string;
    time: string;
    priority: string;
}

function RecentApplication({ id, name, amount, status, time, priority }: RecentApplicationProps) {
    const navigate = useNavigate();

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending_review': return 'bg-yellow-100 text-yellow-800';
            case 'kyc_required': return 'bg-blue-100 text-blue-800';
            case 'approved': return 'bg-green-100 text-green-800';
            case 'declined': return 'bg-red-100 text-red-800';
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

    const handleViewApplication = () => {
        navigate(`/admin/applications/${id}`);
    };

    const handleEditApplication = () => {
        // TODO: Open edit modal
        console.log('Edit application:', id);
    };

    return (
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                    <p className="font-medium text-gray-900">{name}</p>
                    <p className="text-sm text-gray-500">#{id} • {amount}</p>
                    <div className="flex items-center space-x-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(status)}`}>
                            {status.replace('_', ' ')}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(priority)}`}>
                            {priority}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">{time}</span>
                <Button variant="ghost" size="sm" onClick={handleViewApplication}>
                    <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={handleEditApplication}>
                    <Edit className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}

export function AdminOverview() {
    const navigate = useNavigate();

    const statsCards = [
        {
            title: 'Pending Applications',
            value: '23',
            change: '+5',
            trend: 'up' as const,
            color: 'yellow',
            icon: FileText
        },
        {
            title: 'Active Loans',
            value: '156',
            change: '+12',
            trend: 'up' as const,
            color: 'blue',
            icon: CreditCard
        },
        {
            title: 'Total Disbursed',
            value: '$2.8M',
            change: '+$185K',
            trend: 'up' as const,
            color: 'green',
            icon: DollarSign
        },
        {
            title: 'Collection Rate',
            value: '96.2%',
            change: '+1.2%',
            trend: 'up' as const,
            color: 'purple',
            icon: TrendingUp
        },
    ];

    const recentApplications = [
        {
            id: 'QC001267',
            name: 'Maria Thompson',
            amount: '$2,500',
            status: 'pending_review',
            time: '5 min ago',
            priority: 'high'
        },
        {
            id: 'QC001266',
            name: 'James Wilson',
            amount: '$1,200',
            status: 'kyc_required',
            time: '15 min ago',
            priority: 'medium'
        },
        {
            id: 'QC001265',
            name: 'Sarah Johnson',
            amount: '$3,000',
            status: 'approved',
            time: '1 hour ago',
            priority: 'low'
        },
        {
            id: 'QC001264',
            name: 'Michael Brown',
            amount: '$800',
            status: 'declined',
            time: '2 hours ago',
            priority: 'medium'
        },
    ];

    return (
        <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((card, index) => (
                    <StatsCard key={index} {...card} />
                ))}
            </div>

            {/* Recent Applications */}
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Recent Applications</CardTitle>
                        <Button variant="outline" size="sm" onClick={() => navigate('/admin/applications')}>
                            View All
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {recentApplications.map((app) => (
                            <RecentApplication key={app.id} {...app} />
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardContent className="p-6 text-center">
                        <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics</h3>
                        <p className="text-gray-600 mb-4">View detailed reports and insights</p>
                        <Button className="w-full" onClick={() => navigate('/admin/analytics')}>View Reports</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6 text-center">
                        <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Management</h3>
                        <p className="text-gray-600 mb-4">Manage customer accounts and data</p>
                        <Button className="w-full" onClick={() => navigate('/admin/customers')}>Manage Customers</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6 text-center">
                        <Activity className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">System Health</h3>
                        <p className="text-gray-600 mb-4">Monitor system performance</p>
                        <Button className="w-full" onClick={() => navigate('/admin/settings')}>View Status</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
