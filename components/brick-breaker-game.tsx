"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, RotateCcw, Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Position {
  x: number
  y: number
}

interface Ball {
  x: number
  y: number
  dx: number
  dy: number
  speed: number
}

interface Brick {
  x: number
  y: number
  width: number
  height: number
  destroyed: boolean
  type: "controller" | "card" | "powerup" | "coin" | "gem"
  points: number
  icon: string
}

interface BrickBreakerGameProps {
  autoOpen?: boolean
  onGameClose?: () => void
}

const CANVAS_WIDTH = 400
const CANVAS_HEIGHT = 500
const PADDLE_WIDTH = 80
const PADDLE_HEIGHT = 12
const BALL_SIZE = 8
const BRICK_WIDTH = 45
const BRICK_HEIGHT = 25
const BRICK_ROWS = 8
const BRICK_COLS = 8

const BRICK_TYPES = [
  { type: "controller" as const, icon: "🎮", points: 10, color: "#ff6b6b" },
  { type: "card" as const, icon: "🃏", points: 15, color: "#4ecdc4" },
  { type: "powerup" as const, icon: "⚡", points: 20, color: "#45b7d1" },
  { type: "coin" as const, icon: "🪙", points: 25, color: "#f9ca24" },
  { type: "gem" as const, icon: "💎", points: 30, color: "#6c5ce7" },
]

