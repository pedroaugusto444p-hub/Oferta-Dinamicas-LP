/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Check, 
  X, 
  ChevronDown, 
  ShieldCheck, 
  MessageCircle, 
  Play,
  Star,
  Users,
  GraduationCap,
  Calendar,
  AlertTriangle,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const Button = ({ children, className = "", variant = "primary", href, ...props }: any) => {
  const variants: any = {
    primary: "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-200",
    secondary: "bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-200",
    outline: "border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50",
    whatsapp: "bg-emerald-500 hover:bg-emerald-600 text-white"
  };

  const Component = href ? motion.a : motion.button;
  
  return (
    <Component 
      href={href}
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className={`px-8 py-4 rounded-full font-bold text-lg transition-all active:scale-95 inline-flex items-center justify-center cursor-pointer ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

const PurchaseNotification = () => {
  const [notification, setNotification] = useState<any>(null);
  const names = ["María", "Carlos", "Ana", "Jose", "Lucía", "Diego", "Carmen", "Javier", "Elena", "Pablo"];
  const cities = ["Madrid", "Barcelona", "Valencia", "Sevilla", "Zaragoza", "Málaga", "Murcia", "Palma", "Las Palmas", "Bilbao"];

  useEffect(() => {
    const showNotification = () => {
      const name = names[Math.floor(Math.random() * names.length)];
      const city = cities[Math.floor(Math.random() * cities.length)];
      setNotification({ name, city });
      
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        showNotification();
      }
    }, 15000);

    // Initial notification
    setTimeout(showNotification, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {notification && (
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 20, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          className="fixed bottom-6 left-0 z-[100] bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 flex items-center gap-4 max-w-[280px]"
        >
          <div className="w-12 h-12 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center shrink-0">
            <Check size={24} strokeWidth={3} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900">{notification.name} de {notification.city}</p>
            <p className="text-xs text-gray-500">acaba de comprar el acceso</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const BonusCard = ({ title, img, price, free = true }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-4 rounded-2xl border border-gray-100 bonus-card-shadow flex flex-col items-center text-center"
  >
    <div className="w-full aspect-square bg-gray-50 rounded-xl mb-4 overflow-hidden flex items-center justify-center">
      {/* Placeholder for bonus image */}
      <div className="text-gray-300 font-bold text-center p-4">
        <img src={img} alt={title} className="w-full h-full object-contain" onError={(e) => e.currentTarget.src = 'https://placehold.co/400x400?text=Bonus'} />
      </div>
    </div>
    <h4 className="text-gray-800 text-base mb-1 px-2">{title}</h4>
    <p className="text-gray-400 text-xs line-through">VALOR: ${price}</p>
    {free && <p className="text-emerald-500 font-extrabold text-lg">GRATIS</p>}
  </motion.div>
);

const PriceCard = ({ title, subtitle, price, oldPrice, imageUrl, features, bonusBox, isHighlight = false, buttonText = "COMPRAR AGORA" }: any) => (
  <div className={`relative bg-white rounded-[2.5rem] p-6 border-2 ${isHighlight ? 'border-cyan-400 pricing-card-highlight scale-[1.02] z-10' : 'border-gray-100'} flex flex-col`}>
    
    {imageUrl && (
      <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-gray-50 text-center">
        <img src={imageUrl} alt={title} className="w-full h-full object-contain mx-auto" />
      </div>
    )}

    <div className="text-center mb-6">
      <div className="flex flex-col items-center">
        <div className="flex items-baseline gap-1">
          <span className="text-gray-900 font-black text-6xl tracking-tighter">${price}</span>
        </div>
        <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mt-2">PAGO ÚNICO</p>
      </div>
    </div>

    <div className="space-y-4 mb-8 flex-grow">
      {features.map((f: any, i: number) => (
        <div key={i} className="flex gap-3 text-sm text-[#2563EB] font-bold">
          <div className="shrink-0 mt-0.5">
            {f.icon ? <f.icon size={18} strokeWidth={2.5} /> : <Check size={18} strokeWidth={3} />}
          </div>
          <span>{f.text}</span>
        </div>
      ))}

      {bonusBox && (
        <div className="mt-6 p-4 rounded-2xl border-2 border-dashed border-cyan-300 bg-cyan-50/30">
          <div className="flex items-center gap-2 text-[#E11D48] font-black text-xs mb-3 uppercase tracking-tight">
            BONOS GRATIS INCLUIDOS:
          </div>
          <ul className="space-y-2">
            {bonusBox.map((item: string, i: number) => (
              <li key={i} className="text-gray-600 text-xs font-semibold flex items-center gap-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>

    <Button 
      href="https://pay.hotmart.com/O105693747U?checkoutMode=10"
      className={`w-full !py-5 !text-[15px] !rounded-full uppercase tracking-tighter font-black whitespace-normal text-center leading-none ${isHighlight ? '!bg-[#22C55E] !hover:bg-[#16A34A] !shadow-none' : ''}`} 
      variant={isHighlight ? "primary" : "outline"}
    >
      {buttonText}
    </Button>
    
    <div className="mt-4 flex flex-col items-center gap-2">
       <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold">
          <ShieldCheck size={12} /> Ambiente seguro para pagos
       </div>
    </div>
  </div>
);

const AccordionItem = ({ question, answer }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden mb-3">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <span className="font-semibold text-gray-800 text-sm">{question}</span>
        <ChevronDown className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} size={20} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-gray-50"
          >
            <div className="p-4 text-sm text-gray-600 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [timeLeft, setTimeLeft] = useState(15 * 60 + 47); // 15:47 initial timer

  const scrollToPricing = () => {
    const element = document.getElementById('pricing');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')} : ${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-hero-gradient">
      <PurchaseNotification />
      {/* --- Top Bar --- */}
      <div className="bg-red-600 text-white py-2.5 px-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 sticky top-0 z-50 shadow-lg border-b border-white/10">
        <div className="flex items-center gap-3 text-sm font-black uppercase tracking-widest whitespace-nowrap">
          OFERTA DE VUELTA AL COLE
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-black opacity-90 uppercase tracking-tighter">EXPIRA EN:</span>
          <div className="bg-black/20 px-3 py-1 rounded-xl font-mono font-bold text-lg min-w-[100px] text-center border border-white/20">
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      <main className="w-full">
        {/* --- Hero Section --- */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-20 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-[1.1] mb-8">
            <span className="text-cyan-500">+150 Dinámicas</span> para que tus clases de Inglés sean <span className="text-cyan-500">3x más participativas</span>
          </h1>
          <p className="text-xl font-bold text-gray-700 mb-8">Para adolescentes de ESO y Bachillerato</p>

          <div className="mb-10 w-full sm:w-auto">
            <Button 
              href="#pricing"
              className="group uppercase !px-12 w-full sm:w-auto !rounded-full !text-base shadow-2xl"
            >
              Quiero el Acceso Ahora
            </Button>
          </div>

          <div className="relative w-full aspect-[9/16] bg-black rounded-[2.5rem] overflow-hidden shadow-2xl mb-10 border-4 border-white max-w-sm mx-auto">
            <iframe 
              src="https://player.vimeo.com/video/1188833211?h=79e2c65961&title=0&byline=0&portrait=1&autoplay=0&muted=0&transparent=0" 
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 w-full scale-105">
             {[
               "Fomenta la fluidez oral y el Speaking",
               "Conecta la gramática con la vida real",
               "Niveles recomendados: ESO y Bachillerato",
               "Materiales listos para imprimir (PDF)"
             ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 bg-emerald-500 text-white px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold justify-center shadow-lg shadow-emerald-100">
                   <div className="bg-white/20 p-1 rounded-full shrink-0"><Check size={14} strokeWidth={4} /></div>
                   <span>{text}</span>
                </div>
             ))}
          </div>

          <p className="text-gray-700 text-xl md:text-2xl font-medium max-w-3xl mx-auto mb-10 leading-relaxed text-balance">
            Transforma tus clases de Inglés en experiencias donde tus alumnos realmente hablen – sin pasar horas planificando desde cero.
          </p>

          <Button variant="primary" className="uppercase !text-base tracking-wide w-full sm:w-auto">
            QUIERO MIS DINÁMICAS LISTAS
          </Button>
        </section>

        {/* --- Pain Section --- */}
        <section className="min-h-screen flex flex-col justify-center bg-gray-50 py-20 px-6 border-y border-gray-100">
           <div className="max-w-4xl mx-auto w-full">
             <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
                  El problema <span className="text-red-500">NO</span> eres tú...
                </h2>
                <p className="text-gray-400 text-lg sm:text-xl italic">Si tú:</p>
             </div>

             <div className="space-y-4 mb-12 max-w-2xl mx-auto">
               {[
                 "Explicas el Verb To Be o Gramática y solo ves caras de aburrimiento.",
                 "Sientes que tus alumnos tienen miedo o vergüenza al hablar en público.",
                 "Los alumnos piensan que el Inglés es difícil o 'una pérdida de tiempo'.",
                 "Te cuesta conseguir que participen de forma espontánea en el aula.",
                 "Sales de clase sintiendo que no han practicado lo suficiente."
               ].map((text, i) => (
                 <div key={i} className="flex items-start sm:items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-200/50">
                   <div className="bg-red-100 text-red-500 p-1.5 rounded-lg shrink-0 mt-1 sm:mt-0">
                      <X size={16} strokeWidth={3} />
                   </div>
                   <span className="text-gray-700 text-base font-medium">{text}</span>
                 </div>
               ))}
             </div>

             <div className="text-center">
                <h3 className="text-cyan-500 text-5xl font-black mb-6">Respira.</h3>
                <p className="text-gray-600 text-lg leading-relaxed max-w-xl mx-auto">
                  Con estas <span className="font-bold text-gray-800 underline decoration-cyan-400 decoration-4">DINÁMICAS LISTAS</span>, conseguirás que cualquier joven pierda el miedo, se divierta y empiece a hablar Inglés con fluidez y naturalidad.
                </p>
             </div>
           </div>
        </section>

        {/* --- Bonuses Section --- */}
        <section className="min-h-screen flex flex-col justify-center py-20 px-6 max-w-4xl mx-auto">
           <div className="text-center mb-12">
             <motion.div 
               animate={{ scale: [1, 1.05, 1] }}
               transition={{ duration: 1.5, repeat: Infinity }}
               className="inline-block bg-red-600 text-white px-4 py-1.5 rounded-full text-xs font-bold mb-6 uppercase tracking-wider shadow-lg shadow-red-200"
             >
               Solo por hoy con el Paquete Completo
             </motion.div>
             <h2 className="text-3xl sm:text-5xl font-black text-gray-900 px-4">
                BONOS EXCLUSIVOS
             </h2>
           </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-12">
               <BonusCard title="Rompehielos (Icebreakers) para empezar la clase" img="https://i.ibb.co/jPSsdQCb/Bonus-01.png" free={true} price="15" />
               <BonusCard title="Guías de Conversación y Preguntas Poderosas" img="https://i.ibb.co/rRhmQYqF/Bonus-02.png" free={true} price="10" />
               <BonusCard title="Dinámicas con Canciones y Series del momento" img="https://i.ibb.co/Wp3M0sDf/Bonus-03.png" free={true} price="12" />
               <BonusCard title="Juegos de Vocabulario y Gramática Divertida" img="https://i.ibb.co/wNMDCZR7/Bonus-04.png" free={true} price="12" />
               <BonusCard title="Actualizaciones" img="https://i.ibb.co/27y4YK4s/Gemini-Generated-Image-a2k6uva2k6uva2k6.png" free={true} price="15" />
             </div>

           <div className="bg-cyan-50 p-8 rounded-[2rem] text-center border-2 border-dashed border-cyan-200">
             <p className="text-gray-600 text-lg leading-relaxed">
               Todos estos bonos están incluidos, ¡y <span className="font-bold text-gray-800 uppercase">SOLO POR HOY</span>, te los llevas <span className="text-emerald-500 font-black text-2xl ml-1">GRATIS!</span>
             </p>
           </div>
        </section>

        {/* --- Pricing Section --- */}
        <section id="pricing" className="min-h-screen flex flex-col justify-center py-20 px-6 bg-slate-50/50">
           <div className="max-w-4xl mx-auto w-full">
             <div className="text-center mb-12">
                <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">Elige tu Plan</h2>
                <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 px-6 py-3 rounded-2xl text-sm font-bold uppercase tracking-tight">
                  <AlertTriangle size={18} className="shrink-0" /> ÚLTIMAS UNIDADES A ESTE PRECIO PROMOCIONAL
                </div>
             </div>

             <div className="flex justify-center max-w-lg mx-auto">
                <PriceCard 
                  title="PLANO COMPLETO" 
                  isHighlight={true}
                  imageUrl="https://i.ibb.co/FkGfzQtR/Chat-GPT-Image-29-de-abr-de-2026-12-29-15.png"
                  subtitle="Para transformar tus clases todo el año"
                  price="7,90"
                  oldPrice="67"
                  features={[
                    { text: "+150 Dinámicas de Inglés", icon: GraduationCap },
                    { text: "Ideal para ESO y Bachillerato", icon: Users },
                    { text: "Acceso digital inmediato", icon: Clock },
                    { text: "Materiales 100% descargables", icon: Check },
                    { text: "Garantía de 14 días", icon: ShieldCheck },
                    { text: "Actualizaciones", icon: Calendar },
                    { text: "Soporte VIP prioritario", icon: MessageCircle },
                  ]}
                  bonusBox={[
                    "Icebreakers (Rompehielos)",
                    "Dinámicas con Música y Series",
                    "Guías de Conversación",
                    "Juegos de Vocabulario"
                  ]}
                  buttonText="Quiero mis dinámicas"
                />
             </div>
           </div>
        </section>

        {/* --- Social Proof Section --- */}
        <section className="py-20 px-6 w-full overflow-hidden">
           <div className="max-w-6xl mx-auto w-full text-center">
             <div className="relative w-full overflow-hidden">
                <motion.div 
                  className="flex gap-6 pb-12 snap-x"
                  animate={{ x: [0, -1600] }}
                  transition={{ 
                    duration: 40, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                >
                   {[
                     "https://i.ibb.co/QFskb3wv/Depoiento-01.png",
                     "https://i.ibb.co/Wvh2b4d8/Depoiento-02.png",
                     "https://i.ibb.co/21dDMHd0/Depoiento-03.png",
                     "https://i.ibb.co/v69rjF9m/Depoiento-04.png",
                     "https://i.ibb.co/QFskb3wv/Depoiento-01.png",
                     "https://i.ibb.co/Wvh2b4d8/Depoiento-02.png",
                     "https://i.ibb.co/21dDMHd0/Depoiento-03.png",
                     "https://i.ibb.co/v69rjF9m/Depoiento-04.png",
                   ].map((url, i) => (
                     <div key={i} className="min-w-[300px] sm:min-w-[400px] snap-center bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-gray-100 border border-gray-100 transition-all hover:scale-[1.03]">
                        <img 
                         src={url} 
                         alt={`Testimonial ${i}`} 
                         className="w-full transition-all duration-700" 
                         onError={(e) => e.currentTarget.src = 'https://placehold.co/400x600?text=Depoimento'}
                       />
                     </div>
                   ))}
                </motion.div>
             </div>
           </div>
        </section>

        {/* --- Author Section --- */}
        <section className="min-h-screen flex flex-col justify-center py-20 px-6 bg-gray-50 border-y border-gray-100">
           <div className="max-w-4xl mx-auto w-full text-center">
             <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-10">Conoce a Patrícia Mendes</h2>
             
             <div className="w-48 h-48 mx-auto rounded-[3rem] border-8 border-white shadow-2xl overflow-hidden mb-10 rotate-3 transition-transform hover:rotate-0 duration-500">
                <img src="https://i.ibb.co/Ld9YQfBT/Vers-o-melhorada.png" alt="Teacher" className="w-full h-full object-cover" />
             </div>

             <div className="max-w-2xl mx-auto">
               <p className="text-gray-600 text-lg leading-relaxed mb-10 text-balance">
                 Especialista en la enseñanza de idiomas con más de 15 años de experiencia en el aula. Desarrolló el método de Dinámicas Que Atraen para ayudar a docentes de ESO y Bachillerato a crear ambientes de aprendizaje donde el alumno es el verdadero protagonista, dejando atrás las clases monótonas de gramática pura.
               </p>

               <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-3 border border-blue-100 bg-white px-6 py-3 rounded-2xl text-blue-600 shadow-sm">
                    <GraduationCap size={18} /> 15+ años de experiencia
                  </div>
                  <div className="flex items-center gap-3 border border-emerald-100 bg-white px-6 py-3 rounded-2xl text-emerald-600 shadow-sm">
                    <Users size={18} /> +5.000 docentes impactados
                  </div>
               </div>
             </div>
           </div>
        </section>

        {/* --- Guarantee Section --- */}
        <section className="min-h-screen flex flex-col justify-center py-20 px-6">
           <div className="max-w-4xl mx-auto w-full text-center bg-cyan-50/50 p-12 sm:p-20 rounded-[4rem] border border-cyan-100/50">
             <div className="w-24 h-24 bg-white text-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-xl shadow-cyan-200/50 rotate-6">
               <ShieldCheck size={56} />
             </div>
             <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">Cero Riesgo por 14 días</h2>
             <p className="text-gray-600 text-lg leading-relaxed max-w-xl mx-auto">
               Prueba el material por 14 días. Si no te gusta o no funciona para ti, te devolvemos el 100% de tu dinero.
             </p>
           </div>
        </section>

        {/* --- FAQ Section --- */}
        <section className="min-h-screen flex flex-col justify-center py-20 px-6 bg-white">
           <div className="max-w-3xl mx-auto w-full">
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-16 text-center">Preguntas Frequentes</h2>
              
              <div className="space-y-4 mb-16 px-4">
                <AccordionItem question="¿Para qué edades sirve?" answer="El material ha sido desarrollado específicamente para adolescentes de ESO y Bachillerato, con lenguaje y retos adecuados para su nivel de madurez." />
                <AccordionItem question="¿Funciona en colegios públicos y privados?" answer="¡Sí! Las dinámicas han sido probadas en diversos contextos, requiriendo poco o ningún recurso tecnológico adicional." />
                <AccordionItem question="¿Es digital o físico?" answer="El acceso es 100% digital. Recibes todo el material en PDF listo para imprimir inmediatamente después de la compra en tu correo electrónico." />
                <AccordionItem question="¿Puedo usarlo en más de un grupo?" answer="¡Por supuesto! Una vez adquirido, el material es tuyo para usarlo con todos tus grupos y cuantas veces quieras." />
                <AccordionItem question="¿Necesito materiales especiales?" answer="La gran mayoría de las dinámicas utilizan solo papel, bolígrafo y el compromiso de los alumnos. El foco es la practicidad." />
              </div>

              <div className="text-center px-4">
                <div className="flex flex-col items-center gap-6">
                  <div className="flex items-center gap-4 bg-red-50 px-6 py-3 rounded-2xl border border-red-100">
                    <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-widest">
                      <Clock size={16} /> OFERTA DE VUELTA AL COLE EXPIRA EN:
                    </div>
                    <div className="bg-red-600 text-white px-3 py-1 rounded-lg font-mono font-bold text-lg min-w-[80px]">
                      {formatTime(timeLeft)}
                    </div>
                  </div>

                  <Button 
                    variant="primary" 
                    href="https://pay.hotmart.com/O105693747U?checkoutMode=10"
                    className="uppercase tracking-tight w-full sm:w-auto !py-6 !text-lg !rounded-full shadow-2xl shadow-emerald-200 whitespace-normal text-center leading-none"
                  >
                    EMPEZAR A USAR EL MATERIAL YA
                  </Button>
                </div>
              </div>
           </div>
        </section>

        <footer className="py-20 px-6 border-t border-gray-100 bg-gray-50/50">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-500 text-sm mb-6">+150 Dinámicas Interactivas de Inglés – Transformando el aula, recuperando tu tiempo.</p>
            <p className="text-gray-400 text-xs mb-6 uppercase tracking-widest font-bold">Copyright © 2026. Contenido protegido y registrado.</p>
            <p className="text-gray-400 text-xs max-w-md mx-auto italic leading-relaxed">
              Este producto no garantiza resultados mágicos, sino una metodología probada para aumentar la participación en clase.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
