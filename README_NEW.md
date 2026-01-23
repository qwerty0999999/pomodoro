# 🚀 Study-Flow Dashboard

> **Dashboard Fokus Produktivitas Cerdas untuk Mahasiswa IT**

Gabungkan kekuatan **Pomodoro Timer**, **Ambient Sound Mixer**, dan **Eisenhower Matrix** dalam satu dashboard yang elegan dan responsif.

![Study-Flow](https://img.shields.io/badge/Next.js-16-blueviolet?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge)
![Framer Motion](https://img.shields.io/badge/Framer-Motion-black?style=for-the-badge)

---

## ✨ Features

### 🎯 **Customizable Pomodoro Timer**
- Atur durasi work & break session sesuai ritme kerja Anda
- Mode Work (fokus) dan Break (istirahat) yang dapat diatur
- Notifikasi audio saat timer selesai
- Animasi smooth dengan visual feedback yang menenangkan

### 📋 **Eisenhower Matrix**
Prioritaskan tugas dalam 4 kuadran:
- **🔴 Q1 - Kerjakan Sekarang**: Penting & Mendesak
- **🔵 Q2 - Jadwalkan**: Penting & Tidak Mendesak  
- **🟠 Q3 - Delegasi**: Tidak Penting & Mendesak
- **⚫ Q4 - Hapus**: Tidak Penting & Tidak Mendesak

Fitur:
- Tambah tugas dengan input field
- Tandai tugas selesai dengan checkbox
- Hapus tugas yang tidak relevan
- Animasi staggered untuk UX yang menenangkan

### 🎵 **Ambient Sound Mixer**
Ciptakan fokus environment sempurna dengan:
- 🌧️ **Hujan** - Suara hujan menenangkan
- ☕ **Kafe** - Suara ambient kafe ramai
- 🌲 **Hutan** - Suara alam yang fresh
- 🔇 **White Noise** - Sound masking sempurna

Fitur:
- Volume control individual per track (0-100%)
- Mix multiple sounds sekaligus
- Play/Pause button untuk setiap track
- Visual gradient slider dengan percentage display

---

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|-----------|---------|---------|
| **Next.js** | React framework dengan Server Components | 16.1.4 |
| **React** | UI library | 19.2.3 |
| **TypeScript** | Type-safe development | 5 |
| **Tailwind CSS** | Utility-first CSS | 4 |
| **Framer Motion** | Smooth animations & transitions | 12.29.0 |
| **Zustand** | Lightweight state management | 5.0.10 |
| **Lucide React** | Beautiful icon library | 0.562.0 |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Dashboard utama
│   └── globals.css                   # Global styles
├── components/
│   ├── pomodoro/
│   │   └── PomodoroTimer.tsx        # Timer dengan customization
│   ├── task/
│   │   └── EisenhowerMatrix.tsx     # 4-quadrant matrix
│   └── audio/
│       └── AmbientSoundMixer.tsx    # Audio mixer
├── hooks/
│   └── useTimer.ts                  # Timer logic hook
├── store/
│   ├── audioStore.ts                # Zustand audio state
│   └── taskStore.ts                 # Zustand task state
├── package.json
└── README.md (this file)
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm atau yarn

### Installation

1. **Clone atau buka project**
```bash
cd study-flow
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Open browser**
```
http://localhost:3000
```

### Production Build

```bash
npm run build
npm start
```

---

## 📖 Usage Guide

### Pomodoro Timer
1. Set durasi work/break dengan tombol +/-
2. Click Play untuk mulai timer
3. Click Pause untuk jeda atau Resume untuk lanjut
4. Click Reset untuk mulai ulang
5. Click "Ganti ke [Mode]" untuk beralih work/break

### Eisenhower Matrix
1. Ketik nama tugas di input field kuadran pilihan
2. Press ENTER atau click + untuk menambah
3. Hover pada tugas untuk lihat options
4. Click checkbox untuk tandai selesai
5. Click trash icon untuk delete

### Ambient Sound Mixer
1. Click Play button untuk mulai track suara
2. Drag volume slider untuk adjust level (0-100%)
3. Kombinasikan multiple tracks untuk mix sempurna
4. Click Pause untuk stop track

---

## 🎨 Design Features

### Visual Design
- 🌙 **Dark Mode Default** - Melindungi mata saat belajar lama
- 🎨 **Glassmorphism** - Backdrop blur effect untuk depth
- 🌊 **Gradient Text** - Eye-catching typography
- ✨ **Smooth Animations** - Framer Motion untuk transisi halus
- 📱 **Responsive Layout** - Mobile, tablet, desktop ready

### Color Palette
- **Primary**: Blue (Blue-400/500/600)
- **Accent**: Emerald (Emerald-400/500/600)  
- **Background**: Slate (Slate-950/900/800)
- **Quadrants**: Red, Blue, Orange, Gray

### Animation Philosophy
- Staggered animations untuk visual harmony
- Micro-interactions untuk user feedback
- Pulsing effects untuk attention
- Smooth transitions untuk polished feel

---

## 📊 State Management

### Audio Store (Zustand)
```typescript
interface AudioTrack {
  id: string;
  name: string;
  url: string;
  volume: number;       // 0-100
  isPlaying: boolean;
}

// Methods
setVolume(id, volume)   // Atur volume
toggleAudio(id)         // Play/Pause
```

### Task Store (Zustand)
```typescript
interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  importance: boolean;  // Penting?
  urgency: boolean;     // Mendesak?
  createdAt: Date;
}

// Methods
addTask(task)           // Tambah
deleteTask(id)          // Hapus
updateTask(id, task)    // Update
toggleTask(id)          // Selesai/Tidak
```

---

## 🪝 Custom Hooks

### useTimer
```typescript
const timer = useTimer({
  initialMinutes: 25,
  initialSeconds: 0,
  onComplete: () => console.log('Done!')
});

// Returns:
// - minutes, seconds
// - isActive
// - toggleTimer(), pauseTimer(), resumeTimer(), resetTimer()
```

---

## 🎯 Productivity Tips

1. **Standard Pomodoro**: 25 min work + 5 min break
2. **Deep Focus**: 45-50 min work + 10-15 min break
3. **Eisenhower Priority**: Focus Q1 tasks first, then Q2
4. **Ambient Mix**: Combine 2-3 sounds untuk optimal focus
5. **Break Time**: Don't skip, important untuk recovery

---

## 🌐 Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Recommended |
| Firefox | ✅ Full | Excellent support |
| Safari | ✅ Full | Audio might need permission |
| Edge | ✅ Full | Chromium-based |

---

## ⚙️ Configuration

### next.config.ts
```typescript
const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
};
```

### tailwind.config.ts
Default Tailwind v4 configuration dengan custom colors untuk quadrants.

### tsconfig.json
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "framer-motion": "^12.29.0",
    "lucide-react": "^0.562.0",
    "next": "16.1.4",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "zustand": "^5.0.10"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.1.4",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

---

## 🚀 Deployment

### Deploy ke Vercel (Recommended)
```bash
npx vercel login
npx vercel deploy
```

### Deploy ke Self-Hosted
```bash
npm run build
npm start

