// pages/CareersPage.tsx
import CommonLayout from "@/components/Layout/CommonLayout";  
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, DollarSign, Users, Rocket, Heart } from "lucide-react";

const CareersPage = () => {
  const jobOpenings = [
    {
      title: "Senior AI Engineer",
      department: "Engineering",
      type: "Full-time",
      location: "Remote",
      salary: "$120k - $160k",
      description: "Develop and optimize machine learning models for route optimization and delivery predictions.",
      tags: ["Python", "TensorFlow", "ML", "AWS"]
    },
    {
      title: "Frontend Developer",
      department: "Engineering", 
      type: "Full-time",
      location: "San Francisco, CA",
      salary: "$90k - $130k",
      description: "Build responsive and interactive user interfaces for our delivery management platform.",
      tags: ["React", "TypeScript", "Tailwind", "Next.js"]
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      type: "Full-time", 
      location: "Remote",
      salary: "$110k - $150k",
      description: "Manage cloud infrastructure and ensure high availability of our delivery services.",
      tags: ["AWS", "Docker", "Kubernetes", "Terraform"]
    },
    {
      title: "Product Manager",
      department: "Product",
      type: "Full-time",
      location: "New York, NY", 
      salary: "$100k - $140k",
      description: "Lead product development and strategy for our AI-powered delivery platform.",
      tags: ["Product Strategy", "UX", "Analytics", "Agile"]
    },
    {
      title: "Customer Success Manager",
      department: "Operations",
      type: "Full-time",
      location: "Remote",
      salary: "$70k - $90k",
      description: "Ensure customer satisfaction and help clients maximize our delivery solutions.",
      tags: ["Customer Service", "CRM", "Onboarding", "Support"]
    },
    {
      title: "Data Scientist",
      department: "Data",
      type: "Full-time",
      location: "Boston, MA",
      salary: "$100k - $140k", 
      description: "Analyze delivery patterns and build predictive models for SwiftParcelcs optimization.",
      tags: ["Python", "SQL", "Statistics", "ML"]
    }
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "Competitive Salary",
      description: "Industry-leading compensation with equity options"
    },
    {
      icon: Users,
      title: "Remote First", 
      description: "Work from anywhere with flexible hours"
    },
    {
      icon: Rocket,
      title: "Career Growth",
      description: "Learning budget and professional development"
    },
    {
      icon: Heart, 
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs"
    }
  ];

  return (
    <CommonLayout>
      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Join Our Team
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Help us revolutionize parcel delivery with AI. Build the future of SwiftParcelcs.
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Work With Us</h2>
              <p className="text-xl text-gray-600">We value our team and provide amazing benefits</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Job Openings */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Open Positions</h2>
              <p className="text-xl text-gray-600">Find your perfect role and apply today</p>
            </div>

            <div className="grid gap-6 max-w-4xl mx-auto">
              {jobOpenings.map((job, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                        <p className="text-gray-600 mb-4">{job.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary" className="bg-blue-100 text-blue-700">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.type}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {job.salary}
                          </div>
                        </div>
                      </div>
                      
                      <Button className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap">
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Don't See Your Role?</h2>
              <p className="text-gray-600 mb-8">
                We're always looking for talented people. Send us your resume and we'll contact you when a matching position opens.
              </p>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Submit General Application
              </Button>
            </div>
          </div>
        </section>
      </div>
    </CommonLayout>
  );
};

export default CareersPage;