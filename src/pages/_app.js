// _app.js
import 'react-toastify/dist/ReactToastify.css';
import '../app/globals.scss';

import { ToastContainer } from 'react-toastify';
import Header from '@/components/Header';
import StockData from '@/components/StockData';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ToastContainer position="bottom-left" />
      <StockData />
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
