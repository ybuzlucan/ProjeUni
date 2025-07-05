"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Users, Mic, MicOff, Volume2, Send, Smile, Paperclip, Hash, Lock } from "lucide-react"
import { Navbar } from "@/components/navbar"

interface ChatRoom {
  id: number
  name: string
  type: "group" | "voice" | "private"
  members: number
  isActive?: boolean
  lastMessage?: string
  lastTime?: string
  unread?: number
  isLocked?: boolean
}

interface Message {
  id: number
  sender: string
  avatar: string
  content: string
  time: string
  type: "text" | "file" | "image"
}

interface VoiceRoom {
  id: number
  name: string
  members: number
  maxMembers: number
  isActive: boolean
  participants: Array<{
    name: string
    avatar: string
    isMuted: boolean
    isSpeaking: boolean
  }>
}

export default function ChatPage() {
  const [selectedRoom, setSelectedRoom] = useState<number>(1)
  const [newMessage, setNewMessage] = useState("")

  const chatRooms: ChatRoom[] = [
    {
      id: 1,
      name: "3. Sınıf Eczacılık",
      type: "group",
      members: 45,
      lastMessage: "Yarınki sınavla ilgili notları paylaştım",
      lastTime: "5 dk",
      unread: 3,
    },
    {
      id: 2,
      name: "Eczacılık Kulübü",
      type: "group",
      members: 156,
      lastMessage: "Etkinlik için toplantı yarın saat 14:00",
      lastTime: "12 dk",
      unread: 7,
    },
    {
      id: 3,
      name: "Farmakoloji Dersi",
      type: "group",
      members: 67,
      lastMessage: "Ödev teslim tarihi uzatıldı",
      lastTime: "1 sa",
      unread: 1,
    },
    {
      id: 4,
      name: "Kampüs Genel",
      type: "group",
      members: 1234,
      lastMessage: "Yemekhane menüsü güncellendi",
      lastTime: "2 sa",
    },
    {
      id: 5,
      name: "Yazılım Kulübü",
      type: "group",
      members: 234,
      lastMessage: "Hackathon kayıtları başladı!",
      lastTime: "3 sa",
      unread: 12,
    },
  ]

  const voiceRooms: VoiceRoom[] = [
    {
      id: 1,
      name: "Ders Çalışma",
      members: 8,
      maxMembers: 20,
      isActive: true,
      participants: [
        { name: "Merve K.", avatar: "/images/merve-profile.jpg", isMuted: false, isSpeaking: true },
        { name: "Yusuf B.", avatar: "/images/yusuf-profile.jpg", isMuted: true, isSpeaking: false },
        { name: "Zeynep D.", avatar: "/placeholder.svg?height=32&width=32", isMuted: false, isSpeaking: false },
      ],
    },
    {
      id: 2,
      name: "Sohbet Odası",
      members: 12,
      maxMembers: 30,
      isActive: false,
      participants: [],
    },
    {
      id: 3,
      name: "Müzik Dinleme",
      members: 5,
      maxMembers: 15,
      isActive: false,
      participants: [],
    },
    {
      id: 4,
      name: "Oyun Odası",
      members: 15,
      maxMembers: 25,
      isActive: false,
      participants: [],
    },
  ]

  const messages: Message[] = [
    {
      id: 1,
      sender: "Yusuf BUZLUCAN",
      avatar: "/images/yusuf-profile.jpg",
      content: "Merhaba arkadaşlar! Yarınki farmakoloji sınavı için kimya notlarını paylaşabilir miyiz?",
      time: "09:15",
      type: "text",
    },
    {
      id: 2,
      sender: "Zeynep Demir",
      avatar: "/placeholder.svg?height=32&width=32",
      content: "Tabii ki! Ben de biyokimya notlarımı paylaşacağım.",
      time: "09:18",
      type: "text",
    },
    {
      id: 3,
      sender: "Ali Özkan",
      avatar: "/placeholder.svg?height=32&width=32",
      content: "Harika! Grup çalışması yapalım mı?",
      time: "09:22",
      type: "text",
    },
    {
      id: 4,
      sender: "Merve KARASAKAL",
      avatar: "/images/merve-profile.jpg",
      content: "Evet, ben de katılırım. Kütüphanede buluşalım.",
      time: "09:25",
      type: "text",
    },
  ]

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setNewMessage("")
    }
  }

  const joinVoiceRoom = (roomId: number) => {
    alert("Sesli odaya katıldınız!")
  }

  const selectedRoomData = chatRooms.find((room) => room.id === selectedRoom)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <Navbar />

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Tabs defaultValue="chats" className="h-full">
              <TabsList className="grid w-full grid-cols-2 mb-4 bg-white/80 backdrop-blur-sm">
                <TabsTrigger
                  value="chats"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Sohbet
                </TabsTrigger>
                <TabsTrigger
                  value="voice"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
                >
                  <Mic className="w-4 h-4 mr-2" />
                  Sesli
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chats" className="h-full">
                <Card className="h-full shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-gray-800">Sohbet Odaları</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[calc(100vh-16rem)]">
                      <div className="space-y-2 p-4">
                        {chatRooms.map((room) => (
                          <div
                            key={room.id}
                            onClick={() => setSelectedRoom(room.id)}
                            className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                              selectedRoom === room.id
                                ? "bg-gradient-to-r from-blue-100 to-cyan-100 border-l-4 border-blue-500"
                                : "hover:bg-gray-50"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center space-x-2">
                                <Hash className="w-4 h-4 text-gray-500" />
                                <span className="font-medium text-gray-800 text-sm">{room.name}</span>
                                {room.isLocked && <Lock className="w-3 h-3 text-gray-400" />}
                              </div>
                              {room.unread && (
                                <Badge className="bg-red-500 text-white text-xs px-2 py-1">{room.unread}</Badge>
                              )}
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span className="flex items-center space-x-1">
                                <Users className="w-3 h-3" />
                                <span>{room.members}</span>
                              </span>
                              {room.lastTime && <span>{room.lastTime}</span>}
                            </div>
                            {room.lastMessage && (
                              <p className="text-xs text-gray-600 mt-1 truncate">{room.lastMessage}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="voice" className="h-full">
                <Card className="h-full shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-gray-800">Sesli Sohbet Odaları</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[calc(100vh-16rem)]">
                      <div className="space-y-3 p-4">
                        {voiceRooms.map((room) => (
                          <Card
                            key={room.id}
                            className="border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer"
                            onClick={() => joinVoiceRoom(room.id)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <Volume2 className="w-4 h-4 text-blue-500" />
                                  <span className="font-medium text-gray-800 text-sm">{room.name}</span>
                                </div>
                                <Badge variant={room.isActive ? "default" : "secondary"} className="text-xs">
                                  {room.isActive ? "Aktif" : "Boş"}
                                </Badge>
                              </div>

                              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                                <span>
                                  {room.members}/{room.maxMembers} kişi
                                </span>
                              </div>

                              {room.isActive && room.participants.length > 0 && (
                                <div className="flex -space-x-2 mb-3">
                                  {room.participants.slice(0, 4).map((participant, index) => (
                                    <div key={index} className="relative">
                                      <Avatar className="w-6 h-6 border-2 border-white">
                                        <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                                        <AvatarFallback className="text-xs bg-gradient-to-r from-blue-400 to-cyan-400 text-white">
                                          {participant.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                        </AvatarFallback>
                                      </Avatar>
                                      {participant.isSpeaking && (
                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                      )}
                                      {participant.isMuted && (
                                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                                          <MicOff className="w-2 h-2 text-white" />
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}

                              <Button
                                size="sm"
                                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-xs"
                              >
                                Odaya Katıl
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-full shadow-lg border-0 bg-white/80 backdrop-blur-sm flex flex-col">
              {/* Chat Header */}
              <CardHeader className="border-b border-gray-200 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <Hash className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-800">{selectedRoomData?.name}</h2>
                      <p className="text-sm text-gray-500">{selectedRoomData?.members} üye</p>
                    </div>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-[calc(100vh-20rem)] p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className="flex items-start space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={message.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white text-xs">
                            {message.sender
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-sm text-gray-800">{message.sender}</span>
                            <span className="text-xs text-gray-500">{message.time}</span>
                          </div>
                          <div className="bg-gray-50 rounded-lg px-3 py-2 max-w-md">
                            {message.type === "text" && <p className="text-sm text-gray-700">{message.content}</p>}
                            {message.type === "file" && (
                              <div className="flex items-center space-x-2 text-sm text-blue-600">
                                <Paperclip className="w-4 h-4" />
                                <span>{message.content}</span>
                              </div>
                            )}
                            {message.type === "image" && (
                              <div className="text-sm text-green-600">📷 Fotoğraf paylaştı</div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Message Input */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Input
                    placeholder="Mesaj yazın..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm">
                    <Smile className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={handleSendMessage}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
