import { Dispatch } from 'react';

export interface PropertyMarkerProps {
  property: PropertyData;
  selectedZpid: string | null;
  setSelectedZpid: (zpid: string | null) => void;
}

export interface PropertyDetailsProps {
  property: PropertyData;
  handleClose?: () => void;
}

interface Address {
  addressValidity: string;
  houseNumber: string;
  street: string;
  city: string;
  county: string;
  state: string;
  zip: string;
  zipPlus4?: string;
  latitude: number;
  longitude: number;
  countyFipsCode: string;
  hash: string;
}

interface PhoneNumber {
  number: string;
  type: string;
  lastReportedDate: string;
  carrier: string;
  tested: boolean;
  reachable: boolean;
  dnc: boolean;
  score: number;
}

export interface Owner {
  fullName: string;
  emails: string[];
  phoneNumbers: PhoneNumber[];
}

export interface PropertyData {
  _id: string;
  address: Address;
  owner: Owner;
}

export interface ExportDataProps {
  properties: PropertyData[];
}

export interface StateCityListProps {
  countryCode: number;
  setNewCoordinate: Dispatch<React.SetStateAction<LatLng>>;
  handleFetchProperties: (stateCode: string | null, cities: string[]) => void;
}

export interface LatLng {
  lat?: number | null;
  lng?: number | null;
}
