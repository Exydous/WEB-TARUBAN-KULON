import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// ─── IMPORT SEMUA KOMPONEN ANDA DI SINI ───
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
import UMKMDirectory from './components/UMKMDirectory';
import MapSection from './components/MapSection';
import Footer from './components/Footer';
import Gallery from './components/Gallery';

// ─── KUMPULAN HALAMAN UTAMA (HOME) ───
// Semua komponen halaman depan diletakkan di dalam sini tanpa tanda komentar
function Home() {
  const location = useLocation();

  // 2. Ini adalah instruksi agar halaman otomatis men-scroll ke bagian yang dituju
  useEffect(() => {
    if (location.hash) {
      // Jika ada tujuan hash (misal: /#umkm), ambil kata 'umkm'-nya saja
      const targetId = location.hash.substring(1);
      const element = document.getElementById(targetId);
      
      if (element) {
        // Beri jeda sangat singkat (100 milidetik) agar halaman selesai dimuat sebelum di-scroll
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      // Jika tidak ada hash (hanya '/'), pastikan halaman kembali ke paling atas
      window.scrollTo(0, 0);
    }
  }, [location]); // Perintah ini akan dijalankan setiap kali URL berubah

  return (
    <main>
      <Hero />
      <About />
      {/* <Stats /> */}
      <UMKMDirectory />
      <MapSection />
    </main>
  );
}

// ─── PENGATUR JALUR (ROUTER) UTAMA ───
export default function App() {
  return (
    <Router>
      {/* Navbar di luar Routes agar tetap muncul di semua halaman */}
      <Navbar />
      
      <Routes>
        {/* Jika URL adalah '/' (beranda), tampilkan komponen Home di atas */}
        <Route path="/" element={<Home />} />
        
        {/* Jika URL adalah '/galeri', tampilkan halaman Gallery */}
        <Route path="/galeri" element={<Gallery />} />
      </Routes>
      
      {/* Footer juga di luar Routes agar muncul di bawah galeri maupun beranda */}
      <Footer />
    </Router>
  );
}