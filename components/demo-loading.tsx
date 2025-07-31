"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import LoadingScreen from "./loading-screen"

export default function DemoLoading() {
  const [showLoading, setShowLoading] = useState(false)

  const handleStartLoading = () => {
    setShowLoading(true)
  }

  const handleLoadingComplete = () => {
    setShowLoading(false)
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <Button
        onClick={handleStartLoading}
        className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold shadow-lg"
      >
        Demo Loading Screen
      </Button>

      <LoadingScreen isVisible={showLoading} onComplete={handleLoadingComplete} duration={5000} />
    </div>
  )
}
