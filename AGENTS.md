# Hub — Regras de Desenvolvimento

## Stack
- React 19 + Vite
- CSS puro (sem Tailwind)
- Lucide React para ícones
- Google Fonts: Montserrat (principal), Inter, JetBrains Mono
- Deploy: GitHub Pages

## Design System
- **Cores**: `--green:#45E58B`, `--surface:#121715`, `--line:#26302B`, `--muted:#94A29B`, `--text:#F3F7F5`, `--bg:#080B0A`
- **Tipografia**: Montserrat bold para títulos, regular para corpo
- **Border radius**: 10px cards, 7px botões, 8px inputs
- **Espaçamento**: 8px base, 16px gap, 24px card padding

## Regras de Qualidade

### HTML/CSS
- Sempre usar `box-sizing: border-box`
- Responsivo: mobile-first com breakpoints em 650px e 950px
- Usar `clamp()` para tipografia fluida
- Transições suaves em todos os interativos (0.2s-0.3s)
- Nunca usar `!important`
- Semantic HTML: header, main, section, footer, article

### JavaScript/React
- Componentes funcionais com hooks
- Memoização com `useMemo` para listas filtradas
- `useRef` para elementos DOM, nunca `document.querySelector`
- `requestAnimationFrame` para animações ligadas ao mouse
- Cleanup de event listeners em `useEffect`

### Design Profissional
- Hierarquia visual clara: título > subtítulo > corpo > muted
- Contraste mínimo WCAG AA (4.5:1 para texto)
- Espaçamento consistente (múltiplos de 8px)
- Hover states em todos os interativos
- Focus states acessíveis (outline ou ring)
- Animações com `ease-out`, nunca `linear` em microinterações
- Grid/ layouts com `gap`, nunca margin negativa

### performance
- Lazy load em imagens
- `will-change` apenas em elementos animados
- CSS animations via `transform` e `opacity` (GPU accelerated)
- Evitar layout thrashing com reads antes de writes

### Acessibilidade
- `aria-label` em botões sem texto
- `alt` em todas as imagens
- Navegação por teclado funcional
- Cores nunca são o único indicador de estado

## Padrões de Código
- Sem comentários desnecessários
- Arquivos organizados: componente = 1 arquivo
- CSS modules ou arquivo único por projeto
- Nomes em camelCase para JS, kebab-case para CSS classes
- Constantes acima dos componentes
