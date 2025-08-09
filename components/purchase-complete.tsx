"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import LottieAnimation from './lottie-animation'

interface PurchaseCompleteProps {
  isVisible: boolean
  onClose: () => void
  platform?: string
  amount?: number
}

export default function PurchaseComplete({ 
  isVisible, 
  onClose, 
  platform = "Gift Card", 
  amount = 0 
}: PurchaseCompleteProps) {
  // Import the purchase complete animation data
  const purchaseCompleteAnimationData = require('@/products/lottie/purchasecomplete.lottie')

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lottie Animation */}
            <div className="w-32 h-32 mx-auto mb-6">
              <LottieAnimation
                animationData={purchaseCompleteAnimationData}
                className="w-full h-full"
                loop={false}
              />
            </div>

            {/* Success Icon */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>

            {/* Success Message */}
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Purchase Complete!
            </h2>
            
            <p className="text-gray-600 mb-6">
              Your {platform} Gift Card worth ${amount} has been successfully purchased.
            </p>

            <p className="text-sm text-gray-500 mb-8">
              You will receive your gift card codes via email within minutes.
            </p>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Continue Shopping
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
