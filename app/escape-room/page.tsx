'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

interface Stage {
  id: number;
  title: string;
  description: string;
  type: 'code-format' | 'debug' | 'generate-numbers' | 'data-transform';
  challenge: string;
  solution: string;
  hint: string;
}

const stages: Stage[] = [
  {
    id: 1,
    title: 'Stage 1: Format Code Correctly',
    description: 'Fix the indentation and formatting of this JavaScript code',
    type: 'code-format',
    challenge: 'function hello(){console.log("Hello");return true;}',
    solution: 'function hello() {\n  console.log("Hello");\n  return true;\n}',
    hint: 'Add proper line breaks and indentation (2 spaces)'
  },
  {
    id: 2,
    title: 'Stage 2: Click Image to Debug Code',
    description: 'Debug the code below to fix the error',
    type: 'debug',
    challenge: 'const sum = (a, b) => { return a - b; }',
    solution: 'const sum = (a, b) => { return a + b; }',
    hint: 'The function should add, not subtract'
  },
  {
    id: 3,
    title: 'Stage 3: Generate Numbers',
    description: 'Write code to generate all numbers from 0 to 1000',
    type: 'generate-numbers',
    challenge: '',
    solution: 'for (let i = 0; i <= 1000; i++) {\n  console.log(i);\n}',
    hint: 'Use a for loop from 0 to 1000'
  },
  {
    id: 4,
    title: 'Stage 4: Data Transformation',
    description: 'Convert CSV data to JSON format',
    type: 'data-transform',
    challenge: 'name,age,city\nJohn,25,NYC\nJane,30,LA',
    solution: '[{"name":"John","age":"25","city":"NYC"},{"name":"Jane","age":"30","city":"LA"}]',
    hint: 'Parse CSV and create an array of objects'
  }
];

