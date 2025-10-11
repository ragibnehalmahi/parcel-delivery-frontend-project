 
import { Link } from 'react-router-dom';
import { LoginForm } from '@/components/modules/Authentication/LoginForm';
import { Truck, Shield, Package } from 'lucide-react';

export default function Login() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Left: Login Form */}
      <div className="flex flex-col p-6 md:p-8 lg:p-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Truck className="h-6 w-6 text-white" />
          </div>
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">ParcelDelivery</span>
          </Link>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center py-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600">
                Sign in to your account to continue
              </p>
            </div>

            <LoginForm />

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link 
                  to="/register" 
                  className="text-blue-600 font-semibold hover:text-blue-700 hover:underline"
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Image Section */}
      <div className="hidden lg:block relative bg-gradient-to-br from-green-600 to-blue-700">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-green-900/60 mix-blend-multiply"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-12 text-white">
          <div className="max-w-md">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h2 className="text-4xl font-bold mb-6">
                Fast & Secure Login
              </h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Package className="h-5 w-5" />
                  </div>
                  <span>Track your packages in real-time</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Truck className="h-5 w-5" />
                  </div>
                  <span>Manage your deliveries easily</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Shield className="h-5 w-5" />
                  </div>
                  <span>Your data is safe with us</span>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                <p className="text-sm italic">
                  "I love how easy it is to login and track all my shipments in one place. The interface is so user-friendly!"
                </p>
                <p className="text-sm font-semibold mt-2">- Rahim Ahmed, Business Owner</p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 right-1/4 w-8 h-8 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-6 h-6 bg-blue-300 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-green-400 rounded-full opacity-40 animate-ping"></div>
      </div>
    </div>
  );
}