'use client';

import React from 'react';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

const STUDENT_NAME = 'Your Name'; // Replace with your actual name
const STUDENT_NUMBER = '12345678'; // Replace with your actual student number

export default function About() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About This Project</h1>

      <div className={styles.infoSection}>
        <div className={styles.infoCard}>
          <h2>Student Information</h2>
          <p><strong>Name:</strong> {STUDENT_NAME}</p>
          <p><strong>Student Number:</strong> {STUDENT_NUMBER}</p>
          <p><strong>Course:</strong> Web Development</p>
          <p><strong>Assignment:</strong> LTU HTML5 Generator for MOODLE LMS</p>
        </div>

        <div className={styles.infoCard}>
          <h2>Project Overview</h2>
          <p>
            This web application is designed to generate HTML5 code with inline CSS and JavaScript
            that can be deployed on MOODLE LMS. The generated code is self-contained and ready to use.
          </p>
          <p>
            The application supports various HTML5 features including tabs, accordions, modals,
            and interactive coding challenges.
          </p>
        </div>
      </div>

      <div className={styles.videoSection}>
        <h2>How to Use This Website</h2>
        <div className={styles.videoPlaceholder}>
          <p>📹 Video Tutorial</p>
          <p className={styles.videoText}>
            Video demonstration would be embedded here showing how to use the website.
          </p>
          <div className={styles.instructions}>
            <h3>Quick Instructions:</h3>
            <ol>
              <li>Navigate to the desired generator page from the menu</li>
              <li>Configure your options (colors, content, etc.)</li>
              <li>Click "Generate Code" to create the HTML5 output</li>
              <li>Copy the generated code using the "Copy" button</li>
              <li>Paste the code into a .html file or directly into MOODLE</li>
              <li>The code will work standalone in any web browser</li>
            </ol>
          </div>
        </div>
      </div>

      <div className={styles.featuresSection}>
        <h2>Features</h2>
        <ul className={styles.featureList}>
          <li>✅ Dark/Light theme toggle</li>
          <li>✅ Responsive hamburger menu</li>
          <li>✅ Cookie-based navigation memory</li>
          <li>✅ Accessibility compliant (WCAG standards)</li>
          <li>✅ HTML5 code generation with inline CSS</li>
          <li>✅ Interactive tabs generator</li>
          <li>✅ Escape Room coding challenges</li>
          <li>✅ Copy-to-clipboard functionality</li>
          <li>✅ Mobile-responsive design</li>
        </ul>
      </div>

      <div className={styles.techSection}>
        <h2>Technologies Used</h2>
        <div className={styles.techGrid}>
          <div className={styles.techCard}>
            <h3>Next.js 15</h3>
            <p>React framework with App Router</p>
          </div>
          <div className={styles.techCard}>
            <h3>TypeScript</h3>
            <p>Type-safe JavaScript</p>
          </div>
          <div className={styles.techCard}>
            <h3>CSS Modules</h3>
            <p>Scoped styling solution</p>
          </div>
          <div className={styles.techCard}>
            <h3>React Context</h3>
            <p>State management for themes</p>
          </div>
        </div>
      </div>
    </div>
  );
}

