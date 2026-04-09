'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Search, Loader2 } from 'lucide-react';

interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
}

export default function SpotifyPlayer() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SpotifyTrack[]>([]);
  // Default track/playlist
  const [currentEmbedCode, setCurrentEmbedCode] = useState(
    'track/7xGfCGCR8jcY1yEUvA4bH6' // Initial song id (example: Rayuan Perempuan Gila) or any track ID
  );

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      const res = await fetch(`/api/spotify/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error('Failed to search');
      const data = await res.json();
      setResults(data);
    } catch (error: unknown) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : 'Gagal mencari lagu';
      alert(`${errorMessage}. Pastikan Client Secret Spotify sudah diisi di .env.local`);
    } finally {
      setIsSearching(false);
    }
  };

  const playTrack = (trackId: string) => {
    setCurrentEmbedCode(`track/${trackId}`);
    setResults([]); // Sembunyikan hasil pencarian setelah memilih lagu
    setQuery(''); // Kosongkan input
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-3 bg-linear-to-br from-slate-800 to-slate-900 rounded-lg border border-slate-700 shadow-lg"
    >
      <div className="flex items-center gap-2 mb-3">
        <Music size={16} className="text-green-400" />
        <h3 className="text-sm font-semibold">Spotify Music Bot</h3>
      </div>

      {/* Form Pencarian */}
      <form onSubmit={handleSearch} className="mb-3 relative">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Cari lagu (contoh: Nadin Amizah)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-slate-950/50 border border-slate-700 rounded-md py-1.5 pl-3 pr-8 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
          />
          <button
            type="submit"
            disabled={isSearching}
            className="absolute right-2 text-slate-400 hover:text-green-400 transition-colors"
          >
            {isSearching ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
          </button>
        </div>
      </form>

      {/* Hasil Pencarian */}
      {results.length > 0 && (
        <div className="mb-3 max-h-40 overflow-y-auto bg-slate-950 rounded-md border border-slate-700">
          {results.map((track) => {
            const albumImage = track.album?.images?.[2]?.url || track.album?.images?.[0]?.url;
            return (
              <button
                key={track.id}
                onClick={() => playTrack(track.id)}
                className="w-full text-left px-3 py-2 text-xs hover:bg-slate-800 flex items-center gap-3 border-b border-slate-800 last:border-0 transition-colors"
              >
                {albumImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={albumImage} alt="" className="w-8 h-8 rounded shrink-0 object-cover" />
                )}
                <div className="overflow-hidden">
                  <p className="font-semibold text-slate-200 truncate">{track.name}</p>
                  <p className="text-slate-400 truncate">{track.artists.map(a => a.name).join(', ')}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Spotify iFrame */}
      <iframe
        style={{ borderRadius: '8px' }}
        src={`https://open.spotify.com/embed/${currentEmbedCode}?utm_source=generator`}
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="transition-all duration-300"
      ></iframe>
    </motion.div>
  );
}


