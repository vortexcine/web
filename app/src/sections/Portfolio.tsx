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
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [modalOrigin, setModalOrigin] = useState({ x: 50, y: 50 });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const videoclipLinks: Record<number, string> = {
    1: 'https://www.youtube.com/watch?v=nnS1EsLCMbM',
    5: 'https://www.youtube.com/watch?v=n0LPv48Bfl0',
    7: 'https://www.youtube.com/watch?v=q4VhLzVtJCk',
  };

  const getYouTubeEmbedUrl = (url: string) => {
    try {
      const parsed = new URL(url);
      if (parsed.hostname.includes('youtu.be')) {
        const id = parsed.pathname.replace('/', '');
        if (id) return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
      }

      if (parsed.hostname.includes('youtube.com')) {
        const id = parsed.searchParams.get('v');
        if (id) return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
      }
    } catch {
      return '';
    }

    return '';
  };

  const openProjectModal = (project: Project, originElement?: HTMLElement) => {
    if (originElement) {
      const rect = originElement.getBoundingClientRect();
      const xRaw = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
      const yRaw = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
      const x = Math.min(95, Math.max(5, xRaw));
      const y = Math.min(95, Math.max(5, yRaw));
      setModalOrigin({ x, y });
    } else {
      setModalOrigin({ x: 50, y: 50 });
    }

    window.requestAnimationFrame(() => {
      setIsVideoPlaying(false);
      setSelectedProject(project);
    });
  };

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

  const selectedIndex = selectedProject
    ? filteredProjects.findIndex((project) => project.id === selectedProject.id)
    : -1;
  const hasPrevProject = selectedIndex > 0;
  const hasNextProject = selectedIndex >= 0 && selectedIndex < filteredProjects.length - 1;

  const moveModalProject = (direction: 'prev' | 'next') => {
    if (selectedIndex < 0) return;

    const nextIndex = direction === 'next' ? selectedIndex + 1 : selectedIndex - 1;
    const target = filteredProjects[nextIndex];
    if (!target) return;

    // Centered origin avoids awkward jump when switching images inside modal
    setModalOrigin({ x: 50, y: 50 });
    setIsVideoPlaying(false);
    setSelectedProject(target);
  };

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

  const selectedVideoUrl = selectedProject ? videoclipLinks[selectedProject.id] : undefined;
  const selectedEmbedUrl = selectedVideoUrl ? getYouTubeEmbedUrl(selectedVideoUrl) : '';
  const canPlaySelectedVideo = Boolean(
    selectedProject &&
      selectedEmbedUrl &&
      selectedProject.type === 'videoclip' &&
      videoclipFirstIds.has(selectedProject.id)
  );

  useEffect(() => {
    if (!selectedProject) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' && hasNextProject) {
        event.preventDefault();
        moveModalProject('next');
      }

      if (event.key === 'ArrowLeft' && hasPrevProject) {
        event.preventDefault();
        moveModalProject('prev');
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedProject, hasNextProject, hasPrevProject, selectedIndex, activeFilter]);

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
            Una selección de nuestros ultimos trabajos Audiovisuales,
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
        <div className="reveal stagger-4 relative rounded-[28px] border border-white/[0.06] bg-white/[0.02] p-3 md:p-4 shadow-[0_16px_52px_rgba(0,0,0,0.22)]">
          <div
            className={`portfolio-edge-hint portfolio-edge-hint-left pointer-events-none absolute inset-y-2 left-3 z-10 hidden w-24 rounded-l-[22px] transition-opacity duration-300 md:block ${
              canScrollLeft ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <div
            className={`portfolio-edge-hint portfolio-edge-hint-right pointer-events-none absolute inset-y-2 right-3 z-10 hidden w-24 rounded-r-[22px] transition-opacity duration-300 md:block ${
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
                  onClick={(event) => openProjectModal(project, event.currentTarget)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      openProjectModal(project, event.currentTarget);
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

                  {project.type === 'videoclip' && videoclipFirstIds.has(project.id) && Boolean(videoclipLinks[project.id]) && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#A855F7]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                      <Play size={20} fill="white" className="text-white ml-1" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="portfolio-scrollbar mt-1" />
          </ScrollArea>
        </div>

        {/* View All Button */}
        <div className="reveal stagger-5 text-center mt-10">
          <a
            href="#"
            aria-disabled="true"
            onClick={(event) => event.preventDefault()}
            className="btn-outline inline-flex items-center gap-2 opacity-50 pointer-events-none"
          >
            Ver Todo el Portafolio
            <ExternalLink size={16} />
          </a>
          <p className="text-xs text-gray-500 mt-2">Disponible pronto</p>
        </div>

        <Dialog
          open={selectedProject !== null}
          onOpenChange={(open) => {
            if (!open) {
              setIsVideoPlaying(false);
              setSelectedProject(null);
            }
          }}
        >
          <DialogContent
            showCloseButton
            style={{
              ['--modal-origin-x' as string]: `${modalOrigin.x}%`,
              ['--modal-origin-y' as string]: `${modalOrigin.y}%`,
            }}
            className="portfolio-modal-zoom data-[state=open]:animate-none data-[state=closed]:animate-none !top-0 !left-0 !translate-x-0 !translate-y-0 !h-screen !w-screen !max-w-none !rounded-none !border-0 !bg-black/95 !p-0 overflow-hidden sm:!max-w-none"
          >
            {selectedProject ? (
              <>
                <div className="relative h-full bg-black/90">
                  <button
                    type="button"
                    aria-label="Cerrar vista ampliada"
                    className="absolute inset-0 z-0 cursor-zoom-out"
                    onClick={() => {
                      setIsVideoPlaying(false);
                      setSelectedProject(null);
                    }}
                  />

                  <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-4">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label="Imagen anterior"
                      disabled={!hasPrevProject}
                      onClick={() => moveModalProject('prev')}
                      className="size-11 rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-md transition-all hover:bg-black/75 disabled:opacity-35"
                    >
                      <ChevronLeft size={20} />
                    </Button>
                  </div>

                  <div className="absolute inset-y-0 right-0 z-10 flex items-center pr-4">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label="Imagen siguiente"
                      disabled={!hasNextProject}
                      onClick={() => moveModalProject('next')}
                      className="size-11 rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-md transition-all hover:bg-black/75 disabled:opacity-35"
                    >
                      <ChevronRight size={20} />
                    </Button>
                  </div>

                  <div
                    className={`relative z-[5] h-full w-full px-3 py-3 md:px-16 md:py-10 flex items-center justify-center ${
                      canPlaySelectedVideo && !isVideoPlaying ? 'cursor-pointer' : ''
                    }`}
                    onClick={(event) => {
                      if (event.target === event.currentTarget) {
                        setIsVideoPlaying(false);
                        setSelectedProject(null);
                        return;
                      }

                      if (canPlaySelectedVideo && !isVideoPlaying) {
                        setIsVideoPlaying(true);
                      }
                    }}
                  >
                    {canPlaySelectedVideo && isVideoPlaying ? (
                      <iframe
                        src={selectedEmbedUrl}
                        title={`Video de ${selectedProject.title}`}
                        className="w-[min(92vw,1320px)] h-[min(78vh,740px)] rounded-xl border border-white/15"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    ) : (
                      <>
                        <img
                          src={getAssetUrl(selectedProject.image)}
                          alt={selectedProject.title}
                          decoding="async"
                          className="max-w-[70vw] max-h-[70vh] object-contain"
                        />

                        {canPlaySelectedVideo ? (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-16 h-16 rounded-full bg-[#A855F7]/85 border border-white/20 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.45)]">
                              <Play size={24} fill="white" className="text-white ml-1" />
                            </div>
                          </div>
                        ) : null}
                      </>
                    )}
                  </div>

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                  <div className="absolute left-1/2 bottom-14 -translate-x-1/2 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-xs text-gray-200">
                    {selectedIndex + 1} / {filteredProjects.length}
                  </div>

                  <div className="absolute left-5 right-5 bottom-4 md:left-8 md:right-8">
                    <DialogTitle className="text-white text-xl md:text-2xl font-bold drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]">
                      {selectedProject.title}
                    </DialogTitle>
                    <DialogDescription className="text-[#C084FC] mt-1 text-sm font-medium uppercase tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
                      {selectedProject.category}
                    </DialogDescription>
                  </div>
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
