// pages/ContactPage.tsx
import CommonLayout from "@/components/Layout/CommonLayout";  
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  HeadphonesIcon
} from "lucide-react";

const ContactPage = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Our friendly team is here to help.",
      contact: "hello@logisticore.com",
      action: "Send email"
    },
    {
      icon: Phone, 
      title: "Call Us",
      description: "Mon-Fri from 8am to 5pm.",
      contact: "+1 (555) 123-4567",
      action: "Call now"
    },
    {
      icon: MapPin,
      title: "Visit Us", 
      description: "Come say hello at our office.",
      contact: "123 Delivery St, San Francisco, CA",
      action: "Get directions"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team.",
      contact: "Start new chat",
      action: "Chat now" 
    }
  ];

  return (
    <CommonLayout>
      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Get in touch with our team. We're here to help with all your delivery needs.
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {contactMethods.map((method, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <method.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                    <p className="text-blue-600 font-semibold mb-4">{method.contact}</p>
                    <Button variant="outline" size="sm" className="w-full">
                      {method.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Form */}
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Send us a message</h2>
                <p className="text-gray-600 mb-8">
                  Have questions about our services? Need support with your deliveries? 
                  Fill out the form and we'll get back to you within 24 hours.
                </p>
                
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg mb-8">
                  <HeadphonesIcon className="w-8 h-8 text-blue-600" />
                  <div>
                    <div className="font-semibold text-gray-900">24/7 Support Available</div>
                    <div className="text-sm text-gray-600">Emergency delivery support always available</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                  <Clock className="w-8 h-8 text-green-600" />
                  <div>
                    <div className="font-semibold text-gray-900">Quick Response Time</div>
                    <div className="text-sm text-gray-600">Typically respond within 2 hours</div>
                  </div>
                </div>
              </div>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <Input placeholder="John" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <Input placeholder="Doe" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <Input type="email" placeholder="john@example.com" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                      </label>
                      <Input placeholder="How can we help you?" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <Textarea 
                        placeholder="Tell us about your delivery needs..." 
                        rows={5}
                      />
                    </div>
                    
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </CommonLayout>
  );
};

export default ContactPage;