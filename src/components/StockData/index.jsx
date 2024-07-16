import { useEffect, useState } from 'react';
import { fetchStockData } from '@/services/apiService';
import './stockData.scss';

const StockData = ({ ticker, multiplier, timespan, from, to }) => {
  const [stockData, setStockData] = useState(null);

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

  if (stockData === null) {
    return <div className='ticker container'>Loading...</div>;
  }

  return (
    <div className="ticker container">
      <h3>{ticker}</h3>
      <h2>{stockData.vw}</h2>
    </div>
  );
};

export default StockData;
