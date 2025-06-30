'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import MegaNav from './MegaNav'
import SigninModal from './SigninModal'
import { useAuthStore } from '../lib/auth-store'

const NAV_ITEMS = [
  'Airline ticket',
  'Hotel·Resort',
  'Pension·Pool villa',
  'Tour·Ticket',
  'Package',
  "Traveler's insurance",
]

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuthStore()
  const [isActive, setIsActive] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setIsActive(window.scrollY > 0)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => {
    logout()
    setProfileDropdownOpen(false)
  }

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen)
  }

  // Close Profile Dropdown External Click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.profile-dropdown')) {
        setProfileDropdownOpen(false)
      }
    }

    if (profileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [profileDropdownOpen])

  return (
    <>
      <header
        className={`
          w-full bg-white border-b border-gray-200 z-30
          ${isActive ? 'fixed left-1/2 transform -translate-x-1/2 max-w-[768px] shadow-md' : 'relative'}
        `}
      >
        <div className="max-w-[1160px] mx-auto px-4">
          <div className="flex items-center py-5 gap-5">
            <div className="logo">
              <Link href="/" className="block">
                <Image
                  className="w-[180px]"
                  src="/images/logo-finemytrip.png"
                  alt="FineMyTrip"
                  width={174}
                  height={21}
                  priority
                />
              </Link>
            </div>

            <div className="hidden relative w-[520px]">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="
                  w-full bg-gray-100 px-4 py-2 rounded-full
                  focus:outline-none focus:bg-white
                  focus:border-blue-300 focus:shadow focus:shadow-blue-200
                "
              />
              <Image
                src="/images/bi-search.svg"
                alt="search"
                width={20}
                height={20}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              />
            </div>

            <div className="ml-auto flex items-center gap-2">
              {!isAuthenticated ? (
                <>
                  <button
                    onClick={() => setModalOpen(true)}
                    className="text-sm border border-[#ddd] rounded p-[5px]"
                  >
                    Sign in
                  </button>
                  <button
                    onClick={() => router.push('/signup')}
                    className="text-sm bg-[#5997e1] text-white rounded p-[5px]"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <Link href="/" className="relative">
                    <i className="bi bi-cart text-xl"></i>
                    <em
                      className="
                        absolute -top-1 -right-2 bg-blue-500 text-white
                        text-[11px] w-4 h-4 rounded-full flex items-center justify-center
                      "
                    >
                      2
                    </em>
                  </Link>

                  <Link href="/" className="relative">
                    <i className="bi bi-bell text-xl"></i>
                    <em
                      className="
                        absolute -top-1 -right-2 bg-blue-500 text-white
                        text-[11px] w-4 h-4 rounded-full flex items-center justify-center
                      "
                    >
                      9
                    </em>
                  </Link>

                  <div className="profile-dropdown relative">
                    <button
                      onClick={toggleProfileDropdown}
                      className="relative focus:outline-none"
                    >
                      <Image
                        src="/images/profile-avatar-01.png"
                        alt="profile"
                        width={28}
                        height={28}
                        className="rounded-full cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    </button>

                    {profileDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                        <Link
                          href="/"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          <i className="bi bi-person mr-2"></i>
                          My profile
                        </Link>
                        <Link
                          href="/"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          <i className="bi bi-bag mr-2"></i>
                          My orders
                        </Link>
                        <div className="border-t border-gray-100 my-1"></div>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          <i className="bi bi-box-arrow-right mr-2"></i>
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <nav className="h-12 flex items-center gap-3 border-t border-gray-100">
            <button
              onClick={() => setMegaOpen(true)}
              className="flex items-center gap-1 text-gray-600 hover:text-red-600"
            >
              <Image
                src="/images/icon-category-search.png"
                alt="categories"
                width={20}
                height={18}
                className="translate-y-1 max-w-none"
              />
              <span className='hidden'>All categories</span>
            </button>

            <div className="flex items-center overflow-x-auto whitespace-nowrap">
              {NAV_ITEMS.map((item, idx) => (
                <Link
                  href="#"
                  key={idx}
                  className="relative text-gray-600 hover:text-red-600 after:content-['·'] after:ml-[7px] last:after:content-none"
                >
                  {item}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <MegaNav open={megaOpen} onClose={() => setMegaOpen(false)} />

      <SigninModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}

export default Header
