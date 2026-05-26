import { useEffect, useState } from 'react'
import './App.css'
import { AppShell } from './components/AppShell'

function getPageFromPath() {
  const match = window.location.pathname.match(/^\/page\/([0-9]+)$/)
  if (!match) return null

  const pageNumber = Number(match[1])
  return pageNumber >= 1 && pageNumber <= 35 ? pageNumber : null
}

function App() {
  const [currentPage, setCurrentPage] = useState<number | null>(getPageFromPath)

  useEffect(() => {
    const onPopState = () => setCurrentPage(getPageFromPath())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = (pageNumber: number | null) => {
    const path = pageNumber === null ? '/' : `/page/${pageNumber}`
    window.history.pushState({}, '', path)
    setCurrentPage(pageNumber)
  }

  return <AppShell currentPage={currentPage} onNavigate={navigate} />
}

export default App
