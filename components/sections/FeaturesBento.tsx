'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

const featureIcons = [
  // Invoice
  <svg key="1" width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M6 2H16C17.1 2 18 2.9 18 4V20L15 18L12 20L9 18L6 20V4C6 2.9 6.9 2 8 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 8H14M10 12H14M10 16H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
  // Stock box
  <svg key="2" width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M21 16V8C21 7.45 20.72 6.93 20.27 6.64L12.27 2.14C11.79 1.85 11.21 1.85 10.73 2.14L2.73 6.64C2.28 6.93 2 7.45 2 8V16C2 16.55 2.28 17.07 2.73 17.36L10.73 21.86C11.21 22.15 11.79 22.15 12.27 21.86L20.27 17.36C20.72 17.07 21 16.55 21 16Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2.27 6.96L11.5 12.01L20.73 6.96M11.5 22V12" stroke="currentColor" strokeWidth="1.5"/>
  </svg>,
  // GPS / truck
  <svg key="3" width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M3 7H14V16H3V7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 9L18 7L21 10V16H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="7" cy="18" r="2" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="17" cy="18" r="2" stroke="currentColor" strokeWidth="1.5"/>
  </svg>,
  // Support / ticket
  <svg key="4" width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M9 11C9 9.34 10.34 8 12 8H16C17.66 8 19 9.34 19 11V15C19 16.66 17.66 18 16 18H12L8 21V18C6.34 18 5 16.66 5 15V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="6" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M6 5V7L7.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
  // AI / brain
  <svg key="5" width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M11 2C8.24 2 6 4.24 6 7V8C4.34 8 3 9.34 3 11C3 12.66 4.34 14 6 14V15C6 17.76 8.24 20 11 20C13.76 20 16 17.76 16 15V14C17.66 14 19 12.66 19 11C19 9.34 17.66 8 16 8V7C16 4.24 13.76 2 11 2Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8.5 11H8.51M11 11H11.01M13.5 11H13.51" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>,
  // Multi-store / network
  <svg key="6" width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="5" r="3" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="4" cy="18" r="3" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="18" cy="18" r="3" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M11 8V14M11 14L4 17M11 14L18 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
]

const featureColors = [
  { bg: 'bg-[#EEF0FF]', text: 'text-[#313ADF]', glow: 'from-[#313ADF]/5' },
  { bg: 'bg-[#F0FDF4]', text: 'text-green-600', glow: 'from-green-500/5' },
  { bg: 'bg-[#FFF7ED]', text: 'text-orange-500', glow: 'from-orange-500/5' },
  { bg: 'bg-[#FFF1F2]', text: 'text-red-500', glow: 'from-red-500/5' },
  { bg: 'bg-gradient-to-br from-[#313ADF] to-[#040741]', text: 'text-white', glow: 'from-[#313ADF]/10', isSpecial: true },
  { bg: 'bg-[#F8F9FF]', text: 'text-[#6B77E8]', glow: 'from-[#6B77E8]/5' },
]

// Bento layout: 2 large + 4 small in a 3-column grid
const bentoClasses = [
  'md:col-span-2 md:row-span-1', // Facturation — large
  'md:col-span-1',               // Stock
  'md:col-span-1',               // GPS — normal
  'md:col-span-1',               // SAV
  'md:col-span-2',               // NeoChat — large (special)
  'md:col-span-1',               // Multi-store
]

export default function FeaturesBento() {
  const t = useTranslations('features')
  const items = t.raw('items') as Array<{ title: string; desc: string; tag: string }>

  return (
    <section id="fonctionnalites" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <span className="badge-chip">{t('badge')}</span>
          <h2 className="mt-5 text-3xl md:text-4xl font-bold text-[#040741] leading-tight">
            {t('title')}{' '}
            <span className="gradient-text">{t('titleAccent')}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr">
          {items.map((item, i) => {
            const color = featureColors[i]
            const isSpecial = color.isSpecial

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className={`bento-card relative rounded-2xl border p-7 overflow-hidden cursor-default ${bentoClasses[i]} ${
                  isSpecial
                    ? 'bg-gradient-to-br from-[#313ADF] to-[#040741] border-transparent'
                    : 'bg-[#F8F9FF] border-[#E8EAFF]'
                }`}
              >
                {/* Hover glow layer */}
                <div className={`absolute inset-0 bg-gradient-to-br ${color.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />

                {/* Icon */}
                <div className={`relative z-10 w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${
                  isSpecial ? 'bg-white/15' : color.bg
                } ${color.text}`}>
                  {featureIcons[i]}
                </div>

                {/* Tag */}
                <div className={`relative z-10 inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold mb-3 ${
                  isSpecial
                    ? 'bg-white/15 text-white/80'
                    : 'bg-white text-[#6B7280] border border-[#E8EAFF]'
                }`}>
                  {item.tag}
                </div>

                <h3 className={`relative z-10 text-lg font-bold mb-2 ${isSpecial ? 'text-white' : 'text-[#040741]'}`}>
                  {item.title}
                </h3>
                <p className={`relative z-10 text-sm leading-relaxed ${isSpecial ? 'text-white/70' : 'text-[#6B7280]'}`}>
                  {item.desc}
                </p>

                {/* Special card: animated dots */}
                {isSpecial && (
                  <div className="absolute bottom-5 right-5 flex gap-1.5">
                    {[0, 1, 2].map((j) => (
                      <motion.div
                        key={j}
                        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                        transition={{ duration: 1.5, delay: j * 0.3, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full bg-white/40"
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
