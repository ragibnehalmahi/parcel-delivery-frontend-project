<<<<<<< HEAD
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Package, Truck, CreditCard, Shield } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      icon: <Package className="h-6 w-6" />,
      title: "Shipping & Delivery",
      questions: [
        {
          question: "What areas do you deliver to?",
          answer: "We deliver to all 64 districts of Bangladesh, including major cities like Dhaka, Chittagong, Sylhet, Rajshahi, and rural areas. We also offer international shipping to selected countries."
        },
        {
          question: "How long does delivery take?",
          answer: "Delivery times vary by location: Same-day delivery within metro cities, 1-2 days for other major cities, and 2-5 days for rural areas. International shipping takes 7-15 business days depending on the destination."
        },
        {
          question: "What are your delivery hours?",
          answer: "We deliver from 9:00 AM to 8:00 PM, seven days a week. Special arrangements can be made for time-sensitive deliveries."
        },
        {
          question: "Can I change the delivery address after shipping?",
          answer: "Yes, you can change the delivery address before the package is out for delivery. Contact our customer support immediately with your tracking number."
        }
      ]
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Tracking & Support",
      questions: [
        {
          question: "How do I track my package?",
          answer: "You can track your package using the tracking number provided after shipment. Enter it on our website's tracking page or mobile app for real-time updates."
        },
        {
          question: "What does 'Out for Delivery' mean?",
          answer: "This means your package has left our distribution center and is with a delivery driver who will bring it to your specified address on the same day."
        },
        {
          question: "My tracking hasn't updated in a while, what should I do?",
          answer: "If tracking hasn't updated for more than 24 hours, please contact our customer support with your tracking number. There might be scanning delays or other issues."
        },
        {
          question: "Do you provide delivery notifications?",
          answer: "Yes, we send SMS and email notifications at key stages: when package is received, out for delivery, delivered, or if there are any delays."
        }
      ]
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Pricing & Payments",
      questions: [
        {
          question: "How are delivery charges calculated?",
          answer: "Charges are based on package weight, dimensions, delivery distance, and delivery speed. You can get an instant quote on our website or mobile app."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept cash on delivery, bKash, Nagad, Rocket, credit/debit cards, and bank transfers. Corporate clients can also set up monthly billing."
        },
        {
          question: "Are there any hidden fees?",
          answer: "No hidden fees. The price quoted is the price you pay. Any additional charges (like remote area surcharges) are clearly communicated upfront."
        },
        {
          question: "Do you offer bulk shipping discounts?",
          answer: "Yes, we offer special rates for businesses and regular shippers. Contact our business team for customized pricing based on your shipping volume."
        }
      ]
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Policies & Security",
      questions: [
        {
          question: "What items are prohibited for shipping?",
          answer: "We cannot ship illegal items, hazardous materials, firearms, explosives, perishable goods, live animals, currency, or items prohibited by Bangladeshi law."
        },
        {
          question: "What is your damaged package policy?",
          answer: "If your package arrives damaged, please refuse delivery and contact us immediately. We'll investigate and arrange for compensation according to our liability policy."
        },
        {
          question: "Do you offer package insurance?",
          answer: "Yes, we offer optional insurance for valuable items. The cost is 1% of the declared value with a minimum premium. Basic coverage is included for all shipments."
        },
        {
          question: "What is your refund policy?",
          answer: "Refunds are provided if we fail to deliver due to our error. Delivery fees are non-refundable if the recipient refuses the package or provides wrong address information."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find quick answers to common questions about our parcel delivery services
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <input
              type="text"
              placeholder="Search for questions..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Category Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                <div className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-2 rounded-lg mr-4">
                    {category.icon}
                  </div>
                  <h2 className="text-2xl font-bold">{category.title}</h2>
                </div>
              </div>

              {/* Questions */}
              <div className="divide-y divide-gray-200">
                {category.questions.map((item, itemIndex) => {
                  const globalIndex = categoryIndex * 4 + itemIndex;
                  const isOpen = openItems.includes(globalIndex);

                  return (
                    <div key={itemIndex} className="border-b border-gray-200 last:border-b-0">
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-gray-900 text-lg pr-4">
                          {item.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-700 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-12 bg-blue-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-700 mb-6">
            Can't find the answer you're looking for? Please chat with our friendly team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Contact Support
            </button>
            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Live Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

=======
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Package, Truck, CreditCard, Shield } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      icon: <Package className="h-6 w-6" />,
      title: "Shipping & Delivery",
      questions: [
        {
          question: "What areas do you deliver to?",
          answer: "We deliver to all 64 districts of Bangladesh, including major cities like Dhaka, Chittagong, Sylhet, Rajshahi, and rural areas. We also offer international shipping to selected countries."
        },
        {
          question: "How long does delivery take?",
          answer: "Delivery times vary by location: Same-day delivery within metro cities, 1-2 days for other major cities, and 2-5 days for rural areas. International shipping takes 7-15 business days depending on the destination."
        },
        {
          question: "What are your delivery hours?",
          answer: "We deliver from 9:00 AM to 8:00 PM, seven days a week. Special arrangements can be made for time-sensitive deliveries."
        },
        {
          question: "Can I change the delivery address after shipping?",
          answer: "Yes, you can change the delivery address before the package is out for delivery. Contact our customer support immediately with your tracking number."
        }
      ]
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Tracking & Support",
      questions: [
        {
          question: "How do I track my package?",
          answer: "You can track your package using the tracking number provided after shipment. Enter it on our website's tracking page or mobile app for real-time updates."
        },
        {
          question: "What does 'Out for Delivery' mean?",
          answer: "This means your package has left our distribution center and is with a delivery driver who will bring it to your specified address on the same day."
        },
        {
          question: "My tracking hasn't updated in a while, what should I do?",
          answer: "If tracking hasn't updated for more than 24 hours, please contact our customer support with your tracking number. There might be scanning delays or other issues."
        },
        {
          question: "Do you provide delivery notifications?",
          answer: "Yes, we send SMS and email notifications at key stages: when package is received, out for delivery, delivered, or if there are any delays."
        }
      ]
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Pricing & Payments",
      questions: [
        {
          question: "How are delivery charges calculated?",
          answer: "Charges are based on package weight, dimensions, delivery distance, and delivery speed. You can get an instant quote on our website or mobile app."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept cash on delivery, bKash, Nagad, Rocket, credit/debit cards, and bank transfers. Corporate clients can also set up monthly billing."
        },
        {
          question: "Are there any hidden fees?",
          answer: "No hidden fees. The price quoted is the price you pay. Any additional charges (like remote area surcharges) are clearly communicated upfront."
        },
        {
          question: "Do you offer bulk shipping discounts?",
          answer: "Yes, we offer special rates for businesses and regular shippers. Contact our business team for customized pricing based on your shipping volume."
        }
      ]
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Policies & Security",
      questions: [
        {
          question: "What items are prohibited for shipping?",
          answer: "We cannot ship illegal items, hazardous materials, firearms, explosives, perishable goods, live animals, currency, or items prohibited by Bangladeshi law."
        },
        {
          question: "What is your damaged package policy?",
          answer: "If your package arrives damaged, please refuse delivery and contact us immediately. We'll investigate and arrange for compensation according to our liability policy."
        },
        {
          question: "Do you offer package insurance?",
          answer: "Yes, we offer optional insurance for valuable items. The cost is 1% of the declared value with a minimum premium. Basic coverage is included for all shipments."
        },
        {
          question: "What is your refund policy?",
          answer: "Refunds are provided if we fail to deliver due to our error. Delivery fees are non-refundable if the recipient refuses the package or provides wrong address information."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find quick answers to common questions about our parcel delivery services
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <input
              type="text"
              placeholder="Search for questions..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Category Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                <div className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-2 rounded-lg mr-4">
                    {category.icon}
                  </div>
                  <h2 className="text-2xl font-bold">{category.title}</h2>
                </div>
              </div>

              {/* Questions */}
              <div className="divide-y divide-gray-200">
                {category.questions.map((item, itemIndex) => {
                  const globalIndex = categoryIndex * 4 + itemIndex;
                  const isOpen = openItems.includes(globalIndex);

                  return (
                    <div key={itemIndex} className="border-b border-gray-200 last:border-b-0">
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-gray-900 text-lg pr-4">
                          {item.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-700 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-12 bg-blue-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-700 mb-6">
            Can't find the answer you're looking for? Please chat with our friendly team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Contact Support
            </button>
            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Live Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

>>>>>>> 83f810d1e4f52bcfb5248d889b25b62f8f7b5a8b
export default FAQ;