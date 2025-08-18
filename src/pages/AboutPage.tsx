import React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { Shield, Award, Users, TrendingUp, Heart, Globe, ArrowRight } from 'lucide-react';

export function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'We prioritize the security of your personal and financial information with bank-level encryption and strict data protection policies.'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Every decision we make is guided by what\'s best for our customers. We believe in fair, transparent lending that helps rather than harms.'
    },
    {
      icon: Globe,
      title: 'Community Focus',
      description: 'As a Bahamian company, we understand the unique financial needs of our island community and are committed to serving them responsibly.'
    }
  ];

  const achievements = [
    { metric: '10,000+', label: 'Customers Served' },
    { metric: '$2.5M+', label: 'Loans Disbursed' },
    { metric: '94.2%', label: 'Customer Satisfaction' },
    { metric: '98.5%', label: 'Repayment Rate' }
  ];

  const team = [
    {
      name: 'Maria Rodriguez',
      role: 'CEO & Founder',
      bio: 'Former banking executive with 15+ years in Bahamian financial services',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'James Thompson',
      role: 'Chief Risk Officer',
      bio: 'Expert in credit risk management and regulatory compliance',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Dr. Sarah Williams',
      role: 'Head of Operations',
      bio: 'Operations specialist focused on customer experience and efficiency',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About Quick Cash
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                We're a licensed Bahamian lending company dedicated to providing 
                fair, transparent, and responsible short-term financial solutions 
                to our island community.
              </p>
              <Button asChild size="lg" className="bg-yellow-500 text-gray-900 hover:bg-yellow-400">
                <Link to="/apply">
                  Get Started Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
            <div className="hidden lg:block">
              <img 
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Bahamian community"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.pexels.com/photos/3184430/pexels-photo-3184430.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Nassau, Bahamas"
                className="rounded-xl shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2020 by a team of financial services professionals, 
                  Quick Cash was born from a simple observation: Bahamians needed 
                  better access to short-term credit during financial emergencies.
                </p>
                <p>
                  Traditional banks often had lengthy approval processes and strict 
                  requirements that left many hardworking Bahamians without options 
                  during crucial moments. We set out to change that.
                </p>
                <p>
                  Today, we've helped thousands of Bahamians access the funds they 
                  need quickly and fairly, while maintaining the highest standards 
                  of regulatory compliance and customer protection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Our Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl font-bold text-blue-600">
                  {achievement.metric}
                </div>
                <div className="text-gray-700 font-medium">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-lg text-gray-600">
              Experienced professionals committed to responsible lending
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Licensing & Compliance */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Licensed & Regulated
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Quick Cash Bahamas Ltd. is fully licensed and regulated by the 
                  Securities Commission of The Bahamas under License #QC-2020-001.
                </p>
                <p>
                  We comply with all Bahamian consumer protection laws, anti-money 
                  laundering regulations, and data privacy requirements.
                </p>
                <p>
                  Our operations are regularly audited to ensure we maintain the 
                  highest standards of financial and operational integrity.
                </p>
              </div>
              <div className="mt-8 flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-700">SCB Licensed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">Fully Insured</span>
                </div>
              </div>
            </div>
            
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Regulatory Information
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-600">License Number:</span>
                    <span className="font-medium">QC-2020-001</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Regulator:</span>
                    <span className="font-medium">Securities Commission of The Bahamas</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">License Type:</span>
                    <span className="font-medium">Consumer Credit License</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Established:</span>
                    <span className="font-medium">2020</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Registration:</span>
                    <span className="font-medium">12345-A</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Experience the Quick Cash Difference
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of satisfied customers who trust us for their short-term lending needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-yellow-500 text-gray-900 hover:bg-yellow-400">
              <Link to="/apply">
                Apply for Loan
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}