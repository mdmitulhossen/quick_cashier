import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LoadingSpinner } from './LoadingSpinner';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAuth?: boolean;
    requireAdmin?: boolean;
}

export function ProtectedRoute({
    children,
    requireAuth = true,
    requireAdmin = false
}: ProtectedRouteProps) {
    const { user, isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    // Show loading spinner while checking authentication
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    // If authentication is required but user is not authenticated
    if (requireAuth && !isAuthenticated) {
        // Redirect to login page with return URL
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If admin access is required but user is not admin
    if (requireAdmin && (!user || !user.role || user.role !== 'admin')) {
        // Redirect to unauthorized page or dashboard
        return <Navigate to="/dashboard" replace />;
    }

    // If user is authenticated but trying to access login/signup pages
    if (isAuthenticated && (location.pathname === '/login' || location.pathname === '/signup')) {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
}
