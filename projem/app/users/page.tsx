"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"

interface User {
  id: number
  name: string
  avatar: string
  department: string
  year: string
  bio: string
  clubs: string[]
  stats: {
    posts: number
    followers: number
    notesShared: number
  }
  achievements: number
}

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  const users: User[] = [
    {
      id: 1,
      name: "Merve KARASAKAL",
      avatar: "/images/merve-profile.jpg",
      department: "Eczacılık Fakültesi",
      year: "3. Sınıf",
      bio: "Farmakolojiye tutkulu bir öğrenci. Eczacılık Kulübü başkanı.",
      clubs: ["Eczacılık Kulübü Başkanı"],
      stats: { posts: 45, followers: 234, notesShared: 23 },
      achievements: 3,
    },
    {
      id: 2,
      name: "Yusuf BUZLUCAN",
      avatar: "/images/yusuf-profile.jpg",
      department: "Bilgisayar Mühendisliği",
      year: "4. Sınıf",
      bio: "Full-stack developer ve yapay zeka meraklısı. Yazılım Kulübü üyesi.",
      clubs: ["Yazılım Kulübü"],
      stats: { posts: 67, followers: 456, notesShared: 34 },
      achievements: 3,
    },
    {
      id: 3,
      name: "Zeynep Demir",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      department: "Çevre Mühendisliği",
      year: "2. Sınıf",
      bio: "Sürdürülebilir çevre için çalışan mühendislik öğrencisi.",
      clubs: ["Yeşil Kampüs Kurucusu"],
      stats: { posts: 89, followers: 345, notesShared: 19 },
      achievements: 3,
    },
    {
      id: 4,
      name: "Ali Özkan",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      department: "Matematik",
      year: "1. Sınıf",
      bio: "Matematik ve satranç tutkunu genç öğrenci.",
      clubs: ["Satranç Kulübü"],
      stats: { posts: 23, followers: 123, notesShared: 12 },
      achievements: 2,
    },
    {
      id: 5,
      name: "Fatma Yıldız",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      department: "Tıp Fakültesi",
      year: "5. Sınıf",
      bio: "Tıp öğrencisi ve Tıp Kulübü başkanı. İlk yardım eğitmeni.",
      clubs: ["Tıp Kulübü Başkanı"],
      stats: { posts: 78, followers: 567, notesShared: 45 },
      achievements: 4,
    },
    {
      id: 6,
      name: "Burak Şen",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      department: "Müzik Bölümü",
      year: "2. Sınıf",
      bio: "Müzisyen ve Müzik Kulübü üyesi. Piyano ve gitar çalıyor.",
      clubs: ["Müzik Kulübü"],
      stats: { posts: 34, followers: 234, notesShared: 8 },
      achievements: 2,
    },
    {
      id: 7,
      name: "Selin Kara",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      department: "Güzel Sanatlar",
      year: "3. Sınıf",
      bio: "Fotoğrafçı ve Fotoğrafçılık Kulübü başkanı.",
      clubs: ["Fotoğrafçılık Kulübü Başkanı"],
      stats: { posts: 56, followers: 345, notesShared: 15 },
      achievements: 3,
    },
    {
      id: 8,
      name: "Emre Yılmaz",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      department: "İşletme",
      year: "4. Sınıf",
      bio: "Girişimci ve Girişimcilik Kulübü başkanı.",
      clubs: ["Girişimcilik Kulübü Başkanı"],
      stats: { posts: 43, followers: 289, notesShared: 21 },
      achievements: 3,
    },
  ]

  const departments = [
    "all",
    "Eczacılık Fakültesi",
    "Bilgisayar Mühendisliği",
    "Çevre Mühendisliği",
    "Matematik",
    "Tıp Fakültesi",
    "Müzik Bölümü",
    "Güzel Sanatlar",
    "İşletme",
  ]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || user.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <Navbar />

      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Öğrenci Topluluğu
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Üniversitemizdeki aktif öğrencileri keşfedin, yeni arkadaşlıklar kurun ve\
