"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, ImageIcon, Smartphone, Tablet, User, Sparkles, Heart, Star, Zap } from "lucide-react"
import Image from "next/image"

const categories = [
  { id: "all", name: "Alle", icon: <Sparkles className="h-4 w-4" /> },
  { id: "wallpapers", name: "Handy", icon: <Smartphone className="h-4 w-4" /> },
  { id: "ipad", name: "iPad", icon: <Tablet className="h-4 w-4" /> },
  { id: "profile", name: "Profilbilder", icon: <User className="h-4 w-4" /> },
  { id: "other", name: "Sonstiges", icon: <ImageIcon className="h-4 w-4" /> },
]

const downloads = [
  {
    id: 1,
    name: "Jay Profilbild",
    category: "profile",
    image: "/images/jayprofile.png",
    downloadUrl: "/images/jayprofile.png",
    description: "Offizielles Jay Logo - Perfekt für Discord, TikTok & Co.",
    isNew: true,
    aspectRatio: "1/1",
  },
  {
    id: 2,
    name: "Cyberpunk City Wallpaper",
    category: "wallpapers",
    image: "/images/leonardo-anime-xl-macha-aus-dem-foto-ein-handy-hintergrund-3.jpg",
    downloadUrl: "/images/leonardo-anime-xl-macha-aus-dem-foto-ein-handy-hintergrund-3.jpg",
    description: "Anime-Style Handyhintergrund mit Neon-City Vibes",
    isNew: true,
    aspectRatio: "9/16",
  },
  {
    id: 3,
    name: "Neon Warrior Wallpaper",
    category: "wallpapers",
    image: "/images/screenshot-20251126-063243-gallery.jpg",
    downloadUrl: "/images/screenshot-20251126-063243-gallery.jpg",
    description: "Cyberpunk Anime Handyhintergrund mit Glow-Effekten",
    isNew: true,
    aspectRatio: "9/16",
  },
  {
    id: 4,
    name: "Tech Runner Wallpaper",
    category: "wallpapers",
    image: "/images/leonardo-anime-xl-macha-aus-dem-foto-ein-handy-hintergrund-2.jpg",
    downloadUrl: "/images/leonardo-anime-xl-macha-aus-dem-foto-ein-handy-hintergrund-2.jpg",
    description: "Futuristischer Anime Handyhintergrund mit Orange-Akzenten",
    isNew: true,
    aspectRatio: "9/16",
  },
  {
    id: 5,
    name: "Jay Cyberpunk City - iPad",
    category: "ipad",
    image: "/images/screenshot-20251126-062814-gallery.jpg",
    downloadUrl: "/images/screenshot-20251126-062814-gallery.jpg",
    description: "Anime iPad Hintergrund mit Jay Logo in Neon-City",
    isNew: true,
    aspectRatio: "4/3",
  },
]

export default function FanZonePage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [downloadCount, setDownloadCount] = useState<Record<number, number>>({})

  const filteredDownloads =
    activeCategory === "all" ? downloads : downloads.filter((d) => d.category === activeCategory)

  const handleDownload = (item: (typeof downloads)[0]) => {
    setDownloadCount((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }))

    const link = document.createElement("a")
    link.href = item.downloadUrl
    link.download = item.name.replace(/\s+/g, "-").toLowerCase() + ".png"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-purple-950/20 pb-24 lg:pb-8">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/10 via-purple-600/10 to-cyan-600/10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-pink-500/20 border border-pink-500/30 rounded-full px-4 py-2 mb-6">
              <Heart className="h-4 w-4 text-pink-400" />
              <span className="text-sm text-pink-300">Exklusiv für Fans</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gaming-gradient text-transparent bg-clip-text">Fan Zone</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8">
              Lade dir exklusive Hintergründe, Profilbilder und mehr herunter - komplett kostenlos!
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-400">{downloads.length}</div>
                <div className="text-sm text-muted-foreground">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {Object.values(downloadCount).reduce((a, b) => a + b, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Heruntergeladen</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">100%</div>
                <div className="text-sm text-muted-foreground">Kostenlos</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="container mx-auto px-4 mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className={
                activeCategory === category.id
                  ? "bg-gradient-to-r from-pink-600 to-purple-600 border-0"
                  : "border-purple-500/30 hover:bg-purple-500/10"
              }
            >
              {category.icon}
              <span className="ml-2">{category.name}</span>
            </Button>
          ))}
        </div>
      </section>

      {/* Downloads Grid */}
      <section className="container mx-auto px-4">
        {filteredDownloads.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDownloads.map((item) => (
              <div
                key={item.id}
                className="group relative bg-card/50 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden hover:border-pink-500/50 transition-all duration-300"
              >
                {/* New Badge */}
                {item.isNew && (
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    <Star className="h-3 w-3" />
                    NEU
                  </div>
                )}

                <div
                  className="relative bg-gradient-to-br from-purple-900/50 to-pink-900/50 overflow-hidden"
                  style={{ aspectRatio: item.aspectRatio || "9/16" }}
                >
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>

                  <Button
                    onClick={() => handleDownload(item)}
                    className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-purple-500/20 flex items-center justify-center">
              <ImageIcon className="h-10 w-10 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Keine Downloads gefunden</h3>
            <p className="text-muted-foreground">In dieser Kategorie gibt es noch keine Downloads.</p>
          </div>
        )}
      </section>

      {/* Coming Soon Section */}
      <section className="container mx-auto px-4 mt-16">
        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/20 rounded-2xl p-8 text-center">
          <Zap className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Mehr kommt bald!</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Ich arbeite an weiteren exklusiven Downloads für euch. Schaut regelmäßig vorbei!
          </p>
        </div>
      </section>
    </main>
  )
}
