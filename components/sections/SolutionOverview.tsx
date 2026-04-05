'use client'

import { useTranslations } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

function AnimatedCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [displayed, setDisplayed] = useState('0')

  useEffect(() => {
    if (!inView) return
    // Extract numeric part
    const numMatch = value.match(/[\d,]+/)
    if (!numMatch) { setDisplayed(value); return }
    const target = parseInt(numMatch[0].replace(',', ''))
    const suffix = value.replace(/[\d,]+/, '')
    let start = 0
    const step = Math.max(1, Math.floor(target / 30))
    const interval = setInterval(() => {
      start = Math.min(start + step, target)
      setDisplayed(start + suffix)
      if (start >= target) clearInterval(interval)
    }, 40)
    return () => clearInterval(interval)
  }, [inView, value])

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-bold gradient-text">{displayed}</div>
      <div className="mt-1 text-sm text-[#6B7280]">{label}</div>
    </div>
  )
}

export default function SolutionOverview() {
  const t = useTranslations('solution')
  const stats = t.raw('stats') as Array<{ value: string; label: string }>

  return (
    <section className="py-24 bg-[#F8F9FF]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="badge-chip">{t('badge')}</span>
            <h2 className="mt-5 text-3xl md:text-4xl font-bold text-[#040741] leading-tight">
              {t('title')}{' '}
              <span className="gradient-text">{t('titleAccent')}</span>
            </h2>
            <p className="mt-5 text-[#6B7280] text-lg leading-relaxed">{t('desc')}</p>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 gap-6">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <AnimatedCounter value={s.value} label={s.label} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: mockup */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#313ADF]/10 to-[#B4B8F8]/10 rounded-3xl blur-3xl" />

            {/* Mock UI panel */}
            <div className="relative rounded-2xl border border-[#E8EAFF] bg-white shadow-xl shadow-[#040741]/8 overflow-hidden">
              {/* Top bar */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#E8EAFF] bg-[#F8F9FF]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#313ADF]" />
                  <span className="text-xs font-semibold text-[#040741]">NeoFlow BOS</span>
                </div>
                <div className="flex gap-4 text-xs text-[#9CA3AF]">
                  <span>Dashboard</span>
                  <span className="text-[#313ADF] font-semibold">Facturation</span>
                  <span>Stock</span>
                </div>
              </div>

              {/* Placeholder screenshot area */}
              <div className="aspect-[4/3] bg-gradient-to-br from-[#F8F9FF] to-[#EEF0FF] flex flex-col items-center justify-center gap-4 p-8">
                {/* Simulated KPI cards */}
                <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
                  {[
                    { label: 'CA du mois', val: '24 380 €', up: true },
                    { label: 'Commandes', val: '142', up: true },
                    { label: 'Stock alerte', val: '3', up: false },
                  ].map((kpi, i) => (
                    <div key={i} className="rounded-xl bg-white border border-[#E8EAFF] p-3 text-center shadow-sm">
                      <div className="text-xs text-[#9CA3AF] mb-1">{kpi.label}</div>
                      <div className="text-sm font-bold text-[#040741]">{kpi.val}</div>
                      <div className={`text-[10px] mt-0.5 ${kpi.up ? 'text-green-500' : 'text-red-400'}`}>
                        {kpi.up ? '↑ +12%' : '↓ alerte'}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Simulated list item */}
                <div className="w-full max-w-sm space-y-2">
                  {['Facture FA-2025-0141 — M. Dupont', 'Commande CMD-0289 — Livraison demain', 'Ticket SAV #042 — Retour matelas'].map((row, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-lg bg-white border border-[#E8EAFF] px-3 py-2">
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${i === 0 ? 'bg-green-400' : i === 1 ? 'bg-[#313ADF]' : 'bg-orange-400'}`} />
                      <span className="text-[11px] text-[#6B7280] truncate">{row}</span>
                    </div>
                  ))}
                </div>

                <p className="text-[10px] text-[#C4C9FF] italic mt-2">Aperçu simulé — screenshot réel à venir</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
