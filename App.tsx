
import React, { useRef } from 'react';
import { IMAGES, LINKS } from './constants';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

// --- Sub-components ---

const NauticalDecoration = ({ type, className }: { type: 'anchor' | 'wheel' | 'leaf', className?: string }) => {
  const icons = {
    anchor: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="w-full h-full opacity-10">
        <path d="M12 5V19M12 19C9.23858 19 7 16.7614 7 14M12 19C14.7614 19 17 16.7614 17 14M12 5C13.1046 5 14 4.10457 14 3C14 1.89543 13.1046 1 12 1C10.8954 1 10 1.89543 10 3C10 4.10457 10.8954 5 12 5ZM5 14H7M17 14H19" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    wheel: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="w-full h-full opacity-10">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 4V20M4 12H20M6.34 6.34L17.66 17.66M6.34 17.66L17.66 6.34" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    leaf: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="w-full h-full opacity-10">
        <path d="M2 22C2 22 10 20 12 12M12 12C14 4 22 2 22 2M12 12C12 12 4 14 2 22M12 12C12 12 20 10 22 2" strokeLinecap="round"/>
      </svg>
    )
  };
  return <div className={className}>{icons[type]}</div>;
};

const AnimatedDottedPath = () => (
  <svg 
    className="absolute top-1/2 left-0 w-[300%] md:w-[150%] h-[300px] -translate-y-1/2 pointer-events-none opacity-80 z-0" 
    viewBox="0 0 1200 200" 
    preserveAspectRatio="none"
  >
    <path 
      d="M0,100 C150,20 300,180 450,100 C600,20 750,180 900,100 C1050,20 1200,100 1350,100" 
      fill="none" 
      stroke="#ddcaaf" 
      strokeWidth="2" 
      className="animate-flow-dots"
    />
  </svg>
);

const FadeInSection: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Navbar = () => {
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 py-8 px-12 flex justify-between items-center bg-gradient-to-b from-[#152419] to-transparent pointer-events-none">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pointer-events-auto hidden md:block">
         <span className="text-[10px] uppercase tracking-[0.6em] text-[#ddcaaf]/40 italic">Pier Coquetelaria</span>
      </motion.div>
      <div className="flex space-x-12 pointer-events-auto">
        <a href="#sobre" onClick={scrollTo('sobre')} className="text-[10px] uppercase tracking-[0.4em] hover:text-white transition-all">Sobre</a>
        <a href="#experiencia" onClick={scrollTo('experiencia')} className="text-[10px] uppercase tracking-[0.4em] hover:text-white transition-all">Galeria</a>
        <a href="#contato" onClick={scrollTo('contato')} className="text-[10px] uppercase tracking-[0.4em] text-[#ddcaaf] border-b border-[#ddcaaf]/30 hover:border-white pb-1 transition-all">Proposta</a>
      </div>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const yContent = useTransform(scrollY, [0, 400], [0, -100]);
  const rotateWheel = useTransform(scrollY, [0, 1000], [0, 45]);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#152419]">
      {/* Background Camadas */}
      <div className="absolute inset-0 z-0">
        <div className="water-caustics opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#152419]/50 via-[#152419] to-[#152419]" />
        
        <motion.div style={{ rotate: rotateWheel }} className="absolute -top-20 -left-20 w-96 h-96 opacity-10">
          <NauticalDecoration type="wheel" className="w-full h-full" />
        </motion.div>
        
        <div className="absolute bottom-20 right-[-5%] w-80 h-80 animate-float opacity-20">
           <NauticalDecoration type="anchor" className="w-full h-full" />
        </div>

        <div className="absolute top-[20%] right-[10%] w-64 h-64 animate-float-reverse hidden lg:block">
           <NauticalDecoration type="leaf" className="w-full h-full text-[#7c806c]" />
        </div>
      </div>

      <motion.div style={{ opacity, y: yContent }} className="relative z-10 text-center px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "circOut" }}
          className="relative flex flex-col items-center"
        >
          <div className="relative inline-block mb-10">
             <div className="absolute inset-0 bg-[#ddcaaf]/5 blur-[60px] rounded-full scale-150 animate-pulse"></div>
             <img src={IMAGES.logo} alt="Pier Logo" className="relative w-32 md:w-44 mx-auto rounded-full border border-[#ddcaaf]/30 shadow-[0_0_50px_rgba(221,202,175,0.1)]" />
          </div>
          
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-light mb-8 leading-[1.15] tracking-tight italic max-w-[1200px] text-center">
            Alta coquetelaria para tornar seu evento <br className="hidden md:block"/> 
            <span className="text-[#ddcaaf]">ainda mais inesquecível</span>
          </h1>
          
          <p className="text-sm md:text-lg font-light mb-14 text-[#ddcaaf]/70 tracking-[0.4em] uppercase max-w-3xl mx-auto leading-relaxed text-center">
            Bartenders selecionados • Estética refinada • Experiência autoral
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <motion.a 
              whileHover={{ scale: 1.05, letterSpacing: '0.6em' }}
              href={LINKS.whatsapp} 
              target="_blank" 
              className="px-14 py-6 bg-[#ddcaaf] text-[#152419] text-[10px] tracking-[0.5em] uppercase font-bold transition-all rounded-sm shadow-2xl"
            >
              Solicitar Orçamento
            </motion.a>
            <span className="text-[10px] uppercase tracking-widest text-[#7c806c] italic">Dourados & Todo MS</span>
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-12 left-12 hidden lg:block">
         <p className="text-[9px] uppercase tracking-[0.5em] text-[#7c806c] rotate-90 origin-left">Est. 2022</p>
      </div>
    </section>
  );
};

