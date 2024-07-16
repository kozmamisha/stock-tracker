'use client';

import React from 'react';
import './header.scss';
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';
import { toast } from 'react-toastify';

const Header = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.warn('You logged out');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  return (
    <header className="header container">
      <nav>
        <Link href="/">Home</Link>
        <Link href="/something">Something</Link>
      </nav>
      <div className="header__auth">
        {user ? (
          <Link href="/" onClick={handleLogout}>
            Logout
          </Link>
        ) : (
          <>
            <Link href="/auth/login">Login</Link>
            <Link href="/auth/register">Sign up</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
