'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import SearchModal from './SearchModal'

export default function SearchTrigger() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-gray-400 hover:text-black transition-colors cursor-pointer p-1.5 focus:outline-none"
        aria-label="Arama Aç"
      >
        <Search size={18} strokeWidth={1.5} />
      </button>

      <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
