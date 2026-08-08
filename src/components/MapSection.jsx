import { useSiteData } from '../context/SiteDataContext';
import { useState } from 'react';

/* ── Reusable map card — supports embed iframe, static image, or placeholder ── */
function MapCard({ data, onImageClick }) {
  const hasEmbed = Boolean(data.embedUrl);
  const hasImage = Boolean(data.image);

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-800 mb-3">{data.title}</h3>

      <div className="rounded-xl overflow-hidden border border-orange-200 bg-white">
        {hasEmbed ? (
          <iframe
            src={data.embedUrl}
            className="w-full h-80 md:h-100"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={data.title}
          />
        ) : hasImage ? (
          <img
            src={data.image}
            alt={data.title}
            // Tambahkan cursor-pointer dan efek hover agar pengguna tahu ini bisa diklik
            className="w-full h-80 md:h-100 object-cover cursor-pointer hover:opacity-90 transition-opacity"
            // Panggil fungsi saat gambar diklik
            onClick={() => onImageClick(data.image)}
          />
        ) : (
          <div className="w-full h-80 md:h-100 bg-orange-50 flex flex-col items-center justify-center text-center px-6">
            <svg
              className="w-10 h-10 text-orange-300 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
              />
            </svg>
            <p className="text-sm text-orange-500 font-medium">Belum tersedia</p>
            <p className="text-xs text-orange-400 mt-1">
              Tambahkan gambar atau embed URL di siteData.js
            </p>
          </div>
        )}
      </div>

      <p className="text-xs text-gray-400 mt-2.5">{data.description}</p>
    </div>
  );
}

export default function MapSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const { map } = useSiteData();

  // Fungsi untuk membuka modal gambar
  const handleImageClick = (imageUrl) => {
    setActiveImage(imageUrl);
    setIsOpen(true);
  };

  return (
    <section id="peta" className="py-16 md:py-24 bg-warm-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-xl mb-12">
          <p className="text-sm text-orange-600 font-medium mb-1.5">
            Lokasi &amp; Wilayah
          </p>
          <h2 className="text-2xl md:text-[1.7rem] font-semibold text-orange-900">
            Peta Padukuhan Taruban Kulon
          </h2>
        </div>

        {/* Two-column map grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Kirim fungsi handleImageClick ke dalam MapCard */}
          <MapCard data={map.wilayah} onImageClick={handleImageClick} />
          <MapCard data={map.administrasi} onImageClick={handleImageClick} />
        </div>
      </div>

      {/* ─── MODAL / LIGHTBOX FULLSCREEN ─── */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black bg-opacity-80 p-4"
          onClick={() => setIsOpen(false)} // Tutup jika area hitam diklik
        >
          <div className="relative max-w-6xl w-full max-h-[95vh] flex flex-col items-center justify-center">
            {/* Tombol Close (X) */}
            <button 
              className="absolute -top-10 right-0 text-white text-4xl font-bold hover:text-orange-400 z-50"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>
            
            {/* Gambar Full */}
            <img
              src={activeImage}
              alt="Peta Fullscreen"
              className="w-full h-full object-contain rounded bg-white p-2 cursor-default"
              onClick={(e) => e.stopPropagation()} // Mencegah tertutup jika gambarnya yang diklik
            />
          </div>
        </div>
      )}
    </section>
  );
}