"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Gamepad2, Gift, Star, Zap, CreditCard, Shield, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { fetchPlatforms, checkPlatformAvailability } from "@/lib/api"
import PurchaseModal from "@/components/purchase-modal"
import LoadingScreen from "@/components/loading-screen"
import { ThemeToggle } from "@/components/theme-toggle"
import { GameController } from "@/components/game-controller"
import { useTheme } from "next-themes"
import { products } from "@/lib/products"
import { ProductCard } from "@/components/product-card"

export default function HomePage() {
  const [selectedAmount, setSelectedAmount] = useState(50)
  const [selectedPlatform, setSelectedPlatform] = useState("Steam")
  const [platforms, setPlatforms] = useState<any[]>([])
  const [isLoadingPlatforms, setIsLoadingPlatforms] = useState(true)
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false)
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    loadPlatforms()
  }, [])

  const loadPlatforms = async () => {
    setIsLoadingPlatforms(true)
    try {
      const response = await fetchPlatforms()
      if (response.success && response.data) {
        setPlatforms(response.data)
        setSelectedPlatform(response.data[0]?.name || "Steam")
      }
    } catch (error) {
      console.error("Failed to load platforms:", error)
    } finally {
      setIsLoadingPlatforms(false)
    }
  }

  const handlePlatformSelect = async (platformName: string) => {
    setIsCheckingAvailability(true)
    setSelectedPlatform(platformName)

    try {
      const response = await checkPlatformAvailability(platformName)
      if (response.success && !response.data) {
        // Platform unavailable - could show a message
        console.log(`${platformName} is currently unavailable`)
      }
    } catch (error) {
      console.error("Failed to check platform availability:", error)
    } finally {
      setIsCheckingAvailability(false)
    }
  }

  const giftCardAmounts = [5, 10, 15, 20, 50, 100]

  // Dynamic background based on theme
  const backgroundClass =
    theme === "dark"
      ? "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black"
      : "min-h-screen bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500"

  return (
    <div className={backgroundClass}>
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image src="/images/gamakay-logo.jpg" alt="GAMAKAY CARDS" width={50} height={50} className="rounded-lg" />
            <div>
              <h1 className="text-2xl font-bold text-white">GAMAKAY</h1>
              <p className="text-white/80 text-sm">CARDS</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-white hover:text-white/80 transition-colors">
              Gift Cards
            </a>
            <a href="#" className="text-white hover:text-white/80 transition-colors">
              Support
            </a>
            <a href="#" className="text-white hover:text-white/80 transition-colors">
              Account
            </a>
            <div className="flex items-center space-x-2">
              <GameController />
              <ThemeToggle />
            </div>
          </nav>
          <div className="md:hidden flex items-center space-x-2">
            <GameController />
            <ThemeToggle />
          </div>
        </div>
      </motion.header>

      {/* Hero Section - Compact for above-the-fold visibility */}
      <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden min-h-[calc(100vh-80px)] flex items-center">
        <div className="container mx-auto px-4 md:px-8 text-center w-full">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            {/* Hero Text */}
            <div className="mb-6 md:mb-8">
              {/* First line */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 md:mb-4 leading-tight px-4"
              >
                Portal to escape your
              </motion.div>

              {/* Second line with theme-aware shimmer */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="relative py-3 px-8 overflow-visible mb-4 md:mb-6"
              >
                <motion.h1
                  className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
                    theme === "dark"
                      ? "from-blue-600 via-purple-400 via-pink-300 via-purple-400 to-blue-600"
                      : "from-gray-300 via-white via-gray-100 via-white to-gray-300"
                  } bg-[length:300%_100%] leading-tight pb-2`}
                  style={{
                    backgroundImage:
                      theme === "dark"
                        ? "linear-gradient(90deg, #2563eb 0%, #a855f7 25%, #f9a8d4 50%, #a855f7 75%, #2563eb 100%)"
                        : "linear-gradient(90deg, #d1d5db 0%, #ffffff 25%, #f3f4f6 50%, #ffffff 75%, #d1d5db 100%)",
                  }}
                  animate={{
                    backgroundPosition: ["300% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  GAMING SHACKLES
                </motion.h1>
              </motion.div>
            </div>

            {/* Subtitle */}
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 md:mb-8 max-w-4xl mx-auto px-4 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Get instant access to your favorite gaming platforms with our digital gift cards. Fast, secure, and ready
              to use in minutes.
            </motion.p>

            {/* Feature Badges */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-wrap justify-center gap-3 md:gap-4"
            >
              <div className="flex items-center space-x-2 md:space-x-3 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 md:px-6 md:py-3">
                <Zap className={`w-5 h-5 md:w-6 md:h-6 ${theme === "dark" ? "text-blue-300" : "text-yellow-300"}`} />
                <span className="text-white font-semibold text-sm md:text-lg">Instant Delivery</span>
              </div>
              <div className="flex items-center space-x-2 md:space-x-3 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 md:px-6 md:py-3">
                <Shield className="w-5 h-5 md:w-6 md:h-6 text-green-300" />
                <span className="text-white font-semibold text-sm md:text-lg">100% Secure</span>
              </div>
              <div className="flex items-center space-x-2 md:space-x-3 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 md:px-6 md:py-3">
                <Star className={`w-5 h-5 md:w-6 md:h-6 ${theme === "dark" ? "text-purple-300" : "text-blue-300"}`} />
                <span className="text-white font-semibold text-sm md:text-lg">Best Prices</span>
              </div>
            </motion.div>

            {/* Controller CTA Card (moved here) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex justify-center mt-8"
            >
              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="cursor-pointer group"
                onClick={() => {
                  document.getElementById('popular-platforms')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  });
                }}
              >
                <div className="relative">
                  {/* Minimalist Controller CTA */}
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl border-2 border-white/30 flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                    <img 
                      src="/images/CONTROLLER_CTA.png" 
                      alt="Controller Scroll CTA" 
                      className="w-16 h-16 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                  {/* Pointing Arrow */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                    <motion.div
                      animate={{
                        y: [0, 5, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        className="text-white/80"
                      >
                        <path 
                          d="M7 10L12 15L17 10" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>


          </motion.div>
        </div>

        {/* Floating Gaming Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-white/10 text-6xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <Gamepad2 />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular Platforms */}
      <section id="popular-platforms" className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-4xl font-bold text-white mb-4">Popular Gaming Platforms</h3>
            <p className="text-white/80 text-lg">Choose from the most popular gaming platforms</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {platforms.map((game, index) => (
              <motion.div
                key={game.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="cursor-pointer"
                onClick={() => handlePlatformSelect(game.name)}
              >
                <Card
                  className={`bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 ${
                    selectedPlatform === game.name
                      ? theme === "dark"
                        ? "ring-2 ring-blue-400"
                        : "ring-2 ring-yellow-300"
                      : ""
                  }`}
                >
                  <CardContent className="p-6 text-center">
                    <div className="mb-3 flex justify-center">
                      {game.icon.startsWith('/') ? (
                        <img 
                          src={game.icon} 
                          alt={game.name} 
                          className="w-12 h-12 object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <span className="text-4xl">{game.icon}</span>
                      )}
                    </div>
                    <h4 className="font-semibold text-white mb-2">{game.name}</h4>
                    <Badge
                      variant="secondary"
                      className={theme === "dark" ? "bg-blue-400 text-blue-900" : "bg-yellow-400 text-yellow-900"}
                    >
                      {game.discount}% OFF
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gift Card Selection */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold text-white mb-4">Choose Your Amount</h3>
              <p className="text-white/80 text-lg">Select the perfect gift card value</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {giftCardAmounts.map((amount) => (
                <motion.div
                  key={amount}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer"
                  onClick={() => setSelectedAmount(amount)}
                >
                  <Card
                    className={`bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 ${
                      selectedAmount === amount
                        ? theme === "dark"
                          ? "ring-2 ring-blue-400 bg-white/20"
                          : "ring-2 ring-yellow-300 bg-white/20"
                        : ""
                    }`}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-white mb-2">${amount}</div>
                      <div className="text-white/60 text-sm">Gift Card</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                      theme === "dark"
                        ? "bg-gradient-to-br from-blue-500 to-purple-600"
                        : "bg-gradient-to-br from-yellow-400 to-orange-500"
                    }`}
                  >
                    {selectedPlatform === "Steam" ? (
                      <img 
                        src="/images/STEAM.svg" 
                        alt="Steam" 
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : selectedPlatform === "PlayStation" ? (
                      <img 
                        src="/images/PLAYSTATION.svg" 
                        alt="PlayStation" 
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : selectedPlatform === "Xbox" ? (
                      <img 
                        src="/images/XBOX.svg" 
                        alt="Xbox" 
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : selectedPlatform === "Nintendo" ? (
                      <img 
                        src="/images/NINTENDO.svg" 
                        alt="Nintendo" 
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : selectedPlatform === "Epic Games" ? (
                      <img 
                        src="/images/EPICGAMES.svg" 
                        alt="Epic Games" 
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : selectedPlatform === "Apple" ? (
                      <img 
                        src="/images/APPLE.svg" 
                        alt="Apple" 
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <Gift className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white">{selectedPlatform} Gift Card</h4>
                    <p className="text-white/80">Digital delivery in minutes</p>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <div className="text-3xl font-bold text-white mb-2">${selectedAmount}</div>
                  <Button
                    size="lg"
                    className={`font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                        : "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white"
                    }`}
                    onClick={() => setIsPurchaseModalOpen(true)}
                    disabled={isCheckingAvailability}
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    {isCheckingAvailability ? "Checking..." : "Buy Now"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-4xl font-bold text-white mb-4">Why Choose GAMAKAY Cards?</h3>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Instant Delivery",
                description: "Get your gift card codes delivered to your email within minutes of purchase.",
              },
              {
                icon: Shield,
                title: "100% Secure",
                description: "All transactions are encrypted and protected with industry-standard security.",
              },
              {
                icon: Truck,
                title: "24/7 Support",
                description: "Our customer support team is available around the clock to help you.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 h-full">
                  <CardHeader className="text-center">
                    <div
                      className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                        theme === "dark"
                          ? "bg-gradient-to-br from-blue-500 to-purple-600"
                          : "bg-gradient-to-br from-yellow-400 to-orange-500"
                      }`}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-white/80 text-center">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gift Card Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-4xl font-bold text-white mb-4">Available Gift Cards</h3>
            <p className="text-white/80 text-lg">Choose from our selection of popular gaming gift cards</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Image src="/images/gamakay-logo.jpg" alt="GAMAKAY CARDS" width={40} height={40} className="rounded-lg" />
              <div>
                <h4 className="text-white font-bold">GAMAKAY CARDS</h4>
                <p className="text-white/60 text-sm">Level up your gaming</p>
              </div>
            </div>
            <div className="text-white/60 text-sm">© 2025 GAMAKAY Cards. All rights reserved.</div>
          </div>
          
          {/* Refund Guarantee & Disclaimer */}
          <div className="border-t border-white/10 pt-6">
            <div className="text-center">
              <p className="text-white/70 text-sm font-medium mb-2">
                We offer a comprehensive refund guarantee in event of any product or service issues
              </p>
              <div className="text-white/50 text-xs max-w-4xl mx-auto leading-relaxed">
                <p className="mb-1">
                  <strong>Disclaimer:</strong> No refunds if buyer fails to check region compatibility. 
                  Receipt required before delivery (screenshot or confirmation). 
                  All sales are final. No replacements after delivery unless issues arise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <LoadingScreen
        isVisible={isLoadingPlatforms}
        title="Loading Platforms"
        messages={[
          "Fetching the best gaming platforms... 🎮",
          "Checking platform availability... ✅",
          "Loading your gaming options... 🎯",
          "Almost ready to show you the goods... 🚀",
        ]}
        duration={2000}
      />

      <LoadingScreen
        isVisible={isCheckingAvailability}
        title="Checking Availability"
        messages={[
          "Verifying platform availability... 🔍",
          "Making sure everything's ready... ⚡",
          "Just a quick check... ✨",
        ]}
        duration={1000}
      />

      <PurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        platform={selectedPlatform}
        amount={selectedAmount}
      />
    </div>
  )
}
