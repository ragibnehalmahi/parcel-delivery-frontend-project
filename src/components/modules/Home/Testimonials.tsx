 
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Islam",
      role: "Small Business Owner",
      content: "ParcelDelivery has transformed how I ship products to my customers. The real-time tracking gives me and my customers peace of mind.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Rahim Ahmed",
      role: "E-commerce Seller",
      content: "Fast, reliable, and affordable. Their service has helped my business grow by ensuring timely deliveries to customers across Bangladesh.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Fatima Begum",
      role: "Regular Customer",
      content: "I've been using ParcelDelivery for over a year now. Their customer support is exceptional and deliveries are always on time.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us with their deliveries
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              {/* Quote Icon */}
              <Quote className="h-8 w-8 text-yellow-300 mb-4" />
              
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-white/90 mb-6 italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-white/70 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mt-12 text-center">
          <div>
            <div className="text-2xl font-bold text-yellow-300">10,000+</div>
            <div className="text-blue-100">Happy Customers</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-300">50,000+</div>
            <div className="text-blue-100">Deliveries</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-300">98%</div>
            <div className="text-blue-100">Satisfaction Rate</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-300">64</div>
            <div className="text-blue-100">Cities Served</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;