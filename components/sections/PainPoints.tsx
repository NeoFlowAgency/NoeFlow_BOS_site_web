'use client'

import { useTranslations } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const icons = [
  // Clock / outdated
  <svg key="1" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 7V12L15 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M3 3L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
  // Brain / no AI
  <svg key="2" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M9 3C7.34 3 6 4.34 6 6V7C4.34 7 3 8.34 3 10C3 11.66 4.34 13 6 13V14C6 15.66 7.34 17 9 17H15C16.66 17 18 15.66 18 14V13C19.66 13 21 11.66 21 10C21 8.34 19.66 7 18 7V6C18 4.34 16.66 3 15 3H9Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M9 10H9.01M12 10H12.01M15 10H15.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M9 17V21M15 17V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
  // Puzzle / fragmented tools
  <svg key="3" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M4 8H8V4M8 4H12V8M8 4V8M12 8V12H8M8 12H4V8M8 12V16H12M12 16H16V12M12 16V20H16V16M16 12H20V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
]

const painNumbers = ['01', '02', '03']

export default function PainPoints() {
  const t = useTranslations('pain')
  const items = t.raw('items') as Array<{ title: string; desc: string }>
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section className="py-28 bg-white relative overflow-hidden">
      {/* Large decorative number */}
      <div className="absolute -right-8 top-10 text-[200px] font-black text-[#F8F9FF] select-none pointer-events-none leading-none">
        ?
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header with clip reveal */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-20 overflow-hidden">
          <motion.h2
            initial={{ y: 60, opacity: 0 }}
            animate={headerInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-5xl font-bold text-[#040741] leading-tight"
          >
            {t('title')}
          </motion.h2>
          <motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={headerInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-[#6B7280] text-lg leading-relaxed"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* Pain cards — upgraded with number accent + stronger effects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 48, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-2xl border border-[#E8EAFF] bg-[#F8F9FF] p-8 overflow-hidden hover:border-red-200 transition-all duration-500 hover:shadow-xl hover:shadow-red-500/5"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-50/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              {/* Big background number */}
              <div className="absolute top-4 right-5 text-7xl font-black text-[#E8EAFF] select-none pointer-events-none leading-none group-hover:text-red-100/80 transition-colors duration-500">
                {painNumbers[i]}
              </div>

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-[#FFE4E4] flex items-center justify-center text-[#DC2626] mb-6 group-hover:scale-110 transition-transform duration-300">
                  {icons[i]}
                </div>
                <h3 className="text-lg font-bold text-[#040741] mb-3">{item.title}</h3>
                <p className="text-[#6B7280] leading-relaxed text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Transition line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 flex items-center gap-4"
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#E8EAFF] to-[#313ADF]/30" />
          <span className="text-sm font-semibold text-[#313ADF] whitespace-nowrap">NeoFlow BOS change tout.</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#E8EAFF] to-[#313ADF]/30" />
        </motion.div>
      </div>
    </section>
  )
}
