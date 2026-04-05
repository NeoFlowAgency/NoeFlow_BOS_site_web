'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function EnterprisePage() {
  const t = useTranslations('enterprise')
  const features = t.raw('features') as Array<{ title: string; desc: string }>
  const f = t.raw('form') as Record<string, string>

  const [form, setForm] = useState({ company: '', name: '', email: '', phone: '', stores: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

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

  const featureIcons = ['🏪', '📊', '👥', '✨', '🛡️', '🎓']

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">
        {/* Hero Enterprise */}
        <section className="py-20 bg-[#040741] relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="blob-1 absolute -top-20 left-1/3 w-96 h-96 rounded-full bg-[#313ADF]/20 blur-[80px]" />
            <div className="blob-3 absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[#6B77E8]/15 blur-[60px]" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-white/70 border border-white/10 mb-6">
                {t('badge')}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                {t('title')}{' '}
                <span className="gradient-text-light">{t('titleAccent')}</span>
              </h1>
              <p className="mt-5 text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">{t('desc')}</p>
            </motion.div>
          </div>
        </section>

        {/* Features Enterprise */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bento-card rounded-2xl border border-[#E8EAFF] bg-[#F8F9FF] p-6"
                >
                  <div className="text-2xl mb-4">{featureIcons[i]}</div>
                  <h3 className="text-base font-bold text-[#040741] mb-2">{feat.title}</h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">{feat.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact form */}
        <section className="py-20 bg-[#F8F9FF]">
          <div className="max-w-2xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl font-bold text-[#040741]">{f.title}</h2>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl border border-[#E8EAFF] p-8 shadow-lg shadow-[#040741]/5 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { key: 'company', label: f.company, type: 'text', required: true },
                  { key: 'name', label: f.name, type: 'text', required: true },
                  { key: 'email', label: f.email, type: 'email', required: true },
                  { key: 'phone', label: f.phone, type: 'tel', required: false },
                  { key: 'stores', label: f.stores, type: 'number', required: false },
                ].map(field => (
                  <div key={field.key} className={field.key === 'company' || field.key === 'email' ? 'sm:col-span-2' : ''}>
                    <label className="block text-sm font-semibold text-[#040741] mb-2">{field.label}</label>
                    <input
                      type={field.type}
                      required={field.required}
                      value={form[field.key as keyof typeof form]}
                      onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8EAFF] bg-[#F8F9FF] text-[#040741] text-sm focus:outline-none focus:border-[#313ADF] focus:ring-2 focus:ring-[#313ADF]/10 transition-all"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#040741] mb-2">{f.message}</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8EAFF] bg-[#F8F9FF] text-[#040741] text-sm focus:outline-none focus:border-[#313ADF] focus:ring-2 focus:ring-[#313ADF]/10 transition-all resize-none"
                />
              </div>

              {status === 'success' && (
                <div className="px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium">{f.success}</div>
              )}
              {status === 'error' && (
                <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">{f.error}</div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3.5 rounded-xl bg-[#313ADF] text-white font-bold text-sm hover:bg-[#2530C8] disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#313ADF]/20"
              >
                {status === 'sending' ? f.sending : f.submit}
              </button>
            </motion.form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
