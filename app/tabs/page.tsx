'use client';

import React, { useState } from 'react';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

interface Tab {
  id: string;
  title: string;
  content: string;
}

export default function TabsGenerator() {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: '1', title: 'Tab 1', content: 'Content for tab 1' },
    { id: '2', title: 'Tab 2', content: 'Content for tab 2' },
    { id: '3', title: 'Tab 3', content: 'Content for tab 3' },
  ]);
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);

  const updateTab = (id: string, field: 'title' | 'content', value: string) => {
    setTabs(tabs.map(tab => 
      tab.id === id ? { ...tab, [field]: value } : tab
    ));
  };

  const addTab = () => {
    const newId = String(tabs.length + 1);
    setTabs([...tabs, { id: newId, title: `Tab ${newId}`, content: `Content for tab ${newId}` }]);
  };

  const removeTab = (id: string) => {
    if (tabs.length > 1) {
      setTabs(tabs.filter(tab => tab.id !== id));
    }
  };

  const generateCode = () => {
    const code = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Tabs</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .tabs-container {
            max-width: 800px;
            margin: 0 auto;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .tab-buttons {
            display: flex;
            background-color: #f0f0f0;
            border-bottom: 2px solid #ddd;
            overflow-x: auto;
        }
        .tab-button {
            flex: 1;
            padding: 15px 20px;
            border: none;
            background-color: transparent;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s ease;
            border-bottom: 3px solid transparent;
            white-space: nowrap;
        }
        .tab-button:hover {
            background-color: #e0e0e0;
        }
        .tab-button.active {
            background-color: white;
            border-bottom-color: #0070f3;
            color: #0070f3;
            font-weight: bold;
        }
        .tab-content {
            display: none;
            padding: 30px;
            animation: fadeIn 0.3s ease;
        }
        .tab-content.active {
            display: block;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        h2 {
            color: #333;
            margin-top: 0;
        }
        p {
            color: #666;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <div class="tabs-container">
        <div class="tab-buttons" role="tablist">
${tabs.map((tab, index) => `            <button class="tab-button${index === 0 ? ' active' : ''}" onclick="openTab(event, 'tab${tab.id}')" role="tab" aria-selected="${index === 0}" aria-controls="tab${tab.id}">
                ${tab.title}
            </button>`).join('\n')}
        </div>
        
${tabs.map((tab, index) => `        <div id="tab${tab.id}" class="tab-content${index === 0 ? ' active' : ''}" role="tabpanel">
            <h2>${tab.title}</h2>
            <p>${tab.content}</p>
        </div>`).join('\n')}
    </div>

    <script>
        function openTab(evt, tabId) {
            // Hide all tab contents
            var tabContents = document.getElementsByClassName('tab-content');
            for (var i = 0; i < tabContents.length; i++) {
                tabContents[i].classList.remove('active');
            }
            
            // Remove active class from all buttons
            var tabButtons = document.getElementsByClassName('tab-button');
            for (var i = 0; i < tabButtons.length; i++) {
                tabButtons[i].classList.remove('active');
                tabButtons[i].setAttribute('aria-selected', 'false');
            }
            
            // Show the selected tab and mark button as active
            document.getElementById(tabId).classList.add('active');
            evt.currentTarget.classList.add('active');
            evt.currentTarget.setAttribute('aria-selected', 'true');
        }
        
        // Initialize first tab
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Tabs initialized');
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
      <h1 className={styles.title}>Tabs Generator</h1>
      <p className={styles.description}>
        Configure your tabs below and generate HTML5 code with inline CSS and JavaScript.
      </p>

      <div className={styles.configurator}>
        <div className={styles.configHeader}>
          <h2>Configure Tabs</h2>
          <button 
            className={styles.addButton}
            onClick={addTab}
            aria-label="Add new tab"
          >
            + Add Tab
          </button>
        </div>

        <div className={styles.tabsList}>
          {tabs.map((tab, index) => (
            <div key={tab.id} className={styles.tabConfig}>
              <div className={styles.tabConfigHeader}>
                <h3>Tab {index + 1}</h3>
                {tabs.length > 1 && (
                  <button
                    className={styles.removeButton}
                    onClick={() => removeTab(tab.id)}
                    aria-label={`Remove tab ${index + 1}`}
                  >
                    ✕
                  </button>
                )}
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor={`title-${tab.id}`}>Tab Title:</label>
                <input
                  id={`title-${tab.id}`}
                  type="text"
                  value={tab.title}
                  onChange={(e) => updateTab(tab.id, 'title', e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor={`content-${tab.id}`}>Tab Content:</label>
                <textarea
                  id={`content-${tab.id}`}
                  value={tab.content}
                  onChange={(e) => updateTab(tab.id, 'content', e.target.value)}
                  className={styles.textarea}
                  rows={3}
                />
              </div>
            </div>
          ))}
        </div>

        <button 
          className={styles.generateButton}
          onClick={generateCode}
          aria-label="Generate HTML code"
        >
          Generate HTML Code
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
            💡 Copy this code and paste it into a .html file to use it in MOODLE or any web browser.
          </p>
        </div>
      )}
    </div>
  );
}

