import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import VietnamPlaces from '../components/VietnamPlaces';
import ReviewSection from '../components/ReviewSection';
import Services from '../components/Services';
import PackageCards from '../components/PackageCards';

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <VietnamPlaces />
      <ReviewSection />
      <Services />
      <PackageCards />
    </div>
  );
};

export default Home;