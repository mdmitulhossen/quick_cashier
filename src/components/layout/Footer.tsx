import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Quick Cash</span>
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              Licensed short-term lender in The Bahamas. Get quick access to cash when you need it most, 
              with transparent terms and responsible lending practices.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Phone className="w-4 h-4" />
                <span>+1 (242) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Mail className="w-4 h-4" />
                <span>info@quickcash.bs</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>Nassau, Bahamas</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/how-it-works" className="text-gray-300 hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/rates-terms" className="text-gray-300 hover:text-white transition-colors">
                  Rates & Terms
                </Link>
              </li>
              <li>
                <Link to="/eligibility" className="text-gray-300 hover:text-white transition-colors">
                  Eligibility
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="text-gray-300 hover:text-white transition-colors">
                  Calculator
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Financial Education
                </Link>
              </li>
              <li>
                <Link to="/responsible-lending" className="text-gray-300 hover:text-white transition-colors">
                  Responsible Lending
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal & Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/aml-notice" className="text-gray-300 hover:text-white transition-colors">
                  AML/CFT Notice
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="/complaints" className="text-gray-300 hover:text-white transition-colors">
                  File Complaint
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              <p>© {new Date().getFullYear()} Quick Cash Bahamas Ltd. All rights reserved.</p>
              <p className="mt-1">Licensed by the Securities Commission of The Bahamas</p>
            </div>
            <div className="text-gray-400 text-xs mt-4 md:mt-0">
              <p>Lending decisions subject to credit approval and underwriting.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}