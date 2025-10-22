'use client';

import React from 'react';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default function CourtRoom() {
  return (
    <div className={styles.container}>
      <div className={styles.comingSoon}>
        <h1 className={styles.title}>⚖️ Court Room</h1>
        <p className={styles.subtitle}>Legal Case Simulations & Debates</p>
        
        <div className={styles.content}>
          <div className={styles.icon}>🏛️</div>
          <h2>Coming Soon!</h2>
          <p>
            This feature is currently under development. Soon you'll be able to:
          </p>
          
          <ul className={styles.featureList}>
            <li>⚖️ Simulate legal cases and court proceedings</li>
            <li>📜 Review and analyze legal documents</li>
            <li>🗣️ Practice argumentation and debate skills</li>
            <li>👨‍⚖️ Take on different roles (judge, lawyer, jury)</li>
            <li>📚 Learn about legal systems and procedures</li>
            <li>🎭 Interactive case scenarios with multiple outcomes</li>
          </ul>

          <div className={styles.preview}>
            <h3>Preview Features:</h3>
            <div className={styles.previewGrid}>
              <div className={styles.previewCard}>
                <span className={styles.previewIcon}>📋</span>
                <h4>Case Studies</h4>
                <p>Real-world legal scenarios</p>
              </div>
              <div className={styles.previewCard}>
                <span className={styles.previewIcon}>🎯</span>
                <h4>Role Playing</h4>
                <p>Experience different perspectives</p>
              </div>
              <div className={styles.previewCard}>
                <span className={styles.previewIcon}>💬</span>
                <h4>Debates</h4>
                <p>Argue your case effectively</p>
              </div>
              <div className={styles.previewCard}>
                <span className={styles.previewIcon}>🏆</span>
                <h4>Verdicts</h4>
                <p>See outcomes of your decisions</p>
              </div>
            </div>
          </div>

          <div className={styles.infoBox}>
            <h3>Educational Value</h3>
            <p>
              This module will help students develop critical thinking, argumentation,
              and analytical skills through interactive legal simulations. Perfect for
              law students, debate teams, and anyone interested in the legal system.
            </p>
          </div>

          <p className={styles.note}>
            Stay tuned for this exciting feature!
          </p>
        </div>
      </div>
    </div>
  );
}

