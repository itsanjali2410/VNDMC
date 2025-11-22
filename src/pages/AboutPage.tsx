import React from "react";

const heroContent = {
  backgroundImage:
    "https://images.unsplash.com/photo-1528126279640-27d3c20179f0?auto=format&fit=crop&w=1920&q=80",
  tagline: "VNDMC: With you on every trip.",
  mission:
    "Active, energetic, and professionally trained, we are committed to providing the most rewarding and fulfilling experiences.",
  welcomeLabel: "Meet Our Business Head",
  leader: {
    name: "Kunal R",
    title: "Business Head",
    image: "/Kunal Headshot image.png",
    message:
      "“Welcome to Vietnam. My team and I are here to design a journey that feels personal, effortless, and unforgettable.”",
  },
};

const aboutNarrative = [
  `VNDMC Vietnam Destination Management gratefully thanks customers and business partners for their support and cooperation. The workforce of VNDMC is very active, energetic, professionally trained, and committed to the tourism business. With the tagline "with you on every trip," we strive to evolve and improve in order to provide clients with the most rewarding and fulfilling experiences. In addition to providing packaged travel packages, we also construct individual excursions based on customer specifications, resulting in distinct and separate travels for each customer.`,
  `In addition to domestic trips (golf, exploration, leisure, MICE), VNDMC Vietnam Destination Management also offers outward vacations (Thailand, Korea, Singapore, and Hong Kong). We strive to always listen, comprehend, and act for our customers. In addition to organizing tours, we also specialize in event planning, team development, automobile rental, Visa advice services, and domestic and international aircraft brokerage.`,
  `VNDMC Vietnam Destination Management will constantly provide the best level of customer pleasure and contentment by leveraging its skills, experience, and guiding principle. VNDMC Vietnam Destination Management tries ceaselessly to be the top travel agency in Da Nang and the Central area.`,
];

