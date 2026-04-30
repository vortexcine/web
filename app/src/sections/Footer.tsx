import { Instagram, Mail, ArrowUp } from 'lucide-react';
import { getAssetUrl } from '@/lib/utils';
import LazyImage from '@/components/LazyImage';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navegacion: [
      { label: 'Inicio', href: '#inicio' },
      { label: 'Nosotros', href: '#nosotros' },
      { label: 'Portafolio', href: '#portafolio' },
      { label: 'Equipo', href: '#equipo' },
      { label: 'Contacto', href: '#contacto' },
    ],
    servicios: [
      { label: 'Videoclip', href: '#' },
      { label: 'Fotografía', href: '#' },
      { label: 'Make Off', href: '#' },
      { label: 'Videoclips', href: '#' },
    ],
    legal: [
      { label: 'Política de Privacidad', href: '#' },
      { label: 'Términos de Servicio', href: '#' },
    ],
  };

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative bg-black border-t border-white/10">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a href="#inicio" className="flex items-center gap-3 mb-5">
              <LazyImage
                src={getAssetUrl('/images/logo/logo.png')}
                alt="Vortex Studio"
                loading="lazy"
                decoding="async"
                className="h-12 w-auto"
              />
            </a>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Productora audiovisual chilena especializada en videoclips
              musicales, fotografía y contenido cinematográfico de alto impacto.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#D946EF] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="mailto:Productora@vortexcine.com"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#D946EF] flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-white font-semibold mb-5">Navegación</h3>
            <ul className="space-y-3">
              {footerLinks.navegacion.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-gray-400 hover:text-[#D946EF] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-white font-semibold mb-5">Servicios</h3>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#D946EF] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm text-center sm:text-left">
              {currentYear} Vortex Studio. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-500 hover:text-[#D946EF] transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-[#D946EF] hover:bg-[#A21CAF] text-white flex items-center justify-center shadow-lg shadow-[#D946EF]/30 transition-all hover:scale-110 z-50"
        aria-label="Volver arriba"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
};

export default Footer;