# Atau dengan PM2
npm install -g pm2
pm2 start npm --name study-flow -- start
```

---

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🐛 Troubleshooting

### Audio tidak terdengar?
- Click Play button terlebih dahulu (browser autoplay policy)
- Pastikan sistem volume tidak mute
- Check browser console untuk error messages

### Timer tidak akurat?
- Jika tab inactive, sistem operasi mengurangi FPS
- Keep tab in focus untuk accuracy terbaik

### Tasks hilang setelah refresh?
- Data disimpan di memory (Zustand), bukan persistent storage
- LocalStorage persistence bisa ditambahkan di roadmap

---

## 🗺️ Roadmap

- [ ] LocalStorage persistence untuk tasks & settings
- [ ] User authentication & cloud sync
- [ ] Statistics dashboard (productivity metrics)
- [ ] Custom sound upload feature
- [ ] Browser notifications
- [ ] Dark/Light theme toggle
- [ ] Mobile app (React Native)
- [ ] Browser extension untuk minimize distractions
- [ ] Focus session history & analytics
- [ ] Pomodoro team/multiplayer mode

---

## 🤝 Contributing

Kontribusi welcome! Silakan:
1. Fork project
2. Create feature branch
3. Commit changes
4. Push ke branch
5. Open pull request

---

## 📄 License

Project ini dibuat untuk tujuan edukatif.

---

## 👨‍💻 About

Study-Flow adalah passion project yang dibuat untuk membantu mahasiswa IT UPB tetap fokus dan produktif saat belajar.

**Features:**
- ⏱️ Customizable Pomodoro Timer
- 📋 Eisenhower Matrix untuk prioritas
- 🎵 Ambient Sound Mixer
- 🎨 Minimalist & calming UI
- ✨ Smooth animations & transitions

---

## 📞 Support

Jika ada pertanyaan atau bug report:
1. Check console untuk error messages
2. Test di browser berbeda untuk isolation
3. Baca IMPLEMENTATION_GUIDE.md untuk detail teknis
4. Baca QUICK_START.md untuk tutorial lengkap

---

## ✨ Made with ❤️

**Study-Flow v1.0** | January 2026 | Built for UPB Students

Semoga dashboard ini membantu Anda lebih fokus, produktif, dan sukses dalam belajar! 🎓

---

*"Fokus adalah seni mengabaikan segala hal yang tidak penting."* — Pomodoro Technique
