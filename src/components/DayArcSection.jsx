import React, { useEffect, useRef, useState } from 'react'
import {
  Home,
  Plus,
  Sun,
  Moon,
  Lock,
  Play,
  GitBranch,
  PauseCircle,
  TrendingUp,
  Link2,
} from 'lucide-react'

const DAY_STOPS = [
  {
    id: '0900',
    timeLabel: '09:00 am',
    skyName: 'dawn-apricot',
    skyHex: '#FFF0E5',
    skyRgb: [255, 240, 229],
    isNight: false,
    angleDeg: 166,
    title: 'Start without\nthinking about it',
    copy: 'Open a project and TimeFlow offers to start the timer. One tap and you are tracking.',
    imageSrc: '',
    sidebarEntries: [
      { time: '00:00:00', active: true, tags: ['Brightloop'] },
      { time: '12:02', active: false, tags: ['Sprint 02', 'Planning'] },
      { time: '10:00', active: false, tags: ['Break'], isBreak: true },
      { time: '01:50', active: false, tags: ['Sprint 04', 'Website'] },
    ],
  },
  {
    id: '1030',
    timeLabel: '10:30 am',
    skyName: 'morning-amber',
    skyHex: '#FFFBEB',
    skyRgb: [255, 251, 235],
    isNight: false,
    angleDeg: 128,
    title: 'Notices when your\nfocus shifts',
    copy: 'Switch tasks and TimeFlow proposes a split. You confirm it, and nothing changes silently.',
    imageSrc: '',
    sidebarEntries: [
      { time: '01:28:00', active: true, tags: ['Brightloop'] },
      { time: '01:04', active: false, tags: ['Homepage layout'] },
      { time: '00:24', active: false, tags: ['Client email'] },
      { time: '01:50', active: false, tags: ['Sprint 04', 'Website'] },
    ],
  },
  {
    id: '1230',
    timeLabel: '12:30 pm',
    skyName: 'midday-daylight',
    skyHex: '#FAFAF9',
    skyRgb: [250, 250, 249],
    isNight: false,
    angleDeg: 90,
    title: 'Breaks without\nthe guilt',
    copy: 'Step away and the timer pauses on a suggestion. Come back and pick up right where you left off.',
    imageSrc: '',
    sidebarEntries: [
      { time: '03:42:10', active: true, tags: ['Paused'], isBreak: true },
      { time: '01:28', active: false, tags: ['Brightloop', 'Layout'] },
      { time: '00:24', active: false, tags: ['Client email'] },
      { time: '01:50', active: false, tags: ['Sprint 04', 'Website'] },
    ],
  },
  {
    id: '1500',
    timeLabel: '03:00 pm',
    skyName: 'golden-hour',
    skyHex: '#FFEDD5',
    skyRgb: [255, 237, 213],
    isNight: false,
    angleDeg: 52,
    title: 'A quiet heads-up\non budgets',
    copy: 'See when a client project is nearing its budget while there is still time to do something about it.',
    imageSrc: '',
    sidebarEntries: [
      { time: '05:18:40', active: true, tags: ['Brightloop'] },
      { time: '00:45', active: false, tags: ['Break'], isBreak: true },
      { time: '01:28', active: false, tags: ['Homepage layout'] },
      { time: '00:24', active: false, tags: ['Client email'] },
    ],
  },
  {
    id: '1730',
    timeLabel: '05:30 pm',
    skyName: 'dusk-night',
    skyHex: '#022C22',
    skyRgb: [2, 44, 34],
    isNight: true,
    angleDeg: 14,
    title: 'Close the day\nin one tap',
    copy: 'A private summary of your day, generated on your device, and a timesheet ready to share.',
    imageSrc: '',
    sidebarEntries: [
      { time: '07:12:00', active: true, tags: ['Day Summary'] },
      { time: '05:40', active: false, tags: ['Billable'] },
      { time: '01:32', active: false, tags: ['2 unsorted'] },
      { time: '00:45', active: false, tags: ['Break'], isBreak: true },
    ],
  },
]

function lerp(a, b, t) {
  return a + (b - a) * t
}

