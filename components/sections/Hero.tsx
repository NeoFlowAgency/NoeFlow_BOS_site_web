'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import gsap from 'gsap'
import MagneticButton from '@/components/ui/MagneticButton'

export default function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale()
  const containerRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const signupUrl = process.env.NEXT_PUBLIC_BOS_SIGNUP_URL || 'https://bos.neoflow-agency.cloud/signup'

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const mockupOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Cursor spotlight
  useEffect(() => {
    const container = containerRef.current
    const spotlight = spotlightRef.current
    if (!container || !spotlight) return

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      gsap.to(spotlight, {
        x: x - 300,
        y: y - 300,
        duration: 0.8,
        ease: 'power2.out',
      })
    }

    container.addEventListener('mousemove', onMove)
    return () => container.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white pt-16"
    >
      {/* Gradient mesh blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob-1 absolute -top-40 -left-20 w-[600px] h-[600px] rounded-full bg-[#313ADF]/8 blur-[100px]" />
        <div className="blob-2 absolute -top-20 right-0 w-[500px] h-[500px] rounded-full bg-[#6B77E8]/10 blur-[80px]" />
        <div className="blob-3 absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[#B4B8F8]/15 blur-[60px]" />
        <div className="blob-4 absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-[#040741]/5 blur-[80px]" />
      </div>

      {/* Cursor spotlight */}
      <div
        ref={spotlightRef}
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(49,58,223,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(#313ADF 1px, transparent 1px), linear-gradient(to right, #313ADF 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="badge-chip">
            <span className="w-1.5 h-1.5 rounded-full bg-[#313ADF] animate-pulse" />
            {t('badge')}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="hero-title mt-6 text-6xl md:text-7xl lg:text-8xl font-bold text-[#040741] leading-[1.05] tracking-tight max-w-5xl"
        >
          {t('title')}{' '}
          <br className="hidden md:block" />
          <span className="gradient-text">{t('titleGradient')}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-6 text-lg md:text-xl text-[#6B7280] max-w-2xl leading-relaxed"
        >
          {t('subtitle')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <MagneticButton
            href={signupUrl}
            className="group flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-[#313ADF] text-white font-semibold text-base shadow-xl shadow-[#313ADF]/25 hover:bg-[#2530C8] hover:shadow-[#313ADF]/35 transition-all duration-300"
          >
            {t('cta')}
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5H8M6 3L8 5L6 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </MagneticButton>

          <MagneticButton
            href={`/${locale}#fonctionnalites`}
            className="flex items-center gap-2 px-7 py-3.5 rounded-2xl text-[#040741] font-semibold text-base border border-[#E8EAFF] hover:border-[#313ADF]/30 hover:bg-[#F8F9FF] transition-all duration-300"
          >
            {t('ctaSecondary')}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2L7 12M7 12L3 8M7 12L11 8" stroke="#040741" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </MagneticButton>
        </motion.div>

        {/* App mockup */}
        <motion.div
          style={{ y: mockupY, opacity: mockupOpacity }}
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-16 w-full max-w-5xl"
        >
          {/* Glow behind mockup */}
          <div className="absolute inset-x-10 -inset-y-4 bg-gradient-to-b from-[#313ADF]/12 to-transparent rounded-3xl blur-3xl pointer-events-none" />

          {/* Mockup frame */}
          <div
            className="relative rounded-2xl border border-[#E8EAFF] bg-[#F8F9FF] overflow-hidden shadow-2xl shadow-[#040741]/10"
            style={{
              perspective: '1200px',
              transform: 'rotateX(4deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-white border-b border-[#E8EAFF]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <div className="flex-1 mx-4">
                <div className="max-w-xs mx-auto h-6 rounded-md bg-[#F8F9FF] border border-[#E8EAFF] flex items-center justify-center gap-1.5 px-3">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M4.5 8C6.43 8 8 6.43 8 4.5C8 2.57 6.43 1 4.5 1C2.57 1 1 2.57 1 4.5C1 6.43 2.57 8 4.5 8Z" stroke="#9CA3AF" strokeWidth="1"/>
                    <path d="M9 9L7 7" stroke="#9CA3AF" strokeWidth="1" strokeLinecap="round"/>
                  </svg>
                  <span className="text-[9px] text-[#9CA3AF]">bos.neoflow-agency.cloud</span>
                </div>
              </div>
            </div>

            {/* Placeholder content — screenshot goes here */}
            <div className="aspect-[16/9] bg-gradient-to-br from-[#F8F9FF] via-white to-[#EEF0FF] flex items-center justify-center">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#313ADF] to-[#040741] mx-auto flex items-center justify-center shadow-lg shadow-[#313ADF]/30">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M6 21L14 7L22 21" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9.5 16H18.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <p className="text-sm font-medium text-[#6B7280]">
                  {locale === 'fr' ? 'Screenshot de l\'app à venir' : 'App screenshot coming soon'}
                </p>
                <p className="text-xs text-[#9CA3AF]">NeoFlow BOS Dashboard</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-12 flex flex-col items-center gap-2 text-[#9CA3AF]"
        >
          <span className="text-xs font-medium tracking-widest uppercase">{t('scrollHint')}</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 4L10 16M10 16L6 12M10 16L14 12" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
