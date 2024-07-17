// separated service for fetching data from API
import axios from 'axios';

//! TODO using env
const BASE_URL = 'https://api.polygon.io/v2/aggs';
const apiKey = 'zfyY7W9sg0Ld3VQgfOosyyrRFwAT0Cge';

// fetching data from API (in props are specifications to API which user can modify)
// timespan is responsible for timeout of updating data (hour means updating every 1 hour, 1 cause multiplier = 1)
const fetchStockData = async (ticker, multiplier = 1, timespan = 'hour', from, to) => {
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
