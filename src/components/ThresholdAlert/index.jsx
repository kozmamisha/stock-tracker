import React, { useState, useEffect } from 'react';
import './thresholdAlert.scss';
import { toast } from 'react-toastify';

const ThresholdAlert = ({ onSubmit }) => {
  const [indexTicker, setIndexTicker] = useState('');
  const [thresholdValue, setThresholdValue] = useState('');
  const [isAbove, setIsAbove] = useState(true); // Default to above threshold

  // Load data from localStorage when the component mounts
  useEffect(() => {
    const savedIndexTicker = localStorage.getItem('indexTicker');
    const savedThresholdValue = localStorage.getItem('thresholdValue');
    const savedIsAbove = localStorage.getItem('isAbove');

    if (savedIndexTicker) setIndexTicker(savedIndexTicker);
    if (savedThresholdValue) setThresholdValue(savedThresholdValue);
    if (savedIsAbove) setIsAbove(savedIsAbove === 'true');
  }, []);

  //functions for handling changes of user's inputs
  const handleIndexTickerChange = (e) => {
    setIndexTicker(e.target.value.toUpperCase());
  };

  const handleThresholdChange = (e) => {
    setThresholdValue(e.target.value);
  };

  const handleAboveBelowChange = (e) => {
    setIsAbove(e.target.value === 'above');
  };

  // submit inputs values and throws it to localstorage
  const handleSubmit = (e) => {
    e.preventDefault();
    const alertSettings = {
      indexTicker,
      thresholdValue: parseFloat(thresholdValue),
      isAbove,
    };
    localStorage.setItem('indexTicker', indexTicker);
    localStorage.setItem('thresholdValue', thresholdValue);
    localStorage.setItem('isAbove', isAbove.toString());
    onSubmit(alertSettings);
    toast.success('Alert created successfully!'); // react-toastify message
  };

  return (
    <div className="threshold-alert container">
      <h1>
        <span>Alert</span> System
      </h1>
      <form onSubmit={handleSubmit} className="threshold-alert__form">
        <label>
          Index Ticker:
          <input
            className="form-input"
            type="text"
            value={indexTicker}
            onChange={handleIndexTickerChange}
            required
          />
        </label>
        <label>
          Threshold Value:
          <input
            className="form-input"
            type="number"
            value={thresholdValue}
            onChange={handleThresholdChange}
            required
          />
        </label>
        <label>
          Notify when:
          <select value={isAbove ? 'above' : 'below'} onChange={handleAboveBelowChange}>
            <option value="above">Above</option>
            <option value="below">Below</option>
          </select>
        </label>
        <button className="green-button" type="submit">
          Set Alert
        </button>
      </form>
    </div>
  );
};

export default ThresholdAlert;
