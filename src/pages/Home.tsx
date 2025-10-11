 
 
import KeyFeatures from '@/components/modules/Home/KeyFeatures';
import Testimonials from '@/components/modules/Home/Testimonials';
import CallToAction from '@/components/modules/Home/CallToAction';
import HeroSection from '@/components/modules/Home/HeroSection';
import HowItWorks from '@/components/modules/Home/HowItWorks';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection/>
      
      {/* How It Works Section */}
      <HowItWorks/>
      
      {/* Key Features Section */}
      <KeyFeatures />
      
      {/* Testimonials Section */}
      <Testimonials />
      
      {/* Call to Action Section */}
      <CallToAction />
    </div>
  );
};

export default Home;