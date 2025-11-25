export interface TravelDay {
  day: string;
  dateLabel?: string;
  title: string;
  details: string[];
}

export interface HotelTier {
  tier: string;
  hotels: { city: string; property: string; room: string }[];
}

export interface PolicyInfo {
  notes?: string[];
  childrenPolicy?: string[];
  validity?: string;
  deposit?: string[];
  cancellation?: string[];
  terms?: string[];
  paymentMethods?: string[];
}

export interface TravelPackage {
  id: string;
  agent?: string;
  packageName: string;
  option: string;
  travelWindow: string;
  note?: string;
  paxGroups: string[];
  pricing: { tier: string; prices: string[] }[];
  airportTransfer: string[];
  summaryItinerary?: string[];
  detailedItinerary: TravelDay[];
  includes: string[];
  excludes: string[];
  hotelPackages: HotelTier[];
  policy: PolicyInfo;
}

