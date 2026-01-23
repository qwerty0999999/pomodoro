import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SessionCategory = 'kerja' | 'belajar' | 'project' | 'meeting' | 'lainnya';

export interface PomodoroSession {
  id: string;
  date: string;
  duration: number; // in minutes
  mode: 'work' | 'break';
  completed: boolean;
  category?: SessionCategory;
}

interface SessionStore {
  sessions: PomodoroSession[];
  addSession: (session: Omit<PomodoroSession, 'id'>) => void;
  getTodaySessions: () => PomodoroSession[];
  getTodayFocusTime: () => number;
  getTodaySessionCount: () => number;
  getTotalFocusTime: () => number;
  getThisWeekSessions: () => PomodoroSession[];
  getStreak: () => number;
  getWeeklyStats: () => { day: string; hours: number }[];
  getMonthlyStats: () => { week: number; hours: number }[];
  getSessionsByCategory: (category: SessionCategory) => PomodoroSession[];
  getCategoryStats: () => { category: SessionCategory; hours: number; sessions: number }[];
}

export const useSessionStore = create<SessionStore>()(
  persist(
    (set, get) => ({
      sessions: [],
      addSession: (session) =>
        set((state) => ({
          sessions: [
            ...state.sessions,
            {
              ...session,
              id: Math.random().toString(36).substr(2, 9),
            },
          ],
        })),
      getTodaySessions: () => {
        const today = new Date().toDateString();
        return get().sessions.filter((s) => s.date === today);
      },
      getTodayFocusTime: () => {
        const today = new Date().toDateString();
        return get()
          .sessions.filter((s) => s.date === today && s.mode === 'work' && s.completed)
          .reduce((acc, s) => acc + s.duration, 0);
      },
      getTodaySessionCount: () => {
        const today = new Date().toDateString();
        return get().sessions.filter(
          (s) => s.date === today && s.mode === 'work' && s.completed
        ).length;
      },
      getTotalFocusTime: () => {
        return get()
          .sessions.filter((s) => s.mode === 'work' && s.completed)
          .reduce((acc, s) => acc + s.duration, 0);
      },
      getThisWeekSessions: () => {
        const today = new Date();
        const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        return get().sessions.filter((s) => {
          const sessionDate = new Date(s.date);
          return sessionDate >= lastWeek && sessionDate <= today;
        });
      },
      // Get current streak (consecutive days with work sessions)
      getStreak: () => {
        const sessions = get().sessions;
        const workSessions = sessions.filter((s) => s.mode === 'work' && s.completed);
        
        if (workSessions.length === 0) return 0;

        const uniqueDates = [...new Set(workSessions.map((s) => s.date))].sort(
          (a, b) => new Date(b).getTime() - new Date(a).getTime()
        );

        let streak = 0;
        const today = new Date();
        
        for (const date of uniqueDates) {
          const sessionDate = new Date(date);
          const expectedDate = new Date(today.getTime() - streak * 24 * 60 * 60 * 1000);
          
          if (sessionDate.toDateString() === expectedDate.toDateString()) {
            streak++;
          } else {
            break;
          }
        }

        return streak;
      },
      // Get weekly stats (7 days)
      getWeeklyStats: () => {
        const stats: { day: string; hours: number }[] = [];
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = date.toDateString();
          
          const dayFocusTime = get()
            .sessions.filter((s) => s.date === dateStr && s.mode === 'work' && s.completed)
            .reduce((acc, s) => acc + s.duration, 0);
          
          stats.push({
            day: days[date.getDay()],
            hours: Math.round((dayFocusTime / 60) * 10) / 10,
          });
        }
        
        return stats;
      },
      // Get monthly stats (4 weeks)
      getMonthlyStats: () => {
        const stats: { week: number; hours: number }[] = [];
        
        for (let i = 3; i >= 0; i--) {
          let weekFocusTime = 0;
          
          for (let j = 0; j < 7; j++) {
            const date = new Date();
            date.setDate(date.getDate() - (i * 7 + j));
            const dateStr = date.toDateString();
            
            weekFocusTime += get()
              .sessions.filter((s) => s.date === dateStr && s.mode === 'work' && s.completed)
              .reduce((acc, s) => acc + s.duration, 0);
          }
          
          stats.push({
            week: 4 - i,
            hours: Math.round((weekFocusTime / 60) * 10) / 10,
          });
        }
        
        return stats;
      },
      // Get sessions by category
      getSessionsByCategory: (category: SessionCategory) => {
        return get().sessions.filter(
          (s) => s.category === category && s.mode === 'work' && s.completed
        );
      },
      // Get stats grouped by category
      getCategoryStats: () => {
        const categories: SessionCategory[] = ['kerja', 'belajar', 'project', 'meeting', 'lainnya'];
        return categories
          .map((category) => {
            const sessions = get().sessions.filter(
              (s) => s.category === category && s.mode === 'work' && s.completed
            );
            const hours = Math.round(
              (sessions.reduce((acc, s) => acc + s.duration, 0) / 60) * 10
            ) / 10;
            return { category, hours, sessions: sessions.length };
          })
          .filter((stat) => stat.sessions > 0);
      },
    }),
    {
      name: 'session-store',
      version: 1,
    }
  )
);
