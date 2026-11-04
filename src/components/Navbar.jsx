import React, { useEffect, useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Features', hasDropdown: true },
  { label: 'Business', hasDropdown: false },
  { label: 'Pricing', hasDropdown: false },
  { label: 'Support', hasDropdown: true },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full pt-4 pointer-events-none">
      <div
        className={`mx-auto transition-all duration-300 ease-out px-6 sm:px-10 ${
          isScrolled ? 'max-w-[1140px]' : 'max-w-[1440px] lg:px-[72px]'
        }`}
      >
        <nav
          aria-label="Main navigation"
          className={`pointer-events-auto w-full flex items-center justify-between transition-all duration-300 ease-out ${
            isScrolled
              ? 'h-[58px] pr-2 pl-4 rounded-full bg-white/55 backdrop-blur-md shadow-[0_12px_36px_rgba(0,0,0,0.08)] border border-black/[0.06]'
              : 'h-[52px] px-0 bg-transparent border border-transparent'
          }`}
        >
          {/* Left: Brand & Nav Links */}
          <div className="flex items-center gap-8 lg:gap-9">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              aria-label="TimeFlow home"
              className="inline-flex items-center select-none shrink-0"
            >
              <img
                src="/images/logo/timeflow-logo.svg"
                alt="TimeFlow"
                className="h-6 sm:h-[26px] w-auto object-contain block"
              />
            </a>

            <ul className="hidden md:flex items-center gap-6 lg:gap-7">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={`#${item.label.toLowerCase()}`}
                    className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#1C1C1E] hover:text-black transition-colors"
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDown
                        className="w-3.5 h-3.5 text-[#52525B] stroke-[2] translate-y-[0.5px]"
                        aria-hidden="true"
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Auth Actions */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#login"
              className="text-[14px] font-medium text-[#070707] hover:opacity-70 transition-opacity"
            >
              Log in
            </a>
            <a
              href="#get-started"
              className={`inline-flex items-center justify-center bg-[#070707] text-white text-[14px] font-medium rounded-full hover:bg-black/85 transition-all duration-300 ${
                isScrolled ? 'h-[40px] px-6' : 'h-[46px] px-7'
              }`}
            >
              Get started
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-full text-[#070707] hover:bg-black/5 transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="pointer-events-auto md:hidden mt-2 px-6 pt-4 pb-6 rounded-3xl border border-black/10 bg-white/95 backdrop-blur-md shadow-xl">
            <ul className="flex flex-col gap-3">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={`#${item.label.toLowerCase()}`}
                    className="flex items-center justify-between py-1.5 text-[15px] font-medium text-[#1C1C1E]"
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDown className="w-4 h-4 text-[#52525B]" aria-hidden="true" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-5 pt-4 border-t border-black/10 flex flex-col gap-3">
              <a
                href="#login"
                className="w-full py-2.5 text-center text-[14px] font-medium text-[#070707] rounded-full border border-black/15"
              >
                Log in
              </a>
              <a
                href="#get-started"
                className="w-full py-3 text-center text-[14px] font-medium bg-[#070707] text-white rounded-full"
              >
                Get started
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
