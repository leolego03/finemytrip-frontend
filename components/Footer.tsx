'use client'

import React, { useState } from 'react'
import Link from 'next/link'

interface LinkGroup {
  title: string
  links?: string[]
  content?: React.ReactNode
}

const LINK_GROUPS: LinkGroup[] = [
  {
    title: 'FINEMYTRIP',
    links: [
      'App Download',
      'Code Redemption',
      'Brand',
      'Partners',
      'Notices',
      'Careers',
    ],
  },
  {
    title: "Traveler's insurance",
    links: [
      'Marketing Partnerships',
      'Online Partnership Info',
      'Travel Planner',
      'Agency Opening Inquiries',
    ],
  },
  {
    title: 'Customer service',
    links: [
      'Notices',
      'Terms of Use',
      'Privacy Policy',
      'FAQ',
      'Refund Policy',
    ],
  },
  {
    title: 'CONTACT',
    content: (
      <div className="text-sm text-gray-300 space-y-1">
        <p>Inquiry for refund: refund@finemytrip-i.com</p>
        <p>Other inquiries: help@finemytrip-i.com</p>
        <p>Customer service: 02-123-1234</p>
        <p>(10:00 to 18:00 on weekdays / Except weekends and holidays)</p>
      </div>
    ),
  },
]

export default function Footer() {
  const [openGroups, setOpenGroups] = useState<boolean[]>(
    Array(LINK_GROUPS.length).fill(false)
  )
  const [companyInfoOpen, setCompanyInfoOpen] = useState(false)

  const toggleGroup = (index: number) => {
    setOpenGroups((prev) => {
      const next = [...prev]
      next[index] = !next[index]
      return next
    })
  }

  return (
    <footer className="bg-gray-600 text-gray-300 text-sm font-normal py-8">
      <div className="max-w-[1160px] mx-auto px-4 space-y-12 border-b border-gray-500 pb-10">
        <div className="text-center">
          <h2 className="text-white text-2xl leading-tight">
            Wonderful my trip,<br /> FINEMYTRIP
          </h2>
        </div>

        <div className="space-y-4">
          {LINK_GROUPS.map((group, idx) => (
            <div key={idx}>
              <button
                onClick={() => toggleGroup(idx)}
                className="w-full flex justify-between items-center text-gray-200 py-2 border-b border-gray-500"
              >
                <span>{group.title}</span>
                <i
                  className={`bi ${
                    openGroups[idx] ? 'bi-chevron-up' : 'bi-chevron-down'
                  }`}
                />
              </button>

              {openGroups[idx] && (
                <div className="pt-2 pl-2">
                  {group.links ? (
                    group.links.map((link, j) => (
                      <Link
                        href="#"
                        key={j}
                        className="block py-1 hover:underline"
                      >
                        {link}
                      </Link>
                    ))
                  ) : (
                    group.content
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1160px] mx-auto px-4 flex flex-col items-center text-center pt-4 space-y-4">
        <button
          onClick={() => setCompanyInfoOpen((prev) => !prev)}
          className="text-white font-normal"
        >
          FINEMYTRIP Co., Ltd. Business Information
        </button>

        {companyInfoOpen && (
          <address className="not-italic text-gray-300 text-xs space-y-2">
            <p>
              FINEMYTRIP Co., Ltd.<br />
              Business Registration No.: 123-45-67890 | CEO: Hong OO |
              Personal Information Manager: Hong OO | E-commerce Business
              Registration No.: 2024-Incheon Yeonsu-gu-1234<br /> (12345)
              123 Central-ro, Yeonsu-gu, Incheon, Republic of Korea
            </p>
            <p>Copyright © leolego03. All rights reserved.</p>
          </address>
        )}

        <div className="flex space-x-4 text-xl">
          <a href="#" className="hover:text-white">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="#" className="hover:text-white">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="#" className="hover:text-white">
            <i className="bi bi-twitter"></i>
          </a>
          <a href="#" className="hover:text-white">
            <i className="bi bi-youtube"></i>
          </a>
        </div>
      </div>
    </footer>
  )
}
