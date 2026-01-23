# Study-Flow - Installation & Usage Guide

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- npm atau yarn package manager

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000`

### 3. Build for Production
```bash
npm run build
npm start
```

---

## 📋 Feature Quick Access

### Pomodoro Timer (Left Sidebar)
- **Adjust Duration:** Click +/- buttons
- **Start Session:** Click Play button
- **Switch Mode:** Click Kerja/Istirahat button
- **Audio Alert:** Automatic beep & notification when complete

### Ambient Sound Mixer (Left Sidebar)
- **Select Sound:** Choose from 4 options (Rain, Cafe, Forest, White Noise)
- **Adjust Volume:** Drag slider 0-100%
- **Combine Sounds:** Mix multiple tracks simultaneously
- **Toggle:** Click play/pause icon

### Eisenhower Matrix (Main Area)
- **Add Task:** Type in input field under each quadrant
- **Submit:** Press Enter or click add button
- **Mark Done:** Click checkbox to toggle completion
- **Delete:** Hover & click trash icon

### Statistics (Top Right)
- **Today's Metrics:** Real-time update of:
  - Total Pomodoro sessions
  - Completed tasks
  - Total focus time
  - Current streak

### Session History (Left Sidebar, Bottom)
- **View History:** Last 10 sessions with details
- **Session Info:** Mode, duration, timestamp
- **Color Coding:** Blue=Work, Green=Break

---

## ⚙️ Configuration (Settings)

### Access Settings
Click **gear icon** (bottom right) to open Settings panel

### Available Settings

#### 1. Work Duration
- Range: 1-60 minutes (default: 25)
- Usage: Drag slider to adjust

#### 2. Break Duration
- Range: 1-30 minutes (default: 5)
- Usage: Drag slider to adjust

#### 3. Browser Notifications (ON/OFF)
- Toggle for desktop alerts

#### 4. Alarm Sound (ON/OFF)
- Toggle for beep sound

#### 5. Auto-Start Break (ON/OFF)
- Auto-switch after work session

#### 6. Reset to Defaults
- Restore factory settings

---

## 💾 Backup & Restore

### Export Data
1. Scroll down to Backup section
2. Click **"Unduh Backup"** 
3. File saved as `study-flow-backup-[timestamp].json`

### Import Data
1. Click **"Restore Backup"**
2. Select saved `.json` file
3. Confirm import

---

## 📚 Help & Tutorials

Click **question mark icon** (bottom right) for:
- Pomodoro technique explanation
- Eisenhower Matrix guide
- Ambient sound tips
- Productivity best practices

---

## 🎯 Recommended Workflow

1. **Morning:** Add tasks to matrix, set goals
2. **Session:** Play timer + sounds, focus for 25 min
3. **Complete:** Check task, review stats
4. **Break:** Take 5 min break, refresh
5. **Evening:** Review statistics, plan next day

---

## 🐛 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Alarm not working | Check Settings → Toggle Alarm Sound ON |
| No notifications | Grant browser notification permission |
| Tasks not saving | Ensure localStorage enabled (not in private mode) |
| Data lost | Restore from backup JSON file |
| Settings reset | Click "Reset ke Pengaturan Default" |

---

## 📊 Key Metrics

- **Total Pomodoro:** Sessions completed today
- **Completed Tasks:** Checkmarked items today
- **Focus Time:** Total minutes of work today
- **Current Streak:** Consecutive days with sessions

---

**Happy studying! 🎓**
