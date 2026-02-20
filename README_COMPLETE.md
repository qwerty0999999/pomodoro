# 🎓 Study-Flow Dashboard - Aplikasi Produktivitas Lengkap

> **Dashboard Fokus Produktivitas Cerdas untuk Mahasiswa IT**

Aplikasi web modern yang menggabungkan Pomodoro Timer, Ambient Sound Mixer, dan Eisenhower Matrix untuk memaksimalkan produktivitas dan fokus belajar.

## ✨ Fitur Utama

### 🎯 Pomodoro Timer
- ⏱️ Countdown timer dengan durasi kustomisasi (1-60 menit kerja, 1-30 menit istirahat)
- 🔊 Alarm sound otomatis dengan Web Audio API (3 beep 800Hz)
- 🔔 Browser notifications saat session selesai
- 📊 Session tracking otomatis ke history
- 🎨 Visual countdown dengan format MM:SS
- 🎮 Play/Pause/Reset controls
- 🔄 Mode switcher (Kerja ↔ Istirahat)

### 🎵 Ambient Sound Mixer
- 🌧️ 4 ambient sounds: Hujan, Kafe, Hutan, White Noise
- 🔊 Volume control individual (0-100%) untuk setiap track
- 🎼 Multiple simultaneous playback
- 🎯 Visual gradient feedback
- ⚡ Smooth transitions

### 📋 Eisenhower Matrix
- **Q1 (Merah):** Penting & Urgent → Kerjakan Sekarang
- **Q2 (Biru):** Penting & Tidak Urgent → Jadwalkan
- **Q3 (Orange):** Tidak Penting & Urgent → Delegasikan
- **Q4 (Abu):** Tidak Penting & Tidak Urgent → Hindari
- ✅ Add/Complete/Delete tasks
- 📌 Real-time UI updates
- 🎨 Smooth animations

### 📊 Statistics Dashboard
- **Today's Pomodoro:** Count sesi kerja hari ini
- **Completed Tasks:** Total tugas selesai
- **Total Focus Time:** Durasi fokus akumulatif
- **Current Streak:** Consecutive days dengan sessions
- 📈 Real-time metrics update
- 🎨 Animated metric cards

### 💾 Advanced Features
- **Session History:** Tracking riwayat 10 sesi terakhir
- **LocalStorage Persistence:** Auto-save semua data
- **Settings Panel:** Customize durations & features
- **Backup & Restore:** Export/import data as JSON
- **Help & Tutorials:** 4 interactive guides
- **Browser Notifications:** Desktop alerts

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm atau yarn

### Installation
```bash
# Clone repository
git clone <repo-url>
cd study-flow

# Install dependencies
npm install

# Run development server
npm run dev
```

