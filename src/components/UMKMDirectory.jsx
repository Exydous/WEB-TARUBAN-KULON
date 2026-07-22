import { useState, useEffect, useRef } from 'react';
import { useSiteData } from '../context/SiteDataContext';

export default function UMKMDirectory() {
  const { umkm } = useSiteData();
  
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);
  const [selectedUMKM, setSelectedUMKM] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top, bottom } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (top <= 0 && bottom >= windowHeight) {
        const scrolled = -top;
        const maxScroll = bottom - top - windowHeight;
        const progress = scrolled / maxScroll;
        const newScale = Math.max(0.3, 1 - progress * 0.7);
        setScale(newScale);
      } else if (top > 0) {
        setScale(1);
      } else if (bottom < windowHeight) {
        setScale(0.3);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (selectedUMKM) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedUMKM]);

  return (
    <section id="umkm" className="bg-white relative">
      
      {/* ─── HEADER SCROLL ─── */}
      <div ref={containerRef} className="relative h-[150vh]">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-4">
          <h2
            style={{ transform: `scale(${scale})`, transition: 'transform 0.1s ease-out' }}
            className="text-6xl md:text-[10rem] text-center font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-orange-300 to-orange-600 leading-tight"
          >
            Data UMKM
          </h2>
          <p 
            style={{ opacity: scale === 1 ? 1 : Math.max(0, scale - 0.2) }}
            className="mt-6 text-gray-500 text-lg md:text-xl font-medium text-center transition-opacity"
          >
            Rekomendasi Cepat Potensi Padukuhan Taruban Kulon
          </p>
        </div>
      </div>

      {/* ─── DAFTAR KARTU UMKM ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 relative z-10 -mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {umkm && umkm.length > 0 ? (
            umkm.map((item, index) => (
              {/* 1. Tambahkan fungsi onClick dan kursor penunjuk di sini */},
              <div 
                key={index} 
                onClick={() => setSelectedUMKM(item)}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group"
              >
                
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded text-gray-700 shadow-sm">
                    {item.category || 'UMKM'}
                  </span>
                </div>
                
                <div className="p-5 flex flex-col grow">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#DE6B28] transition-colors">{item.name}</h3>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2 grow">{item.description}</p>
                  
                  <div className="flex gap-2 mt-5">
                    {/* Tombol Lihat Detail sekarang berfungsi sebagai pemanis visual karena seluruh kartu sudah bisa diklik */}
                    <button className="flex-1 bg-gray-50 text-gray-700 hover:bg-[#DE6B28] hover:text-white py-2 rounded-lg text-sm font-medium transition-colors border border-gray-100">
                      Lihat Detail
                    </button>
                    
                    {item.locationUrl && (
                      <a 
                        href={item.locationUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        title="Lihat Peta Lokasi"
                        onClick={(e) => e.stopPropagation()} // 2. Mencegah modal terbuka jika yang diklik adalah tombol lokasi
                        className="p-2 border border-gray-100 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors flex items-center justify-center"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">Belum ada data UMKM.</p>
          )}
          
        </div>
      </div>

      {/* ─── MODAL (POPUP) DETAIL UMKM ─── */}
      {selectedUMKM && (
        <div 
          className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity" 
          onClick={() => setSelectedUMKM(null)} 
        >
          <div 
            className="bg-white w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl relative animate-fadeInUp" 
            onClick={e => e.stopPropagation()} 
          >
            <button 
              onClick={() => setSelectedUMKM(null)}
              className="absolute top-3 right-3 z-10 bg-black/30 hover:bg-black/50 text-white rounded-full p-1.5 transition-colors backdrop-blur-md"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="relative h-64 w-full bg-gray-100">
              <img src={selectedUMKM.image} alt={selectedUMKM.name} className="w-full h-full object-cover" />
              <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded text-gray-700 shadow-sm">
                {selectedUMKM.category || 'UMKM'}
              </span>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900">{selectedUMKM.name}</h3>
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">{selectedUMKM.description}</p>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                {selectedUMKM.whatsapp && (
                  <a 
                    href={`https://wa.me/${selectedUMKM.whatsapp.replace(/[^0-9]/g, '')}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex-1 bg-[#DE6B28] hover:bg-[#c45b1e] text-white py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Hubungi via WhatsApp
                  </a>
                )}
                
                {selectedUMKM.locationUrl && (
                  <a 
                    href={selectedUMKM.locationUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="sm:w-auto w-full px-5 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Lokasi
                  </a>
                )}
              </div>
            </div>
            
          </div>
        </div>
      )}
      
    </section>
  );
}