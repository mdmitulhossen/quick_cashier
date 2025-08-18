import { zodResolver } from '@hookform/resolvers/zod';
import { DollarSign, Shield, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Alert } from '../../components/ui/Alert';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../contexts/AuthContext';

const signupSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupForm = z.infer<typeof signupSchema>;

export function SignupPage() {
  const [error, setError] = useState<string>('');
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const form = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupForm) => {
    setError('');
    try {
      await signup({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        password: data.password,
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl">
              <DollarSign className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Quick Cash</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in here
            </Link>
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="error" onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {/* Signup Form */}
        <Card>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First name"
                  autoComplete="given-name"
                  {...form.register('firstName')}
                  error={form.formState.errors.firstName?.message}
                  disabled={isLoading}
                />
                <Input
                  label="Last name"
                  autoComplete="family-name"
                  {...form.register('lastName')}
                  error={form.formState.errors.lastName?.message}
                  disabled={isLoading}
                />
              </div>

              <Input
                label="Email address"
                type="email"
                autoComplete="email"
                {...form.register('email')}
                error={form.formState.errors.email?.message}
                disabled={isLoading}
              />

              <Input
                label="Phone number"
                type="tel"
                autoComplete="tel"
                {...form.register('phone')}
                error={form.formState.errors.phone?.message}
                helper="Include country code (e.g., +1 242 123 4567)"
                disabled={isLoading}
              />

              <Input
                label="Password"
                type="password"
                autoComplete="new-password"
                {...form.register('password')}
                error={form.formState.errors.password?.message}
                helper="Must be at least 8 characters"
                disabled={isLoading}
              />

              <Input
                label="Confirm password"
                type="password"
                autoComplete="new-password"
                {...form.register('confirmPassword')}
                error={form.formState.errors.confirmPassword?.message}
                disabled={isLoading}
              />

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="agree-terms"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    {...form.register('agreeToTerms')}
                    disabled={isLoading}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agree-terms" className="text-gray-700">
                    I agree to the{' '}
                    <Link to="/terms-of-service" className="text-blue-600 hover:text-blue-500">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy-policy" className="text-blue-600 hover:text-blue-500">
                      Privacy Policy
                    </Link>
                  </label>
                  {form.formState.errors.agreeToTerms && (
                    <p className="text-red-600 text-xs mt-1">
                      {form.formState.errors.agreeToTerms.message}
                    </p>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span className="ml-2">Creating account...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 w-4 h-4" />
                    Create account
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-2">
            <Shield className="w-4 h-4" />
            <span>Your information is encrypted and secure</span>
          </div>
          <p className="text-xs text-gray-400">
            Protected by 256-bit SSL encryption
          </p>
        </div>
      </div>
    </div>
  );
}