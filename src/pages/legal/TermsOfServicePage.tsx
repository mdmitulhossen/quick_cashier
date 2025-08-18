import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { FileText, AlertCircle, Scale, Clock } from 'lucide-react';

export function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600">
            Legal terms and conditions for using Quick Cash services
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: January 1, 2025
          </p>
        </div>

        <div className="space-y-8">
          {/* Important Notice */}
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-yellow-800">
                <AlertCircle className="w-5 h-5" />
                <span>Important Notice</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-yellow-800">
                Please read these Terms of Service carefully before using our services. 
                By accessing or using Quick Cash services, you agree to be bound by these terms. 
                If you do not agree to these terms, please do not use our services.
              </p>
            </CardContent>
          </Card>

          {/* Acceptance of Terms */}
          <Card>
            <CardHeader>
              <CardTitle>1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                These Terms of Service ("Terms") constitute a legally binding agreement between you 
                and Quick Cash Bahamas Ltd. ("Company," "we," "us," or "our") regarding your use of 
                our lending services and website.
              </p>
              <p className="text-gray-600">
                By accessing our website, submitting a loan application, or using any of our services, 
                you acknowledge that you have read, understood, and agree to be bound by these Terms 
                and our Privacy Policy.
              </p>
            </CardContent>
          </Card>

          {/* Eligibility */}
          <Card>
            <CardHeader>
              <CardTitle>2. Eligibility Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">To use our services, you must:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Be at least 18 years of age</li>
                <li>Be a legal resident of The Bahamas</li>
                <li>Have a valid government-issued photo ID</li>
                <li>Have a bank account in good standing with a Bahamian financial institution</li>
                <li>Have a verifiable source of income</li>
                <li>Provide accurate and complete information in your application</li>
              </ul>
              <p className="text-gray-600">
                We reserve the right to verify your eligibility and may request additional 
                documentation to confirm your identity and financial information.
              </p>
            </CardContent>
          </Card>

          {/* Loan Terms */}
          <Card>
            <CardHeader>
              <CardTitle>3. Loan Terms and Conditions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Loan Amounts and Terms</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Loan amounts range from $100 to $5,000</li>
                  <li>Loan terms range from 2 weeks to 6 months</li>
                  <li>Interest rates range from 15% to 35% APR based on creditworthiness</li>
                  <li>All loans are subject to our underwriting and approval process</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Repayment</h4>
                <p className="text-gray-600">
                  You agree to repay your loan according to the payment schedule outlined in your 
                  loan agreement. Payments may be made online, by phone, or through authorized 
                  payment locations.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Late Payments</h4>
                <p className="text-gray-600">
                  Late payments may result in additional fees and may be reported to credit bureaus. 
                  We offer a 5-day grace period before late fees are applied.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Prohibited Uses */}
          <Card>
            <CardHeader>
              <CardTitle>4. Prohibited Uses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">You agree not to:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Provide false, misleading, or incomplete information</li>
                <li>Use our services for illegal purposes</li>
                <li>Attempt to circumvent our security measures</li>
                <li>Apply for multiple loans simultaneously without disclosure</li>
                <li>Use automated systems to access our services</li>
                <li>Reverse engineer or attempt to access our proprietary systems</li>
              </ul>
            </CardContent>
          </Card>

          {/* Privacy and Data Protection */}
          <Card>
            <CardHeader>
              <CardTitle>5. Privacy and Data Protection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Your privacy is important to us. Our collection, use, and disclosure of your 
                personal information is governed by our Privacy Policy, which is incorporated 
                into these Terms by reference.
              </p>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Consent to Credit Checks</h4>
                <p className="text-gray-600">
                  By applying for a loan, you authorize us to obtain your credit report from 
                  credit bureaus and to report your loan performance to credit bureaus.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Data Retention</h4>
                <p className="text-gray-600">
                  We retain your personal information for as long as necessary to provide services 
                  and comply with legal requirements, typically 7 years after account closure.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card>
            <CardHeader>
              <CardTitle>6. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                To the maximum extent permitted by Bahamian law, Quick Cash Bahamas Ltd. 
                shall not be liable for any indirect, incidental, consequential, or punitive 
                damages arising from your use of our services.
              </p>
              <p className="text-gray-600">
                Our total liability to you for any claims arising from our services shall not 
                exceed the amount of fees you have paid to us in the 12 months preceding the claim.
              </p>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card>
            <CardHeader>
              <CardTitle>7. Governing Law and Disputes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                These Terms are governed by the laws of The Commonwealth of The Bahamas. 
                Any disputes arising from these Terms or our services shall be resolved 
                through the courts of The Bahamas.
              </p>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Complaint Resolution</h4>
                <p className="text-gray-600">
                  Before pursuing legal action, we encourage you to contact our customer service 
                  team to resolve any disputes. You may also file complaints with the Securities 
                  Commission of The Bahamas.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card>
            <CardHeader>
              <CardTitle>8. Changes to These Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We may update these Terms from time to time to reflect changes in our services 
                or legal requirements. We will notify you of material changes by email or through 
                our website at least 30 days before the changes take effect.
              </p>
              <p className="text-gray-600 mt-4">
                Your continued use of our services after the effective date of any changes 
                constitutes your acceptance of the updated Terms.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span>Contact Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Email:</strong> legal@quickcash.bs</p>
                <p><strong>Phone:</strong> +1 (242) 123-4567</p>
                <p><strong>Mail:</strong> Legal Department, Quick Cash Bahamas Ltd., 123 Bay Street, Nassau, Bahamas</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}