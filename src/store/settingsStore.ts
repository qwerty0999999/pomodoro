import { create } from 'zustand';

export interface Settings {
  workDuration: number;
  breakDuration: number;
  notificationsEnabled: boolean;
  soundEnabled: boolean;
  autoStartBreak: boolean;
  dailyGoalHours: number;
  theme: 'dark' | 'light';
}

const DEFAULTS: Settings = {
  workDuration: 25,
  breakDuration: 5,
  notificationsEnabled: true,
  soundEnabled: true,
  autoStartBreak: false,
  dailyGoalHours: 4,
  theme: 'dark',
};

interface SettingsStore {
  settings: Settings;
  loadSettings: () => void;
  updateSettings: (newSettings: Settings) => void;
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  resetSettings: () => void;
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  settings: DEFAULTS,

  loadSettings: () => {
    if (typeof window === 'undefined') return;
    
    const saved = localStorage.getItem('study-flow-settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        set({ settings: parsed });
      } catch (error) {
        console.log('Error loading settings:', error);
      }
    }
  },

  updateSettings: (newSettings: Settings) => {
    set({ settings: newSettings });
    localStorage.setItem('study-flow-settings', JSON.stringify(newSettings));
  },

  updateSetting: (key, value) => {
    const currentSettings = get().settings;
    const updatedSettings = { ...currentSettings, [key]: value };
    get().updateSettings(updatedSettings);
  },

  resetSettings: () => {
    set({ settings: DEFAULTS });
    localStorage.setItem('study-flow-settings', JSON.stringify(DEFAULTS));
  },
}));
