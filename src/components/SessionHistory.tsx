'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Zap, Coffee } from 'lucide-react';
import { useSessionStore, PomodoroSession } from '@/store/sessionStore';
import { useMemo } from 'react';

export default function SessionHistory() {
  const { sessions } = useSessionStore();
  
  const history = useMemo(() => {
    return [...sessions].reverse().slice(0, 10);
  }, [sessions]);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  const getModeLabel = (mode: string) => {
    return mode === 'work' ? '🎯 Kerja' : '☕ Istirahat';
  };

  const getModeColor = (mode: string) => {
    return mode === 'work' ? 'from-blue-500 to-cyan-500' : 'from-emerald-500 to-green-500';
  };

  if (history.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-700 text-center"
      >
        <Clock className="w-12 h-12 text-gray-500 mx-auto mb-3 opacity-50" />
        <p className="text-gray-400">Belum ada riwayat sesi. Mulai gunakan timer sekarang!</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-700"
    >
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5 text-purple-400" />
        Riwayat Sesi
      </h3>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {history.map((session: PomodoroSession, idx: number) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: idx * 0.05 }}
              className={`bg-gradient-to-r ${getModeColor(session.mode)} p-3 rounded-lg flex items-center justify-between`}
            >
              <div className="flex items-center gap-3">
                {session.mode === 'work' ? (
                  <Zap className="w-5 h-5 text-white" />
                ) : (
                  <Coffee className="w-5 h-5 text-white" />
                )}
                <div>
                  <p className="font-semibold text-white">{getModeLabel(session.mode)}</p>
                  <p className="text-xs text-white/80">{session.duration} menit</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/80">{formatDate(session.date)}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {history.length > 10 && (
        <p className="text-xs text-gray-400 text-center mt-4">
          Menampilkan 10 dari {history.length} sesi terakhir
        </p>
      )}
    </motion.div>
  );
}
