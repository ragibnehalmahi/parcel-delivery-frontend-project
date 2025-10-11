 
import { Shield, Clock, MapPin, Headphones } from 'lucide-react';

const KeyFeatures = () => {
  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure Delivery",
      description: "Your packages are insured and handled with utmost care throughout the journey",
      color: "text-green-600"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Fast Service",
      description: "Same-day and next-day delivery options available across major cities",
      color: "text-blue-600"
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Real-time Tracking",
      description: "Live tracking with instant notifications at every delivery milestone",
      color: "text-purple-600"
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support to assist you with any queries",
      color: "text-orange-600"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the difference with our premium delivery services
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 group"
            >
              {/* Icon */}
              <div className={`bg-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 ${feature.color}`}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Feature Image */}
        <div className="mt-12 max-w-4xl mx-auto">
          <img 
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Delivery Service"
            className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;