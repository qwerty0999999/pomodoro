'use client';

import { motion } from 'framer-motion';
import { BarChart3, Settings, HelpCircle } from 'lucide-react';

interface BottomNavigationProps {
  showButtons: boolean;
  onReportClick: () => void;
  onSettingsClick: () => void;
  onHelpClick: () => void;
  activeTab?: 'report' | 'settings' | 'help' | null;
}

export default function BottomNavigation({
  showButtons,
  onReportClick,
  onSettingsClick,
  onHelpClick,
  activeTab,
}: BottomNavigationProps) {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: showButtons ? 0 : 100 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-0 left-0 right-0 bg-linear-to-t from-slate-950 via-slate-900 to-slate-900/80 border-t border-slate-700 z-40 backdrop-blur-sm md:hidden"
    >
      <div className="flex justify-around items-center h-16 px-4">
        {/* Report Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReportClick}
          className={`flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-all ${
            activeTab === 'report'
              ? 'bg-blue-500/20 text-blue-400'
              : 'text-gray-400 hover:text-blue-400'
          }`}
        >
          <BarChart3 size={24} />
          <span className="text-xs font-medium">Laporan</span>
        </motion.button>

        {/* Settings Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSettingsClick}
          className={`flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-all ${
            activeTab === 'settings'
              ? 'bg-cyan-500/20 text-cyan-400'
              : 'text-gray-400 hover:text-cyan-400'
          }`}
        >
          <Settings size={24} />
          <span className="text-xs font-medium">Setelan</span>
        </motion.button>

        {/* Help Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onHelpClick}
          className={`flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-all ${
            activeTab === 'help'
              ? 'bg-purple-500/20 text-purple-400'
              : 'text-gray-400 hover:text-purple-400'
          }`}
        >
          <HelpCircle size={24} />
          <span className="text-xs font-medium">Bantuan</span>
        </motion.button>
      </div>
    </motion.div>
  );
}


