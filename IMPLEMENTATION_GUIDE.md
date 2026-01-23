# Study-Flow Dashboard - Setup & Implementation Guide

## 🎯 Project Overview

Study-Flow adalah dashboard produksi interaktif yang menggabungkan tiga teknik fokus populer untuk membantu mahasiswa IT tetap produktif:

1. **Pomodoro Timer** - Timer yang dapat dikustomisasi untuk fokus 25 menit
2. **Ambient Sound Mixer** - Pemutar suara latar (hujan, kafe, hutan, white noise)
3. **Eisenhower Matrix** - Prioritas tugas berdasarkan urgency dan importance

---

## 📁 Struktur Project

```
src/
├── app/
│   ├── layout.tsx          # Root layout dengan metadata
│   ├── page.tsx            # Dashboard utama
│   └── globals.css         # Global styles
├── components/
│   ├── pomodoro/
│   │   └── PomodoroTimer.tsx    # Timer dengan durasi customizable
│   ├── task/
│   │   └── EisenhowerMatrix.tsx # 4-quadrant task matrix
│   └── audio/
│       └── AmbientSoundMixer.tsx # Audio mixer dengan volume control
├── hooks/
│   └── useTimer.ts         # Custom hook untuk timer logic
├── store/
│   ├── audioStore.ts       # Zustand store untuk audio tracks
│   └── taskStore.ts        # Zustand store untuk tasks
└── package.json            # Dependencies configuration
```

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js v18+
- npm atau yarn

### 2. Install Dependencies
```bash
cd study-flow
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000`

### 4. Build Production
```bash
npm run build
npm start
```

---

## 🎨 Fitur Utama

### 1. Pomodoro Timer ⏱️

**Lokasi**: [src/components/pomodoro/PomodoroTimer.tsx](src/components/pomodoro/PomodoroTimer.tsx)

**Fitur:**
- Mode Kerja (25 menit default) dan Mode Istirahat (5 menit default)
- Durasi dapat dikustomisasi dengan tombol +/-
- Notifikasi audio saat timer selesai
- Animasi pulsing saat timer aktif
- Status visual mode (🎯 Fokus / ☕ Istirahat)

**Cara Menggunakan:**
1. Tekan tombol Play untuk mulai timer
2. Gunakan +/- untuk mengatur durasi kerja/istirahat
3. Klik "Ganti ke [Mode]" untuk beralih antara kerja dan istirahat

---

### 2. Eisenhower Matrix 📋

**Lokasi**: [src/components/task/EisenhowerMatrix.tsx](src/components/task/EisenhowerMatrix.tsx)

**Fitur:**
- 4 Kuadran prioritas:
  - **Q1 (Merah)**: Penting & Mendesak → Kerjakan Sekarang
  - **Q2 (Biru)**: Penting & Tidak Mendesak → Jadwalkan
  - **Q3 (Orange)**: Tidak Penting & Mendesak → Delegasi
  - **Q4 (Abu)**: Tidak Penting & Tidak Mendesak → Hapus

**Fitur:**
- Tambah tugas baru dengan enter atau klik tombol +
- Centang checkbox untuk menandai tugas selesai
- Hapus tugas dengan hover dan klik tombol trash
- Animasi smooth saat tugas ditambah/dihapus
- Staggered animation untuk visual yang menenangkan

**Cara Menggunakan:**
1. Ketik nama tugas di input field kuadran pilihan
2. Tekan Enter atau klik tombol + untuk menambah
3. Hover pada tugas untuk lihat tombol delete
4. Klik checkbox untuk menandai sebagai selesai

---

### 3. Ambient Sound Mixer 🎵

**Lokasi**: [src/components/audio/AmbientSoundMixer.tsx](src/components/audio/AmbientSoundMixer.tsx)

**Fitur:**
- 4 Track suara latar:
  - 🌧️ Hujan (Rain)
  - ☕ Kafe (Coffee Shop)
  - 🌲 Hutan (Forest)
  - 🔇 White Noise
- Volume individual untuk setiap track (0-100%)
- Play/Pause control per track
- Mix multiple sounds sekaligus
- Gradient volume slider untuk visual feedback

**Cara Menggunakan:**
1. Klik tombol Play/Pause untuk mulai/hentikan suara
2. Drag slider untuk adjust volume masing-masing track
3. Kombinasikan beberapa track untuk ambient mix sempurna

---

## 🛠️ Technology Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 16** | Full-stack React framework dengan App Router |
| **React 19** | UI component library |
| **TypeScript** | Type-safe development |
| **Tailwind CSS 4** | Utility-first CSS framework |
| **Framer Motion** | Animation & transitions |
| **Zustand** | State management (audio & tasks) |
| **Lucide React** | Icon library |

---

## 📦 Dependensi Project

```json
{
  "dependencies": {
    "framer-motion": "^12.29.0",      // Smooth animations
    "lucide-react": "^0.562.0",       // Beautiful icons
    "next": "16.1.4",                 // React framework
    "react": "19.2.3",                // UI library
    "react-dom": "19.2.3",            // React DOM
    "zustand": "^5.0.10"              // State management
  }
}
```

---

