'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'

const items = [
  { icon: '⚡', text: '7 jours gratuit' },
  { icon: '📄', text: 'PDF automatique' },
  { icon: '🗺️', text: 'GPS livraisons' },
  { icon: '🤖', text: 'IA intégrée' },
  { icon: '📦', text: 'Stock temps réel' },
  { icon: '🔧', text: 'SAV structuré' },
  { icon: '💳', text: 'Sans engagement' },
  { icon: '🏪', text: 'Multi-magasins' },
  { icon: '📊', text: 'Dashboard analytics' },
  { icon: '✉️', text: 'Envoi email auto' },
  { icon: '🔒', text: 'Données sécurisées' },
  { icon: '📱', text: 'App livreurs mobile' },
]

export default function Marquee() {
  const track1Ref = useRef<HTMLDivElement>(null)
  const track2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl1 = gsap.to(track1Ref.current, {
      xPercent: -50,
      ease: 'none',
      duration: 30,
      repeat: -1,
    })
    const tl2 = gsap.to(track2Ref.current, {
      xPercent: -50,
      ease: 'none',
      duration: 24,
      repeat: -1,
    })
    return () => { tl1.kill(); tl2.kill() }
  }, [])

  const doubled = [...items, ...items]

  return (
    <div className="relative py-4 overflow-hidden bg-[#F8F9FF] border-y border-[#E8EAFF]">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F8F9FF] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F8F9FF] to-transparent z-10 pointer-events-none" />

      {/* Track */}
      <div ref={track1Ref} className="flex gap-6 whitespace-nowrap w-max">
        {doubled.map((item, i) => (
          <div
            key={i}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E8EAFF] text-sm font-medium text-[#040741] flex-shrink-0"
          >
            <span className="text-base leading-none">{item.icon}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
