import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { fetchStockData } from '@/services/apiService';
import { getFormattedDates } from '@/utils/dateFormatter';

import '../../styles/chart.scss';

// for lib chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StockChart = () => {
  // dates from util for API
  const { currentDate, previousDate } = getFormattedDates();

  const [chartData, setChartData] = useState(null);
  const [ticker, setTicker] = useState('');
  const [fromDate, setFromDate] = useState(previousDate);
  const [toDate, setToDate] = useState(currentDate);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('There will be graphical representation (chart)');

  // Chart options with axis labels
  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price (USD)',
        },
      },
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = await fetchStockData(ticker, 1, 'day', fromDate, toDate);
    setLoading(false);
    if (data && data.results) {
      const labels = data.results.map((result) => new Date(result.t).toLocaleDateString());
      const prices = data.results.map((result) => result.c);

      setChartData({
        labels,
        datasets: [
          {
            label: `${ticker} Stock Price`,
            data: prices,
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
          },
        ],
      });
      setError('');
    } else {
      setChartData(null);
      setError(`No data found for ticker symbol ${ticker}.`);
    }
  };

  return (
    <div className="chart container">
      <h1>
        Stock <span>Chart</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="chart__form">
          <div>
            <h2>Parameters</h2>
            <label>
              Ticker:
              <input
                className="chart__form-input"
                type="text"
                value={ticker}
                placeholder="Write a name of ticker..."
                onChange={(e) => setTicker(e.target.value.toUpperCase())}
                required
              />
            </label>
          </div>
          <div>
            <label>
              From Date:
              <input
                className="chart__form-date"
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              To Date:
              <input
                className="chart__form-date"
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                required
              />
            </label>
          </div>
        </div>

        <button type="submit">Apply</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : chartData ? (
        <Line className="chart__graphic" data={chartData} options={chartOptions} />
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
};

export default StockChart;
