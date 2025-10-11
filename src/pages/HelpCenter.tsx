import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Phone, 
  Mail, 
  MessageCircle, 
  FileText, 
  Truck, 
  Package,
  CreditCard,
  Shield,
  Clock,
  MapPin
} from 'lucide-react';

const HelpCenter = () => {
  const helpCategories = [
    {
      icon: <Package className="h-8 w-8" />,
      title: "Getting Started",
      description: "New to ParcelDelivery? Learn how to create your first shipment",
      link: "/getting-started",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Shipping & Delivery",
      description: "Everything about shipping rates, delivery times, and areas",
      link: "/shipping-info",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Billing & Payments",
      description: "Payment methods, invoices, and billing questions",
      link: "/billing",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Policies & Security",
      description: "Our policies, terms of service, and security measures",
      link: "/policies",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const popularArticles = [
    {
      title: "How to track my package?",
      category: "Tracking",
      reads: "15.2K"
    },
    {
      title: "What are the prohibited items?",
      category: "Policies",
      reads: "12.8K"
    },
    {
      title: "How to change delivery address?",
      category: "Delivery",
      reads: "9.4K"
    },
    {
      title: "Understanding delivery charges",
      category: "Billing",
      reads: "8.7K"
    },
    {
      title: "What to do if package is damaged?",
      category: "Support",
      reads: "7.3K"
    },
    {
      title: "How to create a return shipment?",
      category: "Shipping",
      reads: "6.9K"
    }
  ];

  const supportOptions = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone Support",
      description: "Speak directly with our support team",
      contact: "+880 1XXX-XXXXXX",
      availability: "24/7",
      action: "Call Now"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Support",
      description: "Send us your questions and get detailed responses",
      contact: "support@parceldelivery.com",
      availability: "Within 2 hours",
      action: "Send Email"
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Live Chat",
      description: "Instant messaging with our support agents",
      contact: "Available on website",
      availability: "9 AM - 11 PM",
      action: "Start Chat"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How can we help you?
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Find answers, guides, and support for all your parcel delivery needs
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for help articles, tracking, policies..."
                  className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpCategories.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className={`bg-gradient-to-r ${category.color} w-16 h-16 rounded-lg flex items-center justify-center mb-4 text-white`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Help Articles
            </h2>
            <p className="text-xl text-gray-600">
              Most frequently viewed help articles by our customers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {popularArticles.map((article, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {article.title}
                  </h3>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium whitespace-nowrap">
                    {article.category}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{article.reads} reads</span>
                  <span className="text-blue-600 font-medium hover:text-blue-700">
                    Read article →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Contact Support
            </h2>
            <p className="text-xl text-gray-600">
              Multiple ways to get help from our support team
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {supportOptions.map((option, index) => (
              <div
                key={index}
                className="text-center p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                  {option.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{option.title}</h3>
                <p className="text-gray-600 mb-4">{option.description}</p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-center text-sm text-gray-500">
                    <Phone className="h-4 w-4 mr-2" />
                    {option.contact}
                  </div>
                  <div className="flex items-center justify-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-2" />
                    {option.availability}
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  {option.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Quick Resources
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/tracking" className="p-4 hover:bg-gray-800 rounded-lg transition-colors">
              <MapPin className="h-6 w-6 mx-auto mb-2" />
              <span>Track Package</span>
            </Link>
            <Link to="/faq" className="p-4 hover:bg-gray-800 rounded-lg transition-colors">
              <FileText className="h-6 w-6 mx-auto mb-2" />
              <span>FAQ</span>
            </Link>
            <Link to="/contact" className="p-4 hover:bg-gray-800 rounded-lg transition-colors">
              <Mail className="h-6 w-6 mx-auto mb-2" />
              <span>Contact</span>
            </Link>
            <Link to="/terms" className="p-4 hover:bg-gray-800 rounded-lg transition-colors">
              <Shield className="h-6 w-6 mx-auto mb-2" />
              <span>Policies</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpCenter;