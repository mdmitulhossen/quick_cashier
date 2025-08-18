import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, CheckCircle, Calculator, FileText, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export function HomePage() {
  const features = [
    {
      icon: Clock,
      title: 'Quick Approval',
      description: 'Get approved in minutes with our streamlined application process'
    },
    {
      icon: Shield,
      title: 'Secure & Licensed',
      description: 'Licensed by the Securities Commission of The Bahamas with bank-level security'
    },
    {
      icon: CheckCircle,
      title: 'Transparent Terms',
      description: 'No hidden fees. Clear, upfront pricing with no surprises'
    },
    {
      icon: Calculator,
      title: 'Fair Rates',
      description: 'Competitive rates designed for short-term financial needs'
    }
  ];

  const howItWorks = [
    { step: '1', title: 'Apply Online', description: 'Complete our simple application in minutes' },
    { step: '2', title: 'Get Approved', description: 'Receive instant decision based on your profile' },
    { step: '3', title: 'Receive Funds', description: 'Money deposited directly to your bank account' },
    { step: '4', title: 'Repay', description: 'Flexible repayment options that work for you' }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Quick Cash When You
                  <span className="block text-yellow-300">Need It Most</span>
                </h1>
                <p className="text-xl text-blue-100 mt-6 max-w-xl">
                  Licensed short-term lending in The Bahamas. Get up to $5,000 with fast approval 
                  and transparent terms.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-yellow-500 text-gray-900 hover:bg-yellow-400">
                  <Link to="/apply">
                    Apply Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Link to="/calculator">
                    Calculate Payment
                  </Link>
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-blue-100">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Licensed & Regulated</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>No Hidden Fees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Secure Process</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/3833052/pexels-photo-3833052.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Happy customer using mobile banking"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Quick Cash?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to providing fast, fair, and transparent lending solutions 
            for Bahamians who need quick access to cash.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Get approved and funded in 4 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/how-it-works">
                Learn More
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Loan Calculator Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Calculate Your Payment
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Use our calculator to see exactly what your loan will cost. 
              No surprises, no hidden fees - just transparent pricing.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Borrow $100 - $5,000</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Terms from 2 weeks to 6 months</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Competitive rates from 15% APR</span>
              </div>
            </div>
            <div className="mt-8">
              <Button asChild size="lg" variant="outline">
                <Link to="/calculator">
                  Try Calculator
                  <Calculator className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Link to="/faq">
                  View FAQ
                </Link>
              </Button>
            </div>
          </div>
          
          <Card className="p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Example</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Loan Amount:</span>
                <span className="font-semibold">$1,000</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Term:</span>
                <span className="font-semibold">3 months</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Monthly Payment:</span>
                <span className="font-semibold">$375</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Total Cost:</span>
                <span className="font-semibold text-blue-600">$1,125</span>
              </div>
            </div>
            <Button asChild className="w-full mt-6">
              <Link to="/apply">Get Started</Link>
            </Button>
          </Card>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Trusted by Thousands of Bahamians
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">10,000+</div>
              <div className="text-gray-700">Loans Approved</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">$2.5M+</div>
              <div className="text-gray-700">Funds Disbursed</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">4.8/5</div>
              <div className="text-gray-700">Customer Rating</div>
            </div>
          </div>
          
          <div className="mt-12">
            <p className="text-sm text-gray-500 mb-4">
              Licensed and regulated by the Securities Commission of The Bahamas
            </p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-sm text-gray-500">SCB License #12345</div>
              <div className="text-sm text-gray-500">Established 2020</div>
              <div className="text-sm text-gray-500">Fully Insured</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center p-12">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Quick Cash for their short-term lending needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-yellow-500 text-gray-900 hover:bg-yellow-400">
              <Link to="/apply">
                Apply for Loan
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}