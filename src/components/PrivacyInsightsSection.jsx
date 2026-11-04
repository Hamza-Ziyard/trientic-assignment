import React from 'react'
import FadeInOnScroll from './FadeInOnScroll.jsx'

const PRIVACY_CARDS = [
  {
    id: 'own-model',
    title: 'Bring your own model',
    description:
      'Prefer a model you trust? Connect your own and switch any time. TimeFlow works with what you choose and never locks you in.',
    imageSrc: '/images/own-model-img.png',
    imageAlt: 'Model selector showing Claude, GPT, Gemini, DeepSeek, and Custom options',
  },
  {
    id: 'device-insights',
    title: 'Insights on your device',
    description:
      'AI summaries are generated on your Mac, Windows PC or phone. Your hours sync through the cloud, but the analysis never has to leave your machine.',
    imageSrc: '/images/insights-img.png',
    imageAlt: 'Weekly focus insight summary generated on device',
  },
  {
    id: 'suggests-never-spies',
    title: 'Suggests, never spies',
    description:
      'TimeFlow proposes entries and you confirm each one. No screenshots, no keystroke logging, and you can export or delete your data whenever you like.',
    imageSrc: '/images/suggesstions-img.png',
    imageAlt: 'Suggested time entry popover for Brightloop Website Redesign with Dismiss and Accept buttons',
  },
]

export default function PrivacyInsightsSection() {
  return (
    <section
      aria-labelledby="privacy-insights-heading"
      className="w-full text-[#070707]"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[72px]">
        {/* Section Header */}
        <FadeInOnScroll className="" duration={1000}>
          <h2
            id="privacy-insights-heading"
            className="text-[32px] sm:text-[42px] lg:text-[54px] font-semibold tracking-[-0.036em] leading-[1.1] text-[#070707]"
          >
            Your data syncs. Your insights stay yours.
          </h2>

          <p className="mt-4 sm:mt-5 text-[15px] sm:text-[20px] leading-[1.55] tracking-[-0.04em] text-gray-500 max-w-[820px]">
            TimeFlow keeps your hours in the cloud so they follow you everywhere. The AI that analyses them runs on your device, or on a model you choose.
          </p>
        </FadeInOnScroll>

        {/* 3-Column Feature Cards Grid */}
        <div className="mt-12 sm:mt-14 lg:mt-[60px] grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {PRIVACY_CARDS.map((card, index) => (
            <FadeInOnScroll
              key={card.id}
              as="article"
              delay={index * 150}
              duration={1000}
              className="flex flex-col items-start"
            >
              {/* Card Visual */}
              <div className="w-full overflow-hidden rounded-[28px]">
                <img
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  loading="lazy"
                  className="w-full h-auto object-cover block"
                />
              </div>

              <div className="px-3">
                {/* Card Title */}
                <h3 className="mt-6 sm:mt-7 text-[22px] lg:text-[28px] font-semibold tracking-[-0.028em] leading-[1.2] text-[#070707]">
                  {card.title}
                </h3>

                {/* Card Description */}
                <p className="mt-2.5 text-[13.5px] lg:text-[16px] leading-[1.58] tracking-[-0.03em] text-gray-500 max-w-[390px]">
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

