const DEFAULT_COORDINATES = { lat: 27.994402, lng: -81.760254 };
const DEFAULT_ZOOM = 8;

const API_KEY = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;
const MAP_ID = import.meta.env.VITE_APP_GOOGLE_MAPS_ID;

const BATCHDATA_API_KEY = import.meta.env.VITE_BATCHDATA_API_KEY;

const PRICEINDICATOR = {
  low: 'red',
  medium: 'orange',
  high: 'green',
};

export {
  DEFAULT_COORDINATES,
  DEFAULT_ZOOM,
  API_KEY,
  MAP_ID,
  PRICEINDICATOR,
  BATCHDATA_API_KEY,
};
