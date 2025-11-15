// pages/UnauthorizedPage.tsx
import CommonLayout from "@/components/Layout/CommonLayout";  
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Home, Mail, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  return (
    <CommonLayout>
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* Icon */}
            <div className="mb-8">
              <div className="w-24 h-24 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-12 h-12 text-red-600" />
              </div>
            </div>

            {/* Content */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Access Denied
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
              You don't have permission to access this page. This area requires special authorization.
            </p>

            {/* Possible Reasons */}
            <Card className="border-0 shadow-lg mb-8">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Possible reasons:</h3>
                <ul className="text-gray-600 space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    You're not logged into your account
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Your user role doesn't have access to this page
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Your session may have expired
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    You're trying to access an admin-only area
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg">
                <Link to="/login">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </Link>
              </Button>
              
              <Button variant="outline" size="lg">
                <Mail className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            </div>

            {/* Additional Help */}
            <div className="mt-12">
              <Card className="border-0 bg-blue-50">
                <CardContent className="p-6">
                  <p className="text-blue-700">
                    Need access to this page? Contact your administrator or 
                    <a href="mailto:support@logisticore.com" className="font-semibold underline ml-1">
                      request access here
                    </a>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};

export default UnauthorizedPage;