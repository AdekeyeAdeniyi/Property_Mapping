// Interface for latitude and longitude
interface LatLong {
  latitude: number;
  longitude: number;
}

// Interface for homeInfo inside hdpData
interface HomeInfo {
  price: number;
  dateSold: number;
}

// Interface for hdpData
interface HdpData {
  homeInfo: HomeInfo;
}

// Main interface for the property data
export interface PropertyData {
  zpid: string;
  imgSrc: string;
  countryCurrency: string;
  address: string;
  latLong: LatLong;
  hdpData: HdpData;
}

// export type Property = {
//   zpid: string;
//   image: string;
//   latLong: {
//     latitude: number;
//     longitude: number;
//   };
//   address: string;
//   price: string;
// };

// export interface PropertyData {
//   property_id: string;
//   status: string;
//   list_date: string;
//   last_sold_date: string;
//   last_sold_price: number;
//   location: {
//     address: {
//       line: string;
//       unit: string;
//       street_number: string;
//       street_name: string;
//       street_suffix: string;
//       city: string;
//       postal_code: string;
//       state_code: string;
//       state: string;
//       country: string;
//     };
//   };
// }
// [];
