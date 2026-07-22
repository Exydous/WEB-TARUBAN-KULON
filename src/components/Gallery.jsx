import { useState } from 'react';

export default function Gallery() {
  // ─── PENGATURAN PASSWORD ───
  // Ubah kata sandi di bawah ini sesuai keinginan Anda
  const SECRET_PASSWORD = "280805"; 

  // ─── STATE UNTUK SISTEM KUNCI ───
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // ─── DATA ANGGOTA KKN ───
  const kknMembers = [
    // ─── BARISAN BELAKANG ───
    { 
      id: 1, 
      name: "Zidane (Ketua)", 
      x: "28%", y: "25%", rx: "7%", ry: "16%",
      image: "/assets/1.png", 
      personalPhotos: ["/assets/Members/zidane.JPG", "/assets/Members/zidane_2.JPG", "/assets/Members/zidane_3.JPG"]
    },
    { id: 2, name: "Tio (Logistik)", x: "43%", y: "30%", rx: "7%", ry: "16%", image: "/assets/2.png", personalPhotos: ["/assets/Members/tio.JPG", "/assets/Members/tio_2.JPG", "/assets/Members/tio_3.JPG"] },
    { id: 3, name: "Syafrida (Humas)", x: "52%", y: "32%", rx: "7%", ry: "16%", image: "/assets/3.png", personalPhotos: ["/assets/Members/syafrida.JPG", "/assets/Members/syafrida_2.JPG", "/assets/Members/syafrida_3.JPG"] },
    { id: 4, name: "Almas (Logistik)", x: "60%", y: "30%", rx: "7%", ry: "16%", image: "/assets/4.png", personalPhotos: ["/assets/Members/almas.JPG", "/assets/Members/almas_2.JPG", "/assets/Members/almas_3.JPG"] },
    { id: 5, name: "Hisyam (Medinfo)", x: "71%", y: "26%", rx: "7%", ry: "16%", image: "/assets/5.png", personalPhotos: ["/assets/Members/hisyam.JPG", "/assets/Members/hisyam_2.JPG", "/assets/Members/hisyam_3.JPG"] },

    // ─── BARISAN DEPAN ───
    { id: 6, name: "Firda (Bendahara)", x: "23%", y: "60%", rx: "8%", ry: "22%", image: "/assets/6.png", personalPhotos: ["/assets/Members/firda.JPG", "/assets/Members/firda_2.JPG", "/assets/Members/firda_3.JPG"] },
    { id: 7, name: "Haifa (Sekretaris)", x: "39%", y: "60%", rx: "8%", ry: "22%", image: "/assets/7.png", personalPhotos: ["/assets/Members/haifa.JPG", "/assets/Members/haifa_2.JPG", "/assets/Members/haifa_3.JPG"] },
    { id: 8, name: "Artika (Medinfo)", x: "52%", y: "58%", rx: "8%", ry: "22%", image: "/assets/8.png", personalPhotos: ["/assets/Members/artika.JPG", "/assets/Members/artika_2.JPG", "/assets/Members/artika_3.JPG"] },
    { id: 9, name: "Devina (Humas)", x: "64%", y: "62%", rx: "8%", ry: "22%", image: "/assets/9.png", personalPhotos: ["/assets/Members/devina.JPG", "/assets/Members/devina_2.JPG", "/assets/Members/devina_3.JPG"] },
    { id: 10, name: "Wawa (Sekretaris)", x: "78%", y: "65%", rx: "8%", ry: "24%", image: "/assets/10.png", personalPhotos: ["/assets/Members/wawa.JPG", "/assets/Members/wawa_2.JPG", "/assets/Members/wawa_3.JPG"] },
  ];

  // ─── DATA OUR STORIES ───
  const ourStories = [
    { 
      id: 1, 
      title: "1st Weeks of KKN", 
      thumbnail: "/assets/Our-Stories/1st-Weeks/1st-1.JPG", 
      modalCover: "/assets/Our-Stories/1st-Weeks/1st-1.JPG", 
      modalGallery: [
        "/assets/Our-Stories/1st-Weeks/1st-2.JPG",
        "/assets/Our-Stories/1st-Weeks/1st-3.JPG",
        "/assets/Our-Stories/1st-Weeks/1st-4.jpg",
        "/assets/Our-Stories/1st-Weeks/1st-5.jpg",
        "/assets/Our-Stories/1st-Weeks/1st-6.jpg",
        "/assets/Our-Stories/1st-Weeks/1st-7.jpg",
        "/assets/Our-Stories/1st-Weeks/1st-8.jpg",
        "/assets/Our-Stories/1st-Weeks/1st-9.jpg",
        "/assets/Our-Stories/1st-Weeks/1st-10.jpg"
      ],
      driveLink: "https://drive.google.com/drive/folders/LINK_FOLDER_SOSIALISASI" 
    },
    { 
      id: 2, 
      title: "2nd Weeks of KKN", 
      thumbnail: "/assets/Our-Stories/2nd-Weeks/2nd-3.jpg", 
      modalCover: "/assets/Our-Stories/2nd-Weeks/2nd-3.jpg",
      modalGallery: [
        "/assets/Our-Stories/2nd-Weeks/2nd-1.jpg",
        "/assets/Our-Stories/2nd-Weeks/2nd-2.jpg",
        "/assets/Our-Stories/2nd-Weeks/2nd-4.jpg",
        "/assets/Our-Stories/2nd-Weeks/2nd-5.jpg",
        "/assets/Our-Stories/2nd-Weeks/2nd-6.jpg",
        "/assets/Our-Stories/2nd-Weeks/2nd-7.jpg",
        "/assets/Our-Stories/2nd-Weeks/2nd-8.jpg",
        "/assets/Our-Stories/2nd-Weeks/2nd-9.jpg",
        "/assets/Our-Stories/2nd-Weeks/2nd-10.jpg"
      ],
      driveLink: "https://drive.google.com/drive/folders/15Zkap2A7-8tpi9P0oeioiD-XQCKWpGT1?usp=drive_link" 
    },
    { 
      id: 3, 
      title: "3rd Weeks of KKN", 
      thumbnail: "/assets/umkm_thumb.jpg", 
      modalCover: "/assets/umkm_cover.jpg",
      modalGallery: [],
      driveLink: "https://drive.google.com/drive/folders/LINK_FOLDER_UMKM" 
    },
  ];

  const [isHovered, setIsHovered] = useState(false);
  const [activeSpotlight, setActiveSpotlight] = useState(kknMembers[0] || {}); 
  
  // ─── STATE POP-UP ───
  const [selectedMember, setSelectedMember] = useState(null); // Pop-up Wajah Anggota
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0); 
  const [selectedStory, setSelectedStory] = useState(null); // Pop-up Album Our Stories
  
  // ─── STATE LIGHTBOX (PREVIEW FULLSCREEN GAMBAR) ───
  const [selectedImagePreview, setSelectedImagePreview] = useState(null);

  // Fungsi Panah Slider Wajah Anggota
  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    setCurrentPhotoIndex((prev) => prev === 0 ? selectedMember.personalPhotos.length - 1 : prev - 1);
  };
  const handleNextPhoto = (e) => {
    e.stopPropagation();
    setCurrentPhotoIndex((prev) => prev === selectedMember.personalPhotos.length - 1 ? 0 : prev + 1);
  };

  // Fungsi untuk Mengecek Password
  const handleUnlock = (e) => {
    e.preventDefault(); 
    if (passwordInput === SECRET_PASSWORD) {
      setIsUnlocked(true); 
      setErrorMessage('');
    } else {
      setErrorMessage('Kata sandi salah. Silakan coba lagi!');
      setPasswordInput(''); 
    }
  };

  // ====================================================================================
  // TAMPILAN 1: LAYAR KUNCI (MUNCUL JIKA isUnlocked == false)
  // ====================================================================================
  if (!isUnlocked) {
    return (
      <section className="min-h-screen bg-[#121212] flex items-center justify-center px-4 relative overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-900/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative max-w-md w-full bg-[#1a1a1a] p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl text-center">
          {/* Ikon Gembok */}
          <div className="w-20 h-20 bg-black/50 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <svg className="w-10 h-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2">Galeri Terkunci</h2>
          <p className="text-gray-400 text-sm mb-8">
            Halaman ini belum sepenuhnya jadi.
          </p>

          <form onSubmit={handleUnlock} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Masukkan kata sandi..."
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all text-center tracking-widest"
              autoFocus
            />
            {errorMessage && (
              <p className="text-red-400 text-sm animate-pulse">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-xl px-5 py-4 transition-all duration-300 hover:shadow-[0_0_20px_rgba(234,88,12,0.3)] mt-2"
            >
              Buka Galeri
            </button>
          </form>
        </div>
      </section>
    );
  }

  // ====================================================================================
  // TAMPILAN 2: HALAMAN GALERI UTAMA (MUNCUL JIKA isUnlocked == true)
  // ====================================================================================
  return (
    <section id="galeri" className="py-16 md:py-24 bg-[#121212] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── BAGIAN 1: FOTO GRUP INTERAKTIF ─── */}
        <div className="mb-24">
          <p className="text-center text-gray-400 mb-8 font-medium uppercase tracking-widest">
            TARUBAN KULON KKN 2026 TEAMS
          </p>
          
          <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl bg-black">
            <img src="/assets/DSCF9308.JPG" alt="Tim KKN" className="w-full h-auto block" />
            <div className={`absolute inset-0 bg-black/75 transition-opacity duration-500 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

            {kknMembers.map((member) => (
              member.image && (
                <img 
                  key={`cutout-${member.id}`}
                  src={member.image} 
                  alt={`Highlight ${member.name}`}
                  className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none ${
                    isHovered && activeSpotlight?.id === member.id ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              )
            ))}

            {kknMembers.map((member) => (
              <div
                key={member.id}
                onMouseEnter={() => { setActiveSpotlight(member); setIsHovered(true); }}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => { setSelectedMember(member); setCurrentPhotoIndex(0); }}
                className="absolute z-10 cursor-pointer"
                style={{
                  left: `calc(${member.x} - ${member.rx})`, top: `calc(${member.y} - ${member.ry})`,
                  width: `calc(${member.rx} * 2)`, height: `calc(${member.ry} * 2)`,
                }}
              >
                <div className={`absolute top-[110%] left-1/2 -translate-x-1/2 bg-[#1a1a1a]/90 backdrop-blur-md text-gray-100 text-sm font-medium px-5 py-2.5 rounded-full whitespace-nowrap shadow-2xl border border-white/10 transition-all duration-300 pointer-events-none flex flex-col items-center ${
                    isHovered && activeSpotlight?.id === member.id ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-95'
                  }`}
                >
                  <span>{member.name}</span>
                  <span className="text-[10px] text-orange-400 mt-0.5">Klik untuk lihat foto</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── BAGIAN 2: OUR STORIES ─── */}
        <div>
          <h3 className="text-3xl font-bold text-white mb-10 text-center">Our Stories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {ourStories.map((story) => (
              <div 
                key={story.id} 
                onClick={() => setSelectedStory(story)}
                className="group relative h-72 rounded-2xl overflow-hidden shadow-lg bg-gray-800 border border-white/5 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gray-900"></div>
                <img 
                  src={story.thumbnail} 
                  alt={story.title} 
                  className="relative z-10 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                  onError={(e) => {e.target.style.display = 'none'}}
                />
                <div className="absolute inset-0 z-20 bg-linear-to-t from-black/95 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="w-full">
                    <p className="text-white font-bold text-2xl mb-1">{story.title}</p>
                    <p className="text-orange-400 text-sm font-medium flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                      Buka Album <span aria-hidden="true">&rarr;</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ─── MODAL 1: SLIDER GALERI PRIBADI (Kursor Wajah) ─── */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md transition-all duration-300">
          <div className="relative w-full max-w-5xl bg-[#1a1a1a] rounded-2xl p-5 md:p-8 border border-white/10 shadow-2xl flex flex-col">
            <button onClick={() => setSelectedMember(null)} className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-400 hover:text-white bg-black/50 hover:bg-red-500 rounded-full p-2 transition-colors z-20">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="mb-6 pr-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Galeri {selectedMember.name}</h3>
            </div>

            {selectedMember.personalPhotos && selectedMember.personalPhotos.length > 0 ? (
              <div className="relative w-full aspect-video bg-black/50 rounded-xl overflow-hidden flex items-center justify-center group border border-white/5">
                <img 
                  src={selectedMember.personalPhotos[currentPhotoIndex]} 
                  alt={`Kegiatan ${selectedMember.name}`} 
                  className="max-w-full max-h-full object-contain cursor-pointer"
                  onClick={() => setSelectedImagePreview(selectedMember.personalPhotos[currentPhotoIndex])} // Klik untuk Zoom
                />
                
                {selectedMember.personalPhotos.length > 1 && (
                  <>
                    <button onClick={handlePrevPhoto} className="absolute left-3 md:left-6 p-2 md:p-3 bg-black/60 hover:bg-orange-600 text-white rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 hover:scale-110">
                      <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button onClick={handleNextPhoto} className="absolute right-3 md:right-6 p-2 md:p-3 bg-black/60 hover:bg-orange-600 text-white rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 hover:scale-110">
                      <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-white text-xs font-semibold tracking-widest border border-white/10">
                      {currentPhotoIndex + 1} / {selectedMember.personalPhotos.length}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-black/30 rounded-xl border border-white/5">
                <p className="text-gray-400 italic">Belum ada foto kegiatan yang ditambahkan untuk anggota ini.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── MODAL 2: OUR STORIES (9 Gambar + Tombol Drive) ─── */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-md transition-all duration-300">
          
          <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#1a1a1a] rounded-2xl border border-white/10 shadow-2xl custom-scrollbar">
            
            {/* Tombol Tutup (Melayang & Sticky) */}
            <div className="sticky top-0 z-30 flex justify-end p-4 bg-linear-to-b from-[#1a1a1a] to-transparent pointer-events-none">
              <button
                onClick={() => setSelectedStory(null)}
                className="pointer-events-auto text-gray-400 hover:text-white bg-black/80 hover:bg-red-500 rounded-full p-2.5 transition-colors shadow-lg border border-white/10"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 pb-10 md:px-10 -mt-8">
              {/* Header Modal */}
              <div className="mb-8 text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">{selectedStory.title}</h3>
                <div className="w-16 h-1.5 bg-orange-500 mx-auto rounded-full"></div>
              </div>

              {/* Gambar Cover Utama (Dapat Diklik untuk Fullscreen) */}
              <div 
                onClick={() => setSelectedImagePreview(selectedStory.modalCover)}
                className="group relative w-full h-64 md:h-400px rounded-2xl overflow-hidden mb-8 bg-black/50 border border-white/5 cursor-pointer"
              >
                <img 
                  src={selectedStory.modalCover} 
                  alt={`${selectedStory.title} Cover`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {e.target.style.display = 'none'}}
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-sm font-medium bg-black/60 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm">
                    🔍 Klik untuk memperbesar
                  </span>
                </div>
              </div>

              {/* Grid 9 Gambar (Dapat Diklik untuk Fullscreen) */}
              {selectedStory.modalGallery && selectedStory.modalGallery.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 mb-10">
                  {selectedStory.modalGallery.slice(0, 9).map((imgUrl, index) => (
                    <div 
                      key={index} 
                      onClick={() => setSelectedImagePreview(imgUrl)} // KLIK GAMBAR
                      className="group relative aspect-square rounded-xl overflow-hidden bg-black/50 border border-white/5 cursor-pointer"
                    >
                      <img 
                        src={imgUrl} 
                        alt={`${selectedStory.title} ${index + 1}`} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {e.target.style.display = 'none'}}
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tombol Lihat Selengkapnya */}
              <div className="flex justify-center mt-8 pb-4">
                <a 
                  href={selectedStory.driveLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(234,88,12,0.4)]"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/>
                  </svg>
                  Lihat Selengkapnya di Google Drive
                </a>
              </div>
            </div>
            
          </div>
        </div>
      )}

      {/* ─── MODAL 3: LIGHTBOX PREVIEW (Tampilan Layar Penuh Saat Gambar Diklik) ─── */}
      {selectedImagePreview && (
        <div 
          onClick={() => setSelectedImagePreview(null)} // Klik di mana saja untuk menutup
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg cursor-zoom-out animate-fadeIn"
        >
          {/* Tombol Tutup Silang */}
          <button
            onClick={() => setSelectedImagePreview(null)}
            className="absolute top-6 right-6 text-white bg-white/10 hover:bg-red-500 rounded-full p-3 transition-colors z-10"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Gambar Fullscreen */}
          <div className="relative max-w-6xl max-h-[90vh] flex items-center justify-center">
            <img 
              src={selectedImagePreview} 
              alt="Preview Full" 
              className="max-w-full max-h-[88vh] object-contain rounded-lg shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()} // Supaya kalau gambarnya diklik tidak menutup otomatis
            />
          </div>
        </div>
      )}

    </section>
  );
}