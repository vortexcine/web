import { useEffect, useRef } from 'react';
import { Instagram, Linkedin, Mail } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

// Función para extraer nombre y cargo del nombre de archivo
const parseTeamMember = (filename: string): { name: string; role: string } => {
  // Remover extensión
  const namePart = filename.replace(/\.[^/.]+$/, '');
  // Separar por " - "
  const parts = namePart.split(' - ');
  
  if (parts.length >= 2) {
    const name = parts[0].trim();
    // El resto son los cargos, unidos por " / " o " _ "
    let role = parts.slice(1).join(' - ');
    // Reemplazar " _ " por " / " para separar cargos múltiples
    role = role.replace(/\s*_\s*/g, ' / ');
    return { name, role };
  }
  
  return { name: namePart, role: 'Equipo Vortex' };
};

const Team = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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

  // Lista de archivos del equipo
  const teamFiles = [
    'Ariel Aguilera - Director de Fotografía _ Operador de Cámara .jpeg',
    'Carlos Cruces - Productor Comercial.jpeg',
    'Cesar Abarca - Founder _ Productor ejecutivo _ Director.jpeg',
    'Crhistian Bustamante - Sonido directo _ Asistente de Dirección dirección.JPG',
    'Elizabeth Cuevas - Asistente de Producción _ Styling.jpeg',
    'Francisca Venegas - Directora Creativa _ Guionista.jpg',
    'Joaquín Campos - Director de Fotografía _ Postproductor.jpeg',
    'Luis Tobar - Operador de Cámara.jpeg',
    'Nichole Sepúlveda - Postproductora.jpg',
    'Santiago Salazar - Productor General.jpg',
    'Vicente Cortés - Director de Arte _ Asistente de Producción .JPG',
  ];

  const team: TeamMember[] = teamFiles.map((file) => {
    const { name, role } = parseTeamMember(file);
    return {
      name,
      role,
      image: `/images/team/${file}`,
    };
  });

  return (
    <section
      id="equipo"
      ref={sectionRef}
      className="section relative"
    >
      <div className="grid-pattern" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="reveal">
            <span className="text-[#A855F7] text-sm font-semibold tracking-widest uppercase">
              Nuestro Equipo
            </span>
          </div>

          <h2 className="reveal stagger-1 text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            Los <span className="vortex-text">creativos</span> detrás de cada
            proyecto
          </h2>

          <p className="reveal stagger-2 text-gray-400 max-w-2xl mx-auto">
            Un equipo multidisciplinario de 11 profesionales apasionados por el
            cine, la música y el arte visual. Juntos, convertimos ideas en
            realidad.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <div
              key={member.name}
              className={`reveal stagger-${(index % 4) + 1} group`}
            >
              <div className="relative overflow-hidden rounded-xl bg-white/5 border border-white/10 card-hover">
                {/* Image */}
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-bold text-lg mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[#A855F7] text-sm font-medium mb-3">
                    {member.role}
                  </p>

                  {/* Social Links */}
                  <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <a
                      href="#"
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#A855F7] flex items-center justify-center transition-colors"
                      aria-label={`Instagram de ${member.name}`}
                    >
                      <Instagram size={14} />
                    </a>
                    <a
                      href="#"
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#A855F7] flex items-center justify-center transition-colors"
                      aria-label={`LinkedIn de ${member.name}`}
                    >
                      <Linkedin size={14} />
                    </a>
                    <a
                      href="#"
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#A855F7] flex items-center justify-center transition-colors"
                      aria-label={`Email de ${member.name}`}
                    >
                      <Mail size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
