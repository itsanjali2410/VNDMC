import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import ReviewSection from '../components/ReviewSection';
import Services from '../components/Services';
import Destinations from '../components/Destinations';

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <ReviewSection />
      <Services />
      <Destinations />
    </div>
  );
};

export default Home;