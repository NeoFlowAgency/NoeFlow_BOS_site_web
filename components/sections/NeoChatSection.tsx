'use client'

import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

type Message = { role: 'user' | 'ai'; text: string }

function TypingMessage({ text, onDone }: { text: string; onDone: () => void }) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    let i = 0
    setDisplayed('')
    const interval = setInterval(() => {
      if (i >= text.length) {
        clearInterval(interval)
        setTimeout(onDone, 400)
        return
      }
      setDisplayed(text.slice(0, i + 1))
      i++
    }, 18)
    return () => clearInterval(interval)
  }, [text, onDone])

  return (
    <span>
      {displayed}
      {displayed.length < text.length && <span className="typing-cursor" />}
    </span>
  )
}

export default function NeoChatSection() {
  const t = useTranslations('neochat')
  const locale = useLocale()
  const allMessages = t.raw('demo') as Message[]
  const plans = t.raw('plans') as Array<{ plan: string; tokens: string }>

  const [visibleMessages, setVisibleMessages] = useState<Message[]>([])
  const [typingIdx, setTypingIdx] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typingIdx >= allMessages.length) {
      // Loop after pause
      const timer = setTimeout(() => {
        setVisibleMessages([])
        setTypingIdx(0)
        setIsTyping(false)
      }, 3000)
      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => {
      setVisibleMessages(prev => [...prev, allMessages[typingIdx]])
      setIsTyping(true)
    }, typingIdx === 0 ? 800 : 400)

    return () => clearTimeout(timer)
  }, [typingIdx, allMessages])

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [visibleMessages])

  return (
    <section className="py-24 relative overflow-hidden bg-[#F8F9FF]">
      {/* Aurora background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="aurora-1 absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full bg-[#313ADF]/12 blur-[100px]" />
        <div className="aurora-2 absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#6B77E8]/15 blur-[80px]" />
        <div className="aurora-1 absolute top-1/2 left-0 w-[300px] h-[300px] rounded-full bg-[#B4B8F8]/10 blur-[60px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: chat demo */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Chat window */}
            <div className="rounded-2xl border border-[#E8EAFF] bg-white shadow-2xl shadow-[#040741]/10 overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-[#E8EAFF] bg-[#F8F9FF]">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#313ADF] to-[#040741] flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1C4.24 1 2 3.24 2 6V7C1.45 7 1 7.45 1 8C1 8.55 1.45 9 2 9V10C2 12.76 4.24 15 7 15C9.76 15 12 12.76 12 10V9C12.55 9 13 8.55 13 8C13 7.45 12.55 7 12 7V6C12 3.24 9.76 1 7 1Z" stroke="white" strokeWidth="1" fill="none"/>
                    <path d="M5 8H5.01M7 8H7.01M9 8H9.01" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-[#040741]">NeoChat</div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] text-[#9CA3AF]">{locale === 'fr' ? 'En ligne' : 'Online'}</span>
                  </div>
                </div>
                <div className="ml-auto badge-chip text-[10px]">IA</div>
              </div>

              {/* Messages */}
              <div ref={chatRef} className="h-72 overflow-y-auto p-4 space-y-3 scroll-smooth">
                {visibleMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'ai' && (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#313ADF] to-[#040741] flex-shrink-0 mr-2 mt-0.5" />
                    )}
                    <div
                      className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[#313ADF] text-white rounded-br-sm'
                          : 'bg-[#F8F9FF] text-[#040741] border border-[#E8EAFF] rounded-bl-sm'
                      }`}
                    >
                      {i === visibleMessages.length - 1 && isTyping && msg.role === 'ai' ? (
                        <TypingMessage text={msg.text} onDone={() => { setIsTyping(false); setTypingIdx(prev => prev + 1) }} />
                      ) : i === visibleMessages.length - 1 && isTyping && msg.role === 'user' ? (
                        <TypingMessage text={msg.text} onDone={() => { setIsTyping(false); setTypingIdx(prev => prev + 1) }} />
                      ) : (
                        msg.text
                      )}
                    </div>
                  </div>
                ))}

                {/* AI thinking dots */}
                {isTyping && visibleMessages[visibleMessages.length - 1]?.role === 'user' && (
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#313ADF] to-[#040741] flex-shrink-0" />
                    <div className="flex gap-1 px-3.5 py-2.5 bg-[#F8F9FF] rounded-2xl rounded-bl-sm border border-[#E8EAFF]">
                      {[0, 1, 2].map(j => (
                        <motion.div
                          key={j}
                          className="w-1.5 h-1.5 rounded-full bg-[#9CA3AF]"
                          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                          transition={{ duration: 0.8, delay: j * 0.15, repeat: Infinity }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Input bar */}
              <div className="px-4 py-3 border-t border-[#E8EAFF] flex items-center gap-2">
                <div className="flex-1 rounded-xl bg-[#F8F9FF] border border-[#E8EAFF] px-4 py-2.5 text-sm text-[#9CA3AF]">
                  {locale === 'fr' ? 'Posez une question à NeoChat...' : 'Ask NeoChat anything...'}
                </div>
                <button className="w-8 h-8 rounded-lg bg-[#313ADF] flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right: text + plans */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="badge-chip">{t('badge')}</span>
            <h2 className="mt-5 text-3xl md:text-4xl font-bold text-[#040741] leading-tight">
              {t('title')}{' '}
              <span className="gradient-text">{t('titleAccent')}</span>
            </h2>
            <p className="mt-5 text-[#6B7280] text-lg leading-relaxed">{t('desc')}</p>

            {/* Plans tokens */}
            <div className="mt-8 space-y-3">
              {plans.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="flex items-center justify-between px-4 py-3 rounded-xl bg-white border border-[#E8EAFF] shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-[#9CA3AF]' : i === 1 ? 'bg-[#313ADF]' : 'bg-gradient-to-r from-[#313ADF] to-purple-500'}`} />
                    <span className="text-sm font-semibold text-[#040741]">{p.plan}</span>
                  </div>
                  <span className={`text-sm font-bold ${i === 2 ? 'gradient-text' : 'text-[#313ADF]'}`}>{p.tokens}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
