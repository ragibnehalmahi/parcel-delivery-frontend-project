// pages/HomePage.tsx
import CommonLayout from "@/components/Layout/CommonLayout";  
import HeroSection from "@/components/modules/Home/HeroSection";  
import KeyFeatures from "@/components/modules/Home/KeyFeatures";  
import HowItWorks from "@/components/modules/Home/HowItWorks";  
import Testimonial from "@/components/modules/Home/Testimonial";  
import CallToAction from "@/components/modules/Home/CallToAction";  

const HomePage = () => {
  return (
    <CommonLayout>
      <div className="min-h-screen">
        <HeroSection />
        <KeyFeatures />
        <HowItWorks />
        <Testimonial />
        <CallToAction />
      </div>
    </CommonLayout>
  );
};

export default HomePage;