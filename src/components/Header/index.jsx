'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import useAuth from '@/hooks/useAuth';
import './header.scss';

const Header = () => {
  const { user, logout } = useAuth(); // Custom hook for checking if the user is authorized and for logout
  const [isOpen, setIsOpen] = useState(false); // State for burger menu
  const menuRef = useRef(); // Ref for burger menu
  const burgerRef = useRef(); // Ref for burger icon

  const handleLogout = async () => {
    try {
      await logout();
      toast.warn('You logged out');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        burgerRef.current &&
        !burgerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header className="header container">
      <div className="header__mobile-nav" ref={menuRef}>
        <div
          className={`burger-menu ${isOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          ref={burgerRef}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
      <nav className={`header__nav ${isOpen ? 'active' : ''}`}>
        <Link onClick={() => setIsOpen(false)} href="/">
          Home
        </Link>
        <Link onClick={() => setIsOpen(false)} href="/chart">
          Stock chart
        </Link>
        <Link onClick={() => setIsOpen(false)} href="/alerts">
          Alert system
        </Link>
      </nav>

      <div className="header__auth">
        {user ? (
          <Link
            href="/"
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}>
            Logout
          </Link>
        ) : (
          <>
            <Link onClick={() => setIsOpen(false)} href="/auth/login">
              Login
            </Link>
            <Link onClick={() => setIsOpen(false)} href="/auth/register">
              Sign up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
