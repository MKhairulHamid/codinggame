'use client';

import React from 'react';
import styles from './Footer.module.css';

const STUDENT_NAME = 'Your Name'; // Replace with your actual name
const STUDENT_NUMBER = '12345678'; // Replace with your actual student number

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <p className={styles.copyright}>
          &copy; {currentYear} LTU HTML Generator. All rights reserved.
        </p>
        <p className={styles.info}>
          <span className={styles.label}>Student:</span> {STUDENT_NAME}
        </p>
        <p className={styles.info}>
          <span className={styles.label}>Student Number:</span> {STUDENT_NUMBER}
        </p>
        <p className={styles.date}>
          <span className={styles.label}>Date:</span> {currentDate}
        </p>
      </div>
    </footer>
  );
}

