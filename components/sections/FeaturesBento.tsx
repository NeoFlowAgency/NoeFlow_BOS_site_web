'use client'

import { useTranslations } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

// ── Micro-preview components per card ──────────────────

function NeoChatPreview() {
  const messages = [
    { role: 'user', text: 'Commandes en attente +3j ?' },
    { role: 'tool', text: 'search_orders · status: en_attente' },
    { role: 'ai', text: '3 commandes bloquées. Je programme les livraisons ?' },
    { role: 'action', text: 'create_delivery · confirmation requise' },
  ]
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(v => (v >= messages.length - 1 ? 0 : v + 1))
    }, 1800)
    return () => clearInterval(t)
  }, [messages.length])

  return (
    <div className="mt-4 space-y-2">
      {messages.slice(0, visible + 1).map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`flex items-start gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          {m.role === 'tool' || m.role === 'action' ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#313ADF]/20 border border-[#313ADF]/30 text-[10px] font-mono text-[#6B77E8]">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="3" stroke="currentColor" strokeWidth="1"/>
                <path d="M4 2v2l1.5 1" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round"/>
              </svg>
              {m.text}
            </div>
          ) : (
            <div className={`max-w-[80%] px-2.5 py-1.5 rounded-xl text-[10px] leading-relaxed ${
              m.role === 'user'
                ? 'bg-white/15 text-white rounded-br-sm'
                : 'bg-white/8 border border-white/10 text-white/80 rounded-bl-sm'
            }`}>
              {m.text}
            </div>
          )}
        </motion.div>
      ))}
      <div className="flex gap-1 mt-2">
        {messages.map((_, i) => (
          <div key={i} className={`h-0.5 flex-1 rounded-full transition-all duration-500 ${i <= visible ? 'bg-[#6B77E8]' : 'bg-white/10'}`} />
        ))}
      </div>
    </div>
  )
}

function BillingPreview() {
  const [step, setStep] = useState(0)
  const steps = [
    { label: 'Devis', color: 'bg-amber-400/80', width: 'w-6' },
    { label: 'Commande', color: 'bg-[#6B77E8]/80', width: 'w-8' },
    { label: 'Facture', color: 'bg-emerald-400/80', width: 'w-10' },
  ]
  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % 4), 1200)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="mt-4">
      <div className="flex items-center gap-1.5">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-all duration-500 ${
              step >= i
                ? `${s.color} border-transparent`
                : 'bg-white/5 border-white/10'
            }`}>
              {step > i && (
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1.5 4L3.5 6L6.5 2" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              )}
              <span className={`text-[10px] font-semibold ${step >= i ? 'text-white' : 'text-white/30'}`}>{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M3 5h4M5.5 3L7 5L5.5 7" stroke={step > i ? '#6B77E8' : 'rgba(255,255,255,0.2)'} strokeWidth="1" strokeLinecap="round"/>
              </svg>
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 space-y-1.5">
        {['PDF auto-généré', 'Email envoyé', 'Paiement tracé'].map((f, i) => (
          <div key={i} className={`flex items-center gap-2 text-[9px] transition-all duration-700 ${step >= 2 ? 'opacity-100' : 'opacity-20'}`}>
            <div className="w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
            <span className="text-white/60">{f}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function StockPreview() {
  const locations = [
    { name: 'Showroom', val: 78, color: 'bg-[#6B77E8]' },
    { name: 'Réserve', val: 42, color: 'bg-emerald-400' },
    { name: 'Dépôt B', val: 15, color: 'bg-amber-400', alert: true },
  ]
  return (
    <div className="mt-4 space-y-2.5">
      {locations.map((loc, i) => (
        <div key={i}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] text-white/50 font-medium">{loc.name}</span>
            <div className="flex items-center gap-1">
              {loc.alert && (
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M4 1L7 7H1L4 1Z" stroke="#f59e0b" strokeWidth="0.8" fill="none"/>
                  <path d="M4 3.5V5" stroke="#f59e0b" strokeWidth="0.8" strokeLinecap="round"/>
                </svg>
              )}
              <span className={`text-[9px] font-bold ${loc.alert ? 'text-amber-400' : 'text-white/70'}`}>{loc.val}</span>
            </div>
          </div>
          <div className="h-1 bg-white/8 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${loc.val}%` }}
              transition={{ duration: 1, delay: i * 0.2, ease: 'easeOut' }}
              className={`h-full rounded-full ${loc.color}`}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function DeliveryPreview() {
  const cols = [
    { label: 'Planifiées', count: 4, color: 'text-[#6B77E8]', dotColor: 'bg-[#6B77E8]' },
    { label: 'En route', count: 2, color: 'text-amber-400', dotColor: 'bg-amber-400' },
    { label: 'Livrées', count: 7, color: 'text-emerald-400', dotColor: 'bg-emerald-400' },
  ]
  return (
    <div className="mt-4 grid grid-cols-3 gap-2">
      {cols.map((col, i) => (
        <div key={i} className="rounded-lg bg-white/5 border border-white/8 p-2">
          <div className={`text-[9px] font-semibold ${col.color} mb-2`}>{col.label}</div>
          <div className="space-y-1">
            {Array.from({ length: Math.min(col.count, 3) }).map((_, j) => (
              <div key={j} className="flex items-center gap-1">
                <div className={`w-1 h-1 rounded-full flex-shrink-0 ${col.dotColor} opacity-60`} />
                <div className="h-1 rounded-full bg-white/10 flex-1" />
              </div>
            ))}
            {col.count > 3 && <div className="text-[8px] text-white/30">+{col.count - 3}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}

function SAVPreview() {
  const tickets = [
    { id: '#042', label: 'Retour matelas', status: 'Ouvert', dot: 'bg-amber-400' },
    { id: '#039', label: 'Cadre abîmé', status: 'Avoir émis', dot: 'bg-emerald-400' },
    { id: '#037', label: 'Livraison incomplète', status: 'Résolu', dot: 'bg-white/30' },
  ]
  return (
    <div className="mt-4 space-y-2">
      {tickets.map((t, i) => (
        <div key={i} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/8">
          <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${t.dot}`} />
          <span className="text-[9px] text-white/50 font-mono">{t.id}</span>
          <span className="text-[9px] text-white/70 flex-1 truncate">{t.label}</span>
          <span className={`text-[8px] font-semibold ${t.status === 'Ouvert' ? 'text-amber-400' : t.status === 'Avoir émis' ? 'text-emerald-400' : 'text-white/30'}`}>
            {t.status}
          </span>
        </div>
      ))}
    </div>
  )
}

function WorkspacePreview() {
  const roles = [
    { role: 'Propriétaire', access: 'Tout', color: 'from-[#313ADF] to-[#6B77E8]' },
    { role: 'Manager', access: 'Gestion', color: 'from-[#6B77E8] to-[#B4B8F8]' },
    { role: 'Vendeur', access: 'Vente', color: 'from-[#B4B8F8] to-[#E8EAFF]/50' },
    { role: 'Livreur', access: 'Livraisons', color: 'from-white/20 to-white/10' },
  ]
  return (
    <div className="mt-4 space-y-1.5">
      {roles.map((r, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={`h-1.5 rounded-full bg-gradient-to-r ${r.color}`} style={{ width: `${100 - i * 18}%` }} />
          <span className="text-[9px] text-white/40 whitespace-nowrap">{r.role}</span>
        </div>
      ))}
    </div>
  )
}

// ── Card accent colors ──────────────────────────────────

const cardAccents = [
  { border: 'border-[#313ADF]/40', glow: 'rgba(49,58,223,0.15)', tag: 'text-[#6B77E8]', tagBg: 'bg-[#313ADF]/20 border-[#313ADF]/30' },
  { border: 'border-amber-400/30', glow: 'rgba(251,191,36,0.08)', tag: 'text-amber-400', tagBg: 'bg-amber-400/10 border-amber-400/20' },
  { border: 'border-emerald-400/30', glow: 'rgba(52,211,153,0.08)', tag: 'text-emerald-400', tagBg: 'bg-emerald-400/10 border-emerald-400/20' },
  { border: 'border-sky-400/30', glow: 'rgba(56,189,248,0.08)', tag: 'text-sky-400', tagBg: 'bg-sky-400/10 border-sky-400/20' },
  { border: 'border-rose-400/30', glow: 'rgba(251,113,133,0.08)', tag: 'text-rose-400', tagBg: 'bg-rose-400/10 border-rose-400/20' },
  { border: 'border-violet-400/30', glow: 'rgba(167,139,250,0.08)', tag: 'text-violet-400', tagBg: 'bg-violet-400/10 border-violet-400/20' },
]

const previews = [NeoChatPreview, BillingPreview, StockPreview, DeliveryPreview, SAVPreview, WorkspacePreview]

const bentoClasses = [
  'md:col-span-2 md:row-span-2',
  'md:col-span-1',
  'md:col-span-1',
  'md:col-span-2',
  'md:col-span-1',
  'md:col-span-1',
]

function FeatureCard({ item, index }: { item: { title: string; desc: string; tag: string }; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const accent = cardAccents[index]
  const Preview = previews[index]
  const isHero = index === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative rounded-2xl border bg-white/[0.04] p-6 overflow-hidden cursor-default
        ${bentoClasses[index]}
        ${isHero ? 'border-[#313ADF]/40' : accent.border}
      `}
      style={{
        boxShadow: inView ? `0 0 0 0px transparent` : undefined,
      }}
      whileHover={{
        backgroundColor: 'rgba(255,255,255,0.07)',
        transition: { duration: 0.2 },
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{ background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${accent.glow}, transparent)` }}
      />

      {/* Card number top-right */}
      <div className="absolute top-4 right-5 font-mono text-[11px] font-bold text-white/8 select-none">
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Tag */}
      <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold border mb-4 ${accent.tagBg} ${accent.tag}`}>
        {item.tag}
      </div>

      <h3 className="text-base font-bold text-white leading-snug mb-2">{item.title}</h3>
      <p className="text-[13px] text-white/50 leading-relaxed">{item.desc}</p>

      {/* Mini preview */}
      <Preview />

      {/* Bottom accent line */}
      <div className={`absolute bottom-0 left-0 right-0 h-px opacity-40 group-hover:opacity-80 transition-opacity duration-300`}
        style={{ background: `linear-gradient(90deg, transparent, ${accent.glow.replace('0.15', '0.8').replace('0.08', '0.5')}, transparent)` }}
      />
    </motion.div>
  )
}

export default function FeaturesBento() {
  const t = useTranslations('features')
  const items = t.raw('items') as Array<{ title: string; desc: string; tag: string }>

  return (
    <section id="fonctionnalites" className="py-28 bg-[#040741] relative overflow-hidden">
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Ambient glow blobs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#313ADF]/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#6B77E8]/6 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-white/8 text-white/60 border border-white/10 mb-5">
            {t('badge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            {t('title')}{' '}
            <span className="gradient-text-light">{t('titleAccent')}</span>
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 auto-rows-fr">
          {items.map((item, i) => (
            <FeatureCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
