import React from 'react'

// Lower number = faster scroll, higher number = slower scroll (in seconds)
const MARQUEE_SPEED_SECONDS = 60

const LOGOS = [
  {
    name: 'Boltshift',
    logoSrc: '/images/logo/Fictional company logo 1.webp',
  },
  {
    name: 'Lightbox',
    logoSrc: '/images/logo/Fictional company logo 2.webp',
  },
  {
    name: 'FeatherDev',
    logoSrc: '/images/logo/Fictional company logo 3.webp',
  },
  {
    name: 'Spherule',
    logoSrc: '/images/logo/Fictional company logo 4.webp',
  },
  {
    name: 'GlobalBank',
    logoSrc: '/images/logo/Fictional company logo 5.webp',
  },
  {
    name: 'Nietzsche',
    logoSrc: '/images/logo/Fictional company logo 6.webp',
  },
]

export default function LogoMarquee() {
  // Duplicate set so each half of the track is identical for seamless -50% loop
  const singleSet = [...LOGOS, ...LOGOS]

  return (
    <section
      aria-label="Trusted companies"
      className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[72px]"
    >
      {/* Infinite Auto-Scrolling Marquee Track */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        }}
      >
        <div
          className="logo-marquee-track items-center"
          style={{ animationDuration: `${MARQUEE_SPEED_SECONDS}s` }}
        >
          {/* First half */}
          <div className="flex items-center shrink-0">
            {singleSet.map((logo, idx) => (
              <div
                key={`set1-${logo.name}-${idx}`}
                className="flex items-center pr-12 sm:pr-16 lg:pr-[76px] select-none shrink-0"
              >
                <img
                  src={logo.logoSrc}
                  alt={logo.name}
                  className="h-9 sm:h-10 lg:h-11 w-auto object-contain block"
                />
              </div>
            ))}
          </div>

          {/* Second identical half for seamless loop */}
          <div aria-hidden="true" className="flex items-center shrink-0">
            {singleSet.map((logo, idx) => (
              <div
                key={`set2-${logo.name}-${idx}`}
                className="flex items-center pr-12 sm:pr-16 lg:pr-[76px] select-none shrink-0"
              >
                <img
                  src={logo.logoSrc}
                  alt=""
                  className="h-9 sm:h-10 lg:h-11 w-auto object-contain block"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Supporting Caption */}
      <p className="mt-6 text-center text-[12px] tracking-[-0.01em] text-gray-500">
        Join 4,000+ companies already growing
      </p>
    </section>
  )
}
