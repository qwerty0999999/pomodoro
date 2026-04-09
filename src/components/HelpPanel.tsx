'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, Lightbulb, BookOpen, Zap, Heart, Coffee } from 'lucide-react';
import { useState } from 'react';

interface Tutorial {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: string;
  tips: string[];
}

const tutorials: Tutorial[] = [
  {
    id: 'about',
    title: 'Tentang Study-Flow',
    icon: <Heart className="w-6 h-6" />,
    content:
      'Study-Flow dibuat oleh Rijalul Fikri, seorang developer yang sangat menyukai proses belajar. Dia bisa menghabiskan jam berjam-jam belajar hal baru tanpa menyadari waktu berlalu, tapi juga suka santai dan relaksasi sampai lupa harus melanjutkan project yang sedang dikerjakan.',
    tips: [
      '💭 Filosofi: "Aku suka belajar sampai lupa waktu, tapi juga suka santai sampai lupa harus bekerja"',
      '⚡ Masalah: Balance antara fokus intensif dan istirahat yang sehat itu susah',
      '🎯 Solusi: Study-Flow dibuat untuk menciptakan ritme kerja yang produktif tapi tetap menyenangkan',
      '🎵 Ambient Sound: Musik buat suasana yang nyaman dan fokus tanpa terasa seperti dipaksa',
      '📊 Tracking: Gamifikasi dengan streak dan stats untuk motivasi visual yang asik',
      '🎨 Philosophy: Belajar dan bekerja harusnya fun, bukan torture - itu yang diimplementasikan di sini',
    ],
  },
  {
    id: 'support',
    title: 'Support Pengembang',
    icon: <Coffee className="w-6 h-6" />,
    content:
      'Study-Flow terus dikembangkan oleh Rijalul Fikri dengan passion dan dedikasi. Jika kamu suka aplikasi ini dan ingin membantu pengembangan lebih lanjut, kamu bisa memberikan donasi atau support melalui Saweria.',
    tips: [
      '☕ Sawer Kopi: Bantu developer tetap semangat dengan segelas kopi',
      '💝 Dukungan Finansial: Donasi membantu development fitur baru dan improvement',
      '🔗 Link Saweria: https://saweria.co/rijalF',
      '✨ Benefit Donatur: Support langsung dari kamu membuat pengembangan lebih cepat',
      '🙏 Terima Kasih: Setiap donasi adalah bentuk apresiasi yang sangat berarti',
      '🚀 Future Features: Dana donasi akan digunakan untuk fitur baru yang lebih seru',
    ],
  },
  {
    id: 'pomodoro',
    title: 'Teknik Pomodoro',
    icon: <Zap className="w-6 h-6" />,
    content:
      'Teknik Pomodoro adalah metode manajemen waktu yang membagi pekerjaan menjadi interval fokus (25 menit) dipisahkan dengan istirahat pendek (5 menit). Ini membantu meningkatkan produktivitas dan mengurangi kelelahan.',
    tips: [
      'Mulai dengan durasi default 25 menit untuk sesi kerja',
      'Gunakan istirahat 5 menit untuk refresh pikiran',
      'Setelah 4 sesi, ambil istirahat panjang 15-30 menit',
      'Hindari distraksi selama sesi fokus',
    ],
  },
  {
    id: 'matrix',
    title: 'Matrix Eisenhower',
    icon: <BookOpen className="w-6 h-6" />,
    content:
      'Matrix Eisenhower membagi tugas menjadi 4 kuadran berdasarkan tingkat kepentingan dan urgency. Ini membantu Anda fokus pada tugas yang paling berdampak untuk kesuksesan Anda.',
    tips: [
      'Q1 (Merah): Urgent & Penting - Kerjakan sekarang',
      'Q2 (Biru): Penting tapi Tidak Urgent - Jadwalkan',
      'Q3 (Orange): Urgent tapi Tidak Penting - Delegasikan',
      'Q4 (Abu): Tidak Penting & Tidak Urgent - Hindari',
    ],
  },
  {
    id: 'ambient',
    title: 'Spotify Player',
    icon: <Lightbulb className="w-6 h-6" />,
    content:
      'Musik dan suara ambient membantu meningkatkan fokus dan konsentrasi. Dengarkan playlist yang tenang sambil bekerja untuk menciptakan lingkungan kerja yang optimal dan menyenangkan.',
    tips: [
      'Pilih playlist yang cocok dengan mood belajarmu',
      'Gunakan musik instrumental untuk fokus maksimal',
      'Mulai dengan volume rendah (30-40%)',
      'Ganti playlist saat merasa bosan untuk motivasi baru',
    ],
  },
  {
    id: 'tips',
    title: 'Tips Produktivitas',
    icon: <Lightbulb className="w-6 h-6" />,
    content: 'Berikut adalah beberapa tips untuk memaksimalkan produktivitas Anda dengan Study-Flow.',
    tips: [
      'Matikan notifikasi dari aplikasi lain selama sesi',
      'Minum air dan istirahat mata secara berkala',
      'Catat tugas baru yang terlintas saat sedang fokus',
      'Review statistik mingguan untuk tracking progress',
      'Sesuaikan durasi Pomodoro dengan kemampuan Anda',
      'Jangan malu untuk mengambil istirahat - itu bagian dari sistem!',
    ],
  },
];

