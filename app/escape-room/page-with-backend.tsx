'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';
import { stageApi, sessionApi, attemptApi, leaderboardApi, userApi } from '@/lib/api';
import type { Stage, LeaderboardEntry } from '@/types/escape-room';

export const dynamic = 'force-dynamic';

export default function EscapeRoom() {
  // State management
  const [stages, setStages] = useState<Stage[]>([]);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [userCode, setUserCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [customTime, setCustomTime] = useState('30');
  const [showHint, setShowHint] = useState(false);
  const [message, setMessage] = useState('');
  const [escaped, setEscaped] = useState(false);
  const [showChallenge, setShowChallenge] = useState(false);
  const [clickablePosition, setClickablePosition] = useState({ x: 50, y: 50 });
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hintsUsedCount, setHintsUsedCount] = useState(0);
  
  // Backend state
  const [userId, setUserId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [showUsernamePrompt, setShowUsernamePrompt] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  // Load stages and leaderboard on mount
  useEffect(() => {
    loadStages();
    loadLeaderboard();
  }, []);

  const loadStages = async () => {
    setLoading(true);
    const response = await stageApi.getAll();
    if (response.success && response.data) {
      setStages(response.data);
    } else {
      setMessage('❌ Failed to load stages. Using offline mode.');
      // Fallback to hardcoded stages if API fails
      setStages([
        {
          id: 1,
          title: 'Stage 1: Format Code Correctly',
          description: 'Fix the indentation and formatting of this JavaScript code',
          type: 'code-format',
          challenge: 'function hello(){console.log("Hello");return true;}',
          solution: 'function hello() {\n  console.log("Hello");\n  return true;\n}',
          hint: 'Add proper line breaks and indentation (2 spaces)',
          order: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          title: 'Stage 2: Click Image to Debug Code',
          description: 'Debug the code below to fix the error',
          type: 'debug',
          challenge: 'const sum = (a, b) => { return a - b; }',
          solution: 'const sum = (a, b) => { return a + b; }',
          hint: 'The function should add, not subtract',
          order: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          title: 'Stage 3: Generate Numbers',
          description: 'Write code to generate all numbers from 0 to 1000',
          type: 'generate-numbers',
          challenge: '',
          solution: 'for (let i = 0; i <= 1000; i++) {\n  console.log(i);\n}',
          hint: 'Use a for loop from 0 to 1000',
          order: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          title: 'Stage 4: Data Transformation',
          description: 'Convert CSV data to JSON format',
          type: 'data-transform',
          challenge: 'name,age,city\nJohn,25,NYC\nJane,30,LA',
          solution: '[{"name":"John","age":"25","city":"NYC"},{"name":"Jane","age":"30","city":"LA"}]',
          hint: 'Parse CSV and create an array of objects',
          order: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
    setLoading(false);
  };

  const loadLeaderboard = async () => {
    const response = await leaderboardApi.getTop(10);
    if (response.success && response.data) {
      setLeaderboard(response.data);
    }
  };

  // Timer effect
  useEffect(() => {
    if (isTimerRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            handleGameEnd(false);
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
      x: Math.random() * 70 + 15,
      y: Math.random() * 60 + 20,
    };
  };

  const createOrGetUser = async (name: string) => {
    const response = await userApi.create({
      username: name,
      email: `${name}@example.com`,
    });
    
    if (response.success && response.data) {
      setUserId(response.data.id);
      return response.data.id;
    }
    return null;
  };

  const startTimer = async () => {
    if (!username.trim()) {
      setShowUsernamePrompt(true);
      return;
    }

    const uid = userId || await createOrGetUser(username);
    if (!uid) {
      setMessage('❌ Failed to create user. Please try again.');
      return;
    }

    const minutes = parseInt(customTime) || 30;
    const timerDuration = minutes * 60;
    
    // Create game session
    const sessionResponse = await sessionApi.create({
      userId: uid,
      timerDuration,
    });

    if (sessionResponse.success && sessionResponse.data) {
      setSessionId(sessionResponse.data.id);
      setTimeLeft(timerDuration);
      setIsTimerRunning(true);
      setMessage('🔓 Timer started! Click on the glowing object to start the first challenge!');
      setCurrentStageIndex(0);
      setEscaped(false);
      setUserCode('');
      setShowChallenge(false);
      setClickablePosition(generateRandomPosition());
      setHintsUsedCount(0);
      startTimeRef.current = Date.now();
      setShowUsernamePrompt(false);
    } else {
      setMessage('❌ Failed to start session. Please try again.');
    }
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
    setMessage('⏸️ Timer paused');
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(parseInt(customTime) * 60 || 1800);
    setCurrentStageIndex(0);
    setUserCode('');
    setMessage('');
    setEscaped(false);
    setShowHint(false);
    setShowChallenge(false);
    setSessionId(null);
    setHintsUsedCount(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const recordAttempt = async (successful: boolean) => {
    if (!sessionId) return;

    const stage = stages[currentStageIndex];
    await attemptApi.create({
      sessionId,
      stageId: stage.id,
      userCode,
      successful,
      hintsUsed: hintsUsedCount,
    });
  };

  const checkSolution = async () => {
    const stage = stages[currentStageIndex];
    const userCodeTrimmed = userCode.trim().replace(/\s+/g, ' ');
    const solutionTrimmed = stage.solution.trim().replace(/\s+/g, ' ');

    let isCorrect = false;

    // More lenient checking for code formatting
    if (stage.type === 'code-format') {
      const hasProperStructure = userCode.includes('\n') && 
                                 (userCode.includes('  ') || userCode.includes('\t'));
      if (hasProperStructure) {
        isCorrect = true;
      }
    }

    // Check for generate-numbers
    if (stage.type === 'generate-numbers') {
      const hasLoop = /for\s*\(/.test(userCode) || /while\s*\(/.test(userCode);
      const has1000 = userCode.includes('1000');
      if (hasLoop && has1000) {
        isCorrect = true;
      }
    }

    // Check for data-transform
    if (stage.type === 'data-transform') {
      try {
        const userJSON = JSON.parse(userCode.trim());
        const solutionJSON = JSON.parse(stage.solution.trim());
        
        const normalizedUser = JSON.stringify(userJSON, null, 0);
        const normalizedSolution = JSON.stringify(solutionJSON, null, 0);
        
        if (normalizedUser === normalizedSolution) {
          isCorrect = true;
        }
      } catch (e) {
        setMessage('❌ Not quite right. Make sure your JSON is valid!');
        await recordAttempt(false);
        return;
      }
    }

    // Exact match for other types
    if (!isCorrect && (userCodeTrimmed === solutionTrimmed || 
        userCode.trim() === stage.solution.trim())) {
      isCorrect = true;
    }

    if (isCorrect) {
      await recordAttempt(true);
      advanceStage();
    } else {
      await recordAttempt(false);
      setMessage('❌ Not quite right. Try again or use a hint!');
    }
  };

  const advanceStage = () => {
    if (currentStageIndex < stages.length - 1) {
      setMessage('✅ Correct! Click on the next glowing object to continue...');
      setTimeout(() => {
        setCurrentStageIndex(prev => prev + 1);
        setUserCode('');
        setShowHint(false);
        setShowChallenge(false);
        setClickablePosition(generateRandomPosition());
        setMessage('');
        setHintsUsedCount(0);
      }, 1500);
    } else {
      handleGameEnd(true);
    }
  };

  const handleGameEnd = async (completed: boolean) => {
    setEscaped(completed);
    setIsTimerRunning(false);

    if (completed && sessionId && userId) {
      const totalTime = parseInt(customTime) * 60 - timeLeft;
      
      // Update session
      await sessionApi.update(sessionId, {
        endTime: new Date(),
        completed: true,
        totalTime,
      });

      // Add to leaderboard
      await leaderboardApi.addEntry(userId, totalTime);
      
      setMessage(`🎉 Congratulations! You escaped in ${formatTime(totalTime)}!`);
      
      // Reload leaderboard
      loadLeaderboard();
    } else {
      setMessage('⏰ Time\'s up! You didn\'t escape in time.');
    }
  };

  const handleObjectClick = () => {
    setShowChallenge(true);
    setMessage(`🔓 Challenge unlocked! Solve Stage ${currentStageIndex + 1}`);
  };

  const toggleHint = () => {
    if (!showHint) {
      setHintsUsedCount(prev => prev + 1);
    }
    setShowHint(!showHint);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.headerSection}>
          <h1 className={styles.title}>🚪 Escape Room Challenge</h1>
          <p className={styles.subtitle}>Loading...</p>
        </div>
      </div>
    );
  }

  const stage = stages[currentStageIndex];

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <h1 className={styles.title}>🚪 Escape Room Challenge</h1>
        <p className={styles.subtitle}>Code your way out before time runs out!</p>

        {showUsernamePrompt && !userId && (
          <div className={styles.usernamePrompt}>
            <label htmlFor="username">Enter your name:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your name"
              className={styles.usernameInput}
            />
            <button onClick={startTimer} className={styles.startButton}>
              Start Game
            </button>
          </div>
        )}

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
            {!userId && (
              <div className={styles.timeInputGroup}>
                <label htmlFor="username-input">Your Name:</label>
                <input
                  id="username-input"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your name"
                  disabled={isTimerRunning}
                  className={styles.timeInput}
                />
              </div>
            )}
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
              <button 
                className={styles.leaderboardButton}
                onClick={() => setShowLeaderboard(!showLeaderboard)}
                aria-label="Toggle leaderboard"
              >
                🏆 Leaderboard
              </button>
            </div>
          </div>
        </div>

        {showLeaderboard && (
          <div className={styles.leaderboardSection}>
            <h2>🏆 Top 10 Fastest Times</h2>
            {leaderboard.length === 0 ? (
              <p>No entries yet. Be the first!</p>
            ) : (
              <table className={styles.leaderboardTable}>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Player</th>
                    <th>Time</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => (
                    <tr key={entry.id}>
                      <td>{index + 1}</td>
                      <td>{entry.user?.username || 'Unknown'}</td>
                      <td>{formatTime(entry.completionTime)}</td>
                      <td>{new Date(entry.completedAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
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

        {isTimerRunning && !escaped && stage && (
          <>
            <div className={styles.stageProgress}>
              <span>Stage {currentStageIndex + 1} of {stages.length}</span>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill}
                  style={{ width: `${((currentStageIndex + 1) / stages.length) * 100}%` }}
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
                  aria-label={`Click to unlock stage ${currentStageIndex + 1}`}
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
                      onClick={toggleHint}
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

