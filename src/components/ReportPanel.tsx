'use client';

import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Calendar, Target, X, Clock, Zap, Coffee } from 'lucide-react';
import React, { useState, useMemo, useEffect } from 'react';
import { useSessionStore, PomodoroSession } from '@/store/sessionStore';
import { useSettingsStore } from '@/store/settingsStore';

interface ReportPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReportPanel({ isOpen, onClose }: ReportPanelProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeTab, setActiveTab] = useState<'goal' | 'weekly' | 'monthly' | 'history'>('goal');
  const { getWeeklyStats, getMonthlyStats, getCategoryStats, sessions } = useSessionStore();
  const { getTodayFocusTime } = useSessionStore();
  const { settings } = useSettingsStore();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const todayFocusHours = Math.round((getTodayFocusTime() / 60) * 10) / 10;
  const goalProgress = Math.min((todayFocusHours / settings.dailyGoalHours) * 100, 100);
  const weeklyStats = getWeeklyStats();
  const monthlyStats = getMonthlyStats();
  const categoryStats = getCategoryStats() as ReturnType<typeof getCategoryStats>;

  // Session history
  const history = useMemo(() => {
    return [...sessions].reverse().slice(0, 10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    <div className="relative">
      {/* Report Modal */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
        />
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={isOpen ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.1 }}
        className={`fixed lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-full lg:max-w-2xl bottom-20 left-4 right-4 w-auto max-h-[80vh] flex flex-col bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-[51] ${!isOpen && 'pointer-events-none'
          }`}
      >
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-white/10 bg-slate-800">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            Laporan
          </h3>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-1 hover:bg-slate-700 rounded-lg transition"
          >
            <X size={20} className="text-gray-400 hover:text-white" />
          </motion.button>
        </div>

        {/* Tab Navigation */}
        <div className="flex-shrink-0 flex gap-2 p-4 border-b border-slate-700 bg-slate-800/50">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('goal')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${activeTab === 'goal'
              ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
              : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
          >
            <Target size={16} />
            <span className="hidden sm:inline">Target Harian</span>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('weekly')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${activeTab === 'weekly'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
              : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
          >
            <TrendingUp size={16} />
            <span className="hidden sm:inline">Mingguan</span>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('monthly')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${activeTab === 'monthly'
              ? 'bg-violet-500/20 text-violet-400 border border-violet-500/50'
              : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
          >
            <Calendar size={16} />
            <span className="hidden sm:inline">Bulanan</span>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${activeTab === 'history'
              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50'
              : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
          >
            <Clock size={16} />
            <span className="hidden sm:inline">Riwayat</span>
          </motion.button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar min-h-0" suppressHydrationWarning>
          {/* Daily Goal Tab */}
          {activeTab === 'goal' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-yellow-400 flex items-center gap-2">
                <Target size={20} />
                Target Harian
              </h4>

              <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 p-6 rounded-xl border border-yellow-500/30">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-300 mb-1">Fokus Hari Ini</p>
                    <p className="text-3xl font-bold text-yellow-400">{todayFocusHours}h</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-300 mb-1">Target</p>
                    <p className="text-3xl font-bold text-yellow-300">{settings.dailyGoalHours}h</p>
                  </div>
                </div>

                <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${goalProgress}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                  />
                </div>

                <p className="text-sm text-gray-400 mt-4 text-center">
                  {goalProgress >= 100
                    ? '✨ Target tercapai! Bagus sekali!'
                    : `${Math.round(100 - goalProgress)}% lagi untuk mencapai target`}
                </p>
              </div>
            </motion.div>
          )}

          {/* Weekly Stats Tab */}
          {activeTab === 'weekly' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
                <TrendingUp size={20} />
                Statistik Mingguan (7 Hari Terakhir)
              </h4>

              <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 p-6 rounded-xl border border-cyan-500/30">
                <div className="flex items-end justify-between gap-2 h-32">
                  {weeklyStats.map((stat, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2 flex-1">
                      <div
                        className="w-full bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-lg transition-all hover:from-cyan-600 hover:to-cyan-500 cursor-pointer"
                        style={{ height: `${Math.max(stat.hours * 8, 10)}px` }}
                        title={`${stat.day}: ${stat.hours}h`}
                      />
                      <span className="text-xs text-gray-400 font-medium">{stat.day}</span>
                      <span className="text-xs font-bold text-cyan-400">{stat.hours}h</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-700/50 p-4 rounded-lg">
                <p className="text-sm text-gray-300">
                  <span className="font-semibold text-cyan-400">Total Minggu Ini:</span>{' '}
                  <span className="text-lg font-bold text-cyan-400">
                    {Math.round(weeklyStats.reduce((acc, s) => acc + s.hours, 0) * 10) / 10}h
                  </span>
                </p>
              </div>
            </motion.div>
          )}

          {/* Monthly Stats Tab */}
          {activeTab === 'monthly' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-violet-400 flex items-center gap-2">
                <Calendar size={20} />
                Statistik Bulanan (4 Minggu Terakhir)
              </h4>

              <div className="bg-gradient-to-br from-violet-900/30 to-purple-900/30 p-6 rounded-xl border border-violet-500/30 space-y-4">
                {monthlyStats.map((stat, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-300">Minggu {stat.week}</span>
                      <span className="text-sm font-bold text-violet-400">{stat.hours}h</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
                        style={{ width: `${Math.min((stat.hours / 20) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-700/50 p-4 rounded-lg">
                <p className="text-sm text-gray-300">
                  <span className="font-semibold text-violet-400">Total Bulan Ini:</span>{' '}
                  <span className="text-lg font-bold text-violet-400">
                    {Math.round(monthlyStats.reduce((acc, s) => acc + s.hours, 0) * 10) / 10}h
                  </span>
                </p>
              </div>
            </motion.div>
          )}

          {/* Session History Tab */}
          {activeTab === 'history' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-purple-400 flex items-center gap-2">
                <Clock size={20} />
                Riwayat Sesi
              </h4>

              {history.length === 0 ? (
                <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-700 text-center">
                  <Clock className="w-12 h-12 text-gray-500 mx-auto mb-3 opacity-50" />
                  <p className="text-gray-400">Belum ada riwayat sesi. Mulai gunakan timer sekarang!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {history.map((session: PomodoroSession, idx: number) => (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
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
                          <p className="font-semibold text-white text-sm">{getModeLabel(session.mode)}</p>
                          <p className="text-xs text-white/80">{session.duration} menit • {session.category || '-'}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-white/80">{formatDate(session.date)}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {history.length > 0 && history.length < sessions.length && (
                <p className="text-xs text-gray-400 text-center mt-4">
                  Menampilkan 10 dari {sessions.length} sesi terakhir
                </p>
              )}
            </motion.div>
          )}

          {/* Category Stats */}
          {isHydrated && categoryStats.length > 0 && (
            <div suppressHydrationWarning className="mt-6 pt-6 border-t border-slate-700">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h4 className="text-lg font-semibold text-emerald-400 mb-4">📂 Breakdown Kategori</h4>
                <div className="space-y-3">
                  {categoryStats.map((stat) => (
                    <div key={stat.category} className="bg-slate-700/50 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-300 capitalize">{stat.category}</span>
                        <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">
                          {stat.sessions} sesi
                        </span>
                      </div>
                      <div className="text-sm font-bold text-emerald-400">{stat.hours}h</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
