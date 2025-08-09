"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { 
  Gamepad2, Gift, Star, Zap, CreditCard, Shield, Truck, 
  ChevronDown, Sparkles, Trophy, Users, Clock, CheckCircle,
  ArrowRight, MousePointer2, Download, Heart, Play, ChevronRight,
  ShoppingCart, MessageCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import PurchaseModal from "@/components/purchase-modal"
import { GameController } from "@/components/game-controller"
import { products } from "@/lib/products"


// This platformsData declaration removed to avoid duplication

// Apple-style hero component with massive typography and fluid animations
const AppleHero = () => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 800], [0, -200])
  const scale = useTransform(scrollY, [0, 800], [1, 0.8])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-yellow-900" />
      
      {/* Fluid animated background elements */}
      <motion.div
        style={{ y }}
        className="absolute inset-0"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full filter blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-600/20 rounded-full filter blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-white/5 to-transparent rounded-full"
        />
      </motion.div>

          <motion.div
        style={{ scale, opacity }}
        className="relative z-10 text-center max-w-7xl mx-auto px-4"
      >
                        {/* Pre-headline */}
              <motion.div
          initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6 relative z-20"
              >
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/15 backdrop-blur-xl border border-white/30 text-white text-xs sm:text-sm font-medium shadow-lg">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-yellow-400" />
            New Gaming Experience
          </span>
              </motion.div>

                {/* Main headline - Fluid Apple style */}
                <motion.h1
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1.2, 
            delay: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-4 leading-none"
        >
          <motion.span
                  animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
              duration: 8,
              repeat: Infinity,
                    ease: "linear",
                  }}
            className="bg-gradient-to-r from-yellow-400 via-white to-yellow-400 bg-[length:200%_auto] bg-clip-text text-transparent"
                >
            GAMAKAY
          </motion.span>
                </motion.h1>

        {/* Secondary headline */}
        <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white/90 mb-4 leading-tight">
            Giftcards.
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Experience gaming like never before with our premium digital gift cards.
          </p>
            </motion.div>

                

        {/* Feature highlights with fluid animations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="mt-6 mb-16 flex flex-wrap justify-center gap-4 sm:gap-6 text-white/60"
            >
              {[
                { icon: Zap, text: "Instant delivery", color: "text-yellow-400" },
                { icon: Shield, text: "100% secure", color: "text-green-400" },
                { icon: Users, text: "Trusted by 1K+", color: "text-purple-400" }
              ].map((feature, index) => (
              <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                    duration: 0.6, 
                    delay: 1.2 + index * 0.2,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                    <motion.div
                      animate={{
                      rotate: [0, -10, 10, 0],
                      }}
                      transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  >
                    <feature.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${feature.color}`} />
                  </motion.div>
                  <span className="text-xs sm:text-sm">{feature.text}</span>
                    </motion.div>
              ))}
              </motion.div>
            </motion.div>

      {/* Controller CTA - Compact positioning */}
      <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 flex justify-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="flex flex-col items-center space-y-1"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative cursor-pointer group"
          >
            <Image
              src="/images/CONTROLLER_CTA.png"
              alt="Gaming Controller"
              width={60}
              height={60}
              priority={false}
              loading="lazy"
              className="object-contain group-hover:scale-110 transition-transform duration-300 sm:w-16 sm:h-16"
            />
            <div className="absolute inset-0 bg-yellow-500/15 rounded-full filter blur-lg animate-pulse will-change-transform" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="text-white/60 text-xs sm:text-sm text-center font-medium whitespace-nowrap"
          >
            Scroll to explore
          </motion.p>
          </motion.div>
        </div>

      </section>
  )
}



// Clean, minimalist features section
const AppleFeatures = () => {
  const features = [
    {
      title: "Instant Delivery",
      headline: "Fast that lasts.",
      description: "Get your gift card codes delivered to your email within minutes of purchase.",
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "100% Secure", 
      headline: "Beautiful and secure, by design.",
      description: "All transactions are encrypted and protected with industry-standard security.",
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: "24/7 Support",
      headline: "Innovation in value.",
      description: "Our customer support team is available around the clock to help you.",
      icon: <Truck className="w-6 h-6" />
    }
  ]

  return (
    <div className="bg-white">
      {features.map((feature, index) => (
        <FeatureSection key={feature.title} feature={feature} index={index} />
      ))}
    </div>
  )
}

