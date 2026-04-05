'use client'

import { useRef, useEffect, ReactNode } from 'react'
import gsap from 'gsap'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
  strength?: number
}

export default function MagneticButton({ children, className = '', href, onClick, strength = 0.3 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      gsap.to(el, { x: x * strength, y: y * strength, duration: 0.3, ease: 'power2.out' })
    }
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])

  if (href) {
    return (
      <div ref={ref} className="inline-block">
        <a href={href} className={className} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      </div>
    )
  }

  return (
    <div ref={ref} className="inline-block">
      <button onClick={onClick} className={className}>
        {children}
      </button>
    </div>
  )
}