interface HelpPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpPanel({ isOpen, onClose }: HelpPanelProps) {
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);

  const handleClose = () => {
    onClose();
    setSelectedTutorial(null);
  };

  return (
    <div className="relative">
      {/* Help Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.1 }}
              className="fixed lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-full lg:max-w-2xl bottom-20 left-4 right-4 w-auto bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 max-h-[80vh] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="shrink-0 flex items-center justify-between p-6 border-b border-white/10 bg-slate-800">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-cyan-400" />
                  Bantuan & Tutorial
                </h3>
                <button
                  onClick={handleClose}
                  className="p-1 hover:bg-slate-700 rounded-lg transition"
                >
                  <X size={20} className="text-gray-400 hover:text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                {!selectedTutorial ? (
                  // Tutorial List
                  <div className="space-y-3">
                    {tutorials.map((tutorial, idx) => (
                      <motion.button
                        key={tutorial.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => setSelectedTutorial(tutorial)}
                        className="w-full text-left p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-3 group"
                      >
                        <div className="text-2xl text-cyan-400 group-hover:scale-110 transition-transform">
                          {tutorial.icon}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{tutorial.title}</p>
                          <p className="text-xs text-gray-400">Klik untuk membaca</p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  // Tutorial Detail
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <button
                      onClick={() => setSelectedTutorial(null)}
                      className="text-cyan-400 hover:text-cyan-300 text-sm mb-4 flex items-center gap-1"
                    >
                      ← Kembali
                    </button>

                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-3xl text-cyan-400">
                        {selectedTutorial.icon}
                      </div>
                      <h4 className="text-xl font-bold text-white">
                        {selectedTutorial.title}
                      </h4>
                    </div>

                    <p className="text-gray-300 text-sm leading-relaxed mb-6">
                      {selectedTutorial.content}
                    </p>

                    <div>
                      <h5 className="font-semibold text-white mb-3">💡 Tips Praktis:</h5>
                      <ul className="space-y-2">
                        {selectedTutorial.tips.map((tip, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex gap-2 text-sm text-gray-300"
                          >
                            <span className="text-cyan-400 shrink-0">•</span>
                            <span>{tip}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Special Button for Support */}
                    {selectedTutorial.id === 'support' && (
                      <motion.a
                        href="https://saweria.co/rijalF"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="block w-full mt-6 py-3 px-4 bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-lg text-center transition-all shadow-lg"
                      >
                        ☕ Donasi Sekarang di Saweria
                      </motion.a>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}


