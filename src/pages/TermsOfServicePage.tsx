// pages/TermsOfServicePage.tsx
import CommonLayout from "@/components/Layout/CommonLayout";  
import { Card, CardContent } from "@/components/ui/card";
import { ScrollText, Shield, FileText, AlertTriangle } from "lucide-react";

const TermsOfServicePage = () => {
  const sections = [
    {
      icon: ScrollText,
      title: "1. Agreement to Terms",
      content: "By accessing and using SwiftParcelCore's AI-powered delivery platform, you agree to be bound by these Terms of Service and all applicable laws and regulations."
    },
    {
      icon: Shield,
      title: "2. User Responsibilities", 
      content: "You are responsible for maintaining the confidentiality of your account and password, and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account."
    },
    {
      icon: FileText,
      title: "3. Service Usage",
      content: "Our services are intended for legal parcel delivery purposes only. You agree not to use the service for any unlawful purposes or to submit any harmful, dangerous, or prohibited items."
    },
    {
      icon: AlertTriangle, 
      title: "4. AI & Data Usage",
      content: "We use artificial intelligence to optimize delivery routes and predict ETAs. By using our service, you consent to our AI processing delivery data to improve service quality and efficiency."
    }
  ];

  return (
    <CommonLayout>
      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Terms of Service
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Please read these terms carefully before using our AI delivery services.
            </p>
          </div>
        </section>

        {/* Last Updated */}
        <section className="py-8 bg-blue-50">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <p className="text-blue-700 font-semibold">
                Last Updated: December 1, 2024
              </p>
              <p className="text-blue-600 text-sm mt-1">
                These terms may be updated periodically. Continued use of the service constitutes acceptance of updated terms.
              </p>
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Introduction */}
              <div className="prose prose-lg max-w-none mb-12">
                <p className="text-gray-600 leading-relaxed">
                  Welcome to SwiftParcelCore. These Terms of Service govern your use of our AI-powered 
                  parcel delivery platform and related services. By accessing or using our services, 
                  you agree to these terms.
                </p>
              </div>

              {/* Main Sections */}
              <div className="space-y-8">
                {sections.map((section, index) => (
                  <Card key={index} className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <section.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3">
                            {section.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {section.content}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Additional Legal Sections */}
              <div className="mt-12 grid md:grid-cols-2 gap-8">
                <Card className="border-0 bg-gray-50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Privacy Policy</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Learn how we collect, use, and protect your personal information 
                      in our comprehensive Privacy Policy.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-gray-50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Cookie Policy</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Understand how we use cookies and similar technologies to enhance 
                      your experience on our platform.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Legal */}
              <Card className="mt-12 border-0 bg-blue-50">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Questions About Our Terms?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Contact our legal team for any questions regarding these terms of service.
                  </p>
                  <p className="text-blue-600 font-semibold">
                    legal@SwiftParcelcore.com
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </CommonLayout>
  );
};

export default TermsOfServicePage;