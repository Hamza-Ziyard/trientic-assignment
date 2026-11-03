import React from 'react'
import LogoMarquee from './LogoMarquee.jsx'
import TestimonialsSection from './TestimonialsSection.jsx'
import FadeInOnScroll from './FadeInOnScroll.jsx'

// Replace with your hero image path (e.g. "/images/hero-dashboard.png")
const HERO_IMAGE_SRC = ''

export default function HeroSection({ imageSrc = HERO_IMAGE_SRC }) {
  return (
    <section className="relative w-full pt-12 sm:pt-16 lg:pt-[84px]">
      {/* Soft Ambient Mesh Gradient Backdrop (preserving #EBF7DD & #FDF8EA) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-[76px] h-[720px] sm:h-[840px] lg:h-[980px] overflow-hidden select-none saturate-[1.85]"
      >
        {/* Main Organic Pill Core (keeps full 100% color intensity across the center) */}
        <div
          className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[96%] sm:w-[88%] max-w-[1360px] h-[460px] sm:h-[580px] lg:h-[680px] rounded-[999px] blur-[55px] sm:blur-[75px]"
          style={{
            background: 'linear-gradient(235deg, #EBF7DD 0%, #EBF7DD 35%, #FDF8EA 68%, #FDF8EA 100%)',
          }}
        />

        {/* Top-Right / Right Saturated Glow (#EBF7DD) */}
        <div
          className="absolute -top-[30px] right-[-4%] sm:right-[4%] w-[70%] sm:w-[56%] h-[420px] sm:h-[540px] lg:h-[640px] rounded-full blur-[60px] sm:blur-[80px]"
          style={{ background: '#EBF7DD' }}
        />

        {/* Left / Bottom-Left Warm Glow (#FDF8EA) */}
        <div
          className="absolute top-[50px] sm:top-[70px] left-[-4%] sm:left-[4%] w-[70%] sm:w-[56%] h-[420px] sm:h-[520px] lg:h-[620px] rounded-full blur-[60px] sm:blur-[80px]"
          style={{ background: '#FDF8EA' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[72px]">
        {/* Top Split Row: Headline + Supporting Copy & CTA */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-12">
          {/* Left Column: Primary Headline */}
          <FadeInOnScroll className="max-w-[700px]" duration={1000}>
            <h1 className="text-[40px] sm:text-[52px] lg:text-[76px] font-semibold tracking-[-0.038em] leading-[1.1] text-[#070707]">
              <span className="relative inline-block">
                <span className="relative z-10">Time tracking</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 320 22"
                  fill="none"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute left-0 -bottom-1 sm:-bottom-1.5 w-full h-[10px] sm:h-[14px] lg:h-[18px] z-0 overflow-visible"
                >
                  <path
                    d="M4 15.5C82 6.5 215 4.5 316 12.5"
                    stroke="#A3E635"
                    strokeWidth="9"
                    strokeLinecap="round"
                    pathLength="1"
                    className="animate-draw-underline"
                  />
                </svg>
              </span>{' '}
              that tells you something.
            </h1>
          </FadeInOnScroll>

          {/* Right Column: Supporting Text, CTA Button, Platform Note */}
          <FadeInOnScroll
            className="lg:w-[408px] lg:mr-[12px] flex flex-col items-start pt-0.5"
            delay={150}
            duration={1000}
          >
            <p className="text-[15px] sm:text-[18px] leading-[1.52] tracking-[-0.03em] text-gray-500 font-normal max-w-[380px]">
              Simple time tracking for solo work and growing teams, with private AI that learns your rhythm.
            </p>

            <a
              href="#start-free"
              className="mt-6 inline-flex items-center justify-center bg-[#070707] text-white text-[18px] font-medium h-[56px] px-10 rounded-full border-[3px] border-[#A3E635] hover:bg-black/85 transition-colors"
            >
              Get started for free
            </a>

            <p className="mt-3.5 text-[12.5px] leading-none tracking-[-0.01em] text-gray-500">
              Available on Web, Mac, Windows and Mobile
            </p>
          </FadeInOnScroll>
        </div>

        {/* Central Visual Block (Image Placeholder) */}
        <FadeInOnScroll
          className="mt-10 sm:mt-12 lg:mt-[56px] w-full"
          delay={250}
          duration={1100}
        >
          <div
            role="img"
            aria-label="Time management product showcase visual"
            className="w-full h-[280px] sm:h-[420px] md:h-[520px] lg:h-[656px] bg-[#D9D9D9] overflow-hidden flex items-center justify-center"
          >
            {imageSrc ? (
              <img
                src={imageSrc}
                alt="TimeFlow product interface"
                className="w-full h-full object-cover"
              />
            ) : null}
          </div>
        </FadeInOnScroll>
      </div>

      {/* Logo Marquee & Testimonials inside Hero Section */}
      <FadeInOnScroll className="relative z-10 mt-12 lg:mt-[60px]" duration={1000}>
        <LogoMarquee />
      </FadeInOnScroll>
      <FadeInOnScroll className="relative z-10 mt-14 lg:mt-[88px]" duration={1000}>
        <TestimonialsSection />
      </FadeInOnScroll>
    </section>
  )
}
