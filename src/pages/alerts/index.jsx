import { useState, useEffect } from 'react';
import ThresholdAlert from '@/components/ThresholdAlert';
import { fetchStockData } from '@/services/apiService';
import { getFormattedDates } from '@/utils/dateFormatter';

const AlertSystem = () => {
  const [alertSettings, setAlertSettings] = useState(null);
  const [alertTriggered, setAlertTriggered] = useState(false);

  // dates from util for API
  const { currentDate, previousDate } = getFormattedDates();

  const handleSetAlert = (settings) => {
    setAlertSettings(settings);
    setAlertTriggered(false); // Reset the alert trigger
  };

  useEffect(() => {
    if (!alertSettings || alertTriggered) return;

    const { indexTicker, thresholdValue, isAbove } = alertSettings;

    const interval = setInterval(async () => {
      const data = await fetchStockData(indexTicker, 1, 'minute', previousDate, currentDate);
      console.log(data);

      if (data && data.results && data.results.length > 0) {
        const currentPrice = data.results[0].c;

        if (
          (isAbove && currentPrice > thresholdValue) ||
          (!isAbove && currentPrice < thresholdValue)
        ) {
          alert(`The price of ${indexTicker} is now ${currentPrice}`);
          setAlertTriggered(true);
        }
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [alertSettings, alertTriggered]);

  return (
    <div>
      <ThresholdAlert onSubmit={handleSetAlert} />
    </div>
  );
};

export default AlertSystem;
