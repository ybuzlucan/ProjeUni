"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Star, Filter, Search, ShoppingCart, Grid3X3, List, Award, Bookmark, BookmarkCheck } from "lucide-react"
import { Navbar } from "@/components/navbar"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviews: number
  seller: string
  sellerAvatar: string
  isLiked?: boolean
  isSaved?: boolean
  tags: string[]
  description: string
  university: string
}

interface Seller {
  id: number
  name: string
  avatar: string
  rating: number
  products: number
  followers: number
  verified: boolean
  university: string
  department: string
}

export default function StorePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [likedProducts, setLikedProducts] = useState<number[]>([])
  const [savedProducts, setSavedProducts] = useState<number[]>([])

  const products: Product[] = [
    {
      id: 1,
      name: "Harvard University Sweatshirt",
      price: 299,
      originalPrice: 399,
      image: "/images/harvard-sweatshirt.jpg",
      category: "sweatshirt",
      rating: 4.8,
      reviews: 156,
      seller: "Merve KARASAKAL",
      sellerAvatar: "/images/merve-profile.jpg",
      tags: ["Harvard", "Premium", "Unisex"],
      description: "Orijinal Harvard University sweatshirt. Yüksek kalite pamuklu kumaş.",
      university: "Harvard",
    },
    {
      id: 2,
      name: "Chicago Illinois T-Shirt",
      price: 149,
      image: "/images/chicago-tshirt.jpg",
      category: "tshirt",
      rating: 4.6,
      reviews: 89,
      seller: "Yusuf BUZLUCAN",
      sellerAvatar: "/images/yusuf-profile.jpg",
      tags: ["Chicago", "Vintage", "Cotton"],
      description: "Retro Chicago Illinois üniversite t-shirt. Rahat kesim.",
      university: "Chicago",
    },
    {
      id: 3,
      name: "Yale University Sweatshirt",
      price: 349,
      image: "/images/yale-sweatshirt.jpg",
      category: "sweatshirt",
      rating: 4.9,
      reviews: 234,
      seller: "Zeynep Demir",
      sellerAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      tags: ["Yale", "Luxury", "Navy"],
      description: "Prestijli Yale University sweatshirt. Kaliteli işçilik.",
      university: "Yale",
    },
    {
      id: 4,
      name: "Notre Dame Fighting Irish Sweatshirt",
      price: 279,
      originalPrice: 329,
      image: "/images/notre-dame-sweatshirt.jpg",
      category: "sweatshirt",
      rating: 4.7,
      reviews: 167,
      seller: "Can Yılmaz",
      sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      tags: ["Notre Dame", "Sports", "Vintage"],
      description: "Notre Dame Fighting Irish sweatshirt. Spor tarzı tasarım.",
      university: "Notre Dame",
    },
    {
      id: 5,
      name: "Oxford University Hoodie (Grey)",
      price: 399,
      image: "/images/oxford-hoodie-grey.jpg",
      category: "hoodie",
      rating: 4.8,
      reviews: 198,
      seller: "Ali Özkan",
      sellerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      tags: ["Oxford", "Premium", "Grey"],
      description: "Oxford University resmi hoodie. Gri renk seçeneği.",
      university: "Oxford",
    },
    {
      id: 6,
      name: "Oxford University Hoodie (Navy)",
      price: 399,
      image: "/images/oxford-hoodie-navy.jpg",
      category: "hoodie",
      rating: 4.9,
      reviews: 245,
      seller: "Fatma Yıldız",
      sellerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
      tags: ["Oxford", "Premium", "Navy"],
      description: "Oxford University resmi hoodie. Lacivert renk seçeneği.",
      university: "Oxford",
    },
    {
      id: 7,
      name: "Cambridge University Sweatshirt",
      price: 329,
      image: "/images/cambridge-sweatshirt.jpg",
      category: "sweatshirt",
      rating: 4.7,
      reviews: 134,
      seller: "Emre Yılmaz",
      sellerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      tags: ["Cambridge", "Classic", "Navy"],
      description: "Cambridge University klasik sweatshirt. İngiliz tarzı.",
      university: "Cambridge",
    },
    {
      id: 8,
      name: "Michigan Wolverines Sweatshirt Set",
      price: 449,
      originalPrice: 599,
      image: "/images/michigan-sweatshirts.jpg",
      category: "sweatshirt",
      rating: 4.8,
      reviews: 189,
      seller: "Selin Kara",
      sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
      tags: ["Michigan", "Set", "Wolverines"],
      description: "Michigan Wolverines sweatshirt seti. 2 parça birlikte.",
      university: "Michigan",
    },
    {
      id: 9,
      name: "Yale University T-Shirt (White)",
      price: 179,
      image: "/images/yale-tshirt.jpg",
      category: "tshirt",
      rating: 4.5,
      reviews: 98,
      seller: "Burak Şen",
      sellerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      tags: ["Yale", "White", "Classic"],
      description: "Yale University beyaz t-shirt. Klasik tasarım.",
      university: "Yale",
    },
    {
      id: 10,
      name: "Oxford University Hoodie with Patches",
      price: 459,
      image: "/images/oxford-hoodie-patches.jpg",
      category: "hoodie",
      rating: 4.9,
      reviews: 267,
      seller: "Ayşe Kaya",
      sellerAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      tags: ["Oxford", "Patches", "Limited"],
      description: "Oxford University özel yama detaylı hoodie. Sınırlı üretim.",
      university: "Oxford",
    },
  ]

  const topSellers: Seller[] = [
    {
      id: 1,
      name: "Merve KARASAKAL",
      avatar: "/images/merve-profile.jpg",
      rating: 4.9,
      products: 23,
      followers: 1234,
      verified: true,
      university: "Eczacılık Fakültesi",
      department: "3. Sınıf",
    },
    {
      id: 2,
      name: "Yusuf BUZLUCAN",
      avatar: "/images/yusuf-profile.jpg",
      rating: 4.8,
      products: 18,
      followers: 987,
      verified: true,
      university: "Bilgisayar Mühendisliği",
      department: "4. Sınıf",
    },
    {
      id: 3,
      name: "Zeynep Demir",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      rating: 4.7,
      products: 15,
      followers: 756,
      verified: false,
      university: "Çevre Mühendisliği",
      department: "2. Sınıf",
    },
  ]

  const categories = [
    { id: "all", name: "Tümü", count: products.length },
    { id: "sweatshirt", name: "Sweatshirt", count: products.filter((p) => p.category === "sweatshirt").length },
    { id: "hoodie", name: "Hoodie", count: products.filter((p) => p.category === "hoodie").length },
    { id: "tshirt", name: "T-Shirt", count: products.filter((p) => p.category === "tshirt").length },
  ]

  const handleLike = (productId: number) => {
    setLikedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const handleSave = (productId: number) => {
    setSavedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.university.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return b.id - a.id
      default:
        return b.reviews - a.reviews
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <Navbar />

      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            Üniversite Mağazası
          </h1>
          <p className="text-gray-600">Prestijli üniversitelerin orijinal kıyafetleri</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Search className="w-5 h-5 mr-2 text-blue-500" />
                  Arama
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Ürün veya üniversite ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Filter className="w-5 h-5 mr-2 text-blue-500" />
                  Kategoriler
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <span>{category.name}</span>
                    <Badge variant={selectedCategory === category.id ? "secondary" : "outline"}>{category.count}</Badge>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Top Sellers */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Award className="w-5 h-5 mr-2 text-blue-500" />
                  En İyi Satıcılar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {topSellers.map((seller, index) => (
                  <div key={seller.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={seller.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white">
                          {seller.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {seller.verified && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <Award className="w-2 h-2 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{seller.name}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span>{seller.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{seller.products} ürün</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      #{index + 1}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-6">
            {/* Controls */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">{sortedProducts.length} ürün bulundu</span>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Sırala" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="popular">En Popüler</SelectItem>
                        <SelectItem value="newest">En Yeni</SelectItem>
                        <SelectItem value="price-low">Fiyat (Düşük-Yüksek)</SelectItem>
                        <SelectItem value="price-high">Fiyat (Yüksek-Düşük)</SelectItem>
                        <SelectItem value="rating">En Yüksek Puan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className={viewMode === "grid" ? "bg-gradient-to-r from-blue-500 to-cyan-500" : ""}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className={viewMode === "list" ? "bg-gradient-to-r from-blue-500 to-cyan-500" : ""}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Products Grid */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
              {sortedProducts.map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group"
                >
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 flex space-x-2">
                      <button
                        onClick={() => handleLike(product.id)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                          likedProducts.includes(product.id)
                            ? "bg-red-500 text-white"
                            : "bg-white/80 text-gray-600 hover:bg-red-50 hover:text-red-500"
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${likedProducts.includes(product.id) ? "fill-current" : ""}`} />
                      </button>
                      <button
                        onClick={() => handleSave(product.id)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                          savedProducts.includes(product.id)
                            ? "bg-blue-500 text-white"
                            : "bg-white/80 text-gray-600 hover:bg-blue-50 hover:text-blue-500"
                        }`}
                      >
                        {savedProducts.includes(product.id) ? (
                          <BookmarkCheck className="w-4 h-4 fill-current" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {product.originalPrice && (
                      <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                        %{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)} İndirim
                      </Badge>
                    )}
                  </div>

                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-800 line-clamp-2">{product.name}</h3>
                      <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-800 text-xs">
                        {product.university}
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

                    <div className="flex items-center space-x-2 mb-3">
                      {product.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({product.reviews} değerlendirme)</span>
                    </div>

                    <div className="flex items-center space-x-2 mb-4">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={product.sellerAvatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white text-xs">
                          {product.seller
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-600">{product.seller}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-gray-800">{product.price}₺</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">{product.originalPrice}₺</span>
                        )}
                      </div>
                      <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Sepete Ekle
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Ürün bulunamadı</h3>
                  <p className="text-gray-600">Arama kriterlerinizi değiştirerek tekrar deneyin.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
