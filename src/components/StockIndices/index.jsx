import React, { useState } from 'react';
import { fetchStockData } from '@/services/apiService';
import { getFormattedDates } from '@/utils/dateFormatter';
import './stockIndices.scss';

const StockIndices = () => {
  const [ticker, setTicker] = useState('');
  const [stockInfo, setStockInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // dates from util for API
  const { currentDate, previousDate } = getFormattedDates();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ticker.trim()) {
      setError('Ticker symbol cannot be empty.');
      return; // Prevent empty submission
    }

    setLoading(true);
    setError('');
    try {
      //fetching data from API using custom apiService
      const data = await fetchStockData(ticker, 1, 'minute', previousDate, currentDate);
      if (data && data.results && data.results.length > 0) {
        setStockInfo(data);
      } else {
        setError(`No data found for ticker symbol ${ticker}`);
        setStockInfo(null);
      }
    } catch (error) {
      setError('Error fetching data. Please try again later.');
      console.error('Error fetching stock data:', error);
      setStockInfo(null); // provide null if data doesn't get
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="indices container">
      <h1>
        <span>Available</span> stock indices
      </h1>
      <div className="indices__content">
        <form onSubmit={handleSubmit} className="indices__form">
          <h2>Parameters</h2>
          <p>Symbol:</p>
          <input
            className="form-input"
            type="text"
            placeholder="Write a name of ticker..."
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
          />
          <button className="green-button" type="submit">
            Apply
          </button>
        </form>
        <div className="indices__result">
          {/* show loading if data is loading */}
          {loading && <p>Loading...</p>}

          {/* show the text of error if so occurs */}
          {error && <p className="error">{error}</p>}

          {/* if data loaded and does not return false show it to user */}
          {!loading && stockInfo && (
            <div>
              <h3>{stockInfo.ticker}</h3>
              {stockInfo.results && stockInfo.results.length > 0 ? (
                <div>
                  {/* results[0] means the first array from API with data */}
                  <p>Open: {stockInfo.results[0].o}</p>
                  <p>Close: {stockInfo.results[0].c}</p>
                  <p>High: {stockInfo.results[0].h}</p>
                  <p>Low: {stockInfo.results[0].l}</p>
                  <p>Volume: {stockInfo.results[0].v}</p>
                  <p>Volume Weighted Price: {stockInfo.results[0].vw}</p>
                  <p>Timestamp: {new Date(stockInfo.results[0].t).toLocaleString()}</p>
                </div>
              ) : (
                <p>No detailed data available for {stockInfo.ticker}</p>
              )}
            </div>
          )}
          {/* display message to user when he firstly comes to the page and didn't search yet */}
          {!loading && !stockInfo && !error && (
            <p className="indices__start">There will be data about stock indices</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockIndices;