export function BrickBreakerGame({ autoOpen = false, onGameClose }: BrickBreakerGameProps = {}) {
  const [isOpen, setIsOpen] = useState(false)
  const [gameState, setGameState] = useState<"menu" | "playing" | "paused" | "gameOver" | "victory">("menu")
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [level, setLevel] = useState(1)
  const [isMuted, setIsMuted] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  const [paddle, setPaddle] = useState({ x: CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2, y: CANVAS_HEIGHT - 30 })
  const [ball, setBall] = useState<Ball>({
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT - 50,
    dx: 3,
    dy: -3,
    speed: 3,
  })
  const [bricks, setBricks] = useState<Brick[]>([])

  const createInitialBricks = useCallback(() => {
    const newBricks: Brick[] = []
    for (let row = 0; row < BRICK_ROWS; row++) {
      for (let col = 0; col < BRICK_COLS; col++) {
        const brickType = BRICK_TYPES[Math.floor(Math.random() * BRICK_TYPES.length)]
        newBricks.push({
          x: col * (BRICK_WIDTH + 5) + 20,
          y: row * (BRICK_HEIGHT + 5) + 50,
          width: BRICK_WIDTH,
          height: BRICK_HEIGHT,
          destroyed: false,
          type: brickType.type,
          points: brickType.points,
          icon: brickType.icon,
        })
      }
    }
    return newBricks
  }, [])

  const resetGame = useCallback(() => {
    setPaddle({ x: CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2, y: CANVAS_HEIGHT - 30 })
    setBall({
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT - 50,
      dx: 3,
      dy: -3,
      speed: 3,
    })
    setScore(0)
    setLives(3)
    setLevel(1)
    setBricks(createInitialBricks())
    setGameState("menu")
  }, [createInitialBricks])

  const startGame = useCallback(() => {
    setGameState("playing")
    setBricks(createInitialBricks())
  }, [createInitialBricks])

  const togglePause = useCallback(() => {
    if (gameState === "playing") {
      setGameState("paused")
    } else if (gameState === "paused") {
      setGameState("playing")
    }
  }, [gameState])

  const checkCollision = useCallback((rect1: any, rect2: any) => {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    )
  }, [])

  const gameLoop = useCallback(() => {
    if (gameState !== "playing") return

    setBall((prevBall) => {
      const newBall = { ...prevBall }

      // Move ball
      newBall.x += newBall.dx
      newBall.y += newBall.dy

      // Wall collisions
      if (newBall.x <= 0 || newBall.x >= CANVAS_WIDTH - BALL_SIZE) {
        newBall.dx = -newBall.dx
      }
      if (newBall.y <= 0) {
        newBall.dy = -newBall.dy
      }

      // Paddle collision
      if (
        checkCollision(
          { x: newBall.x, y: newBall.y, width: BALL_SIZE, height: BALL_SIZE },
          { x: paddle.x, y: paddle.y, width: PADDLE_WIDTH, height: PADDLE_HEIGHT },
        )
      ) {
        newBall.dy = -Math.abs(newBall.dy)
        // Add some angle based on where ball hits paddle
        const hitPos = (newBall.x - paddle.x) / PADDLE_WIDTH
        newBall.dx = (hitPos - 0.5) * 6
      }

      // Ball out of bounds
      if (newBall.y > CANVAS_HEIGHT) {
        setLives((prevLives) => {
          const newLives = Math.max(0, prevLives - 1)
          if (newLives <= 0) {
            setGameState("gameOver")
          } else {
            // Reset ball position
            setTimeout(() => {
              setBall({
                x: CANVAS_WIDTH / 2,
                y: CANVAS_HEIGHT - 50,
                dx: 3 + level * 0.5,
                dy: -3 - level * 0.5,
                speed: 3 + level * 0.5,
              })
            }, 100)
          }
          return newLives
        })
      }

      return newBall
    })

    // Brick collisions
    setBricks((prevBricks) => {
      const newBricks = [...prevBricks]
      let scoreIncrease = 0

      for (let i = 0; i < newBricks.length; i++) {
        const brick = newBricks[i]
        if (!brick.destroyed && checkCollision({ x: ball.x, y: ball.y, width: BALL_SIZE, height: BALL_SIZE }, brick)) {
          brick.destroyed = true
          scoreIncrease += brick.points
          setBall((prevBall) => ({
            ...prevBall,
            dy: -prevBall.dy,
          }))
          break
        }
      }

      if (scoreIncrease > 0) {
        setScore((prev) => {
          const newScore = prev + scoreIncrease
          if (newScore > highScore) {
            setHighScore(newScore)
          }
          return newScore
        })
      }

      // Check victory
      const remainingBricks = newBricks.filter((b) => !b.destroyed)
      if (remainingBricks.length === 0) {
        setGameState("victory")
        setLevel((prev) => prev + 1)
      }

      return newBricks
    })
  }, [gameState, paddle, ball, level, checkCollision, highScore])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas with gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT)
    gradient.addColorStop(0, "#ff9a56")
    gradient.addColorStop(0.5, "#ffad56")
    gradient.addColorStop(1, "#ffc048")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    // Draw paddle with glow
    ctx.shadowColor = "#ffd700"
    ctx.shadowBlur = 15
    ctx.fillStyle = "#ffd700"
    ctx.fillRect(paddle.x, paddle.y, PADDLE_WIDTH, PADDLE_HEIGHT)
    ctx.shadowBlur = 0

    // Draw ball with glow
    ctx.shadowColor = "#ffffff"
    ctx.shadowBlur = 10
    ctx.beginPath()
    ctx.arc(ball.x + BALL_SIZE / 2, ball.y + BALL_SIZE / 2, BALL_SIZE / 2, 0, Math.PI * 2)
    ctx.fillStyle = "#ffffff"
    ctx.fill()
    ctx.shadowBlur = 0

    // Draw bricks
    bricks.forEach((brick) => {
      if (!brick.destroyed) {
        const brickType = BRICK_TYPES.find((t) => t.type === brick.type)
        if (brickType) {
          // Brick background
          ctx.fillStyle = brickType.color
          ctx.fillRect(brick.x, brick.y, brick.width, brick.height)

          // Brick border
          ctx.strokeStyle = "#ffffff40"
          ctx.lineWidth = 1
          ctx.strokeRect(brick.x, brick.y, brick.width, brick.height)

          // Icon
          ctx.font = "16px Arial"
          ctx.textAlign = "center"
          ctx.fillStyle = "#ffffff"
          ctx.fillText(brick.icon, brick.x + brick.width / 2, brick.y + brick.height / 2 + 6)
        }
      }
    })
  }, [paddle, ball, bricks])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (gameState !== "playing") return

      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const scaleX = CANVAS_WIDTH / rect.width
      const adjustedX = x * scaleX
      const newX = Math.max(0, Math.min(CANVAS_WIDTH - PADDLE_WIDTH, adjustedX - PADDLE_WIDTH / 2))
      setPaddle((prev) => ({ ...prev, x: newX }))
    },
    [gameState],
  )

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === " ") {
        e.preventDefault()
        togglePause()
      }
    },
    [isOpen, togglePause],
  )

  const handleClose = useCallback(() => {
    setIsOpen(false)
    setGameState("menu")
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    if (onGameClose) {
      onGameClose()
    }
  }, [onGameClose])

  // Game loop effect
  useEffect(() => {
    if (gameState === "playing") {
      const animate = () => {
        gameLoop()
        draw()
        animationRef.current = requestAnimationFrame(animate)
      }
      animationRef.current = requestAnimationFrame(animate)
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      draw()
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [gameState, gameLoop, draw])

  // Keyboard event listener
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKeyPress)
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [handleKeyPress, isOpen])

  // Load high score
  useEffect(() => {
    const saved = localStorage.getItem("gamakay-breaker-high-score")
    if (saved) {
      setHighScore(Number.parseInt(saved))
    }
  }, [])

  // Save high score
  useEffect(() => {
    if (highScore > 0) {
      localStorage.setItem("gamakay-breaker-high-score", highScore.toString())
    }
  }, [highScore])

  // Initialize game on mount
  useEffect(() => {
    setBricks(createInitialBricks())
  }, [createInitialBricks])

  useEffect(() => {
    if (autoOpen) {
      setIsOpen(true)
    }
  }, [autoOpen])

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="relative w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="text-white text-lg"
        >
          🧱
        </motion.div>
        <span className="sr-only">Play Brick Breaker</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
            onClick={handleClose}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100vh",
              minHeight: "100dvh",
              padding: "1rem",
              background: "radial-gradient(ellipse at center, rgba(255, 154, 86, 0.1) 0%, rgba(0, 0, 0, 0.95) 70%)",
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="relative bg-black/90 border-2 border-orange-400/30 rounded-2xl p-4 w-full max-w-lg backdrop-blur-md"
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow: "0 0 40px rgba(255, 154, 86, 0.2), inset 0 0 40px rgba(255, 154, 86, 0.05)",
                maxHeight: "95vh",
                maxHeight: "95dvh",
                overflowY: "auto",
              }}
            >
              {/* Close Button */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-3 top-3 text-orange-400 hover:text-orange-300 z-10 bg-black/50 hover:bg-black/70 border border-orange-400/30"
                onClick={handleClose}
              >
                <X className="w-4 h-4" />
              </Button>

              {/* Header */}
              <div className="text-center mb-4">
                <motion.div
                  className="flex items-center justify-center mb-4"
                  animate={{
                    filter: [
                      "drop-shadow(0 0 10px rgba(255, 154, 86, 0.5))",
                      "drop-shadow(0 0 20px rgba(255, 154, 86, 0.8))",
                      "drop-shadow(0 0 10px rgba(255, 154, 86, 0.5))",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <div className="text-4xl mr-3">🧱</div>
                  <h2 className="text-2xl font-bold text-orange-400 tracking-wider font-mono">BRICK BREAKER</h2>
                  <div className="text-4xl ml-3">⚡</div>
                </motion.div>

                <div className="grid grid-cols-4 gap-2 text-sm bg-black/50 rounded-xl p-3 border border-orange-400/20">
                  <div className="text-center">
                    <div className="text-orange-400 font-bold">SCORE</div>
                    <div className="text-white font-mono text-base">{score.toString().padStart(4, "0")}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-orange-400 font-bold">LEVEL</div>
                    <div className="text-white font-mono text-base">{level}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-orange-400 font-bold">LIVES</div>
                    <div className="text-white font-mono text-base">{"❤️".repeat(Math.max(0, lives))}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-orange-400 font-bold">HIGH</div>
                    <div className="text-white font-mono text-base">{highScore.toString().padStart(4, "0")}</div>
                  </div>
                </div>
              </div>

              {/* Game Canvas */}
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <canvas
                    ref={canvasRef}
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                    className="border-2 border-orange-400/40 rounded-lg cursor-none"
                    onMouseMove={handleMouseMove}
                    style={{
                      width: "min(400px, 85vw)",
                      height: "min(500px, 60vh)",
                      background: "linear-gradient(135deg, #ff9a56, #ffad56, #ffc048)",
                      boxShadow: "inset 0 0 30px rgba(255, 154, 86, 0.2)",
                    }}
                  />

                  {/* Game State Overlays */}
                  {gameState === "menu" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg"
                    >
                      <div className="text-center">
                        <motion.div
                          className="text-orange-400 text-3xl font-bold mb-4"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                        >
                          🎮 READY TO PLAY? 🎮
                        </motion.div>
                        <div className="text-white/80 mb-6">Break all the gaming bricks!</div>
                        <Button
                          onClick={startGame}
                          className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg px-8 py-3 rounded-xl shadow-lg"
                        >
                          <Play className="w-6 h-6 mr-2" />
                          START GAME
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {gameState === "paused" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg"
                    >
                      <div className="text-center">
                        <Pause className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                        <div className="text-orange-400 text-2xl font-bold mb-2">PAUSED</div>
                        <div className="text-white/80">Press SPACE to continue</div>
                      </div>
                    </motion.div>
                  )}

                  {gameState === "gameOver" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-black/90 flex items-center justify-center rounded-lg border-2 border-red-500/50"
                    >
                      <div className="text-center">
                        <motion.div
                          className="text-red-400 text-3xl font-bold mb-4"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 0.5, repeat: 3 }}
                        >
                          GAME OVER
                        </motion.div>
                        <div className="text-orange-400 mb-2 text-xl">Final Score: {score}</div>
                        <div className="text-white/80 mb-6 text-lg">Level Reached: {level}</div>
                        <Button
                          onClick={resetGame}
                          className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-base px-6 py-2 rounded-xl shadow-lg"
                        >
                          <RotateCcw className="w-5 h-5 mr-2" />
                          PLAY AGAIN
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {gameState === "victory" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-black/90 flex items-center justify-center rounded-lg border-2 border-green-500/50"
                    >
                      <div className="text-center">
                        <motion.div
                          className="text-green-400 text-3xl font-bold mb-4"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.5, repeat: 5 }}
                        >
                          🎉 LEVEL COMPLETE! 🎉
                        </motion.div>
                        <div className="text-orange-400 mb-2 text-xl">Score: {score}</div>
                        <div className="text-white/80 mb-6 text-lg">Next Level: {level}</div>
                        <Button
                          onClick={startGame}
                          className="bg-green-500 hover:bg-green-600 text-white font-bold text-base px-6 py-2 rounded-xl shadow-lg"
                        >
                          <Play className="w-5 h-5 mr-2" />
                          NEXT LEVEL
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-2 gap-4">
                {/* Game Controls */}
                <div className="text-center">
                  {gameState === "playing" && (
                    <Button
                      onClick={togglePause}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold mb-4 text-lg px-6 py-3 rounded-xl shadow-lg"
                    >
                      <Pause className="w-6 h-6 mr-2" />
                      PAUSE
                    </Button>
                  )}

                  <div className="text-orange-400 text-sm space-y-1">
                    <div className="font-bold">CONTROLS</div>
                    <div className="text-white/80">Mouse: Move Paddle</div>
                    <div className="text-white/80">Spacebar: Pause</div>
                  </div>
                </div>

                {/* Audio Controls */}
                <div className="text-center">
                  <Button
                    onClick={() => setIsMuted(!isMuted)}
                    className="bg-orange-500/20 hover:bg-orange-500/40 text-orange-400 font-bold mb-4 text-lg px-6 py-3 rounded-xl border border-orange-400/60"
                  >
                    {isMuted ? <VolumeX className="w-6 h-6 mr-2" /> : <Volume2 className="w-6 h-6 mr-2" />}
                    {isMuted ? "UNMUTE" : "MUTE"}
                  </Button>

                  <div className="text-orange-400 text-sm space-y-1">
                    <div className="font-bold">BRICK VALUES</div>
                    <div className="text-white/80">🎮 10pts • 🃏 15pts</div>
                    <div className="text-white/80">⚡ 20pts • 🪙 25pts • 💎 30pts</div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center mt-6 pt-4 border-t border-orange-400/20">
                <div className="text-orange-400/60 text-xs">
                  Break all bricks to advance • Each level increases speed • Click outside to close
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
