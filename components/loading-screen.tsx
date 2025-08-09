"use client"

import { motion, AnimatePresence } from 'framer-motion'
import LottieAnimation from './lottie-animation'

interface LoadingScreenProps {
  isVisible: boolean
  onComplete?: () => void
}

export default function LoadingScreen({ isVisible, onComplete }: LoadingScreenProps) {
  // Import the loading animation data
  const loadingAnimationData = require('@/products/lottie/loading.lottie')

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
        >
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-6">
              <LottieAnimation
                animationData={loadingAnimationData}
                className="w-full h-full"
                onComplete={onComplete}
              />
            </div>
            <p className="text-white text-lg font-medium">Loading...</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}