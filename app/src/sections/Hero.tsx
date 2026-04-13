import { useEffect, useRef } from 'react';
import { Play, ChevronDown } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );

    const elements = heroRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        <img
          src="/images/portfolio/stills/Gangrena(1).jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Logo */}
        <div className="reveal mb-8">
          <img
            src="/images/logo/logo.png"
            alt="Vortex Studio"
            className="h-24 md:h-32 w-auto mx-auto"
          />
        </div>

        {/* Main Title */}
        <h1 className="reveal stagger-1 text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
          <span className="text-white">Damos vida a tus</span>
          <br />
          <span className="vortex-text">historias</span>
        </h1>

        {/* Subtitle */}
        <p className="reveal stagger-2 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Productora audiovisual chilena especializada en videoclips musicales,
          fotografía y contenido cinematográfico. Transformamos visiones en
          experiencias visuales inolvidables.
        </p>

        {/* CTA Buttons */}
        <div className="reveal stagger-3 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => scrollToSection('#portafolio')}
            className="btn-vortex flex items-center gap-2"
          >
            <Play size={18} fill="currentColor" />
            Ver Portafolio
          </button>
          <button
            onClick={() => scrollToSection('#contacto')}
            className="btn-outline"
          >
            Contáctanos
          </button>
        </div>

        {/* Stats */}
        <div className="reveal stagger-4 mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold vortex-text">24+</div>
            <div className="text-xs md:text-sm text-gray-400 mt-1">Proyectos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold vortex-text">11</div>
            <div className="text-xs md:text-sm text-gray-400 mt-1">Profesionales</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold vortex-text">3+</div>
            <div className="text-xs md:text-sm text-gray-400 mt-1">Años</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <button
          onClick={() => scrollToSection('#nosotros')}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
