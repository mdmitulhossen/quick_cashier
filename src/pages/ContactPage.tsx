import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;

export function ContactPage() {
  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactForm) => {
    console.log('Contact form submission:', data);
    // Handle form submission
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone Support',
      details: '+1 (242) 123-4567',
      availability: 'Mon-Fri: 8AM-6PM, Sat: 9AM-2PM'
    },
    {
      icon: Mail,
      title: 'Email Support',
      details: 'support@quickcash.bs',
      availability: 'Response within 24 hours'
    },
    {
      icon: MapPin,
      title: 'Office Location',
      details: '123 Bay Street, Nassau, Bahamas',
      availability: 'Mon-Fri: 9AM-5PM'
    }
  ];

  const subjectOptions = [
    { value: '', label: 'Select a subject' },
    { value: 'loan-inquiry', label: 'Loan Inquiry' },
    { value: 'application-status', label: 'Application Status' },
    { value: 'payment-assistance', label: 'Payment Assistance' },
    { value: 'technical-support', label: 'Technical Support' },
    { value: 'complaint', label: 'File a Complaint' },
    { value: 'general', label: 'General Question' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about our loans or need help with your account? 
            We're here to help with personalized support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Methods */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Get in Touch</h2>
            
            {contactMethods.map((method, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <method.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {method.title}
                      </h3>
                      <p className="text-blue-600 font-medium mb-1">
                        {method.details}
                      </p>
                      <p className="text-sm text-gray-500">
                        {method.availability}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Business Hours */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span>Business Hours</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday:</span>
                    <span className="font-medium">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday:</span>
                    <span className="font-medium">9:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday:</span>
                    <span className="font-medium">Closed</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-blue-200">
                    <span className="text-gray-600">Emergency Line:</span>
                    <span className="font-medium">24/7 Available</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Send us a Message</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Full Name"
                      {...form.register('name')}
                      error={form.formState.errors.name?.message}
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      {...form.register('email')}
                      error={form.formState.errors.email?.message}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Phone Number"
                      type="tel"
                      {...form.register('phone')}
                      error={form.formState.errors.phone?.message}
                    />
                    <Select
                      label="Subject"
                      {...form.register('subject')}
                      error={form.formState.errors.subject?.message}
                      options={subjectOptions}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      placeholder="Please describe your question or concern..."
                      {...form.register('message')}
                    />
                    {form.formState.errors.message && (
                      <p className="text-sm text-red-600 mt-1">
                        {form.formState.errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Send className="mr-2 w-4 h-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQ Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                Looking for quick answers? Check our frequently asked questions.
              </p>
              <Button asChild variant="outline">
                <Link to="/faq">View FAQs</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-16">
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Need Immediate Assistance?
              </h3>
              <p className="text-gray-600 mb-4">
                If you're experiencing a payment emergency or urgent account issue, 
                call our emergency line available 24/7.
              </p>
              <div className="text-2xl font-bold text-blue-600">
                +1 (242) 123-HELP (4357)
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}