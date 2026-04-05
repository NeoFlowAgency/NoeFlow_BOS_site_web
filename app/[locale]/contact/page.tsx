'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function ContactPage() {
  const t = useTranslations('contact')
  const f = useTranslations('contact.form')

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#040741] leading-tight">
              {t('title')}{' '}
              <span className="gradient-text">{t('titleAccent')}</span>
            </h1>
            <p className="mt-4 text-[#6B7280] text-lg leading-relaxed">{t('desc')}</p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="mt-10 space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-[#040741] mb-2">{f('name')}</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8EAFF] bg-[#F8F9FF] text-[#040741] text-sm placeholder-[#9CA3AF] focus:outline-none focus:border-[#313ADF] focus:ring-2 focus:ring-[#313ADF]/10 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#040741] mb-2">{f('email')}</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8EAFF] bg-[#F8F9FF] text-[#040741] text-sm placeholder-[#9CA3AF] focus:outline-none focus:border-[#313ADF] focus:ring-2 focus:ring-[#313ADF]/10 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#040741] mb-2">{f('subject')}</label>
              <input
                type="text"
                value={form.subject}
                onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-[#E8EAFF] bg-[#F8F9FF] text-[#040741] text-sm placeholder-[#9CA3AF] focus:outline-none focus:border-[#313ADF] focus:ring-2 focus:ring-[#313ADF]/10 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#040741] mb-2">{f('message')}</label>
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-[#E8EAFF] bg-[#F8F9FF] text-[#040741] text-sm placeholder-[#9CA3AF] focus:outline-none focus:border-[#313ADF] focus:ring-2 focus:ring-[#313ADF]/10 transition-all resize-none"
              />
            </div>

            {status === 'success' && (
              <div className="px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium">{f('success')}</div>
            )}
            {status === 'error' && (
              <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">{f('error')}</div>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-3.5 rounded-xl bg-[#313ADF] text-white font-bold text-sm hover:bg-[#2530C8] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-[#313ADF]/20"
            >
              {status === 'sending' ? f('sending') : f('submit')}
            </button>
          </motion.form>
        </div>
      </main>
      <Footer />
    </>
  )
}
