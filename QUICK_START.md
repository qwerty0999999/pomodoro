# 📚 Study-Flow Dashboard - Panduan Langkah Demi Langkah

## ✅ Status Implementasi

✅ **Semua Fitur Sudah Diimplementasikan & Running!**

---

## 🎯 3 Komponen Utama yang Sudah Aktif

### 1️⃣ **Pomodoro Timer** ⏱️ (Sidebar Kiri)
- ✅ Mode Work/Break yang dapat diganti
- ✅ Timer countdown dengan animasi pulsing
- ✅ Durasi customizable untuk work dan break
- ✅ Notifikasi alert saat timer selesai
- ✅ Tombol Play/Pause/Reset

### 2️⃣ **Eisenhower Matrix** 📋 (Main Content)
- ✅ 4 Kuadran dengan warna berbeda (Red, Blue, Orange, Gray)
- ✅ Input field untuk menambah tugas di setiap kuadran
- ✅ Checkbox untuk menandai tugas selesai
- ✅ Delete button untuk menghapus tugas
- ✅ Animasi smooth saat tugas ditambah/dihapus/diselesaikan

### 3️⃣ **Ambient Sound Mixer** 🎵 (Sidebar Kiri, Bawah Timer)
- ✅ 4 Audio tracks: Hujan, Kafe, Hutan, White Noise
- ✅ Play/Pause button per track
- ✅ Volume slider individual (0-100%)
- ✅ Visual volume feedback dengan gradient
- ✅ Bisa mix multiple sounds sekaligus

---

## 🚀 Cara Menjalankan

### Di Terminal:
```bash
# Masuk folder project
cd "d:\a projek\study-flow"

# Pastikan dependencies terinstall
npm install

# Jalankan development server
npm run dev

# Server siap di http://localhost:3000
```

### Akses Application:
```
http://localhost:3000
```

---

## 📖 Tutorial Penggunaan

### 🎯 Menggunakan Pomodoro Timer

1. **Set durasi kerja** (default 25 menit):
   - Klik tombol `+` di bawah "Durasi Kerja (menit)"
   - Atau klik `-` untuk mengurangi

2. **Set durasi istirahat** (default 5 menit):
   - Klik tombol `+` di bawah "Durasi Istirahat (menit)"

3. **Mulai timer**:
   - Klik tombol Play (▶️)
   - Timer akan mulai countdown

4. **Pause/Resume**:
   - Klik tombol Pause (⏸️) untuk jeda
   - Klik lagi untuk lanjutkan

5. **Reset timer**:
   - Klik tombol Reset (↻) untuk mulai ulang

6. **Ganti mode**:
   - Klik tombol "Ganti ke Istirahat" atau "Ganti ke Kerja"

---

### 📋 Menggunakan Eisenhower Matrix

1. **Memahami 4 Kuadran**:
   - 🔴 **Q1 - Kerjakan Sekarang**: Penting & Mendesak
     - Contoh: Bikin slide presentasi yang due tomorrow
   
   - 🔵 **Q2 - Jadwalkan**: Penting & Tidak Mendesak
     - Contoh: Belajar bahasa pemrograman baru
   
   - 🟠 **Q3 - Delegasi**: Tidak Penting & Mendesak
     - Contoh: Reply email dari teman
   
   - ⚫ **Q4 - Hapus**: Tidak Penting & Tidak Mendesak
     - Contoh: Scroll social media

2. **Tambah tugas**:
   - Ketik nama tugas di input field kuadran pilihan
   - Tekan `ENTER` atau klik tombol `+`
   - Tugas akan muncul dalam kuadran dengan animasi

3. **Tandai tugas selesai**:
   - Hover pada tugas
   - Klik checkbox di sebelah kiri tugas
   - Tugas akan berubah warna dan strikethrough

4. **Hapus tugas**:
   - Hover pada tugas
   - Klik tombol trash (🗑️) di kanan tugas
   - Tugas akan hilang dengan animasi

---

### 🎵 Menggunakan Ambient Sound Mixer

1. **Pilih suara**:
   - Klik tombol **Play** (▶️) pada track yang ingin diputar
   - Tombol akan berubah warna menjadi hijau dan menampilkan **Pause**

2. **Atur volume**:
   - Drag slider untuk setiap track
   - Lihat persentase volume di sebelah kanan track
   - Default volume untuk semua adalah 30%

3. **Kombinasi suara**:
   - Mainkan beberapa track sekaligus
   - Misal: Hujan (50%) + Kafe (40%) untuk fokus optimal

4. **Hentikan suara**:
   - Klik tombol **Pause** (⏸️) untuk stop track
   - Atau volume menjadi 0% untuk silent

---

## 💡 Contoh Workflow Belajar Efektif

### Skenario 1: Belajar Algoritma 2 Jam
```
⏱️  Work Duration: 50 menit
⏱️  Break Duration: 10 menit

🎵 Ambient Mix:
   - Kafe: 60% (untuk fokus)
   - Hujan: 40% (untuk relaksasi)

📋 Tasks Q1 (Prioritas Tinggi):
   - Review soal-soal sorting algorithm
   - Implementasi quicksort dari scratch
   - Debug kode yang sudah dibuat

📋 Tasks Q2 (Planifikasi):
   - Baca chapter 5 buku DSA
   - Coba problem leetcode

🔄 Workflow:
   1. Mulai timer 50 menit
   2. Fokus pada Q1 tasks
   3. Saat alarm, ambil break 10 menit
   4. Ulangi 2x cycle
   5. Total waktu fokus: 100 menit ✅
```