function interpolateSkyColor(progress) {
  const scaled = Math.max(0, Math.min(1, progress)) * (DAY_STOPS.length - 1)
  const idx = Math.min(Math.floor(scaled), DAY_STOPS.length - 2)
  const localT = scaled - idx
  const c1 = DAY_STOPS[idx].skyRgb
  const c2 = DAY_STOPS[idx + 1].skyRgb
  const r = Math.round(lerp(c1[0], c2[0], localT))
  const g = Math.round(lerp(c1[1], c2[1], localT))
  const b = Math.round(lerp(c1[2], c2[2], localT))
  return `rgb(${r}, ${g}, ${b})`
}

function interpolateArcAngle(progress) {
  const scaled = Math.max(0, Math.min(1, progress)) * (DAY_STOPS.length - 1)
  const idx = Math.min(Math.floor(scaled), DAY_STOPS.length - 2)
  const localT = scaled - idx
  return lerp(DAY_STOPS[idx].angleDeg, DAY_STOPS[idx + 1].angleDeg, localT)
}

function MomentPanelContent({ stopId }) {
  // 09:00 am — Start without thinking about it
  if (stopId === '0900') {
    return (
      <div className="w-full h-full flex flex-col justify-between items-center text-center py-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-800/10 text-emerald-800 text-[10.5px] font-semibold">
          <Play className="w-3 h-3 fill-current" />
          <span>Brightloop Website Redesign</span>
        </div>

        <div className="my-auto px-2">
          <div className="text-[28px] sm:text-[34px] font-semibold tracking-[-0.03em] text-emerald-950 tabular-nums leading-none mb-3">
            00:00:00
          </div>
          <p className="text-[13px] sm:text-[13.5px] font-medium text-emerald-950 leading-snug max-w-[250px] mx-auto">
            “You opened this project at 9:02 AM. Start timer?”
          </p>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button
            type="button"
            className="px-4 py-1.5 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white text-[11px] font-medium transition-colors"
          >
            Start timer
          </button>
          <button
            type="button"
            className="px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200/80 text-emerald-950 text-[11px] font-medium transition-colors"
          >
            Not now
          </button>
        </div>
      </div>
    )
  }

  // 10:30 am — Notices when your focus shifts
  if (stopId === '1030') {
    return (
      <div className="w-full h-full flex flex-col justify-between py-1">
        <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
          <span className="text-[11.5px] font-semibold text-emerald-950">
            Brightloop Website Redesign
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-800/10 text-emerald-800 text-[10.5px] font-semibold tabular-nums">
            1h 28m
          </span>
        </div>

        <div className="my-auto py-3">
          <div className="flex items-center gap-1.5 text-[10.5px] font-semibold text-emerald-800 mb-2">
            <GitBranch className="w-3.5 h-3.5" />
            <span>Suggested split</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-stone-50 border border-emerald-800/15">
              <span className="text-[11.5px] font-medium text-emerald-950">
                Homepage layout
              </span>
              <span className="text-[11px] font-semibold text-emerald-800 tabular-nums">
                1h 04m
              </span>
            </div>
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-stone-50 border border-emerald-800/15">
              <span className="text-[11.5px] font-medium text-emerald-950">
                Client email
              </span>
              <span className="text-[11px] font-semibold text-emerald-800 tabular-nums">
                24m
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 pt-1">
          <button
            type="button"
            className="px-4 py-1.5 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white text-[11px] font-medium transition-colors"
          >
            Accept
          </button>
          <button
            type="button"
            className="px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200/80 text-emerald-950 text-[11px] font-medium transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    )
  }

  // 12:30 pm — Breaks without the guilt
  if (stopId === '1230') {
    return (
      <div className="w-full h-full flex flex-col justify-between items-center text-center py-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-800/10 text-emerald-800 text-[10px] font-semibold">
          <PauseCircle className="w-3 h-3" />
          <span>Timer paused</span>
        </div>

        <div className="my-auto">
          <div className="grid grid-cols-3 gap-5 text-[9px] font-normal text-stone-400 mb-1">
            <span>hr</span>
            <span>min</span>
            <span>sec</span>
          </div>
          <div className="text-[32px] sm:text-[38px] font-semibold tracking-[-0.03em] text-emerald-950 tabular-nums leading-none">
            03:42:10
          </div>
          <p className="mt-3 text-[13px] font-medium text-emerald-950">
            “Welcome back. Resume Brightloop?”
          </p>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button
            type="button"
            className="px-4 py-1.5 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white text-[11px] font-medium transition-colors"
          >
            Resume
          </button>
          <button
            type="button"
            className="px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200/80 text-emerald-950 text-[11px] font-medium transition-colors"
          >
            Stay paused
          </button>
        </div>
      </div>
    )
  }

  // 03:00 pm — A quiet heads-up on budgets
  if (stopId === '1500') {
    return (
      <div className="w-full h-full flex flex-col justify-between py-1">
        <div className="flex items-center justify-between">
          <span className="text-[11.5px] font-semibold text-emerald-950">
            Brightloop Website Redesign
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-800/10 text-emerald-800 text-[10.5px] font-semibold">
            <TrendingUp className="w-3 h-3" />
            <span>$58/hr effective</span>
          </span>
        </div>

        <div className="my-auto py-3">
          <div className="flex items-baseline justify-between mb-1.5">
            <span className="text-[11px] font-medium text-stone-500">
              Monthly budget used
            </span>
            <span className="text-[22px] font-bold tracking-[-0.02em] text-emerald-800 tabular-nums">
              82%
            </span>
          </div>

          {/* Budget Progress Bar */}
          <div className="w-full h-2.5 rounded-full bg-stone-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-800 transition-all duration-500"
              style={{ width: '82%' }}
            />
          </div>

          <p className="mt-3 text-[12px] font-medium text-emerald-950 leading-relaxed bg-orange-50/80 border border-orange-200/70 rounded-lg px-3 py-2">
            “4 days left. At this pace you’ll pass it by Thursday.”
          </p>
        </div>

        <div className="flex items-center justify-between text-[10.5px] text-stone-500 pt-1 border-t border-stone-100">
          <span>Effective rate: $58/hr</span>
          <span className="font-semibold text-emerald-800">32.8 / 40 hrs</span>
        </div>
      </div>
    )
  }

  // 05:30 pm — Close the day in one tap (with privacy lock badge ONLY here)
  return (
    <div className="w-full h-full flex flex-col justify-between py-1">
      {/* Privacy Lock Badge — shown ONLY on the 5:30 PM card */}
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-800/10 text-emerald-800 text-[10px] font-semibold">
          <Lock className="w-3 h-3 stroke-[2.2]" />
          <span>Generated on this device</span>
        </span>
        <span className="text-[10.5px] font-medium text-stone-400 tabular-nums">
          05:30 PM
        </span>
      </div>

      <div className="my-auto py-2">
        <p className="text-[14px] sm:text-[15px] font-semibold tracking-[-0.015em] text-emerald-950 leading-snug">
          “Today: 7h 12m tracked, 5h 40m billable. Two entries need a project.”
        </p>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="px-3 py-2 rounded-lg bg-stone-50 border border-emerald-800/15">
            <span className="block text-[9.5px] text-stone-500">Tracked today</span>
            <span className="text-[15px] font-bold text-emerald-950 tabular-nums">
              7h 12m
            </span>
          </div>
          <div className="px-3 py-2 rounded-lg bg-emerald-800/[0.06] border border-emerald-800/20">
            <span className="block text-[9.5px] text-emerald-800">Billable</span>
            <span className="text-[15px] font-bold text-emerald-800 tabular-nums">
              5h 40m
            </span>
          </div>
        </div>
      </div>

      <div className="pt-1 flex justify-end">
        <button
          type="button"
          className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white text-[11px] font-medium transition-colors"
        >
          <Link2 className="w-3.5 h-3.5" />
          <span>Copy timesheet link</span>
        </button>
      </div>
    </div>
  )
}

function LiveAppCard({ stop }) {
  const { sidebarEntries, imageSrc } = stop

  const cardBgStyle = {
    background: 'linear-gradient(235deg, #EBF7DD 0%, #FDF8EA 100%)',
  }

  if (imageSrc) {
    return (
      <div
        style={cardBgStyle}
        className="w-full rounded-[24px] sm:rounded-[28px] 2xl:rounded-[34px] p-3.5 sm:p-8 lg:px-[clamp(2.5rem,3.5vw,4.5rem)] lg:py-[clamp(1.75rem,3vh,3.25rem)]"
      >
        <img
          src={imageSrc}
          alt={stop.title.replace('\n', ' ')}
          className="w-full h-auto rounded-[14px] sm:rounded-[18px] shadow-xl object-cover"
        />
      </div>
    )
  }

  return (
    <div
      style={cardBgStyle}
      className="w-full rounded-[24px] sm:rounded-[28px] 2xl:rounded-[34px] p-3.5 sm:p-8 lg:px-[clamp(2.5rem,3.5vw,4.5rem)] lg:py-[clamp(1.75rem,3vh,3.25rem)]"
    >
      {/* Inner macOS-style TimeFlow Window — keeps emerald-800 accents in every state */}
      <div className="w-full max-w-[500px] lg:max-w-[clamp(480px,38vw,600px)] mx-auto bg-white text-emerald-950 rounded-[14px] sm:rounded-[16px] 2xl:rounded-[20px] shadow-[0_14px_40px_rgba(2,44,34,0.07)] border border-black/[0.04] overflow-hidden">
        {/* Top Window Bar */}
        <div className="h-8 sm:h-9 2xl:h-10 px-3 sm:px-3.5 2xl:px-4 bg-white border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Traffic Lights */}
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 2xl:w-2.5 2xl:h-2.5 rounded-full bg-[#FF5F56]" />
              <span className="w-2 h-2 2xl:w-2.5 2xl:h-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="w-2 h-2 2xl:w-2.5 2xl:h-2.5 rounded-full bg-[#27C93F]" />
            </div>

            {/* App Brand with emerald-800 home icon */}
            <div className="flex items-center gap-1.5 pl-1">
              <Home className="w-3 h-3 2xl:w-3.5 2xl:h-3.5 text-emerald-800 stroke-[2.2]" />
              <span className="text-[10.5px] 2xl:text-[11.5px] font-medium tracking-[-0.01em] text-emerald-950">
                TimeFlow
              </span>
            </div>
          </div>

          <span
            aria-hidden="true"
            className="w-5 h-5 2xl:w-6 2xl:h-6 rounded-full bg-stone-100 text-emerald-800 inline-flex items-center justify-center"
          >
            <Plus className="w-3 h-3 2xl:w-3.5 2xl:h-3.5 stroke-[2.2]" />
          </span>
        </div>

        {/* Window Split Body */}
        <div className="grid grid-cols-12 min-h-[215px] sm:min-h-[268px] lg:min-h-[clamp(256px,29vh,330px)]">
          {/* Left Sidebar: Time Entries */}
          <div className="col-span-4 bg-[#EFEFF4] divide-y divide-black/[0.05] flex flex-col">
            {sidebarEntries.map((entry, idx) => (
              <div
                key={`${entry.time}-${idx}`}
                className="px-2.5 sm:px-3.5 py-2 sm:py-2.5 flex flex-col justify-center flex-1"
              >
                <span
                  className={`text-[11px] sm:text-[13.5px] tabular-nums tracking-[-0.02em] ${
                    entry.active
                      ? 'font-bold text-emerald-950'
                      : 'font-semibold text-emerald-950'
                  }`}
                >
                  {entry.time}
                </span>

                {entry.tags.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-1 sm:px-1.5 py-0.5 rounded text-[7.5px] sm:text-[8px] font-medium leading-none ${
                          entry.isBreak
                            ? 'bg-orange-100 text-orange-600'
                            : 'bg-white text-stone-600 shadow-[0_1px_1px_rgba(0,0,0,0.03)]'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Main Moment Panel */}
          <div className="col-span-8 bg-white px-3.5 sm:px-5 py-3 sm:py-4 flex flex-col justify-between">
            <MomentPanelContent stopId={stop.id} />
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionHeader({ isNight = false, compact = false }) {
  return (
    <div>
    </div>
  )
}

function FlipTimeLabel({ activeIndex, isNight, className = '' }) {
  const activeTime = DAY_STOPS[activeIndex].timeLabel
  const charCount = activeTime.length

  return (
    <div
      aria-live="polite"
      aria-label={activeTime}
      className={`inline-flex items-center font-semibold tracking-[-0.04em] leading-none tabular-nums transition-colors duration-300 ${
        isNight ? 'text-stone-50' : 'text-emerald-950'
      } ${className}`}
    >
      {Array.from({ length: charCount }).map((_, charIdx) => {
        const currentChar = activeTime[charIdx]

        // Static separators (colon and space)
        if (currentChar === ':' || currentChar === ' ') {
          return (
            <span
              key={charIdx}
              aria-hidden="true"
              className={currentChar === ' ' ? 'w-[0.26em]' : 'inline-block'}
            >
              {currentChar}
            </span>
          )
        }

        // Build deduplicated reel so adjacent stops with the same character don't roll
        const reel = []
        const stopToReelPos = []
        DAY_STOPS.forEach((stop, stopIdx) => {
          const ch = stop.timeLabel[charIdx]
          if (reel.length === 0 || reel[reel.length - 1] !== ch) {
            reel.push(ch)
          }
          stopToReelPos[stopIdx] = reel.length - 1
        })

        const activeReelPos = stopToReelPos[activeIndex]
        // Stagger transition delay slightly per digit for a mechanical odometer feel
        const delayMs = charIdx * 28

        return (
          <span
            key={charIdx}
            aria-hidden="true"
            className="relative inline-flex flex-col h-[1.08em] overflow-hidden"
          >
            <span
              style={{
                transform: `translate3d(0, -${
                  (activeReelPos * 100) / reel.length
                }%, 0)`,
                transitionDelay: `${delayMs}ms`,
              }}
              className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
            >
              {reel.map((ch, rIdx) => (
                <span
                  key={rIdx}
                  className="h-[1.08em] flex items-center justify-center"
                >
                  {ch}
                </span>
              ))}
            </span>
          </span>
        )
      })}
    </div>
  )
}

// Adjust vertical offset / padding of the centered content area above the arc
const CONTENT_AREA_PADDING = 'pt-16 pb-4 sm:pt-20 sm:pb-6 lg:pt-20 lg:pb-6'

export default function DayArcSection() {
  const sectionRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) return

    let rafId = null
    const handleScroll = () => {
      if (rafId) return
      rafId = window.requestAnimationFrame(() => {
        rafId = null
        const el = sectionRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const scrollableDistance = el.offsetHeight - window.innerHeight
        if (scrollableDistance <= 0) return

        const rawProgress = -rect.top / scrollableDistance
        const clamped = Math.max(0, Math.min(1, rawProgress))
        setScrollProgress(clamped)

        const nearestIndex = Math.min(
          DAY_STOPS.length - 1,
          Math.max(0, Math.round(clamped * (DAY_STOPS.length - 1)))
        )
        setActiveIndex(nearestIndex)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [prefersReducedMotion])

  // 1. REDUCED MOTION: Show five static states stacked
  if (prefersReducedMotion) {
    return (
      <section aria-labelledby="day-arc-reduced-heading" className="w-full">
        <div className="bg-orange-50 text-emerald-950 pt-16 pb-6 px-6 sm:px-10 lg:px-[72px]">
          <div className="max-w-[1360px] mx-auto">
            <SectionHeader isNight={false} />
          </div>
        </div>

        {DAY_STOPS.map((stop) => (
          <div
            key={stop.id}
            style={{ backgroundColor: stop.skyHex }}
            className={`w-full py-14 lg:py-20 transition-colors ${
              stop.isNight ? 'text-stone-50' : 'text-emerald-950'
            }`}
          >
            <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-[72px]">
              <div className="mb-6 text-[40px] font-semibold tracking-[-0.04em] tabular-nums">
                {stop.timeLabel}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-5">
                  <h3 className="text-[32px] sm:text-[40px] font-semibold tracking-[-0.03em] leading-[1.12] whitespace-pre-line">
                    {stop.title}
                  </h3>
                  <p
                    className={`mt-4 text-[15.5px] leading-[1.55] max-w-[400px] ${
                      stop.isNight ? 'text-stone-50/85' : 'text-emerald-950/75'
                    }`}
                  >
                    {stop.copy}
                  </p>
                </div>

                <div className="lg:col-span-7">
                  <LiveAppCard stop={stop} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    )
  }

  const activeStop = DAY_STOPS[activeIndex]
  const isNight = activeStop.isNight
  const currentSkyBg = interpolateSkyColor(scrollProgress)
  const sunAngleDeg = interpolateArcAngle(scrollProgress)
  const sunAngleRad = (sunAngleDeg * Math.PI) / 180

  // Unit circle trig (percentage of the circle's diameter/height) so the dial scales fluidly with vh
  const sunXPercent = 50 + 50 * Math.cos(sunAngleRad)
  const sunYPercent = 50 - 50 * Math.sin(sunAngleRad)

  // Mobile dial circle geometry: diameter = 360px (radius = 180px)
  const mobileDialRadius = 180
  const mobileSunOffsetX = mobileDialRadius * Math.cos(sunAngleRad)
  const mobileSunOffsetY =
    mobileDialRadius - mobileDialRadius * Math.sin(sunAngleRad)

  return (
    <section aria-label="A day with TimeFlow" className="w-full">
      {/* SCROLL-DRIVEN DAY ARC (Mobile & Desktop) */}
      <div
        ref={sectionRef}
        className="relative w-full h-[420vh] lg:h-[460vh]"
      >
        <div
          style={{ backgroundColor: currentSkyBg }}
          className={`sticky top-0 w-full h-screen overflow-hidden flex flex-col transition-colors duration-200 ${
            isNight ? 'text-stone-50' : 'text-emerald-950'
          }`}
        >
          {/* Soft Night Moon Glow */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
              isNight ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background:
                'radial-gradient(circle at 68% 72%, rgba(16, 185, 129, 0.16) 0%, rgba(2, 44, 34, 0) 55%)',
            }}
          />

          {/* Centered Updating Content Area (fills remaining space between Navbar and Bottom Arc) */}
          <div
            className={`relative z-10 flex-1 flex flex-col justify-center w-full max-w-[1360px] 2xl:max-w-[1520px] mx-auto px-5 sm:px-10 lg:px-[72px] ${CONTENT_AREA_PADDING}`}
          >
            {/* Section Eyebrow & Headline */}
            <SectionHeader isNight={isNight} compact />

            {/* MOBILE (< lg): Horizontal scroll-driven sliding track */}
            <div className="lg:hidden overflow-hidden -mx-5 px-5 sm:-mx-10 sm:px-10">
              <div
                className="flex transition-transform duration-150 ease-out will-change-transform"
                style={{
                  width: `${DAY_STOPS.length * 100}%`,
                  transform: `translate3d(-${
                    (scrollProgress * (DAY_STOPS.length - 1) * 100) /
                    DAY_STOPS.length
                  }%, 0, 0)`,
                }}
              >
                {DAY_STOPS.map((stop, idx) => {
                  const isActive = idx === activeIndex
                  return (
                    <div
                      key={stop.id}
                      aria-hidden={!isActive}
                      style={{ width: `${100 / DAY_STOPS.length}%` }}
                      className="px-1.5 sm:px-3 shrink-0"
                    >
                      <div className="max-w-xl mx-auto">
                        <h3 className="text-[24px] sm:text-[32px] font-semibold tracking-[-0.03em] leading-[1.12] whitespace-pre-line">
                          {stop.title}
                        </h3>
                        <p
                          className={`mt-2 sm:mt-3 text-[13.5px] sm:text-[15px] leading-[1.5] mb-4 sm:mb-6 transition-colors duration-300 ${
                            isNight ? 'text-stone-50/85' : 'text-emerald-950/75'
                          }`}
                        >
                          {stop.copy}
                        </p>

                        <LiveAppCard stop={stop} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* DESKTOP (lg+): 12-Column Grid with 250ms fade swap */}
            <div className="hidden lg:grid grid-cols-12 gap-10 2xl:gap-16 items-center">
              {/* Left Column: Moment Title & Copy with 250ms fade swap */}
              <div className="col-span-5">
                <div className="relative min-h-[180px] flex flex-col justify-center">
                  {DAY_STOPS.map((stop, idx) => {
                    const isActive = idx === activeIndex
                    return (
                      <div
                        key={stop.id}
                        aria-hidden={!isActive}
                        className={`transition-all duration-[250ms] ease-out ${
                          isActive
                            ? 'opacity-100 translate-y-0 relative'
                            : 'opacity-0 translate-y-2 pointer-events-none absolute inset-0'
                        }`}
                      >
                        <h3 className="text-[clamp(2.25rem,3.4vh,3.25rem)] font-semibold tracking-[-0.032em] leading-[1.12] whitespace-pre-line">
                          {stop.title}
                        </h3>
                        <p
                          className={`mt-3.5 text-[clamp(0.95rem,1.6vh,1.125rem)] leading-[1.58] max-w-[440px] transition-colors duration-300 ${
                            isNight ? 'text-stone-50/85' : 'text-emerald-950/75'
                          }`}
                        >
                          {stop.copy}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Right Column: Live App UI Card with 250ms fade swap */}
              <div className="col-span-7">
                <div className="relative">
                  {DAY_STOPS.map((stop, idx) => {
                    const isActive = idx === activeIndex
                    return (
                      <div
                        key={stop.id}
                        aria-hidden={!isActive}
                        className={`transition-all duration-[250ms] ease-out ${
                          isActive
                            ? 'opacity-100 scale-100 relative'
                            : 'opacity-0 scale-[0.985] pointer-events-none absolute inset-0'
                        }`}
                      >
                        <LiveAppCard stop={stop} />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Half-Circle Sun Dial + Big Time Label */}
          <div className="relative z-10 w-full flex justify-center select-none">
            {/* MOBILE HALF-CIRCLE STAGE (< lg) */}
            <div className="lg:hidden relative w-[360px] h-[145px] sm:h-[165px]">
              {/* Mobile Half-Circle Dial */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 w-[360px] h-[360px] rounded-full transition-all duration-500"
                style={{
                  boxShadow: isNight
                    ? 'inset 0 0 50px 12px rgba(16, 185, 129, 0.32)'
                    : 'inset 0 0 50px 14px rgba(251, 146, 60, 0.42)',
                }}
              />

              {/* Mobile Sun / Moon Icon riding along the arc */}
              <div
                aria-hidden="true"
                style={{
                  left: `calc(50% + ${mobileSunOffsetX}px)`,
                  top: `${mobileSunOffsetY}px`,
                }}
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 z-20"
              >
                {isNight ? (
                  <Moon
                    className="w-9 h-9 sm:w-10 sm:h-10 text-emerald-300 fill-emerald-300 drop-shadow-[0_0_18px_rgba(110,231,183,0.65)] transition-all duration-300"
                    strokeWidth={2.2}
                  />
                ) : (
                  <Sun
                    className="w-10 h-10 sm:w-11 sm:h-11 text-[#FB923C] fill-[#FB923C] transition-all duration-300"
                    strokeWidth={2.4}
                  />
                )}
              </div>

              {/* Mobile Time Label Centered Inside Bottom of Dial */}
              <div className="absolute inset-x-0 bottom-5 sm:bottom-6 z-20 flex flex-col items-center">
                <FlipTimeLabel
                  activeIndex={activeIndex}
                  isNight={isNight}
                  className="text-[34px] sm:text-[42px]"
                />
              </div>
            </div>

            {/* DESKTOP HALF-CIRCLE STAGE (lg+) — Fluidly scales with viewport height */}
            <div className="hidden lg:block relative w-[clamp(760px,82vh,1140px)] h-[clamp(270px,34vh,460px)]">
              {/* Full Circle Wrapper (diameter = 100% of stage width) so sun percentages map 1:1 to the rim */}
              <div className="pointer-events-none absolute left-0 top-0 w-full aspect-square">
                {/* Single Half-Circle Dial matching reference image */}
                <div
                  aria-hidden="true"
                  className="w-full h-full rounded-full transition-all duration-500"
                  style={{
                    boxShadow: isNight
                      ? 'inset 0 0 95px 20px rgba(16, 185, 129, 0.32)'
                      : 'inset 0 0 95px 24px rgba(251, 146, 60, 0.42)',
                  }}
                />

                {/* Standalone Filled Sun Icon (or Moon at 5:30 PM) riding directly on the dial edge */}
                <div
                  aria-hidden="true"
                  style={{
                    left: `${sunXPercent}%`,
                    top: `${sunYPercent}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  {isNight ? (
                    <Moon
                      className="w-14 h-14 xl:w-16 xl:h-16 2xl:w-[76px] 2xl:h-[76px] text-emerald-300 fill-emerald-300 drop-shadow-[0_0_24px_rgba(110,231,183,0.65)] transition-all duration-300"
                      strokeWidth={2.2}
                    />
                  ) : (
                    <Sun
                      className="w-16 h-16 xl:w-[68px] xl:h-[68px] 2xl:w-[82px] 2xl:h-[82px] text-[#FB923C] fill-[#FB923C] transition-all duration-300"
                      strokeWidth={2.4}
                    />
                  )}
                </div>
              </div>

              {/* Big Time Label Centered Inside the Bottom of the Dial (same font-semibold weight at every stop) */}
              <div className="absolute inset-x-0 bottom-[clamp(1.75rem,3.5vh,3.25rem)] z-20 flex flex-col items-center">
                <FlipTimeLabel
                  activeIndex={activeIndex}
                  isNight={isNight}
                  className="text-[clamp(4rem,7.2vh,6.25rem)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
