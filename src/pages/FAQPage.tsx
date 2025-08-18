import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ChevronDown, 
  ChevronRight, 
  MessageSquare, 
  Phone, 
  Mail,
  HelpCircle,
  Clock,
  DollarSign,
  FileText,
  Shield,
  CreditCard,
  Users
} from 'lucide-react';

export function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const faqCategories = [
    {
      title: 'Getting Started',
      icon: Users,
      faqs: [
        {
          question: 'How do I apply for a loan?',
          answer: 'You can apply online through our secure application form. The process takes about 5-10 minutes and includes providing personal information, employment details, and uploading required documents. You\'ll receive an instant decision in most cases.'
        },
        {
          question: 'What documents do I need to apply?',
          answer: 'You\'ll need a valid government-issued photo ID (passport, driver\'s license, or national ID), proof of income (recent pay stubs or bank statements), and proof of address (utility bill or bank statement from the last 3 months).'
        },
        {
          question: 'How long does the approval process take?',
          answer: 'Most applications receive an instant decision. If additional review is needed, you\'ll hear back within 24 hours. Once approved, funds are typically deposited within 2-4 hours during business hours.'
        },
        {
          question: 'What are the eligibility requirements?',
          answer: 'You must be 18+ years old, a legal resident of The Bahamas, have a valid government ID, proof of income showing at least $1,000 monthly gross income, and an active Bahamian bank account in good standing.'
        }
      ]
    },
    {
      title: 'Loan Terms & Rates',
      icon: DollarSign,
      faqs: [
        {
          question: 'What interest rates do you offer?',
          answer: 'Our rates range from 15% to 35% APR based on your creditworthiness, loan amount, and term. We use risk-based pricing to ensure fair rates for all customers while maintaining responsible lending practices.'
        },
        {
          question: 'How much can I borrow?',
          answer: 'You can borrow between $100 and $5,000, depending on your income, credit history, and ability to repay. We use responsible lending practices to ensure you only borrow what you can afford.'
        },
        {
          question: 'What loan terms are available?',
          answer: 'We offer flexible terms from 2 weeks to 6 months (26 weeks). Longer terms generally have lower rates, while shorter terms may have slightly higher rates due to the administrative costs.'
        },
        {
          question: 'Are there any hidden fees?',
          answer: 'No, we believe in transparent pricing. All fees are disclosed upfront in your loan agreement. The only additional fees are late payment fees ($25 after a 5-day grace period) and NSF fees ($35 for returned payments).'
        },
        {
          question: 'Can I pay off my loan early?',
          answer: 'Yes! You can pay off your loan early at any time with no prepayment penalties. This can save you money on interest charges.'
        }
      ]
    },
    {
      title: 'Payments & Repayment',
      icon: CreditCard,
      faqs: [
        {
          question: 'How do I make payments?',
          answer: 'You can make payments online through your customer dashboard, by phone, or through authorized payment locations. We also offer automatic payment setup for your convenience.'
        },
        {
          question: 'When are payments due?',
          answer: 'Payment dates are set based on your loan agreement and can be weekly, bi-weekly, or monthly. You\'ll receive reminders before each payment is due.'
        },
        {
          question: 'What happens if I miss a payment?',
          answer: 'We offer a 5-day grace period before any late fees are applied. If you\'re having trouble making a payment, contact us immediately - we\'re here to help find a solution that works for you.'
        },
        {
          question: 'Can I change my payment date?',
          answer: 'Yes, we offer flexible payment date options. Contact our customer service team to discuss changing your payment schedule to better align with your income.'
        },
        {
          question: 'How do I set up automatic payments?',
          answer: 'You can set up autopay through your customer dashboard. This ensures your payments are made on time and can help you avoid late fees. You can cancel autopay at any time.'
        }
      ]
    },
    {
      title: 'Account & Security',
      icon: Shield,
      faqs: [
        {
          question: 'How do I access my account?',
          answer: 'Log in to your customer dashboard using your email and password. If you forget your password, use the "Forgot Password" link to reset it securely.'
        },
        {
          question: 'Is my personal information secure?',
          answer: 'Yes, we use bank-level 256-bit SSL encryption to protect your data. We\'re also licensed and regulated by the Securities Commission of The Bahamas and comply with all data protection laws.'
        },
        {
          question: 'How do I update my contact information?',
          answer: 'You can update your contact information through your customer dashboard under the "Profile" section. Some changes may require verification for security purposes.'
        },
        {
          question: 'What if I suspect fraudulent activity?',
          answer: 'Contact us immediately at +1 (242) 123-HELP (4357) if you suspect any unauthorized activity on your account. We monitor all accounts for suspicious activity and will investigate any concerns promptly.'
        }
      ]
    },
    {
      title: 'Legal & Compliance',
      icon: FileText,
      faqs: [
        {
          question: 'Is Quick Cash licensed?',
          answer: 'Yes, Quick Cash Bahamas Ltd. is fully licensed and regulated by the Securities Commission of The Bahamas under License #QC-2020-001. We comply with all Bahamian consumer protection and lending laws.'
        },
        {
          question: 'How do you protect my privacy?',
          answer: 'We follow strict privacy policies and only share your information when required by law or with your explicit consent. See our Privacy Policy for complete details on how we handle your personal information.'
        },
        {
          question: 'What are my rights as a borrower?',
          answer: 'You have the right to clear loan terms, fair treatment, privacy protection, and the ability to file complaints. You also have a 24-hour cooling-off period after signing your loan agreement.'
        },
        {
          question: 'How do I file a complaint?',
          answer: 'You can file complaints through our customer service team, online through our website, or directly with the Securities Commission of The Bahamas. We take all complaints seriously and investigate them promptly.'
        }
      ]
    }
  ];

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const allFaqs = faqCategories.flatMap((category, categoryIndex) => 
    category.faqs.map((faq, faqIndex) => ({
      ...faq,
      categoryTitle: category.title,
      globalIndex: categoryIndex * 100 + faqIndex
    }))
  );

  const filteredFaqs = searchTerm 
    ? allFaqs.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <HelpCircle className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about Quick Cash loans, applications, 
            and account management.
          </p>
        </div>

        {/* Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search frequently asked questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {searchTerm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Search Results ({filteredFaqs.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredFaqs.length > 0 ? (
                <div className="space-y-4">
                  {filteredFaqs.map((faq) => (
                    <div key={faq.globalIndex} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              {faq.categoryTitle}
                            </span>
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                          <p className="text-gray-600">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No results found for "{searchTerm}"</p>
                  <p className="text-sm text-gray-400 mt-2">Try different keywords or browse categories below</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* FAQ Categories */}
        {!searchTerm && (
          <div className="space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <Card key={categoryIndex}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <category.icon className="w-5 h-5 text-blue-600" />
                    <span>{category.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.faqs.map((faq, faqIndex) => {
                      const globalIndex = categoryIndex * 100 + faqIndex;
                      const isExpanded = expandedItems.includes(globalIndex);
                      
                      return (
                        <div key={faqIndex} className="border border-gray-200 rounded-lg">
                          <button
                            onClick={() => toggleExpanded(globalIndex)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                          >
                            <h3 className="font-medium text-gray-900 pr-4">{faq.question}</h3>
                            {isExpanded ? (
                              <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
                            )}
                          </button>
                          {isExpanded && (
                            <div className="px-4 pb-4">
                              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Contact Support */}
        <Card className="mt-12 bg-blue-50 border-blue-200">
          <CardContent className="p-8 text-center">
            <MessageSquare className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our customer support team is here to help with any questions not covered in our FAQ.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/contact">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contact Support
                </Link>
              </Button>
              <Button variant="outline">
                <Phone className="w-4 h-4 mr-2" />
                Call +1 (242) 123-4567
              </Button>
            </div>
            <div className="mt-6 text-sm text-gray-500">
              <p>Support Hours: Mon-Fri 8AM-6PM, Sat 9AM-2PM</p>
              <p>Emergency Line: 24/7 Available</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}