// pages/HelpCenterPage.tsx
import CommonLayout from "@/components/Layout/CommonLayout";  
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BookOpen, 
  Video, 
  FileText, 
  MessageCircle,
  HeadphonesIcon,
  Clock,
  CheckCircle
} from "lucide-react";

const HelpCenterPage = () => {
  const helpCategories = [
    {
      icon: BookOpen,
      title: "Documentation",
      description: "Comprehensive guides and API documentation",
      count: "50+ Articles",
      color: "blue"
    },
    {
      icon: Video,
      title: "Video Tutorials", 
      description: "Step-by-step video guides and walkthroughs",
      count: "30+ Videos",
      color: "purple"
    },
    {
      icon: FileText,
      title: "Knowledge Base",
      description: "Answers to frequently asked questions",
      count: "200+ Articles", 
      color: "green"
    },
    {
      icon: MessageCircle,
      title: "Community Forum",
      description: "Connect with other users and experts",
      count: "5K+ Members",
      color: "orange"
    }
  ];

  const popularArticles = [
    {
      title: "Getting Started with AI Delivery",
      category: "Getting Started",
      readTime: "5 min read"
    },
    {
      title: "Understanding Delivery Costs", 
      category: "Pricing",
      readTime: "3 min read"
    },
    {
      title: "Real-time Tracking Features",
      category: "Features",
      readTime: "4 min read"
    },
    {
      title: "Troubleshooting Common Issues",
      category: "Troubleshooting", 
      readTime: "7 min read"
    },
    {
      title: "API Integration Guide",
      category: "Developers",
      readTime: "10 min read"
    },
    {
      title: "Mobile App Usage Tips",
      category: "Mobile", 
      readTime: "4 min read"
    }
  ];

  return (
    <CommonLayout>
      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Help Center
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Find answers, guides, and resources to make the most of our AI delivery platform.
            </p>
          </div>
        </section>

        {/* Help Categories */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {helpCategories.map((category, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 bg-${category.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <category.icon className={`w-6 h-6 text-${category.color}-600`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                    <div className={`text-${category.color}-600 font-semibold text-sm`}>{category.count}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Support Options */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="border-0 shadow-lg text-center">
                <CardContent className="p-6">
                  <HeadphonesIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Support</h3>
                  <p className="text-gray-600 mb-4">Round-the-clock customer support for all your delivery needs</p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg text-center">
                <CardContent className="p-6">
                  <Clock className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Quick Response</h3>
                  <p className="text-gray-600 mb-4">Average response time of under 15 minutes for urgent issues</p>
                  <Button variant="outline" className="w-full">
                    Live Chat
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg text-center">
                <CardContent className="p-6">
                  <CheckCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Guaranteed Help</h3>
                  <p className="text-gray-600 mb-4">We guarantee to solve your issue or escalate immediately</p>
                  <Button variant="outline" className="w-full">
                    Get Help Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Popular Articles */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Articles</h2>
              <p className="text-gray-600">Most frequently viewed help articles</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {popularArticles.map((article, index) => (
                <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">{article.title}</h3>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {article.category}
                      </span>
                      <span>{article.readTime}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </CommonLayout>
  );
};

export default HelpCenterPage;