## 🧠 State Management dengan Zustand

### Audio Store
**File**: [src/store/audioStore.ts](src/store/audioStore.ts)

```typescript
interface AudioTrack {
  id: string;
  name: string;
  url: string;
  volume: number;      // 0-100
  isPlaying: boolean;
}
```

**Methods:**
- `setVolume(id, volume)` - Atur volume track
- `toggleAudio(id)` - Mulai/hentikan track

### Task Store
**File**: [src/store/taskStore.ts](src/store/taskStore.ts)

```typescript
interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  importance: boolean;  // Penting?
  urgency: boolean;     // Mendesak?
  createdAt: Date;
}
```

**Methods:**
- `addTask(task)` - Tambah tugas baru
- `deleteTask(id)` - Hapus tugas
- `updateTask(id, task)` - Update tugas
- `toggleTask(id)` - Tandai selesai/tidak selesai

---

## 🎬 Custom Hooks

### useTimer
**File**: [src/hooks/useTimer.ts](src/hooks/useTimer.ts)

```typescript
const timer = useTimer({
  initialMinutes: 25,
  initialSeconds: 0,
  onComplete: () => alert('Timer selesai!')
});

// Returns:
// - minutes, seconds
// - isActive
// - toggleTimer(), pauseTimer(), resumeTimer(), resetTimer()
```

---

## 🎨 Design Principles

1. **Minimalist Aesthetic** - Interface yang clean dan tidak berlebihan
2. **Calming Color Palette** - Biru, emerald, dan abu-abu untuk efek menenangkan
3. **Smooth Animations** - Framer Motion untuk transisi yang halus
4. **Dark Mode Default** - Melindungi mata saat belajar lama
5. **Glassmorphism** - Efek backdrop blur untuk depth
6. **Responsive Design** - Bekerja di desktop, tablet, dan mobile

---

## 📱 Responsive Breakpoints

- **Mobile** (< 768px): Stacked layout, sidebar becomes full-width
- **Tablet** (768px - 1024px): 2-column layout mulai muncul
- **Desktop** (> 1024px): Full 4-column grid layout dengan sticky sidebar

---

## 🔧 Configuration Files

### next.config.ts
```typescript
// Konfigurasi Next.js dan Turbopack
// Mengaktifkan CSS-in-JS, image optimization, dll
```

### tailwind.config.ts
```typescript
// Tailwind CSS configuration
// Custom colors, fonts, dan theme extensions
```

### tsconfig.json
```typescript
// TypeScript configuration
// Path aliases (@/* untuk imports)
```

---

## 📝 Contoh Workflow Penggunaan

**Skenario: Belajar untuk UTS Algoritma**

1. **Setup Timer**
   - Set Work Duration: 45 menit
   - Set Break Duration: 10 menit

2. **Pilih Ambient Sound**
   - Aktifkan "Kafe" (50% volume)
   - Aktifkan "Hujan" (30% volume)

3. **Buat Task List**
   - **Q1**: "Review soal-soal algoritma UTS" (Penting & Mendesak)
   - **Q2**: "Baca buku referensi DSA" (Penting & Tidak Mendesak)
   - **Q3**: "Reply email dosen" (Tidak Penting & Mendesak)
   - **Q4**: "Scroll TikTok" (Tidak Penting & Tidak Mendesak)

4. **Mulai Belajar**
   - Klik Play pada Pomodoro
   - Fokus 45 menit pada Q1 tasks
   - Saat timer alarm, ambil break 10 menit
   - Ulangi cycle

---

## 🚀 Deployment

### Deploy ke Vercel (Recommended)

```bash
# Login ke Vercel
npx vercel login

# Deploy
npx vercel
```

### Deploy ke Self-Hosted Server

```bash
# Build production
npm run build

# Start server
npm start

# Atau dengan PM2 untuk production
npm install -g pm2
pm2 start npm --name study-flow -- start
```

---

## 🐛 Troubleshooting

### Issue: Audio tidak play
- **Sebab**: Browser policy untuk autoplay audio
- **Solusi**: User harus click Play button terlebih dahulu

### Issue: Timer tidak berjalan akurat
- **Sebab**: Tab inactive di browser (Chromium browser mengurangi FPS)
- **Solusi**: Keep tab in focus atau gunakan browser notifications

### Issue: Tasks tidak tersimpan setelah refresh
- **Sebab**: State disimpan di memory (Zustand), bukan localStorage
- **Solusi**: Implementasikan localStorage persistence

---

## 📊 Fitur yang Bisa Ditambahkan (Roadmap)

- [ ] LocalStorage persistence untuk tasks
- [ ] Dark/Light theme toggle
- [ ] User authentication & cloud sync
- [ ] Statistics dashboard (session history, productivity metrics)
- [ ] Custom sound upload
- [ ] Focus session notifications
- [ ] Mobile app (React Native)
- [ ] Browser extension

---

## 📝 License

Project ini dibuat untuk tujuan pendidikan.

---

## 👨‍💻 Developer

Dibuat dengan ❤️ untuk mahasiswa IT UPB yang ingin fokus belajar dan produktif.

**Study-Flow v1.0** | January 2026
