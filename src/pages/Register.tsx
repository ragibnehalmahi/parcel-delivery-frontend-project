 
import { Link } from 'react-router-dom';
import { RegisterForm } from '@/components/modules/Authentication/RegisterForm';
import { Truck, Package } from 'lucide-react';

export default function Register() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Left: Registration Form */}
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
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create Account
              </h1>
              <p className="text-gray-600">
                Join thousands of satisfied customers shipping with us
              </p>
            </div>

            <RegisterForm />

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="text-blue-600 font-semibold hover:text-blue-700 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Image Section */}
      <div className="hidden lg:block relative bg-gradient-to-br from-blue-600 to-purple-700">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-blue-900/70 mix-blend-multiply"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-12 text-white">
          <div className="max-w-md">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h2 className="text-4xl font-bold mb-6">
                Start Your Delivery Journey
              </h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Truck className="h-5 w-5" />
                  </div>
                  <span>Fast & reliable nationwide delivery</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Package className="h-5 w-5" />
                  </div>
                  <span>Real-time package tracking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span>Secure and insured deliveries</span>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                <p className="text-sm italic">
                  "ParcelDelivery made shipping so simple. I can track my packages in real-time and the customer support is amazing!"
                </p>
                <p className="text-sm font-semibold mt-2">- Sarah Islam, Regular User</p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 right-1/4 w-8 h-8 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-6 h-6 bg-green-300 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-pink-400 rounded-full opacity-40 animate-ping"></div>
      </div>
    </div>
  );
}