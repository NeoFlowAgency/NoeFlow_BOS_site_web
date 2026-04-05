'use client'

import { useTranslations } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const stepIcons = [
  <svg key="1" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M9 2C6.24 2 4 4.24 4 7C4 10.5 9 16 9 16C9 16 14 10.5 14 7C14 4.24 11.76 2 9 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="9" cy="7" r="2" stroke="currentColor" strokeWidth="1.4"/>
  </svg>,
  <svg key="2" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="2" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M2 7h14" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M6 3V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M12 3V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>,
  <svg key="3" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M4 5H13L16 9V14H2V9L5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="5.5" cy="14.5" r="1.5" stroke="currentColor" strokeWidth="1.4"/>
    <circle cx="12.5" cy="14.5" r="1.5" stroke="currentColor" strokeWidth="1.4"/>
  </svg>,
  <svg key="4" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M3 4H15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M3 8h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M3 12h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M12 11l2 2 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
  <svg key="5" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M9 1.5L10.9 6.7H16.4L11.8 9.8L13.6 15L9 11.9L4.4 15L6.2 9.8L1.6 6.7H7.1L9 1.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
]

export default function HowItWorks() {
  const t = useTranslations('howItWorks')
  const steps = t.raw('steps') as Array<{ num: string; title: string; desc: string; tag: string }>

  const sectionRef = useRef<HTMLElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const glowPathRef = useRef<SVGPathElement>(null)
  const tipRef = useRef<SVGCircleElement>(null)
  const dotRefs = useRef<(HTMLDivElement | null)[]>([])
  const [pathReady, setPathReady] = useState(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
  }, [])

  // Build SVG path from dot positions, re-run on resize
  useEffect(() => {
    const buildAndAnimate = () => {
      const wrap = wrapRef.current
      const svg = svgRef.current
      const path = pathRef.current
      const glowPath = glowPathRef.current
      const tip = tipRef.current
      if (!wrap || !svg || !path || !glowPath || !tip) return

      const dots = dotRefs.current.filter(Boolean) as HTMLDivElement[]
      if (dots.length === 0) return

      const wR = wrap.getBoundingClientRect()

      // Resize SVG to wrap dimensions
      svg.setAttribute('width', String(wR.width))
      svg.setAttribute('height', String(wR.height))
      svg.style.width = `${wR.width}px`
      svg.style.height = `${wR.height}px`

      const pts = dots.map(d => {
        const r = d.getBoundingClientRect()
        return {
          x: r.left - wR.left + r.width / 2,
          y: r.top - wR.top + r.height / 2,
        }
      })

      // Build cubic bezier zigzag with soft start/end curves
      const amp = Math.min(wR.width / 6, 80)

      let d = `M ${pts[0].x} ${pts[0].y}`

      for (let i = 1; i < pts.length; i++) {
        const prev = pts[i - 1]
        const curr = pts[i]
        const mid = (prev.y + curr.y) / 2

        // Reduce amplitude at first and last segment for smooth entry/exit
        const isFirst = i === 1
        const isLast = i === pts.length - 1
        const ampScale = isFirst || isLast ? 0.35 : 1

        // Alternating sides
        const side = i % 2 === 1 ? amp * ampScale : -amp * ampScale

        d += ` C ${prev.x + side},${mid} ${curr.x - side},${mid} ${curr.x},${curr.y}`
      }

      path.setAttribute('d', d)
      glowPath.setAttribute('d', d)

      const totalLen = path.getTotalLength()
      path.style.strokeDasharray = `${totalLen}`
      path.style.strokeDashoffset = `${totalLen}`
      glowPath.style.strokeDasharray = `${totalLen}`
      glowPath.style.strokeDashoffset = `${totalLen}`

      setPathReady(true)

      // Kill previous ScrollTrigger if any
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.id === 'howItWorks') st.kill()
      })

      gsap.to([path, glowPath], {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          id: 'howItWorks',
          trigger: wrap,
          start: 'top 80%',
          end: 'bottom 60%',
          scrub: 1.8,
          onUpdate: (self) => {
            // Move the glowing tip along the path
            const pos = path.getPointAtLength(totalLen * self.progress)
            tip.setAttribute('cx', String(pos.x))
            tip.setAttribute('cy', String(pos.y))
            tip.setAttribute('opacity', self.progress > 0.01 && self.progress < 0.99 ? '1' : '0')
          },
        },
      })
    }

    // Small delay to let DOM render dots
    const timer = setTimeout(buildAndAnimate, 100)
    window.addEventListener('resize', buildAndAnimate)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', buildAndAnimate)
    }
  }, [steps])

  return (
    <section ref={sectionRef} className="py-28 bg-[#F8F9FF] relative overflow-hidden">
      {/* Subtle dot texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, #313ADF18 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="badge-chip">{t('badge')}</span>
          <h2 className="mt-5 text-3xl md:text-4xl font-bold text-[#040741] leading-tight">
            {t('title')}{' '}
            <span className="gradient-text">{t('titleAccent')}</span>
          </h2>
        </motion.div>

        {/* Timeline wrapper — relative container for SVG overlay */}
        <div ref={wrapRef} className="relative">

          {/* SVG path — desktop only */}
          <svg
            ref={svgRef}
            aria-hidden="true"
            className="absolute inset-0 hidden md:block pointer-events-none"
            style={{ overflow: 'visible', zIndex: 0 }}
          >
            <defs>
              <linearGradient id="tlGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#313ADF" />
                <stop offset="50%" stopColor="#6B77E8" />
                <stop offset="100%" stopColor="#B4B8F8" />
              </linearGradient>
              <filter id="tlGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Glow shadow path */}
            <path
              ref={glowPathRef}
              stroke="rgba(49,58,223,0.15)"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
            />

            {/* Main animated path */}
            <path
              ref={pathRef}
              stroke="url(#tlGrad)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              filter="url(#tlGlow)"
            />

            {/* Glowing tip */}
            <circle
              ref={tipRef}
              r="5"
              fill="#313ADF"
              opacity="0"
              filter="url(#tlGlow)"
            />
          </svg>

          {/* Steps */}
          <div className="flex flex-col gap-14 md:gap-20 relative z-10">
            {steps.map((step, i) => {
              const isRight = i % 2 !== 0
              return (
                <StepRow
                  key={i}
                  step={step}
                  index={i}
                  isRight={isRight}
                  icon={stepIcons[i]}
                  dotRef={(el) => { dotRefs.current[i] = el }}
                />
              )
            })}
          </div>
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 flex items-center justify-center gap-4"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#313ADF]/30" />
          <span className="text-sm text-[#9CA3AF] font-medium">Simple. Rapide. Tout en un.</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#313ADF]/30" />
        </motion.div>
      </div>
    </section>
  )
}

