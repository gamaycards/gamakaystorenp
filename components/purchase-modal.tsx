"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Phone, MessageCircle, CheckCircle, Sparkles, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

interface PurchaseModalProps {
  isOpen: boolean
  onClose: () => void
  platform: string
  amount: number
  onPurchaseComplete?: (platform: string, amount: number) => void
}

export default function PurchaseModal({ isOpen, onClose, platform, amount, onPurchaseComplete }: PurchaseModalProps) {
  // Convert USD to NPR (1 USD = 185 NPR)
  const nprAmount = amount * 185

  const handleWhatsApp = () => {
    const message = `Hi! I want to purchase ${platform} Gift Card worth $${amount} (NPR ${nprAmount.toLocaleString()}). Can you help me?`;
    const whatsappUrl = `https://wa.me/9862157864?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    // Trigger purchase complete
    if (onPurchaseComplete) {
      onPurchaseComplete(platform, amount)
    }
  };

  const handleCall = () => {
    window.open(`tel:9862157864`, '_blank');
    // Trigger purchase complete
    if (onPurchaseComplete) {
      onPurchaseComplete(platform, amount)
    }
  };

  const handleClose = () => {
    onClose()
  }

  const platformIcons: { [key: string]: string } = {
    "Steam": "/images/STEAM.svg",
    "PlayStation": "/images/PLAYSTATION.svg", 
    "Xbox": "/images/XBOX.svg",
    "Nintendo": "/images/NINTENDO.svg",
    "Epic Games": "/images/EPICGAMES.svg",
    "Apple": "/images/APPLE.svg"
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 min-h-screen"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="relative w-full max-w-lg mx-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="glass border-white/20 overflow-hidden shadow-2xl">
            <CardHeader className="relative pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
                    <Image
                      src={platformIcons[platform] || "/images/STEAM.svg"}
                      alt={platform}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-white font-display">
                      {platform} Gift Card
                    </CardTitle>
                    <p className="text-slate-400 text-sm font-body">
                      Contact us to purchase
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* Product Summary */}
              <div className="glass rounded-xl p-6 border border-white/20 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
                      <Gift className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-white text-lg">{platform} Gift Card</h3>
                      <p className="text-slate-300 font-body">Digital delivery via contact</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-display font-bold text-white">${amount}</div>
                    <div className="text-sm text-slate-400 font-body">NPR {nprAmount.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6"
                >
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <Sparkles className="w-5 h-5 text-indigo-400" />
                    <h4 className="text-lg font-display font-semibold text-white">Contact Us to Purchase</h4>
                  </div>
                  <p className="text-slate-300 font-body">Scan the QR code or click the buttons below</p>
                </motion.div>
                
                {/* QR Codes Side by Side */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="grid grid-cols-2 gap-4 mb-6"
                >
                  {/* WhatsApp QR */}
                  <div className="text-center">
                    <div className="glass p-4 rounded-xl border border-green-400/20 mb-3 hover:border-green-400/40 transition-colors">
                      <Image 
                        src="/products/steam-whatsapp.png" 
                        alt="WhatsApp QR Code" 
                        width={128}
                        height={128}
                        className="mx-auto object-contain rounded-lg"
                      />
                    </div>
                    <p className="text-sm text-green-400 font-body font-medium">WhatsApp</p>
                  </div>
                  
                  {/* Viber QR */}
                  <div className="text-center">
                    <div className="glass p-4 rounded-xl border border-purple-400/20 mb-3 hover:border-purple-400/40 transition-colors">
                      <Image 
                        src="/products/steam-viber.png" 
                        alt="Viber QR Code" 
                        width={128}
                        height={128}
                        className="mx-auto object-contain rounded-lg"
                      />
                    </div>
                    <p className="text-sm text-purple-400 font-body font-medium">Viber</p>
                  </div>
                </motion.div>

                {/* Contact Buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-4"
                >
                  <div className="flex gap-3 mb-6">
                    <Button 
                      onClick={handleWhatsApp}
                      className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>
                    <Button 
                      onClick={handleCall}
                      variant="outline"
                      className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                  </div>

                  {/* Phone Number Display */}
                  <div className="glass rounded-xl p-4 border border-white/20">
                    <p className="text-sm text-slate-400 mb-2 font-body">Contact Number:</p>
                    <p className="text-xl font-display font-bold text-white">9862157864</p>
                  </div>

                  {/* Done Button */}
                  <Button 
                    onClick={handleClose} 
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Done
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}