export default function EscapeRoom() {
  const [currentStage, setCurrentStage] = useState(0);
  const [userCode, setUserCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [customTime, setCustomTime] = useState('30');
  const [showHint, setShowHint] = useState(false);
  const [message, setMessage] = useState('');
  const [escaped, setEscaped] = useState(false);
  const [showChallenge, setShowChallenge] = useState(false);
  const [clickablePosition, setClickablePosition] = useState({ x: 50, y: 50 });
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isTimerRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            setMessage('⏰ Time\'s up! You didn\'t escape in time.');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerRunning, timeLeft]);

  const generateRandomPosition = () => {
    return {
      x: Math.random() * 70 + 15, // 15% to 85% from left
      y: Math.random() * 60 + 20  // 20% to 80% from top
    };
  };

  const startTimer = () => {
    const minutes = parseInt(customTime) || 30;
    setTimeLeft(minutes * 60);
    setIsTimerRunning(true);
    setMessage('🔓 Timer started! Click on the glowing object to start the first challenge!');
    setCurrentStage(0);
    setEscaped(false);
    setUserCode('');
    setShowChallenge(false);
    setClickablePosition(generateRandomPosition());
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
    setMessage('⏸️ Timer paused');
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(parseInt(customTime) * 60 || 1800);
    setCurrentStage(0);
    setUserCode('');
    setMessage('');
    setEscaped(false);
    setShowHint(false);
    setShowChallenge(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const checkSolution = () => {
    const stage = stages[currentStage];
    const userCodeTrimmed = userCode.trim().replace(/\s+/g, ' ');
    const solutionTrimmed = stage.solution.trim().replace(/\s+/g, ' ');

    // More lenient checking for code formatting
    if (stage.type === 'code-format') {
      const hasProperStructure = userCode.includes('\n') && 
                                 (userCode.includes('  ') || userCode.includes('\t'));
      if (hasProperStructure) {
        advanceStage();
        return;
      }
    }

    // Check for generate-numbers - accept various valid solutions
    if (stage.type === 'generate-numbers') {
      const hasLoop = /for\s*\(/.test(userCode) || /while\s*\(/.test(userCode);
      const has1000 = userCode.includes('1000');
      if (hasLoop && has1000) {
        advanceStage();
        return;
      }
    }
    // Check for data-transform - accept valid JSON with flexible formatting
    if (stage.type === 'data-transform') {
      try {
        const userJSON = JSON.parse(userCode.trim());
        const solutionJSON = JSON.parse(stage.solution.trim());
        
        // Normalize both to ensure consistent comparison (handles arrays and objects)
        const normalizedUser = JSON.stringify(userJSON, null, 0);
        const normalizedSolution = JSON.stringify(solutionJSON, null, 0);
        
        if (normalizedUser === normalizedSolution) {
          advanceStage();
          return;
        }
      } catch (e) {
        setMessage('❌ Not quite right. Make sure your JSON is valid!');
        return;
      }
    }

    // Exact match for other types (with some flexibility)
    if (userCodeTrimmed === solutionTrimmed || 
        userCode.trim() === stage.solution.trim()) {
      advanceStage();
    } else {
      setMessage('❌ Not quite right. Try again or use a hint!');
    }
  };

  const advanceStage = () => {
    if (currentStage < stages.length - 1) {
      setMessage('✅ Correct! Click on the next glowing object to continue...');
      setTimeout(() => {
        setCurrentStage(prev => prev + 1);
        setUserCode('');
        setShowHint(false);
        setShowChallenge(false);
        setClickablePosition(generateRandomPosition());
        setMessage('');
      }, 1500);
    } else {
      setEscaped(true);
      setIsTimerRunning(false);
      setMessage(`🎉 Congratulations! You escaped in ${formatTime(parseInt(customTime) * 60 - timeLeft)}!`);
    }
  };

  const handleObjectClick = () => {
    setShowChallenge(true);
    setMessage(`🔓 Challenge unlocked! Solve Stage ${currentStage + 1}`);
  };

  const stage = stages[currentStage];

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <h1 className={styles.title}>🚪 Escape Room Challenge</h1>
        <p className={styles.subtitle}>Code your way out before time runs out!</p>

        <div className={styles.timerSection}>
          <div className={styles.timerDisplay}>
            <span className={styles.timerLabel}>Time Remaining:</span>
            <span className={`${styles.timerValue} ${timeLeft < 60 ? styles.timerDanger : ''}`}>
              {formatTime(timeLeft)}
            </span>
          </div>

          <div className={styles.timerControls}>
            <div className={styles.timeInputGroup}>
              <label htmlFor="timer-minutes">Set Timer (minutes):</label>
              <input
                id="timer-minutes"
                type="number"
                min="1"
                max="120"
                value={customTime}
                onChange={(e) => setCustomTime(e.target.value)}
                disabled={isTimerRunning}
                className={styles.timeInput}
              />
            </div>
            <div className={styles.buttonGroup}>
              {!isTimerRunning ? (
                <button 
                  className={styles.startButton}
                  onClick={startTimer}
                  aria-label="Start timer"
                >
                  ▶️ Start
                </button>
              ) : (
                <button 
                  className={styles.pauseButton}
                  onClick={stopTimer}
                  aria-label="Pause timer"
                >
                  ⏸️ Pause
                </button>
              )}
              <button 
                className={styles.resetButton}
                onClick={resetTimer}
                aria-label="Reset timer"
              >
                🔄 Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      <div 
        className={styles.escapeRoom}
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("/escape.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {message && (
          <div className={`${styles.message} ${
            message.includes('✅') ? styles.messageSuccess :
            message.includes('❌') ? styles.messageError :
            message.includes('🎉') ? styles.messageVictory :
            styles.messageInfo
          }`}>
            {message}
          </div>
        )}

        {isTimerRunning && !escaped && (
          <>
            <div className={styles.stageProgress}>
              <span>Stage {currentStage + 1} of {stages.length}</span>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill}
                  style={{ width: `${((currentStage + 1) / stages.length) * 100}%` }}
                />
              </div>
            </div>

            {!showChallenge && (
              <div className={styles.clickableObjectContainer}>
                <div 
                  className={styles.clickableObject}
                  style={{
                    position: 'absolute',
                    left: `${clickablePosition.x}%`,
                    top: `${clickablePosition.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={handleObjectClick}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => e.key === 'Enter' && handleObjectClick()}
                  aria-label={`Click to unlock stage ${currentStage + 1}`}
                >
                  <div className={styles.glowingIcon}>🔍</div>
                  <p className={styles.clickPrompt}>Click to investigate!</p>
                </div>
              </div>
            )}

            {showChallenge && (
              <div className={styles.challengeSection}>
                <div className={styles.challenge}>
                  <h2>{stage.title}</h2>
                  <p className={styles.description}>{stage.description}</p>

                  {stage.challenge && (
                    <div className={styles.challengeCode}>
                      <h3>Challenge Code:</h3>
                      <pre><code>{stage.challenge}</code></pre>
                    </div>
                  )}

                  <div className={styles.editorSection}>
                    <h3>Your Solution:</h3>
                    <textarea
                      className={styles.codeEditor}
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      placeholder="Write your code here..."
                      rows={10}
                      spellCheck={false}
                    />
                  </div>

                  <div className={styles.actionButtons}>
                    <button 
                      className={styles.submitButton}
                      onClick={checkSolution}
                      aria-label="Submit solution"
                    >
                      ✓ Submit Solution
                    </button>
                    <button 
                      className={styles.hintButton}
                      onClick={() => setShowHint(!showHint)}
                      aria-label="Toggle hint"
                    >
                      💡 {showHint ? 'Hide' : 'Show'} Hint
                    </button>
                  </div>

                  {showHint && (
                    <div className={styles.hint}>
                      <strong>Hint:</strong> {stage.hint}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {escaped && (
          <div className={styles.victorySection}>
            <h2>🎊 You Escaped! 🎊</h2>
            <p>Congratulations! You successfully completed all challenges!</p>
            <button 
              className={styles.playAgainButton}
              onClick={resetTimer}
            >
              🔄 Play Again
            </button>
          </div>
        )}

        {!isTimerRunning && !escaped && timeLeft === 0 && (
          <div className={styles.gameOverSection}>
            <h2>⏰ Time's Up!</h2>
            <p>You didn't escape in time. Try again!</p>
            <button 
              className={styles.playAgainButton}
              onClick={resetTimer}
            >
              🔄 Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

