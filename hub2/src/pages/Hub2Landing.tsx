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
    description:
      "Editor visual para criar, editar e exportar arquivos Design.MD com preview em tempo real. Defina cores, tipografia, espaçamento e veja cada mudança ao vivo.",
    url: "https://faelrecords.github.io/Design/",
    color: "#45E58B",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
      </svg>
    ),
    features: ["Preview ao vivo", "Exportação MD", "Grid system"],
  },
  {
    name: "Context Manager",
    tag: "Disponível",
    status: "active",
    description:
      "Gerencie o contexto dos seus projetos para IA. Organize prompts, gere AGENTS.md, exporte kits de contexto como .zip para qualquer ferramenta de código.",
    url: "https://faelrecords.github.io/Context/",
    color: "#00BFC2",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    features: ["Prompts organizados", "Geração de AGENTS.md", "Export .zip"],
  },
];

const features = [
  {
    title: "100% no Browser",
    description: "Sem instalação, sem servidor, sem configuração. Abra e use.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    title: "Open Source",
    description: "Código aberto no GitHub. Contribua, reporte bugs, sugira melhorias.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    title: "Sem Login",
    description: "Acesse direto, sem cadastro, sem senhas, sem burocracia.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
      </svg>
    ),
  },
  {
    title: "Sem Dados Coletados",
    description: "Tudo fica no seu navegador. Nada sai do seu dispositivo.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

const stats = [
  { value: "2", label: "Ferramentas ativas" },
  { value: "100%", label: "Gratuito" },
  { value: "0", label: "Dados coletados" },
  { value: "∞", label: "Possibilidades" },
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
  {
    q: "As ferramentas funcionam offline?",
    a: "Sim, depois de carregar pela primeira vez. Como tudo roda no browser, após o download inicial você pode usar sem conexão.",
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

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const [ref, visible] = useInView(0.3);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!visible) return;
    if (value === "∞" || value === "100%") {
      setDisplay(value);
      return;
    }
    const target = parseInt(value, 10);
    if (isNaN(target)) {
      setDisplay(value);
      return;
    }
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * target);
      setDisplay(String(start));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [visible, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}{suffix}
    </span>
  );
}

function ToolCard({ tool, index }: { tool: (typeof tools)[0]; index: number }) {
  const [ref, visible] = useInView(0.12);
  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-2xl border border-[#26302B] bg-gradient-to-b from-[#121715] to-[#0a0f0c] p-7 md:p-8 transition-all duration-400 hover:border-[color:var(--tool-color)]/30 hover:shadow-[0_0_60px_-15px_var(--tool-glow)] relative overflow-hidden"
        style={{ "--tool-color": tool.color, "--tool-glow": `${tool.color}40` } as React.CSSProperties}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${tool.color}08, transparent 40%)` }}
        />
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
              style={{ background: `${tool.color}12`, border: `1px solid ${tool.color}25` }}
            >
              <span style={{ color: tool.color }}>{tool.icon}</span>
            </div>
            <span
              className="text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5"
              style={{ background: `${tool.color}12`, color: tool.color }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: tool.color }} />
              {tool.tag}
            </span>
          </div>
          <h3 className="text-[#F3F7F5] text-2xl font-bold mb-3 tracking-tight">{tool.name}</h3>
          <p className="text-[#94A29B] text-sm leading-relaxed mb-6">{tool.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {tool.features.map((f) => (
              <span key={f} className="text-xs px-2.5 py-1 rounded-md bg-[#080B0A] border border-[#26302B] text-[#94A29B]">
                {f}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold transition-colors" style={{ color: tool.color }}>
            <span>Abrir ferramenta</span>
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </div>
        </div>
      </a>
    </div>
  );
}

function FeatureCard({ feature, index }: { feature: (typeof features)[0]; index: number }) {
  const [ref, visible] = useInView(0.15);
  return (
    <div
      ref={ref}
      className={`group rounded-2xl border border-[#26302B] bg-[#121715]/60 backdrop-blur-sm p-6 transition-all duration-400 hover:border-[#45E58B]/20 hover:bg-[#121715] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="w-12 h-12 rounded-xl bg-[#45E58B]/10 border border-[#45E58B]/20 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
        <span className="text-[#45E58B]">{feature.icon}</span>
      </div>
      <h3 className="text-[#F3F7F5] text-lg font-bold mb-2 tracking-tight">{feature.title}</h3>
      <p className="text-[#94A29B] text-sm leading-relaxed">{feature.description}</p>
    </div>
  );
}

