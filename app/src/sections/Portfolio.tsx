import { useEffect, useRef, useState } from 'react';
import { Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { getAssetUrl } from '@/lib/utils';
import LazyImage from '@/components/LazyImage';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  type: 'videoclip' | 'fotografia' | 'makeoff';
}

// Función para limpiar el nombre del archivo
const cleanFileName = (filename: string): string => {
  // Remover extensión
  let name = filename.replace(/\.[^/.]+$/, '');
  // Remover números entre paréntesis al final
  name = name.replace(/\(\d+\)$/, '');
  // Remover números sueltos al final
  name = name.replace(/\s+\d+$/, '');
  // Limpiar espacios extras
  name = name.trim();
  return name;
};

const Portfolio = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<string>('todos');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const viewport = scrollAreaRef.current?.querySelector('[data-slot="scroll-area-viewport"]');
    if (!(viewport instanceof HTMLDivElement)) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = viewport;
    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 8);
  };

  const scrollPortfolio = (direction: 'left' | 'right') => {
    const viewport = scrollAreaRef.current?.querySelector('[data-slot="scroll-area-viewport"]');
    if (!(viewport instanceof HTMLDivElement)) {
      return;
    }

    const amount = Math.max(viewport.clientWidth * 0.82, 280);
    viewport.scrollBy({
      left: direction === 'right' ? amount : -amount,
      behavior: 'smooth',
    });
  };

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

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [activeFilter]);

  useEffect(() => {
    const viewport = scrollAreaRef.current?.querySelector('[data-slot="scroll-area-viewport"]');
    if (!(viewport instanceof HTMLDivElement)) {
      return;
    }

    const handleScroll = () => updateScrollState();
    const handleResize = () => updateScrollState();

    updateScrollState();
    viewport.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    const frame = window.requestAnimationFrame(() => {
      updateScrollState();
    });

    return () => {
      viewport.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(frame);
    };
  }, [activeFilter]);

  // Proyectos organizados por categoría (usando nombres exactos y codificación de cada segmento)
  const projects: Project[] = [
    // Videoclip (8 imágenes)
    { id: 1, title: cleanFileName('Gangrena(1).webp'), category: 'Videoclip', image: '/images/portfolio/stills/Gangrena(1).webp', type: 'videoclip' },
    { id: 2, title: cleanFileName('Gangrena(2).webp'), category: 'Videoclip', image: '/images/portfolio/stills/Gangrena(2).webp', type: 'videoclip' },
    { id: 3, title: cleanFileName('Verte Encima(3).webp'), category: 'Videoclip', image: '/images/portfolio/stills/Verte Encima(3).webp', type: 'videoclip' },
    { id: 4, title: cleanFileName('Verte Encima.webp'), category: 'Videoclip', image: '/images/portfolio/stills/Verte Encima.webp', type: 'videoclip' },
    { id: 5, title: cleanFileName('Volver pa atras(1).webp'), category: 'Videoclip', image: '/images/portfolio/stills/Volver pa atras(1).webp', type: 'videoclip' },
    { id: 6, title: cleanFileName('Volver pa atras(2).webp'), category: 'Videoclip', image: '/images/portfolio/stills/Volver pa atras(2).webp', type: 'videoclip' },
    { id: 7, title: cleanFileName('Voy y Vuelvo 1.webp'), category: 'Videoclip', image: '/images/portfolio/stills/Voy y Vuelvo 1.webp', type: 'videoclip' },
    { id: 8, title: cleanFileName('Voy y Vuelvo 2.webp'), category: 'Videoclip', image: '/images/portfolio/stills/Voy y Vuelvo 2.webp', type: 'videoclip' },
    // Fotografía (8 imágenes)
    { id: 9, title: cleanFileName('Sesión de Fotos 14.webp'), category: 'Fotografía', image: '/images/portfolio/fotografia/Sesión de Fotos 14.webp', type: 'fotografia' },
    { id: 10, title: cleanFileName('Sesión de Fotos 17.webp'), category: 'Fotografía', image: '/images/portfolio/fotografia/Sesión de Fotos 17.webp', type: 'fotografia' },
    { id: 11, title: cleanFileName('Paisajismo 2.webp'), category: 'Fotografía', image: '/images/portfolio/fotografia/Paisajismo 2.webp', type: 'fotografia' },
    { id: 12, title: cleanFileName('Registro DJ La Feria 2.webp'), category: 'Fotografía', image: '/images/portfolio/fotografia/Registro DJ La Feria 2.webp', type: 'fotografia' },
    { id: 13, title: cleanFileName('Registro Festival 5.webp'), category: 'Fotografía', image: '/images/portfolio/fotografia/Registro Festival 5.webp', type: 'fotografia' },
    { id: 14, title: cleanFileName('Registro Paxlito en Vivo 1.webp'), category: 'Fotografía', image: '/images/portfolio/fotografia/Registro Paxlito en Vivo 1.webp', type: 'fotografia' },
    { id: 15, title: cleanFileName('Sesión de Fotos 3.webp'), category: 'Fotografía', image: '/images/portfolio/fotografia/Sesión de Fotos 3.webp', type: 'fotografia' },
    { id: 16, title: cleanFileName('Sesión de Fotos 6.webp'), category: 'Fotografía', image: '/images/portfolio/fotografia/Sesión de Fotos 6.webp', type: 'fotografia' },
    // Make Off (8 imágenes)
    { id: 17, title: cleanFileName('Detrás de cámara _Verte Encima_(1).webp'), category: 'Make Off', image: '/images/portfolio/makeoff/Detrás de cámara _Verte Encima_(1).webp', type: 'makeoff' },
    { id: 18, title: cleanFileName('Detrás de cámara _Verte Encima_.webp'), category: 'Make Off', image: '/images/portfolio/makeoff/Detrás de cámara _Verte Encima_.webp', type: 'makeoff' },
    { id: 19, title: cleanFileName('Detrás de cámara _Verte Encima 4_.webp'), category: 'Make Off', image: '/images/portfolio/makeoff/Detrás de cámara _Verte Encima 4_.webp', type: 'makeoff' },
    { id: 20, title: cleanFileName('Equipo de Arte.webp'), category: 'Make Off', image: '/images/portfolio/makeoff/Equipo de Arte.webp', type: 'makeoff' },
    { id: 21, title: cleanFileName('Equipo iluminacion.webp'), category: 'Make Off', image: '/images/portfolio/makeoff/Equipo iluminacion.webp', type: 'makeoff' },
    { id: 22, title: cleanFileName('Operador de Camara _Voy y Vuelvo_(1).webp'), category: 'Make Off', image: '/images/portfolio/makeoff/Operador de Camara _Voy y Vuelvo_(1).webp', type: 'makeoff' },
    { id: 23, title: cleanFileName('Operador de camara _Voy y Vuelvo_.webp'), category: 'Make Off', image: '/images/portfolio/makeoff/Operador de camara _Voy y Vuelvo_.webp', type: 'makeoff' },
    { id: 24, title: cleanFileName('Prueba de Iluminacion(1).webp'), category: 'Make Off', image: '/images/portfolio/makeoff/Prueba de Iluminacion(1).webp', type: 'makeoff' },
  ];



  const filters = [
    { id: 'todos', label: 'Todos' },
    { id: 'videoclip', label: 'Videoclip' },
    { id: 'fotografia', label: 'Fotografía' },
    { id: 'makeoff', label: 'Make Off' },
  ];

  const filteredProjects =
    activeFilter === 'todos'
      ? projects
      : projects.filter((p) => p.type === activeFilter);

  const getRevealDelay = (index: number) => {
    const row = index % 3;
    const col = Math.floor(index / 3);
    return col * 85 + row * 95;
  };

  const videoclipFirstIds = new Set<number>();
  const seenVideoclipTitles = new Set<string>();

  projects.forEach((project) => {
    if (project.type !== 'videoclip') return;
    if (!seenVideoclipTitles.has(project.title)) {
      seenVideoclipTitles.add(project.title);
      videoclipFirstIds.add(project.id);
    }
  });

  return (
    <section
      id="portafolio"
      ref={sectionRef}
      className="section relative bg-black/50"
    >
      <div className="grid-pattern" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="reveal">
            <span className="text-[#A855F7] text-sm font-semibold tracking-widest uppercase">
              Portafolio
            </span>
          </div>

          <h2 className="reveal stagger-1 text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            Nuestros <span className="vortex-text">Proyectos</span>
          </h2>

          <p className="reveal stagger-2 text-gray-400 max-w-2xl mx-auto">
            Una selección de nuestros trabajos Audiovisuales,
            fotografía artística y detrás de cámaras.
          </p>
        </div>

        {/* Filters */}
        <div className="reveal stagger-3 flex justify-center gap-3 mb-10 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-[#A855F7] to-[#7C3AED] text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Gallery */}
        <div className="reveal stagger-4 relative rounded-[28px] border border-white/10 bg-white/[0.03] p-3 md:p-4 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
          <div
            className={`pointer-events-none absolute inset-y-4 left-3 z-10 hidden w-16 rounded-l-[22px] bg-gradient-to-r from-[rgba(6,2,12,0.82)] via-[rgba(124,58,237,0.16)] to-transparent transition-opacity duration-300 md:block ${
              canScrollLeft ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <div
            className={`pointer-events-none absolute inset-y-4 right-3 z-10 hidden w-16 rounded-r-[22px] bg-gradient-to-l from-[rgba(6,2,12,0.82)] via-[rgba(124,58,237,0.16)] to-transparent transition-opacity duration-300 md:block ${
              canScrollRight ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 hidden items-center pl-4 md:flex">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Desplazar portafolio a la izquierda"
              onClick={() => scrollPortfolio('left')}
              disabled={!canScrollLeft}
              className="pointer-events-auto size-10 rounded-full border border-white/10 bg-black/55 text-white backdrop-blur-md transition-all hover:bg-black/75 disabled:opacity-0"
            >
              <ChevronLeft size={18} />
            </Button>
          </div>

          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden items-center pr-4 md:flex">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Desplazar portafolio a la derecha"
              onClick={() => scrollPortfolio('right')}
              disabled={!canScrollRight}
              className="pointer-events-auto size-10 rounded-full border border-white/10 bg-black/55 text-white backdrop-blur-md transition-all hover:bg-black/75 disabled:opacity-0"
            >
              <ChevronRight size={18} />
            </Button>
          </div>

          <ScrollArea ref={scrollAreaRef} className="w-full whitespace-nowrap rounded-[22px]">
            <div className="portfolio-scroll-grid grid grid-flow-col grid-rows-3 gap-4 pb-4">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="group relative overflow-hidden rounded-xl aspect-[4/3] w-[240px] md:w-[280px] xl:w-[300px] cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedProject(project)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setSelectedProject(project);
                    }
                  }}
                >
                  <LazyImage
                    src={getAssetUrl(project.image)}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    revealDelayMs={getRevealDelay(index)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[#A855F7] text-xs font-semibold uppercase tracking-wider mb-1">
                      {project.category}
                    </span>
                    <h3 className="text-white text-lg font-bold whitespace-normal">
                      {project.title}
                    </h3>
                  </div>

                  {project.type === 'videoclip' && videoclipFirstIds.has(project.id) && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#A855F7]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                      <Play size={20} fill="white" className="text-white ml-1" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="mt-1" />
          </ScrollArea>
        </div>

        {/* View All Button */}
        <div className="reveal stagger-5 text-center mt-10">
          <a
            href="https://www.canva.com/design/DAGkYk5wqvg/OYdtOjPEcWpjavyymeMriA/edit?utm_content=DAGkYk5wqvg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2"
          >
            Ver Todo el Portafolio
            <ExternalLink size={16} />
          </a>
        </div>

        <Dialog
          open={selectedProject !== null}
          onOpenChange={(open) => {
            if (!open) setSelectedProject(null);
          }}
        >
          <DialogContent
            showCloseButton
            className="max-w-[min(96vw,1440px)] border-white/15 bg-black/90 p-0 overflow-hidden"
          >
            {selectedProject ? (
              <>
                <div className="relative bg-black/80">
                  <img
                    src={getAssetUrl(selectedProject.image)}
                    alt={selectedProject.title}
                    decoding="async"
                    className="w-full max-h-[86vh] object-contain"
                  />
                </div>
                <div className="px-5 py-4 border-t border-white/10 bg-black/75">
                  <DialogTitle className="text-white text-xl font-bold">
                    {selectedProject.title}
                  </DialogTitle>
                  <DialogDescription className="text-[#A855F7] mt-1 text-sm font-medium uppercase tracking-wide">
                    {selectedProject.category}
                  </DialogDescription>
                </div>
              </>
            ) : null}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Portfolio;
