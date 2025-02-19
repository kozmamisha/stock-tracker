import { useEffect, useState } from 'react';
import { fetchStockData } from '@/services/apiService';
import { getFormattedDates } from '@/utils/dateFormatter';
import './stockData.scss';

// component for displaying one stock on the top
const StockData = () => {
  const [stockData, setStockData] = useState(null);

  const { currentDate, previousDate } = getFormattedDates();

  // default values for API
  const ticker = 'USD';
  const multiplier = 1;
  const timespan = 'minute';
  const from = previousDate;
  const to = currentDate;

  // fetching data from API using apiService
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStockData(ticker, multiplier, timespan, from, to);
        if (data && data.results && data.results.length > 0) {
          setStockData(data.results[0]);
        } else {
          setStockData(null);
        }
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setStockData(null);
      }
    };

    fetchData();
  }, [ticker, multiplier, timespan, from, to]);

  // provide loading if data is not loaded yet
  if (stockData === null) {
    return <div className="ticker container">Loading...</div>;
  }

  return (
    <div className="ticker container">
      <div className="ticker__price">
        <h3>{ticker}</h3>
        <h2>{stockData.vw}</h2>
      </div>

      <div className="ticker__date">
        <h3>Date</h3>
        <h2>{currentDate}</h2>
      </div>
    </div>
  );
};

export default StockData;
