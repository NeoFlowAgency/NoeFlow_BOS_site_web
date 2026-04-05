'use client'

import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function FinalCTA() {
  const t = useTranslations('finalCta')
  const locale = useLocale()
  const signupUrl = process.env.NEXT_PUBLIC_BOS_SIGNUP_URL || 'https://bos.neoflow-agency.cloud/signup'

  return (
    <section className="py-24 bg-[#040741] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="blob-1 absolute -top-32 left-1/3 w-[500px] h-[500px] rounded-full bg-[#313ADF]/20 blur-[100px]" />
        <div className="blob-3 absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#6B77E8]/15 blur-[80px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(to right, white 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating orbs */}
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 left-16 w-3 h-3 rounded-full bg-[#6B77E8] blur-sm pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 15, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-24 right-20 w-2 h-2 rounded-full bg-[#B4B8F8] blur-sm pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, -12, 0], x: [0, 8, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/2 right-32 w-4 h-4 rounded-full bg-[#313ADF]/40 blur-md pointer-events-none"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-white/70 border border-white/10 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6B77E8] animate-pulse" />
            {t('badge')}
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
            {t('title')}{' '}
            <br className="hidden md:block" />
            <span className="gradient-text-light">{t('titleAccent')}</span>
          </h2>

          <p className="mt-6 text-lg text-white/60 max-w-xl mx-auto leading-relaxed">{t('desc')}</p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={signupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-white text-[#040741] font-bold text-base hover:bg-white/95 transition-all duration-200 shadow-2xl shadow-black/20"
            >
              {t('cta')}
              <span className="w-5 h-5 rounded-full bg-[#040741]/10 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5H8M6 3L8 5L6 7" stroke="#040741" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>

            <Link
              href={`/${locale}/contact`}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl text-white/80 font-semibold text-base border border-white/15 hover:border-white/30 hover:text-white transition-all duration-200"
            >
              {t('ctaSecondary')}
            </Link>
          </div>

          <p className="mt-5 text-xs text-white/30">{t('mention')}</p>
        </motion.div>
      </div>
    </section>
  )
}
