'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MagneticButton from '@/components/ui/MagneticButton'

const inputClass = "w-full px-4 py-3 rounded-xl border border-[#E8EAFF] bg-[#F8F9FF] text-[#040741] text-sm placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#313ADF] focus:bg-white focus:ring-2 focus:ring-[#313ADF]/8 transition-all duration-200"

export default function EnterprisePage() {
  const t = useTranslations('enterprise')
  const locale = useLocale()
  const features = t.raw('features') as Array<{ title: string; desc: string; num: string }>
  const f = t.raw('form') as Record<string, string>

  const [form, setForm] = useState({ company: '', name: '', email: '', phone: '', stores: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const formRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/enterprise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm({ company: '', name: '', email: '', phone: '', stores: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 overflow-hidden">

        {/* ── Hero ─────────────────────────────────────── */}
        <section className="relative bg-[#040741] overflow-hidden py-24 md:py-32">
          {/* Blobs */}
          <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full bg-[#313ADF]/18 blur-[100px] pointer-events-none blob-1" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#6B77E8]/12 blur-[80px] pointer-events-none blob-3" />

          {/* Grid */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

          <div ref={heroRef} className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-white/70 border border-white/10 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6B77E8] animate-pulse" />
                {t('badge')}
              </span>

              <h1 className="text-4xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                {t('title')}{' '}
                <span className="gradient-text-light">{t('titleAccent')}</span>
              </h1>

              <p className="mt-6 text-lg text-white/55 max-w-2xl mx-auto leading-relaxed">
                {t('desc')}
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <MagneticButton
                  onClick={scrollToForm}
                  className="group relative flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-white text-[#040741] font-bold text-sm overflow-hidden"
                  style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.25)' }}
                >
                  <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-[#313ADF]/10 to-transparent skew-x-12 pointer-events-none" />
                  {f.submit}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7H11.5M8 3.5L11.5 7L8 10.5" stroke="#313ADF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </MagneticButton>

                <a
                  href={`/${locale}/contact`}
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl text-white/70 font-semibold text-sm border border-white/15 hover:border-white/30 hover:text-white transition-all duration-200"
                >
                  {locale === 'fr' ? 'Nous contacter' : 'Contact us'}
                </a>
              </div>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto"
            >
              {[
                { val: '4', label: locale === 'fr' ? 'Rôles' : 'Roles' },
                { val: '∞', label: locale === 'fr' ? 'Membres' : 'Members' },
                { val: '7j', label: locale === 'fr' ? 'Essai gratuit' : 'Free trial' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold text-white">{s.val}</div>
                  <div className="text-xs text-white/40 mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Features ─────────────────────────────────── */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#040741] leading-tight">
                {locale === 'fr' ? 'Ce que vous obtenez' : 'What you get'}
                {' '}<span className="gradient-text">{locale === 'fr' ? 'en Enterprise.' : 'in Enterprise.'}</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 28, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative rounded-2xl border border-[#E8EAFF] bg-[#F8F9FF] p-6 overflow-hidden hover:border-[#313ADF]/25 hover:shadow-lg hover:shadow-[#313ADF]/5 transition-all duration-400"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#313ADF]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-[#B4B8F8]">{feat.num}</span>
                      <div className="w-7 h-7 rounded-lg bg-[#EEF0FF] flex items-center justify-center group-hover:bg-[#313ADF] transition-colors duration-300">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-[#313ADF] group-hover:text-white transition-colors duration-300" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-sm font-bold text-[#040741] mb-2 leading-snug">{feat.title}</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">{feat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Form ─────────────────────────────────────── */}
        <section className="py-24 bg-[#F8F9FF] relative overflow-hidden">
          {/* Soft blob */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[#313ADF]/5 blur-[100px] pointer-events-none" />

          <div ref={formRef} className="max-w-2xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#040741] leading-tight">
                {locale === 'fr' ? 'Demander une' : 'Request a'}{' '}
                <span className="gradient-text">{locale === 'fr' ? 'démonstration.' : 'demo.'}</span>
              </h2>
              <p className="mt-4 text-[#6B7280]">
                {locale === 'fr'
                  ? 'On vous répond sous 24 à 48h avec une démo adaptée à votre structure.'
                  : "We'll get back to you within 24–48h with a demo tailored to your setup."}
              </p>
            </motion.div>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl border border-emerald-200 bg-emerald-50 p-10 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#040741] mb-2">{f.success}</h3>
                <p className="text-sm text-[#6B7280]">
                  {locale === 'fr'
                    ? 'Un email de confirmation vous a été envoyé.'
                    : 'A confirmation email has been sent to you.'}
                </p>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl border border-[#E8EAFF] p-8 shadow-xl shadow-[#040741]/5 space-y-5"
              >
                {/* Company + Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#040741] mb-1.5 uppercase tracking-wide">{f.company} *</label>
                    <input type="text" required placeholder={locale === 'fr' ? 'Ex: Groupe Literie Sud' : 'E.g. Furniture Group Ltd'}
                      value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#040741] mb-1.5 uppercase tracking-wide">{f.name} *</label>
                    <input type="text" required placeholder={locale === 'fr' ? 'Jean Dupont' : 'John Smith'}
                      value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className={inputClass} />
                  </div>
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#040741] mb-1.5 uppercase tracking-wide">{f.email} *</label>
                    <input type="email" required placeholder="jean@societe.fr"
                      value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#040741] mb-1.5 uppercase tracking-wide">{f.phone}</label>
                    <input type="tel" placeholder="+33 6 12 34 56 78"
                      value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} className={inputClass} />
                  </div>
                </div>

                {/* Nb stores */}
                <div>
                  <label className="block text-xs font-semibold text-[#040741] mb-1.5 uppercase tracking-wide">{f.stores}</label>
                  <input type="number" min="1" placeholder="2"
                    value={form.stores} onChange={e => setForm(p => ({ ...p, stores: e.target.value }))} className={inputClass} />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-[#040741] mb-1.5 uppercase tracking-wide">{f.message}</label>
                  <textarea rows={4} placeholder={locale === 'fr' ? 'Décrivez votre situation, vos besoins...' : 'Describe your situation, your needs...'}
                    value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    className={`${inputClass} resize-none`} />
                </div>

                {status === 'error' && (
                  <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">{f.error}</div>
                )}

                <MagneticButton
                  onClick={() => {}}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#313ADF] to-[#040741] text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                  style={{ boxShadow: '0 8px 24px rgba(49,58,223,0.25)' }}
                >
                  {status === 'sending' ? (
                    <>
                      <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="5" stroke="white" strokeWidth="1.5" strokeDasharray="20" strokeDashoffset="10" />
                      </svg>
                      {f.sending}
                    </>
                  ) : (
                    <>
                      {f.submit}
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 7H11.5M8 3.5L11.5 7L8 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </MagneticButton>

                <p className="text-[11px] text-center text-[#9CA3AF]">
                  {locale === 'fr' ? 'Réponse garantie sous 24 à 48h · Sans engagement.' : 'Response guaranteed within 24–48h · No commitment.'}
                </p>
              </motion.form>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
