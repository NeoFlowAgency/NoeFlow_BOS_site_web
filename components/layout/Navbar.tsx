'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'

export default function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const signupUrl = process.env.NEXT_PUBLIC_BOS_SIGNUP_URL || 'https://bos.neoflow-agency.cloud/signup'

  // Detect scroll for sticky glass effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // GSAP magnetic effect on CTA button
  useEffect(() => {
    const el = ctaRef.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      gsap.to(el, { x: x * 0.25, y: y * 0.25, duration: 0.3, ease: 'power2.out' })
    }
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.4)' })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const switchLocale = () => {
    const newLocale = locale === 'fr' ? 'en' : 'fr'
    // Replace /fr/ or /en/ at the start of the path
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  const navLinks = [
    { label: t('features'), href: `/${locale}#fonctionnalites` },
    { label: t('pricing'), href: `/${locale}#tarifs` },
    { label: t('enterprise'), href: `/${locale}/enterprise` },
    { label: t('contact'), href: `/${locale}/contact` },
  ]

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-[#E8EAFF] shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#313ADF] to-[#040741] flex items-center justify-center shadow-md group-hover:shadow-[#313ADF]/30 transition-shadow duration-300">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 12L8 4L13 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5.5 9H10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="font-bold text-[#040741] text-sm tracking-tight">
            NeoFlow <span className="text-[#313ADF]">BOS</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-[#6B7280] hover:text-[#040741] rounded-lg hover:bg-[#F8F9FF] transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: Lang toggle + CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={switchLocale}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#6B7280] hover:text-[#313ADF] hover:bg-[#F0F1FE] transition-all duration-200 border border-transparent hover:border-[#E8EAFF]"
          >
            <span className="text-base leading-none">{locale === 'fr' ? '🇬🇧' : '🇫🇷'}</span>
            {t('lang')}
          </button>

          <a
            ref={ctaRef}
            href={signupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#313ADF] text-white text-sm font-semibold hover:bg-[#2530C8] transition-colors duration-200 shadow-md shadow-[#313ADF]/20"
          >
            {t('cta')}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7H11.5M8 3.5L11.5 7L8 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[#F8F9FF] transition-colors"
            aria-label="Menu"
          >
            <div className={`w-5 h-0.5 bg-[#040741] transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <div className={`w-5 h-0.5 bg-[#040741] my-1.5 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-0.5 bg-[#040741] transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white/95 backdrop-blur-xl border-t border-[#E8EAFF] px-6 py-4 flex flex-col gap-2"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 text-sm font-medium text-[#040741] rounded-xl hover:bg-[#F8F9FF] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="h-px bg-[#E8EAFF] my-2" />
          <button onClick={switchLocale} className="px-4 py-3 text-sm font-semibold text-[#313ADF] text-left">
            {locale === 'fr' ? '🇬🇧 Switch to English' : '🇫🇷 Passer en Français'}
          </button>
          <a
            href={signupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#313ADF] text-white text-sm font-semibold"
          >
            {t('cta')}
          </a>
        </motion.div>
      )}
    </motion.header>
  )
}
