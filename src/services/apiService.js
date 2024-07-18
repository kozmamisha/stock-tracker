// separated service for fetching data from API
import axios from 'axios';

const apiBaseUrl = 'http://localhost:4444'; // Backend URL

// fetching data from API (in props are specifications to API which user can modify)
// timespan is responsible for timeout of updating data (hour means updating every 1 hour, 1 cause multiplier = 1)
const fetchStockData = async (ticker, multiplier = 1, timespan = 'minute', from, to) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/stocks/${ticker}/${multiplier}/${timespan}/${from}/${to}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return null;
  }
};

// auth from backend
const registerUser = async (email, password) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/auth/register`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Failed to register:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to register');
  }
};

export { fetchStockData, registerUser };