interface TeamMember {
  id: string;
  englishName: string;
  vietnameseName: string;
  designation: string;
  src: string;
  alt: string;
  quote?: string;
  specialty?: string;
  regions: string[];
  contact?: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "alex",
    englishName: "Alex",
    vietnameseName: "Nguyen Duc Chi",
    designation: "Assistant Sales Manager",
    src: "/PMQ Travel_s Profile/Mr. Alex - Assistant Sales Manager/Nguyen Duc Chi - Alex.jpg",
    alt: "Mr. Alex - Assistant Sales Manager",
    quote: "Passionate about creating unforgettable travel experiences for every client.",
    specialty: "Central Vietnam Journeys",
    regions: ["leadership", "operations"],
  },
  {
    id: "kunal",
    englishName: "Kunal R",
    vietnameseName: "Kunal R",
    designation: "Business Head",
    src: "/Kunal Headshot image.png",
    alt: "Kunal R - Business Head",
    quote: "",
    specialty: "",
    regions: ["leadership"],
  },
  {
    id: "gaurav",
    englishName: "Gaurav",
    vietnameseName: "Gaurav",
    designation: "Sales head",
    src: "/gaurav.jpeg",
    alt: "Gaurav",
    quote: "",
    specialty: "",
    regions: [],
  },
  
  {
    id: "mark",
    englishName: "Mark",
    vietnameseName: "Võ Văn Mạnh",
    designation: "Sale Executive",
    src: "/PMQ Travel_s Profile/Mr. Mark - Sale Excutives/Võ Văn Mạnh.jpg",
    alt: "Mr. Mark - Sale Executive",
    quote: "Dedicated to making your journey smooth and memorable.",
    specialty: "Da Nang & Coastal Experiences",
    regions: ["operations"],
  },
  {
    id: "mo",
    englishName: "MO",
    vietnameseName: "Mr. MO",
    designation: "Senior Sale Executive",
    src: "/PMQ Travel_s Profile/Mr. MO - Senior Sale Executive/z7100956334594_a20f2a22d641352272687d667712cd34.jpg",
    alt: "Mr. MO - Senior Sale Executive",
    quote: "Expert in crafting personalized travel experiences across Vietnam.",
    specialty: "Nationwide Tailor-Made Programs",
    regions: ["leadership", "operations"],
  },
  {
    id: "anna",
    englishName: "Anna",
    vietnameseName: "Nguyễn Thị Diệu Ân",
    designation: "Sale Executive",
    src: "/PMQ Travel_s Profile/Ms. Anna - Sale Executive/Nguyễn Thị Diệu Ân.png",
    alt: "Ms. Anna - Sale Executive",
    quote: "Bringing warmth and professionalism to every customer interaction.",
    specialty: "Hoi An Culture Specialist",
    regions: ["marketing"],
  },
  {
    id: "annie",
    englishName: "Annie",
    vietnameseName: "Tô Thị Thanh Truyền",
    designation: "Sales Executive",
    src: "/PMQ Travel_s Profile/Ms. Annie - Sales Executive/Tô Thị Thanh Truyền.png",
    alt: "Ms. Annie - Sales Executive",
    quote: "Committed to turning your travel dreams into reality.",
    specialty: "Hue Heritage Trails",
    regions: ["operations"],
  },
  {
    id: "april",
    englishName: "April",
    vietnameseName: "Ms. April",
    designation: "Sales Manager",
    src: "/PMQ Travel_s Profile/Ms. April - Sales Manager/z7100791786062_f3e74722a42a634586f78f6dc2f53035.jpg",
    alt: "Ms. April - Sales Manager",
    quote: "Leading our team with passion and expertise in travel management.",
    specialty: "Sales Leadership & Strategy",
    regions: ["leadership"],
  },
  {
    id: "daisy",
    englishName: "Daisy",
    vietnameseName: "Quynh Chi",
    designation: "Sale Executive",
    src: "/PMQ Travel_s Profile/Ms. Daisy - Sale Executive/Quynh Chi.jpg",
    alt: "Ms. Daisy - Sale Executive",
    quote: "Your trusted partner in discovering Vietnam's hidden gems.",
    specialty: "Northern Highlands Adventures",
    regions: ["marketing"],
  },
  {
    id: "dung",
    englishName: "Dung",
    vietnameseName: "Ms. Dung",
    designation: "Data Entry",
    src: "/PMQ Travel_s Profile/Ms. Dung - Data Entry/z7098802670883_baa54376816cb228276aa292d88ea743.jpg",
    alt: "Ms. Dung - Data Entry",
    quote: "Ensuring every detail is perfectly organized behind the scenes.",
    specialty: "Itinerary Data & Quality Control",
    regions: ["finance"],
  },
  {
    id: "ha",
    englishName: "Ha",
    vietnameseName: "Nguyen Thi Ha",
    designation: "Accountant",
    src: "/PMQ Travel_s Profile/Ms. Ha - Accountant/Nguyen Thi Ha.png",
    alt: "Ms. Ha - Accountant",
    quote: "Keeping our finances organized so we can focus on your journey.",
    specialty: "Financial Operations",
    regions: ["finance"],
  },
  {
    id: "lina",
    englishName: "Lina",
    vietnameseName: "Thuy Linh",
    designation: "Sale Executive",
    src: "/PMQ Travel_s Profile/Ms. Lina - Sale Executive/Thuy Linh.jpg",
    alt: "Ms. Lina - Sale Executive",
    quote: "Passionate about sharing Vietnam's beauty with the world.",
    specialty: "Hoi An Culture Specialist",
    regions: ["marketing"],
  },
  {
    id: "lyly",
    englishName: "Lyly",
    vietnameseName: "Tran Thi Ly Ly",
    designation: "Sale Executive",
    src: "/PMQ Travel_s Profile/Ms. Lyly - Sale Executive/Tran Thi Ly Ly - Lyly.jpg",
    alt: "Ms. Lyly - Sale Executive",
    quote: "Creating personalized experiences that exceed expectations.",
    specialty: "Da Nang Family Holidays",
    regions: ["operations"],
  },
  {
    id: "lynn",
    englishName: "Lynn",
    vietnameseName: "Nguyễn Mai Linh",
    designation: "Senior Sale Executive",
    src: "/PMQ Travel_s Profile/Ms. Lynn - Senior Sale Executive/Nguyễn Mai Linh - Lynn.jpg",
    alt: "Ms. Lynn - Senior Sale Executive",
    quote: "Expert in luxury travel and exceptional customer service.",
    specialty: "Luxury Beach Resorts",
    regions: ["leadership"],
  },
  {
    id: "my",
    englishName: "My",
    vietnameseName: "Ms. My",
    designation: "Sales Admin",
    src: "/PMQ Travel_s Profile/Ms. My - Sales Admin/2025-10-09_Original.JPG",
    alt: "Ms. My - Sales Admin",
    quote: "Supporting our team to deliver seamless travel experiences.",
    specialty: "Client Services",
    regions: ["operations"],
  },
  {
    id: "naomi",
    englishName: "Naomi",
    vietnameseName: "Đào Thị Nhẫm",
    designation: "Sale Executive",
    src: "/PMQ Travel_s Profile/Ms. Naomi - Sale Executive/Đào Thị Nhẫm.jpg",
    alt: "Ms. Naomi - Sale Executive",
    quote: "Dedicated to making every trip special and memorable.",
    specialty: "Southern Culture & Cuisine",
    regions: ["operations"],
  },
  {
    id: "nina",
    englishName: "Nina",
    vietnameseName: "Ms. Nina",
    designation: "Sales Executive",
    src: "/PMQ Travel_s Profile/Ms. Nina - Sales Executive/IMG_1416.JPG",
    alt: "Ms. Nina - Sales Executive",
    quote: "Your go-to expert for amazing travel adventures in Vietnam.",
    specialty: "Mekong & Delta Experiences",
    regions: ["operations"],
  },
  {
    id: "pink",
    englishName: "Pink",
    vietnameseName: "Nguyễn Thị Thanh Bình",
    designation: "Sale Executive",
    src: "/PMQ Travel_s Profile/Ms. Pink - Sale Executive/Nguyễn Thị Thanh Bình.jpg",
    alt: "Ms. Pink - Sale Executive",
    quote: "Bringing enthusiasm and expertise to every travel plan.",
    specialty: "Outbound Leisure Programs",
    regions: ["marketing"],
  },
  {
    id: "sam",
    englishName: "Sam",
    vietnameseName: "Le Thi Dieu Hoang",
    designation: "Director",
    src: "/PMQ Travel_s Profile/Ms. Sam - Director/Le Thi Dieu Hoang.png",
    alt: "Ms. Sam - Director",
    quote: "Leading with vision to create extraordinary travel experiences.",
    specialty: "Strategic Partnerships & Vision",
    regions: ["leadership"],
    contact: "mailto:info@vndmc.com?subject=Hello%20Director%20Sam",
  },
  {
    id: "sarah",
    englishName: "Sarah",
    vietnameseName: "Trần Thị Duy Phước",
    designation: "Senior Sale Executive",
    src: "/PMQ Travel_s Profile/Ms. Sarah - Senior Sale Executive/Trần Thị Duy Phước - Senior Sales Executive.png",
    alt: "Ms. Sarah - Senior Sale Executive",
    quote: "Years of experience in crafting perfect travel itineraries.",
    specialty: "Central Coast MICE Specialist",
    regions: ["leadership", "operations"],
  },
  {
    id: "shu",
    englishName: "Shu",
    vietnameseName: "Lê Thị Lệ Thu",
    designation: "Executive Assistant Director",
    src: "/PMQ Travel_s Profile/Ms. Shu - Executive Assistant Director/Lê Thị Lệ Thu.png",
    alt: "Ms. Shu - Executive Assistant Director",
    quote: "Ensuring excellence in every aspect of our operations.",
    specialty: "Operations & Quality Assurance",
    regions: ["leadership", "operations"],
  },
  {
    id: "thao",
    englishName: "Thao",
    vietnameseName: "Tran Nguyen Phuong Thao",
    designation: "Marketing",
    src: "/PMQ Travel_s Profile/Ms. Thao - Marketing/Tran Nguyen Phuong Thao.png",
    alt: "Ms. Thao - Marketing",
    quote: "Sharing Vietnam's stories and beauty with travelers worldwide.",
    specialty: "Brand Storytelling & Content",
    regions: ["marketing"],
  },
  {
    id: "tung",
    englishName: "Tung",
    vietnameseName: "Nguyễn Thị Tùng",
    designation: "Accountant",
    src: "/PMQ Travel_s Profile/Ms. Tung - Accountant/Nguyễn Thị Tùng.jpg",
    alt: "Ms. Tung - Accountant",
    quote: "Managing finances with precision and care.",
    specialty: "Financial Planning",
    regions: ["finance"],
  },
];

