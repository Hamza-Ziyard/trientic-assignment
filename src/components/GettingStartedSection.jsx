import React from 'react'
import { Play } from 'lucide-react'
import FadeInOnScroll from './FadeInOnScroll.jsx'

const GETTING_STARTED_CARDS = [
  {
    id: 'timeflow-in-5-minutes',
    title: 'TimeFlow in 5 minutes',
    description:
      'A short video series that takes you from your first timer to your first shared timesheet.',
    imageSrc: '/images/arc-images/09am.png',
    imageAlt: 'TimeFlow timer interface preview',
  },
  {
    id: 'switching-from-another-tool',
    title: 'Switching from another tool',
    description:
      'Import your history from Clockify, Harvest or a spreadsheet in a few clicks.',
    imageSrc: '/images/switch-tool.webp',
    imageAlt: 'Switching to TimeFlow migration graphic',
  },
]

export default function GettingStartedSection() {
  return (
    <section
      aria-labelledby="getting-started-heading"
      className="w-full text-[#070707]"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[72px]">
        {/* Section Header */}
        <FadeInOnScroll className="" duration={1000}>
          <h2
            id="getting-started-heading"
            className="text-[32px] sm:text-[42px] lg:text-[54px] font-semibold tracking-[-0.036em] leading-[1.1] text-[#070707]"
          >
            Everything you need to get started
          </h2>

          <p className="mt-4 sm:mt-5 text-[15px] sm:text-[20px] leading-[1.55] tracking-[-0.04em] text-gray-500 max-w-[780px]">
            Start free on your own and grow into a team without switching tools.
          </p>
        </FadeInOnScroll>

        {/* 2-Column Video Cards Grid */}
        <div className="mt-12 sm:mt-14 lg:mt-[56px] grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {GETTING_STARTED_CARDS.map((card, index) => (
            <FadeInOnScroll
              key={card.id}
              as="article"
              delay={index * 160}
              duration={1000}
              className="flex flex-col items-start"
            >
              {/* Video Thumbnail Container with Overlay & Play Button */}
              <button
                type="button"
                aria-label={`Play video: ${card.title}`}
                className="p-10 group relative w-full overflow-hidden rounded-[28px] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
              >
                <img
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  loading="lazy"
                  className="w-full h-auto object-cover block transition-transform duration-300 group-hover:scale-[1.015] shadow-sm"
                />

                {/* Subtle Tinted Overlay matching reference image */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[28px] bg-black/[0.2] group-hover:bg-black/[0.08] transition-colors duration-300"
                />

                {/* Bottom-Right Circular Video Play Button */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 w-12 h-12 sm:w-[54px] sm:h-[54px] rounded-full bg-[#070707] text-white inline-flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-105"
                >
                  <Play className="w-5 h-5 fill-white text-white translate-x-[1.5px]" />
                </span>
              </button>

              <div className="px-3">
                {/* Card Title */}
                <h3 className="mt-6 sm:mt-7 text-[22px] lg:text-[28px] font-semibold tracking-[-0.028em] leading-[1.2] text-[#070707]">
                  {card.title}
                </h3>

                {/* Card Description */}
                <p className="mt-2.5 text-[13.5px] lg:text-[16px] leading-[1.58] tracking-[-0.03em] text-gray-500">
                  {card.description}
                </p>
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

