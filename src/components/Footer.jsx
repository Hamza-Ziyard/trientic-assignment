import React, { useState } from 'react'
import { ArrowUpRight, ShieldCheck } from 'lucide-react'
import CtaBannerSection from './CtaBannerSection.jsx'

const FOOTER_COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Time tracking', href: '#time-tracking' },
      { label: 'Projects and budgets', href: '#projects-budgets' },
      { label: 'Reports and timesheets', href: '#reports-timesheets' },
      { label: 'AI insights', href: '#ai-insights' },
      { label: 'Privacy', href: '#privacy' },
      { label: 'Download apps', href: '#download' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Pricing', href: '#pricing' },
      { label: 'Integrations', href: '#integrations' },
      { label: 'Guides and templates', href: '#guides' },
      { label: 'Switch from Clockify or Harvest', href: '#switch' },
      { label: 'Free for students and nonprofits', href: '#education-nonprofits' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '#help-center' },
      { label: 'Documentation', href: '#docs' },
      { label: 'Community', href: '#community', external: true },
      { label: 'Service status', href: '#status', external: true },
      { label: 'Developer API', href: '#api', external: true },
      { label: 'Contact us', href: '#contact' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', href: '#about' },
      { label: 'Security', href: '#security' },
      { label: 'Privacy policy', href: '#privacy-policy' },
      { label: 'Terms and policies', href: '#terms' },
    ],
  },
]

const SOCIAL_LINKS = [
  {
    name: 'X',
    href: '#x',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[18px] h-[18px] fill-current">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: '#linkedin',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[18px] h-[18px] fill-current">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: '#instagram',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[18px] h-[18px] fill-current">
        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: '#youtube',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[19px] h-[19px] fill-current">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: 'Discord',
    href: '#discord',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[19px] h-[19px] fill-current">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim() || !agreed) return
    setSubmitted(true)
    setEmail('')
  }

  return (
    <footer className="w-full text-stone-600">
      {/* Overlapping CTA Banner: top half sits over page background, bottom half sits over stone-50 footer */}
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/2 bg-stone-50 border-t border-stone-200/80"
        />
        <div className="relative z-10">
          <CtaBannerSection />
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-stone-50">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[72px] pt-14 sm:pt-16 lg:pt-20 pb-10 sm:pb-12">
          {/* 1. Newsletter Strip */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-12 pb-12 sm:pb-14 border-b border-stone-200">
          <div className="max-w-[540px]">
            <h2 className="text-[19px] sm:text-[21px] font-semibold tracking-[-0.02em] text-emerald-950">
              Never miss an update
            </h2>
            <p className="mt-2.5 text-[14.5px] sm:text-[15px] leading-[1.6] text-stone-600">
              Product news, new integrations and tips for tracking smarter, delivered to your inbox.
              We’ll rarely send more than one email a month.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full lg:w-auto lg:min-w-[440px] xl:min-w-[480px]"
          >
            <div className="flex flex-col sm:flex-row gap-2.5">
              <label htmlFor="footer-newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (submitted) setSubmitted(false)
                }}
                placeholder="Email address"
                className="flex-1 h-[44px] px-5 rounded-full bg-stone-100/90 border border-stone-200/90 text-[14px] text-emerald-950 placeholder:text-stone-400 focus:outline-none focus:bg-white focus:border-emerald-800 transition-colors"
              />
              <button
                type="submit"
                className="h-[44px] px-6 rounded-full bg-[#070707] hover:bg-emerald-800 text-white text-[14px] font-medium shrink-0 transition-colors"
              >
                {submitted ? 'Signed up' : 'Sign up'}
              </button>
            </div>

            <label className="mt-3 flex items-start sm:items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                required
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 sm:mt-0 w-4 h-4 rounded border-stone-300 text-emerald-800 focus:ring-emerald-800 accent-emerald-800 cursor-pointer"
              />
              <span className="text-[12.5px] leading-[1.4] text-stone-600">
                I agree to receive marketing emails from TimeFlow.
              </span>
            </label>
          </form>
        </div>

        {/* 2. Four Link Columns (2x2 on mobile, 4 columns on desktop) */}
        <div className="py-12 sm:py-14 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 lg:gap-12">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="text-[14.5px] font-semibold tracking-[-0.01em] text-emerald-950">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(link.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="group inline-flex items-center gap-1 text-[14px] text-stone-600 hover:text-emerald-800 transition-colors"
                    >
                      <span>{link.label}</span>
                      {link.external && (
                        <ArrowUpRight
                          className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-800 transition-transform duration-150 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
                          aria-hidden="true"
                        />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 3. Privacy Story Note above Bottom Bar */}
        <div className="pt-2 pb-6 flex items-center justify-start sm:justify-center">
          <p className="inline-flex items-center gap-2 text-[12.5px] sm:text-[13px] text-stone-500">
            <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" aria-hidden="true" />
            <span>
              Encrypted in transit and at rest. Your insights are generated on your device.
            </span>
          </p>
        </div>

        {/* 4. Bottom Bar */}
        <div className="pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-5">
          {/* Left: TimeFlow logo mark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            aria-label="TimeFlow home"
            className="inline-flex items-center select-none opacity-85 hover:opacity-100 transition-opacity"
          >
            <span className="w-[26px] h-[26px] overflow-hidden inline-flex items-center">
              <img
                src="/images/logo/timeflow-logo.webp"
                alt="TimeFlow"
                className="h-[24px] w-auto max-w-none object-left object-contain block"
              />
            </span>
          </a>

          {/* Center: Copyright */}
          <p className="text-[13px] text-stone-500 text-center">
            © 2026 TimeFlow Ltd. All rights reserved.
          </p>

          {/* Right: Social Icons */}
          <div className="flex items-center gap-4 text-stone-500">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                aria-label={social.name}
                className="hover:text-emerald-800 transition-colors"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        </div>
      </div>
    </footer>
  )
}

