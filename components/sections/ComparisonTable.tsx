'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

const Check = () => (
  <div className="mx-auto w-6 h-6 rounded-full bg-[#EEF0FF] flex items-center justify-center">
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 6L5 9L10 3" stroke="#313ADF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
)

const Cross = () => (
  <div className="mx-auto w-6 h-6 rounded-full bg-[#FFF1F2] flex items-center justify-center">
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M2 2L8 8M8 2L2 8" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  </div>
)

export default function ComparisonTable() {
  const t = useTranslations('comparison')
  const rows = t.raw('rows') as Array<{ feature: string; neoflow: boolean; skara: boolean; generic: boolean }>
  const headers = t.raw('headers') as string[]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
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

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="overflow-hidden rounded-2xl border border-[#E8EAFF] shadow-lg shadow-[#040741]/5"
        >
          {/* Header row */}
          <div className="grid grid-cols-4 bg-[#040741]">
            {headers.map((h, i) => (
              <div
                key={i}
                className={`px-5 py-4 text-sm font-bold text-center ${
                  i === 0 ? 'text-left text-white/60' : i === 1 ? 'text-white' : 'text-white/50'
                }`}
              >
                {i === 1 && (
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-5 h-5 rounded bg-[#313ADF] flex items-center justify-center mb-0.5">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 8L5 2.5L8 8" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
                        <path d="M3.5 6H6.5" stroke="white" strokeWidth="1" strokeLinecap="round"/>
                      </svg>
                    </div>
                    {h}
                  </div>
                )}
                {i !== 1 && h}
              </div>
            ))}
          </div>

          {/* Data rows */}
          {rows.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-4 border-t border-[#E8EAFF] ${i % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FF]'} hover:bg-[#F0F1FE]/40 transition-colors duration-150`}
            >
              <div className="px-5 py-4 text-sm font-medium text-[#040741]">{row.feature}</div>
              <div className="px-5 py-4 flex items-center justify-center">
                {row.neoflow ? <Check /> : <Cross />}
              </div>
              <div className="px-5 py-4 flex items-center justify-center">
                {row.skara ? <Check /> : <Cross />}
              </div>
              <div className="px-5 py-4 flex items-center justify-center">
                {row.generic ? <Check /> : <Cross />}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
