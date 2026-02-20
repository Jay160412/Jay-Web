"use client"

import type React from "react"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamisch importieren um Code-Splitting zu nutzen
const SnakeGame = dynamic(() => import("@/components/games/snake"), { ssr: false })
const MemoryGame = dynamic(() => import("@/components/games/memory"), { ssr: false })
const QuizGame = dynamic(() => import("@/components/games/quiz"), { ssr: false })
const TicTacToeGame = dynamic(() => import("@/components/games/tic-tac-toe"), { ssr: false })
const RunnerGame = dynamic(() => import("@/components/games/runner"), { ssr: false })
const TetrisGame = dynamic(() => import("@/components/games/tetris"), { ssr: false })
const FlappyBirdGame = dynamic(() => import("@/components/games/flappy-bird"), { ssr: false })
const BreakoutGame = dynamic(() => import("@/components/games/breakout"), { ssr: false })

const gameComponents: Record<string, React.ComponentType> = {
  snake: SnakeGame,
  memory: MemoryGame,
  quiz: QuizGame,
  "tic-tac-toe": TicTacToeGame,
  runner: RunnerGame,
  tetris: TetrisGame,
  "flappy-bird": FlappyBirdGame,
  breakout: BreakoutGame,
}

const gameNames: Record<string, string> = {
  snake: "Snake",
  memory: "Memory",
  quiz: "Quiz",
  "tic-tac-toe": "Tic Tac Toe",
  runner: "Runner",
  tetris: "Tetris",
  "flappy-bird": "Flappy Bird",
  breakout: "Breakout",
}

export default function GamePage() {
  const params = useParams()
  const router = useRouter()
  const gameId = params.gameId as string

  const GameComponent = gameComponents[gameId]
  const gameName = gameNames[gameId]

  if (!GameComponent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-4">Spiel nicht gefunden</h1>
          <p className="text-muted-foreground mb-8 text-sm sm:text-base">Das angeforderte Spiel existiert nicht.</p>
          <Button onClick={() => router.push("/games")} className="gaming-button">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zu den Spielen
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-4">
          <Button
            variant="outline"
            onClick={() => router.push("/games")}
            className="gaming-button-outline text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2"
            size="sm"
          >
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Zurück</span>
          </Button>
          <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-white">{gameName}</h1>
        </div>

        <div className="flex justify-center">
          <GameComponent />
        </div>
      </div>
    </div>
  )
}
