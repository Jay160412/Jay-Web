"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { ExternalLink } from "lucide-react"

// Discord Links
const DISCORD_SERVER_LINK = "https://discord.com/invite/yugWsaGP6t"
const DISCORD_BOT_LINK =
  "https://discord.com/oauth2/authorize?client_id=1299854022001295401&permissions=8&integration_type=0&scope=bot"

export default function DiscordPage() {
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if running as PWA
      const isInStandaloneMode =
        window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone === true
      setIsStandalone(isInStandaloneMode)
    }
  }, [])

  // Handle external links for standalone app
  const openExternalLink = (e: React.MouseEvent, url: string) => {
    if (isStandalone) {
      e.preventDefault()
      if (typeof window !== "undefined") {
        // Use window.location.href for better compatibility with Nucleapp
        window.location.href = url
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-4xl font-bold gaming-heading">Discord Community</h1>
        <Button asChild className="flex items-center gap-2 gaming-button">
          <a
            href={DISCORD_SERVER_LINK}
            target="_blank"
            onClick={(e) => openExternalLink(e, DISCORD_SERVER_LINK)}
            className="app-link"
            rel="noreferrer"
          >
            Zum Discord-Server
            <ExternalLink className="h-4 w-4 ml-2" />
          </a>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-[#5865F2]/10 border-[#5865F2]/20 gaming-card gaming-border">
          <CardHeader>
            <CardTitle className="gaming-subheading">Tritt meinem Discord Server bei</CardTitle>
            <CardDescription>Werde Teil unserer Community und bleibe immer auf dem Laufenden!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video relative rounded-lg overflow-hidden gaming-border">
              <Image
                src="/images/jay-character-1.png"
                alt="Discord Server Preview"
                fill
                className="object-contain transform rotate-90 gaming-glow"
                style={{ objectPosition: "center" }}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-[#5865F2] hover:bg-[#4752C4] gaming-button">
              <a
                href={DISCORD_SERVER_LINK}
                target="_blank"
                onClick={(e) => openExternalLink(e, DISCORD_SERVER_LINK)}
                className="app-link"
                rel="noreferrer"
              >
                Server beitreten
              </a>
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-[#5865F2]/10 border-[#5865F2]/20 gaming-card gaming-border">
          <CardHeader>
            <CardTitle className="gaming-subheading">Füge meinen Discord Bot hinzu</CardTitle>
            <CardDescription>Mein eigener Discord Bot mit coolen Features für deinen Server!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video relative rounded-lg overflow-hidden gaming-border">
              <Image
                src="/images/echo-bot.png"
                alt="Discord Bot Preview"
                fill
                className="object-contain gaming-glow"
                style={{ objectPosition: "center" }}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-[#5865F2] hover:bg-[#4752C4] gaming-button">
              <a
                href={DISCORD_BOT_LINK}
                target="_blank"
                onClick={(e) => openExternalLink(e, DISCORD_BOT_LINK)}
                className="app-link"
                rel="noreferrer"
              >
                Bot hinzufügen
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
