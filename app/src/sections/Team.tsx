import { useEffect, useRef } from 'react';
import { getAssetUrl } from '@/lib/utils';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

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

  const teamMembers = [
    {
      name: 'Ariel Aguilera',
      role: 'Director de Fotografía / Operador de Cámara',
      imageFile: 'ariel-aguilera-director-de-fotografia-operador-de-camara.webp',
    },
    {
      name: 'Carlos Cruces',
      role: 'Productor Comercial',
      imageFile: 'carlos-cruces-productor-comercial.webp',
    },
    {
      name: 'Cesar Abarca',
      role: 'Founder / Productor ejecutivo / Director',
      imageFile: 'cesar-abarca-founder-productor-ejecutivo-director.webp',
    },
    {
      name: 'Crhistian Bustamante',
      role: 'Sonido directo / Asistente de Dirección',
      imageFile: 'christian-bustamante-sonido-directo-asistente-de-direccion.webp',
    },
    {
      name: 'Elizabeth Ibarra',
      role: 'Asistente de Producción / Styling',
      imageFile: 'elizabeth-ibarra-asistente-de-produccion-styling.webp',
    },
    {
      name: 'Francisco Berrios',
      role: 'Jefe Gaffer y electrico',
      imageFile: 'francisco-berrios-gaffer-electrico.webp',
    },
    {
      name: 'Francisca Venegas',
      role: 'Directora Creativa / Guionista',
      imageFile: 'francisca-venegas-directora-creativa-guionista.webp',
    },
    {
      name: 'Joaquín Campos',
      role: 'Director de Fotografía / Postproductor',
      imageFile: 'joaquin-campos-director-de-fotografia-postproductor.webp',
    },
    {
      name: 'Luis Tobar',
      role: 'Operador de Cámara',
      imageFile: 'luis-tobar-operador-de-camara.webp',
    },
    {
      name: 'Nichole Sepúlveda',
      role: 'Postproductora',
      imageFile: 'nichole-sepulveda-postproductora.webp',
    },
    {
      name: 'Santiago Salazar',
      role: 'Productor General',
      imageFile: 'santiago-salazar-productor-general.webp',
    },
    {
      name: 'Vicente Cortés',
      role: 'Director de Arte / Asistente de Producción',
      imageFile: 'vicente-cortes-director-de-arte-asistente-de-produccion.webp',
    },
  ];

  const team: TeamMember[] = teamMembers.map((member) => ({
    name: member.name,
    role: member.role,
    image: getAssetUrl(`/images/team/${member.imageFile}`),
  }));

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
            Un equipo multidisciplinario de 12 profesionales apasionados por el
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
                <div className="aspect-[3/4] overflow-hidden bg-gray-800">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    decoding="async"
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
                  <p className="text-[#A855F7] text-sm font-medium">
                    {member.role}
                  </p>
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
