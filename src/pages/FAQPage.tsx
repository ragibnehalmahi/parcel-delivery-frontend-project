// pages/FAQPage.tsx
import CommonLayout from "@/components/Layout/CommonLayout";  
import { Button } from "@/components/ui/button";
 
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, MessageCircle, Mail } from "lucide-react";

const FAQPage = () => {
  const faqCategories = [
    {
      title: "Getting Started",
      questions: [
        {
          question: "How do I create my first shipment?",
          answer: "Simply log into your account, click 'Create Shipment', enter the package details and destination addresses. Our AI will suggest the best delivery options based on your needs."
        },
        {
          question: "What information do I need to create a shipment?",
          answer: "You'll need the sender and receiver addresses, package dimensions and weight, and preferred delivery timeframe. Our system handles the rest automatically."
        },
        {
          question: "Is there a mobile app available?",
          answer: "Yes! Our mobile app is available for both iOS and Android. You can track shipments, create new deliveries, and manage your account on the go."
        }
      ]
    },
    {
      title: "Pricing & Payments", 
      questions: [
        {
          question: "How is shipping cost calculated?",
          answer: "Costs are calculated based on package dimensions, weight, distance, delivery speed, and any special handling requirements. Our AI ensures you get the best rates available."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards, PayPal, bank transfers, and offer corporate billing options for business customers."
        },
        {
          question: "Are there any hidden fees?",
          answer: "No hidden fees. The price you see during shipment creation is the final price, including all taxes and service charges."
        }
      ]
    },
    {
      title: "Delivery & Tracking",
      questions: [
        {
          question: "How accurate is your real-time tracking?",
          answer: "Our GPS tracking updates every 30 seconds, providing precise location data. AI-powered ETAs are 95% accurate within 15 minutes."
        },
        {
          question: "What happens if my package is delayed?",
          answer: "Our AI automatically detects delays and notifies you immediately. We'll provide updated ETAs and options to reroute if necessary."
        },
        {
          question: "Can I change the delivery address after shipping?",
          answer: "Yes! You can update the delivery address through your dashboard until the package is out for final delivery. Some fees may apply for address changes."
        }
      ]
    },
    {
      title: "Account & Security",
      questions: [
        {
          question: "How secure is my personal information?",
          answer: "We use bank-level encryption and comply with global data protection regulations. Your data is never shared with third parties without your consent."
        },
        {
          question: "Can multiple users access one account?",
          answer: "Yes, we offer team accounts with role-based permissions. Perfect for businesses that need multiple team members to manage shipments."
        },
        {
          question: "How do I reset my password?",
          answer: "Click 'Forgot Password' on the login page. We'll send a secure link to your email to reset your password immediately."
        }
      ]
    }
  ];

  return (
    <CommonLayout>
      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              FAQ
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions about our AI-powered delivery services.
            </p>
          </div>
        </section>

        {/* Search Bar */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text"
                placeholder="Search questions..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {faqCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.title}</h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {category.questions.map((item, itemIndex) => (
                      <AccordionItem 
                        key={itemIndex} 
                        value={`item-${categoryIndex}-${itemIndex}`}
                        className="bg-white rounded-lg border border-gray-200 px-6"
                      >
                        <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600 py-4">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 pb-4 leading-relaxed">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Support CTA */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Still need help?</h2>
              <p className="text-gray-600 mb-8">
                Our support team is here to answer any questions you might have.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Live Chat
                </Button>
                <Button variant="outline" size="lg">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Support
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </CommonLayout>
  );
};

export default FAQPage;