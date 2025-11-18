// import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <img
                src="/VN_DMC_logo_New_4.png"
                alt="Vietnam DMC Logo"
                className="h-12 mb-2"
                style={{ objectFit: "contain" }}
              />
              {/* <div className="text-sm text-gray-400 font-normal">DESTINATION MANAGEMENT COMPANY</div> */}
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
               Vietnam is your trusted destination management partner, dedicated to creating 
              authentic and unforgettable experiences throughout Vietnam. With over 15 years of expertise, 
              we specialize in personalized travel solutions that showcase the true essence of Vietnamese culture.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 p-3 rounded-lg hover:bg-emerald-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-lg hover:bg-emerald-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-lg hover:bg-emerald-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-lg hover:bg-emerald-600 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-gray-300 hover:text-emerald-400 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-emerald-400 transition-colors">Our Services</Link></li>
              <li><Link to="/destinations" className="text-gray-300 hover:text-emerald-400 transition-colors">Destinations</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-emerald-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-emerald-400 mr-3 mt-1" />
                <div className="text-gray-300">
                  <div>5th Floor, 26 Duong Khue, My An, Ngu Hanh Son, Da Nang, Viet Nam</div>
                </div>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-emerald-400 mr-3" />
                <div className="text-gray-300">
                  <div>+84 0325765379</div>
                  <div>+84 987654321</div>
                </div>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 text-emerald-400 mr-3 mt-1" />
                <div className="text-gray-300">
                  <div>sales@vndmc.com</div>
                 
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024  Vietnam DMC. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;