import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Heart, MessageCircle, Share, TrendingUp, Users, Video, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { LatestTikToks } from "@/components/latest-tiktoks"

export default function TikTokPage() {
  const stats = [
    { icon: Users, label: "Follower", value: "250+", color: "text-pink-500" },
    { icon: Heart, label: "Likes", value: "5K+", color: "text-red-500" },
    { icon: Video, label: "Videos", value: "50+", color: "text-blue-500" },
    { icon: TrendingUp, label: "Views", value: "100K+", color: "text-green-500" },
  ]

  const contentTypes = [
    { title: "Gaming Content", description: "Gameplay, Reviews & Tipps", icon: "🎮" },
    { title: "Funny Moments", description: "Lustige Gaming-Momente", icon: "😂" },
    { title: "Tutorials", description: "Gaming-Guides & Tricks", icon: "📚" },
    { title: "Challenges", description: "Gaming-Challenges & Trends", icon: "🏆" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden gaming-border bg-gradient-to-br from-pink-900/20 to-purple-900/20">
              <Image src="/images/jay-logo.png" alt="Jay Logo" fill className="object-contain p-4 gaming-glow" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full p-2">
              <Video className="h-5 w-5 text-white" />
            </div>
          </div>

          <h1 className="text-5xl font-bold mb-4 gaming-heading">
            Jay auf{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">TikTok</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Folge mir auf TikTok für die neuesten Gaming-Videos, lustige Momente und exklusive Inhalte!
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button
              asChild
              size="lg"
              className="gaming-button bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
            >
              <Link href="https://tiktok.com/@jay160412" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-5 w-5 mr-2" />
                @jay160412 folgen
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gaming-button-outline bg-transparent">
              <Link href="#latest-videos">
                <Video className="h-5 w-5 mr-2" />
                Videos ansehen
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="gaming-card text-center">
              <CardContent className="pt-6">
                <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                <p className="text-2xl font-bold text-primary mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Content Types */}
        <Card className="gaming-card mb-12">
          <CardHeader>
            <CardTitle className="gaming-subheading">Was du erwarten kannst</CardTitle>
            <CardDescription>Verschiedene Arten von Content auf meinem TikTok-Kanal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contentTypes.map((type, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-lg bg-gradient-to-br from-purple-900/20 to-blue-900/20 gaming-border"
                >
                  <div className="text-4xl mb-3">{type.icon}</div>
                  <h3 className="font-semibold mb-2 text-primary">{type.title}</h3>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Latest TikToks */}
        <div id="latest-videos" className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold gaming-subheading">Neueste TikToks</h2>
            <Button asChild variant="outline" className="gaming-button-outline bg-transparent">
              <Link href="https://tiktok.com/@jay160412" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Alle Videos
              </Link>
            </Button>
          </div>
          <LatestTikToks />
        </div>

        {/* Call to Action */}
        <Card className="gaming-card text-center">
          <CardHeader>
            <CardTitle className="gaming-subheading">Verpasse nichts!</CardTitle>
            <CardDescription>Folge mir auf TikTok für tägliche Gaming-Inhalte</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="secondary" className="gaming-badge">
                  <Clock className="h-3 w-3 mr-1" />
                  Täglich neue Videos
                </Badge>
                <Badge variant="secondary" className="gaming-badge">
                  <MessageCircle className="h-3 w-3 mr-1" />
                  Interaktive Community
                </Badge>
                <Badge variant="secondary" className="gaming-badge">
                  <Share className="h-3 w-3 mr-1" />
                  Exklusive Inhalte
                </Badge>
              </div>

              <Button
                asChild
                size="lg"
                className="gaming-button bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
              >
                <Link href="https://tiktok.com/@jay160412" target="_blank" rel="noopener noreferrer">
                  <Heart className="h-5 w-5 mr-2" />
                  Jetzt folgen auf TikTok
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
