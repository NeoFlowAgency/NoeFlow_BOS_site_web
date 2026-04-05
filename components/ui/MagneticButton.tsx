'use client'

import { useRef, useEffect, ReactNode } from 'react'
import gsap from 'gsap'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
  strength?: number
  external?: boolean
  style?: React.CSSProperties
}

export default function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  strength = 0.2,
  external = true,
  style,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onEnter = () => {
      gsap.to(el, { scale: 1.04, duration: 0.3, ease: 'power2.out' })
    }

    const onMove = (e: Event) => {
      const me = e as MouseEvent
      const rect = el.getBoundingClientRect()
      const x = me.clientX - rect.left - rect.width / 2
      const y = me.clientY - rect.top - rect.height / 2
      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: 'power3.out',
        overwrite: true,
      })
    }

    const onLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
        overwrite: true,
      })
    }

    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    return () => {
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={`inline-block ${className}`}
        target={external ? '_blank' : '_self'}
        rel={external ? 'noopener noreferrer' : undefined}
        style={{ willChange: 'transform', ...style }}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={`inline-block ${className}`}
      style={{ willChange: 'transform', ...style }}
    >
      {children}
    </button>
  )
}
