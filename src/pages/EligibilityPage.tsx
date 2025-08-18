import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { CheckCircle, X, FileText, DollarSign, Calendar, MapPin, CreditCard, ArrowRight } from 'lucide-react';

export function EligibilityPage() {
  const requirements = [
    {
      icon: Calendar,
      title: 'Age Requirement',
      description: 'Must be 18 years of age or older',
      required: true
    },
    {
      icon: MapPin,
      title: 'Residency',
      description: 'Legal resident of The Bahamas with valid address',
      required: true
    },
    {
      icon: FileText,
      title: 'Valid ID',
      description: 'Government-issued photo ID (passport, driver\'s license, or national ID)',
      required: true
    },
    {
      icon: DollarSign,
      title: 'Income',
      description: 'Minimum $1,000 monthly gross income from employment or benefits',
      required: true
    },
    {
      icon: CreditCard,
      title: 'Bank Account',
      description: 'Active Bahamian bank account in good standing',
      required: true
    },
    {
      icon: FileText,
      title: 'Employment',
      description: 'Steady employment or income source for at least 3 months',
      required: true
    }
  ];

  const documents = [
    {
      category: 'Identity Verification',
      items: [
        'Valid Bahamian passport',
        'Bahamian driver\'s license', 
        'National identification card',
        'Voter\'s registration card'
      ]
    },
    {
      category: 'Proof of Income',
      items: [
        'Recent pay stubs (last 2 months)',
        'Bank statements (last 3 months)',
        'Employment letter with salary',
        'Government benefit statements'
      ]
    },
    {
      category: 'Proof of Address',
      items: [
        'Utility bills (water, electricity, phone)',
        'Bank statements with address',
        'Lease agreement or mortgage statement',
        'Government correspondence'
      ]
    }
  ];

  const disqualifiers = [
    'Currently in bankruptcy proceedings',
    'Outstanding defaulted loans with other lenders',
    'Fraudulent information on previous applications',
    'Inability to verify income or identity',
    'Bank account with history of NSF/overdrafts',
    'Debt-to-income ratio exceeding 40%'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Eligibility Requirements
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Check if you qualify for a Quick Cash loan. We've designed our requirements 
            to be fair and accessible to working Bahamians.
          </p>
        </div>

        {/* Quick Check */}
        <Card className="mb-12 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Quick Eligibility Check</h2>
            <p className="text-blue-100 mb-6">
              Answer a few quick questions to see if you pre-qualify
            </p>
            <Button size="lg" className="bg-yellow-500 text-gray-900 hover:bg-yellow-400">
              Start Quick Check
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </CardContent>
        </Card>

        {/* Requirements Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Basic Requirements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requirements.map((req, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <req.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{req.title}</h3>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                      <p className="text-gray-600 text-sm">{req.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Required Documents */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Required Documents
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {documents.map((docCategory, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{docCategory.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {docCategory.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600">
                      Choose one document from this category
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Disqualifiers */}
        <Card className="mb-16 border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-800">
              <X className="w-5 h-5" />
              <span>Automatic Disqualifiers</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700 mb-4">
              You may not qualify for a loan if any of the following apply:
            </p>
            <ul className="space-y-2">
              {disqualifiers.map((item, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span className="text-red-700 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Process Timeline */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle>Application Process Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { step: 1, title: 'Application Submitted', time: 'Immediate', description: 'Complete online application' },
                { step: 2, title: 'Initial Review', time: '5-15 minutes', description: 'Automated eligibility check' },
                { step: 3, title: 'Document Verification', time: '2-4 hours', description: 'Manual review of uploaded documents' },
                { step: 4, title: 'Credit Check', time: '1-2 hours', description: 'Credit bureau verification' },
                { step: 5, title: 'Final Decision', time: '4-24 hours', description: 'Underwriting and approval decision' },
                { step: 6, title: 'Funding', time: '2-4 hours', description: 'Direct deposit to your account' },
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-blue-600">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Apply?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            If you meet the requirements above, you can start your application now
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/apply">
                Start Application
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/calculator">
                Calculate Payment First
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}