import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Shield } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Alert } from '../../components/ui/Alert';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../contexts/AuthContext';

const adminLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  mfaCode: z.string().optional(),
});

type AdminLoginForm = z.infer<typeof adminLoginSchema>;

export function AdminLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { adminLogin } = useAuth();
  const navigate = useNavigate();

  const form = useForm<AdminLoginForm>({
    resolver: zodResolver(adminLoginSchema),
  });

  const onSubmit = async (data: AdminLoginForm) => {
    try {
      setIsLoading(true);
      setError(null);

      // Use the adminLogin function from AuthContext
      await adminLogin(data.email, data.password);

      // Navigate to admin dashboard
      navigate('/admin');
    } catch (err) {
      setError('Admin login failed. Please check your credentials.');
      console.error('Admin login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">Quick Cash</div>
              <div className="text-sm text-blue-300">Admin Portal</div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white">
            Admin Sign In
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Secure access to the administration console
          </p>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lock className="w-5 h-5" />
              <span>Secure Login</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="error" className="mb-4">
                {error}
              </Alert>
            )}

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Email address"
                type="email"
                autoComplete="email"
                {...form.register('email')}
                error={form.formState.errors.email?.message}
                disabled={isLoading}
              />

              <Input
                label="Password"
                type="password"
                autoComplete="current-password"
                {...form.register('password')}
                error={form.formState.errors.password?.message}
                disabled={isLoading}
              />

              <Input
                label="MFA Code (if enabled)"
                type="text"
                placeholder="123456"
                {...form.register('mfaCode')}
                error={form.formState.errors.mfaCode?.message}
                helper="Enter your 6-digit authentication code"
                disabled={isLoading}
              />

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <LoadingSpinner className="mr-2 w-4 h-4" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 w-4 h-4" />
                    Sign in to Admin Portal
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-gray-400">
            This is a secure admin area. All activities are logged and monitored.
          </p>
          <div className="mt-4 p-3 bg-gray-800 rounded-lg">
            <p className="text-xs text-gray-300 mb-2">Demo Credentials:</p>
            <p className="text-xs text-gray-400">Email: admin@quickcash.bs</p>
            <p className="text-xs text-gray-400">Password: admin123</p>
          </div>
          <Link to="/" className="text-sm text-blue-400 hover:text-blue-300 mt-2 block">
            ← Back to main site
          </Link>
        </div>
      </div>
    </div>
  );
}