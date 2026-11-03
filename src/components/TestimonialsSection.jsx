import React, { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      'It’s the first time tracker that doesn’t feel like surveillance. My team actually uses it.',
    author: 'Maya Fernando',
    role: 'Operations Lead, Segmented Agency',
    avatarSrc: '/images/testimonial-image-1.webp',
  },
  {
    id: 2,
    quote:
      'Our team tracks on Mac, Windows and phones and everything just syncs. And the AI runs on-device, so our clients’ data stays private.',
    author: 'Priya Nair',
    role: 'Founder, Oakline Studio',
    avatarSrc: '/images/testimonial-image-2.webp',
  },
  {
    id: 3,
    quote:
      'I finally know which clients are worth my time. The weekly review paid for itself in a month.',
    author: 'Daniel Okafor',
    role: 'Freelance product designer',
    avatarSrc: '/images/testimonial-image-3.webp',
  },
  {
    id: 4,
    quote:
      'Automated reminders and effortless reporting helped us recover over 12 billable hours per consultant every month.',
    author: 'Elena Rostova',
    role: 'Managing Partner, Segmented Agency',
    avatarSrc: '/images/testimonial-image-1.webp',
  },
]

export default function TestimonialsSection() {
  const scrollContainerRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollButtons = () => {
    const el = scrollContainerRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 8)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8)
  }

  const handleScroll = (direction) => {
    const el = scrollContainerRef.current
    if (!el) return
    const scrollAmount = 556 // card width (532px) + gap (24px)
    el.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <section
      aria-label="Customer testimonials"
      className="w-full"
    >
      {/* Full-bleed scroll container: starts at the left 1440px grid line, moves freely to the left edge when scrolled */}
      <div
        ref={scrollContainerRef}
        onScroll={updateScrollButtons}
        className="w-full grid grid-flow-col auto-cols-[320px] sm:auto-cols-[460px] lg:auto-cols-[532px] gap-6 overflow-x-auto no-scrollbar scroll-smooth pl-6 sm:pl-10 lg:pl-[max(72px,calc((100vw-1440px)/2+72px))] pr-6 sm:pr-10 lg:pr-[max(72px,calc((100vw-1440px)/2+72px))]"
      >
        {TESTIMONIALS.map((item) => (
          <article
            key={item.id}
            className="min-h-[224px] bg-white rounded-[32px] px-7 py-7 sm:px-9 sm:py-8 flex flex-col justify-between"
          >
            {/* Top: Quote Image + Text */}
            <div className="flex items-start gap-4">
              <img
                src="/images/quote.webp"
                alt=""
                aria-hidden="true"
                className="w-10 h-auto shrink-0 mt-1 select-none"
              />
              <p className="text-[16px] sm:text-[15.5px] font-medium leading-[1.46] tracking-[-0.015em] text-[#070707]">
                {item.quote}
              </p>
            </div>

            {/* Bottom: Avatar Image + Author Info */}
            <div className="mt-6 pl-11 flex items-center gap-3.5">
              <img
                src={item.avatarSrc}
                alt={item.author}
                className="w-10 h-10 object-contain shrink-0"
              />
              <div>
                <h3 className="text-[14px] font-semibold tracking-[-0.01em] text-[#070707] leading-tight">
                  {item.author}
                </h3>
                <p className="text-[12px] text-gray-500 leading-tight mt-0.5">
                  {item.role}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Carousel Controls aligned to the 1440px grid */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[72px] mt-8 flex justify-end">
        <div className="flex items-center gap-3.5">
          <button
            type="button"
            onClick={() => handleScroll('prev')}
            aria-label="Previous testimonial"
            className={`w-11 h-11 rounded-full bg-white inline-flex items-center justify-center transition-colors ${
              canScrollLeft
                ? 'text-[#070707] hover:bg-black/5'
                : 'text-[#D4D4D8] cursor-default'
            }`}
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll('next')}
            aria-label="Next testimonial"
            className={`w-11 h-11 rounded-full bg-white inline-flex items-center justify-center transition-colors ${
              canScrollRight
                ? 'text-[#070707] hover:bg-black/5'
                : 'text-[#D4D4D8] cursor-default'
            }`}
          >
            <ChevronRight className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>
      </div>
    </section>
  )
}
