import { extractStoreProperties } from '../utils/utils';

const zillowUrls = {
  florida:
    'https://www.zillow.com/fl/sold/?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22isMapVisible%22%3Atrue%2C%22mapBounds%22%3A%7B%22west%22%3A-88.47928361718749%2C%22east%22%3A-79.12991838281249%2C%22south%22%3A24.379110871342377%2C%22north%22%3A31.0171514262774%7D%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A14%2C%22regionType%22%3A2%7D%5D%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22fsba%22%3A%7B%22value%22%3Afalse%7D%2C%22fsbo%22%3A%7B%22value%22%3Afalse%7D%2C%22nc%22%3A%7B%22value%22%3Afalse%7D%2C%22cmsn%22%3A%7B%22value%22%3Afalse%7D%2C%22auc%22%3A%7B%22value%22%3Afalse%7D%2C%22fore%22%3A%7B%22value%22%3Afalse%7D%2C%22rs%22%3A%7B%22value%22%3Atrue%7D%2C%22price%22%3A%7B%22min%22%3A300000%7D%2C%22mp%22%3A%7B%22min%22%3A1501%7D%2C%22tow%22%3A%7B%22value%22%3Afalse%7D%2C%22mf%22%3A%7B%22value%22%3Afalse%7D%2C%22con%22%3A%7B%22value%22%3Afalse%7D%2C%22apa%22%3A%7B%22value%22%3Afalse%7D%2C%22manu%22%3A%7B%22value%22%3Afalse%7D%2C%22apco%22%3A%7B%22value%22%3Afalse%7D%2C%22doz%22%3A%7B%22value%22%3A%227%22%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A7%2C%22usersSearchTerm%22%3A%22FL%22%7D',

  california:
    'https://www.zillow.com/ca/sold/?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22isMapVisible%22%3Atrue%2C%22mapBounds%22%3A%7B%22north%22%3A43.1378093639727%2C%22south%22%3A31.22776116678856%2C%22east%22%3A-109.95728376562501%2C%22west%22%3A-128.656014234375%7D%2C%22mapZoom%22%3A6%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A9%2C%22regionType%22%3A2%7D%5D%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22fsba%22%3A%7B%22value%22%3Afalse%7D%2C%22fsbo%22%3A%7B%22value%22%3Afalse%7D%2C%22nc%22%3A%7B%22value%22%3Afalse%7D%2C%22cmsn%22%3A%7B%22value%22%3Afalse%7D%2C%22auc%22%3A%7B%22value%22%3Afalse%7D%2C%22fore%22%3A%7B%22value%22%3Afalse%7D%2C%22rs%22%3A%7B%22value%22%3Atrue%7D%2C%22price%22%3A%7B%22min%22%3A300000%2C%22max%22%3Anull%7D%2C%22mp%22%3A%7B%22min%22%3A1501%2C%22max%22%3Anull%7D%2C%22tow%22%3A%7B%22value%22%3Afalse%7D%2C%22mf%22%3A%7B%22value%22%3Afalse%7D%2C%22con%22%3A%7B%22value%22%3Afalse%7D%2C%22apa%22%3A%7B%22value%22%3Afalse%7D%2C%22manu%22%3A%7B%22value%22%3Afalse%7D%2C%22apco%22%3A%7B%22value%22%3Afalse%7D%2C%22doz%22%3A%7B%22value%22%3A%227%22%7D%7D%2C%22isListVisible%22%3Atrue%7D',

  texas:
    'https://www.zillow.com/tx/sold/?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22isMapVisible%22%3Atrue%2C%22mapBounds%22%3A%7B%22north%22%3A37.504311070238074%2C%22south%22%3A24.700714123823616%2C%22east%22%3A-90.727477265625%2C%22west%22%3A-109.426207734375%7D%2C%22mapZoom%22%3A6%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A54%2C%22regionType%22%3A2%7D%5D%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22fsba%22%3A%7B%22value%22%3Afalse%7D%2C%22fsbo%22%3A%7B%22value%22%3Afalse%7D%2C%22nc%22%3A%7B%22value%22%3Afalse%7D%2C%22cmsn%22%3A%7B%22value%22%3Afalse%7D%2C%22auc%22%3A%7B%22value%22%3Afalse%7D%2C%22fore%22%3A%7B%22value%22%3Afalse%7D%2C%22rs%22%3A%7B%22value%22%3Atrue%7D%2C%22price%22%3A%7B%22min%22%3A300000%2C%22max%22%3Anull%7D%2C%22mp%22%3A%7B%22min%22%3A1501%2C%22max%22%3Anull%7D%2C%22tow%22%3A%7B%22value%22%3Afalse%7D%2C%22mf%22%3A%7B%22value%22%3Afalse%7D%2C%22con%22%3A%7B%22value%22%3Afalse%7D%2C%22apa%22%3A%7B%22value%22%3Afalse%7D%2C%22manu%22%3A%7B%22value%22%3Afalse%7D%2C%22apco%22%3A%7B%22value%22%3Afalse%7D%2C%22doz%22%3A%7B%22value%22%3A%227%22%7D%7D%2C%22isListVisible%22%3Atrue%7D',
};

const determineRegion = (latitude: number, longitude: number) => {
  if (
    latitude >= 24.3963 &&
    latitude <= 31.0 &&
    longitude >= -87.6349 &&
    longitude <= -80.0314
  ) {
    return 'florida';
  }

  if (
    latitude >= 32.5288 &&
    latitude <= 42.0095 &&
    longitude >= -124.482 &&
    longitude <= -114.1315
  ) {
    return 'california';
  }

  if (
    latitude >= 25.8371 &&
    latitude <= 36.5 &&
    longitude >= -106.6456 &&
    longitude <= -93.5083
  ) {
    return 'texas';
  }

  return 'florida';
};

const fetchZillowData = async (coordinates: {
  latitude: number;
  longitude: number;
}) => {
  const API_KEY = import.meta.env.VITE_APP_ZILL_API_KEY;

  const region = determineRegion(coordinates.latitude, coordinates.longitude);
  const API_URL = zillowUrls[region];

  try {
    const apiUrl = 'https://app.scrapeak.com/v1/scrapers/zillow/listing';
    const parameters = new URLSearchParams({ api_key: API_KEY, url: API_URL });

    const response = await fetch(`${apiUrl}?${parameters}`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const textData = await response.text();
    const jsonData =
      JSON.parse(textData)['data']['cat1']['searchResults']['mapResults'];

    const properties = extractStoreProperties(jsonData);

    return properties;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
};

export default fetchZillowData;
