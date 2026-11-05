import React, { useEffect, useRef, useState } from 'react'
import FadeInOnScroll from './FadeInOnScroll.jsx'

function TypewriterText({ text, active, delayMs = 240, speedMs = 14 }) {
  const [displayedCount, setDisplayedCount] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!active) {
      setDisplayedCount(0)
      setStarted(false)
      return
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setStarted(true)
      setDisplayedCount(text.length)
      return
    }

    let intervalId = null
    const startTimer = window.setTimeout(() => {
      setStarted(true)
      let idx = 0
      intervalId = window.setInterval(() => {
        idx += 1
        setDisplayedCount(idx)
        if (idx >= text.length) {
          window.clearInterval(intervalId)
        }
      }, speedMs)
    }, delayMs)

    return () => {
      window.clearTimeout(startTimer)
      if (intervalId) window.clearInterval(intervalId)
    }
  }, [active, text, delayMs, speedMs])

  if (!active || !started) return null

  return (
    <span className="align-middle text-[#070707]/85">
      {text.slice(0, displayedCount)}
    </span>
  )
}

const INTEGRATIONS = [
  {
    id: 'linear',
    name: 'Linear',
    nameColor: 'text-[#5E6AD2]',
    logoSrc: '/images/brand-logos/Linear_Symbol_2.webp',
    tileSize: 'w-[66px] h-[66px] xl:w-[72px] xl:h-[72px]',
    iconSize: 'w-8 h-8 xl:w-9 xl:h-9',
    position: 'lg:top-[32%] lg:left-0',
    expandShift: 'translate-x-0 -translate-y-2',
    dropDelayMs: 60,
    suggestion:
      'moved BRI-142 to In Review after 50m. Add to Sprint 04 - Frontend?',
  },
  {
    id: 'slack',
    name: 'Slack',
    nameColor: 'text-[#E01E5A]',
    logoSrc: '/images/brand-logos/Slack_Symbol_2.webp',
    tileSize: 'w-[74px] h-[74px] xl:w-[80px] xl:h-[80px]',
    iconSize: 'w-12 h-12 xl:w-14 xl:h-14 scale-125',
    badgeIconClass: 'w-4 h-4 scale-150',
    mobileIconClass: 'w-11 h-11 sm:w-12 sm:h-12 scale-125',
    position: 'lg:top-[6%] lg:left-[10%]',
    expandShift: '-translate-x-4 -translate-y-2',
    dropDelayMs: 0,
    suggestion:
      'detected an 18m huddle in #client-brightloop. Log to Brightloop Website Redesign?',
  },
  {
    id: 'figma',
    name: 'Figma',
    nameColor: 'text-[#F24E1E]',
    logoSrc: '/images/brand-logos/Figma_Symbol_2.webp',
    tileSize: 'w-[74px] h-[74px] xl:w-[82px] xl:h-[82px]',
    iconSize: 'w-8 h-8 xl:w-9 xl:h-9',
    position: 'lg:top-[62%] lg:left-[9%]',
    expandShift: '-translate-x-4 -translate-y-2',
    dropDelayMs: 140,
    suggestion:
      'tracked 1h 25m active in ‘Brightloop - Homepage v3’. Add to Design Phase?',
  },
  {
    id: 'claude',
    name: 'Claude',
    nameColor: 'text-[#D97757]',
    logoSrc: '/images/brand-logos/Claude_Symbol_0.svg',
    tileSize: 'w-[68px] h-[68px] xl:w-[74px] xl:h-[74px]',
    iconSize: 'w-8 h-8 xl:w-9 xl:h-9',
    position: 'lg:top-[34%] lg:left-[20.5%]',
    expandShift: '-translate-x-6 -translate-y-2',
    dropDelayMs: 90,
    suggestion:
      'drafted copy variations for ‘Pricing Page’ (28m). Add to Content Strategy?',
  },
  {
    id: 'google-docs',
    name: 'Google Docs',
    nameColor: 'text-[#4285F4]',
    logoSrc: '/images/brand-logos/Google_Google_Docs_0.svg',
    tileSize: 'w-[76px] h-[76px] xl:w-[84px] xl:h-[84px]',
    iconSize: 'w-8 h-8 xl:w-9 xl:h-9',
    position: 'lg:top-[8%] lg:left-[31%]',
    expandShift: '-translate-x-6 -translate-y-2',
    dropDelayMs: 40,
    suggestion:
      'edited ‘Q4 Brand Strategy Deck’ for 42m. Log to Northwind Rebrand?',
  },
  {
    id: 'gmail',
    name: 'Gmail',
    nameColor: 'text-[#EA4335]',
    logoSrc: '/images/brand-logos/Gmail_idrA5FDGTH_0.svg',
    tileSize: 'w-[68px] h-[68px] xl:w-[74px] xl:h-[74px]',
    iconSize: 'w-8 h-8 xl:w-9 xl:h-9',
    position: 'lg:top-[64%] lg:left-[31%]',
    expandShift: '-translate-x-6 -translate-y-2',
    dropDelayMs: 180,
    suggestion:
      'replied to 4 threads with Acme Corp (22m). Add to Client Comms?',
  },
  {
    id: 'google-sheets',
    name: 'Google Sheets',
    nameColor: 'text-[#0F9D58]',
    logoSrc: '/images/brand-logos/Google_Google_Sheets_0.svg',
    tileSize: 'w-[68px] h-[68px] xl:w-[74px] xl:h-[74px]',
    iconSize: 'w-8 h-8 xl:w-9 xl:h-9',
    position: 'lg:top-[35%] lg:left-[42.5%]',
    expandShift: '-translate-x-8 -translate-y-2',
    dropDelayMs: 120,
    suggestion:
      'updated ‘Q3 Retainer Forecast & Hours’ (35m). Log to Agency Operations?',
  },
  {
    id: 'notion',
    name: 'Notion',
    nameColor: 'text-[#191918]',
    logoSrc: '/images/brand-logos/Notion_Symbol_2.webp',
    tileSize: 'w-[74px] h-[74px] xl:w-[80px] xl:h-[80px]',
    iconSize: 'w-8 h-8 xl:w-9 xl:h-9',
    position: 'lg:top-[6%] lg:left-[53.5%]',
    expandShift: '-translate-x-8 -translate-y-2',
    dropDelayMs: 70,
    suggestion:
      'spent 35m in ‘Design System Roadmap’. Add to Internal Product Ops?',
  },
  {
    id: 'openai',
    name: 'ChatGPT',
    nameColor: 'text-[#10A37F]',
    logoSrc: '/images/brand-logos/OpenAI_Symbol_2.webp',
    tileSize: 'w-[68px] h-[68px] xl:w-[74px] xl:h-[74px]',
    iconSize: 'w-9 h-9 xl:w-10 xl:h-10 scale-110',
    position: 'lg:top-[62%] lg:left-[54%]',
    expandShift: '-translate-x-8 -translate-y-2',
    dropDelayMs: 210,
    suggestion:
      'researched API schema & edge cases (26m). Add to Kinetix Discovery?',
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    nameColor: 'text-[#FC6D26]',
    logoSrc: '/images/brand-logos/GitLab_Symbol_2.webp',
    tileSize: 'w-[68px] h-[68px] xl:w-[74px] xl:h-[74px]',
    iconSize: 'w-8 h-8 xl:w-9 xl:h-9',
    position: 'lg:top-[34%] lg:right-[28%]',
    expandShift: 'translate-x-4 -translate-y-2',
    dropDelayMs: 150,
    suggestion:
      'reviewed merge request !84 on core-api (40m). Add to Backend Retainer?',
  },
  {
    id: 'github',
    name: 'GitHub',
    nameColor: 'text-emerald-800',
    logoSrc: '/images/brand-logos/GitHub_Symbol_0.svg',
    tileSize: 'w-[78px] h-[78px] xl:w-[86px] xl:h-[86px]',
    iconSize: 'w-9 h-9 xl:w-10 xl:h-10',
    position: 'lg:top-[8%] lg:right-[11.5%]',
    expandShift: 'translate-x-4 -translate-y-2',
    dropDelayMs: 100,
    suggestion:
      'pushed 6 commits to brightloop-site. Add 1h 10m to Brightloop Website Redesign?',
  },
  {
    id: 'google-drive',
    name: 'Google Drive',
    nameColor: 'text-[#34A853]',
    logoSrc: '/images/brand-logos/Google_Google_Drive_0.svg',
    tileSize: 'w-[72px] h-[72px] xl:w-[78px] xl:h-[78px]',
    iconSize: 'w-8 h-8 xl:w-9 xl:h-9',
    position: 'lg:top-[62%] lg:right-[11%]',
    expandShift: 'translate-x-4 -translate-y-2',
    dropDelayMs: 240,
    suggestion:
      'organized 12 assets in ‘Brightloop Handoff’ (30m). Add to Design Ops?',
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    nameColor: 'text-[#1967D2]',
    logoSrc: '/images/brand-logos/Google_google_calendar_0.svg',
    tileSize: 'w-[74px] h-[74px] xl:w-[80px] xl:h-[80px]',
    iconSize: 'w-8 h-8 xl:w-9 xl:h-9',
    position: 'lg:top-[32%] lg:right-0',
    expandShift: 'translate-x-0 -translate-y-2',
    dropDelayMs: 190,
    suggestion:
      '‘Weekly Design Sync’ just ended (45m). Log to Brightloop Retainer?',
  },
]

