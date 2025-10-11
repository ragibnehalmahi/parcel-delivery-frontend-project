 
import { Link } from 'react-router-dom';
import { Truck, ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="mb-6">
            <Truck className="h-16 w-16 text-yellow-400 mx-auto" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          
          {/* Description */}
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses and individuals who trust us with their deliveries. 
            Fast, secure, and reliable - we've got you covered.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-colors flex items-center justify-center"
            >
              Start Shipping Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-gray-900 transition-colors"
            >
              Contact Sales
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-gray-400">
            <p>No hidden fees • Free pickup • 24/7 support</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;