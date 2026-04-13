import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, Instagram, Youtube, Film } from 'lucide-react';

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'Productora@vortexcine.com',
      href: 'mailto:Productora@vortexcine.com',
    },
    {
      icon: Phone,
      label: 'Teléfono',
      value: '+56 9 9968 5075',
      href: 'tel:+56999685075',
    },
    {
      icon: MapPin,
      label: 'Ubicación',
      value: 'Santiago, Chile',
      href: '#',
    },
  ];

  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Youtube, label: 'YouTube', href: '#' },
    { icon: Film, label: 'Vimeo', href: '#' },
  ];

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="section relative bg-black/50"
    >
      <div className="grid-pattern" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="reveal">
            <span className="text-[#A855F7] text-sm font-semibold tracking-widest uppercase">
              Contacto
            </span>
          </div>

          <h2 className="reveal stagger-1 text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            Hagamos <span className="vortex-text">magia</span> juntos
          </h2>

          <p className="reveal stagger-2 text-gray-400 max-w-2xl mx-auto">
            ¿Tienes un proyecto en mente? Nos encantaría escuchar sobre él.
            Contáctanos y comencemos a crear algo extraordinario.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="reveal stagger-1 space-y-6">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#A855F7]/20 to-[#C084FC]/20 flex items-center justify-center flex-shrink-0 group-hover:from-[#A855F7]/30 group-hover:to-[#C084FC]/30 transition-all">
                    <item.icon className="text-[#A855F7]" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">{item.label}</p>
                    <p className="text-white font-medium group-hover:text-[#A855F7] transition-colors">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="reveal stagger-2">
              <p className="text-gray-500 text-sm mb-4">Síguenos</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-11 h-11 rounded-xl bg-white/5 hover:bg-[#A855F7] border border-white/10 hover:border-[#A855F7] flex items-center justify-center transition-all"
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Working Hours */}
            <div className="reveal stagger-3 bg-white/5 rounded-xl p-5 border border-white/10">
              <h3 className="text-white font-semibold mb-3">Horario de Atención</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Lunes - Viernes</span>
                  <span className="text-white">9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Sábado</span>
                  <span className="text-white">10:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Domingo</span>
                  <span className="text-gray-500">Cerrado</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="reveal stagger-2 bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10"
            >
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <Send className="text-green-500" size={28} />
                  </div>
                  <h3 className="text-white text-xl font-bold mb-2">
                    ¡Mensaje enviado!
                  </h3>
                  <p className="text-gray-400">
                    Gracias por contactarnos. Te responderemos pronto.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Nombre
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#A855F7] focus:ring-1 focus:ring-[#A855F7] transition-all"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#A855F7] focus:ring-1 focus:ring-[#A855F7] transition-all"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="block text-gray-400 text-sm mb-2">
                      Tipo de Proyecto
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#A855F7] focus:ring-1 focus:ring-[#A855F7] transition-all appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-black">
                        Selecciona una opción
                      </option>
                      <option value="stills" className="bg-black">
                        Stills Cinematográficos
                      </option>
                      <option value="fotografia" className="bg-black">
                        Sesión Fotográfica
                      </option>
                      <option value="videoclip" className="bg-black">
                        Videoclip Musical
                      </option>
                      <option value="makeoff" className="bg-black">
                        Make Off / Behind the Scenes
                      </option>
                      <option value="otro" className="bg-black">
                        Otro
                      </option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-400 text-sm mb-2">
                      Mensaje
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#A855F7] focus:ring-1 focus:ring-[#A855F7] transition-all resize-none"
                      placeholder="Cuéntanos sobre tu proyecto..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-vortex w-full flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Enviar Mensaje
                      </>
                    )}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
