'use client';

import React from 'react';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default function CodingRaces() {
  return (
    <div className={styles.container}>
      <div className={styles.comingSoon}>
        <h1 className={styles.title}>🏁 Coding Races</h1>
        <p className={styles.subtitle}>Competitive Coding Challenges</p>
        
        <div className={styles.content}>
          <div className={styles.icon}>🚧</div>
          <h2>Coming Soon!</h2>
          <p>
            This feature is currently under development. Soon you'll be able to:
          </p>
          
          <ul className={styles.featureList}>
            <li>⚡ Race against the clock to solve coding challenges</li>
            <li>🏆 Compete with other students on leaderboards</li>
            <li>📊 Track your progress and improvement over time</li>
            <li>🎯 Earn badges and achievements</li>
            <li>💻 Practice various programming languages</li>
            <li>🔥 Take on daily coding challenges</li>
          </ul>

          <div className={styles.preview}>
            <h3>Preview Features:</h3>
            <div className={styles.previewGrid}>
              <div className={styles.previewCard}>
                <span className={styles.previewIcon}>⏱️</span>
                <h4>Timed Challenges</h4>
                <p>Solve problems within time limits</p>
              </div>
              <div className={styles.previewCard}>
                <span className={styles.previewIcon}>🎮</span>
                <h4>Interactive UI</h4>
                <p>Real-time code execution</p>
              </div>
              <div className={styles.previewCard}>
                <span className={styles.previewIcon}>📈</span>
                <h4>Analytics</h4>
                <p>Track your performance</p>
              </div>
              <div className={styles.previewCard}>
                <span className={styles.previewIcon}>🌟</span>
                <h4>Achievements</h4>
                <p>Unlock rewards and badges</p>
              </div>
            </div>
          </div>

          <p className={styles.note}>
            Check back soon for updates!
          </p>
        </div>
      </div>
    </div>
  );
}

