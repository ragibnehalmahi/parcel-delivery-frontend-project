<<<<<<< HEAD
import React from 'react';
import { Truck, Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Truck className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">Parcel Delivery</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Your trusted partner for fast, reliable, and secure parcel delivery services. 
              We connect senders and receivers with seamless logistics solutions.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="h-4 w-4" />
                <span>+880 1XXX-XXXXXX</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4" />
                <span>support@parcel.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/tracking" className="text-gray-300 hover:text-white transition-colors">Track Parcel</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              <li><a href="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Same Day Delivery</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Next Day Delivery</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">International Shipping</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Express Delivery</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 text-gray-300 mb-4 md:mb-0">
            <MapPin className="h-4 w-4" />
            <span>Dhaka, Bangladesh</span>
          </div>
          <div className="text-gray-300 text-sm">
            © {new Date().getFullYear()} Parcel Delivery. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

=======
import React from 'react';
import { Truck, Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Truck className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">Parcel Delivery</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Your trusted partner for fast, reliable, and secure parcel delivery services. 
              We connect senders and receivers with seamless logistics solutions.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="h-4 w-4" />
                <span>+880 1XXX-XXXXXX</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4" />
                <span>support@parcel.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/tracking" className="text-gray-300 hover:text-white transition-colors">Track Parcel</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              <li><a href="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Same Day Delivery</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Next Day Delivery</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">International Shipping</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Express Delivery</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 text-gray-300 mb-4 md:mb-0">
            <MapPin className="h-4 w-4" />
            <span>Dhaka, Bangladesh</span>
          </div>
          <div className="text-gray-300 text-sm">
            © {new Date().getFullYear()} Parcel Delivery. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

>>>>>>> 83f810d1e4f52bcfb5248d889b25b62f8f7b5a8b
export default Footer;