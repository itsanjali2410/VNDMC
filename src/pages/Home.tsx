import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import PackageCards from '../components/PackageCards';
import VietnamPlaces from '../components/VietnamPlaces';

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <VietnamPlaces />
      <Services />
      <PackageCards />
    </div>
  );
};

export default Home;