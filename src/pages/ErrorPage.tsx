// pages/ErrorPage.tsx
import CommonLayout from "@/components/Layout/CommonLayout";  
import { Button } from "@/components/ui/button";
import { Home, Search, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <CommonLayout>
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4 text-center">
          {/* Animated 404 */}
          <div className="mb-8">
            <div className="text-9xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                404
              </span>
            </div>
            <div className="w-32 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6"></div>
          </div>

          {/* Content */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Oops! The page you're looking for seems to have been lost in delivery. 
            Don't worry, we'll help you get back on track.
          </p>

          {/* Quick Actions */}
          <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Home className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Go Home</h3>
              <p className="text-sm text-gray-600 mb-3">Return to the homepage</p>
              <Button asChild size="sm" className="w-full">
                <Link to="/">
                  Homepage
                </Link>
              </Button>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Search</h3>
              <p className="text-sm text-gray-600 mb-3">Find what you need</p>
              <Button variant="outline" size="sm" className="w-full">
                Search Site
              </Button>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Contact Support</h3>
              <p className="text-sm text-gray-600 mb-3">Get help from our team</p>
              <Button variant="outline" size="sm" className="w-full">
                Contact Us
              </Button>
            </div>
          </div>

          {/* Fun Illustration */}
          <div className="max-w-md mx-auto">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
              <div className="text-6xl mb-4">📦</div>
              <p className="text-lg font-semibold">
                Even our AI couldn't find this page!
              </p>
              <p className="text-blue-100 text-sm mt-2">
                But we're always optimizing our routes...
              </p>
            </div>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};

export default ErrorPage;