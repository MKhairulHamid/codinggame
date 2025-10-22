'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
import styles from './Header.module.css';

const STUDENT_NUMBER = '12345678'; // Replace with your actual student number

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const savedTab = document.cookie
      .split('; ')
      .find(row => row.startsWith('lastTab='))
      ?.split('=')[1];
    
    if (savedTab && savedTab !== pathname) {
      // Cookie remembers last tab
    }
  }, [pathname]);

  useEffect(() => {
    document.cookie = `lastTab=${pathname}; path=/; max-age=31536000`;
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/tabs', label: 'Tabs Generator' },
    { href: '/escape-room', label: 'Escape Room' },
    { href: '/coding-races', label: 'Coding Races' },
    { href: '/court-room', label: 'Court Room' },
  ];

  return (
    <header className={styles.header} role="banner">
      <div className={styles.container}>
        <div className={styles.studentNumber} aria-label="Student Number">
          {STUDENT_NUMBER}
        </div>

        <nav className={styles.nav} role="navigation" aria-label="Main navigation">
          <button
            className={styles.hamburger}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="main-menu"
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>

          <ul
            id="main-menu"
            className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ''}`}
            role="menu"
          >
            {navItems.map((item) => (
              <li key={item.href} role="none">
                <Link
                  href={item.href}
                  className={pathname === item.href ? styles.active : ''}
                  onClick={closeMenu}
                  role="menuitem"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className={styles.themeToggle}
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
}

