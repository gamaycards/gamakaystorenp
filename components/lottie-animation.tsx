"use client"

import { useEffect, useRef } from 'react'
import Lottie from 'lottie-react'

interface LottieAnimationProps {
  animationData: any
  loop?: boolean
  autoplay?: boolean
  className?: string
  style?: React.CSSProperties
  onComplete?: () => void
}

export default function LottieAnimation({
  animationData,
  loop = true,
  autoplay = true,
  className = "",
  style = {},
  onComplete
}: LottieAnimationProps) {
  const lottieRef = useRef<any>(null)

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.play()
    }
  }, [])

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      className={className}
      style={style}
      onComplete={onComplete}
    />
  )
}