// Individual feature section component
const FeatureSection = ({ feature, index }: any) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const isEven = index % 2 === 0

  return (
    <section ref={ref} className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${isEven ? '' : 'lg:grid-flow-col-dense'}`}>
          <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}
          >
            {/* Icon */}
            <div className="mb-8">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <div className="text-blue-600">{feature.icon}</div>
              </div>
            </div>

            {/* Title */}
            <div className="text-sm font-medium text-gray-900 mb-4">
              {feature.title}
            </div>
            
            {/* Headline */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {feature.headline}
            </h2>
            
            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {feature.description}
            </p>
            
            {/* Learn more button - only show for first two cards */}
            {index < 2 && (
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-base font-medium">
                Learn more
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </motion.div>

          {/* Empty white rectangular card */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}
          >
            <div className="relative">
              <div className="w-full h-96 bg-white rounded-3xl shadow-lg border border-gray-200"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Platform data with discount percentages
const platformsData = [
  {
    id: 'steam',
    name: 'Steam',
    icon: '/images/STEAM.svg',
    discount: '15% OFF',
    description: 'The ultimate gaming platform',
    color: 'text-blue-400'
  },
  {
    id: 'playstation',
    name: 'PlayStation',
    icon: '/images/PLAYSTATION.svg',
    discount: '10% OFF',
    description: 'Console gaming redefined',
    color: 'text-blue-500'
  },
  {
    id: 'xbox',
    name: 'Xbox',
    icon: '/images/XBOX.svg',
    discount: '8% OFF',
    description: 'Power your dreams',
    color: 'text-green-400'
  },
  {
    id: 'nintendo',
    name: 'Nintendo',
    icon: '/images/NINTENDO.svg',
    discount: '12% OFF',
    description: 'Switch your gaming',
    color: 'text-red-400'
  },
  {
    id: 'epic',
    name: 'Epic Games',
    icon: '/images/EPICGAMES.svg',
    discount: '14% OFF',
    description: 'Epic gaming adventures',
    color: 'text-gray-300'
  },
  {
    id: 'apple',
    name: 'Apple',
    icon: '/images/APPLE.svg',
    discount: '7% OFF',
    description: 'Gaming. Elevated.',
    color: 'text-blue-300'
  }
]

// Gift card denominations
const giftCardAmounts = {
  steam: [
    { value: 5, price: 425, originalPrice: 500 },
    { value: 10, price: 850, originalPrice: 1000 },
    { value: 20, price: 1700, originalPrice: 2000 },
    { value: 50, price: 4250, originalPrice: 5000 },
    { value: 100, price: 8500, originalPrice: 10000 }
  ],
  playstation: [
    { value: 5, price: 450, originalPrice: 500 },
    { value: 10, price: 900, originalPrice: 1000 },
    { value: 25, price: 2250, originalPrice: 2500 },
    { value: 50, price: 4500, originalPrice: 5000 },
    { value: 100, price: 9000, originalPrice: 10000 }
  ],
  xbox: [
    { value: 5, price: 460, originalPrice: 500 },
    { value: 10, price: 920, originalPrice: 1000 },
    { value: 25, price: 2300, originalPrice: 2500 },
    { value: 50, price: 4600, originalPrice: 5000 },
    { value: 100, price: 9200, originalPrice: 10000 }
  ],
  nintendo: [
    { value: 5, price: 440, originalPrice: 500 },
    { value: 10, price: 880, originalPrice: 1000 },
    { value: 25, price: 2200, originalPrice: 2500 },
    { value: 50, price: 4400, originalPrice: 5000 },
    { value: 100, price: 8800, originalPrice: 10000 }
  ],
  epic: [
    { value: 5, price: 430, originalPrice: 500 },
    { value: 10, price: 860, originalPrice: 1000 },
    { value: 25, price: 2150, originalPrice: 2500 },
    { value: 50, price: 4300, originalPrice: 5000 },
    { value: 100, price: 8600, originalPrice: 10000 }
  ],
  apple: [
    { value: 5, price: 465, originalPrice: 500 },
    { value: 15, price: 1395, originalPrice: 1500 },
    { value: 25, price: 2325, originalPrice: 2500 },
    { value: 50, price: 4650, originalPrice: 5000 },
    { value: 100, price: 9300, originalPrice: 10000 }
  ]
}

// Pricing Section Component
const PricingSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [selectedPlatform, setSelectedPlatform] = useState<any>(null)
  const [selectedAmount, setSelectedAmount] = useState<any>(null)
  const [showPlatformSelection, setShowPlatformSelection] = useState(false)
  const [showAmountSelection, setShowAmountSelection] = useState(false)
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false)

  const handlePlatformSelect = (platform: any) => {
    setSelectedPlatform(platform)
    setShowAmountSelection(true)
    // Auto-select the $100 amount by default
    const amounts = giftCardAmounts[platform.id as keyof typeof giftCardAmounts]
    const defaultAmount = amounts?.find(a => a.value === 100) || amounts?.[amounts.length - 1]
    setSelectedAmount(defaultAmount || null)
  }

  const handleAmountSelect = (amount: any) => {
    setSelectedAmount(amount)
    setIsPurchaseModalOpen(true)
  }

  const handleBack = () => {
    if (showAmountSelection) {
      setShowAmountSelection(false)
      setSelectedPlatform(null)
    } else if (showPlatformSelection) {
      setShowPlatformSelection(false)
    }
  }

  const handleWhatsApp = (platform: any, amount: any) => {
    const message = `Hi! I'm interested in purchasing ${platform.name} $${amount?.value || 'custom'} for ₹${amount?.price}. Please provide more details.`
    const url = `https://wa.me/9862157864?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

    return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {!showAmountSelection ? (
          // Platform Selection Screen
              <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto"
          >
            {/* Large Platform Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {[
                {
                  id: 'steam',
                  name: 'Steam Gift Cards',
                  description: 'Choose Your Amount! Available in $5, $10, and custom amounts.',
                  icon: '/images/STEAM.svg',
                  discount: '15% OFF'
                },
                {
                  id: 'playstation',
                  name: 'PlayStation Gift Cards',
                  description: 'PlayStation Gift Cards INR - Choose Your Amount!',
                  icon: '/images/PLAYSTATION.svg',
                  discount: '10% OFF'
                },
                {
                  id: 'xbox',
                  name: 'Xbox Gift Cards',
                  description: 'Xbox Gift Cards - Choose Your Amount!',
                  icon: '/images/XBOX.svg',
                  discount: '8% OFF'
                },
                {
                  id: 'nintendo',
                  name: 'Nintendo Gift Cards',
                  description: 'Nintendo Gift Cards - Choose Your Amount!',
                  icon: '/images/NINTENDO.svg',
                  discount: '12% OFF'
                },
                {
                  id: 'epic',
                  name: 'Epic Games Gift Cards',
                  description: 'Epic Games Gift Cards - Choose Your Amount!',
                  icon: '/images/EPICGAMES.svg',
                  discount: '14% OFF'
                },
                {
                  id: 'apple',
                  name: 'iTunes Gift Cards (Apple App Store)',
                  description: 'Game codes in 10 mins! Easy redemption with hassle-free guides.',
                  icon: '/images/APPLE.svg',
                  discount: '7% OFF'
                }
              ].map((platform, index) => (
                <motion.div
                  key={platform.id}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePlatformSelect({ id: platform.id, name: platform.name, icon: platform.icon, discount: platform.discount })}
                  className="bg-white rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:bg-gray-50 border-2 shadow-lg hover:shadow-2xl border-gray-200 hover:border-gray-300 relative overflow-hidden group"
                >
                  {/* Floating animation background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.8 }}
                  />
                  <div className="text-center">
                    <motion.div 
                      className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-2xl flex items-center justify-center"
                      whileHover={{ 
                        scale: 1.1,
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.3 }
                      }}
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Image
                          src={platform.icon}
                          alt={platform.name}
                          width={48}
                          height={48}
                          className="w-12 h-12 object-contain"
                        />
                      </motion.div>
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{platform.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{platform.description}</p>
                    <motion.span 
                      className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium"
                      whileHover={{ 
                        scale: 1.05,
                        transition: { duration: 0.2 }
                      }}
                      animate={{
                        scale: [1, 1.02, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {platform.discount}
                    </motion.span>
                  </div>
              </motion.div>
            ))}
          </div>
          </motion.div>
        ) : (
          // Amount Selection Screen
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Choose Your Amount
              </h2>
              <p className="text-gray-600 text-lg">
                Select the perfect gift card value
              </p>
            </div>

            <div className="flex justify-center items-center mb-12">
              <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
                {giftCardAmounts[selectedPlatform?.id as keyof typeof giftCardAmounts]?.map((amount, index) => (
                <motion.div
                    key={amount.value}
                    initial={{ opacity: 0, y: 30, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedAmount(amount)}
                    className={`bg-white rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:bg-gray-50 border-2 shadow-lg hover:shadow-xl min-w-[120px] ${
                      selectedAmount?.value === amount.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-900 mb-1">
                        ${amount.value}
                      </div>
                      <div className="text-xs text-gray-500">Gift Card</div>
                    </div>
                </motion.div>
              ))}
              </div>
            </div>

            {/* Gift Card Preview */}
            {selectedAmount && (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-2xl p-6 mb-8 max-w-md mx-auto border border-blue-200 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Image
                        src={selectedPlatform?.icon}
                        alt={selectedPlatform?.name}
                        width={20}
                        height={20}
                        className="w-5 h-5 object-contain"
                      />
                  </div>
                  <div>
                      <h3 className="text-gray-900 font-bold text-lg">
                        {selectedPlatform?.name} Gift Card
                      </h3>
                      <p className="text-gray-600 text-sm">Digital delivery in minutes</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-900 font-bold text-3xl">
                      ${selectedAmount.value}
                </div>
                  <Button
                      onClick={() => handleAmountSelect(selectedAmount)}
                      className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm"
                    >
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      Buy Now
                  </Button>
                </div>
              </div>
            </motion.div>
            )}

            <div className="text-center">
              <Button
                onClick={handleBack}
                variant="ghost"
                className="text-gray-600 hover:text-gray-900"
              >
                ← Back to Platforms
              </Button>
            </div>
          </motion.div>
        )}

                {/* Purchase Modal */}
        {isPurchaseModalOpen && selectedPlatform && selectedAmount && (
          <PurchaseModal
            isOpen={isPurchaseModalOpen}
            onClose={() => {
              setIsPurchaseModalOpen(false)
              setSelectedPlatform(null)
              setSelectedAmount(null)
              setShowPlatformSelection(false)
              setShowAmountSelection(false)
            }}
            platform={selectedPlatform.name}
            amount={selectedAmount.value}
          />
        )}
        </div>
      </section>
  )
}

