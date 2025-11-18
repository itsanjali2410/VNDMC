import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Calendar} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    interestedMessage: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Office",
      details: [
        "5th Floor, 26 Duong Khue, My An, Ngu Hanh Son, Da Nang, Viet Nam"
      ],
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: [
        "+84 0325765379",
        // "+0 4 0 2 1 4 5 5 4 1",
        // "24/7 Emergency: +84 555 000 111"
      ],
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: [
        "sales@vndmc.com",
        
      ],
      color: "bg-amber-100 text-amber-600"
    },
    // {
    //   icon: Clock,
    //   title: "Business Hours",
    //   details: [
    //     "Monday - Friday: 8:00 AM - 6:00 PM",
    //     "Saturday: 8:00 AM - 4:00 PM",
    //     "Sunday: Emergency Support Only"
    //   ],
    //   color: "bg-purple-100 text-purple-600"
    // }
  ];

  // const offices = [
  //   {
  //     city: "Ho Chi Minh City",
  //     address: "123 Nguyen Hue Street, District 1",
  //     phone: "+84 0325765379",
  //     email: "hcmc@-vietnam.com",
  //     image: "https://images.pexels.com/photos/1518177/pexels-photo-1518177.jpeg"
  //   },
  //   {
  //     city: "Hanoi",
  //     address: "456 Hoan Kiem Street, Old Quarter",
  //     phone: "+84 987 654 321",
  //     email: "hanoi@-vietnam.com",
  //     image: "https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg"
  //   },
  //   {
  //     city: "Da Nang",
  //     address: "789 Bach Dang Street, Hai Chau",
  //     phone: "+84 555 123 456",
  //     email: "danang@-vietnam.com",
  //     image: "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg"
  //   }
  // ];

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-indigo-900 to-indigo-700">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1518177/pexels-photo-1518177.jpeg"
            alt="Contact us"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Ready to start your Vietnamese adventure? Our travel experts are here to help you plan the perfect trip
          </p>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Call Now</h3>
              <p className="text-emerald-600 font-semibold">+84 0325765379</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-blue-600 font-semibold">Available 24/7</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-amber-600 font-semibold">Quick Response</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Book Meeting</h3>
              <p className="text-purple-600 font-semibold">Free Consultation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                    <div className={`w-12 h-12 ${info.color} rounded-lg flex items-center justify-center mb-4`}>
                      <info.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{info.title}</h3>
                    <div className="space-y-1">
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-gray-600">{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Plan Your Vietnam Adventure</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                        placeholder="Your full name*"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                        placeholder="your@email.com*"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                        placeholder="Your phone number"
                      />
                    </div>
                 
                  </div>

                 
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Tell Us About Your Dream Trip *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.interestedMessage}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                      placeholder="Tell us about your travel preferences, interests, special requirements, or any specific destinations you'd like to visit..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                  >
                    Send Inquiry
                    <Send className="ml-2 w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Office Locations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Visit us at any of our convenient locations across Vietnam
            </p>
          </div>
          
          
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">How far in advance should I book my Vietnam trip?</h3>
              <p className="text-gray-600">We recommend booking at least 2-3 months in advance, especially for peak seasons (October-April). This ensures better availability and rates for accommodations and flights.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Do you provide visa assistance?</h3>
              <p className="text-gray-600">Yes, we provide comprehensive visa assistance including document preparation, application submission, and tracking. We'll guide you through the entire process.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What's included in your tour packages?</h3>
              <p className="text-gray-600">Our packages typically include accommodations, transportation, guided tours, entrance fees, and some meals. Specific inclusions vary by package and will be clearly outlined in your itinerary.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Can you customize existing tour packages?</h3>
              <p className="text-gray-600">Absolutely! All our tours can be customized to match your preferences, budget, and schedule. We specialize in creating personalized experiences.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;