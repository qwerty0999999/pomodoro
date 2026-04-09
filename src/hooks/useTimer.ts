import { useState, useEffect } from 'react';

interface UseTimerOptions {
  initialMinutes?: number;
  initialSeconds?: number;
  onComplete?: () => void;
  resetDependency?: unknown;
}

export const useTimer = ({
  initialMinutes = 25,
  initialSeconds = 0,
  onComplete,
  resetDependency,
}: UseTimerOptions = {}) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const [prevResetDep, setPrevResetDep] = useState(resetDependency);

  // Sync state when resetDependency changes (Idiomatic React 19 way)
  if (resetDependency !== prevResetDep) {
    setPrevResetDep(resetDependency);
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
    setIsActive(false);
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setIsActive(false);
          onComplete?.();
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds, minutes, onComplete]);

  const toggleTimer = () => setIsActive(!isActive);
  const pauseTimer = () => setIsActive(false);
  const resumeTimer = () => setIsActive(true);
  const resetTimer = () => {
    setIsActive(false);
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
  };

  return {
    minutes,
    seconds,
    isActive,
    toggleTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    setMinutes,
    setSeconds,
  };
};
