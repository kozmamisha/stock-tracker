import axios from 'axios';

const BASE_URL = 'https://api.polygon.io/v2/aggs';
const apiKey = 'zfyY7W9sg0Ld3VQgfOosyyrRFwAT0Cge';

const fetchStockData = async (ticker, multiplier = 1, timespan = 'day', from, to) => {
  const url = `${BASE_URL}/ticker/${ticker}/range/${multiplier}/${timespan}/${from}/${to}?apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return null;
  }
};

export { fetchStockData };


// import axios from 'axios';

// const BASE_URL = 'https://api.polygon.io/v2/aggs';
// const apiKey = 'zfyY7W9sg0Ld3VQgfOosyyrRFwAT0Cge';

// const fetchStockData = async (ticker, multiplier = 1, timespan = 'day', from, to) => {
//   const url = `${BASE_URL}/ticker/${ticker}/range/${multiplier}/${timespan}/${from}/${to}?apiKey=${apiKey}`;

//   try {
//     const response = await axios.get(url);
//     if (response.data.results.length > 0) {
//       return response.data.results[0];
//     } else {
//       throw new Error('No data found');
//     }
//   } catch (error) {
//     console.error('Error fetching stock data:', error.message);
//     throw error; // Re-throw the error for the component to handle
//   }
// };

// export { fetchStockData };
