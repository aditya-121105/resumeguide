'use client'

import { motion } from 'framer-motion'

export function ScrollReveal({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.8,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  )
}