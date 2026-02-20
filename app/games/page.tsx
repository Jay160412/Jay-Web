"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Trophy, Users, Zap, Star, ShoppingBag, Package, BarChart3 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { UserProfile } from "@/components/games/user-profile"
import { ShopModal } from "@/components/games/shop-modal"
import { InventoryModal } from "@/components/games/inventory-modal"
import { Leaderboard } from "@/components/games/leaderboard"

const games = [
  {
    id: "snake",
    title: "Snake",
    description: "Das klassische Snake-Spiel mit modernem Design",
    image: "/images/game-snake.png",
    difficulty: "Mittel",
    players: "1 Spieler",
    category: "Arcade",
    featured: true,
    coins: 10,
  },
  {
    id: "memory",
    title: "Memory",
    description: "Teste dein Gedächtnis mit diesem Kartenspiel",
    image: "/images/game-memory.png",
    difficulty: "Einfach",
    players: "1 Spieler",
    category: "Puzzle",
    featured: false,
    coins: 5,
  },
  {
    id: "quiz",
    title: "Quiz",
    description: "Beantworte Fragen und teste dein Wissen",
    image: "/images/game-quiz.png",
    difficulty: "Mittel",
    players: "1 Spieler",
    category: "Puzzle",
    featured: false,
    coins: 8,
  },
  {
    id: "tic-tac-toe",
    title: "Tic Tac Toe",
    description: "Das klassische Strategiespiel für zwei Spieler",
    image: "/images/game-tictactoe.png",
    difficulty: "Einfach",
    players: "2 Spieler",
    category: "Strategie",
    featured: false,
    coins: 3,
  },
  {
    id: "runner",
    title: "Runner",
    description: "Springe über Hindernisse und sammle Punkte",
    image: "/images/game-runner.png",
    difficulty: "Schwer",
    players: "1 Spieler",
    category: "Action",
    featured: true,
    coins: 15,
  },
  {
    id: "tetris",
    title: "Tetris",
    description: "Das legendäre Puzzle-Spiel mit fallenden Blöcken",
    image: "/images/game-tetris.png",
    difficulty: "Schwer",
    players: "1 Spieler",
    category: "Puzzle",
    featured: true,
    coins: 20,
  },
  {
    id: "flappy-bird",
    title: "Flappy Bird",
    description: "Fliege durch die Rohre ohne zu kollidieren",
    image: "/images/game-flappybird.png",
    difficulty: "Schwer",
    players: "1 Spieler",
    category: "Arcade",
    featured: true,
    coins: 25,
  },
  {
    id: "breakout",
    title: "Breakout",
    description: "Zerstöre alle Blöcke mit dem Ball",
    image: "/images/game-breakout.png",
    difficulty: "Mittel",
    players: "1 Spieler",
    category: "Arcade",
    featured: false,
    coins: 12,
  },
]

const categories = ["Alle", "Arcade", "Puzzle", "Action", "Strategie"]
const difficulties = ["Alle", "Einfach", "Mittel", "Schwer"]

