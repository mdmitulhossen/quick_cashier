import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { AuthProvider } from './contexts/AuthContext';
import { AboutPage } from './pages/AboutPage';
import { ApplyPage } from './pages/ApplyPage';
import { BlogPage } from './pages/BlogPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { ContactPage } from './pages/ContactPage';
import { EligibilityPage } from './pages/EligibilityPage';
import { FAQPage } from './pages/FAQPage';
import { HomePage } from './pages/HomePage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { RatesTermsPage } from './pages/RatesTermsPage';
import { ResponsibleLendingPage } from './pages/ResponsibleLendingPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminLogin } from './pages/admin/AdminLogin';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { CustomerDashboard } from './pages/customer/CustomerDashboard';
import { AMLNotice } from './pages/legal/AMLNotice';
import { PrivacyPolicyPage } from './pages/legal/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/legal/TermsOfServicePage';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1">
              <React.Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/how-it-works" element={<HowItWorksPage />} />
                  <Route path="/rates-terms" element={<RatesTermsPage />} />
                  <Route path="/eligibility" element={<EligibilityPage />} />
                  <Route path="/calculator" element={<CalculatorPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/responsible-lending" element={<ResponsibleLendingPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                  <Route path="/aml-notice" element={<AMLNotice />} />

                  {/* Auth Routes */}
                  <Route path="/login" element={
                    <ProtectedRoute requireAuth={false}>
                      <LoginPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/signup" element={
                    <ProtectedRoute requireAuth={false}>
                      <SignupPage />
                    </ProtectedRoute>
                  } />

                  {/* Protected Customer Routes */}
                  <Route path="/apply" element={
                    <ProtectedRoute>
                      <ApplyPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <CustomerDashboard />
                    </ProtectedRoute>
                  } />

                  {/* Admin Routes */}
                  <Route path="/admin/login" element={
                    <ProtectedRoute requireAuth={false}>
                      <AdminLogin />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/*" element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />
                </Routes>
              </React.Suspense>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;