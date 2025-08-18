// API Service for Quick Cash Platform
// This file demonstrates how the application would integrate with a backend API

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
    error?: string;
}

class ApiService {
    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
        const token = localStorage.getItem('quickcash_token');

        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'API request failed');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Authentication
    async login(email: string, password: string) {
        return this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
    }

    async signup(userData: any) {
        return this.request('/auth/signup', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    }

    async logout() {
        return this.request('/auth/logout', {
            method: 'POST',
        });
    }

    async refreshToken() {
        return this.request('/auth/refresh', {
            method: 'POST',
        });
    }

    // User Management
    async getCurrentUser() {
        return this.request('/user/profile');
    }

    async updateUser(userData: any) {
        return this.request('/user/profile', {
            method: 'PUT',
            body: JSON.stringify(userData),
        });
    }

    async changePassword(passwordData: any) {
        return this.request('/user/change-password', {
            method: 'POST',
            body: JSON.stringify(passwordData),
        });
    }

    // Loan Applications
    async submitApplication(applicationData: any) {
        return this.request('/applications', {
            method: 'POST',
            body: JSON.stringify(applicationData),
        });
    }

    async getApplications(filters?: any) {
        const queryParams = filters ? `?${new URLSearchParams(filters)}` : '';
        return this.request(`/applications${queryParams}`);
    }

    async getApplication(id: string) {
        return this.request(`/applications/${id}`);
    }

    async updateApplication(id: string, data: any) {
        return this.request(`/applications/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    // Loans
    async getLoans(filters?: any) {
        const queryParams = filters ? `?${new URLSearchParams(filters)}` : '';
        return this.request(`/loans${queryParams}`);
    }

    async getLoan(id: string) {
        return this.request(`/loans/${id}`);
    }

    async makePayment(loanId: string, paymentData: any) {
        return this.request(`/loans/${loanId}/payments`, {
            method: 'POST',
            body: JSON.stringify(paymentData),
        });
    }

    // Documents
    async uploadDocument(documentData: FormData) {
        return this.request('/documents/upload', {
            method: 'POST',
            headers: {
                // Don't set Content-Type for FormData
            },
            body: documentData,
        });
    }

    async getDocuments() {
        return this.request('/documents');
    }

    async deleteDocument(id: string) {
        return this.request(`/documents/${id}`, {
            method: 'DELETE',
        });
    }

    // Admin Endpoints
    async getAdminStats() {
        return this.request('/admin/stats');
    }

    async getAdminApplications(filters?: any) {
        const queryParams = filters ? `?${new URLSearchParams(filters)}` : '';
        return this.request(`/admin/applications${queryParams}`);
    }

    async reviewApplication(id: string, reviewData: any) {
        return this.request(`/admin/applications/${id}/review`, {
            method: 'POST',
            body: JSON.stringify(reviewData),
        });
    }

    async getAdminCustomers(filters?: any) {
        const queryParams = filters ? `?${new URLSearchParams(filters)}` : '';
        return this.request(`/admin/customers${queryParams}`);
    }

    async getAdminLoans(filters?: any) {
        const queryParams = filters ? `?${new URLSearchParams(filters)}` : '';
        return this.request(`/admin/loans${queryParams}`);
    }

    // Reports
    async generateReport(reportType: string, params?: any) {
        return this.request('/reports/generate', {
            method: 'POST',
            body: JSON.stringify({ type: reportType, params }),
        });
    }

    async getReportHistory() {
        return this.request('/reports/history');
    }

    // Notifications
    async getNotifications() {
        return this.request('/notifications');
    }

    async markNotificationAsRead(id: string) {
        return this.request(`/notifications/${id}/read`, {
            method: 'PUT',
        });
    }

    async updateNotificationPreferences(preferences: any) {
        return this.request('/notifications/preferences', {
            method: 'PUT',
            body: JSON.stringify(preferences),
        });
    }
}

// Create a singleton instance
export const apiService = new ApiService();

// Export commonly used API functions
export const api = {
    auth: {
        login: apiService.login.bind(apiService),
        signup: apiService.signup.bind(apiService),
        logout: apiService.logout.bind(apiService),
        refreshToken: apiService.refreshToken.bind(apiService),
    },
    user: {
        getCurrent: apiService.getCurrentUser.bind(apiService),
        update: apiService.updateUser.bind(apiService),
        changePassword: apiService.changePassword.bind(apiService),
    },
    applications: {
        submit: apiService.submitApplication.bind(apiService),
        getAll: apiService.getApplications.bind(apiService),
        getById: apiService.getApplication.bind(apiService),
        update: apiService.updateApplication.bind(apiService),
    },
    loans: {
        getAll: apiService.getLoans.bind(apiService),
        getById: apiService.getLoan.bind(apiService),
        makePayment: apiService.makePayment.bind(apiService),
    },
    documents: {
        upload: apiService.uploadDocument.bind(apiService),
        getAll: apiService.getDocuments.bind(apiService),
        delete: apiService.deleteDocument.bind(apiService),
    },
    admin: {
        getStats: apiService.getAdminStats.bind(apiService),
        getApplications: apiService.getAdminApplications.bind(apiService),
        reviewApplication: apiService.reviewApplication.bind(apiService),
        getCustomers: apiService.getAdminCustomers.bind(apiService),
        getLoans: apiService.getAdminLoans.bind(apiService),
    },
    reports: {
        generate: apiService.generateReport.bind(apiService),
        getHistory: apiService.getReportHistory.bind(apiService),
    },
    notifications: {
        getAll: apiService.getNotifications.bind(apiService),
        markAsRead: apiService.markNotificationAsRead.bind(apiService),
        updatePreferences: apiService.updateNotificationPreferences.bind(apiService),
    },
};

export default apiService;
