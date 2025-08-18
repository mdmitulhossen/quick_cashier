import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { Calculator, Info, AlertCircle, FileText, ArrowRight } from 'lucide-react';

export function RatesTermsPage() {
  const loanTiers = [
    {
      amount: '$100 - $500',
      apr: '25% - 30%',
      term: '2 weeks - 2 months',
      example: { amount: 500, payment: 275, total: 550 }
    },
    {
      amount: '$501 - $1,500',
      apr: '20% - 25%',
      term: '1 month - 4 months',
      example: { amount: 1000, payment: 350, total: 1400 }
    },
    {
      amount: '$1,501 - $5,000',
      apr: '15% - 20%',
      term: '2 months - 6 months',
      example: { amount: 3000, payment: 650, total: 3900 }
    }
  ];

  const fees = [
    { name: 'Application Fee', amount: 'FREE', description: 'No charge to apply' },
    { name: 'Late Payment Fee', amount: '$25', description: 'Charged after 5-day grace period' },
    { name: 'NSF Fee', amount: '$35', description: 'For returned payments' },
    { name: 'Prepayment Penalty', amount: 'FREE', description: 'No penalty for early repayment' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Rates & Terms
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Transparent pricing with no hidden fees. See exactly what your loan will cost 
            before you apply. All rates comply with Bahamian lending regulations.
          </p>
        </div>

        {/* Loan Tiers */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Loan Options & Rates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loanTiers.map((tier, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-center">
                    {tier.amount}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="space-y-4">
                    <div>
                      <div className="text-3xl font-bold text-blue-600">
                        {tier.apr}
                      </div>
                      <div className="text-sm text-gray-600">Annual Percentage Rate</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Term:</span>
                        <span className="font-semibold">{tier.term}</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mt-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Example</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Loan Amount:</span>
                          <span>${tier.example.amount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Monthly Payment:</span>
                          <span>${tier.example.payment}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <span className="text-gray-900">Total Repayment:</span>
                          <span className="text-blue-600">${tier.example.total}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Fees Table */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Fee Schedule
          </h2>
          <Card>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Fee Type</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Amount</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fees.map((fee, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-4 px-4 font-medium">{fee.name}</td>
                        <td className="py-4 px-4">
                          <span className={`font-semibold ${
                            fee.amount === 'FREE' ? 'text-green-600' : 'text-gray-900'
                          }`}>
                            {fee.amount}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{fee.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Important Terms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Info className="w-5 h-5 text-blue-600" />
                <span>Key Terms</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li>
                  <h4 className="font-semibold text-gray-900">Minimum Age</h4>
                  <p className="text-gray-600">Must be 18 years or older</p>
                </li>
                <li>
                  <h4 className="font-semibold text-gray-900">Residency</h4>
                  <p className="text-gray-600">Must be a legal resident of The Bahamas</p>
                </li>
                <li>
                  <h4 className="font-semibold text-gray-900">Income Requirement</h4>
                  <p className="text-gray-600">Minimum $1,000 monthly gross income</p>
                </li>
                <li>
                  <h4 className="font-semibold text-gray-900">Bank Account</h4>
                  <p className="text-gray-600">Valid Bahamian bank account in good standing</p>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <span>Important Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li>
                  <h4 className="font-semibold text-gray-900">Rate Determination</h4>
                  <p className="text-gray-600">Your rate depends on creditworthiness and loan terms</p>
                </li>
                <li>
                  <h4 className="font-semibold text-gray-900">Payment Schedule</h4>
                  <p className="text-gray-600">Payments due bi-weekly or monthly as agreed</p>
                </li>
                <li>
                  <h4 className="font-semibold text-gray-900">Early Repayment</h4>
                  <p className="text-gray-600">Pay off your loan early with no penalties</p>
                </li>
                <li>
                  <h4 className="font-semibold text-gray-900">Grace Period</h4>
                  <p className="text-gray-600">5-day grace period before late fees apply</p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Representative Example */}
        <Card className="mb-16 bg-blue-50 border-blue-200">
          <CardContent className="p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Representative Example
            </h3>
            <p className="text-gray-700 mb-6">
              If you borrow <strong>$1,000</strong> over <strong>3 months (12 weeks)</strong> at an APR of <strong>20%</strong>:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">$375</div>
                <div className="text-sm text-gray-600">Monthly Payment</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">$125</div>
                <div className="text-sm text-gray-600">Total Interest</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">$1,125</div>
                <div className="text-sm text-gray-600">Total Repayment</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Calculate Your Exact Payment
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Use our calculator to see what your loan will cost with your specific terms
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/calculator">
                <Calculator className="mr-2 w-5 h-5" />
                Use Calculator
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/apply">
                Apply Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="mt-16 text-center">
          <div className="bg-gray-100 rounded-lg p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <FileText className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-900">Legal Notice</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              Quick Cash Bahamas Ltd. is licensed by the Securities Commission of The Bahamas. 
              All loans are subject to credit approval and underwriting. Your actual rate and terms 
              may vary based on creditworthiness, income verification, and other factors. 
              This is an expensive form of credit and is intended for short-term financial needs only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}