Access di `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

## 📱 Features at a Glance

| Feature | Status | Details |
|---------|--------|---------|
| Pomodoro Timer | ✅ | Customizable, with alarm & notifications |
| Ambient Sounds | ✅ | 4 tracks with individual volume control |
| Eisenhower Matrix | ✅ | Full 4-quadrant task management |
| Statistics | ✅ | Real-time productivity metrics |
| Session History | ✅ | Track last 10 sessions |
| LocalStorage | ✅ | Auto-persist all data |
| Settings | ✅ | Customize durations & toggles |
| Backup/Restore | ✅ | Export/import JSON |
| Help System | ✅ | 4 interactive tutorials |
| Notifications | ✅ | Desktop browser notifications |
| Responsive | ✅ | Mobile, tablet, desktop optimized |

## 📊 Data Persistence

Semua data disimpan di browser's localStorage:
- ✅ Tasks (Eisenhower Matrix)
- ✅ Sessions (Pomodoro history)
- ✅ Settings (User preferences)
- ✅ Auto-restore on page reload

## 🎨 Design System

### Colors
- **Primary:** Blue (#3B82F6) - Focus/Work
- **Secondary:** Emerald (#10B981) - Break/Success
- **Accent:** Cyan (#06B6D4) - Highlights
- **Background:** Slate gradient (dark theme)

### Responsive
### Features Highlight
- **No Clutter Header:** Unified top navigation for Settings, Reports, and Help menus.
- **Mobile First Focus:** Custom smart-scroll and touch-friendly targets ensure that focus sessions run seamlessly on your phone.
- **Dark Mode Native:** Deep slate and neon gradient themes keep eyes relaxed during long night sessions.

## 🔧 Technology Stack

### Frontend
- **React 19.2.3** - UI library
- **Next.js 16.1.4** - Framework with Turbopack
- **TypeScript 5** - Type safety

### Styling & Animation
- **Tailwind CSS 4** - Utility-first CSS
- **Framer Motion 12.29.0** - Smooth animations

### State & Storage
- **Zustand 5.0.10** - Lightweight state management
- **Browser APIs** - localStorage, Web Audio, Notifications

### Icons
- **Lucide React** - Beautiful icon library

## 📚 Documentation

- **[FEATURES.md](./FEATURES.md)** - Detailed feature documentation
- **[GETTING_STARTED.md](./GETTING_STARTED.md)** - Installation & usage guide
- **[IMPLEMENTATION_COMPLETE.md](./IMPLEMENTATION_COMPLETE.md)** - Implementation details

## 🎯 Workflow Recommendation

### Morning Setup
1. Review yesterday's statistics
2. Add today's tasks to Eisenhower Matrix
3. Prioritize Q1 & Q2 tasks
4. Check settings are correct

### Work Session
1. Click Play on Pomodoro Timer
2. Select ambient sound (optional)
3. Work until alarm sounds
4. Session auto-tracks in history
5. Check statistics update

### Break Time
1. Timer switches to break mode
2. Take 5-minute break
3. Return for next session

### Evening Review
1. Review completed tasks
2. Check total focus time
3. Update tomorrow's plan
4. Optional: Backup data

## 💡 Tips for Maximum Productivity

1. **Start Simple:** Use default 25/5 durations
2. **Combine Sounds:** Mix 2-3 ambient tracks
3. **Regular Reviews:** Check statistics weekly
4. **Consistent Usage:** Build daily habit
5. **Adjust Durations:** Customize based on your workflow
6. **Focus on Q2:** Important but not urgent tasks
7. **Track Streaks:** Motivation through consistency

## 🌐 Browser Support

| Browser | Support |
|---------|---------|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| Mobile | ✅ Optimized |

## 🔐 Data Privacy

- ✅ All data stored locally (client-side only)
- ✅ No server connection required
- ✅ No account/login needed
- ✅ No external API calls
- ✅ Manual backup for safety

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main dashboard
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── pomodoro/PomodoroTimer.tsx
│   ├── task/EisenhowerMatrix.tsx
│   ├── audio/AmbientSoundMixer.tsx
│   ├── StatisticsPanel.tsx
│   ├── SettingsPanel.tsx
│   ├── ReportPanel.tsx
│   ├── BottomNavigation.tsx
│   └── HelpPanel.tsx
├── hooks/
│   └── useTimer.ts
└── store/
    ├── taskStore.ts
    ├── sessionStore.ts
    └── audioStore.ts
```

## 🚀 Performance

- ⚡ Optimized with Turbopack
- 📦 Minimal dependencies
- 🔄 Smooth animations (60fps)
- 💾 Lightweight state management
- 📱 Fast on mobile devices

## 🐛 Troubleshooting

### Alarm Not Working?
- Check Settings → Enable "Suara Alarm"
- Ensure browser volume is not muted
- Try refreshing page (F5)

### Notifications Not Showing?
- Grant browser notification permission
- Check Settings → Enable "Notifikasi Browser"

### Tasks Not Saving?
- Ensure not in private/incognito mode
- Check browser localStorage is enabled
- Try exporting backup as fallback

## 📞 Support

### Getting Help
1. Check **Help Panel** (?) in app for tutorials
2. Read **GETTING_STARTED.md** for usage
3. Review **FEATURES.md** for detailed docs
4. Check code comments for technical details

## 🎓 For IT Students

Dirancang khusus untuk mahasiswa dengan kebutuhan:
- ✅ Flexibility untuk berbagai durasi tugas
- ✅ Multiple task prioritization methods
- ✅ Focus-enhancing ambient sounds
- ✅ Tracking & analytics for self-improvement
- ✅ Zero configuration - works out of the box

## 🔄 Version

**Study-Flow v1.0** - Complete Feature Release

### What's Included
- ✅ All core productivity features
- ✅ Complete data persistence
- ✅ Help & tutorial system
- ✅ Responsive design
- ✅ Production-ready code

## 📝 License

Open source project for educational purposes.

## 🙏 Credits

Built with ❤️ for IT Students at UPB

**Technologies Used:**
- Next.js ecosystem
- React & TypeScript
- Tailwind CSS
- Framer Motion
- Zustand
- Web APIs (Audio, Notifications, Storage)

## 🌟 Key Highlights

✨ **Modern Stack** - Next.js 16, React 19, TypeScript 5
🎨 **Beautiful UI** - Gradient design with smooth animations
⚡ **Performance** - Turbopack optimized, minimal bundle
💾 **Data Persistence** - Auto-save to localStorage
🎯 **Productivity** - Multiple time management techniques
📱 **Responsive** - Works on all devices
🔐 **Privacy** - All data stays local
📚 **Well Documented** - Multiple guides & tutorials

## 🚀 Get Started Now!

```bash
npm install
npm run dev
```

Then visit `http://localhost:3000` and start being productive! 🎓

---

**Study-Flow** - Fokus. Produktif. Sukses.
