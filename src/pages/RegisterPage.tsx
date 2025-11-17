// pages/RegisterPage.tsx
import { Link } from "react-router-dom";
import { RegisterForm } from "@/components/modules/Authentication/RegisterForm";  
import { 
  Rocket, 
  Star, 
  Users, 
  Globe 
} from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-br from-slate-50 via-green-50 to-blue-50">
      {/* Left: Hero Section */}
      <div className="hidden lg:flex relative bg-gradient-to-br from-green-600 via-blue-700 to-purple-800 rounded-r-3xl overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="max-w-md">
            <div className="mb-8">
              <div className="w-20 h-20 bg-white/20 rounded-2xl backdrop-blur-sm flex items-center justify-center mb-6">
                <Rocket className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-4 leading-tight">
                Join
                <span className="block bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent">
                  SwiftParcelCore
                </span>
              </h1>
              <p className="text-lg text-blue-100 leading-relaxed">
                Start your journey with intelligent parcel delivery. 
                Create your account and experience next-generation SwiftParcelcs powered by AI.
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 text-green-300" />
                </div>
                <span className="text-blue-100">AI-optimized delivery routes</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-blue-300" />
                </div>
                <span className="text-blue-100">Join 50,000+ satisfied users</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Globe className="w-4 h-4 text-purple-300" />
                </div>
                <span className="text-blue-100">Global delivery network</span>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-sm text-blue-200">Users</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">200K+</div>
                <div className="text-sm text-blue-200">Deliveries</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">99.2%</div>
                <div className="text-sm text-blue-200">Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-400/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      {/* Right: Register Form */}
      <div className="flex flex-col p-6 md:p-8 lg:p-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link to="/" className="flex items-center gap-3 no-underline group">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              SwiftParcelCore
            </span>
          </Link>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center py-8">
          <div className="w-full max-w-md">
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl shadow-xl p-8">
              <RegisterForm />
              
              {/* Footer Links */}
              <div className="mt-8 text-center">
                <p className="text-gray-600 text-sm">
                  Already have an account?{" "}
                  <Link 
                    to="/login" 
                    className="text-green-600 font-semibold hover:text-green-700 transition-colors duration-200"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Footer */}
        <div className="mt-auto pt-8 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs text-gray-500">
              🔒 Your data is securely encrypted and protected
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}