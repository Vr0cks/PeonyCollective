"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface FadeInProps {
  children: ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  className?: string
}

export default function FadeIn({ children, delay = 0, direction = "up", className = "" }: FadeInProps) {
  const directionOffset = {
    up: 40,
    down: -40,
    left: 40,
    right: -40,
    none: 0
  }

  const y = direction === "up" || direction === "down" ? directionOffset[direction] : 0
  const x = direction === "left" || direction === "right" ? directionOffset[direction] : 0

  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
