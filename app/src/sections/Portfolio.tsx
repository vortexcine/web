import { useEffect, useRef, useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  type: 'stills' | 'fotografia' | 'makeoff';
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
  const [activeFilter, setActiveFilter] = useState<string>('todos');

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
  }, []);

  // Proyectos organizados por categoría
  const projects: Project[] = [
    // Stills (8 imágenes)
    { id: 1, title: cleanFileName('Gangrena(1).jpg'), category: 'Stills', image: '/images/portfolio/stills/Gangrena(1).jpg', type: 'stills' },
    { id: 2, title: cleanFileName('Gangrena(2).jpg'), category: 'Stills', image: '/images/portfolio/stills/Gangrena(2).jpg', type: 'stills' },
    { id: 3, title: cleanFileName('Verte Encima(3).jpg'), category: 'Stills', image: '/images/portfolio/stills/Verte Encima(3).jpg', type: 'stills' },
    { id: 4, title: cleanFileName('Verte Encima.jpg'), category: 'Stills', image: '/images/portfolio/stills/Verte Encima.jpg', type: 'stills' },
    { id: 5, title: cleanFileName('Volver pa atras(1).jpg'), category: 'Stills', image: '/images/portfolio/stills/Volver pa atras(1).jpg', type: 'stills' },
    { id: 6, title: cleanFileName('Volver pa atras(2).jpg'), category: 'Stills', image: '/images/portfolio/stills/Volver pa atras(2).jpg', type: 'stills' },
    { id: 7, title: cleanFileName('Voy y Vuelvo 1.JPG'), category: 'Stills', image: '/images/portfolio/stills/Voy y Vuelvo 1.JPG', type: 'stills' },
    { id: 8, title: cleanFileName('Voy y Vuelvo 2.jpg'), category: 'Stills', image: '/images/portfolio/stills/Voy y Vuelvo 2.jpg', type: 'stills' },
    // Fotografía (8 imágenes)
    { id: 9, title: cleanFileName('Sesión de Fotos 14.JPG'), category: 'Fotografía', image: '/images/portfolio/fotografia/Sesión de Fotos 14.JPG', type: 'fotografia' },
    { id: 10, title: cleanFileName('Sesión de Fotos 17.jpg'), category: 'Fotografía', image: '/images/portfolio/fotografia/Sesión de Fotos 17.jpg', type: 'fotografia' },
    { id: 11, title: cleanFileName('Paisajismo 2.JPG'), category: 'Fotografía', image: '/images/portfolio/fotografia/Paisajismo 2.JPG', type: 'fotografia' },
    { id: 12, title: cleanFileName('Registro DJ La Feria 2.jpg'), category: 'Fotografía', image: '/images/portfolio/fotografia/Registro DJ La Feria 2.jpg', type: 'fotografia' },
    { id: 13, title: cleanFileName('Registro Festival 5.jpg'), category: 'Fotografía', image: '/images/portfolio/fotografia/Registro Festival 5.jpg', type: 'fotografia' },
    { id: 14, title: cleanFileName('Registro Paxlito en Vivo 1.jpg'), category: 'Fotografía', image: '/images/portfolio/fotografia/Registro Paxlito en Vivo 1.jpg', type: 'fotografia' },
    { id: 15, title: cleanFileName('Sesión de Fotos 3.JPG'), category: 'Fotografía', image: '/images/portfolio/fotografia/Sesión de Fotos 3.JPG', type: 'fotografia' },
    { id: 16, title: cleanFileName('Sesión de Fotos 6.jpg'), category: 'Fotografía', image: '/images/portfolio/fotografia/Sesión de Fotos 6.jpg', type: 'fotografia' },
    // Make Off (8 imágenes)
    { id: 17, title: cleanFileName('Detrás de cámara _Verte Encima_(1).jpg'), category: 'Make Off', image: '/images/portfolio/makeoff/Detrás de cámara _Verte Encima_(1).jpg', type: 'makeoff' },
    { id: 18, title: cleanFileName('Detrás de cámara _Verte Encima_.jpg'), category: 'Make Off', image: '/images/portfolio/makeoff/Detrás de cámara _Verte Encima_.jpg', type: 'makeoff' },
    { id: 19, title: cleanFileName('Detrás de cámara _Verte Encima 4_.jpg'), category: 'Make Off', image: '/images/portfolio/makeoff/Detrás de cámara _Verte Encima 4_.jpg', type: 'makeoff' },
    { id: 20, title: cleanFileName('Equipo de Arte.jpg'), category: 'Make Off', image: '/images/portfolio/makeoff/Equipo de Arte.jpg', type: 'makeoff' },
    { id: 21, title: cleanFileName('Equipo iluminacion.jpg'), category: 'Make Off', image: '/images/portfolio/makeoff/Equipo iluminacion.jpg', type: 'makeoff' },
    { id: 22, title: cleanFileName('Operador de Camara _Voy y Vuelvo_(1).jpg'), category: 'Make Off', image: '/images/portfolio/makeoff/Operador de Camara _Voy y Vuelvo_(1).jpg', type: 'makeoff' },
    { id: 23, title: cleanFileName('Operador de camara _Voy y Vuelvo_.jpg'), category: 'Make Off', image: '/images/portfolio/makeoff/Operador de camara _Voy y Vuelvo_.jpg', type: 'makeoff' },
    { id: 24, title: cleanFileName('Prueba de Iluminacion(1).jpg'), category: 'Make Off', image: '/images/portfolio/makeoff/Prueba de Iluminacion(1).jpg', type: 'makeoff' },
  ];

  const filters = [
    { id: 'todos', label: 'Todos' },
    { id: 'stills', label: 'Stills' },
    { id: 'fotografia', label: 'Fotografía' },
    { id: 'makeoff', label: 'Make Off' },
  ];

  const filteredProjects =
    activeFilter === 'todos'
      ? projects
      : projects.filter((p) => p.type === activeFilter);

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
            Una selección de nuestros trabajos en stills cinematográficos,
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

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`reveal stagger-${(index % 4) + 1} group relative overflow-hidden rounded-xl aspect-[4/3] cursor-pointer`}
            >
              {/* Image */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[#A855F7] text-xs font-semibold uppercase tracking-wider mb-1">
                  {project.category}
                </span>
                <h3 className="text-white text-lg font-bold">
                  {project.title}
                </h3>
              </div>

              {/* Play Icon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#A855F7]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                <Play size={20} fill="white" className="text-white ml-1" />
              </div>
            </div>
          ))}
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
      </div>
    </section>
  );
};

export default Portfolio;
