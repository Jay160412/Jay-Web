"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2, Edit, Plus, Save, Upload, PaintBucket, Settings, LinkIcon, Image } from "lucide-react"

// Standarddaten für den Fall, dass keine gespeicherten Daten vorhanden sind
const DEFAULT_SHOP_ITEMS = [
  {
    id: "1",
    title: "Fantasy Landschaft",
    price: 49.99,
    stock: 5,
    description: "Eine handgezeichnete Fantasy-Landschaft",
    image: "/images/jay-character-1.png",
  },
  {
    id: "2",
    title: "Anime Charakter Portrait",
    price: 29.99,
    stock: 10,
    description: "Ein Portrait im Anime-Stil",
    image: "/images/jay-character-2.png",
  },
  {
    id: "3",
    title: "Gaming Poster",
    price: 19.99,
    stock: 8,
    description: "Ein Poster mit Gaming-Motiv",
    image: "/images/jay-character-3.png",
  },
]

const DEFAULT_POSTS = [
  {
    id: "1",
    title: "Willkommen auf meiner Webseite",
    date: "2023-05-15",
    content: "Willkommen auf meiner neuen Webseite!",
  },
  {
    id: "2",
    title: "Neue Zeichnungen im Shop",
    date: "2023-06-20",
    content: "Schaut euch meine neuen Zeichnungen im Shop an!",
  },
]

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { toast } = useToast()

  // State für Shop-Items und Posts
  const [shopItems, setShopItems] = useState([])
  const [posts, setPosts] = useState([])

  // State für neue Items
  const [newItemTitle, setNewItemTitle] = useState("")
  const [newItemPrice, setNewItemPrice] = useState("")
  const [newItemStock, setNewItemStock] = useState("")
  const [newItemDescription, setNewItemDescription] = useState("")
  const [newItemImage, setNewItemImage] = useState("/images/jay-character-1.png")
  const [customImageUrl, setCustomImageUrl] = useState("")
  const [imageInputType, setImageInputType] = useState("predefined") // "predefined", "upload", "url"

  // State für neue Posts
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostContent, setNewPostContent] = useState("")

  // State für Dialoge
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false)
  const [isAddPostDialogOpen, setIsAddPostDialogOpen] = useState(false)

  // State für Bearbeitung
  const [editingItemId, setEditingItemId] = useState(null)
  const [editingPostId, setEditingPostId] = useState(null)

  // State für Medien
  const [uploadedImages, setUploadedImages] = useState([])

  // Lade gespeicherte Daten beim ersten Rendern
  useEffect(() => {
    // Lade Shop-Items aus localStorage oder verwende Standarddaten
    try {
      const savedShopItems = localStorage.getItem("shopItems")
      if (savedShopItems) {
        setShopItems(JSON.parse(savedShopItems))
      } else {
        setShopItems(DEFAULT_SHOP_ITEMS)
        localStorage.setItem("shopItems", JSON.stringify(DEFAULT_SHOP_ITEMS))
      }

      // Lade Posts aus localStorage oder verwende Standarddaten
      const savedPosts = localStorage.getItem("posts")
      if (savedPosts) {
        setPosts(JSON.parse(savedPosts))
      } else {
        setPosts(DEFAULT_POSTS)
        localStorage.setItem("posts", JSON.stringify(DEFAULT_POSTS))
      }

      // Lade hochgeladene Bilder
      const savedImages = localStorage.getItem("uploadedImages")
      if (savedImages) {
        setUploadedImages(JSON.parse(savedImages))
      }
    } catch (error) {
      console.error("Fehler beim Laden der Daten:", error)
      setShopItems(DEFAULT_SHOP_ITEMS)
      setPosts(DEFAULT_POSTS)
    }
  }, [])

  // Speichere Shop-Items in localStorage, wenn sie sich ändern
  useEffect(() => {
    if (shopItems.length > 0) {
      localStorage.setItem("shopItems", JSON.stringify(shopItems))

      // Aktualisiere auch die Shop-Daten im localStorage für die Shop-Seite
      localStorage.setItem("shopData", JSON.stringify(shopItems))
    }
  }, [shopItems])

  // Speichere Posts in localStorage, wenn sie sich ändern
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem("posts", JSON.stringify(posts))
    }
  }, [posts])

  // Speichere hochgeladene Bilder in localStorage
  useEffect(() => {
    if (uploadedImages.length > 0) {
      localStorage.setItem("uploadedImages", JSON.stringify(uploadedImages))
    }
  }, [uploadedImages])

  const handleLogin = (e) => {
    e.preventDefault()
    // In einer echten Anwendung würde hier eine sichere Authentifizierung stattfinden
    if (username === "admin" && password === "password") {
      setIsAuthenticated(true)
      toast({
        title: "Erfolgreich angemeldet",
        description: "Du bist jetzt als Administrator angemeldet.",
      })
    } else {
      toast({
        title: "Fehler bei der Anmeldung",
        description: "Benutzername oder Passwort ist falsch.",
        variant: "destructive",
      })
    }
  }

  const resetNewItemForm = () => {
    setNewItemTitle("")
    setNewItemPrice("")
    setNewItemStock("")
    setNewItemDescription("")
    setNewItemImage("/images/jay-character-1.png")
    setCustomImageUrl("")
    setImageInputType("predefined")
    setEditingItemId(null)
  }

  const resetNewPostForm = () => {
    setNewPostTitle("")
    setNewPostContent("")
    setEditingPostId(null)
  }

  const handleAddShopItem = () => {
    if (!newItemTitle || !newItemPrice || !newItemStock) {
      toast({
        title: "Fehler",
        description: "Bitte fülle alle Pflichtfelder aus.",
        variant: "destructive",
      })
      return
    }

    // Bestimme das zu verwendende Bild basierend auf dem ausgewählten Typ
    let imageToUse = newItemImage
    if (imageInputType === "url" && customImageUrl) {
      imageToUse = customImageUrl
    }

    const newItem = {
      id: editingItemId || Date.now().toString(),
      title: newItemTitle,
      price: Number.parseFloat(newItemPrice),
      stock: Number.parseInt(newItemStock),
      description: newItemDescription || "",
      image: imageToUse,
    }

    if (editingItemId) {
      // Bearbeiten eines vorhandenen Items
      const updatedItems = shopItems.map((item) => (item.id === editingItemId ? newItem : item))
      setShopItems(updatedItems)
      toast({
        title: "Produkt aktualisiert",
        description: `"${newItemTitle}" wurde erfolgreich aktualisiert.`,
      })
    } else {
      // Hinzufügen eines neuen Items
      const updatedItems = [...shopItems, newItem]
      setShopItems(updatedItems)
      toast({
        title: "Produkt hinzugefügt",
        description: `"${newItemTitle}" wurde zum Shop hinzugefügt.`,
      })
    }

    resetNewItemForm()
    setIsAddProductDialogOpen(false)
  }

  const handleEditShopItem = (item) => {
    setNewItemTitle(item.title)
    setNewItemPrice(item.price.toString())
    setNewItemStock(item.stock.toString())
    setNewItemDescription(item.description || "")

    // Bestimme den Bildtyp
    if (item.image.startsWith("/images/jay-character-")) {
      setImageInputType("predefined")
      setNewItemImage(item.image)
    } else if (item.image.startsWith("data:")) {
      setImageInputType("upload")
      setNewItemImage(item.image)
    } else {
      setImageInputType("url")
      setCustomImageUrl(item.image)
      setNewItemImage("")
    }

    setEditingItemId(item.id)
    setIsAddProductDialogOpen(true)
  }

  const handleDeleteShopItem = (id) => {
    const updatedItems = shopItems.filter((item) => item.id !== id)
    setShopItems(updatedItems)
    toast({
      title: "Produkt gelöscht",
      description: "Das Produkt wurde erfolgreich gelöscht.",
    })
  }

  const handleAddPost = () => {
    if (!newPostTitle || !newPostContent) {
      toast({
        title: "Fehler",
        description: "Bitte fülle alle Pflichtfelder aus.",
        variant: "destructive",
      })
      return
    }

    const newPost = {
      id: editingPostId || Date.now().toString(),
      title: newPostTitle,
      date: new Date().toISOString().split("T")[0],
      content: newPostContent,
    }

    if (editingPostId) {
      // Bearbeiten eines vorhandenen Posts
      const updatedPosts = posts.map((post) => (post.id === editingPostId ? newPost : post))
      setPosts(updatedPosts)
      toast({
        title: "Beitrag aktualisiert",
        description: `"${newPostTitle}" wurde erfolgreich aktualisiert.`,
      })
    } else {
      // Hinzufügen eines neuen Posts
      const updatedPosts = [...posts, newPost]
      setPosts(updatedPosts)
      toast({
        title: "Beitrag erstellt",
        description: `"${newPostTitle}" wurde erfolgreich erstellt.`,
      })
    }

    resetNewPostForm()
    setIsAddPostDialogOpen(false)
  }

  const handleEditPost = (post) => {
    setNewPostTitle(post.title)
    setNewPostContent(post.content || "")
    setEditingPostId(post.id)
    setIsAddPostDialogOpen(true)
  }

  const handleDeletePost = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id)
    setPosts(updatedPosts)
    toast({
      title: "Beitrag gelöscht",
      description: "Der Beitrag wurde erfolgreich gelöscht.",
    })
  }

  const handleSaveSettings = () => {
    toast({
      title: "Einstellungen gespeichert",
      description: "Deine Einstellungen wurden erfolgreich gespeichert.",
    })
  }

  const handleChangeDesign = () => {
    toast({
      title: "Design gespeichert",
      description: "Das neue Design wurde erfolgreich angewendet.",
    })
  }

  const handleSelectImage = (imagePath) => {
    setNewItemImage(imagePath)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageDataUrl = event.target.result
        setNewItemImage(imageDataUrl)

        // Speichere das hochgeladene Bild
        const newUploadedImage = {
          id: Date.now().toString(),
          name: file.name,
          url: imageDataUrl,
        }

        const updatedImages = [...uploadedImages, newUploadedImage]
        setUploadedImages(updatedImages)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRefreshYouTubeData = async () => {
    try {
      toast({
        title: "Aktualisiere YouTube-Daten",
        description: "Die YouTube-Daten werden aktualisiert...",
      })

      const response = await fetch("/api/update-youtube")
      const data = await response.json()

      if (data.revalidated) {
        toast({
          title: "YouTube-Daten aktualisiert",
          description: "Die YouTube-Daten wurden erfolgreich aktualisiert.",
        })
      } else {
        throw new Error(data.message || "Fehler beim Aktualisieren der YouTube-Daten")
      }
    } catch (error) {
      console.error("Fehler beim Aktualisieren der YouTube-Daten:", error)
      toast({
        title: "Fehler",
        description: "Die YouTube-Daten konnten nicht aktualisiert werden.",
        variant: "destructive",
      })
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Melde dich an, um deine Webseite zu verwalten</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Benutzername</Label>
                <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Passwort</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Anmelden
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
          Abmelden
        </Button>
      </div>

      <Tabs defaultValue="content">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content">Inhalte</TabsTrigger>
          <TabsTrigger value="shop">Shop</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
          <TabsTrigger value="settings">Einstellungen</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Inhalte verwalten</CardTitle>
              <CardDescription>Füge neue Inhalte hinzu oder bearbeite bestehende</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Beiträge</h3>
                    <Button variant="outline" className="flex items-center gap-2" onClick={handleRefreshYouTubeData}>
                      <Upload className="h-4 w-4" />
                      YouTube-Daten aktualisieren
                    </Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Titel</TableHead>
                        <TableHead>Datum</TableHead>
                        <TableHead className="w-[100px]">Aktionen</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {posts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell>{post.title}</TableCell>
                          <TableCell>{post.date}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleEditPost(post)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDeletePost(post.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <Dialog open={isAddPostDialogOpen} onOpenChange={setIsAddPostDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      className="flex items-center gap-2"
                      onClick={() => {
                        resetNewPostForm()
                        setIsAddPostDialogOpen(true)
                      }}
                    >
                      <Plus className="h-4 w-4" />
                      Neuen Beitrag erstellen
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{editingPostId ? "Beitrag bearbeiten" : "Neuen Beitrag erstellen"}</DialogTitle>
                      <DialogDescription>
                        {editingPostId
                          ? "Bearbeite einen vorhandenen Beitrag."
                          : "Füge einen neuen Beitrag zu deiner Webseite hinzu."}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="post-title">Titel</Label>
                        <Input id="post-title" value={newPostTitle} onChange={(e) => setNewPostTitle(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="post-content">Inhalt</Label>
                        <Textarea
                          id="post-content"
                          rows={5}
                          value={newPostContent}
                          onChange={(e) => setNewPostContent(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => {
                          resetNewPostForm()
                          setIsAddPostDialogOpen(false)
                        }}
                      >
                        Abbrechen
                      </Button>
                      <Button onClick={handleAddPost}>
                        {editingPostId ? "Beitrag aktualisieren" : "Beitrag erstellen"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Medien hochladen
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shop" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Shop verwalten</CardTitle>
              <CardDescription>Füge neue Produkte hinzu oder bearbeite bestehende</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Produkte</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Titel</TableHead>
                        <TableHead>Preis</TableHead>
                        <TableHead>Bestand</TableHead>
                        <TableHead className="w-[100px]">Aktionen</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {shopItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.title}</TableCell>
                          <TableCell>{item.price.toFixed(2)} €</TableCell>
                          <TableCell>{item.stock}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleEditShopItem(item)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteShopItem(item.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <Dialog open={isAddProductDialogOpen} onOpenChange={setIsAddProductDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      className="flex items-center gap-2"
                      onClick={() => {
                        resetNewItemForm()
                        setIsAddProductDialogOpen(true)
                      }}
                    >
                      <Plus className="h-4 w-4" />
                      Neues Produkt hinzufügen
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>{editingItemId ? "Produkt bearbeiten" : "Neues Produkt hinzufügen"}</DialogTitle>
                      <DialogDescription>
                        {editingItemId
                          ? "Bearbeite ein vorhandenes Produkt."
                          : "Füge ein neues Produkt zu deinem Shop hinzu."}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="item-title">Titel</Label>
                        <Input id="item-title" value={newItemTitle} onChange={(e) => setNewItemTitle(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="item-price">Preis (€)</Label>
                        <Input
                          id="item-price"
                          type="number"
                          step="0.01"
                          value={newItemPrice}
                          onChange={(e) => setNewItemPrice(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="item-stock">Bestand</Label>
                        <Input
                          id="item-stock"
                          type="number"
                          value={newItemStock}
                          onChange={(e) => setNewItemStock(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="item-description">Beschreibung</Label>
                        <Textarea
                          id="item-description"
                          rows={3}
                          value={newItemDescription}
                          onChange={(e) => setNewItemDescription(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Bild</Label>
                        <div className="flex flex-wrap gap-4 mb-4">
                          <Button
                            variant={imageInputType === "predefined" ? "default" : "outline"}
                            onClick={() => setImageInputType("predefined")}
                            className="flex items-center gap-2"
                          >
                            <Image className="h-4 w-4" />
                            Vordefinierte Bilder
                          </Button>
                          <Button
                            variant={imageInputType === "upload" ? "default" : "outline"}
                            onClick={() => setImageInputType("upload")}
                            className="flex items-center gap-2"
                          >
                            <Upload className="h-4 w-4" />
                            Bild hochladen
                          </Button>
                          <Button
                            variant={imageInputType === "url" ? "default" : "outline"}
                            onClick={() => setImageInputType("url")}
                            className="flex items-center gap-2"
                          >
                            <LinkIcon className="h-4 w-4" />
                            Bild-URL
                          </Button>
                        </div>

                        {imageInputType === "predefined" && (
                          <div className="grid grid-cols-3 gap-2">
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                              <div
                                key={num}
                                className={`relative aspect-square border rounded-md cursor-pointer ${newItemImage === `/images/jay-character-${num}.png` ? "ring-2 ring-primary" : ""}`}
                                onClick={() => handleSelectImage(`/images/jay-character-${num}.png`)}
                              >
                                <img
                                  src={`/images/jay-character-${num}.png`}
                                  alt={`Bild ${num}`}
                                  className="w-full h-full object-contain p-2"
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        {imageInputType === "upload" && (
                          <div className="space-y-4">
                            <Input id="item-image-upload" type="file" accept="image/*" onChange={handleImageUpload} />

                            {newItemImage && newItemImage.startsWith("data:") && (
                              <div className="mt-2">
                                <p className="text-sm mb-2">Vorschau:</p>
                                <div className="border rounded-md p-2 max-w-xs">
                                  <img
                                    src={newItemImage || "/placeholder.svg"}
                                    alt="Vorschau"
                                    className="max-h-40 object-contain mx-auto"
                                  />
                                </div>
                              </div>
                            )}

                            {uploadedImages.length > 0 && (
                              <div className="mt-4">
                                <p className="text-sm mb-2">Bereits hochgeladene Bilder:</p>
                                <div className="grid grid-cols-3 gap-2">
                                  {uploadedImages.map((img) => (
                                    <div
                                      key={img.id}
                                      className={`relative aspect-square border rounded-md cursor-pointer ${newItemImage === img.url ? "ring-2 ring-primary" : ""}`}
                                      onClick={() => handleSelectImage(img.url)}
                                    >
                                      <img
                                        src={img.url || "/placeholder.svg"}
                                        alt={img.name}
                                        className="w-full h-full object-contain p-2"
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {imageInputType === "url" && (
                          <div className="space-y-2">
                            <Input
                              id="item-image-url"
                              placeholder="https://beispiel.de/bild.jpg"
                              value={customImageUrl}
                              onChange={(e) => setCustomImageUrl(e.target.value)}
                            />

                            {customImageUrl && (
                              <div className="mt-2">
                                <p className="text-sm mb-2">Vorschau:</p>
                                <div className="border rounded-md p-2 max-w-xs">
                                  <img
                                    src={customImageUrl || "/placeholder.svg"}
                                    alt="Vorschau"
                                    className="max-h-40 object-contain mx-auto"
                                    onError={(e) => {
                                      e.target.onerror = null
                                      e.target.src = "/placeholder.svg?height=100&width=100"
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => {
                          resetNewItemForm()
                          setIsAddProductDialogOpen(false)
                        }}
                      >
                        Abbrechen
                      </Button>
                      <Button onClick={handleAddShopItem}>
                        {editingItemId ? "Produkt aktualisieren" : "Produkt hinzufügen"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Bestellungen ansehen
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="design" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Design anpassen</CardTitle>
              <CardDescription>Passe das Aussehen deiner Webseite an</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Farbschema</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <div className="h-12 rounded-md bg-primary"></div>
                      <p className="text-sm text-center">Primärfarbe</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-12 rounded-md bg-secondary"></div>
                      <p className="text-sm text-center">Sekundärfarbe</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-12 rounded-md bg-accent"></div>
                      <p className="text-sm text-center">Akzentfarbe</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-12 rounded-md bg-background border"></div>
                      <p className="text-sm text-center">Hintergrund</p>
                    </div>
                  </div>
                  <Button className="flex items-center gap-2" onClick={handleChangeDesign}>
                    <PaintBucket className="h-4 w-4" />
                    Farbschema ändern
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Layout</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                      <div className="h-32 border rounded-md flex flex-col">
                        <div className="h-8 border-b bg-muted/50"></div>
                        <div className="flex-1 flex">
                          <div className="w-1/4 border-r"></div>
                          <div className="flex-1"></div>
                        </div>
                      </div>
                      <p className="text-sm text-center mt-2">Seitenleiste links</p>
                    </Card>
                    <Card className="p-4 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                      <div className="h-32 border rounded-md flex flex-col">
                        <div className="h-8 border-b bg-muted/50"></div>
                        <div className="flex-1 flex">
                          <div className="flex-1"></div>
                          <div className="w-1/4 border-l"></div>
                        </div>
                      </div>
                      <p className="text-sm text-center mt-2">Seitenleiste rechts</p>
                    </Card>
                  </div>
                </div>

                <Button variant="outline" className="flex items-center gap-2" onClick={handleChangeDesign}>
                  <Save className="h-4 w-4" />
                  Layout anpassen
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Einstellungen</CardTitle>
              <CardDescription>Verwalte die Einstellungen deiner Webseite</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Allgemeine Einstellungen</h3>
                  <div className="space-y-2">
                    <Label htmlFor="site-title">Webseitentitel</Label>
                    <Input id="site-title" defaultValue="Jay - Content Creator" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="site-description">Beschreibung</Label>
                    <Textarea
                      id="site-description"
                      rows={3}
                      defaultValue="Offizielle Webseite von Jay - YouTuber, TikToker und Künstler"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">API-Schlüssel</h3>
                  <div className="space-y-2">
                    <Label htmlFor="youtube-api-key">YouTube API-Schlüssel</Label>
                    <Input id="youtube-api-key" type="password" defaultValue="••••••••••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="youtube-channel-id">YouTube Kanal-ID</Label>
                    <Input id="youtube-channel-id" defaultValue={process.env.YOUTUBE_CHANNEL_ID || ""} />
                  </div>
                </div>

                <Button className="flex items-center gap-2" onClick={handleSaveSettings}>
                  <Save className="h-4 w-4" />
                  Einstellungen speichern
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
