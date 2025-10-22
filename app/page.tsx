'use client';

import React, { useState } from 'react';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default function Home() {
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);

  const generateBasicHTML = () => {
    const code = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated HTML</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background-color: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            border-bottom: 3px solid #0070f3;
            padding-bottom: 10px;
        }
        p {
            color: #666;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Generated HTML</h1>
        <p>This is a basic HTML5 page with inline CSS styling.</p>
        <p>You can copy this code and paste it into a .html file to view it in a browser.</p>
    </div>
    
    <script>
        console.log('HTML5 page loaded successfully!');
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM fully loaded');
        });
    </script>
</body>
</html>`;
    setGeneratedCode(code);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>LTU HTML5 Code Generator</h1>
      <p className={styles.description}>
        Generate HTML5 code with inline CSS and JavaScript for MOODLE LMS deployment.
      </p>

      <div className={styles.section}>
        <h2>Quick Start</h2>
        <p>Click the button below to generate a basic HTML5 template:</p>
        <button 
          className={styles.button}
          onClick={generateBasicHTML}
          aria-label="Generate HTML code"
        >
          Generate Basic HTML
        </button>
      </div>

      {generatedCode && (
        <div className={styles.outputSection}>
          <div className={styles.outputHeader}>
            <h3>Generated Code</h3>
            <button 
              className={styles.copyButton}
              onClick={copyToClipboard}
              aria-label="Copy code to clipboard"
            >
              {copied ? '✓ Copied!' : '📋 Copy Code'}
            </button>
          </div>
          <pre className={styles.codeBlock}>
            <code>{generatedCode}</code>
          </pre>
          <p className={styles.hint}>
            💡 Copy this code and paste it into a file named <code>index.html</code> to view it in your browser.
          </p>
        </div>
      )}

      <div className={styles.features}>
        <h2>Available Generators</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <h3>📑 Tabs Generator</h3>
            <p>Create interactive tabbed content with HTML5 and JavaScript</p>
          </div>
          <div className={styles.featureCard}>
            <h3>🚪 Escape Room</h3>
            <p>Code your way out with programming challenges</p>
          </div>
          <div className={styles.featureCard}>
            <h3>🏁 Coding Races</h3>
            <p>Coming soon - competitive coding challenges</p>
          </div>
          <div className={styles.featureCard}>
            <h3>⚖️ Court Room</h3>
            <p>Coming soon - legal case simulations</p>
          </div>
        </div>
      </div>
    </div>
  );
}
