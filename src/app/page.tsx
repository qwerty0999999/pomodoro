'use client';

import PomodoroTimer from '@/components/pomodoro/PomodoroTimer';
import EisenhowerMatrix from '@/components/task/EisenhowerMatrix';
import SpotifyPlayer from '@/components/audio/SpotifyPlayer';
import StatisticsPanel from '@/components/StatisticsPanel';
import SettingsPanel from '@/components/SettingsPanel';
import ReportPanel from '@/components/ReportPanel';
import HelpPanel from '@/components/HelpPanel';
import BottomNavigation from '@/components/BottomNavigation';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Settings, BarChart3, HelpCircle } from 'lucide-react';

export default function Home() {
  const [showButtons, setShowButtons] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [activeTab, setActiveTab] = useState<'report' | 'settings' | 'help' | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Jika scroll ke bawah, sembunyikan buttons
      if (currentScrollY > lastScrollY) {
        setShowButtons(false);
      } else {
        // Jika scroll ke atas, tampilkan buttons
        setShowButtons(true);
      }

      setLastScrollY(currentScrollY);

      // Clear previous timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set timeout untuk menampilkan buttons setelah scroll berhenti
      scrollTimeoutRef.current = setTimeout(() => {
        setShowButtons(true);
      }, 800);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [lastScrollY]);
  return (
    <main className="h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-white overflow-hidden flex flex-col">
      {/* Background Glow Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 p-4 md:p-6 max-w-full mx-auto flex-1 flex flex-col overflow-hidden">
        {/* Header - Compact */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 shrink-0 flex items-start justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-6 bg-linear-to-b from-blue-400 to-emerald-400 rounded"></div>
              <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-blue-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Study-Flow
              </h1>
            </div>
            <p className="text-gray-400 text-sm md:text-base">
              Dashboard Fokus Produktivitas Cerdas untuk Mahasiswa IT
            </p>
          </div>

          {/* Action Buttons (Desktop only, mobile uses BottomNavigation) */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('report')}
              className="p-3 bg-slate-800/50 hover:bg-slate-700/80 rounded-xl border border-slate-700 transition shadow-lg text-blue-400"
              title="Laporan"
            >
              <BarChart3 className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('settings')}
              className="p-3 bg-slate-800/50 hover:bg-slate-700/80 rounded-xl border border-slate-700 transition shadow-lg text-cyan-400"
              title="Pengaturan"
            >
              <Settings className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('help')}
              className="p-3 bg-slate-800/50 hover:bg-slate-700/80 rounded-xl border border-slate-700 transition shadow-lg text-purple-400"
              title="Bantuan"
            >
              <HelpCircle className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.header>

        {/* Main Grid Layout - Full Height */}
        <div className="flex-1 overflow-y-auto lg:overflow-hidden custom-scrollbar pb-24 lg:pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 pb-4 lg:h-full">
            {/* Left Sidebar - Pomodoro & Spotify */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1 lg:overflow-y-auto scrollbar-hide"
            >
              <div className="space-y-4 pr-2">
                <PomodoroTimer />
                <SpotifyPlayer />
              </div>
            </motion.div>

            {/* Right Content - Statistics & Matrix */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3 lg:overflow-y-auto scrollbar-hide"
            >
              <div className="space-y-4 pr-2">
                {/* Statistics Panel */}
                <StatisticsPanel />

                {/* Matrix Section */}
                <div>
                  <h2 className="text-2xl font-bold mb-1">📋 Matrix Eisenhower</h2>
                  <p className="text-gray-400 text-sm mb-3">
                    Prioritaskan tugas berdasarkan tingkat kepentingan dan urgency.
                  </p>
                </div>
                <EisenhowerMatrix />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <SettingsPanel isOpen={activeTab === 'settings'} onClose={() => setActiveTab(null)} />
      <ReportPanel isOpen={activeTab === 'report'} onClose={() => setActiveTab(null)} />
      <HelpPanel isOpen={activeTab === 'help'} onClose={() => setActiveTab(null)} />

      {/* Mobile: Bottom Navigation */}
      <BottomNavigation
        showButtons={showButtons}
        activeTab={activeTab}
        onReportClick={() => setActiveTab('report')}
        onSettingsClick={() => setActiveTab('settings')}
        onHelpClick={() => setActiveTab('help')}
      />
    </main>
  );
}


