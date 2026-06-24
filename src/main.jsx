import { StrictMode, useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowUpRight,
  Braces,
  Command,
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
]

function App() {
  const [query, setQuery] = useState('')
  const glowRef = useRef(null)

  useEffect(() => {
    const handleMouse = (e) => {
      if (glowRef.current) {
        glowRef.current.style.setProperty('--mx', e.clientX + 'px')
        glowRef.current.style.setProperty('--my', e.clientY + 'px')
      }
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  return (
    <main ref={glowRef} className="has-glow">
      <div className="lava-blobs">
        <div className="lava-blob" />
        <div className="lava-blob" />
        <div className="lava-blob" />
      </div>
      <div className="grid-bg" />
      <header className="header">
        <a className="brand" href="/"><Command /><b>HUB</b></a>
        <nav><a className="active" href="#ferramentas">Ferramentas</a><a href="#sobre">Sobre</a></nav>
        <label className="top-search"><Search /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar ferramentas..." /><kbd>⌘ K</kbd></label>
      </header>

      <div className="container">
        <section className="hero fade-in">
          <div className="hero-copy">
            <h1>Hub de <span className="green">Ferramentas</span><br /><span className="hero-sub">by <a href="https://instagram.com/fael.records" className="green">@fael.records</a></span></h1>
            <p>Uma coleção de ferramentas independentes para desenvolvedores e designers. Cada ferramenta tem seu foco, sua interface e seus dados. Sempre que possível, tudo acontece no seu navegador.</p>
            <div className="principles"><span><Zap /> Rápidas</span><span><Shield /> Privadas</span><span><Braces /> Client-side</span></div>
          </div>
        </section>

        <section id="ferramentas" className="catalog fade-in-up">
          <div className="tool-list">
            {tools.map((tool) => <DesignTool key={tool.name} tool={tool} />)}
            <article className="tool coming fade-in-up" style={{animationDelay: '.15s'}}>
              <div className="tool-icon"><LockKeyhole /></div>
              <div className="tool-copy"><div className="title-row"><h2>Mais ferramentas</h2><span>Em breve</span></div><b>Novidades</b><p>Estamos trabalhando em novas ferramentas para ampliar o Hub. Fique atento!</p></div>
              <button disabled><LockKeyhole /> Em breve</button>
            </article>
          </div>
        </section>

        <section id="sobre" className="about-section fade-in-up">
          <h2>Sobre o <span className="green">HUB</span></h2>
          <p>O Hub reúne ferramentas leves e independentes para quem trabalha com design e desenvolvimento. Sem login, sem complicação — tudo roda direto no navegador.</p>
          <div className="about-grid">
            <div className="about-card">
              <Zap />
              <h3>Rápido</h3>
              <p>Sem carregamentos pesados. Ferramentas que abrem e funcionam na hora.</p>
            </div>
            <div className="about-card">
              <Shield />
              <h3>Privado</h3>
              <p>Seus dados ficam no seu navegador. Nada é enviado para servidores externos.</p>
            </div>
            <div className="about-card">
              <Sparkles />
              <h3>Simples</h3>
              <p>Cada ferramenta faz uma coisa bem feita. Sem features desnecessárias.</p>
            </div>
          </div>
        </section>
      </div>

      <footer><a className="brand" href="/"><Command /><b>HUB</b></a><span>© 2026 Hub. Ferramentas independentes.</span><div><a href="#ferramentas">Ferramentas</a><a href="#sobre">Sobre</a></div></footer>
    </main>
  )
}

function DesignTool({ tool }) {
  const Icon = tool.icon
  return (
    <article className="tool featured fade-in-up">
      <div className="tool-icon"><Icon /></div>
      <div className="tool-copy"><div className="title-row"><h2>{tool.name}</h2><span>Disponível</span></div><b>{tool.type}</b><p>{tool.description}</p></div>
      <div className="design-preview">
        <div className="mini-sidebar"><small>Design.MD</small><i /><i className="selected" /><i /><i /><i /></div>
        <div className="mini-editor"><small>Cores</small><span><i /><i /><i /><i /><i /></span><div /><div /></div>
        <div className="mini-page"><small>Preview</small><h3>Defina seu sistema.<em>Veja cada mudança.</em></h3><p>Tokens visuais em tempo real.</p><button>Começar</button></div>
      </div>
      <div className="tool-action"><a href={tool.url}>Abrir ferramenta <ArrowUpRight /></a></div>
    </article>
  )
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