const Expert = () => (
  <section className="py-32 px-8 bg-[#152419] relative">
    <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
       <NauticalDecoration type="wheel" className="w-full h-full translate-x-1/2" />
    </div>
    
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-20">
      <div className="lg:w-1/2 relative">
        <div className="absolute -top-10 -left-10 w-32 h-32 border-l border-t border-[#ddcaaf]/20 hidden md:block"></div>
        <div className="flex gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="relative z-10 shadow-[20px_20px_60px_rgba(0,0,0,0.5)]">
            <img src={IMAGES.expert1} alt="Gustavo" className="w-full h-[500px] object-cover rounded-sm" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="mt-16 shadow-[20px_20px_60px_rgba(0,0,0,0.5)]">
            <img src={IMAGES.expert2} alt="Expertise" className="w-full h-[400px] object-cover rounded-sm" />
          </motion.div>
        </div>
        <div className="absolute -bottom-6 -right-6 w-40 h-40">
           <NauticalDecoration type="leaf" className="w-full h-full text-[#686856] animate-float" />
        </div>
      </div>
      
      <div className="lg:w-1/2">
        <FadeInSection>
          <h4 className="text-[10px] uppercase tracking-[0.6em] text-[#7c806c] mb-6">O Visionário</h4>
          <h2 className="text-5xl md:text-6xl font-light mb-10 italic">Gustavo Lepoli</h2>
          <div className="space-y-8 text-lg font-light leading-relaxed text-[#ddcaaf]/80">
            <p>Com a precisão de um navegador e a criatividade de um artista, Gustavo Lepoli traz 8 anos de maestria para o centro do balcão.</p>
            <p>A Pier foi concebida para ser o porto seguro de quem busca exclusividade. Inspirada na solidez do porto e na fluidez das ondas, cada entrega é uma lição de hospitalidade.</p>
            <blockquote className="border-l-2 border-[#ddcaaf]/30 pl-8 py-4 italic text-2xl text-[#ddcaaf]">
              "Elevamos o drink ao status de obra, respeitando a herança clássica e abraçando o novo."
            </blockquote>
          </div>
        </FadeInSection>
      </div>
    </div>
  </section>
);

