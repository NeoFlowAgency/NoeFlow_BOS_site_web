'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import gsap from 'gsap'
import MagneticButton from '@/components/ui/MagneticButton'

export default function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale()
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const signupUrl = process.env.NEXT_PUBLIC_BOS_SIGNUP_URL || 'https://bos.neoflow-agency.cloud/signup'

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const mockupScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92])
  const mockupOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -60])

  // Smooth mouse parallax on mockup
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 })
  const mockupRotateX = useTransform(springY, [-300, 300], [4, -4])
  const mockupRotateY = useTransform(springX, [-400, 400], [-4, 4])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left - rect.width / 2)
      mouseY.set(e.clientY - rect.top - rect.height / 2)
    }
    container.addEventListener('mousemove', onMove, { passive: true })
    return () => container.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  // Staggered text reveal on load
  useEffect(() => {
    const title = titleRef.current
    if (!title) return
    gsap.fromTo(
      title.querySelectorAll('.word'),
      { y: 80, opacity: 0, rotateX: 40 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.9,
        stagger: 0.06,
        ease: 'power4.out',
        delay: 0.3,
      }
    )
  }, [])

  const words = t('title').split(' ')
  const gradientWord = t('titleGradient')

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white pt-16"
    >
      {/* Gradient mesh blobs — bigger + stronger */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob-1 absolute -top-60 -left-32 w-[700px] h-[700px] rounded-full bg-[#313ADF]/10 blur-[120px]" />
        <div className="blob-2 absolute -top-10 right-[-100px] w-[600px] h-[600px] rounded-full bg-[#6B77E8]/12 blur-[100px]" />
        <div className="blob-3 absolute bottom-[-100px] left-1/3 w-[500px] h-[500px] rounded-full bg-[#B4B8F8]/18 blur-[80px]" />
        <div className="blob-4 absolute top-1/2 right-1/3 w-[350px] h-[350px] rounded-full bg-[#040741]/6 blur-[90px]" />
      </div>

      {/* Dot grid — fine, subtle */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #313ADF22 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col items-center text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="badge-chip">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#313ADF] opacity-50" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#313ADF]" />
            </span>
            {t('badge')}
          </span>
        </motion.div>

        {/* Headline — word-by-word reveal via GSAP */}
        <h1
          ref={titleRef}
          className="hero-title mt-7 text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-[#040741] leading-[1.04] tracking-tight max-w-5xl"
          style={{ perspective: '800px' }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              className="word inline-block mr-[0.22em] last:mr-0"
              style={{ opacity: 0, transformOrigin: 'bottom center', display: 'inline-block' }}
            >
              {word}
            </span>
          ))}
          <br className="hidden md:block" />
          <span
            className="word gradient-text inline-block"
            style={{ opacity: 0, transformOrigin: 'bottom center' }}
          >
            {gradientWord}
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 text-lg md:text-xl text-[#6B7280] max-w-2xl leading-relaxed"
        >
          {t('subtitle')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <MagneticButton
            href={signupUrl}
            className="group relative flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#313ADF] text-white font-semibold text-base overflow-hidden"
            style={{ boxShadow: '0 8px 32px rgba(49,58,223,0.3), 0 2px 8px rgba(49,58,223,0.2)' }}
          >
            {/* Shine sweep */}
            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none" />
            {t('cta')}
            <span className="relative w-5 h-5 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
              <motion.span
                animate={{ x: [0, 14, -14, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
                className="flex items-center gap-[14px]"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5H8M6 3L8 5L6 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5H8M6 3L8 5L6 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.span>
            </span>
          </MagneticButton>

          <MagneticButton
            href={`/${locale}#fonctionnalites`}
            external={false}
            className="group flex items-center gap-2 px-8 py-4 rounded-2xl text-[#040741] font-semibold text-base border border-[#E8EAFF] hover:border-[#313ADF]/40 hover:bg-[#F8F9FF] transition-all duration-300"
          >
            {t('ctaSecondary')}
            <motion.span
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2L7 12M7 12L3 8M7 12L11 8" stroke="#313ADF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.span>
          </MagneticButton>
        </motion.div>

        {/* App mockup — 3D parallax */}
        <motion.div
          style={{ y: mockupY, scale: mockupScale, opacity: mockupOpacity }}
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-16 w-full max-w-5xl"
        >
          {/* Reflection glow */}
          <div className="absolute inset-x-20 top-0 h-px bg-gradient-to-r from-transparent via-[#313ADF]/40 to-transparent" />
          <div className="absolute inset-x-10 -bottom-6 h-16 bg-gradient-to-b from-[#313ADF]/15 to-transparent rounded-b-3xl blur-2xl" />

          <motion.div
            style={{
              rotateX: mockupRotateX,
              rotateY: mockupRotateY,
              transformStyle: 'preserve-3d',
              transformPerspective: 1200,
              boxShadow: '0 40px 80px -20px rgba(4,7,65,0.18), 0 0 0 1px rgba(232,234,255,0.8)',
            }}
            className="relative rounded-2xl border border-[#E8EAFF] bg-[#F8F9FF] overflow-hidden"
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
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-[9px] text-[#9CA3AF]">bos.neoflow-agency.cloud</span>
                </div>
              </div>
            </div>

            {/* Simulated UI */}
            <div className="aspect-[16/9] bg-gradient-to-br from-[#F8F9FF] via-white to-[#EEF0FF] p-6 flex gap-4">
              {/* Sidebar sim */}
              <div className="hidden md:flex flex-col gap-2 w-36 flex-shrink-0">
                <div className="h-8 rounded-lg bg-[#313ADF]/10 flex items-center px-3 gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#313ADF]" />
                  <div className="h-2 w-16 rounded bg-[#313ADF]/40" />
                </div>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-7 rounded-lg bg-white border border-[#E8EAFF] flex items-center px-3 gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#E8EAFF]" />
                    <div className="h-1.5 rounded bg-[#E8EAFF]" style={{ width: `${55 + i * 8}%` }} />
                  </div>
                ))}
              </div>

              {/* Main content sim */}
              <div className="flex-1 flex flex-col gap-3">
                {/* KPI row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'CA du mois', val: '24 380 €', delta: '+12%', color: 'text-green-500' },
                    { label: 'Commandes', val: '142', delta: '+8%', color: 'text-green-500' },
                    { label: 'En attente', val: '7', delta: '−2', color: 'text-orange-400' },
                  ].map((kpi, i) => (
                    <div key={i} className="rounded-xl bg-white border border-[#E8EAFF] p-3 shadow-sm">
                      <p className="text-[9px] text-[#9CA3AF] mb-1">{kpi.label}</p>
                      <p className="text-sm font-bold text-[#040741]">{kpi.val}</p>
                      <p className={`text-[9px] font-semibold mt-0.5 ${kpi.color}`}>{kpi.delta}</p>
                    </div>
                  ))}
                </div>

                {/* Table sim */}
                <div className="flex-1 rounded-xl bg-white border border-[#E8EAFF] overflow-hidden shadow-sm">
                  <div className="grid grid-cols-3 px-3 py-1.5 bg-[#F8F9FF] border-b border-[#E8EAFF]">
                    {['Client', 'Montant', 'Statut'].map(h => (
                      <div key={h} className="text-[8px] font-semibold text-[#9CA3AF] uppercase tracking-wider">{h}</div>
                    ))}
                  </div>
                  {[
                    { client: 'M. Dupont', amount: '1 890 €', status: 'Payé', dot: 'bg-green-400' },
                    { client: 'Mme Martin', amount: '3 240 €', status: 'En attente', dot: 'bg-orange-400' },
                    { client: 'SARL Renov', amount: '8 750 €', status: 'En cours', dot: 'bg-[#313ADF]' },
                    { client: 'M. Bernard', amount: '640 €', status: 'Payé', dot: 'bg-green-400' },
                  ].map((row, i) => (
                    <div key={i} className={`grid grid-cols-3 px-3 py-2 border-b border-[#E8EAFF] last:border-0 ${i % 2 === 0 ? '' : 'bg-[#F8F9FF]/50'}`}>
                      <div className="text-[9px] font-medium text-[#040741]">{row.client}</div>
                      <div className="text-[9px] font-semibold text-[#313ADF]">{row.amount}</div>
                      <div className="flex items-center gap-1">
                        <div className={`w-1.5 h-1.5 rounded-full ${row.dot}`} />
                        <span className="text-[8px] text-[#6B7280]">{row.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-12 flex flex-col items-center gap-2"
        >
          <span className="text-xs font-medium tracking-widest uppercase text-[#B4B8F8]">{t('scrollHint')}</span>
          <div className="w-6 h-10 rounded-full border-2 border-[#E8EAFF] flex items-start justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-2 rounded-full bg-[#313ADF]"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
