'use client';

import { motion } from 'framer-motion';
import { Clock, CheckCircle, Zap, Flame } from 'lucide-react';
import { useTaskStore } from '@/store/taskStore';
import { useSessionStore } from '@/store/sessionStore';
import { useMemo } from 'react';

export default function StatisticsPanel() {
  const tasks = useTaskStore((state) => state.tasks);
  const { getTodayFocusTime, getTodaySessionCount, getStreak } = useSessionStore();

  const todayFocusHours = Math.round((getTodayFocusTime() / 60) * 10) / 10;
  const streak = getStreak();

  const taskStats = useMemo(() => {
    const today = new Date().toDateString();
    const todayTasks = tasks.filter((t) => new Date(t.createdAt).toDateString() === today);
    return {
      completed: todayTasks.filter((t) => t.isCompleted).length,
      total: todayTasks.length,
    };
  }, [tasks]);

  const stats = [
    {
      icon: CheckCircle,
      label: 'Task Selesai Hari Ini',
      value: `${taskStats.completed}/${taskStats.total}`,
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Zap,
      label: 'Pomodoro Hari Ini',
      value: getTodaySessionCount(),
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      icon: Clock,
      label: 'Focus Time Hari Ini',
      value: `${todayFocusHours}h`,
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Flame,
      label: 'Streak (Hari)',
      value: streak,
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4"
    >
      <h2 className="text-xl font-bold mb-3">📊 Statistik Hari Ini</h2>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-linear-to-br ${stat.color} p-3 md:p-4 rounded-xl border border-white/10 shadow-lg`}
            >
              <div className="flex items-start justify-between mb-2">
                <Icon size={24} className="text-white/80" />
              </div>

              <div className="text-2xl md:text-3xl font-bold mb-1 text-white" suppressHydrationWarning>
                {stat.value}
              </div>

              <p className="text-xs md:text-sm font-medium text-white/90">
                {stat.label}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

