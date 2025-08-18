import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Shield, AlertTriangle, Eye, FileText } from 'lucide-react';

export function AMLNotice() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Anti-Money Laundering & Counter-Terrorism Financing Notice
          </h1>
          <p className="text-lg text-gray-600">
            Our commitment to preventing financial crimes and protecting our community
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Effective: January 1, 2025
          </p>
        </div>

        <div className="space-y-8">
          {/* Overview */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span>Our Commitment</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-800">
                Quick Cash Bahamas Ltd. is committed to preventing money laundering and terrorism 
                financing. We comply with all applicable Bahamian AML/CFT laws and regulations, 
                including the Financial Transactions Reporting Act and regulations issued by the 
                Financial Intelligence Unit of The Bahamas.
              </p>
            </CardContent>
          </Card>

          {/* Customer Due Diligence */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Due Diligence (CDD)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                As part of our AML/CFT compliance program, we are required to verify the identity 
                of all customers and understand the nature and purpose of our business relationships.
              </p>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Identity Verification Requirements</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Government-issued photo identification</li>
                  <li>Verification of current address</li>
                  <li>Confirmation of employment and income source</li>
                  <li>Bank account verification</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Enhanced Due Diligence</h3>
                <p className="text-gray-600">
                  For certain customers, we may be required to conduct enhanced due diligence, 
                  which may include additional documentation and verification steps.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Prohibited Activities */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-800">
                <AlertTriangle className="w-5 h-5" />
                <span>Prohibited Activities</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-700 mb-4">
                The following activities are strictly prohibited and may result in immediate 
                account closure and reporting to authorities:
              </p>
              <ul className="list-disc list-inside text-red-700 space-y-2">
                <li>Money laundering or structuring transactions</li>
                <li>Financing terrorism or terrorist organizations</li>
                <li>Using proceeds from illegal activities</li>
                <li>Providing false or misleading information</li>
                <li>Attempting to circumvent our monitoring systems</li>
                <li>Using our services on behalf of sanctioned individuals or entities</li>
              </ul>
            </CardContent>
          </Card>

          {/* Transaction Monitoring */}
          <Card>
            <CardHeader>
              <CardTitle>Transaction Monitoring</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                We monitor all transactions and account activity for suspicious patterns that 
                may indicate money laundering or other financial crimes.
              </p>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What We Monitor</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Unusual transaction patterns or amounts</li>
                  <li>Rapid loan applications or repayments</li>
                  <li>Transactions inconsistent with customer profile</li>
                  <li>Use of multiple accounts or identities</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Suspicious Activity Reporting</h3>
                <p className="text-gray-600">
                  If we detect suspicious activity, we are legally required to report it to the 
                  Financial Intelligence Unit (FIU) and may be prohibited from notifying you 
                  of such reports.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Sanctions Compliance */}
          <Card>
            <CardHeader>
              <CardTitle>Sanctions Compliance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                We screen all customers against international sanctions lists, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>United Nations Security Council sanctions</li>
                <li>OFAC Specially Designated Nationals (SDN) list</li>
                <li>European Union sanctions lists</li>
                <li>Bahamian domestic sanctions lists</li>
              </ul>
              <p className="text-gray-600 mt-4">
                We cannot provide services to individuals or entities on these lists or 
                those acting on their behalf.
              </p>
            </CardContent>
          </Card>

          {/* Record Keeping */}
          <Card>
            <CardHeader>
              <CardTitle>Record Keeping and Reporting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Records Retention</h3>
                <p className="text-gray-600">
                  We maintain comprehensive records of all customer transactions and due diligence 
                  information for a minimum of seven (7) years, as required by Bahamian law.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Regulatory Reporting</h3>
                <p className="text-gray-600">
                  We file all required reports with Bahamian authorities, including:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Suspicious Transaction Reports (STRs)</li>
                  <li>Large Transaction Reports (LTRs)</li>
                  <li>Border Currency Reports (BCRs) when applicable</li>
                  <li>Regulatory compliance reports</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Customer Responsibilities */}
          <Card>
            <CardHeader>
              <CardTitle>Your Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">As our customer, you agree to:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Notify us immediately of any changes to your personal information</li>
                <li>Use our services only for legitimate purposes</li>
                <li>Cooperate with any additional verification requests</li>
                <li>Report any suspicious activity on your account</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </CardContent>
          </Card>

          {/* Training and Compliance */}
          <Card>
            <CardHeader>
              <CardTitle>Our AML/CFT Program</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Staff Training</h3>
                <p className="text-gray-600">
                  All employees receive regular AML/CFT training and are required to report 
                  suspicious activities to our designated compliance officer.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Independent Testing</h3>
                <p className="text-gray-600">
                  Our AML/CFT program is subject to regular independent testing and audit 
                  to ensure effectiveness and compliance with regulations.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Continuous Improvement</h3>
                <p className="text-gray-600">
                  We continuously review and update our policies and procedures to address 
                  emerging risks and regulatory changes.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-gray-100">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>AML/CFT Compliance Contact</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                For questions about our AML/CFT policies or to report suspicious activity:
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Compliance Officer:</strong> Jane Smith, CAMS</p>
                <p><strong>Email:</strong> compliance@quickcash.bs</p>
                <p><strong>Phone:</strong> +1 (242) 123-4567 ext. 201</p>
                <p><strong>Mail:</strong> Compliance Department, Quick Cash Bahamas Ltd., 123 Bay Street, Nassau, Bahamas</p>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Suspicious Activity Reporting:</strong> If you suspect money laundering 
                  or terrorism financing, you may also report directly to the Financial Intelligence 
                  Unit at +1 (242) 356-7491 or fiu@bahamas.gov.bs
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}