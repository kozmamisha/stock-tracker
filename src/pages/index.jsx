import Link from 'next/link';

import StockIndices from '@/components/StockIndices';
import useAuth from '@/hooks/useAuth';

import '../app/page.scss';

export default function Home() {
  const { user } = useAuth();
  return (
    <div className="">
      {/* StockData will be shown on any path */}
      {!user ? (
        <div className="main__unauthorized container">
          <div className="main__unauthorized-text">
            <h1>Stock Tracker</h1>
            <p>The best service for tracking the values of stock indices</p>
            <h2>To get started please log in or create an account</h2>
          </div>
          <div className="main__unauthorized-buttons">
            <Link href="/auth/login">Log In</Link>
            <Link href="/auth/login">Sign Up</Link>
          </div>
        </div>
      ) : (
        <StockIndices />
      )}
    </div>
  );
}
