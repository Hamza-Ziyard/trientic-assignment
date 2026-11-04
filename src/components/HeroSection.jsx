import React, { useEffect, useRef, useState } from 'react'
import TestimonialsSection from './TestimonialsSection.jsx'
import FadeInOnScroll from './FadeInOnScroll.jsx'

// Replace with your hero image path (e.g. "/images/hero-img.webp")
const HERO_IMAGE_SRC = '/images/hero-img.webp'

// Apple / Linear 3D Rise: positive angle leans top away into depth, hinged at top, smoothly lifting to 0 on scroll
const INITIAL_TILT_DEG = 10

export default function HeroSection({ imageSrc = HERO_IMAGE_SRC }) {
  const imageWrapRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setScrollProgress(1)
      return
    }

    let rafId = null
    const updateTilt = () => {
      rafId = null
      const el = imageWrapRef.current
      if (!el) return

      const viewportHeight = window.innerHeight || 1
      const scrollY = window.scrollY || window.pageYOffset || 0
      const targetScroll = Math.max(260, Math.min(480, viewportHeight * 0.42))
      const raw = Math.max(0, Math.min(1, scrollY / targetScroll))
      // Cubic ease-out curve for an Apple/Linear-style smooth deceleration
      const eased = 1 - Math.pow(1 - raw, 3)
      setScrollProgress(eased)
    }

    const onScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateTilt)
      }
    }

    updateTilt()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId !== null) window.cancelAnimationFrame(rafId)
    }
  }, [])

  const tiltDeg = (1 - scrollProgress) * INITIAL_TILT_DEG
  const scaleVal = 0.94 + scrollProgress * 0.06
  const translateYVal = (1 - scrollProgress) * 18
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

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[72px] py-4 lg:py-10 xl:py-16">
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
      </div>

      {/* Central Visual Block (wider than the 1440px text container, 3D slanted until scrolled into view) */}
      <div
        ref={imageWrapRef}
        className="relative z-10 w-full max-w-[1640px] mx-auto px-4 sm:px-6 lg:px-10"
      >
        <FadeInOnScroll
          className="mt-12 sm:mt-14 lg:mt-[68px] w-full"
          delay={250}
          duration={1100}
        >
          <div
            style={{
              transform: `perspective(1600px) rotateX(${tiltDeg.toFixed(2)}deg) translateY(${translateYVal.toFixed(1)}px) scale(${scaleVal.toFixed(3)})`,
              transformOrigin: 'center top',
            }}
            className="relative w-full transition-transform duration-150 ease-out will-change-transform"
          >
            {/* Hand-Drawn Corner Accent Marks / "Spark" Rays on Top-Right Outside Corner */}
            <svg
              aria-hidden="true"
              viewBox="0 0 84 84"
              fill="none"
              className="pointer-events-none absolute -top-7 -right-5 sm:-top-9 sm:-right-7 lg:-top-11 lg:-right-9 w-[46px] h-[46px] sm:w-[60px] sm:h-[60px] lg:w-[72px] lg:h-[72px] z-20 select-none overflow-visible"
            >
              {/* Top-left vertical-ish ray */}
              <path
                d="M18 32C19.5 22 22.5 13 26 5"
                stroke="#A3E635"
                strokeWidth="7.5"
                strokeLinecap="round"
                pathLength="1"
                style={{ animationDelay: '0.65s' }}
                className="animate-draw-underline"
              />
              {/* Center diagonal main ray */}
              <path
                d="M34 44C44 33 56 21 69 10"
                stroke="#A3E635"
                strokeWidth="8"
                strokeLinecap="round"
                pathLength="1"
                style={{ animationDelay: '0.78s' }}
                className="animate-draw-underline"
              />
              {/* Bottom-right horizontal-ish ray */}
              <path
                d="M46 62C56 59 67 56.5 78 55"
                stroke="#A3E635"
                strokeWidth="7.5"
                strokeLinecap="round"
                pathLength="1"
                style={{ animationDelay: '0.9s' }}
                className="animate-draw-underline"
              />
            </svg>

            <div
              role="img"
              aria-label="Time management product showcase visual"
              className="w-full overflow-hidden rounded-t-[20px] sm:rounded-t-[26px] lg:rounded-t-[30px] shadow-[0_24px_70px_rgba(0,0,0,0.06)] [mask-image:linear-gradient(to_bottom,black_62%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_62%,transparent_100%)]"
            >
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt="TimeFlow product interface"
                  className="w-full h-auto block object-cover object-top"
                />
              ) : null}
            </div>
          </div>
        </FadeInOnScroll>
      </div>

      {/* Testimonials inside Hero Section */}
      <FadeInOnScroll className="relative z-10 mt-14 lg:mt-[88px]" duration={1000}>
        <TestimonialsSection />
      </FadeInOnScroll>
    </section>
  )
}