function StatCard({ stat, index }: { stat: (typeof stats)[0]; index: number }) {
  const [ref, visible] = useInView(0.2);
  return (
    <div
      ref={ref}
      className={`text-center transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="text-4xl md:text-5xl font-bold mb-2" style={{ background: "linear-gradient(135deg, #45E58B, #00BFC2)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        <AnimatedCounter value={stat.value} />
      </div>
      <p className="text-[#94A29B] text-sm font-medium">{stat.label}</p>
    </div>
  );
}

function FaqItem({ item, index }: { item: (typeof faq)[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const [ref, visible] = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`border border-[#26302B] rounded-xl overflow-hidden transition-all duration-400 hover:border-[#26302B]/80 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left bg-[#121715] hover:bg-[#1a2420] transition-colors duration-200"
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
      <div className={`overflow-hidden transition-all duration-300 ease-out ${open ? "max-h-48" : "max-h-0"}`}>
        <p className="px-5 pb-5 md:px-6 md:pb-6 text-[#94A29B] text-sm leading-relaxed">{item.a}</p>
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
      <section id="ferramentas" className="max-w-6xl mx-auto px-5 md:px-8 pt-32 pb-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#45E58B]/8 border border-[#45E58B]/15 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#45E58B] animate-pulse" />
            <span className="text-[#45E58B] text-xs font-semibold tracking-wide uppercase">Ecossistema</span>
          </div>
          <h2 className="landing-title text-[#F3F7F5] text-3xl md:text-5xl font-bold mb-5 tracking-tight">
            Ferramentas que{" "}
            <span className="bg-gradient-to-r from-[#45E58B] to-[#00BFC2] bg-clip-text text-transparent">
              funcionam juntas
            </span>
          </h2>
          <p className="landing-subtitle text-[#94A29B] text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Cada ferramenta tem seu foco, sua interface e seus dados. Juntas, formam um ecossistema completo — tudo no navegador.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {tools.map((tool, i) => (
            <ToolCard key={tool.name} tool={tool} index={i} />
          ))}
        </div>

        <div className="rounded-2xl border border-dashed border-[#26302B] bg-[#0D1210]/50 p-7 md:p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-[#121715] border border-[#26302B] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#94A29B]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            <h3 className="text-[#F3F7F5] font-bold text-lg">Mais ferramentas em breve</h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {["Component Library", "API Playground", "Color Palette Gen"].map((name) => (
              <div key={name} className="rounded-xl bg-[#121715] border border-[#26302B] p-5 transition-colors duration-200 hover:border-[#26302B]/80">
                <p className="text-[#F3F7F5] text-sm font-semibold mb-1">{name}</p>
                <p className="text-[#94A29B] text-xs">Em desenvolvimento</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="landing-title text-[#F3F7F5] text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Por que o Hub?
          </h2>
          <p className="landing-subtitle text-[#94A29B] text-base max-w-lg mx-auto">
            Simplicidade sem compromisso. Ferramentas profissionais que respeitam sua privacidade.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#080B0A] via-[#0D1210]/50 to-[#080B0A]" />
        <div className="relative max-w-5xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-5 md:px-8 py-20">
        <div className="relative rounded-3xl border border-[#26302B] bg-gradient-to-b from-[#121715] to-[#0a0f0c] p-10 md:p-14 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(69,229,139,0.06)_0%,_transparent_70%)]" />
          <div className="relative z-10">
            <h2 className="text-[#F3F7F5] text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Comece agora
            </h2>
            <p className="text-[#94A29B] text-base md:text-lg mb-8 max-w-md mx-auto leading-relaxed">
              Ferramentas criadas para quem ama interfaces bonitas e código limpo. Tudo open source.
            </p>
            <a
              href="#ferramentas"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-b from-[#45E58B] to-[#38CC7A] text-[#080B0A] font-bold text-sm transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_0_30px_rgba(69,229,139,0.3)] active:translate-y-0 active:scale-[0.98]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
              </svg>
              Explorar ferramentas
            </a>
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
      <footer className="border-t border-[#26302B]">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-14">
          <div className="grid md:grid-cols-3 gap-10 md:gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[#45E58B] flex items-center justify-center">
                  <svg className="w-4.5 h-4.5 text-[#080B0A]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                  </svg>
                </div>
                <span className="text-[#F3F7F5] font-bold text-xl">Hub</span>
              </div>
              <p className="text-[#94A29B] text-sm leading-relaxed max-w-xs">
                Ferramentas independentes para desenvolvedores que valorizam design, privacidade e código limpo.
              </p>
            </div>
            <div>
              <h4 className="text-[#F3F7F5] font-semibold text-sm mb-4">Ferramentas</h4>
              <ul className="space-y-2.5">
                <li><a href="https://faelrecords.github.io/Design/" target="_blank" rel="noopener noreferrer" className="text-[#94A29B] text-sm hover:text-[#45E58B] transition-colors duration-200">Design System</a></li>
                <li><a href="https://faelrecords.github.io/Context/" target="_blank" rel="noopener noreferrer" className="text-[#94A29B] text-sm hover:text-[#45E58B] transition-colors duration-200">Context Manager</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#F3F7F5] font-semibold text-sm mb-4">Projeto</h4>
              <ul className="space-y-2.5">
                <li><a href="https://github.com/faelrecords/hub" target="_blank" rel="noopener noreferrer" className="text-[#94A29B] text-sm hover:text-[#45E58B] transition-colors duration-200 flex items-center gap-2"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>GitHub</a></li>
                <li><a href="#ferramentas" className="text-[#94A29B] text-sm hover:text-[#45E58B] transition-colors duration-200">Ferramentas</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#26302B] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#94A29B] text-xs">&copy; 2026 Hub. Ferramentas independentes.</p>
            <div className="flex items-center gap-1.5 text-[#94A29B] text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#45E58B] animate-pulse" />
              Todos os sistemas operacionais
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
