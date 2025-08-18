import {
  Activity,
  BarChart3,
  Bell,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogOut,
  PieChart,
  Settings,
  Shield,
  TrendingUp,
  User,
  Users
} from 'lucide-react';
import React from 'react';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AdminApplications } from '../../components/admin/AdminApplications';
import { AdminCustomers } from '../../components/admin/AdminCustomers';
import { AdminLoans } from '../../components/admin/AdminLoans';
import { AdminOverview } from '../../components/admin/AdminOverview';
import { AdminSettings } from '../../components/admin/AdminSettings';
import { ApplicationReview } from '../../components/admin/ApplicationReview';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { useAuth } from '../../contexts/AuthContext';

// Admin Dashboard Layout Component
function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, path: '/admin' },
    { id: 'applications', label: 'Applications', icon: FileText, path: '/admin/applications' },
    { id: 'customers', label: 'Customers', icon: Users, path: '/admin/customers' },
    { id: 'loans', label: 'Loans', icon: CreditCard, path: '/admin/loans' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/admin" className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">Admin Panel</span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </Button>
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  {user?.firstName} {user?.lastName}
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
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
              {navigation.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${isActive(item.path)
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Quick Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Today's Applications</span>
                  <span className="font-semibold text-blue-600">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pending Reviews</span>
                  <span className="font-semibold text-yellow-600">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Approved Today</span>
                  <span className="font-semibold text-green-600">4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Collection Rate</span>
                  <span className="font-semibold text-purple-600">96.2%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Admin Overview Page
function AdminOverviewPage() {
  return <AdminOverview />;
}

// Admin Applications Page
function AdminApplicationsPage() {
  return <AdminApplications />;
}

// Admin Customers Page
function AdminCustomersPage() {
  return <AdminCustomers />;
}

// Admin Loans Page
function AdminLoansPage() {
  return <AdminLoans />;
}

// Admin Analytics Page
function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Analytics Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Revenue Growth</h3>
              <p className="text-2xl font-bold text-blue-600">+15.3%</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <Activity className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Loans</h3>
              <p className="text-2xl font-bold text-green-600">156</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <PieChart className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Conversion Rate</h3>
              <p className="text-2xl font-bold text-purple-600">68.5%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Admin Settings Page
function AdminSettingsPage() {
  return <AdminSettings />;
}

// Main Admin Dashboard Component
export function AdminDashboard() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminOverviewPage />} />
        <Route path="/applications" element={<AdminApplicationsPage />} />
        <Route path="/applications/:id" element={
          <ApplicationReview
            applicationId=""
            onApprove={() => { }}
            onDecline={() => { }}
            onRequestMoreInfo={() => { }}
          />
        } />
        <Route path="/customers" element={<AdminCustomersPage />} />
        <Route path="/loans" element={<AdminLoansPage />} />
        <Route path="/analytics" element={<AdminAnalyticsPage />} />
        <Route path="/settings" element={<AdminSettingsPage />} />
      </Routes>
    </AdminLayout>
  );
}