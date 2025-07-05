"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Activity,
  Bell,
  Users,
  ShoppingBag,
  MessageCircle,
  Search,
  Settings,
  User,
  Star,
  Building2,
  GraduationCap,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Notification {
  id: number
  type: string
  message: string
  time: string
  read: boolean
}

interface SearchResult {
  id: number
  name: string
  avatar: string
  department?: string
  year?: string
  type: "user" | "club" | "instructor"
  category?: string
  members?: number
  rating?: number
  title?: string
  specialization?: string
}

export function Navbar() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [notifications] = useState<Notification[]>([
    {
      id: 1,
      type: "like",
      message: "Yusuf BUZLUCAN gönderinizi beğendi",
      time: "5 dakika önce",
      read: false,
    },
    {
      id: 2,
      type: "comment",
      message: "Zeynep Demir gönderinize yorum yaptı",
      time: "1 saat önce",
      read: false,
    },
    {
      id: 3,
      type: "club",
      message: "Yazılım Kulübü etkinlik duyurusu",
      time: "2 saat önce",
      read: true,
    },
    {
      id: 4,
      type: "friend",
      message: "Ali Özkan arkadaşlık isteği gönderdi",
      time: "1 gün önce",
      read: false,
    },
  ])

  const mockUsers: SearchResult[] = [
    {
      id: 1,
      name: "Merve KARASAKAL",
      avatar: "/images/merve-profile.jpg",
      department: "Eczacılık",
      year: "3. Sınıf",
      type: "user",
    },
    {
      id: 2,
      name: "Yusuf BUZLUCAN",
      avatar: "/images/yusuf-profile.jpg",
      department: "Bilgisayar Mühendisliği",
      year: "4. Sınıf",
      type: "user",
    },
    {
      id: 3,
      name: "Zeynep Demir",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      department: "Çevre Mühendisliği",
      year: "2. Sınıf",
      type: "user",
    },
    {
      id: 4,
      name: "Ali Özkan",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      department: "Matematik",
      year: "1. Sınıf",
      type: "user",
    },
  ]

  const mockClubs: SearchResult[] = [
    {
      id: 1,
      name: "Eczacılık Kulübü",
      avatar: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=40&h=40&fit=crop",
      category: "Akademik",
      members: 156,
      rating: 4.8,
      type: "club",
    },
    {
      id: 2,
      name: "Yazılım Kulübü",
      avatar: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=40&h=40&fit=crop",
      category: "Teknoloji",
      members: 234,
      rating: 4.9,
      type: "club",
    },
    {
      id: 3,
      name: "Yeşil Kampüs",
      avatar: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=40&h=40&fit=crop",
      category: "Çevre",
      members: 189,
      rating: 4.7,
      type: "club",
    },
    {
      id: 4,
      name: "Satranç Kulübü",
      avatar: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=40&h=40&fit=crop",
      category: "Spor",
      members: 78,
      rating: 4.5,
      type: "club",
    },
  ]

  const mockInstructors: SearchResult[] = [
    {
      id: 1,
      name: "Prof. Dr. Mehmet AK",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      department: "Eczacılık Fakültesi",
      title: "Profesör",
      specialization: "Farmakoloji",
      type: "instructor",
    },
    {
      id: 2,
      name: "Doç. Dr. Ayşe KAYA",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      department: "Eczacılık Fakültesi",
      title: "Doçent",
      specialization: "Biyokimya",
      type: "instructor",
    },
    {
      id: 3,
      name: "Prof. Dr. Ali DEMİR",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      department: "Eczacılık Fakültesi",
      title: "Profesör",
      specialization: "Anatomi",
      type: "instructor",
    },
  ]

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      const filteredUsers = mockUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.department?.toLowerCase().includes(query.toLowerCase()),
      )
      const filteredClubs = mockClubs.filter(
        (club) =>
          club.name.toLowerCase().includes(query.toLowerCase()) ||
          club.category?.toLowerCase().includes(query.toLowerCase()),
      )
      const filteredInstructors = mockInstructors.filter(
        (instructor) =>
          instructor.name.toLowerCase().includes(query.toLowerCase()) ||
          instructor.specialization?.toLowerCase().includes(query.toLowerCase()),
      )
      setSearchResults([...filteredUsers, ...filteredClubs, ...filteredInstructors])
    } else {
      setSearchResults([])
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  const getSearchResultLink = (result: SearchResult) => {
    switch (result.type) {
      case "user":
        return `/profile/${result.id}`
      case "club":
        return `/clubs/${result.id}`
      case "instructor":
        return `/profile/instructor/${result.id}`
      default:
        return "/"
    }
  }

  const [isLoggedIn, setIsLoggedIn] = useState(true)

  const handleLogout = () => {
    setIsLoggedIn(false)
    router.push("/login")
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              UniLabs.
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
              <Activity className="w-5 h-5" />
              <span>Akış</span>
            </Link>
            <Link
              href="/announcements"
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span>Duyurular</span>
            </Link>
            <Link
              href="/clubs"
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Users className="w-5 h-5" />
              <span>Kulüpler</span>
            </Link>
            <Link
              href="/instructors"
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <GraduationCap className="w-5 h-5" />
              <span>Hocalar</span>
            </Link>
            <Link
              href="/club-management"
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Building2 className="w-5 h-5" />
              <span>Kulüp Yönetimi</span>
            </Link>
            <Link
              href="/store"
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Mağaza</span>
            </Link>
            <Link
              href="/chat"
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Sohbet</span>
            </Link>
          </div>

          {/* Search, Notifications, Profile */}
          <div className="flex items-center space-x-4">
            {/* Search - sadece giriş yapmış kullanıcılar için */}
            {isLoggedIn && (
              <Popover>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Ara..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="pl-10 w-64 bg-gray-50 border-gray-200 focus:border-blue-300"
                    />
                  </div>
                </PopoverTrigger>
                {searchResults.length > 0 && (
                  <PopoverContent className="w-80 p-2">
                    <div className="space-y-2">
                      {searchResults.map((result) => (
                        <Link
                          key={`${result.type}-${result.id}`}
                          href={getSearchResultLink(result)}
                          className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={result.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white">
                              {result.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <p className="font-medium text-gray-800">{result.name}</p>
                              {result.type === "club" && (
                                <Badge variant="secondary" className="text-xs">
                                  Kulüp
                                </Badge>
                              )}
                              {result.type === "instructor" && (
                                <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                                  Hoca
                                </Badge>
                              )}
                            </div>
                            {result.type === "user" ? (
                              <p className="text-sm text-gray-500">
                                {result.department} - {result.year}
                              </p>
                            ) : result.type === "club" ? (
                              <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <span>{result.category}</span>
                                <span>•</span>
                                <div className="flex items-center space-x-1">
                                  <Users className="w-3 h-3" />
                                  <span>{result.members}</span>
                                </div>
                                <span>•</span>
                                <div className="flex items-center space-x-1">
                                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                  <span>{result.rating}</span>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <span>{result.title}</span>
                                <span>•</span>
                                <span>{result.specialization}</span>
                              </div>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </PopoverContent>
                )}
              </Popover>
            )}

            {isLoggedIn ? (
              <>
                {/* Notifications */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative">
                      <Bell className="w-5 h-5" />
                      {unreadCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                          {unreadCount}
                        </Badge>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0">
                    <div className="p-4 border-b">
                      <h3 className="font-semibold text-gray-800">Bildirimler</h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b hover:bg-gray-50 transition-colors ${
                            !notification.read ? "bg-blue-50" : ""
                          }`}
                        >
                          <p className="text-sm text-gray-800">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Profile */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar className="cursor-pointer ring-2 ring-blue-200 hover:ring-blue-300 transition-all">
                      <AvatarImage src="/images/merve-profile.jpg" />
                      <AvatarFallback className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white">
                        MK
                      </AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-2">
                    <div className="space-y-1">
                      <Link
                        href="/profile"
                        className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <User className="w-4 h-4" />
                        <span>Profilim</span>
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Ayarlar</span>
                      </Link>
                      <hr className="my-2" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg transition-colors w-full text-left text-red-600"
                      >
                        <span>Çıkış Yap</span>
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </>
            ) : (
              <>
                {/* Login/Register Buttons */}
                <div className="flex items-center space-x-2">
                  <Link href="/login">
                    <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                      Giriş Yap
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                      Kaydol
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
