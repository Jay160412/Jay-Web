import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  AlertTriangle,
  Youtube,
  Twitch,
  ExternalLink,
  Heart,
  MessageCircle,
  Gamepad2,
  Volume2,
  VolumeX,
} from "lucide-react"

export default function YoutubePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-red-950/10 to-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header mit Warnung */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-500/20 border-2 border-red-500 mb-6 animate-pulse">
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-red-500">Kanal Gelöscht</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Leider wurde mein YouTube-Kanal aus unerwarteten Gründen gesperrt.
          </p>
        </div>

        {/* Hauptkarte mit Erklärung */}
        <Card className="max-w-4xl mx-auto gaming-card mb-12 overflow-hidden">
          <div className="relative">
            {/* Glitch Effect Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-red-500/10" />

            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* YouTube Logo mit X */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-red-600/20 flex items-center justify-center border-4 border-red-600/50">
                    <Youtube className="w-16 h-16 text-red-500" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">X</span>
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Was ist passiert?</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Mein YouTube-Kanal wurde aus{" "}
                    <span className="text-red-400 font-semibold">unerklärlichen Gründen</span> gelöscht. Wahrscheinlich
                    lag es daran, dass während eines Fortnite-Streams ein
                    <span className="text-yellow-400 font-semibold"> Emote-Sound zu hören war</span>, der
                    urheberrechtlich geschützt war.
                  </p>
                </div>
              </div>

              {/* Details Box */}
              <div className="mt-8 p-6 rounded-lg bg-red-500/10 border border-red-500/30">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-red-400 mb-2">Copyright Strike</h3>
                    <p className="text-muted-foreground">
                      Ein kurzer Sound aus einem Fortnite-Emote wurde als Urheberrechtsverletzung gewertet. Obwohl es
                      nur wenige Sekunden waren und im Spiel vorkam, wurde der gesamte Kanal ohne Vorwarnung entfernt.
                      Leider konnte ich dagegen nichts unternehmen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Twitch Alternative */}
        <Card className="max-w-4xl mx-auto gaming-card overflow-hidden mb-12">
          <div className="p-8 md:p-12 bg-gradient-to-r from-purple-900/30 to-purple-600/20">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Twitch Logo */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-purple-600/30 flex items-center justify-center border-4 border-purple-500 animate-pulse">
                  <Twitch className="w-16 h-16 text-purple-400" />
                </div>
                <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-purple-400">Aber es gibt gute Nachrichten!</h2>
                <p className="text-muted-foreground text-lg mb-6">
                  Ich bin jetzt auf <span className="text-purple-400 font-bold">Twitch</span> aktiv! Folge mir dort für
                  Live-Streams, Gaming-Content und Community-Events.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Link href="https://www.twitch.tv/jay_livettv" target="_blank">
                      <Twitch className="w-5 h-5 mr-2" />
                      Zu meinem Twitch
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-purple-500 text-purple-400 hover:bg-purple-500/20 bg-transparent"
                  >
                    <Link href="/discord">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Discord beitreten
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-purple-500/30">
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-400">Jay_LiveTTV</p>
                <p className="text-sm text-muted-foreground">Twitch Name</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-400">LIVE</p>
                <p className="text-sm text-muted-foreground">Regelmäßig</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Gamepad2 className="w-6 h-6 text-purple-400" />
                  <VolumeX className="w-5 h-5 text-purple-400" />
                </div>
                <p className="text-sm text-muted-foreground">Stumm Gaming</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-400">Fortnite</p>
                <p className="text-sm text-muted-foreground">& Single Player</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="max-w-4xl mx-auto gaming-card overflow-hidden mb-12">
          <div className="p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Was ich streame</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Single Player */}
              <div className="p-6 rounded-lg bg-blue-500/10 border border-blue-500/30 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <VolumeX className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="font-bold text-blue-400 mb-2">Stumm Gaming</h3>
                <p className="text-sm text-muted-foreground">
                  Entspannte Single-Player Sessions ohne Kommentar - einfach nur chillen und zuschauen
                </p>
              </div>

              {/* Fortnite */}
              <div className="p-6 rounded-lg bg-green-500/10 border border-green-500/30 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Gamepad2 className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="font-bold text-green-400 mb-2">Fortnite</h3>
                <p className="text-sm text-muted-foreground">
                  Battle Royale Action - manchmal alleine, manchmal mit der Community
                </p>
              </div>

              {/* Online Games */}
              <div className="p-6 rounded-lg bg-orange-500/10 border border-orange-500/30 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <Volume2 className="w-8 h-8 text-orange-400" />
                </div>
                <h3 className="font-bold text-orange-400 mb-2">Online Games</h3>
                <p className="text-sm text-muted-foreground">
                  Verschiedene Online-Spiele mit der Community - immer was Neues!
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="inline-block gaming-card p-8">
            <h3 className="text-xl font-bold mb-4">Unterstütze mich auf Twitch!</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Auch wenn YouTube nicht mehr geht, freue ich mich über jeden Follower auf Twitch. Gemeinsam bauen wir eine
              neue Community auf!
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Link href="https://www.twitch.tv/jay_livettv" target="_blank">
                <Twitch className="w-5 h-5 mr-2" />
                Jetzt auf Twitch folgen
                <ExternalLink className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
