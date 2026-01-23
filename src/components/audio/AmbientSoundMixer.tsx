'use client';

import { motion } from 'framer-motion';
import { Music } from 'lucide-react';

export default function SpotifyPlayer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-3 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-slate-700 shadow-lg"
    >
      <div className="flex items-center gap-2 mb-3">
        <Music size={16} className="text-green-400" />
        <h3 className="text-sm font-semibold">Spotify</h3>
      </div>

      <iframe
        style={{ borderRadius: '8px' }}
        src="https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO?utm_source=generator"
        width="100%"
        height="180"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </motion.div>
  );
}
