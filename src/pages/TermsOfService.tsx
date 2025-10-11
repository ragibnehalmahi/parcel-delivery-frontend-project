import React from 'react';
import { Scale, Shield, Truck, FileText } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Scale className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600">
            Last updated: December 1, 2024
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <FileText className="h-6 w-6 mr-2 text-blue-600" />
              1. Introduction
            </h2>
            <p className="text-gray-700 mb-4">
              Welcome to ParcelDelivery. These Terms of Service govern your use of our website, 
              mobile applications, and services. By accessing or using our services, you agree to 
              be bound by these terms.
            </p>
          </section>

          {/* Services */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Truck className="h-6 w-6 mr-2 text-green-600" />
              2. Services Description
            </h2>
            <p className="text-gray-700 mb-4">
              ParcelDelivery provides parcel delivery and logistics services including but not 
              limited to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Domestic parcel delivery within Bangladesh</li>
              <li>Real-time package tracking</li>
              <li>Customer support services</li>
              <li>Delivery status notifications</li>
              <li>Multiple delivery speed options</li>
            </ul>
          </section>

          {/* User Responsibilities */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. User Responsibilities</h2>
            <div className="space-y-4">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="text-gray-700 font-semibold">Prohibited Items:</p>
                <p className="text-gray-600 mt-1">
                  Users are prohibited from shipping illegal, hazardous, or restricted items 
                  including firearms, explosives, drugs, perishable goods requiring refrigeration, 
                  and items prohibited by Bangladeshi law.
                </p>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <p className="text-gray-700 font-semibold">Accurate Information:</p>
                <p className="text-gray-600 mt-1">
                  You must provide accurate and complete information for both sender and receiver, 
                  including valid contact details and delivery addresses.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <p className="text-gray-700 font-semibold">Package Preparation:</p>
                <p className="text-gray-600 mt-1">
                  Packages must be properly sealed and labeled. Fragile items should be clearly 
                  marked and appropriately packaged to prevent damage during transit.
                </p>
              </div>
            </div>
          </section>

          {/* Payments & Fees */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Payments & Fees</h2>
            <div className="space-y-3 text-gray-700">
              <p>• Delivery fees are calculated based on package weight, dimensions, and destination</p>
              <p>• Payment must be completed before package dispatch</p>
              <p>• We accept various payment methods including cash, mobile banking, and credit/debit cards</p>
              <p>• All fees are in Bangladeshi Taka (BDT) and include applicable taxes</p>
              <p>• Refund policies are outlined in our separate Refund Policy document</p>
            </div>
          </section>

          {/* Liability */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Shield className="h-6 w-6 mr-2 text-red-600" />
              5. Liability & Insurance
            </h2>
            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <p className="text-gray-700 font-semibold">Limited Liability:</p>
                <p className="text-gray-600 mt-1">
                  ParcelDelivery's liability for lost or damaged packages is limited to the actual 
                  value of the contents or the maximum liability amount specified in our service 
                  agreement, whichever is lower.
                </p>
              </div>
              
              <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
                <p className="text-gray-700 font-semibold">Insurance Options:</p>
                <p className="text-gray-600 mt-1">
                  Additional insurance coverage is available for valuable items. Customers must 
                  declare high-value items and purchase appropriate insurance coverage.
                </p>
              </div>
            </div>
          </section>

          {/* Privacy */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Privacy & Data Protection</h2>
            <p className="text-gray-700 mb-4">
              We collect and process personal information in accordance with our Privacy Policy. 
              By using our services, you consent to the collection and use of your information 
              as described in the Privacy Policy.
            </p>
          </section>

          {/* Termination */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Termination</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to suspend or terminate your access to our services at our 
              sole discretion if you violate these terms or engage in fraudulent activities.
            </p>
          </section>

          {/* Changes to Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">8. Changes to Terms</h2>
            <p className="text-gray-700 mb-4">
              We may modify these terms at any time. Continued use of our services after changes 
              constitutes acceptance of the modified terms.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold mb-4">9. Contact Information</h2>
            <p className="text-gray-700">
              For questions about these Terms of Service, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="font-semibold">ParcelDelivery Legal Department</p>
              <p>Email: legal@parceldelivery.com</p>
              <p>Phone: +880 XXX-XXXXXXX</p>
              <p>Address: Road 12, Block C, Bashundhara R/A, Dhaka 1229, Bangladesh</p>
            </div>
          </section>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg text-center">
            <p className="text-sm text-gray-600">
              By using our services, you acknowledge that you have read, understood, and agree to 
              be bound by these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;