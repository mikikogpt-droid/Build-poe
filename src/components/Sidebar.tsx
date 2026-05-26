import { BookOpen, Home, Layers, ListChecks } from 'lucide-react'
import { dashboardModules } from '../data/dashboard'
import type { GuidePage } from '../data/guidePages'
import { SearchBox } from './SearchBox'

type SidebarProps = {
  pages: GuidePage[]
  currentPage: number | null
  search: string
  onSearch: (value: string) => void
  onNavigate: (pageNumber: number | null) => void
  onNavigateSection: (sectionId: string) => void
}

export function Sidebar({
  pages,
  currentPage,
  search,
  onSearch,
  onNavigate,
  onNavigateSection,
}: SidebarProps) {
  const groups = Array.from(new Set(pages.map((page) => page.category)))

  return (
    <aside className="sidebar" aria-label="Build navigation">
      <button
        className={`nav-home ${currentPage === null ? 'is-active' : ''}`}
        type="button"
        onClick={() => onNavigate(null)}
      >
        <Home size={17} />
        <span>Build Dashboard</span>
      </button>

      <nav className="workflow-nav" aria-label="Build workflow">
        <h2>
          <ListChecks size={14} />
          Workflow
        </h2>
        {dashboardModules.map((module) => (
          <button
            key={module.id}
            type="button"
            onClick={() => onNavigateSection(module.id)}
          >
            <span>{module.label}</span>
            <strong>{module.title}</strong>
          </button>
        ))}
      </nav>

      <SearchBox value={search} onChange={onSearch} />
      <div className="sidebar__meta">
        <BookOpen size={16} />
        <span>{pages.length} reference pages</span>
      </div>
      <nav className="toc" aria-label="PDF reference pages">
        {groups.map((group) => {
          const groupPages = pages.filter((page) => page.category === group)

          return (
            <section key={group} className="toc__group">
              <h2>
                <Layers size={14} />
                {group}
              </h2>
              <div>
                {groupPages.map((page) => (
                  <button
                    key={page.pageNumber}
                    type="button"
                    className={currentPage === page.pageNumber ? 'is-active' : ''}
                    onClick={() => onNavigate(page.pageNumber)}
                  >
                    <span>{String(page.pageNumber).padStart(2, '0')}</span>
                    <span className="toc__copy">
                      <strong>{page.title.replace(/^[0-9]+\)\s*/, '')}</strong>
                      <small>{page.keywords.slice(0, 4).join(' · ')}</small>
                    </span>
                  </button>
                ))}
              </div>
            </section>
          )
        })}
      </nav>
    </aside>
  )
}
