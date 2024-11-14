import { MapEvent } from '@vis.gl/react-google-maps';

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

export interface PropertyMarkerProps {
  property: PropertyData;
  selectedZpid: string | null;
  setSelectedZpid: (zpid: string | null) => void;
  map: google.maps.Map;
}
