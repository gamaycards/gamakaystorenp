"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function ShimmerText() {
  const { theme } = useTheme()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-8">
      <div className="relative">
        {/* Main shimmer text - theme aware */}
        <motion.h1
          className={`text-6xl md:text-8xl lg:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
            theme === "dark" ? "from-yellow-600 via-yellow-200 to-yellow-600" : "from-gray-300 via-white to-gray-300"
          } bg-[length:200%_100%]`}
          style={{
            backgroundImage:
              theme === "dark"
                ? "linear-gradient(90deg, #d97706 0%, #fbbf24 25%, #ffffff 50%, #fbbf24 75%, #d97706 100%)"
                : "linear-gradient(90deg, #d1d5db 0%, #ffffff 25%, #ffffff 50%, #ffffff 75%, #d1d5db 100%)",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "200% 50%"],
          }}
          transition={{
            duration: theme === "dark" ? 2.5 : 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          gaming shackles
        </motion.h1>

        {/* Theme-aware glow effect */}
        <motion.div
          className={`absolute inset-0 text-6xl md:text-8xl lg:text-9xl font-bold bg-clip-text text-transparent ${
            theme === "dark"
              ? "bg-gradient-to-r from-yellow-600/30 via-white/50 to-yellow-600/30"
              : "bg-gradient-to-r from-gray-400/30 via-white/50 to-gray-400/30"
          } bg-[length:150%_100%] blur-sm`}
          style={{
            backgroundImage:
              theme === "dark"
                ? "linear-gradient(90deg, transparent 0%, rgba(255,215,0,0.4) 50%, transparent 100%)"
                : "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
          }}
          animate={{
            backgroundPosition: ["-50% 50%", "150% 50%"],
          }}
          transition={{
            duration: theme === "dark" ? 2.5 : 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.1,
          }}
        >
          gaming shackles
        </motion.div>
      </div>

      {/* Alternative versions for comparison */}
      <div className="absolute top-8 left-8 space-y-8">
        {/* Version 1: Simple shimmer */}
        <div className="relative">
          <motion.h2
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400 bg-[length:200%_100%]"
            animate={{
              backgroundPosition: ["0% 50%", "200% 50%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            gaming shackles
          </motion.h2>
          <p className="text-gray-400 text-sm mt-1">Simple Linear Shimmer</p>
        </div>

        {/* Version 2: Rainbow shimmer */}
        <div className="relative">
          <motion.h2
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 bg-[length:300%_100%]"
            animate={{
              backgroundPosition: ["0% 50%", "300% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            gaming shackles
          </motion.h2>
          <p className="text-gray-400 text-sm mt-1">Rainbow Shimmer</p>
        </div>

        {/* Version 3: Gold shimmer */}
        <div className="relative">
          <motion.h2
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 via-yellow-200 to-yellow-600 bg-[length:200%_100%]"
            animate={{
              backgroundPosition: ["0% 50%", "200% 50%"],
            }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            gaming shackles
          </motion.h2>
          <p className="text-gray-400 text-sm mt-1">Gold Shimmer</p>
        </div>

        {/* Version 4: ChatGPT-style */}
        <div className="relative">
          <motion.h2
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-[length:200%_100%]"
            animate={{
              backgroundPosition: ["0% 50%", "200% 50%"],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            gaming shackles
          </motion.h2>
          <p className="text-gray-400 text-sm mt-1">ChatGPT Style</p>
        </div>
      </div>
    </div>
  )
}
