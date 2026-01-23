import { create } from 'zustand';

export interface AudioTrack {
  id: string;
  name: string;
  url: string;
  volume: number;
  isPlaying: boolean;
}

interface AudioStore {
  tracks: AudioTrack[];
  setVolume: (id: string, volume: number) => void;
  toggleAudio: (id: string) => void;
}

export const useAudioStore = create<AudioStore>((set) => ({
  tracks: [
    {
      id: 'rain',
      name: 'Hujan',
      url: 'https://www.soundjay.com/nature/sounds/rain-07.mp3',
      volume: 30,
      isPlaying: false,
    },
    {
      id: 'coffee',
      name: 'Kafe',
      url: '?????',
      volume: 30,
      isPlaying: false,
    },
    {
      id: 'forest',
      name: 'Hutan',
      url: '????',
      volume: 30,
      isPlaying: false,
    },
    {
      id: 'white-noise',
      name: 'White Noise',
      url: '???',
      volume: 30,
      isPlaying: false,
    },
  ],
  setVolume: (id, volume) =>
    set((state) => ({
      tracks: state.tracks.map((track) =>
        track.id === id ? { ...track, volume } : track
      ),
    })),
  toggleAudio: (id) =>
    set((state) => ({
      tracks: state.tracks.map((track) =>
        track.id === id ? { ...track, isPlaying: !track.isPlaying } : track
      ),
    })),
}));
