'use client'

import React from 'react'
import Link from 'next/link'

interface CategoryItem {
  href: string
  iconClass: string
  label: string
}

const ITEMS: CategoryItem[] = [
  { href: '/', iconClass: 'bi bi-music-note-beamed', label: 'Paris' },
  { href: '/', iconClass: 'bi bi-moon-stars',       label: 'Seoul' },
  { href: '/', iconClass: 'bi bi-balloon-heart',   label: 'Osaka' },
  { href: '/', iconClass: 'bi bi-palette',         label: 'London' },
  { href: '/', iconClass: 'bi bi-sun',             label: 'Da nang' },
  { href: '/', iconClass: 'bi bi-three-dots',     label: 'More' },
]

export default function CategoryShortcut() {
  return (
    <div>
      <div className="flex flex-wrap gap-5">
        {ITEMS.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            className="flex-1 basis-1/4 flex flex-col items-center justify-center gap-2.5 rounded-[10px] bg-white shadow-none"
          >
            <em className="inline-flex items-center justify-center w-[45px] h-[45px] rounded-full bg-[#cce1fa] text-[20px] text-[#333333]">
              <i className={item.iconClass + " -translate-y-[2px]"} />
            </em>
            <span className="text-sm text-[#333333]">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
