import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { Shield, Heart, BookOpen, AlertTriangle, Phone, FileText, ArrowRight } from 'lucide-react';

export function ResponsibleLendingPage() {
  const principles = [
    {
      icon: Heart,
      title: 'Customer Wellbeing First',
      description: 'We only approve loans that we believe customers can afford to repay without financial hardship.'
    },
    {
      icon: BookOpen,
      title: 'Financial Education',
      description: 'We provide resources and guidance to help customers make informed financial decisions.'
    },
    {
      icon: Shield,
      title: 'Transparent Practices',
      description: 'All fees, rates, and terms are clearly disclosed upfront with no hidden charges.'
    },
    {
      icon: Phone,
      title: 'Ongoing Support',
      description: 'Our customer service team is available to help with questions and payment difficulties.'
    }
  ];

  const protections = [
    {
      title: 'Affordability Assessment',
      description: 'Every application undergoes thorough income and expense analysis to ensure loan affordability.'
    },
    {
      title: 'Debt-to-Income Limits',
      description: 'We maintain strict debt-to-income ratios to prevent over-borrowing.'
    },
    {
      title: 'Cooling-off Period',
      description: '24-hour cancellation period after loan agreement signature.'
    },
    {
      title: 'Payment Flexibility',
      description: 'Options for payment date adjustments and emergency payment deferrals.'
    },
    {
      title: 'Early Repayment',
      description: 'No penalties for paying off your loan early - save on interest costs.'
    },
    {
      title: 'Fair Collections',
      description: 'Respectful collection practices that comply with Bahamian consumer protection laws.'
    }
  ];

  const warningSigns = [
    'Borrowing to pay basic living expenses like rent or food',
    'Taking multiple loans from different lenders',
    'Only making minimum payments on other debts',
    'Using credit to pay other credit obligations',
    'Experiencing stress or losing sleep over financial obligations'
  ];

  const alternatives = [
    {
      title: 'Emergency Savings Fund',
      description: 'Build a small emergency fund to avoid future borrowing needs'
    },
    {
      title: 'Credit Union Loans',
      description: 'Consider lower-rate options from local credit unions'
    },
    {
      title: 'Payment Plans',
      description: 'Ask creditors about payment plan options for existing bills'
    },
    {
      title: 'Financial Counseling',
      description: 'Seek advice from certified financial counselors'
    },
    {
      title: 'Government Assistance',
      description: 'Explore available government financial assistance programs'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Responsible Lending
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At Quick Cash, responsible lending isn't just a policy—it's our commitment 
            to protecting our customers and building stronger financial communities in The Bahamas.
          </p>
        </div>

        {/* Our Principles */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Our Responsible Lending Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {principles.map((principle, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <principle.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {principle.title}
                      </h3>
                      <p className="text-gray-600">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Customer Protections */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            How We Protect Our Customers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {protections.map((protection, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {protection.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {protection.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Warning Signs */}
        <Card className="mb-16 border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-yellow-800">
              <AlertTriangle className="w-5 h-5" />
              <span>When NOT to Borrow</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-yellow-700 mb-4">
              Short-term loans should only be used for temporary financial needs. 
              Please reconsider borrowing if any of these apply to you:
            </p>
            <ul className="space-y-2">
              {warningSigns.map((sign, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <span className="text-yellow-800 text-sm">{sign}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Alternatives */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Alternative Financial Solutions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {alternatives.map((alternative, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {alternative.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {alternative.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Financial Resources */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle>Free Financial Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Educational Resources</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-blue-600 hover:text-blue-500 text-sm">
                      Building an Emergency Fund Guide
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:text-blue-500 text-sm">
                      Budgeting Basics for Bahamians
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:text-blue-500 text-sm">
                      Understanding Your Credit Report
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:text-blue-500 text-sm">
                      Debt Management Strategies
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">External Resources</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-blue-600 hover:text-blue-500 text-sm">
                      Central Bank of The Bahamas - Financial Literacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:text-blue-500 text-sm">
                      Ministry of Finance - Consumer Protection
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:text-blue-500 text-sm">
                      Securities Commission - Investor Education
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:text-blue-500 text-sm">
                      National Financial Literacy Coalition
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Regulatory Compliance */}
        <Card className="mb-16 bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-800">
              <FileText className="w-5 h-5" />
              <span>Regulatory Compliance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-green-700">
              <p>
                Quick Cash operates under the oversight of the Securities Commission of The Bahamas 
                and complies with all applicable consumer protection laws, including:
              </p>
              <ul className="space-y-2 ml-4">
                <li>• Consumer Protection Act</li>
                <li>• Fair Trading Act</li>
                <li>• Data Protection Act</li>
                <li>• Anti-Money Laundering Regulations</li>
                <li>• Central Bank of The Bahamas Guidelines</li>
              </ul>
              <p className="text-sm">
                Our lending practices are regularly audited to ensure compliance with all regulatory requirements.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Need Help with Payments?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            If you're experiencing difficulty making payments, contact us immediately. 
            We're here to help find a solution that works for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/contact">
                Contact Support
                <Phone className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/dashboard">
                Manage Account
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}