export default function GamesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Alle")
  const [selectedDifficulty, setSelectedDifficulty] = useState("Alle")
  const [showShop, setShowShop] = useState(false)
  const [showInventory, setShowInventory] = useState(false)
  const [showLeaderboard, setShowLeaderboard] = useState(false)

  const filteredGames = games.filter((game) => {
    const matchesSearch =
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Alle" || game.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "Alle" || game.difficulty === selectedDifficulty

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const featuredGames = filteredGames.filter((game) => game.featured)
  const regularGames = filteredGames.filter((game) => !game.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden gaming-border bg-gradient-to-br from-purple-900/20 to-blue-900/20">
              <Image
                src="/images/controller-icon.png"
                alt="Gaming Controller"
                fill
                className="object-contain p-4 gaming-glow"
              />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 gaming-heading">Jay's Gaming Zone</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Entdecke eine Sammlung von spannenden Spielen! Sammle Coins, kaufe Skins und klettere die Bestenliste hoch.
          </p>

          {/* User Profile & Actions */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <UserProfile />
            <Button onClick={() => setShowShop(true)} className="gaming-button">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Shop
            </Button>
            <Button onClick={() => setShowInventory(true)} variant="outline" className="gaming-button-outline">
              <Package className="h-4 w-4 mr-2" />
              Inventar
            </Button>
            <Button onClick={() => setShowLeaderboard(true)} variant="outline" className="gaming-button-outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Bestenliste
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="gaming-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 gaming-subheading">
              <Filter className="h-5 w-5" />
              Spiele entdecken
            </CardTitle>
            <CardDescription>Finde das perfekte Spiel für dich</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Spiele durchsuchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 gaming-input"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Kategorie</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={selectedCategory === category ? "gaming-button" : "gaming-button-outline"}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Schwierigkeit</label>
                <div className="flex flex-wrap gap-2">
                  {difficulties.map((difficulty) => (
                    <Button
                      key={difficulty}
                      variant={selectedDifficulty === difficulty ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedDifficulty(difficulty)}
                      className={selectedDifficulty === difficulty ? "gaming-button" : "gaming-button-outline"}
                    >
                      {difficulty}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Featured Games */}
        {featuredGames.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Star className="h-6 w-6 text-yellow-500" />
              <h2 className="text-3xl font-bold gaming-subheading">Empfohlene Spiele</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredGames.map((game) => (
                <GameCard key={game.id} game={game} featured />
              ))}
            </div>
          </div>
        )}

        {/* All Games */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6 gaming-subheading">Alle Spiele ({filteredGames.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {regularGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>

        {filteredGames.length === 0 && (
          <Card className="gaming-card text-center py-12">
            <CardContent>
              <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Keine Spiele gefunden</h3>
              <p className="text-muted-foreground">Versuche andere Suchbegriffe oder Filter</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modals */}
      <ShopModal open={showShop} onOpenChange={setShowShop} />
      <InventoryModal open={showInventory} onOpenChange={setShowInventory} />
      <Leaderboard open={showLeaderboard} onOpenChange={setShowLeaderboard} />
    </div>
  )
}

function GameCard({ game, featured = false }: { game: any; featured?: boolean }) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Einfach":
        return "text-green-500"
      case "Mittel":
        return "text-yellow-500"
      case "Schwer":
        return "text-red-500"
      default:
        return "text-muted-foreground"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Arcade":
        return <Zap className="h-4 w-4" />
      case "Puzzle":
        return <Trophy className="h-4 w-4" />
      case "Action":
        return <Zap className="h-4 w-4" />
      case "Strategie":
        return <Trophy className="h-4 w-4" />
      default:
        return <Trophy className="h-4 w-4" />
    }
  }

  return (
    <Card
      className={`gaming-card group hover:scale-105 transition-all duration-300 ${featured ? "ring-2 ring-yellow-500/50" : ""}`}
    >
      {featured && (
        <div className="absolute -top-2 -right-2 z-10">
          <Badge className="bg-yellow-500 text-black font-bold">
            <Star className="h-3 w-3 mr-1" />
            Empfohlen
          </Badge>
        </div>
      )}

      <div className="relative aspect-video overflow-hidden rounded-t-lg">
        <Image
          src={game.image || "/placeholder.svg"}
          alt={game.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-2 right-2">
          <Badge variant="secondary" className="gaming-badge">
            +{game.coins} Coins
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="gaming-subheading">{game.title}</CardTitle>
          <div className="flex items-center gap-1">{getCategoryIcon(game.category)}</div>
        </div>
        <CardDescription className="line-clamp-2">{game.description}</CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm">
            <span className={`font-medium ${getDifficultyColor(game.difficulty)}`}>{game.difficulty}</span>
            <span className="text-muted-foreground flex items-center gap-1">
              <Users className="h-3 w-3" />
              {game.players}
            </span>
          </div>
          <Badge variant="outline" className="gaming-badge-outline">
            {game.category}
          </Badge>
        </div>

        <Button asChild className="w-full gaming-button">
          <Link href={`/games/${game.id}`}>
            <Trophy className="h-4 w-4 mr-2" />
            Spielen
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
