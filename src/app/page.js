'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './page.scss';
import useAuth from '@/hooks/useAuth';
import StockData from '@/components/StockData';

export default function Home() {
  const { user } = useAuth();

  const ticker = 'USD';
  const multiplier = 1;
  const timespan = 'day';
  const from = '2023-01-09';
  const to = '2023-01-09';

  return (
    <div className="">
      <ToastContainer position="bottom-left" />
      <StockData
        ticker={ticker}
        multiplier={multiplier}
        timespan={timespan}
        from={from}
        to={to}
      />
      <Header />
      {user ? (
        <div>logged in</div>
      ) : (
        <div className="main__unauthorized container">
          <div className="main__unauthorized-text">
            <h1>Stock Tracker</h1>
            <p>The best service for tracking the values of stock indices</p>
            <h2>To get started please log in or create an account</h2>
          </div>
          <div className="main__unauthorized-buttons">
            <Link href='/auth/login'>Log In</Link>
            <Link href='/auth/login'>Sign Up</Link>
          </div>
        </div>
      )}
    </div>
  );
}
