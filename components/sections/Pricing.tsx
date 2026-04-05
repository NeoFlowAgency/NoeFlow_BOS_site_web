'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function Pricing() {
  const t = useTranslations('pricing')
  const locale = useLocale()
  const [annual, setAnnual] = useState(false)
  const plans = t.raw('plans') as Array<{
    name: string; monthlyPrice: number | null; annualPrice: number | null
    desc: string; cta: string; popular: boolean; features: string[]
  }>
  const toggle = t.raw('toggle') as { monthly: string; annual: string; save: string }
  const signupUrl = process.env.NEXT_PUBLIC_BOS_SIGNUP_URL || 'https://bos.neoflow-agency.cloud/signup'

  return (
    <section id="tarifs" className="py-24 bg-[#F8F9FF]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <span className="badge-chip">{t('badge')}</span>
          <h2 className="mt-5 text-3xl md:text-4xl font-bold text-[#040741] leading-tight">
            {t('title')}{' '}
            <span className="gradient-text">{t('titleAccent')}</span>
          </h2>

          {/* Toggle */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className={`text-sm font-medium ${!annual ? 'text-[#040741]' : 'text-[#9CA3AF]'}`}>{toggle.monthly}</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${annual ? 'bg-[#313ADF]' : 'bg-[#E8EAFF]'}`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${annual ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
            <span className={`text-sm font-medium ${annual ? 'text-[#040741]' : 'text-[#9CA3AF]'}`}>{toggle.annual}</span>
            {annual && (
              <span className="badge-chip text-[10px] bg-green-50 text-green-600 border-green-200">🎁 {toggle.save}</span>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`relative rounded-2xl p-7 flex flex-col ${
                plan.popular
                  ? 'bg-[#040741] text-white pricing-popular md:-mt-4 md:mb-4'
                  : 'bg-white border border-[#E8EAFF]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#313ADF] text-white shadow-lg shadow-[#313ADF]/30">
                    {locale === 'fr' ? '⭐ Populaire' : '⭐ Popular'}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-lg font-bold mb-1 ${plan.popular ? 'text-white' : 'text-[#040741]'}`}>{plan.name}</h3>
                <p className={`text-sm leading-relaxed ${plan.popular ? 'text-white/60' : 'text-[#6B7280]'}`}>{plan.desc}</p>
              </div>

              {/* Price */}
              <div className="mb-7">
                {plan.monthlyPrice !== null ? (
                  <div className="flex items-end gap-1">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={annual ? 'annual' : 'monthly'}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'gradient-text'}`}
                      >
                        {annual ? plan.annualPrice : plan.monthlyPrice}€
                      </motion.span>
                    </AnimatePresence>
                    <span className={`text-sm mb-1.5 ${plan.popular ? 'text-white/50' : 'text-[#9CA3AF]'}`}>
                      /{annual ? (locale === 'fr' ? 'an' : 'yr') : (locale === 'fr' ? 'mois' : 'mo')}
                    </span>
                  </div>
                ) : (
                  <div className={`text-3xl font-bold ${plan.popular ? 'text-white' : 'gradient-text'}`}>
                    {locale === 'fr' ? 'Sur devis' : 'Custom'}
                  </div>
                )}
              </div>

              {/* CTA */}
              {plan.name === 'Enterprise' ? (
                <Link
                  href={`/${locale}/enterprise`}
                  className={`w-full py-3 rounded-xl text-sm font-bold text-center transition-all duration-200 mb-7 block ${
                    plan.popular
                      ? 'bg-white text-[#040741] hover:bg-white/90'
                      : 'bg-[#040741] text-white hover:bg-[#040741]/90'
                  }`}
                >
                  {plan.cta}
                </Link>
              ) : (
                <a
                  href={signupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 rounded-xl text-sm font-bold text-center transition-all duration-200 mb-7 block ${
                    plan.popular
                      ? 'bg-[#313ADF] text-white hover:bg-[#2530C8] shadow-lg shadow-[#313ADF]/30'
                      : 'bg-[#040741] text-white hover:bg-[#040741]/90'
                  }`}
                >
                  {plan.cta}
                </a>
              )}

              {/* Features */}
              <ul className="space-y-3 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-[#6B77E8]' : 'text-[#313ADF]'}`} viewBox="0 0 16 16" fill="none">
                      <path d="M3 8L6.5 11.5L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className={`text-sm ${plan.popular ? 'text-white/80' : 'text-[#6B7280]'}`}>{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-xs text-[#9CA3AF] mt-8"
        >
          {locale === 'fr'
            ? 'Tous les plans incluent 7 jours d\'essai gratuit. Annulable à tout moment.'
            : 'All plans include a 7-day free trial. Cancel anytime.'}
        </motion.p>
      </div>
    </section>
  )
}
