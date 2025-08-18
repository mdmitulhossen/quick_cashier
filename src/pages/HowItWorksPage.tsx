import React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { FileText, UserCheck, CreditCard, Repeat, ArrowRight, Clock, Shield, DollarSign } from 'lucide-react';

export function HowItWorksPage() {
  const steps = [
    {
      icon: FileText,
      title: '1. Apply Online',
      description: 'Complete our secure online application in just 5 minutes. Provide basic personal and employment information.',
      details: [
        'Personal information',
        'Employment details',
        'Banking information',
        'Loan amount and purpose'
      ]
    },
    {
      icon: UserCheck,
      title: '2. Quick Verification',
      description: 'Our automated system verifies your information and checks your creditworthiness within minutes.',
      details: [
        'Identity verification',
        'Income confirmation',
        'Credit bureau check',
        'Affordability assessment'
      ]
    },
    {
      icon: CreditCard,
      title: '3. Instant Decision',
      description: 'Get an instant loan decision. If approved, review and digitally sign your loan agreement.',
      details: [
        'Automated underwriting',
        'Loan terms confirmation',
        'Digital signature',
        'Legal agreement'
      ]
    },
    {
      icon: DollarSign,
      title: '4. Receive Funds',
      description: 'Approved funds are deposited directly into your bank account, often within hours.',
      details: [
        'Direct bank deposit',
        'Same-day funding available',
        'SMS and email confirmation',
        'Account access via dashboard'
      ]
    },
    {
      icon: Repeat,
      title: '5. Easy Repayment',
      description: 'Repay your loan according to your agreed schedule. Set up autopay or pay manually online.',
      details: [
        'Flexible payment options',
        'Automatic payments available',
        'Payment reminders',
        'Early repayment allowed'
      ]
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: 'Fast Process',
      description: 'From application to funding in as little as 1 hour'
    },
    {
      icon: Shield,
      title: 'Secure & Licensed',
      description: 'Licensed by the Securities Commission of The Bahamas'
    },
    {
      icon: DollarSign,
      title: 'No Hidden Fees',
      description: 'Transparent pricing with no surprise charges'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            How Quick Cash Works
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Our streamlined process gets you the money you need quickly and securely. 
            Here's exactly how it works, step by step.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
              index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
            }`}>
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {step.title}
                  </h2>
                </div>
                <p className="text-lg text-gray-600 mb-6">
                  {step.description}
                </p>
                <ul className="space-y-2">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <Card className="p-8 bg-gradient-to-br from-gray-50 to-white">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {step.title.split('. ')[1]}
                    </h3>
                    <p className="text-gray-600">
                      {step.description.split('.')[0]}
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Process?
            </h2>
            <p className="text-lg text-gray-600">
              We've designed our process to be as quick and convenient as possible
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Apply now and get the money you need today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-yellow-500 text-gray-900 hover:bg-yellow-400">
              <Link to="/apply">
                Start Application
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
              <Link to="/calculator">
                Calculate Payment
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}