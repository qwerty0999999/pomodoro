'use client';

import { motion } from 'framer-motion';
import { Settings, Bell, Volume2, Zap, RotateCcw, Download, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSettingsStore } from '@/store/settingsStore';
import { useSessionStore } from '@/store/sessionStore';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const { settings, loadSettings, updateSettings, resetSettings } = useSettingsStore();
  const sessions = useSessionStore((state) => state.sessions);
  const [localSettings, setLocalSettings] = useState(() => settings || {
    workDuration: 25,
    breakDuration: 5,
    notificationsEnabled: true,
    soundEnabled: true,
    autoStartBreak: false,
    dailyGoalHours: 4,
  });

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  // Export data as JSON
  const handleExportData = () => {
    const exportData = {
      settings,
      sessions,
      exportDate: new Date().toISOString(),
      totalSessions: sessions.length,
      totalFocusTime: sessions
        .filter((s) => s.mode === 'work' && s.completed)
        .reduce((acc, s) => acc + s.duration, 0),
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `study-flow-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Export as CSV
  const handleExportCSV = () => {
    const headers = ['Date', 'Duration (min)', 'Mode', 'Category', 'Completed'];
    const rows = sessions.map((s) => [
      s.date,
      s.duration,
      s.mode,
      s.category || '-',
      s.completed ? 'Yes' : 'No',
    ]);

    let csv = headers.join(',') + '\n';
    rows.forEach((row) => {
      csv += row.join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `study-flow-sessions-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative">
      {/* Settings Modal */}
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
        className={`fixed lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-full lg:max-w-2xl bottom-20 left-4 right-4 w-auto bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-51 max-h-[80vh] flex flex-col overflow-hidden ${!isOpen && 'pointer-events-none'
          }`}
      >
        <div className="shrink-0 flex items-center justify-between p-6 border-b border-white/10 bg-slate-800">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Settings className="w-5 h-5 text-cyan-400" />
            Pengaturan
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

        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          <div className="space-y-6">
            {/* Work Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2" suppressHydrationWarning>
                ⏱️ Durasi Kerja: {localSettings.workDuration} menit
              </label>
              <input
                type="range"
                min="1"
                max="60"
                value={localSettings.workDuration}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setLocalSettings({ ...localSettings, workDuration: value });
                  updateSettings({ ...localSettings, workDuration: value });
                }}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>

            {/* Break Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2" suppressHydrationWarning>
                ☕ Durasi Istirahat: {localSettings.breakDuration} menit
              </label>
              <input
                type="range"
                min="1"
                max="30"
                value={localSettings.breakDuration}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setLocalSettings({ ...localSettings, breakDuration: value });
                  updateSettings({ ...localSettings, breakDuration: value });
                }}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            {/* Notifications Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">Notifikasi Browser</span>
              </div>
              <button
                onClick={() => {
                  const newValue = !localSettings.notificationsEnabled;
                  setLocalSettings({ ...localSettings, notificationsEnabled: newValue });
                  updateSettings({ ...localSettings, notificationsEnabled: newValue });
                }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${localSettings.notificationsEnabled ? 'bg-blue-500' : 'bg-slate-600'
                  }`}
                suppressHydrationWarning
              >
                <motion.span
                  layout
                  className="inline-block h-4 w-4 transform rounded-full bg-white"
                  style={{
                    marginLeft: localSettings.notificationsEnabled ? '22px' : '2px',
                  }}
                  suppressHydrationWarning
                />
              </button>
            </div>

            {/* Sound Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">Suara Alaram</span>
              </div>
              <button
                onClick={() => {
                  const newValue = !localSettings.soundEnabled;
                  setLocalSettings({ ...localSettings, soundEnabled: newValue });
                  updateSettings({ ...localSettings, soundEnabled: newValue });
                }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${localSettings.soundEnabled ? 'bg-green-500' : 'bg-slate-600'
                  }`}
                suppressHydrationWarning
              >
                <motion.span
                  layout
                  className="inline-block h-4 w-4 transform rounded-full bg-white"
                  style={{
                    marginLeft: localSettings.soundEnabled ? '22px' : '2px',
                  }}
                  suppressHydrationWarning
                />
              </button>
            </div>

            {/* Auto Start Break */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-300">Mulai Istirahat Otomatis</span>
              </div>
              <button
                onClick={() => {
                  const newValue = !localSettings.autoStartBreak;
                  setLocalSettings({ ...localSettings, autoStartBreak: newValue });
                  updateSettings({ ...localSettings, autoStartBreak: newValue });
                }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${localSettings.autoStartBreak ? 'bg-yellow-500' : 'bg-slate-600'
                  }`}
                suppressHydrationWarning
              >
                <motion.span
                  layout
                  className="inline-block h-4 w-4 transform rounded-full bg-white"
                  style={{
                    marginLeft: localSettings.autoStartBreak ? '22px' : '2px',
                  }}
                  suppressHydrationWarning
                />
              </button>
            </div>

            {/* Daily Goal */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2" suppressHydrationWarning>
                🎯 Target Harian: {localSettings.dailyGoalHours} jam
              </label>
              <input
                type="range"
                min="1"
                max="12"
                step="0.5"
                value={localSettings.dailyGoalHours}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  setLocalSettings({ ...localSettings, dailyGoalHours: value });
                  updateSettings({ ...localSettings, dailyGoalHours: value });
                }}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Export Data Section */}
            <div className="mt-6 pt-6 border-t border-slate-700">
              <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Ekspor Data
              </h4>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleExportData}
                  className="flex-1 py-2 px-4 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Export JSON
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleExportCSV}
                  className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Export CSV
                </motion.button>
              </div>
            </div>

            {/* Reset Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={resetSettings}
              className="mt-4 w-full py-2 px-4 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset ke Pengaturan Default
            </motion.button>

            {/* Footer Info */}
            <p className="text-xs text-gray-500 mt-4 text-center">
              Pengaturan disimpan otomatis ke localStorage
            </p>
          </div>
        </div>
      </motion.div >
    </div >
  );
}


