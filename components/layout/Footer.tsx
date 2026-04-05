'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'

export default function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = () => {
    const newLocale = locale === 'fr' ? 'en' : 'fr'
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  const signupUrl = process.env.NEXT_PUBLIC_BOS_SIGNUP_URL || 'https://bos.neoflow-agency.cloud/signup'

  return (
    <footer className="bg-[#040741] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 12L8 4L13 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5.5 9H10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="font-bold text-sm tracking-tight">
                NeoFlow <span className="text-[#6B77E8]">BOS</span>
              </span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-[220px]">
              {t('tagline')}
            </p>
            <button
              onClick={switchLocale}
              className="mt-6 flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200 border border-white/10"
            >
              <span>{locale === 'fr' ? '🇬🇧' : '🇫🇷'}</span>
              {locale === 'fr' ? 'English' : 'Français'}
            </button>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">{t('product')}</h4>
            <ul className="space-y-3">
              <li><Link href={`/${locale}#fonctionnalites`} className="text-sm text-white/60 hover:text-white transition-colors">{t('links.features')}</Link></li>
              <li><Link href={`/${locale}#tarifs`} className="text-sm text-white/60 hover:text-white transition-colors">{t('links.pricing')}</Link></li>
              <li><Link href={`/${locale}/enterprise`} className="text-sm text-white/60 hover:text-white transition-colors">{t('links.enterprise')}</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">{t('company')}</h4>
            <ul className="space-y-3">
              <li><Link href={`/${locale}/contact`} className="text-sm text-white/60 hover:text-white transition-colors">{t('links.contact')}</Link></li>
              <li>
                <a href={signupUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors">
                  {locale === 'fr' ? 'Créer un compte' : 'Create account'}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">{t('legal')}</h4>
            <ul className="space-y-3">
              <li><Link href={`/${locale}/mentions-legales`} className="text-sm text-white/60 hover:text-white transition-colors">{t('links.mentions')}</Link></li>
              <li><Link href={`/${locale}/politique-de-confidentialite`} className="text-sm text-white/60 hover:text-white transition-colors">{t('links.privacy')}</Link></li>
              <li><Link href={`/${locale}/cgu`} className="text-sm text-white/60 hover:text-white transition-colors">{t('links.cgu')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">{t('copyright')}</p>
          <div className="flex items-center gap-1 text-xs text-white/30">
            <span>{locale === 'fr' ? 'Fait avec' : 'Made with'}</span>
            <span className="text-[#313ADF]">♥</span>
            <span>{locale === 'fr' ? 'par NeoFlow Agency' : 'by NeoFlow Agency'}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
