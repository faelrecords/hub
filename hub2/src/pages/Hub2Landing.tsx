import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const tools = [
  {
    name: "Design System",
    tag: "Disponível",
    status: "active",
    description: "Editor visual para criar, editar e exportar arquivos Design.MD com preview em tempo real. Defina cores, tipografia, espaçamento e veja cada mudança ao vivo.",
    url: "https://faelrecords.github.io/Design/",
    color: "#45E58B",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" /></svg>
    ),
  },
  {
    name: "Context Manager",
    tag: "Disponível",
    status: "active",
    description: "Gerencie o contexto dos seus projetos para IA. Organize prompts, gere AGENTS.md, exporte kits de contexto como .zip para qualquer ferramenta de código.",
    url: "https://faelrecords.github.io/Context/",
    color: "#00BFC2",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" /></svg>
    ),
  },
];

const comingSoon = [
  { name: "Component Library", desc: "Biblioteca de componentes reutilizáveis" },
  { name: "API Playground", desc: "Teste APIs diretamente no browser" },
  { name: "Color Palette Gen", desc: "Gere paletas acessíveis automaticamente" },
];

const faq = [
  {
    q: "As ferramentas são gratuitas?",
    a: "Sim. Todas as ferramentas do Hub são 100% gratuitas e open source. Tudo roda no seu navegador — sem login, sem servidores, sem dados coletados.",
  },
  {
    q: "Preciso instalar algo?",
    a: "Não. O Hub funciona inteiramente no browser. Basta acessar o link de cada ferramenta e começar a usar.",
  },
  {
    q: "Como posso contribuir?",
    a: "O código está aberto no GitHub. Você pode reportar bugs, sugerir funcionalidades ou enviar pull requests.",
  },
  {
    q: "Meus dados ficam salvos?",
    a: "Depende da ferramenta. O Design System salva tudo localmente no seu navegador. O Context Manager também funciona 100% client-side.",
  },
];

function useInView<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

function ToolCard({ tool, index }: { tool: (typeof tools)[0]; index: number }) {
  const [ref, visible] = useInView(0.15);
  return (
    <div
      ref={ref}
      className={`transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-2xl border border-[#26302B] bg-[#121715] p-6 md:p-8 transition-all duration-300 hover:border-[#45E58B]/30 hover:shadow-[0_0_40px_-10px_rgba(69,229,139,0.15)]"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: `${tool.color}15`, border: `1px solid ${tool.color}30` }}
        >
          <span style={{ color: tool.color }}>{tool.icon}</span>
        </div>
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{ background: `${tool.color}15`, color: tool.color }}
        >
          {tool.tag}
        </span>
      </div>
      <h3 className="text-[#F3F7F5] text-xl font-bold mb-2">{tool.name}</h3>
      <p className="text-[#94A29B] text-sm leading-relaxed mb-6">{tool.description}</p>
      <div className="flex items-center gap-2 text-sm font-semibold transition-colors" style={{ color: tool.color }}>
        <span>Abrir ferramenta</span>
        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
      </div>
    </a>
    </div>
  );
}

function FaqItem({ item, index }: { item: (typeof faq)[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const [ref, visible] = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`border border-[#26302B] rounded-xl overflow-hidden transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left bg-[#121715] hover:bg-[#1a2420] transition-colors"
      >
        <span className="text-[#F3F7F5] font-semibold text-sm md:text-base pr-4">{item.q}</span>
        <svg
          className={`w-5 h-5 text-[#94A29B] shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40" : "max-h-0"}`}>
        <p className="px-5 pb-5 text-[#94A29B] text-sm leading-relaxed">{item.a}</p>
      </div>
    </div>
  );
}

export function Hub2Landing() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".landing-title", {
        scrollTrigger: { trigger: ".landing-title", start: "top 85%" },
        y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
      });
      gsap.from(".landing-subtitle", {
        scrollTrigger: { trigger: ".landing-subtitle", start: "top 85%" },
        y: 30, opacity: 0, duration: 0.8, delay: 0.15, ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative bg-[#080B0A]">
      {/* TOOLS */}
      <section id="ferramentas" className="max-w-5xl mx-auto px-5 md:px-8 pt-24 pb-16">
        <div className="text-center mb-14">
          <h2 className="landing-title text-[#F3F7F5] text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Ferramentas
          </h2>
          <p className="landing-subtitle text-[#94A29B] text-base md:text-lg max-w-lg mx-auto">
            Cada ferramenta tem seu foco, sua interface e seus dados. Tudo no navegador.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-5">
          {tools.map((tool, i) => (
            <ToolCard key={tool.name} tool={tool} index={i} />
          ))}
        </div>

        <div className="rounded-2xl border border-dashed border-[#26302B] bg-[#0D1210] p-6 md:p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-[#121715] border border-[#26302B] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#94A29B]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            </div>
            <h3 className="text-[#F3F7F5] font-bold text-lg">Mais ferramentas em breve</h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {comingSoon.map((item) => (
              <div key={item.name} className="rounded-xl bg-[#121715] border border-[#26302B] p-4">
                <p className="text-[#F3F7F5] text-sm font-semibold mb-1">{item.name}</p>
                <p className="text-[#94A29B] text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-5 md:px-8 py-20">
        <h2 className="text-[#F3F7F5] text-2xl md:text-4xl font-bold text-center mb-10 tracking-tight">
          Dúvidas frequentes
        </h2>
        <div className="space-y-3">
          {faq.map((item, i) => (
            <FaqItem key={item.q} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#26302B] py-10 px-5 md:px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#45E58B] flex items-center justify-center">
              <svg className="w-4 h-4 text-[#080B0A]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" /></svg>
            </div>
            <span className="text-[#F3F7F5] font-bold text-lg">Hub</span>
          </div>
          <p className="text-[#94A29B] text-sm">© 2026 Hub. Ferramentas independentes.</p>
          <div className="flex items-center gap-5">
            <a href="#ferramentas" className="text-[#94A29B] text-sm hover:text-[#45E58B] transition-colors">Ferramentas</a>
            <a href="https://github.com/faelrecords" target="_blank" rel="noopener noreferrer" className="text-[#94A29B] text-sm hover:text-[#45E58B] transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
