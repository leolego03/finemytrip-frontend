'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface MegaNavProps {
  open: boolean
  onClose: () => void
}

interface MegaItem {
  title: string
  links: string[]
}

const MEGA_ITEMS: MegaItem[] = [
  {
    title: 'Airline ticket',
    links: [
      'Round-trip / One-way / Multi-city',
      'Airline Promotions',
      'Super Saver Airfares',
    ],
  },
  {
    title: 'Hotel·Resort',
    links: [
      'Find Accommodations',
      'Popular Staycations in Korea',
      'Limited-Time Southeast Asia',
      'Best Deals to Japan',
      'Popular Worldwide',
    ],
  },
  {
    title: 'Pension·Pool villa',
    links: [
      'Charming Accommodations',
      'Glamping & Caravans',
      'Spa & Jacuzzi',
      'Family-Friendly Stays',
      'Hanok Stays',
      'Premium Pensions',
    ],
  },
  {
    title: 'Tour·Ticket',
    links: [
      'Snap Photography',
      'City Tours',
      'Gourmet Experiences',
      'Travel Conveniences',
      'Nearby Tours',
      'Tickets & Admission',
      'Experiences & Classes',
    ],
  },
  {
    title: 'Package',
    links: [
      'Best Winter Packages',
      'Relaxing & Tranquil',
      'Picture-Perfect Escapes',
      'Nearby Bus Tours',
      'Group Packages',
    ],
  },
  {
    title: "Traveler's insurance",
    links: [
      'Phone Damage',
      'Baggage Delay',
      'Medical Expenses (Injury/Illness)',
      'COVID-19 Coverage',
    ],
  },
]

export default function MegaNav({ open, onClose }: MegaNavProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          open ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
      />

      <aside
        className={`
          fixed top-0 left-0 w-[300px] h-full bg-gray-800 pt-[60px]
          transform ${open ? 'translate-x-0' : '-translate-x-full'}
          transition-transform duration-300 z-50
        `}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-white text-2xl"
        >
          &times;
        </button>

        <div className="px-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="What are you looking for?"
              suppressHydrationWarning
              className="w-full bg-gray-700 text-white placeholder-gray-300 px-4 py-2 rounded-full"
            />
            <Image
              src="/images/bi-search.svg"
              alt="search"
              width={20}
              height={20}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
            />
          </div>
        </div>

        <div className="px-4 overflow-y-auto h-[calc(100%-140px)]">
          {MEGA_ITEMS.map((item, idx) => {
            const isActive = activeIndex === idx
            return (
              <div key={idx} className="mb-4">
                <button
                  onClick={() =>
                    setActiveIndex(isActive ? null : idx)
                  }
                  className={`
                    w-full flex justify-between items-center
                    text-gray-400 pb-1 border-b border-gray-700
                    ${isActive ? 'text-white' : ''}
                  `}
                >
                  {item.title}
                  <i
                    className={`bi ${
                      isActive ? 'bi-chevron-down' : 'bi-chevron-right'
                    }`}
                  />
                </button>
                <div className={`${isActive ? 'block' : 'hidden'} mt-2 pl-2`}>
                  {item.links.map((link, j) => (
                    <Link
                      href="#"
                      key={j}
                      className="block text-gray-400 py-1 hover:underline"
                    >
                      {link}
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </aside>
    </>
  )
}