### Skenario 2: Belajar Programming Santai
```
⏱️  Work Duration: 25 menit (standard Pomodoro)
⏱️  Break Duration: 5 menit

🎵 Ambient Mix:
   - White Noise: 50%
   - Hutan: 30%

📋 Tasks:
   - Q1: Fix critical bugs
   - Q2: Learn new framework feature
   - Q3: Reply code review
   - Q4: (Keep empty atau delete)

🔄 Workflow:
   - 4-5 cycles per jam = 100-125 menit fokus
   - Very sustainable dan tidak exhausting
```

---

## 🎨 Design & Aesthetic

### Color Scheme
- **Background**: Dark slate (Slate-950/900/800)
- **Accents**: Blue, Emerald, Cyan gradients
- **Q1**: Red/Red-500 (urgent priority)
- **Q2**: Blue/Blue-500 (important planning)
- **Q3**: Orange/Orange-500 (delegate)
- **Q4**: Gray/Gray-500 (eliminate)

### Animation Effects
- **Smooth transitions**: 200-300ms easing
- **Hover effects**: Scale 1.05-1.1
- **Staggered animations**: 50-100ms delay per item
- **Backdrop blur**: Glassmorphism effect

### Typography
- **Main Title**: 48-60px (gradient text)
- **Section Headers**: 24-32px
- **Task Text**: 14-16px
- **Small Labels**: 12-14px

---

## 🔧 Technical Details

### State Management (Zustand)
```typescript
// Audio State
tracks: [
  { id: 'rain', name: 'Hujan', volume: 30, isPlaying: false },
  { id: 'coffee', name: 'Kafe', volume: 30, isPlaying: false },
  { id: 'forest', name: 'Hutan', volume: 30, isPlaying: false },
  { id: 'white-noise', name: 'White Noise', volume: 30, isPlaying: false }
]

// Task State
tasks: [
  { id: '1', title: 'Task name', importance: true, urgency: true, ... },
  { id: '2', title: 'Task name 2', importance: true, urgency: false, ... }
]
```

### Performance Optimizations
- ✅ Client-side rendering (`'use client'`)
- ✅ Zustand for efficient state updates
- ✅ Memo-ized components
- ✅ Audio refs to prevent re-renders
- ✅ Event delegation untuk task interactions

---

## 📱 Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Recommended |
| Firefox | ✅ Full | Good support |
| Safari | ✅ Full | Audio might need permission |
| Edge | ✅ Full | Same as Chrome (Chromium) |

---

## 🛠️ Maintenance & Troubleshooting

### Q: Audio tidak terdengar?
**A**: 
- Browser mencegah autoplay. Click Play button terlebih dahulu
- Pastikan volume komputer tidak mute
- Cek browser console untuk error messages

### Q: Timer tidak akurat?
**A**:
- Jika browser tab inactive, sistem operasi mengurangi FPS
- Keep tab in focus untuk accuracy terbaik
- Accuracy ±1 detik adalah normal

### Q: Tasks hilang setelah refresh?
**A**:
- Data disimpan di memory (Zustand), bukan persistent storage
- Feature untuk save ke localStorage dapat ditambahkan di Roadmap

### Q: Ambient sound berhenti saat tab switch?
**A**:
- Browser pause audio ketika tab tidak active
- Feature foreground/background control dapat ditambahkan

---

## 📈 Roadmap Fitur Mendatang

- [ ] **LocalStorage Persistence** - Simpan tasks & settings
- [ ] **User Authentication** - Login & cloud sync
- [ ] **Statistics Dashboard** - Track productivity metrics
- [ ] **Custom Sounds** - Upload audio files sendiri
- [ ] **Notifications** - Browser notifications untuk timer complete
- [ ] **Dark/Light Theme** - Toggle theme preference
- [ ] **Mobile Responsive UI** - Optimize untuk mobile
- [ ] **Browser Extension** - Minimize distractions

---

## ✨ Tips Produktivitas

1. **Gunakan Pomodoro 25-50 menit** - Sesuaikan dengan stamina Anda
2. **Prioritas Q1 terlebih dahulu** - Focus pada urgent & important
3. **Mix ambient sounds** - Coba kombinasi berbeda untuk optimal
4. **Atur break time** - Jangan skip break, penting untuk recovery
5. **Hapus Q4 tasks** - Kurangi distraction dengan delete tasks yang tidak penting
6. **Review Q2 tasks** - Pindahkan planning tasks ke Q1 ketika deadline nearby

---

## 📞 Support & Feedback

Project ini dibuat untuk membantu Anda fokus & produktif belajar.

Jika ada saran atau bug report, silakan:
- Check console untuk error messages
- Verify browser compatibility
- Test di browser lain untuk isolation

---

**Happy Learning! 🎓**

Study-Flow v1.0 | January 2026
