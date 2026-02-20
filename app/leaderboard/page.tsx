"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Trophy, Medal, Award, Crown, Globe, Smartphone, RefreshCw } from "lucide-react"
import { getAllHighscores, getGlobalHighscores } from "@/lib/auth"

interface HighscoreEntry {
  username: string
  score: number
  game?: string
  timestamp?: string
}

interface GameHighscores {
  [gameId: string]: HighscoreEntry[]
}

const gameNames: { [key: string]: string } = {
  tictactoe: "Tic Tac Toe",
  snake: "Snake",
  memory: "Memory",
  runner: "Runner",
  quiz: "Quiz",
  tetris: "Tetris",
  flappybird: "Flappy Bird",
  breakout: "Breakout",
}

export default function LeaderboardPage() {
  const [localHighscores, setLocalHighscores] = useState<GameHighscores>({})
  const [globalHighscores, setGlobalHighscores] = useState<HighscoreEntry[]>([])
  const [overallLeaderboard, setOverallLeaderboard] = useState<
    { username: string; totalScore: number; games: number }[]
  >([])
  const [showGlobal, setShowGlobal] = useState(true) // Default to global
  const [loading, setLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<string>("")

  useEffect(() => {
    // Lade lokale Highscores
    const scores = getAllHighscores()
    setLocalHighscores(scores)

    // Berechne Gesamtbestenliste (lokal)
    const userTotals: { [username: string]: { totalScore: number; games: number } } = {}

    Object.entries(scores).forEach(([gameId, gameScores]) => {
      gameScores.forEach((entry) => {
        if (!userTotals[entry.username]) {
          userTotals[entry.username] = { totalScore: 0, games: 0 }
        }
        userTotals[entry.username].totalScore += entry.score
        userTotals[entry.username].games += 1
      })
    })

    const overall = Object.entries(userTotals)
      .map(([username, data]) => ({
        username,
        totalScore: data.totalScore,
        games: data.games,
      }))
      .sort((a, b) => b.totalScore - a.totalScore)

    setOverallLeaderboard(overall)

    // Lade automatisch globale Highscores
    loadGlobalHighscores()
  }, [])

  const loadGlobalHighscores = async () => {
    setLoading(true)
    try {
      console.log("Lade globale Highscores...")
      const global = await getGlobalHighscores()
      console.log("Globale Highscores erhalten:", global.length)
      setGlobalHighscores(global)
      setLastUpdate(new Date().toLocaleTimeString())
    } catch (error) {
      console.error("Fehler beim Laden der globalen Highscores:", error)
    } finally {
      setLoading(false)
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <Trophy className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-500 font-bold"
      case 2:
        return "text-gray-400 font-semibold"
      case 3:
        return "text-amber-600 font-semibold"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 gaming-gradient text-transparent bg-clip-text">🏆 Bestenliste</h1>
        <p className="text-muted-foreground mb-4">Hier findest du die besten Spieler in allen Spielen</p>

        {/* Global/Lokal Toggle */}
        <div className="flex justify-center gap-2 mb-4">
          <Button
            variant={!showGlobal ? "default" : "outline"}
            onClick={() => setShowGlobal(false)}
            className="flex items-center gap-2"
          >
            <Smartphone className="h-4 w-4" />
            Dieses Gerät
          </Button>
          <Button
            variant={showGlobal ? "default" : "outline"}
            onClick={() => {
              setShowGlobal(true)
              loadGlobalHighscores()
            }}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <Globe className="h-4 w-4" />
            {loading ? "Lädt..." : "Weltweit"}
          </Button>
          {showGlobal && (
            <Button
              variant="outline"
              onClick={loadGlobalHighscores}
              disabled={loading}
              className="flex items-center gap-2 bg-transparent"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Aktualisieren
            </Button>
          )}
        </div>

        {showGlobal && (
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3 mb-4">
            <p className="text-sm text-green-300">
              🌍 Weltweite Bestenliste - Hier siehst du Spieler von allen Geräten!
              {lastUpdate && <span className="block mt-1">Letztes Update: {lastUpdate}</span>}
              <span className="block mt-1">Gesamt: {globalHighscores.length} Einträge</span>
            </p>
          </div>
        )}

        {!showGlobal && (
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-3 mb-4">
            <p className="text-sm text-purple-300">📱 Lokale Bestenliste - Nur Spieler von diesem Gerät</p>
          </div>
        )}
      </div>

      {showGlobal ? (
        // Globale Bestenliste
        <Card className="gaming-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-6 w-6 text-primary" />
              Weltweite Bestenliste
              {loading && <RefreshCw className="h-4 w-4 animate-spin ml-2" />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Lade globale Highscores...</p>
              </div>
            ) : globalHighscores.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">Noch keine globalen Highscores vorhanden.</p>
                <p className="text-sm text-muted-foreground">
                  Spiele ein paar Runden und sei der Erste auf der weltweiten Bestenliste!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {globalHighscores.slice(0, 50).map((entry, index) => (
                  <div
                    key={`${entry.username}-${entry.game}-${index}`}
                    className="flex items-center justify-between p-3 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 min-w-[60px]">
                        {getRankIcon(index + 1)}
                        <span className={`font-bold ${getRankColor(index + 1)}`}>#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-semibold">{entry.username}</p>
                        <p className="text-sm text-muted-foreground">{gameNames[entry.game || ""] || entry.game}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{entry.score}</p>
                      <p className="text-sm text-muted-foreground">Punkte</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        // Lokale Bestenliste (Original Tabs)
        <Tabs defaultValue="overall" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-6">
            <TabsTrigger value="overall">Gesamt</TabsTrigger>
            <TabsTrigger value="tictactoe">Tic Tac Toe</TabsTrigger>
            <TabsTrigger value="snake">Snake</TabsTrigger>
            <TabsTrigger value="memory">Memory</TabsTrigger>
            <TabsTrigger value="runner">Runner</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
          </TabsList>

          <TabsContent value="overall">
            <Card className="gaming-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-primary" />
                  Gesamtbestenliste (Dieses Gerät)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {overallLeaderboard.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Noch keine Highscores vorhanden. Spiele ein paar Runden, um hier zu erscheinen!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {overallLeaderboard.map((entry, index) => (
                      <div
                        key={entry.username}
                        className="flex items-center justify-between p-3 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 min-w-[60px]">
                            {getRankIcon(index + 1)}
                            <span className={`font-bold ${getRankColor(index + 1)}`}>#{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-semibold">{entry.username}</p>
                            <p className="text-sm text-muted-foreground">
                              {entry.games} Spiel{entry.games !== 1 ? "e" : ""}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">{entry.totalScore}</p>
                          <p className="text-sm text-muted-foreground">Punkte</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {Object.entries(gameNames).map(([gameId, gameName]) => (
            <TabsContent key={gameId} value={gameId}>
              <Card className="gaming-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-6 w-6 text-primary" />
                    {gameName} Bestenliste (Dieses Gerät)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!localHighscores[gameId] || localHighscores[gameId].length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      Noch keine Highscores für {gameName}. Sei der Erste!
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {localHighscores[gameId].slice(0, 10).map((entry, index) => (
                        <div
                          key={`${entry.username}-${index}`}
                          className="flex items-center justify-between p-3 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 min-w-[60px]">
                              {getRankIcon(index + 1)}
                              <span className={`font-bold ${getRankColor(index + 1)}`}>#{index + 1}</span>
                            </div>
                            <p className="font-semibold">{entry.username}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">{entry.score}</p>
                            <p className="text-sm text-muted-foreground">
                              {gameId === "tictactoe" ? "Siege" : "Punkte"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  )
}
