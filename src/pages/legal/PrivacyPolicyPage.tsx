import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Shield, Eye, Lock, Database } from 'lucide-react';

export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            How we collect, use, and protect your personal information
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: January 1, 2025
          </p>
        </div>

        <div className="space-y-8">
          {/* Quick Overview */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span>Privacy at a Glance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Lock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">Secure Storage</h3>
                  <p className="text-sm text-gray-600">Bank-level encryption and security</p>
                </div>
                <div className="text-center">
                  <Eye className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">Limited Sharing</h3>
                  <p className="text-sm text-gray-600">Only share when necessary and legal</p>
                </div>
                <div className="text-center">
                  <Database className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">Your Control</h3>
                  <p className="text-sm text-gray-600">Access and control your data</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Personal Information</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Name, address, phone number, and email address</li>
                  <li>Date of birth and government identification numbers</li>
                  <li>Employment information and income details</li>
                  <li>Banking information and account details</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Financial Information</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Credit history and credit reports</li>
                  <li>Bank statements and transaction history</li>
                  <li>Loan application and repayment data</li>
                  <li>Insurance and asset information</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Technical Information</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>IP address and device information</li>
                  <li>Browser type and operating system</li>
                  <li>Website usage and navigation patterns</li>
                  <li>Cookies and tracking technologies</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card>
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Loan Processing</h3>
                  <p className="text-gray-600">
                    To evaluate your loan application, verify your identity, assess creditworthiness, 
                    and process loan disbursements and repayments.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Customer Service</h3>
                  <p className="text-gray-600">
                    To provide customer support, respond to inquiries, and resolve account issues 
                    or payment difficulties.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Legal Compliance</h3>
                  <p className="text-gray-600">
                    To comply with Bahamian laws and regulations, including anti-money laundering 
                    requirements and regulatory reporting obligations.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Service Improvement</h3>
                  <p className="text-gray-600">
                    To analyze usage patterns, improve our services, and develop new products 
                    that better serve our customers' needs.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Information Sharing */}
          <Card>
            <CardHeader>
              <CardTitle>When We Share Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  We do not sell or rent your personal information. We may share your information only in these limited circumstances:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <strong className="text-gray-900">Credit Bureaus:</strong>
                      <span className="text-gray-600"> To obtain credit reports and report loan performance</span>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <strong className="text-gray-900">Service Providers:</strong>
                      <span className="text-gray-600"> With trusted third parties who help us operate our business</span>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <strong className="text-gray-900">Legal Requirements:</strong>
                      <span className="text-gray-600"> When required by law or to protect our legal rights</span>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <strong className="text-gray-900">With Your Consent:</strong>
                      <span className="text-gray-600"> When you explicitly authorize us to share your information</span>
                    </div>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle>Your Privacy Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Under Bahamian data protection laws, you have the following rights regarding your personal information:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Access Right</h4>
                    <p className="text-sm text-gray-600">Request a copy of all personal information we hold about you</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Correction Right</h4>
                    <p className="text-sm text-gray-600">Request correction of inaccurate or incomplete information</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Deletion Right</h4>
                    <p className="text-sm text-gray-600">Request deletion of your information (subject to legal requirements)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Portability Right</h4>
                    <p className="text-sm text-gray-600">Request your data in a machine-readable format</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Measures */}
          <Card>
            <CardHeader>
              <CardTitle>How We Protect Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Technical Safeguards</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                      <li>256-bit SSL encryption for all data transmission</li>
                      <li>Advanced firewall and intrusion detection systems</li>
                      <li>Regular security audits and penetration testing</li>
                      <li>Encrypted data storage with access controls</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Administrative Safeguards</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                      <li>Role-based access controls and authentication</li>
                      <li>Employee background checks and training</li>
                      <li>Regular compliance monitoring and reporting</li>
                      <li>Incident response and breach notification procedures</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-gray-100">
            <CardHeader>
              <CardTitle>Questions About This Policy?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                If you have questions about this privacy policy or how we handle your personal information, 
                please contact our Privacy Officer:
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Email:</strong> privacy@quickcash.bs</p>
                <p><strong>Phone:</strong> +1 (242) 123-4567</p>
                <p><strong>Mail:</strong> Privacy Officer, Quick Cash Bahamas Ltd., 123 Bay Street, Nassau, Bahamas</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}