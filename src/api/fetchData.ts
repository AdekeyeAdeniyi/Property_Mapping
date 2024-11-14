import { extractStoreProperties } from '../utils/utils';
import { saveToDB, getFromDB, isDataStale } from '../database/IndexedDB';

const fetchZillowData = async () => {
  const API_KEY = import.meta.env.VITE_APP_ZILL_API_KEY;
  const API_URL = import.meta.env.VITE_APP_ZILL_URL;

  // // Check IndexedDB for cached data
  const cachedRecord = await getFromDB('zillowData');

  if (cachedRecord) {
    const { value, timestamp } = cachedRecord;
    if (!isDataStale(timestamp)) {
      console.log('Using cached data from IndexedDB');
      return value;
    }
  }

  //Fetch new data if not cached or data is stale
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

    //Save fetched data to IndexedDB
    await saveToDB('zillowData', properties);

    return properties;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
};

export default fetchZillowData;
