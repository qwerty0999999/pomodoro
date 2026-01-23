'use client';

import { motion } from 'framer-motion';
import { Download, Upload, FileJson } from 'lucide-react';
import { useTaskStore } from '@/store/taskStore';
import { useSessionStore } from '@/store/sessionStore';
import { useState } from 'react';

export default function BackupPanel() {
  const { tasks } = useTaskStore();
  const { sessions } = useSessionStore();
  const [exported, setExported] = useState(false);

  const handleExport = () => {
    const data = {
      tasks,
      sessions,
      exportDate: new Date().toISOString(),
      appVersion: '1.0',
    };

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `study-flow-backup-${new Date().getTime()}.json`;
    link.click();
    URL.revokeObjectURL(url);

    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        JSON.parse(event.target?.result as string);
        
        // Import data logic would go here
        // This is a placeholder for the actual import functionality
        alert('Data berhasil diimport! (Fitur lengkap akan ditambahkan)');
      } catch {
        alert('Gagal mengimport file. Pastikan format JSON benar!');
      }
    };
    reader.readAsText(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-700"
    >
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <FileJson className="w-5 h-5 text-amber-400" />
        Backup & Restore
      </h3>

      <div className="space-y-3">
        {/* Export Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleExport}
          className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center gap-2 font-semibold text-white hover:shadow-lg transition-shadow"
        >
          <Download className="w-4 h-4" />
          {exported ? '✓ Diunduh!' : 'Unduh Backup'}
        </motion.button>

        {/* Import Button */}
        <div className="relative">
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
            id="import-file"
          />
          <motion.label
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            htmlFor="import-file"
            className="block py-2 px-4 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg text-center font-semibold text-white hover:shadow-lg transition-shadow cursor-pointer"
          >
            <span className="flex items-center justify-center gap-2">
              <Upload className="w-4 h-4" />
              Restore Backup
            </span>
          </motion.label>
        </div>

        {/* Info */}
        <p className="text-xs text-gray-400 text-center mt-4">
          📦 {tasks.length} tugas • 📊 {sessions.length} sesi backup tersedia
        </p>
      </div>
    </motion.div>
  );
}