export default function IntegrationsSection() {
  // Null when nothing is hovered/selected; hovering or clicking a tile morphs it into the inline card
  const [activeId, setActiveId] = useState(null)
  const [hasDroppedIn, setHasDroppedIn] = useState(false)
  const stageRef = useRef(null)

  useEffect(() => {
    const el = stageRef.current
    if (!el) return

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setHasDroppedIn(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasDroppedIn(true)
          observer.disconnect()
        }
      },
      { threshold: 0.18 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      aria-labelledby="integrations-heading"
      className="relative w-full overflow-hidden text-[#070707] py-16 sm:py-20 lg:py-[112px]"
      style={{
        background:
          'linear-gradient(180deg, #EBF7DD 0%, rgba(235, 247, 221, 0.55) 45%, rgba(235, 247, 221, 0) 100%)',
      }}
      onClick={() => setActiveId(null)}
    >
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[72px]">
        {/* Top-Left Section Header */}
        <FadeInOnScroll duration={1000}>
          <h2
            id="integrations-heading"
            className="text-[32px] sm:text-[42px] lg:text-[54px] font-semibold tracking-[-0.036em] leading-[1.1] text-[#070707]"
          >
            Works with the tools you already live in.
          </h2>

          <p className="mt-4 sm:mt-5 text-[15px] sm:text-[20px] leading-[1.55] tracking-[-0.04em] text-gray-500 max-w-[820px]">
            Connect your docs, code, design and calendar. TimeFlow suggests entries from your real work, and you confirm every one.
          </p>

          <div className="mt-10 lg:mt-6 flex flex-col items-start">
            <div className="flex flex-wrap gap-3.5 sm:gap-4">
              <a
                href="#integrations"
                className="inline-flex items-center justify-center gap-2 bg-[#070707] text-white text-[15px] sm:text-[16px] font-medium h-[48px] sm:h-[52px] px-7 rounded-full border-[3px] border-[#A3E635] hover:bg-black/85 transition-colors"
              >
                <span>Explore integrations</span>
              </a>

              <a
                href="#start-free"
                className="inline-flex items-center gap-2 text-[16px] font-semibold tracking-[-0.01em] text-[#070707] hover:opacity-75 transition-opacity px-4"
              >
                Get started for free
              </a>
            </div>
          </div>
        </FadeInOnScroll>

        {/* Bottom Area: Scattered Logos + Microcopy */}
        <div ref={stageRef}>
          {/* DESKTOP SCATTERED ICON TILES STAGE (lg+) */}
          <div
            className="hidden lg:block relative w-full h-[320px] xl:h-[350px] mt-14"
            onMouseLeave={() => setActiveId(null)}
          >
            {INTEGRATIONS.map((tool) => {
              const isSelected = activeId === tool.id
              const isDimmed = activeId !== null && !isSelected

              return (
                <div
                  key={tool.id}
                  className={`absolute ${tool.position} transition-all duration-300 ${
                    isSelected ? 'z-40' : 'z-20'
                  }`}
                  onMouseEnter={() => setActiveId(tool.id)}
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveId(tool.id)
                  }}
                >
                  {/* One-time drop-down entrance wrapper when entering section */}
                  <div
                    style={{
                      transitionDelay: hasDroppedIn ? `${tool.dropDelayMs}ms` : '0ms',
                    }}
                    className={`transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      hasDroppedIn
                        ? 'translate-y-0 opacity-100'
                        : '-translate-y-16 opacity-0'
                    }`}
                  >
                    {/* White Rounded Tile that expands smoothly on hover/focus */}
                    <div
                      role="button"
                      tabIndex={0}
                      onFocus={() => setActiveId(tool.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          setActiveId(isSelected ? null : tool.id)
                        }
                      }}
                      aria-label={`${tool.name}: ${tool.suggestion}`}
                      className={`relative overflow-hidden rounded-[22px] bg-white border transition-[width,height,padding,transform,box-shadow,opacity,filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800 ${
                        isSelected
                          ? `w-[290px] xl:w-[310px] min-h-[88px] p-4 border-stone-200/95 shadow-[0_22px_50px_rgba(2,44,34,0.14)] ${
                              tool.expandShift || '-translate-x-6 -translate-y-2'
                            } scale-100 opacity-100 blur-0`
                          : isDimmed
                          ? `${tool.tileSize} flex items-center justify-center border-stone-200/60 shadow-sm opacity-45 blur-[2px] scale-95`
                          : `${tool.tileSize} flex items-center justify-center border-stone-200/90 shadow-[0_10px_28px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_36px_rgba(2,44,34,0.12)]`
                      }`}
                    >
                      {isSelected ? (
                        <div className="text-left">
                          <p className="text-[13px] xl:text-[13.5px] leading-[1.5] text-stone-600 font-normal">
                            <span className="inline-flex items-center gap-1.5 align-middle mr-1.5">
                              <img
                                src={tool.logoSrc}
                                alt=""
                                className={`${
                                  tool.badgeIconClass || 'w-3.5 h-3.5'
                                } object-contain shrink-0`}
                              />
                              <span
                                className={`font-semibold text-[12.5px] ${tool.nameColor}`}
                              >
                                {tool.name}
                              </span>
                            </span>
                            <TypewriterText
                              text={tool.suggestion}
                              active={isSelected}
                              delayMs={240}
                              speedMs={14}
                            />
                          </p>
                        </div>
                      ) : (
                        <img
                          src={tool.logoSrc}
                          alt={tool.name}
                          loading="lazy"
                          className={`${tool.iconSize} object-contain select-none`}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* MOBILE / TABLET (< lg): Interactive Icon Row + In-Place Card */}
          <div
            className="relative z-10 mt-10 lg:hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {INTEGRATIONS.map((tool) => {
                const isSelected = activeId === tool.id
                const isDimmed = activeId !== null && !isSelected

                return (
                  <div
                    key={tool.id}
                    style={{
                      transitionDelay: hasDroppedIn ? `${tool.dropDelayMs}ms` : '0ms',
                    }}
                    className={`transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      hasDroppedIn
                        ? 'translate-y-0 opacity-100'
                        : '-translate-y-12 opacity-0'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveId(isSelected ? null : tool.id)}
                      aria-label={`Show ${tool.name} time suggestion`}
                      className={`overflow-hidden rounded-2xl bg-white border transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isSelected
                          ? 'w-[300px] sm:w-[320px] min-h-[82px] p-4 border-stone-200/95 shadow-[0_16px_40px_rgba(2,44,34,0.12)] text-left'
                          : `w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center border-stone-200/90 shadow-sm ${
                              isDimmed
                                ? 'opacity-45 blur-[1.5px] scale-95'
                                : 'opacity-100'
                            }`
                      }`}
                    >
                      {isSelected ? (
                        <p className="text-[13px] leading-[1.48] text-stone-600">
                          <span className="inline-flex items-center gap-1.5 align-middle mr-1.5">
                            <img
                              src={tool.logoSrc}
                              alt=""
                              className={`${
                                tool.badgeIconClass || 'w-3.5 h-3.5'
                              } object-contain shrink-0`}
                            />
                            <span
                              className={`font-semibold text-[12.5px] ${tool.nameColor}`}
                            >
                              {tool.name}
                            </span>
                          </span>
                          <TypewriterText
                            text={tool.suggestion}
                            active={isSelected}
                            delayMs={240}
                            speedMs={14}
                          />
                        </p>
                      ) : (
                        <img
                          src={tool.logoSrc}
                          alt={tool.name}
                          loading="lazy"
                          className={`${
                            tool.mobileIconClass || 'w-7 h-7 sm:w-8 sm:h-8'
                          } object-contain select-none`}
                        />
                      )}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Microcopy at Bottom */}
          <div className="mt-10 lg:mt-6 flex flex-col items-center text-center">
            <p className="mt-5 text-[12.5px] sm:text-[13px] leading-[1.5] tracking-[-0.01em] text-gray-500 max-w-[520px]">
              You choose what connects. TimeFlow reads titles, never the contents of your files, and suggestions are generated on your device.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
