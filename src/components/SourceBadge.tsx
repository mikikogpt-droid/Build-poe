import { ExternalLink } from 'lucide-react'
import { sourceById } from '../data/sources'

type SourceBadgeProps = {
  id: string
  compact?: boolean
}

export function SourceBadge({ id, compact = false }: SourceBadgeProps) {
  const source = sourceById[id]

  if (!source) {
    return <span className="source-badge source-badge--missing">{id}</span>
  }

  return (
    <a
      className="source-badge"
      href={source.url}
      target="_blank"
      rel="noreferrer"
      title={source.label}
    >
      <span>{id}</span>
      {!compact && <ExternalLink size={13} strokeWidth={2.2} />}
    </a>
  )
}
