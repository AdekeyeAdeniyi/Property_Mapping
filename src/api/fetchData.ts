// Function to fetch data from the Zillow listing
// async function fetchZillowData() {
//   const apiUrl = 'https://app.scrapeak.com/v1/scrapers/zillow/listing';

import { extractStoreProperties } from '../utils/utils';

//   // Set parameters for the request
//   const parameters = new URLSearchParams({
//     api_key: import.meta.env.VITE_APP_ZILL_API_KEY,
//     url: import.meta.env.VITE_APP_ZILL_URL,
//   });

//   try {
//     const response = await fetch(`${apiUrl}?${parameters}`);

//     if (!response.ok) {
//       throw new Error(`Error: ${response.status} - ${response.statusText}`);
//     }
//     const responseContent = await response.text();

//     console.log(responseContent);
//     return responseContent;
//   } catch (error) {
//     console.error('Fetch error:', error);
//   }
// }

const fetchZillowData = async () => {
  try {
    const baseURL = window.location.origin;

    const response = await fetch(`${baseURL}/properties.txt`);

    // Check if the response is OK (status 200)
    if (!response.ok) {
      throw new Error('Failed to fetch properties.txt');
    }

    // Get the file content as text
    const textData = await response.text();

    // Parse the text as JSON (assuming the content is valid JSON)
    const jsonData =
      JSON.parse(textData)['data']['cat1']['searchResults']['mapResults'];

    // If needed, you can set the state here
    const prop = extractStoreProperties(jsonData);

    return prop;
  } catch (error) {
    console.error('Error fetching or parsing properties.txt:', error);
  }
};

export default fetchZillowData;
