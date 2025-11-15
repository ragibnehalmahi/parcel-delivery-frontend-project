// pages/LoginPage.tsx
import { Link } from "react-router-dom";
import  LoginForm from  "@/components/modules/Authentication/LoginForm"
import { 
  Rocket, 
  Package, 
  Truck, 
  Shield,
  MapPin
} from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Left: Login Form */}
      <div className="flex flex-col p-6 md:p-8 lg:p-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link to="/" className="flex items-center gap-3 no-underline group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LogistiCore
            </span>
          </Link>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center py-8">
          <div className="w-full max-w-md">
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl shadow-xl p-8">
              <LoginForm />
            </div>
          </div>
        </div>

        {/* Features Footer */}
        <div className="mt-auto pt-8 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center">
              <Package className="w-5 h-5 text-blue-600 mb-1" />
              <span className="text-xs text-gray-600">Smart Shipping</span>
            </div>
            <div className="flex flex-col items-center">
              <Truck className="w-5 h-5 text-green-600 mb-1" />
              <span className="text-xs text-gray-600">Fast Delivery</span>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="w-5 h-5 text-purple-600 mb-1" />
              <span className="text-xs text-gray-600">Secure</span>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="w-5 h-5 text-orange-600 mb-1" />
              <span className="text-xs text-gray-600">Live Tracking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Hero Section */}
      <div className="hidden lg:flex relative bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 rounded-l-3xl overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-300 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="max-w-md">
            <div className="mb-8">
              <div className="w-20 h-20 bg-white/20 rounded-2xl backdrop-blur-sm flex items-center justify-center mb-6">
                <Rocket className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-4 leading-tight">
                Smart Delivery
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Made Simple
                </span>
              </h1>
              <p className="text-lg text-blue-100 leading-relaxed">
                Experience AI-powered logistics with real-time tracking, 
                intelligent routing, and seamless delivery management.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Package className="w-4 h-4 text-green-300" />
                </div>
                <span className="text-blue-100">AI-powered route optimization</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Truck className="w-4 h-4 text-blue-300" />
                </div>
                <span className="text-blue-100">Real-time package tracking</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-purple-300" />
                </div>
                <span className="text-blue-100">Secure and reliable delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>
    </div>
  );
}