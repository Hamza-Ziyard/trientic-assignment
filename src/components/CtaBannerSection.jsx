import React, { useState } from 'react'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import FadeInOnScroll from './FadeInOnScroll.jsx'
import LogoMarquee from './LogoMarquee.jsx'

const plans = [
  {
    name: 'Starters',
    tagline: 'Essential time tracking',
    price: '$0',
    image: '/images/cta-banner-img.webp',
    imageAlt: 'Person working on laptop at home',
  },
  {
    name: 'Business',
    tagline: 'Advanced AI & automations',
    price: '$12',
    image: '/images/cta-banner-img-2.webp', // placeholder image
    imageAlt: 'Pro dashboard insights preview',
  },
  {
    name: 'Enterprise',
    tagline: 'Custom controls & scale',
    price: 'Custom',
    image: '/images/cta-banner-img-3.webp', // placeholder image
    imageAlt: 'Enterprise team management preview',
  },
]

export default function CtaBannerSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? plans.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === plans.length - 1 ? 0 : prev + 1))
  }

  return (
    <section
      aria-labelledby="cta-banner-heading"
      className="w-full text-[#070707]"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[72px]">
        <FadeInOnScroll duration={1100}>
          <div
            className="rounded-[32px] p-6 sm:p-8 lg:pt-4 lg:pb-10 lg:px-4 flex flex-col gap-8 lg:gap-9"
            style={{
              background: 'linear-gradient(235deg, #EBF7DD 0%, #FDF8EA 100%)',
            }}
          >
            {/* Top Row: Left Content + Right Image Slider */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-10 lg:pl-8">
              {/* Left Content */}
              <div className="max-w-[580px] py-2 lg:py-6">
                <h2
                  id="cta-banner-heading"
                  className="text-[32px] sm:text-[42px] lg:text-[40px] font-semibold tracking-[-0.036em] leading-[1.2] text-[#070707]"
                >
                  Start tracking today. Know where your week goes.
                </h2>

                <p className="mt-4 sm:mt-5 text-[15px] sm:text-[18px] leading-[1.55] tracking-[-0.03em] text-gray-500">
                  Free forever for individuals. Works on Mac, Windows, iPhone, Android and web.
                </p>

                {/* Actions */}
                <div className="mt-7 flex flex-wrap items-center gap-6">
                  <a
                    href="#start-free"
                    className="inline-flex items-center justify-center bg-[#070707] text-white text-[16px] font-medium h-[46px] px-7 rounded-full border-[3px] border-[#A3E635] hover:bg-black/85 transition-colors"
                  >
                    Get started for free
                  </a>

                  <a
                    href="#pricing"
                    className="inline-flex items-center gap-1.5 text-[16px] font-semibold tracking-[-0.01em] text-[#070707] hover:opacity-75 transition-opacity group"
                  >
                    <span>Explore plans</span>
                    <ArrowUpRight
                      className="w-4 h-4 text-gray-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>

              {/* Right: Plan Image Slider with Overlay Text & Arrows matching screenshot */}
              <div className="w-full lg:w-[460px] xl:w-[498px] shrink-0">
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] lg:h-[290px] xl:h-[305px] rounded-[22px] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.06)] group select-none">
                  {/* Sliding Images Container */}
                  <div
                    className="flex w-full h-full transition-transform duration-500 ease-out"
                    style={{
                      transform: `translateX(-${currentIndex * 100}%)`,
                    }}
                  >
                    {plans.map((plan) => (
                      <div
                        key={plan.name}
                        className="w-full h-full shrink-0 relative"
                      >
                        <img
                          src={plan.image}
                          alt={plan.imageAlt}
                          loading="lazy"
                          className="w-full h-full object-cover block"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Top-Right Arrow Buttons */}
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous plan"
                      className="w-8 h-8 rounded-full bg-white/75 hover:bg-white text-neutral-700 hover:text-black flex items-center justify-center backdrop-blur-md shadow-sm transition-all active:scale-95"
                    >
                      <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next plan"
                      className="w-8 h-8 rounded-full bg-white/75 hover:bg-white text-neutral-700 hover:text-black flex items-center justify-center backdrop-blur-md shadow-sm transition-all active:scale-95"
                    >
                      <ChevronRight className="w-4 h-4 stroke-[2.2]" />
                    </button>
                  </div>

                  {/* Subtle Gradient for Bottom Text Contrast */}
                  <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none z-10" />

                  {/* Bottom Overlay Text: Plan Tagline & Price */}
                  <div className="absolute inset-x-0 bottom-0 z-20 p-5 sm:p-6 flex items-end justify-between text-white">
                    <div className="max-w-[70%]">
                      <p className="text-[15px] sm:text-[17px] font-medium tracking-tight text-white/95 drop-shadow-sm">
                        {plans[currentIndex].name} plan
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <span className="text-[28px] sm:text-[34px] font-bold leading-none tracking-tight text-white drop-shadow-md">
                        {plans[currentIndex].price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: Logo Marquee */}
            <LogoMarquee />
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  )
}
