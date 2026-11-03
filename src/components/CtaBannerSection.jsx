import React, { useMemo } from 'react'
import { ArrowDownToLine } from 'lucide-react'
import FadeInOnScroll from './FadeInOnScroll.jsx'

function getDeviceDownloadInfo() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return { label: 'Download for Mac', href: '#download-mac' }
  }

  const ua = navigator.userAgent || ''
  const platform = navigator.userAgentData?.platform || navigator.platform || ''

  // Detect iOS / iPadOS (including iPad on iOS 13+ reporting as MacIntel with touch points)
  const isIOS =
    /iPad|iPhone|iPod/i.test(ua) ||
    (platform === 'MacIntel' && navigator.maxTouchPoints > 1)

  if (isIOS) {
    return { label: 'Download for iOS', href: '#download-ios' }
  }

  if (/Android/i.test(ua)) {
    return { label: 'Download for Android', href: '#download-android' }
  }

  if (/Win/i.test(platform) || /Windows/i.test(ua)) {
    return { label: 'Download for Windows', href: '#download-windows' }
  }

  if (/Mac/i.test(platform) || /Macintosh|Mac OS X/i.test(ua)) {
    return { label: 'Download for Mac', href: '#download-mac' }
  }

  if (/Linux/i.test(platform) || /Linux/i.test(ua)) {
    return { label: 'Download for Linux', href: '#download-linux' }
  }

  return { label: 'Download the app', href: '#download' }
}

export default function CtaBannerSection() {
  const downloadInfo = useMemo(() => getDeviceDownloadInfo(), [])

  return (
    <section
      aria-labelledby="cta-banner-heading"
      className="w-full text-[#070707]"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[72px]">
        <FadeInOnScroll duration={1100}>
          <div
            className="rounded-[32px] p-6 sm:p-8 lg:py-4 lg:pl-12 lg:pr-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-10"
            style={{
              background: 'linear-gradient(235deg, #EBF7DD 0%, #FDF8EA 100%)',
            }}
          >
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
                  href={downloadInfo.href}
                  className="inline-flex items-center gap-2 text-[16px] font-semibold tracking-[-0.01em] text-[#070707] hover:opacity-75 transition-opacity"
                >
                  <span>{downloadInfo.label}</span>
                  <ArrowDownToLine
                    className="w-5 h-5 text-gray-500 stroke-[2]"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-[460px] xl:w-[498px] shrink-0 overflow-hidden rounded-[22px]">
              <img
                src="/images/cta-banner-img.webp"
                alt="Person working on a laptop at home"
                loading="lazy"
                className="w-full h-auto object-cover block"
              />
            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  )
}

