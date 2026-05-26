import { AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { guidePages } from '../data/guidePages'
import { BuildDashboard } from './BuildDashboard'
import { GuidePage } from './GuidePage'
import { Sidebar } from './Sidebar'

type AppShellProps = {
  currentPage: number | null
  onNavigate: (pageNumber: number | null) => void
}

function normalizeText(text: string) {
  return text.toLocaleLowerCase('th-TH')
}

export function AppShell({ currentPage, onNavigate }: AppShellProps) {
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const activePage =
    currentPage === null
      ? null
      : guidePages.find((page) => page.pageNumber === currentPage) ?? guidePages[0]
  const pageIndex = activePage ? activePage.pageNumber - 1 : -1
  const previous = pageIndex > 0 ? guidePages[pageIndex - 1] : undefined
  const next = pageIndex >= 0 && pageIndex < guidePages.length - 1 ? guidePages[pageIndex + 1] : undefined

  const filteredPages = useMemo(() => {
    const query = normalizeText(search.trim())
    if (!query) return guidePages
    return guidePages.filter((page) =>
      normalizeText(
        `${page.title} ${page.category} ${page.keywords.join(' ')} ${page.bodyBlocks.join(' ')}`,
      ).includes(query),
    )
  }, [search])

  const navigate = (pageNumber: number | null) => {
    onNavigate(pageNumber)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigateSection = (sectionId: string) => {
    onNavigate(null)
    setMenuOpen(false)
    window.setTimeout(() => {
      document
        .getElementById(`module-${sectionId}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 40)
  }

  return (
    <div className="app-shell">
      <div className="ambient ambient--cold" />
      <div className="ambient ambient--rage" />
      <button
        className="mobile-menu"
        type="button"
        aria-label="Open navigation"
        onClick={() => setMenuOpen(true)}
      >
        <Menu size={20} />
      </button>
      <div className={`mobile-drawer ${menuOpen ? 'is-open' : ''}`}>
        <button
          className="mobile-drawer__close"
          type="button"
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
        >
          <X size={20} />
        </button>
        <Sidebar
          pages={filteredPages}
          currentPage={currentPage}
          search={search}
          onSearch={setSearch}
          onNavigate={navigate}
          onNavigateSection={navigateSection}
        />
      </div>
      <Sidebar
        pages={filteredPages}
        currentPage={currentPage}
        search={search}
        onSearch={setSearch}
        onNavigate={navigate}
        onNavigateSection={navigateSection}
      />
      <main className="main-panel">
        <AnimatePresence mode="wait">
          {activePage ? (
            <GuidePage
              key={activePage.pageNumber}
              page={activePage}
              previous={previous}
              next={next}
              onNavigate={navigate}
            />
          ) : (
            <BuildDashboard key="dashboard" onNavigate={navigate} />
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

