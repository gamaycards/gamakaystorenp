"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, RotateCcw, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Position {
  x: number
  y: number
}

// Add new props to the SnakeGame component
interface SnakeGameProps {
  autoOpen?: boolean
  onGameClose?: () => void
}

const GRID_SIZE = 20
const INITIAL_SNAKE = [{ x: 10, y: 10 }]
const INITIAL_FOOD = { x: 15, y: 15 }
const INITIAL_DIRECTION = { x: 0, y: -1 }
const BASE_SPEED = 200
const SPEED_INCREASE = 10

// Update the component declaration:
export function SnakeGame({ autoOpen = false, onGameClose }: SnakeGameProps = {}) {
  const [isOpen, setIsOpen] = useState(false)
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE)
  const [food, setFood] = useState<Position>(INITIAL_FOOD)
  const [direction, setDirection] = useState<Position>(INITIAL_DIRECTION)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [highScore, setHighScore] = useState(0)
  const [gameSpeed, setGameSpeed] = useState(BASE_SPEED)
  const [level, setLevel] = useState(1)

  const generateFood = useCallback(() => {
    let newFood
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      }
    } while (snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y))
    return newFood
  }, [snake])

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE)
    setFood(INITIAL_FOOD)
    setDirection(INITIAL_DIRECTION)
    setGameOver(false)
    setScore(0)
    setIsPlaying(false)
    setIsPaused(false)
    setGameSpeed(BASE_SPEED)
    setLevel(1)
  }, [])

  const startGame = useCallback(() => {
    resetGame()
    setIsPlaying(true)
  }, [resetGame])

  const togglePause = useCallback(() => {
    if (isPlaying && !gameOver) {
      setIsPaused((prev) => !prev)
    }
  }, [isPlaying, gameOver])

  const moveSnake = useCallback(() => {
    if (!isPlaying || gameOver || isPaused) return

    setSnake((currentSnake) => {
      const newSnake = [...currentSnake]
      const head = { ...newSnake[0] }

      head.x += direction.x
      head.y += direction.y

      // Check wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true)
        setIsPlaying(false)
        return currentSnake
      }

      // Check self collision
      if (newSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true)
        setIsPlaying(false)
        return currentSnake
      }

      newSnake.unshift(head)

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => {
          const newScore = prev + 10
          if (newScore > highScore) {
            setHighScore(newScore)
          }
          // Increase difficulty every 50 points
          if (newScore % 50 === 0) {
            setLevel(Math.floor(newScore / 50) + 1)
            setGameSpeed((prevSpeed) => Math.max(80, prevSpeed - SPEED_INCREASE))
          }
          return newScore
        })
        setFood(generateFood())
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [direction, food, gameOver, isPlaying, isPaused, generateFood, highScore])

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return

      // Prevent default scrolling behavior
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault()
      }

      if (e.key === " ") {
        togglePause()
        return
      }

      if (!isPlaying || isPaused) return

      switch (e.key) {
        case "ArrowUp":
          if (direction.y !== 1) setDirection({ x: 0, y: -1 })
          break
        case "ArrowDown":
          if (direction.y !== -1) setDirection({ x: 0, y: 1 })
          break
        case "ArrowLeft":
          if (direction.x !== 1) setDirection({ x: -1, y: 0 })
          break
        case "ArrowRight":
          if (direction.x !== -1) setDirection({ x: 1, y: 0 })
          break
      }
    },
    [direction, isPlaying, isPaused, isOpen, togglePause],
  )

  const handleDirectionClick = useCallback(
    (newDirection: Position) => {
      if (!isPlaying || isPaused) return

      // Prevent reverse direction
      if (newDirection.x === -direction.x && newDirection.y === -direction.y) return

      setDirection(newDirection)
    },
    [direction, isPlaying, isPaused],
  )

  // Update the handleClose function to call onGameClose:
  const handleClose = useCallback(() => {
    setIsOpen(false)
    setIsPlaying(false)
    resetGame()
    if (onGameClose) {
      onGameClose()
    }
  }, [resetGame, onGameClose])

  // Add useEffect to auto-open when autoOpen is true:
  useEffect(() => {
    if (autoOpen) {
      setIsOpen(true)
    }
  }, [autoOpen])

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, gameSpeed)
    return () => clearInterval(gameInterval)
  }, [moveSnake, gameSpeed])

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

  useEffect(() => {
    const saved = localStorage.getItem("gamakay-snake-high-score")
    if (saved) {
      setHighScore(Number.parseInt(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("gamakay-snake-high-score", highScore.toString())
  }, [highScore])

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="relative w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="text-white text-lg"
        >
          🕹️
        </motion.div>
        <span className="sr-only">Play Snake Game</span>
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
              background: "radial-gradient(ellipse at center, rgba(255, 215, 0, 0.05) 0%, rgba(0, 0, 0, 0.95) 70%)",
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="relative bg-black/90 border-2 border-yellow-400/30 rounded-2xl p-4 w-full max-w-lg backdrop-blur-md"
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow: "0 0 40px rgba(255, 215, 0, 0.2), inset 0 0 40px rgba(255, 215, 0, 0.05)",
                maxHeight: "95vh",
                maxHeight: "95dvh",
                overflowY: "auto",
              }}
            >
              {/* Close Button */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-3 top-3 text-yellow-400 hover:text-yellow-300 z-10 bg-black/50 hover:bg-black/70 border border-yellow-400/30"
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
                      "drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))",
                      "drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))",
                      "drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <div className="text-4xl mr-3">🐍</div>
                  <h2 className="text-2xl font-bold text-yellow-400 tracking-wider font-mono">GAMAKAY SNAKE</h2>
                  <div className="text-4xl ml-3">🎮</div>
                </motion.div>

                <div className="grid grid-cols-3 gap-4 text-sm bg-black/50 rounded-xl p-3 border border-yellow-400/20">
                  <div className="text-center">
                    <div className="text-yellow-400 font-bold">SCORE</div>
                    <div className="text-white font-mono text-base">{score.toString().padStart(4, "0")}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-yellow-400 font-bold">LEVEL</div>
                    <div className="text-white font-mono text-base">{level}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-yellow-400 font-bold">HIGH</div>
                    <div className="text-white font-mono text-base">{highScore.toString().padStart(4, "0")}</div>
                  </div>
                </div>
              </div>

              {/* Game Board */}
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div
                    className="relative bg-black border-2 border-yellow-400/40 rounded-lg overflow-hidden"
                    style={{
                      width: "min(320px, 70vw)",
                      height: "min(320px, 70vw)",
                      aspectRatio: "1",
                      background: `
                        radial-gradient(circle at center, rgba(255, 215, 0, 0.02) 0%, transparent 50%),
                        linear-gradient(rgba(255, 215, 0, 0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 215, 0, 0.05) 1px, transparent 1px)
                      `,
                      backgroundSize: "100% 100%, 5% 5%, 5% 5%",
                      boxShadow: "inset 0 0 30px rgba(255, 215, 0, 0.1)",
                    }}
                  >
                    {/* Snake */}
                    {snake.map((segment, index) => (
                      <motion.div
                        key={index}
                        className="absolute rounded-sm"
                        style={{
                          left: `${(segment.x / GRID_SIZE) * 100}%`,
                          top: `${(segment.y / GRID_SIZE) * 100}%`,
                          width: `${100 / GRID_SIZE}%`,
                          height: `${100 / GRID_SIZE}%`,
                          background:
                            index === 0
                              ? "linear-gradient(45deg, #ffd700, #ffffff, #ffd700)"
                              : "linear-gradient(45deg, #ffd700, #ffed4e)",
                          boxShadow:
                            index === 0
                              ? "0 0 15px rgba(255, 215, 0, 0.8), inset 0 0 10px rgba(255, 255, 255, 0.3)"
                              : "0 0 10px rgba(255, 215, 0, 0.6)",
                          border: "1px solid rgba(255, 255, 255, 0.3)",
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {index === 0 && (
                          <div className="w-full h-full flex items-center justify-center">
                            <motion.div
                              className="text-black text-xs font-bold"
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            >
                              ●
                            </motion.div>
                          </div>
                        )}
                      </motion.div>
                    ))}

                    {/* Food */}
                    <motion.div
                      className="absolute rounded-full flex items-center justify-center"
                      style={{
                        left: `${(food.x / GRID_SIZE) * 100}%`,
                        top: `${(food.y / GRID_SIZE) * 100}%`,
                        width: `${100 / GRID_SIZE}%`,
                        height: `${100 / GRID_SIZE}%`,
                        background: "radial-gradient(circle, #ff6b6b, #ff4757)",
                        boxShadow: "0 0 20px rgba(255, 107, 107, 0.8)",
                        border: "2px solid rgba(255, 255, 255, 0.4)",
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        boxShadow: [
                          "0 0 15px rgba(255, 107, 107, 0.6)",
                          "0 0 25px rgba(255, 107, 107, 1)",
                          "0 0 15px rgba(255, 107, 107, 0.6)",
                        ],
                      }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <motion.div
                        className="text-white text-xs font-bold"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        ◆
                      </motion.div>
                    </motion.div>

                    {/* Pause Overlay */}
                    {isPaused && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg"
                      >
                        <div className="text-center">
                          <Pause className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                          <div className="text-yellow-400 text-2xl font-bold mb-2">PAUSED</div>
                          <div className="text-white/80">Press SPACE to continue</div>
                        </div>
                      </motion.div>
                    )}

                    {/* Game Over Overlay */}
                    {gameOver && (
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
                          <div className="text-yellow-400 mb-2 text-xl">Final Score: {score}</div>
                          <div className="text-white/80 mb-6 text-lg">Level Reached: {level}</div>
                          <Button
                            onClick={startGame}
                            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-base px-6 py-2 rounded-xl shadow-lg"
                          >
                            <RotateCcw className="w-5 h-5 mr-2" />
                            RESTART
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Game Controls */}
                <div className="text-center">
                  {!isPlaying && !gameOver && (
                    <Button
                      onClick={startGame}
                      className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold mb-4 text-lg px-6 py-3 rounded-xl shadow-lg"
                    >
                      <Play className="w-6 h-6 mr-2" />
                      START GAME
                    </Button>
                  )}

                  {isPlaying && !gameOver && (
                    <Button
                      onClick={togglePause}
                      className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold mb-4 text-lg px-6 py-3 rounded-xl shadow-lg"
                    >
                      {isPaused ? <Play className="w-6 h-6 mr-2" /> : <Pause className="w-6 h-6 mr-2" />}
                      {isPaused ? "RESUME" : "PAUSE"}
                    </Button>
                  )}

                  <div className="text-yellow-400 text-sm space-y-1">
                    <div className="font-bold">KEYBOARD CONTROLS</div>
                    <div className="text-white/80">Arrow Keys: Move</div>
                    <div className="text-white/80">Spacebar: Pause/Resume</div>
                  </div>
                </div>

                {/* Virtual Joystick */}
                <div className="flex flex-col items-center">
                  <div className="text-yellow-400 text-sm font-bold mb-3">VIRTUAL JOYSTICK</div>
                  <div className="relative">
                    {/* Joystick Base */}
                    <div className="w-32 h-32 rounded-full border-4 border-yellow-400/40 bg-black/50 relative flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full border-2 border-yellow-400/20 bg-black/30 relative">
                        {/* Direction Buttons - Positioned outside the inner circle */}
                        <button
                          onClick={() => handleDirectionClick({ x: 0, y: -1 })}
                          className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-yellow-500/20 hover:bg-yellow-500/40 border-2 border-yellow-400/60 rounded-full flex items-center justify-center text-yellow-400 font-bold transition-all duration-200 hover:scale-110"
                          disabled={!isPlaying || isPaused}
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => handleDirectionClick({ x: 0, y: 1 })}
                          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-yellow-500/20 hover:bg-yellow-500/40 border-2 border-yellow-400/60 rounded-full flex items-center justify-center text-yellow-400 font-bold transition-all duration-200 hover:scale-110"
                          disabled={!isPlaying || isPaused}
                        >
                          ↓
                        </button>
                        <button
                          onClick={() => handleDirectionClick({ x: -1, y: 0 })}
                          className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-yellow-500/20 hover:bg-yellow-500/40 border-2 border-yellow-400/60 rounded-full flex items-center justify-center text-yellow-400 font-bold transition-all duration-200 hover:scale-110"
                          disabled={!isPlaying || isPaused}
                        >
                          ←
                        </button>
                        <button
                          onClick={() => handleDirectionClick({ x: 1, y: 0 })}
                          className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-yellow-500/20 hover:bg-yellow-500/40 border-2 border-yellow-400/60 rounded-full flex items-center justify-center text-yellow-400 font-bold transition-all duration-200 hover:scale-110"
                          disabled={!isPlaying || isPaused}
                        >
                          →
                        </button>

                        {/* Center indicator */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div
                            className="w-6 h-6 bg-yellow-400 rounded-full"
                            animate={{
                              boxShadow: [
                                "0 0 10px rgba(255, 215, 0, 0.5)",
                                "0 0 20px rgba(255, 215, 0, 1)",
                                "0 0 10px rgba(255, 215, 0, 0.5)",
                              ],
                            }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center mt-6 pt-4 border-t border-yellow-400/20">
                <div className="text-yellow-400/60 text-xs">
                  Speed increases every 50 points • Click outside or press ESC to close
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
