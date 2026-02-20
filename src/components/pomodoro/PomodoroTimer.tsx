'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Plus, Minus, CheckCircle, SkipForward } from 'lucide-react';
import { useTimer } from '@/hooks/useTimer';
import { useSessionStore, type SessionCategory } from '@/store/sessionStore';
import { useSettingsStore } from '@/store/settingsStore';

export default function PomodoroTimer() {
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);
  const [mode, setMode] = useState<'work' | 'break' | 'longBreak'>('work');
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completionMessage, setCompletionMessage] = useState('');
  const [isAutoStarting, setIsAutoStarting] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<SessionCategory>('kerja');
  const { addSession } = useSessionStore();
  const { settings, loadSettings } = useSettingsStore();

  // Load settings from store on mount
  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  // Update durations when settings change
  useEffect(() => {
    setWorkDuration(settings.workDuration);
    setBreakDuration(settings.breakDuration);
  }, [settings]);

  // Send browser notification
  const sendNotification = (title: string, options?: NotificationOptions) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, options);
    }
  };

  // Play alarm sound
  const playAlarmSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as Record<string, unknown>).webkitAudioContext;
      const audioContext = new (AudioContextClass as typeof AudioContext)();
      const gainNode = audioContext.createGain();
      gainNode.connect(audioContext.destination);
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);

      // Create alarm with ascending tones
      const createBeep = (startTime: number, duration: number, frequency: number) => {
        const osc = audioContext.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = frequency;
        osc.connect(gainNode);
        osc.start(startTime);
        osc.stop(startTime + duration);
      };

      // Alarm pattern: ascending tones (more distinctive)
      const now = audioContext.currentTime;
      createBeep(now, 0.15, 600);
      createBeep(now + 0.2, 0.15, 800);
      createBeep(now + 0.4, 0.15, 1000);
      createBeep(now + 0.6, 0.15, 800);
      createBeep(now + 0.8, 0.15, 1000);
    } catch (error) {
      console.log('Audio not supported:', error);
    }
  };

  // Handle timer completion (must be defined before useTimer)
  const handleTimerComplete = useCallback(() => {
    const isWorkMode = mode === 'work';
    let newMode: 'work' | 'break' | 'longBreak' = 'work';
    let message = '';
    let newCycleCount = cycleCount;

    if (isWorkMode) {
      // Work session completed
      newCycleCount = cycleCount + 1;

      if (newCycleCount % 4 === 0) {
        // After 4 work sessions, take long break
        newMode = 'longBreak';
        message = '🎉 4 sesi selesai! Istirahat panjang 15 menit.';
      } else {
        // Regular short break
        newMode = 'break';
        message = '✨ Waktu fokus selesai! Istirahat sejenak.';
      }
    } else {
      // Break (short or long) completed
      newMode = 'work';
      message = '🚀 Istirahat selesai! Mari fokus lagi.';
    }

    // Save session to store
    addSession({
      date: new Date().toDateString(),
      duration: mode === 'work' ? workDuration : mode === 'break' ? breakDuration : longBreakDuration,
      mode: mode === 'work' ? 'work' : 'break',
      completed: true,
      category: mode === 'work' ? selectedCategory : undefined,
    });

    // Play alarm sound
    if (settings.soundEnabled) {
      playAlarmSound();
    }

    // Send browser notification
    if (settings.notificationsEnabled) {
      const notifTitle = isWorkMode ? 'Waktu Fokus Selesai!' : mode === 'break' ? 'Waktu Istirahat Selesai!' : 'Istirahat Panjang Selesai!';
      sendNotification(notifTitle, {
        body: message,
        icon: '🎵',
      });
    } else {
      // Show completion message even if notifications disabled
      alert(message);
    }

    // Show completion modal
    setCompletionMessage(message);
    setShowCompletionModal(true);

    // Auto close modal after 3 seconds and switch mode
    setTimeout(() => {
      setShowCompletionModal(false);
      setMode(newMode);
      setCycleCount(newCycleCount);

      // Auto-start break after work session completes IF setting is enabled
      // Don't auto-start work session (user must click start)
      if (isWorkMode && settings.autoStartBreak) {
        setIsAutoStarting(true);
      }
    }, 3000);
  }, [mode, workDuration, breakDuration, longBreakDuration, cycleCount, selectedCategory, settings, addSession]);

  // Create timer hook (after handleTimerComplete)
  const timer = useTimer({
    initialMinutes: mode === 'work' ? workDuration : mode === 'break' ? breakDuration : longBreakDuration,
    onComplete: handleTimerComplete,
    resetDependency: mode,
  });

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        timer.toggleTimer();
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        timer.resetTimer();
      } else if (e.code === 'KeyS') {
        e.preventDefault();
        // Skip current session
        timer.resetTimer();
        const newMode = mode === 'work' ? 'break' : 'work';
        setMode(newMode);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [timer, mode]);

  // Request notification permission
  useCallback(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Handle auto-start after mode changes
  useEffect(() => {
    if (isAutoStarting) {
      setTimeout(() => {
        timer.resumeTimer();
        setIsAutoStarting(false);
      }, 100);
    }
  }, [isAutoStarting, timer]);

  const handleSwitchMode = () => {
    setMode(mode === 'work' ? 'break' : 'work');
    timer.resetTimer();
  };

  return (
    <>
      {/* Completion Modal */}
      <AnimatePresence>
        {showCompletionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', damping: 15 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 max-w-md border-2 border-emerald-500 shadow-2xl"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="flex justify-center mb-6"
              >
                <CheckCircle size={64} className="text-emerald-400" />
              </motion.div>

              <h3 className="text-2xl font-bold text-center mb-4 text-emerald-400">
                Selesai!
              </h3>

              <p className="text-center text-lg mb-6 text-white">
                {completionMessage}
              </p>

              <div className="text-center text-sm text-gray-400">
                Mode berikutnya: <span className="font-semibold text-emerald-400">
                  {mode === 'work' ? (cycleCount % 4 === 3 ? '🎉 Istirahat Panjang' : '☕ Istirahat') : '🎯 Fokus'}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timer Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-5 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 text-center shadow-2xl"
      >
        <h2 className="text-lg font-semibold mb-3">
          {mode === 'work' ? '🎯 Fokus' : mode === 'break' ? '☕ Istirahat' : '🎉 Istirahat Panjang'}
        </h2>

        {/* Category Selector - Always Visible */}
        <div className="mb-4 p-3 bg-slate-700 rounded-lg">
          <label className="block text-xs font-medium mb-2 text-gray-300">Kategori Kerja</label>
          <div className="flex gap-1 flex-wrap justify-center">
            {(['kerja', 'belajar', 'project', 'meeting', 'lainnya'] as SessionCategory[]).map((cat) => (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat)}
                className={`px-1.5 md:px-2 py-1 rounded text-[10px] md:text-xs font-medium transition-all ${selectedCategory === cat
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-600 text-gray-300 hover:bg-slate-500'
                  }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="mb-3 text-xs text-gray-400">
          <p>
            {mode === 'work'
              ? `${workDuration}m (${cycleCount + 1}/4) - ${selectedCategory}`
              : mode === 'break'
                ? `${breakDuration} menit`
                : `${longBreakDuration} menit`}
          </p>
        </div>

        <motion.div
          animate={{
            scale: timer.isActive ? [1, 1.02, 1] : 1,
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-5xl font-mono font-bold mb-4 text-transparent bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 bg-clip-text"
        >
          {String(timer.minutes).padStart(2, '0')}:
          {String(timer.seconds).padStart(2, '0')}
        </motion.div>

        {/* Timer Controls */}
        <div className="flex justify-center gap-2 mb-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={timer.toggleTimer}
            className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full transition shadow-lg"
          >
            {timer.isActive ? <Pause size={18} /> : <Play size={18} />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={timer.resetTimer}
            className="p-2 bg-gray-600 hover:bg-gray-700 rounded-full transition shadow-lg"
          >
            <RotateCcw size={18} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              timer.resetTimer();
              const newMode = mode === 'work' ? 'break' : 'work';
              setMode(newMode);
            }}
            className="p-2 bg-orange-600 hover:bg-orange-700 rounded-full transition shadow-lg"
            title="Skip"
          >
            <SkipForward size={18} />
          </motion.button>
        </div>

        {/* Mode Switch */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSwitchMode}
          className="w-full py-1.5 px-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-medium mb-4 transition text-sm"
        >
          Ganti ke {mode === 'work' ? 'Istirahat' : 'Kerja'}
        </motion.button>

      </motion.div>
    </>
  );
}