const About = () => (
  <section id="sobre" className="py-32 bg-[#1a2d21] relative border-y border-[#ddcaaf]/5 overflow-hidden">
    {/* Background Liso com Degradê Suave para Profundidade */}
    <div className="absolute inset-0 bg-gradient-to-tr from-[#152419] to-[#1a2d21] opacity-100" />
    
    <div className="max-w-6xl mx-auto px-8 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <FadeInSection>
          <h2 className="text-5xl md:text-7xl font-light mb-12 italic leading-tight">A Excelência <br/> em Números</h2>
          <div className="grid grid-cols-2 gap-y-12 gap-x-8">
            {[
              { n: '2', t: 'Anos de História', desc: 'Consolidando o padrão premium no MS.' },
              { n: '200+', t: 'Eventos Únicos', desc: 'Casamentos e celebrações de elite.' },
              { n: '30+', t: 'Drinks Autorais', desc: 'Incluindo o exclusivo Pier Fizz.' },
              { n: '100%', t: 'Curadoria', desc: 'Eventos selecionados para manter o brilho.' }
            ].map((item, i) => (
              <div key={i} className="group">
                <div className="text-5xl font-serif text-[#ddcaaf] mb-2 group-hover:translate-x-2 transition-transform">{item.n}</div>
                <div className="text-[10px] uppercase tracking-widest text-[#7c806c] mb-2">{item.t}</div>
                <p className="text-xs text-[#ddcaaf]/50 leading-relaxed italic">{item.desc}</p>
              </div>
            ))}
          </div>
        </FadeInSection>
        
        <div className="relative">
          <div className="absolute inset-0 border border-[#ddcaaf]/10 translate-x-4 translate-y-4"></div>
          <img 
            src={IMAGES.gallery[0]} 
            alt="Pier Concept" 
            className="relative z-10 w-full h-[600px] object-cover shadow-2xl" 
          />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 opacity-10">
            <NauticalDecoration type="anchor" className="w-full h-full rotate-45" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Gallery = () => (
  <section id="experiencia" className="py-32 px-4 md:px-12 bg-[#152419]">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div>
          <h2 className="text-5xl md:text-7xl font-light italic mb-4">Experiência <br/> Visual</h2>
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#7c806c]">Curadoria de Momentos & Mixologia</p>
        </div>
        <div className="hidden lg:block w-32 h-[1px] bg-[#ddcaaf]/30 mb-4"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {IMAGES.gallery.map((img, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -15 }}
            className="group relative overflow-hidden aspect-[3/4] shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
          >
            <img 
              src={img} 
              alt={`Drink ${idx + 1}`} 
              className="w-full h-full object-cover transition-all duration-[1.5s] group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#152419] via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
            <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 delay-100">
               <p className="text-[10px] uppercase tracking-widest font-bold">Pier Signature</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-32 bg-[#1a2d21] relative overflow-hidden">
    {/* Trilha de Pontilhados Curva e Animada - Opacidade aumentada para 80% */}
    <AnimatedDottedPath />

    <div className="absolute inset-0 bg-gradient-to-b from-[#152419] via-[#1a2d21] to-[#152419] opacity-80" />
    
    <div className="relative z-10 px-8 mb-20 text-center">
      <NauticalDecoration type="leaf" className="w-16 h-16 mx-auto mb-8 text-[#ddcaaf]/20 animate-float" />
      <h2 className="text-5xl md:text-6xl font-light italic text-[#ddcaaf]">Eles viveram a experiência</h2>
      <div className="mt-6 w-24 h-[1px] bg-[#ddcaaf]/20 mx-auto" />
    </div>

    {/* 
        Carrossel mobile otimizado (Peek Psicológico Elevado):
        - px-[10vw]: Margem inicial para o primeiro item.
        - w-[65vw]: Largura que permite ver ~25% do próximo card.
        - space-x-6: Espaçamento para a trilha aparecer entre os cards.
    */}
    <div className="relative z-10 flex space-x-6 md:space-x-12 overflow-x-auto pb-16 px-[10vw] md:px-12 no-scrollbar scroll-smooth snap-x snap-mandatory cursor-grab active:cursor-grabbing">
      {IMAGES.social.map((img, idx) => (
        <motion.div 
          key={idx} 
          whileHover={{ y: -10, boxShadow: '0 40px 80px rgba(0,0,0,0.4)' }}
          className="flex-shrink-0 w-[65vw] md:w-[450px] snap-center bg-[#152419] p-4 rounded-sm shadow-2xl border border-[#ddcaaf]/10 transition-all duration-500"
        >
          <img 
            src={img} 
            alt={`Social ${idx + 1}`} 
            className="w-full h-auto object-contain rounded-sm" 
          />
        </motion.div>
      ))}
      {/* Spacer para garantir que o último item possa ser centralizado */}
      <div className="flex-shrink-0 w-[20vw] md:hidden"></div>
    </div>
  </section>
);

const Tasting = () => (
  <section className="py-32 px-8 bg-[#152419] overflow-hidden">
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
      <div className="lg:w-1/2">
        <FadeInSection>
          <span className="text-[10px] uppercase tracking-[0.6em] text-[#7c806c] mb-6 block">O Porto Seguro</span>
          <h2 className="text-5xl md:text-7xl font-light mb-10 italic">Agende sua Degustação</h2>
          <p className="text-xl font-light text-[#ddcaaf]/80 leading-relaxed mb-12">
            Acreditamos que grandes conexões começam com um brinde. Abrimos as portas do nosso escritório em Dourados para receber você de forma exclusiva. Agende uma degustação personalizada, onde poderemos escolher juntos os sabores que marcarão sua celebração, em um ambiente pensado para acolher seus sonhos.
          </p>
          <div className="p-10 border border-[#ddcaaf]/10 rounded-sm bg-[#1a2d21]/30 backdrop-blur-sm relative">
             <div className="absolute top-4 right-4"><NauticalDecoration type="anchor" className="w-8 h-8" /></div>
             <p className="font-serif text-3xl mb-4 italic text-[#ddcaaf]">Oliveira Marques 207</p>
             <p className="text-[10px] uppercase tracking-[0.4em] text-[#7c806c]">Dourados – Mato Grosso do Sul</p>
          </div>
        </FadeInSection>
      </div>
      <div className="lg:w-1/2 w-full aspect-square md:aspect-video lg:aspect-square">
        <div className="w-full h-full rounded-sm overflow-hidden shadow-2xl border border-[#ddcaaf]/20 relative">
          <iframe 
            src="https://maps.google.com/maps?q=Oliveira%20Marques%20207,%20Dourados%20MS&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            width="100%" height="100%" 
            style={{ border: 0, filter: 'grayscale(1) invert(0.9) opacity(0.8)' }} 
            title="Maps"
          ></iframe>
        </div>
      </div>
    </div>
  </section>
);

const FinalCTA = () => (
  <section id="contato" className="py-40 bg-[#152419] text-center px-8 relative overflow-hidden">
    <div className="absolute inset-0 opacity-5 pointer-events-none">
       <NauticalDecoration type="wheel" className="w-[800px] h-[800px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-float-reverse" />
    </div>
    <FadeInSection className="relative z-10">
      <h2 className="text-5xl md:text-8xl font-light italic mb-10 tracking-tight">Ancore seu evento <br/> na excelência.</h2>
      <p className="text-lg md:text-2xl font-light mb-16 text-[#ddcaaf]/60 tracking-widest max-w-3xl mx-auto uppercase">
        Propostas exclusivas para momentos que pedem o extraordinário.
      </p>
      <motion.a 
        whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(221,202,175,0.2)' }}
        href={LINKS.whatsapp} 
        target="_blank" 
        className="inline-flex items-center px-16 py-8 bg-[#ddcaaf] text-[#152419] text-[12px] tracking-[0.6em] uppercase font-bold rounded-sm shadow-2xl transition-all"
      >
        Falar com a Pier
      </motion.a>
    </FadeInSection>
  </section>
);

const Footer = () => (
  <footer className="py-20 bg-[#0d170f] border-t border-[#ddcaaf]/5 px-8 text-center relative">
    <div className="max-w-4xl mx-auto">
      <img src={IMAGES.logo} alt="Pier Logo" className="w-20 mx-auto mb-12 rounded-full border border-[#ddcaaf]/10" />
      <div className="flex justify-center space-x-16 mb-16">
        <a href={LINKS.instagram} target="_blank" className="text-[10px] uppercase tracking-[0.5em] hover:text-white transition-all">Instagram</a>
        <a href={LINKS.whatsapp} target="_blank" className="text-[10px] uppercase tracking-[0.5em] hover:text-white transition-all">WhatsApp</a>
      </div>
      <p className="text-3xl font-serif italic text-[#ddcaaf]/20 mb-12">Pier Coquetelaria: A arte de elevar o brinde.</p>
      <div className="text-[9px] uppercase tracking-[0.6em] text-white/10">
        &copy; {new Date().getFullYear()} • Premium Experience • Dourados / MS
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-[#152419] selection:bg-[#ddcaaf] selection:text-[#152419]">
      <Navbar />
      <Hero />
      <Expert />
      <About />
      <Gallery />
      <Testimonials />
      <Tasting />
      <FinalCTA />
      <Footer />
    </div>
  );
}
