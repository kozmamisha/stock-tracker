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
