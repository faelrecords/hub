import { StrictMode, useEffect, useRef, useState, useCallback } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowUpRight,
  Braces,
  Code2,
  Command,
  Globe,
  Layers,
  LockKeyhole,
  Palette,
  Search,
  Shield,
  Sparkles,
  Zap,
} from 'lucide-react'
import './styles.css'

const tools = [
  {
    name: 'Design',
    category: 'Design',
    type: 'Design System',
    description: 'Editor visual para criar, editar e exportar arquivos Design.MD com preview em tempo real.',
    url: 'https://faelrecords.github.io/Design/',
    available: true,
    icon: Palette,
  },
  {
    name: 'Context',
    category: 'Desenvolvimento',
    type: 'Gerenciador de Contexto',
    description: 'Gerencie projetos, prompts e AGENTS.md em um só lugar. Organize seu fluxo de trabalho com IA.',
    url: 'https://faelrecords.github.io/Context/',
    available: true,
    icon: Layers,
  },
]

const stats = [
  { label: 'Ferramentas', value: 2, suffix: '' },
  { label: 'Gratuito', value: 100, suffix: '%' },
  { label: 'Dados coletados', value: 0, suffix: '' },
  { label: 'Possibilidades', value: 999, suffix: '+' },
]

const features = [
  { icon: Zap, title: 'Client-side', desc: 'Tudo roda no navegador. Sem servidor, sem latência.' },
  { icon: Globe, title: 'Open Source', desc: 'Código aberto no GitHub. Contribua livremente.' },
  { icon: Layers, title: 'Responsivo', desc: 'Funciona em qualquer dispositivo e tamanho de tela.' },
  { icon: Code2, title: 'Extensível', desc: 'Adicione suas próprias ferramentas ao Hub.' },
]

const techStack = ['React', 'Vite', 'Lucide', 'CSS Puro', 'Montserrat']

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

function AnimatedNumber({ target, suffix, active }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = 0
    const duration = 1200
    const startTime = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setVal(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, target])
  return <b>{val}{suffix}</b>
}

function BackgroundCanvas() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const blobsRef = useRef([
    { x: 0.2, y: 0.3, r: 0.15, vx: 0.0003, vy: 0.0002, phase: 0, color: [69, 229, 139] },
    { x: 0.7, y: 0.6, r: 0.12, vx: -0.0002, vy: 0.0003, phase: 2, color: [0, 191, 194] },
    { x: 0.5, y: 0.8, r: 0.1, vx: 0.00025, vy: -0.00015, phase: 4, color: [69, 229, 139] },
    { x: 0.3, y: 0.5, r: 0.08, vx: -0.0002, vy: -0.00025, phase: 1, color: [0, 191, 194] },
  ])
  const particlesRef = useRef([])
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w, h, dpr

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const initParticles = () => {
      const count = Math.min(40, Math.floor((w * h) / 25000))
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 1,
      }))
    }

    resize()
    initParticles()
    const onResize = () => { resize(); initParticles() }
    window.addEventListener('resize', onResize)

    const onMouse = (e) => { mouseRef.current.x = e.clientX; mouseRef.current.y = e.clientY }
    const onLeave = () => { mouseRef.current.x = -1000; mouseRef.current.y = -1000 }
    window.addEventListener('mousemove', onMouse)
    document.addEventListener('mouseleave', onLeave)

    let time = 0
    const draw = () => {
      time += 0.016
      ctx.clearRect(0, 0, w, h)
      const mx = mouseRef.current.x, my = mouseRef.current.y

      for (const b of blobsRef.current) {
        b.phase += b.vx * 2
        b.x += Math.sin(b.phase) * b.vx + Math.cos(time * 0.5 + b.phase) * 0.0001
        b.y += Math.cos(b.phase * 0.7) * b.vy + Math.sin(time * 0.3 + b.phase) * 0.0001
        if (b.x < -0.1) b.x = 1.1; if (b.x > 1.1) b.x = -0.1
        if (b.y < -0.1) b.y = 1.1; if (b.y > 1.1) b.y = -0.1
        const bx = b.x * w, by = b.y * h, br = b.r * Math.min(w, h)
        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, br)
        const [r, g, bl] = b.color
        grad.addColorStop(0, `rgba(${r},${g},${bl},0.12)`)
        grad.addColorStop(0.4, `rgba(${r},${g},${bl},0.05)`)
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.beginPath(); ctx.arc(bx, by, br, 0, Math.PI * 2); ctx.fill()
      }

      const gridSize = 48, focusRadius = 220
      ctx.lineWidth = 1
      for (let x = 0; x <= w; x += gridSize) {
        const dist = mx >= 0 ? Math.abs(x - mx) : focusRadius
        ctx.strokeStyle = `rgba(255,255,255,${mx >= 0 ? Math.max(0.02, 0.08 * (1 - dist / focusRadius)) : 0.02})`
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke()
      }
      for (let y = 0; y <= h; y += gridSize) {
        const dist = my >= 0 ? Math.abs(y - my) : focusRadius
        ctx.strokeStyle = `rgba(255,255,255,${my >= 0 ? Math.max(0.02, 0.08 * (1 - dist / focusRadius)) : 0.02})`
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke()
      }

      if (mx >= 0) {
        const gg = ctx.createRadialGradient(mx, my, 0, mx, my, focusRadius)
        gg.addColorStop(0, 'rgba(69,229,139,0.06)'); gg.addColorStop(1, 'transparent')
        ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(mx, my, focusRadius, 0, Math.PI * 2); ctx.fill()
      }

      const ps = particlesRef.current
      for (const p of ps) {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0
      }
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x, dy = ps[i].y - ps[j].y, d = Math.sqrt(dx * dx + dy * dy)
          if (d < 140) {
            ctx.strokeStyle = `rgba(69,229,139,${0.08 * (1 - d / 140)})`
            ctx.lineWidth = 0.5; ctx.beginPath()
            ctx.moveTo(ps[i].x, ps[i].y); ctx.lineTo(ps[j].x, ps[j].y); ctx.stroke()
          }
        }
      }
      for (const p of ps) {
        ctx.fillStyle = 'rgba(69,229,139,0.2)'; ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill()
      }
      rafRef.current = requestAnimationFrame(draw)
    }
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMouse)
      document.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="bg-canvas" />
}

