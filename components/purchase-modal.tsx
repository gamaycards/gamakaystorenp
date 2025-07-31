"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Phone, MessageCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PurchaseModalProps {
  isOpen: boolean
  onClose: () => void
  platform: string
  amount: number
}

export default function PurchaseModal({ isOpen, onClose, platform, amount }: PurchaseModalProps) {
  // Convert USD to NPR (1 USD = 185 NPR)
  const nprAmount = amount * 185

  const handleWhatsApp = () => {
    const message = `Hi! I want to purchase ${platform} Gift Card worth $${amount} (NPR ${nprAmount.toLocaleString()}). Can you help me?`;
    const whatsappUrl = `https://wa.me/9862157864?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCall = () => {
    window.open(`tel:9862157864`, '_blank');
  };

  const handleClose = () => {
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="bg-white/95 backdrop-blur-sm border-white/20">
            <CardHeader className="relative">
              <Button variant="ghost" size="sm" className="absolute right-2 top-2" onClick={handleClose}>
                <X className="w-4 h-4" />
              </Button>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent text-center">
                Contact Us to Purchase
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Product Summary */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">{platform} Gift Card</h3>
                    <p className="text-gray-600">Digital delivery in minutes</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-800">${amount}</div>
                    <div className="text-sm text-gray-600">NPR {nprAmount.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Contact us via WhatsApp or Viber</h4>
                <p className="text-gray-600 mb-6">Scan the QR code or click the buttons below</p>
                
                {/* QR Codes Side by Side */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* WhatsApp QR */}
                  <div className="text-center">
                    <div className="bg-white p-4 rounded-lg border border-green-200 mb-2">
                      <img 
                        src="/products/steam-whatsapp.png" 
                        alt="WhatsApp QR Code" 
                        className="w-32 h-32 mx-auto object-contain"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.jpg";
                        }}
                      />
                    </div>
                    <p className="text-sm text-gray-600">WhatsApp</p>
                  </div>
                  
                  {/* Viber QR */}
                  <div className="text-center">
                    <div className="bg-white p-4 rounded-lg border border-purple-200 mb-2">
                      <img 
                        src="/products/steam-viber.png" 
                        alt="Viber QR Code" 
                        className="w-32 h-32 mx-auto object-contain"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.jpg";
                        }}
                      />
                    </div>
                    <p className="text-sm text-gray-600">Viber</p>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="flex gap-3 mb-6">
                  <Button 
                    onClick={handleWhatsApp}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button 
                    onClick={handleCall}
                    variant="outline"
                    className="flex-1"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                </div>

                {/* Phone Number Display */}
                <div className="bg-gray-50 p-3 rounded-lg border">
                  <p className="text-sm text-gray-600 mb-1">Phone Number:</p>
                  <p className="text-lg font-bold text-gray-800">9862157864</p>
                </div>

                {/* Done Button */}
                <Button 
                  onClick={handleClose} 
                  className="w-full mt-6 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3"
                >
                  Done
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
