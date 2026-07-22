import { useSiteData } from '../context/SiteDataContext';

export default function Hero() {
  const { hero, padukuhan } = useSiteData();

  return (
    <section
      id="beranda"
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
      style={{
        background:
          'linear-gradient(150deg, #421808 0%, #783414 45%, #b54a12 100%)',
      }}
    >
      {/* ─── VIDEO BACKGROUND PENGGANTI GAMBAR ─── */}
      {/* Pastikan file video bernama hero-video.mp4 diletakkan di dalam folder public/assets/ */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      >
        <source src="/assets/Video-for-Website/For-Website-2.mp4" type="video/mp4" />
      </video>
      {/* ────────────────────────────────────────── */}

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center py-24">
        {/* Accent line */}
        <div className="w-10 h-2px bg-orange-400/50 mx-auto mb-8" />

        {/* Location */}
        <p className="text-orange-100/80 text-[11px] font-medium uppercase tracking-[0.25em] mb-7">
          {padukuhan.desa} · {padukuhan.kecamatan} · {padukuhan.kabupaten}
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-snug mb-5">
          {hero.title}
        </h1>

        <p className="text-white/40 text-[15px] max-w-lg mx-auto mb-10 leading-relaxed font-light">
          {hero.subtitle}
        </p>

        {/* CTA — bordered, fills on hover */}
        <a
          href="#umkm"
          className="inline-flex items-center gap-2.5 px-7 py-3 border border-white/20 text-white text-sm font-medium rounded-lg hover:bg-white hover:text-orange-500 transition-all duration-300"
        >
          {hero.ctaText}
          <span className="opacity-50">→</span>
        </a>
      </div>

      {/* Bottom fade into next section */}
      {/* Catatan: bg-linear-to-t diperbaiki menjadi bg-gradient-to-t (standar Tailwind) */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-warm-100 to-transparent pointer-events-none" />
    </section>
  );
}