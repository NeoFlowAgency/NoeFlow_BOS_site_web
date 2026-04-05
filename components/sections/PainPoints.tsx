'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

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

export default function PainPoints() {
  const t = useTranslations('pain')
  const items = t.raw('items') as Array<{ title: string; desc: string }>

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#040741] leading-tight">
            {t('title')}
          </h2>
          <p className="mt-4 text-[#6B7280] text-lg leading-relaxed">{t('subtitle')}</p>
        </motion.div>

        {/* Pain cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-2xl border border-[#E8EAFF] bg-[#F8F9FF] p-8 overflow-hidden hover:border-[#313ADF]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#313ADF]/5"
            >
              {/* Subtle gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#313ADF]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-[#FFE4E4] flex items-center justify-center text-[#DC2626] mb-6">
                  {icons[i]}
                </div>
                <h3 className="text-lg font-bold text-[#040741] mb-3">{item.title}</h3>
                <p className="text-[#6B7280] leading-relaxed text-sm">{item.desc}</p>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#E8EAFF] to-transparent rounded-bl-3xl opacity-50" />
            </motion.div>
          ))}
        </div>

        {/* Transition text */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-[#313ADF] font-semibold text-lg">
            {`→ `}
            <span className="text-[#040741]">
              {/* locale-aware */}
              NeoFlow BOS change tout.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
