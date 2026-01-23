'use client';

import PomodoroTimer from '@/components/pomodoro/PomodoroTimer';
import EisenhowerMatrix from '@/components/task/EisenhowerMatrix';
import SpotifyPlayer from '@/components/audio/AmbientSoundMixer';
import StatisticsPanel from '@/components/StatisticsPanel';
import SettingsPanel from '@/components/SettingsPanel';
import ReportPanel from '@/components/ReportPanel';
import HelpPanel from '@/components/HelpPanel';
import BottomNavigation from '@/components/BottomNavigation';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [showButtons, setShowButtons] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);
  const [activeTab, setActiveTab] = useState<'report' | 'settings' | 'help' | null>(null);
  
  const reportRef = useRef<{ setIsOpen: (open: boolean) => void }>(null);
  const settingsRef = useRef<{ setIsOpen: (open: boolean) => void }>(null);
  const helpRef = useRef<{ setIsOpen: (open: boolean) => void }>(null);

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
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Set timeout untuk menampilkan buttons setelah scroll berhenti
      const timeout = setTimeout(() => {
        setShowButtons(true);
      }, 800);

      setScrollTimeout(timeout);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [lastScrollY, scrollTimeout]);
  return (
    <main className="h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white overflow-hidden flex flex-col">
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
          className="mb-4 flex-shrink-0"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-6 bg-gradient-to-b from-blue-400 to-emerald-400 rounded"></div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Study-Flow
            </h1>
          </div>
          <p className="text-gray-400 text-sm md:text-base">
            Dashboard Fokus Produktivitas Cerdas untuk Mahasiswa IT
          </p>
        </motion.header>

        {/* Main Grid Layout - Full Height */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 flex-1 overflow-hidden">
          {/* Left Sidebar - Pomodoro & Spotify */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 overflow-y-auto scrollbar-hide"
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
            className="lg:col-span-3 overflow-y-auto scrollbar-hide"
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

      {/* Desktop: Settings Panel - Always visible */}
      <div className="hidden md:block">
        <SettingsPanel />
      </div>

      {/* Desktop: Report Panel - Always visible */}
      <div className="hidden md:block">
        <ReportPanel />
      </div>

      {/* Desktop: Help Panel - Always visible */}
      <div className="hidden md:block">
        <HelpPanel />
      </div>

      {/* Mobile: All panels */}
      <div className="md:hidden">
        {activeTab === 'settings' && <SettingsPanel />}
        {activeTab === 'report' && <ReportPanel />}
        {activeTab === 'help' && <HelpPanel />}
      </div>

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
