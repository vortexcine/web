import { useEffect, useRef } from 'react';

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

  const baseUrl = import.meta.env.BASE_URL ?? '/';

  const teamMembers = [
    {
      name: 'Ariel Aguilera',
      role: 'Director de Fotografía / Operador de Cámara',
      imageFile: 'Ariel Aguilera - Director de Fotografía _ Operador de Cámara .jpeg',
    },
    {
      name: 'Carlos Cruces',
      role: 'Productor Comercial',
      imageFile: 'Carlos Cruces - Productor Comercial.jpeg',
    },
    {
      name: 'Cesar Abarca',
      role: 'Founder / Productor ejecutivo / Director',
      imageFile: 'Cesar Abarca - Founder _ Productor ejecutivo _ Director.jpeg',
    },
    {
      name: 'Crhistian Bustamante',
      role: 'Sonido directo / Asistente de Dirección dirección',
      imageFile: 'Crhistian Bustamante - Sonido directo _ Asistente de Dirección dirección.JPG',
    },
    {
      name: 'Elizabeth Ibarra',
      role: 'Asistente de Producción / Styling',
      imageFile: 'elizabeth-ibarra-asistente-de-produccion-styling.jpeg',
    },
    {
      name: 'Francisco Berrios',
      role: 'Jefe Gaffer y electrico',
      imageFile: 'francisco-berrios-gaffer-electrico.jpg',
    },
    {
      name: 'Francisca Venegas',
      role: 'Directora Creativa / Guionista',
      imageFile: 'Francisca Venegas - Directora Creativa _ Guionista.jpg',
    },
    {
      name: 'Joaquín Campos',
      role: 'Director de Fotografía / Postproductor',
      imageFile: 'Joaquín Campos - Director de Fotografía _ Postproductor.jpeg',
    },
    {
      name: 'Luis Tobar',
      role: 'Operador de Cámara',
      imageFile: 'Luis Tobar - Operador de Cámara.jpeg',
    },
    {
      name: 'Nichole Sepúlveda',
      role: 'Postproductora',
      imageFile: 'Nichole Sepúlveda - Postproductora.jpg',
    },
    {
      name: 'Santiago Salazar',
      role: 'Productor General',
      imageFile: 'Santiago Salazar - Productor General.jpg',
    },
    {
      name: 'Vicente Cortés',
      role: 'Director de Arte / Asistente de Producción',
      imageFile: 'Vicente Cortés - Director de Arte _ Asistente de Producción .JPG',
    },
  ];

  const team: TeamMember[] = teamMembers.map((member) => ({
    name: member.name,
    role: member.role,
    image: `${baseUrl}images/team/${encodeURIComponent(member.imageFile)}`,
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
