import React from 'react';
import { ToastContainer } from 'react-toastify';

import Header from '@/components/Header';
import StockData from '@/components/StockData';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* component for lib react-toastify displaying */}
      <ToastContainer position="bottom-left" />

      {/* component for displaying data from API on the top of the page */}
      <StockData />
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
