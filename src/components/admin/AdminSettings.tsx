import {
    Activity,
    AlertTriangle,
    Bell,
    CheckCircle,
    Clock,
    CreditCard,
    RefreshCw,
    Save,
    Server,
    Settings,
    Shield
} from 'lucide-react';
import { useState } from 'react';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { Alert } from '../ui/Alert';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

interface SystemStatus {
    database: 'online' | 'offline' | 'maintenance';
    api: 'online' | 'offline' | 'maintenance';
    paymentGateway: 'online' | 'offline' | 'maintenance';
    emailService: 'online' | 'offline' | 'maintenance';
    smsService: 'online' | 'offline' | 'maintenance';
}

interface SystemMetrics {
    uptime: string;
    activeUsers: number;
    totalTransactions: number;
    systemLoad: number;
    memoryUsage: number;
    diskUsage: number;
}

export function AdminSettings() {
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const systemStatus: SystemStatus = {
        database: 'online',
        api: 'online',
        paymentGateway: 'online',
        emailService: 'online',
        smsService: 'offline',
    };

    const systemMetrics: SystemMetrics = {
        uptime: '15 days, 8 hours, 32 minutes',
        activeUsers: 156,
        totalTransactions: 2847,
        systemLoad: 23.5,
        memoryUsage: 67.2,
        diskUsage: 45.8,
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'online': return 'bg-green-100 text-green-800';
            case 'offline': return 'bg-red-100 text-red-800';
            case 'maintenance': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'online': return CheckCircle;
            case 'offline': return AlertTriangle;
            case 'maintenance': return Clock;
            default: return Clock;
        }
    };

    const handleSaveSettings = async () => {
        setIsSaving(true);
        setSaveMessage(null);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            setSaveMessage({
                type: 'success',
                message: 'Settings saved successfully!'
            });
        } catch (error) {
            setSaveMessage({
                type: 'error',
                message: 'Failed to save settings. Please try again.'
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleRefreshSystem = () => {
        // TODO: Implement system refresh
        console.log('Refreshing system...');
    };

    return (
        <div className="space-y-6">
            {/* System Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Activity className="w-5 h-5" />
                            <span>System Status</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {Object.entries(systemStatus).map(([service, status]) => {
                                const StatusIcon = getStatusIcon(status);
                                return (
                                    <div key={service} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <StatusIcon className="w-5 h-5 text-gray-600" />
                                            <div>
                                                <p className="font-medium text-gray-900 capitalize">
                                                    {service.replace(/([A-Z])/g, ' $1').trim()}
                                                </p>
                                                <p className="text-sm text-gray-500">Service status</p>
                                            </div>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                                            {status}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Server className="w-5 h-5" />
                            <span>System Metrics</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Uptime</span>
                                <span className="font-medium">{systemMetrics.uptime}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Active Users</span>
                                <span className="font-medium">{systemMetrics.activeUsers}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Total Transactions</span>
                                <span className="font-medium">{systemMetrics.totalTransactions.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">System Load</span>
                                <span className="font-medium">{systemMetrics.systemLoad}%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Memory Usage</span>
                                <span className="font-medium">{systemMetrics.memoryUsage}%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Disk Usage</span>
                                <span className="font-medium">{systemMetrics.diskUsage}%</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Settings Forms */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* General Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Settings className="w-5 h-5" />
                            <span>General Settings</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                            <Input defaultValue="Quick Cash Bahamas" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
                            <Input defaultValue="support@quickcash.bs" type="email" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Support Phone</label>
                            <Input defaultValue="+1 (242) 123-4567" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                            <Select
                                defaultValue="America/Nassau"
                                options={[
                                    { value: 'America/Nassau', label: 'Eastern Time (ET)' },
                                    { value: 'UTC', label: 'UTC' },
                                ]}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                            <Select
                                defaultValue="BSD"
                                options={[
                                    { value: 'BSD', label: 'Bahamian Dollar (BSD)' },
                                    { value: 'USD', label: 'US Dollar (USD)' },
                                ]}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Security Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Shield className="w-5 h-5" />
                            <span>Security Settings</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout (minutes)</label>
                            <Input defaultValue="30" type="number" min="5" max="480" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Max Login Attempts</label>
                            <Input defaultValue="5" type="number" min="3" max="10" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password Policy</label>
                            <Select
                                defaultValue="strong"
                                options={[
                                    { value: 'basic', label: 'Basic (6+ characters)' },
                                    { value: 'medium', label: 'Medium (8+ characters, mixed case)' },
                                    { value: 'strong', label: 'Strong (10+ characters, symbols)' },
                                ]}
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <input type="checkbox" id="mfa" defaultChecked className="rounded" />
                            <label htmlFor="mfa" className="text-sm font-medium text-gray-700">
                                Require MFA for admin access
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input type="checkbox" id="audit" defaultChecked className="rounded" />
                            <label htmlFor="audit" className="text-sm font-medium text-gray-700">
                                Enable audit logging
                            </label>
                        </div>
                    </CardContent>
                </Card>

                {/* Loan Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <CreditCard className="w-5 h-5" />
                            <span>Loan Settings</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Loan Amount</label>
                            <Input defaultValue="100" type="number" min="50" step="50" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Loan Amount</label>
                            <Input defaultValue="5000" type="number" min="1000" step="500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Base APR (%)</label>
                            <Input defaultValue="15.0" type="number" min="5" max="35" step="0.1" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Term (months)</label>
                            <Input defaultValue="6" type="number" min="1" max="12" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Auto-approval Threshold</label>
                            <Input defaultValue="500" type="number" min="100" step="100" />
                        </div>
                    </CardContent>
                </Card>

                {/* Notification Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Bell className="w-5 h-5" />
                            <span>Notification Settings</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <input type="checkbox" id="email_notifications" defaultChecked className="rounded" />
                            <label htmlFor="email_notifications" className="text-sm font-medium text-gray-700">
                                Email notifications
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input type="checkbox" id="sms_notifications" defaultChecked className="rounded" />
                            <label htmlFor="sms_notifications" className="text-sm font-medium text-gray-700">
                                SMS notifications
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input type="checkbox" id="payment_reminders" defaultChecked className="rounded" />
                            <label htmlFor="payment_reminders" className="text-sm font-medium text-gray-700">
                                Payment reminders
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input type="checkbox" id="application_updates" defaultChecked className="rounded" />
                            <label htmlFor="application_updates" className="text-sm font-medium text-gray-700">
                                Application status updates
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input type="checkbox" id="system_alerts" defaultChecked className="rounded" />
                            <label htmlFor="system_alerts" className="text-sm font-medium text-gray-700">
                                System alerts
                            </label>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Save Button and Messages */}
            <Card>
                <CardContent className="p-6">
                    {saveMessage && (
                        <Alert variant={saveMessage.type} className="mb-4">
                            {saveMessage.message}
                        </Alert>
                    )}

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Button
                                onClick={handleSaveSettings}
                                disabled={isSaving}
                                size="lg"
                            >
                                {isSaving ? (
                                    <>
                                        <LoadingSpinner className="w-4 h-4 mr-2" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Settings
                                    </>
                                )}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={handleRefreshSystem}
                            >
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Refresh System
                            </Button>
                        </div>
                        <div className="text-sm text-gray-500">
                            Last updated: {new Date().toLocaleString()}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
