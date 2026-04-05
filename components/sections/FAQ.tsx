'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'

export default function FAQ() {
  const t = useTranslations('faq')
  const items = t.raw('items') as Array<{ q: string; a: string }>
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
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

        <div className="space-y-3">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`rounded-2xl border overflow-hidden transition-all duration-200 ${
                open === i ? 'border-[#313ADF]/30 shadow-md shadow-[#313ADF]/5' : 'border-[#E8EAFF]'
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[#F8F9FF] transition-colors duration-200"
              >
                <span className="text-sm font-semibold text-[#040741] pr-4">{item.q}</span>
                <motion.div
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F0F1FE] flex items-center justify-center"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 2V10M2 6H10" stroke="#313ADF" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-6 pb-5 text-sm text-[#6B7280] leading-relaxed border-t border-[#E8EAFF]">
                      <div className="pt-4">{item.a}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
