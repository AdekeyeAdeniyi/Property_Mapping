import { BATCHDATA_API_KEY } from '../constants';
import { saveToDB } from '../database/IndexedDB';

export async function fetchPropertyData(stateCode: string, cities: string[]) {
  const url = 'https://api.batchdata.com/api/v1/property/search';
  const body = {
    searchCriteria: {
      address: {
        city: { inList: cities },
        state: { equals: stateCode },
      },
      intel: {
        lastSoldDate: {
          minDate: new Date(new Date().setMonth(new Date().getMonth() - 2))
            .toISOString()
            .split('T')[0],
        },
        lastSoldPrice: { min: 300000 },
      },
    },
    options: {
      skipTrace: true,
      useLotSize: true,
    },
  };

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${BATCHDATA_API_KEY}`,
      'Content-Type': 'application/json',
      Accept: 'application/json, application/xml',
    },
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();

    if (data && data.results && data.results.properties) {
      const properties = data.results.properties;
      await saveToDB(stateCode, properties);
    }

    return data.results.properties;
  } catch (error) {
    console.error('Error fetching property data:', error);
    return [];
  }
}

export default fetchPropertyData;