function StatsSection() {
  const [ref, visible] = useInView(0.2)
  return (
    <section ref={ref} className={`stats-section ${visible ? 'in-view' : ''}`}>
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={s.label} className="stat-card glass" style={{ transitionDelay: `${i * 80}ms` }}>
            <AnimatedNumber target={s.value} suffix={s.suffix} active={visible} />
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function FeaturesSection() {
  const [ref, visible] = useInView(0.1)
  return (
    <section ref={ref} className={`features-section ${visible ? 'in-view' : ''}`}>
      <h2 className="section-title">Por que o <span className="green">HUB</span>?</h2>
      <div className="features-grid">
        {features.map((f, i) => {
          const Icon = f.icon
          return (
            <div key={f.title} className="feature-card glass" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="feature-icon"><Icon /></div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function TechStackSection() {
  const [ref, visible] = useInView(0.2)
  return (
    <section ref={ref} className={`tech-section ${visible ? 'in-view' : ''}`}>
      <h2 className="section-title">Construído com</h2>
      <div className="tech-row">
        {techStack.map((t, i) => (
          <span key={t} className="tech-pill glass" style={{ transitionDelay: `${i * 60}ms` }}>{t}</span>
        ))}
      </div>
    </section>
  )
}

function CTASection() {
  const [ref, visible] = useInView(0.2)
  return (
    <section ref={ref} className={`cta-section ${visible ? 'in-view' : ''}`}>
      <div className="cta-card glass">
        <h2>Pronto para começar?</h2>
        <p>Acesse o Design System e comece a criar agora mesmo.</p>
        <a href="https://faelrecords.github.io/Design/" className="cta-btn">Abrir Design System <ArrowUpRight /></a>
      </div>
    </section>
  )
}

function App() {
  const [query, setQuery] = useState('')

  return (
    <main>
      <BackgroundCanvas />
      <header className="header">
        <a className="brand" href="/"><Command /><b>HUB</b></a>
        <nav><a className="active" href="#ferramentas">Ferramentas</a><a href="#sobre">Sobre</a></nav>
        <label className="top-search"><Search /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar ferramentas..." /><kbd>⌘ K</kbd></label>
      </header>

      <div className="container">
        <section className="hero fade-in">
          <div className="hero-badge">✦ v1.0</div>
          <div className="hero-copy">
            <h1>Hub de <span className="green">Ferramentas</span></h1>
            <span className="hero-sub">by <a href="https://instagram.com/fael.records" className="green">@fael.records</a></span>
            <p>Uma coleção de ferramentas independentes para desenvolvedores e designers. Cada ferramenta tem seu foco, sua interface e seus dados. Sempre que possível, tudo acontece no seu navegador.</p>
            <div className="principles">
              <div className="principle-card glass"><Zap /><span>Rápidas</span></div>
              <div className="principle-card glass"><Shield /><span>Privadas</span></div>
              <div className="principle-card glass"><Braces /><span>Client-side</span></div>
            </div>
            <a href="#ferramentas" className="hero-cta">Explorar ferramentas <ArrowUpRight /></a>
          </div>
        </section>

        <StatsSection />

        <section id="ferramentas" className="catalog">
          <h2 className="section-title">Ferramentas</h2>
          <div className="tool-list">
            {tools.map((tool) => <DesignTool key={tool.name} tool={tool} />)}
            <article className="tool coming">
              <div className="tool-icon"><LockKeyhole /></div>
              <div className="tool-copy"><div className="title-row"><h2>Mais ferramentas</h2><span>Em breve</span></div><b>Novidades</b><p>Estamos trabalhando em novas ferramentas para ampliar o Hub. Fique atento!</p></div>
              <button disabled><LockKeyhole /> Em breve</button>
            </article>
          </div>
        </section>

        <FeaturesSection />
        <TechStackSection />

        <section id="sobre" className="about-section">
          <h2 className="section-title">Sobre o <span className="green">HUB</span></h2>
          <p className="about-desc">O Hub reúne ferramentas leves e independentes para quem trabalha com design e desenvolvimento. Sem login, sem complicação — tudo roda direto no navegador.</p>
          <div className="about-grid">
            <div className="about-card glass"><Zap /><h3>Rápido</h3><p>Sem carregamentos pesados. Ferramentas que abrem e funcionam na hora.</p></div>
            <div className="about-card glass"><Shield /><h3>Privado</h3><p>Seus dados ficam no seu navegador. Nada é enviado para servidores externos.</p></div>
            <div className="about-card glass"><Sparkles /><h3>Simples</h3><p>Cada ferramenta faz uma coisa bem feita. Sem features desnecessárias.</p></div>
          </div>
        </section>

        <CTASection />
      </div>

      <footer><a className="brand" href="/"><Command /><b>HUB</b></a><span>© 2026 Hub. Ferramentas independentes.</span><div><a href="#ferramentas">Ferramentas</a><a href="#sobre">Sobre</a></div></footer>
    </main>
  )
}

function DesignTool({ tool }) {
  const Icon = tool.icon
  return (
    <article className="tool featured">
      <div className="tool-icon"><Icon /></div>
      <div className="tool-copy"><div className="title-row"><h2>{tool.name}</h2><span>Disponível</span></div><b>{tool.type}</b><p>{tool.description}</p></div>
      {tool.name === 'Design' ? (
        <div className="design-preview">
          <div className="mini-sidebar"><small>Design.MD</small><i /><i className="selected" /><i /><i /><i /></div>
          <div className="mini-editor"><small>Cores</small><span><i /><i /><i /><i /><i /></span><div /><div /></div>
          <div className="mini-page"><small>Preview</small><h3>Defina seu sistema.<em>Veja cada mudança.</em></h3><p>Tokens visuais em tempo real.</p><button>Começar</button></div>
        </div>
      ) : (
        <div className="design-preview">
          <div className="mini-sidebar"><small>Context</small><i /><i className="selected" /><i /><i /><i /></div>
          <div className="mini-editor"><small>Projetos</small><span><i /><i /><i /><i /><i /></span><div /><div /></div>
          <div className="mini-page"><small>Dashboard</small><h3>Gerencie seu contexto.<em>Organize tudo.</em></h3><p>Projetos, prompts e AGENTS.md.</p><button>Abrir</button></div>
        </div>
      )}
      <div className="tool-action"><a href={tool.url}>Abrir ferramenta <ArrowUpRight /></a></div>
    </article>
  )
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
