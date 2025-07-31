"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Loader2 } from "lucide-react"

const defaultLoadingMessages = [
  "Unwrapping digital happiness... 🎁",
  "Polishing pixels for your perfect present... ✨",
  "Summoning gift cards from the internet ether... 🪄",
  "Brewing up your perfect present... ☕",
  "Just a sec, fetching your future smiles... 😄",
  "Herding digital cats (and gift cards)... 😼",
  "Assembling your awesome gift card experience... 🛠️",
  "Charging up your retail therapy... ⚡",
  "Bribing the internet to go faster... 💰",
  "Almost there! Our servers are doing the cha-cha... 💃🕺",
  "Preparing to make someone's day... and yours! 🥳",
  'Locating the "send gift card" button... it\'s a big internet. 🗺️',
  "Adding extra sparkle to your virtual wallet... ✨",
  "Warming up the gift card printer (it's digital, we promise)... 🖨️",
  "Please wait, our hamsters are generating your codes... 🐹",
  "Shuffling the deck of destiny (and discount codes)... 🃏",
  "Loading... because even magic takes a moment. ✨",
  "Securing your smiles, one byte at a time... 🔒",
  "Almost ready to unleash the gifting goodness! 🚀",
  "Just a moment, we're making sure your gift card is extra special. 💖",
]

interface LoadingScreenProps {
  isVisible?: boolean
  onComplete?: () => void
  duration?: number
  messages?: string[]
  title?: string
}

export default function LoadingScreen({
  isVisible = true,
  onComplete,
  duration = 3000,
  messages = defaultLoadingMessages,
  title = "Processing...",
}: LoadingScreenProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isVisible) {
      setProgress(0)
      setCurrentMessageIndex(0)
      return
    }

    // Change message every 1.5 seconds
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length)
    }, 1500)

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          if (onComplete) {
            setTimeout(onComplete, 500)
          }
          return 100
        }
        return prev + 100 / (duration / 50)
      })
    }, 50)

    return () => {
      clearInterval(messageInterval)
      clearInterval(progressInterval)
    }
  }, [isVisible, duration, onComplete, messages.length])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500"
      >
        {/* Modern clean background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center max-w-md mx-auto px-6">
          {/* Logo with bouncing animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <motion.div
              className="relative mx-auto w-24 h-24 mb-4"
              animate={{
                y: [0, -12, 0],
                rotate: [0, 3, -3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/images/gamakay-logo.jpg"
                alt="GAMAKAY CARDS"
                fill
                className="rounded-2xl shadow-2xl object-cover"
              />
              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-orange-500/20 blur-lg scale-110 -z-10"></div>
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">GAMAKAY</h1>
            <p className="text-white/80 text-lg">CARDS</p>
          </motion.div>

          {/* Animated Spinner */}
          <motion.div
            className="mb-8"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <Loader2 className="w-12 h-12 text-white mx-auto" />
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-semibold text-white mb-4"
          >
            {title}
          </motion.h2>

          {/* Loading Message */}
          <div className="mb-8 h-16 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentMessageIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-white text-lg font-medium text-center leading-relaxed"
              >
                {messages[currentMessageIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-3 mb-4 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-white to-yellow-200 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Progress Percentage */}
          <motion.p
            className="text-white/80 text-sm font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            {Math.round(progress)}%
          </motion.p>

          {/* Modern geometric elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-20 left-10 w-2 h-2 bg-white/20 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            />
            <motion.div
              className="absolute top-40 right-16 w-1 h-1 bg-white/30 rounded-full"
              animate={{ scale: [1, 2, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
            />
            <motion.div
              className="absolute bottom-32 left-20 w-3 h-3 bg-white/10 rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
