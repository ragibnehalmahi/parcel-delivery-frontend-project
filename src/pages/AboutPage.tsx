// pages/AboutPage.tsx
import CommonLayout from "@/components/Layout/CommonLayout";  
import MissionStatement from "@/components/modules/About/MissionStatement";  
import ServiceDescription from "@/components/modules/About/ServiceDescription";  
import TeamInfo from "@/components/modules/About/TeamInfo";  

const AboutPage = () => {
  return (
    <CommonLayout>
      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              About Us
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Pioneering the future of parcel delivery through artificial intelligence 
              and innovative technology solutions.
            </p>
          </div>
        </section>

        {/* Components */}
        <MissionStatement />
        <ServiceDescription />
        <TeamInfo />
      </div>
    </CommonLayout>
  );
};

export default AboutPage;