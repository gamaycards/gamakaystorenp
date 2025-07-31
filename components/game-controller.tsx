"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Gamepad2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SnakeGame } from "./snake-game"
import { BrickBreakerGame } from "./brick-breaker-game"

interface Game {
  id: string
  name: string
  description: string
  icon: string
  color: string
  component: React.ComponentType<any>
}

const GAMES: Game[] = [
  {
    id: "snake",
    name: "GAMAKAY Snake",
    description: "Classic snake game with retro GAMAKAY styling and neon effects",
    icon: "🐍",
    color: "from-yellow-500 to-orange-500",
    component: SnakeGame,
  },
  {
    id: "brick-breaker",
    name: "Brick Breaker",
    description: "Break gaming-themed bricks with modern twist and power-ups",
    icon: "🧱",
    color: "from-orange-500 to-red-500",
    component: BrickBreakerGame,
  },
]

export function GameController() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game)
    setIsMenuOpen(false)
  }

  const handleCloseGame = () => {
    setSelectedGame(null)
  }

  const handleCloseMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Controller Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsMenuOpen(true)}
        className="relative w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
      >
        <motion.div
          animate={{
            rotate: [0, -5, 5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="text-white"
        >
          <Gamepad2 className="w-5 h-5" />
        </motion.div>
        <span className="sr-only">Open Game Menu</span>
      </Button>

      {/* Game Selection Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
            onClick={handleCloseMenu}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100dvh",
              padding: "1rem",
              background: "radial-gradient(ellipse at center, rgba(255, 215, 0, 0.1) 0%, rgba(0, 0, 0, 0.95) 70%)",
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="relative bg-black/90 border-2 border-yellow-400/30 rounded-2xl p-6 w-full max-w-2xl backdrop-blur-md"
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow: "0 0 40px rgba(255, 215, 0, 0.2), inset 0 0 40px rgba(255, 215, 0, 0.05)",
                maxHeight: "95dvh",
                overflowY: "auto",
              }}
            >
              {/* Close Button */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-3 top-3 text-yellow-400 hover:text-yellow-300 z-10 bg-black/50 hover:bg-black/70 border border-yellow-400/30"
                onClick={handleCloseMenu}
              >
                <X className="w-4 h-4" />
              </Button>

              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  className="flex items-center justify-center mb-6"
                  animate={{
                    filter: [
                      "drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))",
                      "drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))",
                      "drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Gamepad2 className="w-12 h-12 text-yellow-400 mr-4" />
                  <h2 className="text-4xl font-bold text-yellow-400 tracking-wider font-mono">GAME ARCADE</h2>
                  <Gamepad2 className="w-12 h-12 text-yellow-400 ml-4" />
                </motion.div>
                <p className="text-white/80 text-lg">Choose your gaming adventure</p>
              </div>

              {/* Game Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {GAMES.map((game, index) => (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="cursor-pointer"
                    onClick={() => handleGameSelect(game)}
                  >
                    <Card className="bg-black/60 border-2 border-yellow-400/30 hover:border-yellow-400/60 transition-all duration-300 h-full backdrop-blur-sm">
                      <CardHeader className="text-center pb-4">
                        <div className="relative mb-4">
                          <motion.div
                            className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center mx-auto shadow-2xl`}
                            animate={{
                              boxShadow: [
                                "0 0 20px rgba(255, 215, 0, 0.3)",
                                "0 0 30px rgba(255, 215, 0, 0.6)",
                                "0 0 20px rgba(255, 215, 0, 0.3)",
                              ],
                            }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          >
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
                          </motion.div>

                          {/* Floating particles */}
                          <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            {[...Array(3)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-yellow-400/60 rounded-full"
                                style={{
                                  left: `${20 + i * 30}%`,
                                  top: `${20 + i * 20}%`,
                                }}
                                animate={{
                                  y: [0, -10, 0],
                                  opacity: [0.3, 0.8, 0.3],
                                  scale: [1, 1.5, 1],
                                }}
                                transition={{
                                  duration: 2 + i * 0.5,
                                  repeat: Number.POSITIVE_INFINITY,
                                  delay: i * 0.3,
                                }}
                              />
                            ))}
                          </div>
                        </div>

                        <CardTitle className="text-yellow-400 text-xl font-bold tracking-wide">{game.name}</CardTitle>
                      </CardHeader>

                      <CardContent className="text-center">
                        <CardDescription className="text-white/70 text-sm leading-relaxed mb-6">
                          {game.description}
                        </CardDescription>

                        <motion.div
                          className={`inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r ${game.color} text-white font-bold text-sm shadow-lg`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {game.icon.startsWith('/') ? (
                            <img 
                              src={game.icon} 
                              alt={game.name} 
                              className="w-4 h-4 mr-2 object-contain"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          ) : (
                            <span className="mr-2">{game.icon}</span>
                          )}
                          PLAY NOW
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Coming Soon Section */}
              <div className="mt-8 pt-6 border-t border-yellow-400/20">
                <div className="text-center">
                  <h3 className="text-yellow-400/60 text-lg font-bold mb-4">🚀 COMING SOON</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: "Tetris", icon: "🧩" },
                      { name: "Pac-Man", icon: "👻" },
                      { name: "Space Invaders", icon: "👾" },
                      { name: "Pong", icon: "🏓" },
                    ].map((game, index) => (
                      <motion.div
                        key={game.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                        className="bg-black/40 border border-yellow-400/20 rounded-lg p-3 text-center"
                      >
                        <div className="text-2xl mb-1 opacity-50">{game.icon}</div>
                        <div className="text-white/40 text-xs font-medium">{game.name}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center mt-6 pt-4 border-t border-yellow-400/20">
                <div className="text-yellow-400/60 text-xs">
                  🎮 Retro gaming meets modern design • More games coming soon! • Click outside to close
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render Selected Game */}
      {selectedGame && (
        <div style={{ display: "none" }}>
          {/* This is a hack to render the game component and trigger its modal */}
          <selectedGame.component key={selectedGame.id} />
        </div>
      )}

      {/* Game Components with Modified Props */}
      <GameRenderer selectedGame={selectedGame} onClose={handleCloseGame} />
    </>
  )
}

// Helper component to render games
function GameRenderer({ selectedGame, onClose }: { selectedGame: Game | null; onClose: () => void }) {
  if (!selectedGame) return null

  // We need to programmatically open the selected game
  if (selectedGame.id === "snake") {
    return <SnakeGameWrapper onClose={onClose} />
  } else if (selectedGame.id === "brick-breaker") {
    return <BrickBreakerGameWrapper onClose={onClose} />
  }

  return null
}

// Wrapper components to auto-open games
function SnakeGameWrapper({ onClose }: { onClose: () => void }) {
  return <SnakeGame autoOpen onGameClose={onClose} />
}

function BrickBreakerGameWrapper({ onClose }: { onClose: () => void }) {
  return <BrickBreakerGame autoOpen onGameClose={onClose} />
}
