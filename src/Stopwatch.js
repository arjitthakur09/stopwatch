import React, { useState, useRef, useEffect } from 'react';

const Stopwatch = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <div style={styles.container}>
      <h1>Stopwatch</h1>
      <div style={styles.timeDisplay}>Time: {formatTime(seconds)}</div>

      <div style={styles.buttonSection}>
        <button onClick={() => setIsRunning(!isRunning)} style={styles.button}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button onClick={handleReset} style={styles.button}>Reset</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial',
    textAlign: 'center',
    marginTop: '100px',
  },
  timeDisplay: {
    fontSize: '40px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  buttonSection: {
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    margin: '0 10px',
    cursor: 'pointer',
  }
};

export default Stopwatch;