export default function HomePage() {
  const [selectedAmount, setSelectedAmount] = useState(50)
  const [selectedPlatform, setSelectedPlatform] = useState("Steam")
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false)

  return (
          <motion.div
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
    >

      {/* Apple-style Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image 
              src="/images/gamakay-logo.jpg" 
              alt="GAMAKAY" 
              width={32} 
              height={32} 
              className="rounded-lg" 
            />
            <div>
              <h1 className="text-lg font-semibold text-white">GAMAKAY</h1>
              <p className="text-xs text-white/60">Cards</p>
                    </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#platforms" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
              Platforms
            </a>
            <a href="#features" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
              Features
            </a>
            <a href="#support" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
              Support
            </a>
            <div className="flex items-center space-x-3 ml-4">
              <GameController />
        </div>
          </nav>
          
          <div className="md:hidden flex items-center space-x-2">
            <GameController />
          </div>
        </div>
      </header>

            {/* Apple Hero */}
      <AppleHero />

      {/* Pricing Section */}
      <PricingSection />

      {/* Apple Features */}
      <AppleFeatures />

      {/* Apple-style Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <Image 
                  src="/images/gamakay-logo.jpg" 
                  alt="GAMAKAY" 
                  width={40} 
                  height={40} 
                  className="rounded-xl" 
                />
              <div>
                  <h3 className="text-2xl font-bold text-gray-900">GAMAKAY</h3>
                  <p className="text-gray-600">Cards</p>
                </div>
              </div>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed max-w-md">
                Your trusted partner for premium gaming gift cards. Instant delivery, secure transactions, unbeatable prices.
              </p>
              <div className="flex space-x-6">
                <div className="flex items-center space-x-2 text-gray-500">
                  <Users className="w-5 h-5" />
                  <span className="font-medium">1K+ Happy Customers</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-6 text-lg">Shop</h4>
              <ul className="space-y-4 text-gray-600">
                <li><a href="#platforms" className="hover:text-gray-900 transition-colors">Platforms</a></li>
                <li><a href="#features" className="hover:text-gray-900 transition-colors">Features</a></li>
                <li><a href="#support" className="hover:text-gray-900 transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-6 text-lg">Contact</h4>
              <ul className="space-y-4 text-gray-600">
                <li>📱 9862157864</li>
                <li>💬 WhatsApp Support</li>
                <li>📞 Viber Available</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm mb-4 md:mb-0">
                © 2024 GAMAKAY Cards. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm text-gray-500">
                <a href="#" className="hover:text-gray-700 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-gray-700 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-gray-700 transition-colors">Legal</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Purchase Modal */}
      <PurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        platform={selectedPlatform}
        amount={selectedAmount}
      />
    </motion.div>
  )
}
