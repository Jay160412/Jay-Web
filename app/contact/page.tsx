import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Youtube, Send } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ContactForm } from "@/components/contact-form"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Image src="/images/jay-logo.png" alt="Jay Logo" width={80} height={80} className="gaming-glow" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 gaming-gradient text-transparent bg-clip-text gaming-text-glow">
            Kontakt
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hast du Fragen, Feedback oder möchtest einfach nur Hallo sagen? Hier findest du alle Wege, um mit mir in
            Kontakt zu treten!
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Discord */}
          <Card className="gaming-card hover:scale-105 transition-transform duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-indigo-500/20 rounded-full w-fit">
                <MessageSquare className="h-8 w-8 text-indigo-400" />
              </div>
              <CardTitle className="text-xl">Discord</CardTitle>
              <CardDescription>Der beste Weg für schnelle Antworten und Community-Chat</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild className="w-full gaming-button">
                <Link href="/discord">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Discord Server beitreten
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* YouTube */}
          <Card className="gaming-card hover:scale-105 transition-transform duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-red-500/20 rounded-full w-fit">
                <Youtube className="h-8 w-8 text-red-400" />
              </div>
              <CardTitle className="text-xl">YouTube</CardTitle>
              <CardDescription>Kommentiere meine Videos oder schreib mir eine Nachricht</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/youtube">
                  <Youtube className="h-4 w-4 mr-2" />
                  YouTube Kanal besuchen
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="max-w-2xl mx-auto gaming-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <Send className="h-6 w-6" />
              Support Anfrage
            </CardTitle>
            <CardDescription>
              Hast du eine Frage oder brauchst Hilfe? Schreib mir eine Nachricht und ich antworte so schnell wie
              möglich!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 gaming-gradient text-transparent bg-clip-text">
            Häufige Fragen
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="gaming-card">
              <CardHeader>
                <CardTitle className="text-lg">🎮 Kann ich Spielvorschläge machen?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ja, gerne! Schreib mir auf Discord oder nutze das Kontaktformular, welche Spiele du gerne sehen
                  möchtest.
                </p>
              </CardContent>
            </Card>

            <Card className="gaming-card">
              <CardHeader>
                <CardTitle className="text-lg">🤝 Kollaborationen?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Für geschäftliche Anfragen und Kollaborationen nutze bitte das Kontaktformular. Ich freue mich auf
                  deine Ideen!
                </p>
              </CardContent>
            </Card>

            <Card className="gaming-card">
              <CardHeader>
                <CardTitle className="text-lg">🐛 Bug gefunden?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Wenn du einen Fehler auf der Website findest, melde ihn bitte über das Kontaktformular oder Discord.
                  Danke für deine Hilfe!
                </p>
              </CardContent>
            </Card>

            <Card className="gaming-card">
              <CardHeader>
                <CardTitle className="text-lg">⏰ Antwortzeit?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Discord: Meist innerhalb weniger Stunden
                  <br />
                  Kontaktformular: 1-3 Werktage
                  <br />
                  YouTube: Unregelmäßig
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
