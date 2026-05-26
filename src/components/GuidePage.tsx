import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { GuidePage as GuidePageType } from '../data/guidePages'
import { guideSources } from '../data/sources'
import { skillIcons } from '../data/skillIcons'
import { SourceBadge } from './SourceBadge'

type GuidePageProps = {
  page: GuidePageType
  previous?: GuidePageType
  next?: GuidePageType
  onNavigate: (pageNumber: number | null) => void
}

const sourceTokenPattern = /\[S([0-9]+)(?:-S([0-9]+))?\]/g

function getRefsFromText(text: string) {
  const refs: string[] = []
  for (const match of text.matchAll(sourceTokenPattern)) {
    const start = Number(match[1])
    const end = Number(match[2] ?? match[1])
    for (let index = start; index <= end; index += 1) {
      refs.push(`S${index}`)
    }
  }
  return refs
}

function renderTextWithSources(text: string) {
  const parts: ReactNode[] = []
  let lastIndex = 0

  for (const match of text.matchAll(sourceTokenPattern)) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    const refs = getRefsFromText(match[0])
    parts.push(
      <span className="inline-sources" key={`${match[0]}-${match.index}`}>
        {refs.map((ref) => (
          <SourceBadge key={ref} id={ref} compact />
        ))}
      </span>,
    )
    lastIndex = match.index + match[0].length
  }

  parts.push(text.slice(lastIndex))
  return parts
}

function blockClass(block: string) {
  if (/^(Day 0|Mid game|End game|High-end|Mapping|Boss|Rare pack)/i.test(block)) {
    return 'guide-block guide-block--step'
  }
  if (/^(Rule|ข้อห้าม|ข้อควรระวัง|Day 0 Gear Rule|กฎตัดสิน)/i.test(block)) {
    return 'guide-block guide-block--warning'
  }
  if (/^(Lunar|Shred|Cross Slash|Pounce|Feral|Savage|Overwhelming|Herald|Spirit|Talisman|Rage|Freeze|Defense|Jewels|Lineage|Ascendancy|Main skill|Main burst|Payoff|Item #)/i.test(block)) {
    return 'guide-block guide-block--key'
  }
  return 'guide-block'
}

export function GuidePage({ page, previous, next, onNavigate }: GuidePageProps) {
  const icons = skillIcons.filter((icon) => page.keywords.includes(icon.name))
  const refs = Array.from(
    new Set([
      ...page.sourceRefs,
      ...page.bodyBlocks.flatMap((block) => getRefsFromText(block)),
    ]),
  )

  return (
    <motion.article
      className="guide-page"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.26, ease: 'easeOut' }}
    >
      <header className="page-header">
        <div>
          <span className="page-kicker">Page {page.pageNumber} / 35</span>
          <h1>{page.title}</h1>
        </div>
        <span className="category-chip">{page.category}</span>
      </header>

      {icons.length > 0 && (
        <section className="icon-strip" aria-label="PoE2DB official skill icons">
          {icons.map((icon) => (
            <a
              key={icon.name}
              className="skill-icon"
              href={guideSources.find((source) => source.id === icon.sourceId)?.url}
              target="_blank"
              rel="noreferrer"
            >
              <img src={icon.src} alt={`${icon.name} official PoE2DB icon`} />
              <span>{icon.name}</span>
            </a>
          ))}
        </section>
      )}

      <section className="guide-content">
        {page.bodyBlocks.map((block, index) => (
          <motion.p
            className={blockClass(block)}
            key={`${page.pageNumber}-${index}-${block.slice(0, 12)}`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.18, delay: Math.min(index * 0.015, 0.12) }}
          >
            {renderTextWithSources(block)}
          </motion.p>
        ))}
      </section>

      {page.pageNumber === 35 && (
        <section className="source-index" aria-label="Source appendix">
          {guideSources.map((source) => (
            <a key={source.id} href={source.url} target="_blank" rel="noreferrer">
              <span>{source.id}</span>
              <strong>{source.label}</strong>
              <ChevronRight size={16} />
            </a>
          ))}
        </section>
      )}

      {refs.length > 0 && page.pageNumber !== 35 && (
        <footer className="page-sources">
          <span>PoE2DB refs</span>
          <div>
            {refs.map((ref) => (
              <SourceBadge key={ref} id={ref} />
            ))}
          </div>
        </footer>
      )}

      <nav className="pager" aria-label="Page controls">
        <button
          type="button"
          onClick={() => onNavigate(previous?.pageNumber ?? null)}
          disabled={!previous}
        >
          <ArrowLeft size={17} />
          <span>{previous ? `Page ${previous.pageNumber}` : 'Overview'}</span>
        </button>
        <button
          type="button"
          onClick={() => next && onNavigate(next.pageNumber)}
          disabled={!next}
        >
          <span>{next ? `Page ${next.pageNumber}` : 'End'}</span>
          <ArrowRight size={17} />
        </button>
      </nav>
    </motion.article>
  )
}
