import { Search, X } from 'lucide-react'

type SearchBoxProps = {
  value: string
  onChange: (value: string) => void
}

export function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <label className="search-box">
      <Search size={17} strokeWidth={2.2} />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="ค้นหา skill, item, mechanic..."
        type="search"
      />
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => onChange('')}
        >
          <X size={15} strokeWidth={2.4} />
        </button>
      )}
    </label>
  )
}

