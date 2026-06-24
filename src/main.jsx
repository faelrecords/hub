import { StrictMode, useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowUpRight,
  Box,
  Braces,
  Check,
  Code2,
  Command,
  Layers3,
  LockKeyhole,
  Palette,
  Search,
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
    name: 'Contrast',
    category: 'Design',
    type: 'Acessibilidade',
    description: 'Verifique contraste de cores e acessibilidade com base nas diretrizes WCAG.',
    available: false,
    icon: Box,
  },
  {
    name: 'Tokens',
    category: 'Desenvolvimento',
    type: 'Design Tokens',
    description: 'Gerencie design tokens e exporte para diferentes formatos com facilidade.',
    available: false,
    icon: Layers3,
  },
  {
    name: 'Convert',
    category: 'Utilitários',
    type: 'Conversores',
    description: 'Converta cores, unidades e códigos entre diferentes formatos.',
    available: false,
    icon: Code2,
  },
]

function App() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Todas')
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

  const filtered = useMemo(() => tools.filter((tool) => {
    const matchesQuery = `${tool.name} ${tool.type} ${tool.description}`.toLowerCase().includes(query.toLowerCase())
    return matchesQuery && (category === 'Todas' || tool.category === category)
  }), [query, category])

  return (
    <main ref={glowRef} className="has-glow">
      <div className="grid-bg" />
      <header className="header">
        <a className="brand" href="#"><Command /><b>Hub</b></a>
        <nav><a className="active" href="#ferramentas">Ferramentas</a><a href="#novidades">Novidades</a><a href="#sobre">Sobre</a></nav>
        <label className="top-search"><Search /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar ferramentas..." /><kbd>⌘ K</kbd></label>
      </header>

      <div className="container">
        <section className="hero">
          <div className="hero-copy">
            <h1>Hub de <span className="green">Ferramentas</span><br /><span className="hero-sub">Hub de ferramentas by <a href="https://instagram.com/fael.records" target="_blank" rel="noreferrer" className="green">@fael.records</a></span></h1>
            <p>Uma coleção de ferramentas independentes para desenvolvedores e designers. Cada ferramenta tem seu foco, sua interface e seus dados. Sempre que possível, tudo acontece no seu navegador.</p>
            <div className="principles"><span><Zap /> Rápidas</span><span><LockKeyhole /> Privadas</span><span><Braces /> Client-side</span></div>
          </div>
        </section>

        <section id="ferramentas" className="catalog">
          <div className="filters">
            <div>{['Todas', 'Design', 'Desenvolvimento', 'Utilitários'].map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div>
            <label><Search /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por nome ou categoria..." /></label>
          </div>

          <div className="tool-list">
            {filtered.map((tool) => tool.available ? <DesignTool key={tool.name} tool={tool} /> : <ComingTool key={tool.name} tool={tool} />)}
            {!filtered.length && <div className="empty">Nenhuma ferramenta encontrada.</div>}
          </div>

          <div className="coming-soon-banner">
            <Sparkles />
            <span>Mais ferramentas em breve</span>
          </div>
        </section>
      </div>

      <footer id="sobre"><a className="brand" href="#"><Command /><b>Hub</b></a><span>© 2026 Hub. Ferramentas independentes.</span><div><a href="#ferramentas">Ferramentas</a><a href="#novidades">Novidades</a><a href="#sobre">Sobre</a></div></footer>
    </main>
  )
}

function DesignTool({ tool }) {
  const Icon = tool.icon
  return (
    <article className="tool featured">
      <div className="tool-icon"><Icon /></div>
      <div className="tool-copy"><div className="title-row"><h2>{tool.name}</h2><span>Disponível</span></div><b>{tool.type}</b><p>{tool.description}</p></div>
      <div className="design-preview">
        <div className="mini-sidebar"><small>Design.MD</small><i /><i className="selected" /><i /><i /><i /></div>
        <div className="mini-editor"><small>Cores</small><span><i /><i /><i /><i /><i /></span><div /><div /></div>
        <div className="mini-page"><small>Preview</small><h3>Defina seu sistema.<em>Veja cada mudança.</em></h3><p>Tokens visuais em tempo real.</p><button>Começar</button></div>
      </div>
      <div className="tool-action"><a href={tool.url} target="_blank" rel="noreferrer">Abrir ferramenta <ArrowUpRight /></a></div>
    </article>
  )
}

function ComingTool({ tool }) {
  const Icon = tool.icon
  return (
    <article className="tool coming">
      <div className="tool-icon"><Icon /></div>
      <div className="tool-copy"><div className="title-row"><h2>{tool.name}</h2><span>Em breve</span></div><b>{tool.type}</b><p>{tool.description}</p></div>
      <button disabled><LockKeyhole /> Em breve</button>
    </article>
  )
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