const formatImagePath = (path: string): string => {
  return path
    .split("/")
    .map(segment => {
      if (!segment) return segment;
    return encodeURIComponent(segment);
    })
    .join("/");
};


const AboutPage: React.FC = () => {
  // Show all team members at once, no filtering
  const filteredMembers = teamMembers;

  return (
    <div className="pt-24">
      <section className="bg-gradient-to-b from-emerald-50 via-white to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-24 flex flex-col gap-8 lg:gap-10 text-center lg:text-left">
          <div>
            <p className="uppercase tracking-[0.4em] text-emerald-500 text-xs sm:text-sm mb-4">
              {heroContent.tagline}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 max-w-4xl mx-auto lg:mx-0">
              Crafting Bold Vietnamese Journeys 
            </h1>
            
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 text-gray-700 space-y-8">
          {aboutNarrative.map((paragraph, index) => (
            <p key={index} className="text-base sm:text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-500 mb-3">
              The Local Guide Grid
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet the team that connects you to Vietnam
            </h2>
           
          </div>

          <div className="mt-12 -mx-4 sm:mx-0">
            <div className="flex gap-4 overflow-x-auto px-4 pb-6 sm:grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-6 sm:overflow-visible sm:px-0">
              {filteredMembers.map(member => {
                return (
                  <div
                    key={member.id}
                    className="min-w-[220px] sm:min-w-0 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow text-center space-y-4"
                  >
                    <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <img
                        src={formatImagePath(member.src)}
                        alt={member.alt || member.englishName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{member.englishName}</h3>
                      {member.designation && (
                        <p className="text-sm text-emerald-600 font-medium mt-1">{member.designation}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default AboutPage;
