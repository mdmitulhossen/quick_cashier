import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  User, 
  ArrowRight, 
  TrendingUp,
  BookOpen,
  DollarSign,
  Shield,
  PiggyBank,
  CreditCard,
  Target,
  Lightbulb,
  FileText
} from 'lucide-react';

export function BlogPage() {
  const featuredPost = {
    title: 'Building Your Emergency Fund: A Bahamian\'s Guide to Financial Security',
    excerpt: 'Learn how to build and maintain an emergency fund that can help you avoid the need for short-term loans and provide financial peace of mind.',
    author: 'Financial Education Team',
    date: '2025-01-10',
    readTime: '8 min read',
    category: 'Financial Planning',
    image: 'https://images.pexels.com/photos/3483098/pexels-photo-3483098.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true
  };

  const blogPosts = [
    {
      title: 'Understanding Your Credit Score in The Bahamas',
      excerpt: 'Learn how credit scores work in The Bahamas, what factors affect your score, and how to improve it over time.',
      author: 'Credit Education Team',
      date: '2025-01-08',
      readTime: '6 min read',
      category: 'Credit Education',
      image: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=400',
      icon: TrendingUp
    },
    {
      title: 'Smart Budgeting Tips for Island Living',
      excerpt: 'Practical budgeting strategies tailored for the unique economic environment of The Bahamas.',
      author: 'Financial Planning Team',
      date: '2025-01-05',
      readTime: '7 min read',
      category: 'Budgeting',
      image: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=400',
      icon: PiggyBank
    },
    {
      title: 'When to Consider a Short-Term Loan',
      excerpt: 'Understanding when short-term loans are appropriate and how to use them responsibly.',
      author: 'Lending Education Team',
      date: '2025-01-03',
      readTime: '5 min read',
      category: 'Responsible Lending',
      image: 'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=400',
      icon: DollarSign
    },
    {
      title: 'Protecting Yourself from Financial Fraud',
      excerpt: 'Essential tips to protect yourself from scams and fraudulent financial schemes in The Bahamas.',
      author: 'Security Team',
      date: '2024-12-28',
      readTime: '6 min read',
      category: 'Security',
      image: 'https://images.pexels.com/photos/4386339/pexels-photo-4386339.jpeg?auto=compress&cs=tinysrgb&w=400',
      icon: Shield
    },
    {
      title: 'Debt Management Strategies That Work',
      excerpt: 'Proven strategies for managing and reducing debt while maintaining your quality of life.',
      author: 'Financial Counseling Team',
      date: '2024-12-25',
      readTime: '9 min read',
      category: 'Debt Management',
      image: 'https://images.pexels.com/photos/4386366/pexels-photo-4386366.jpeg?auto=compress&cs=tinysrgb&w=400',
      icon: Target
    },
    {
      title: 'Financial Goal Setting for 2025',
      excerpt: 'How to set realistic financial goals and create a plan to achieve them in the new year.',
      author: 'Planning Team',
      date: '2024-12-20',
      readTime: '7 min read',
      category: 'Goal Setting',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400',
      icon: Lightbulb
    }
  ];

  const categories = [
    { name: 'All Posts', count: 25, active: true },
    { name: 'Financial Planning', count: 8, active: false },
    { name: 'Credit Education', count: 6, active: false },
    { name: 'Budgeting', count: 5, active: false },
    { name: 'Responsible Lending', count: 4, active: false },
    { name: 'Security', count: 2, active: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Financial Education Hub
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Expert insights, practical tips, and educational resources to help you 
            make informed financial decisions and build a stronger financial future.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Categories */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                        category.active 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span>{category.name}</span>
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card>
              <CardHeader>
                <CardTitle>Stay Updated</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Get the latest financial tips and updates delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <Button className="w-full" size="sm">
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Post */}
            <Card className="mb-8 overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                      Featured
                    </span>
                    <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                      {featuredPost.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{featuredPost.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                  </div>
                  <Button className="mt-4">
                    Read Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts.map((post, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow overflow-hidden">
                  <div className="relative">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white text-gray-700 text-xs px-2 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <CardContent className="p-8 text-center">
            <BookOpen className="w-12 h-12 text-white mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">
              Ready to Take Control of Your Finances?
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Apply our financial education to your real-world situation. 
              Calculate loan payments or start your application today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-yellow-500 text-gray-900 hover:bg-yellow-400">
                <Link to="/calculator">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Use Loan Calculator
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Link to="/apply">
                  <FileText className="w-5 h-5 mr-2" />
                  Apply for Loan
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}