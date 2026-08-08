import { useState, useEffect, useRef } from 'react';
import { useSiteData } from '../context/SiteDataContext';

export default function Potensi() {
  const { fasilitas, umkm, kebudayaan, loading } = useSiteData();
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Referensi KHUSUS untuk judul utama saja
  const titleRef = useRef(null);

  // ─── EFEK ANIMASI MEMBESAR-MENGECIL RAKSASA ───
  useEffect(() => {
    const handleScroll = () => {
      if (titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        const elementCenter = rect.top + rect.height / 2;
        const screenCenter = windowHeight / 2;
        
        const distance = Math.abs(screenCenter - elementCenter);
        const maxDistance = windowHeight / 2; 
        
        // Logika skala: dari ukuran 1x (terjauh) membesar ke 2.5x (di tengah)
        let newScale = 2.5 - (distance / maxDistance) * 1.5;
        
        // Kunci ukuran agar tidak kurang dari 1x dan tidak lebih dari 2.5x
        newScale = Math.max(1, Math.min(newScale, 2.5));
        
        titleRef.current.style.transform = `scale(${newScale})`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ─── KOMPONEN KARTU (CARD) ───
  const Card = ({ item }) => (
    <div 
      onClick={() => setSelectedItem(item)}
      className="cursor-pointer group bg-white rounded-2xl overflow-hidden shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      <div className="relative h-52 bg-gray-200 overflow-hidden">
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/500x300?text=Tidak+Ada+Gambar'; }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
            Tidak ada gambar
          </div>
        )}
        {item.category && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm">
            {item.category}
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col grow">
        <h3 className="text-[17px] font-bold text-gray-900 mb-1.5 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {item.name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-5 grow">
          {item.description || 'Tidak ada deskripsi tersedia.'}
        </p>
        
        <div className="flex items-center gap-2 mt-auto">
          <div className="flex-1 text-center bg-orange-600 group-hover:bg-orange-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors shadow-sm">
            Lihat Detail
          </div>
          
          {item.gmaps && (
            <a
              href={item.gmaps}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors shrink-0"
              title="Lihat di Google Maps"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-warm-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-warm-50 pb-24 overflow-x-hidden">
      
      {/* ════════════ HEADER KHUSUS: DATA POTENSI ════════════ */}
      {/* Diberi min-h-[70vh] agar bertindak sebagai section mandiri yang terpisah */}
      <section className="w-full min-h-[70vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="will-change-transform origin-center text-center">
          <h1 className="text-5xl md:text-7xl font-black text-orange-600 tracking-tighter uppercase leading-none mb-6">
            Data Potensi
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto mt-4 font-medium">
            Rekomendasi Cepat Potensi Padukuhan Taruban Kulon
          </p>
        </div>
      </section>

      {/* ════════════ DIREKTORI FASILITAS ════════════ */}
      {fasilitas && fasilitas.length > 0 && (
        <section id="fasilitas" className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a3622] mb-4">
              Direktori Fasilitas
            </h2>
            <div className="w-12 h-1.5 bg-orange-500 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed">
              Informasi mengenai fasilitas publik dan sarana umum yang tersedia di Padukuhan Taruban Kulon untuk mendukung kegiatan warga.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {fasilitas.map((item) => (
              <Card key={`fasilitas-${item.id}`} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* ════════════ DIREKTORI UMKM ════════════ */}
      {umkm && umkm.length > 0 && (
        <section id="umkm" className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a3622] mb-4">
              Direktori UMKM
            </h2>
            <div className="w-12 h-1.5 bg-orange-500 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed">
              Produk UMKM unggulan dari Padukuhan Taruban Kulon. Dukung ekonomi lokal dengan membeli langsung dari warga kami.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {umkm.map((item) => (
              <Card key={`umkm-${item.id}`} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* ════════════ DIREKTORI BUDAYA ════════════ */}
      {kebudayaan && kebudayaan.length > 0 && (
        <section id="budaya" className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a3622] mb-4">
              Direktori Budaya
            </h2>
            <div className="w-12 h-1.5 bg-orange-500 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed">
              Ragam kesenian dan kearifan lokal Padukuhan Taruban Kulon yang masih terus dijaga dan dilestarikan oleh masyarakat.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {kebudayaan.map((item) => (
              <Card key={`budaya-${item.id}`} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* ════════════ MODAL POPUP (LIHAT DETAIL) ════════════ */}
      {selectedItem && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm transition-opacity">
          <div className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-gray-600 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="w-full h-64 sm:h-80 bg-gray-100">
              {selectedItem.image ? (
                <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">Tidak ada foto</div>
              )}
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {selectedItem.category || 'Detail'}
                </span>
                {selectedItem.qris && (
                  <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full border border-blue-100">
                    Menerima QRIS
                  </span>
                )}
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{selectedItem.name}</h2>
              <p className="text-gray-600 leading-relaxed mb-8 whitespace-pre-wrap">
                {selectedItem.description || 'Tidak ada deskripsi lebih lanjut untuk item ini.'}
              </p>

              <div className="flex flex-wrap gap-3">
                {selectedItem.whatsapp && (
                  <a
                    href={`https://wa.me/${selectedItem.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.305-.88-.653-1.474-1.46-1.646-1.757-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Hubungi via WhatsApp
                  </a>
                )}
                {selectedItem.gmaps && (
                  <a
                    href={selectedItem.gmaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    Buka di Google Maps
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}