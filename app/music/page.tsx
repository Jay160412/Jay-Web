"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Download, Play, Pause, Music, Headphones, Share2, Heart, Volume2 } from "lucide-react"
import Image from "next/image"

export default function MusicPage() {
  const [liked, setLiked] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const youtubeVideoId = "AMTf4xArnWs"
  const mp3Url = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Level%20Up-07ZL4dF6L9lm7Gv02yOpq3MgKx6Zmz.mp3"

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Level Up - Jay",
          text: "Hör dir meinen Song 'Level Up' an!",
          url: `https://youtu.be/${youtubeVideoId}`,
        })
      } catch (err) {
        console.log("Share cancelled")
      }
    } else {
      navigator.clipboard.writeText(`https://youtu.be/${youtubeVideoId}`)
      alert("Link kopiert!")
    }
  }

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = mp3Url
    link.download = "Level-Up-Jay.mp3"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-purple-950/20 pb-24 lg:pb-8">
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={mp3Url} onEnded={() => setIsPlaying(false)} />

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-cyan-600/10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
              <Music className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-purple-300">Meine Musik</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gaming-gradient text-transparent bg-clip-text">Level Up</span>
            </h1>

            <p className="text-lg text-muted-foreground">Hör dir meinen Song an und lade ihn herunter!</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Music Video Card */}
          <div className="bg-card/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl overflow-hidden">
            {/* Video Player */}
            <div className="relative aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeVideoId}?rel=0`}
                title="Level Up - Jay Music Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>

            {/* Song Info */}
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Left Side - Song Details */}
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                    <Image src="/images/jay-logo.png" alt="Jay" fill className="object-cover" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold">Level Up</h2>
                    <p className="text-muted-foreground">Jay</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Volume2 className="h-4 w-4 text-purple-400" />
                      <span className="text-sm text-purple-400">Offizieller Release</span>
                    </div>
                  </div>
                </div>

                {/* Right Side - Actions */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setLiked(!liked)}
                    className={liked ? "border-pink-500 text-pink-500" : "border-purple-500/30"}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${liked ? "fill-pink-500" : ""}`} />
                    {liked ? "Gefällt mir" : "Like"}
                  </Button>

                  <Button variant="outline" onClick={handleShare} className="border-purple-500/30 bg-transparent">
                    <Share2 className="h-4 w-4 mr-2" />
                    Teilen
                  </Button>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-purple-500/20 my-6" />

              <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <Headphones className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-bold">Sound Download</h3>
                      <p className="text-sm text-muted-foreground">Lade "Level Up" als MP3 herunter</p>
                    </div>
                  </div>

                  <div className="flex gap-3 w-full md:w-auto">
                    <Button
                      variant="outline"
                      onClick={toggleAudio}
                      className="border-purple-500/30 hover:bg-purple-500/10 bg-transparent"
                    >
                      {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                      {isPlaying ? "Pause" : "Anhören"}
                    </Button>
                    <Button
                      onClick={handleDownload}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 flex-1 md:flex-none"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download MP3
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* YouTube Link */}
            <div className="bg-card/50 backdrop-blur-sm border border-red-500/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold">Auf YouTube ansehen</h3>
                  <p className="text-sm text-muted-foreground">Vollbildmodus & mehr</p>
                </div>
              </div>
              <Button asChild variant="outline" className="w-full border-red-500/30 hover:bg-red-500/10 bg-transparent">
                <a href={`https://youtu.be/${youtubeVideoId}`} target="_blank" rel="noopener noreferrer">
                  <Play className="h-4 w-4 mr-2" />
                  Auf YouTube öffnen
                </a>
              </Button>
            </div>

            {/* Support */}
            <div className="bg-card/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Heart className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-bold">Unterstütze mich</h3>
                  <p className="text-sm text-muted-foreground">Teile den Song mit Freunden!</p>
                </div>
              </div>
              <Button
                onClick={handleShare}
                variant="outline"
                className="w-full border-purple-500/30 hover:bg-purple-500/10 bg-transparent"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Song teilen
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
