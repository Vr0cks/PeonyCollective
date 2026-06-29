'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface Option {
  value: string
  label: string
}

interface CustomSelectProps {
  value: string
  onChange: (value: string) => void
  options: Option[]
  placeholder: string
}

export default function CustomSelect({ value, onChange, options, placeholder }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedOption = options.find(opt => opt.value === value)

  return (
    <div className="relative" ref={selectRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-48 sm:w-56 bg-transparent border-b border-gray-300 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] hover:border-[#AF9164] transition-colors group"
      >
        <span className="truncate pr-4">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown 
          size={14} 
          className={`text-gray-400 group-hover:text-[#AF9164] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-full max-h-80 overflow-y-auto bg-white border border-gray-100 shadow-2xl z-50 py-2 custom-scrollbar"
          >
            <button
              onClick={() => {
                onChange('')
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${!value ? 'text-[#AF9164] bg-gray-50' : 'text-gray-500 hover:text-[#1A1A1A] hover:bg-gray-50'}`}
            >
              {placeholder}
            </button>
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  onChange(opt.value)
                  setIsOpen(false)
                }}
                className={`w-full text-left px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${value === opt.value ? 'text-[#AF9164] bg-gray-50' : 'text-gray-500 hover:text-[#1A1A1A] hover:bg-gray-50'}`}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