function StepRow({
  step,
  index,
  isRight,
  icon,
  dotRef,
}: {
  step: { num: string; title: string; desc: string; tag: string }
  index: number
  isRight: boolean
  icon: React.ReactNode
  dotRef: (el: HTMLDivElement | null) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="flex items-center relative">
      {/* Left side — content or spacer */}
      <div className={`flex-1 ${isRight ? 'hidden md:block' : ''}`}>
        {!isRight && (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mr-8 md:mr-16"
          >
            <Card step={step} icon={icon} />
          </motion.div>
        )}
      </div>

      {/* Center dot */}
      <div className="flex-shrink-0 relative z-10">
        <motion.div
          ref={dotRef}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="w-12 h-12 rounded-full bg-white border-2 border-[#313ADF]/30 flex items-center justify-center shadow-lg shadow-[#313ADF]/10 relative"
        >
          {/* Pulse ring */}
          <motion.div
            animate={{ scale: [1, 1.7], opacity: [0.3, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: index * 0.5 }}
            className="absolute inset-0 rounded-full bg-[#313ADF]/15"
          />
          <span className="text-xs font-bold font-mono text-[#313ADF] relative z-10">{step.num}</span>
        </motion.div>
      </div>

      {/* Right side — content or spacer */}
      <div className={`flex-1 ${!isRight ? 'hidden md:block' : ''}`}>
        {isRight && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="ml-8 md:ml-16"
          >
            <Card step={step} icon={icon} />
          </motion.div>
        )}
        {/* Mobile: always show card below dot */}
        {!isRight && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="ml-6 md:hidden"
          >
            <Card step={step} icon={icon} />
          </motion.div>
        )}
      </div>
    </div>
  )
}

function Card({ step, icon }: { step: { num: string; title: string; desc: string; tag: string }; icon: React.ReactNode }) {
  return (
    <div className="group relative rounded-2xl border border-[#E8EAFF] bg-white p-6 shadow-sm hover:shadow-lg hover:shadow-[#313ADF]/6 hover:border-[#313ADF]/20 transition-all duration-500 overflow-hidden">
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#313ADF]/3 to-[#B4B8F8]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-[#EEF0FF] flex items-center justify-center text-[#313ADF] flex-shrink-0 group-hover:bg-[#313ADF] group-hover:text-white transition-colors duration-300">
            {icon}
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#EEF0FF] text-[#313ADF] text-[10px] font-semibold">
            {step.tag}
          </span>
        </div>
        <h3 className="text-base font-bold text-[#040741] mb-1.5">{step.title}</h3>
        <p className="text-sm text-[#6B7280] leading-relaxed">{step.desc}</p>
      </div>
    </div>
  )
}
