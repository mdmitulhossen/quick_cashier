import React, { useState, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Link } from 'react-router-dom';
import { Calculator, TrendingUp, ArrowRight } from 'lucide-react';

export function CalculatorPage() {
  const [loanAmount, setLoanAmount] = useState<string>('1000');
  const [termWeeks, setTermWeeks] = useState<string>('12');

  const termOptions = [
    { value: '2', label: '2 weeks' },
    { value: '4', label: '1 month' },
    { value: '8', label: '2 months' },
    { value: '12', label: '3 months' },
    { value: '16', label: '4 months' },
    { value: '20', label: '5 months' },
    { value: '24', label: '6 months' },
  ];

  const calculateLoan = useCallback(() => {
    const principal = parseFloat(loanAmount) || 0;
    const weeks = parseInt(termWeeks) || 1;
    
    // Simple interest calculation as per Bahamian requirements
    // Base rate: 15% APR for good credit, up to 35% APR
    let annualRate = 0.15; // 15% base rate
    
    // Adjust rate based on loan amount and term
    if (principal < 500) annualRate = 0.25; // 25% for smaller loans
    else if (principal < 1000) annualRate = 0.20; // 20% for medium loans
    
    // Adjust for shorter terms (higher risk)
    if (weeks <= 4) annualRate += 0.05; // Add 5% for very short term
    
    // Calculate interest and payments
    const interestAmount = (principal * annualRate * weeks) / 52; // Weekly rate
    const totalAmount = principal + interestAmount;
    const weeklyPayment = totalAmount / weeks;
    const monthlyPayment = weeklyPayment * 4.33; // Average weeks per month
    const apr = ((totalAmount / principal - 1) * 52 / weeks) * 100;
    
    return {
      principal,
      interestAmount,
      totalAmount,
      weeklyPayment,
      monthlyPayment,
      apr,
      weeks
    };
  }, [loanAmount, termWeeks]);

  const calculation = calculateLoan();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Calculator className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Loan Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calculate your loan payments and see exactly what your loan will cost. 
            No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calculator Form */}
          <Card>
            <CardHeader>
              <CardTitle>Loan Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Input
                label="Loan Amount (BSD)"
                type="number"
                min="100"
                max="5000"
                step="50"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                helper="Minimum $100, Maximum $5,000"
              />
              
              <Select
                label="Loan Term"
                value={termWeeks}
                onChange={(e) => setTermWeeks(e.target.value)}
                options={termOptions}
                helper="Choose your repayment period"
              />

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Rate Information</span>
                </div>
                <p className="text-xs text-gray-600">
                  Rates from 15% APR for qualified borrowers. Your actual rate may vary based on 
                  creditworthiness, loan amount, and term.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">
                    ${calculation.weeklyPayment.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600">Weekly Payment</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">
                    ${calculation.monthlyPayment.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600">Monthly Payment</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Loan Amount:</span>
                  <span className="font-semibold">${calculation.principal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Interest & Fees:</span>
                  <span className="font-semibold">${calculation.interestAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Total Repayment:</span>
                  <span className="font-semibold text-lg">${calculation.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">APR:</span>
                  <span className="font-semibold">{calculation.apr.toFixed(1)}%</span>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Representative Example:</strong> If you borrow ${calculation.principal.toFixed(0)} 
                  for {calculation.weeks} weeks, you will pay ${calculation.totalAmount.toFixed(2)} in total.
                </p>
              </div>

              <Button asChild className="w-full" size="lg">
                <Link to="/apply">
                  Apply for This Loan
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Important Information */}
        <Card className="mt-12">
          <CardContent>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Eligibility Requirements</h4>
                <ul className="space-y-1">
                  <li>• Must be 18+ years old</li>
                  <li>• Bahamian resident</li>
                  <li>• Valid government ID</li>
                  <li>• Proof of income</li>
                  <li>• Bank account in good standing</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Loan Features</h4>
                <ul className="space-y-1">
                  <li>• No prepayment penalties</li>
                  <li>• Flexible payment dates</li>
                  <li>• Online account management</li>
                  <li>• 24/7 customer support</li>
                  <li>• Secure, encrypted platform</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}