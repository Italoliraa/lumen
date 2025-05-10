"use client"

import { MapPin, Navigation, Clock, HomeIcon, Home, AlertTriangle, Map, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function RotasPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const savedRoutes = [
    { id: 1, name: "Casa para o Trabalho", distance: "2.5 km", time: "30 min", type: "frequent" },
    { id: 2, name: "Mercado Central", distance: "1.2 km", time: "15 min", type: "saved" },
    { id: 3, name: "Casa da Mãe", distance: "5.0 km", time: "45 min", type: "saved" },
    { id: 4, name: "CRAS", distance: "3.2 km", time: "35 min", type: "saved" },
    { id: 5, name: "Prefeitura do Recife", distance: "4.8 km", time: "50 min", type: "saved" },
  ]

  const filteredRoutes = searchQuery
    ? savedRoutes.filter((route) => route.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : savedRoutes

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white">
      {/* Status bar */}
      <div className="bg-black text-white p-2 flex justify-between items-center text-xs">
        <span>07:00</span>
        <div className="flex space-x-2">
          <span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6 18L18 6M6 6L18 18"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* Header */}
      <div className="p-4 flex items-center space-x-3 bg-white">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="Profile"
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-sm">Bem vindo ao LUMEN,</p>
          <p className="font-semibold">Leandro</p>
        </div>
      </div>

      {/* Voice visualization */}
      <div className="p-4 flex justify-center items-center bg-white relative">
        <div className="h-8 w-full flex items-center justify-center">
          <div className="flex items-center space-x-1">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="bg-gray-300 w-1 h-2 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Routes content */}
      <div className="flex-grow flex flex-col bg-black text-white">
        <div className="p-4">
          <h1 className="text-xl font-bold mb-4 text-center">ROTAS</h1>

          <Input
            type="text"
            placeholder="Buscar rota"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 text-black rounded-full mb-4"
          />
        </div>

        {/* Routes list */}
        <div className="flex-grow overflow-auto px-4">
          <div className="space-y-3 mb-4">
            <h2 className="font-bold text-lg">Rotas frequentes</h2>
            {filteredRoutes
              .filter((route) => route.type === "frequent")
              .map((route) => (
                <Button
                  key={route.id}
                  variant="outline"
                  className="w-full flex justify-between items-center p-4 h-auto bg-gray-800 hover:bg-gray-700 text-white border-gray-700"
                >
                  <div className="flex items-center">
                    <HomeIcon className="h-5 w-5 mr-3 text-purple-400" />
                    <div className="text-left">
                      <div className="font-medium">{route.name}</div>
                      <div className="text-sm text-gray-400">{route.distance}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">{route.time}</span>
                  </div>
                </Button>
              ))}
          </div>

          <div className="space-y-3">
            <h2 className="font-bold text-lg">Rotas salvas</h2>
            {filteredRoutes
              .filter((route) => route.type === "saved")
              .map((route) => (
                <Button
                  key={route.id}
                  variant="outline"
                  className="w-full flex justify-between items-center p-4 h-auto bg-gray-800 hover:bg-gray-700 text-white border-gray-700"
                >
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-3 text-purple-400" />
                    <div className="text-left">
                      <div className="font-medium">{route.name}</div>
                      <div className="text-sm text-gray-400">{route.distance}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">{route.time}</span>
                  </div>
                </Button>
              ))}
          </div>
        </div>

        {/* New route button */}
        <div className="p-4">
          <Button
            className="w-full bg-white text-black hover:bg-gray-200 rounded-full"
            onClick={() => router.push("/gravar-rotas")}
          >
            <Navigation className="h-5 w-5 mr-2" />
            Nova Rota
          </Button>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="grid grid-cols-4 border-t bg-white">
        {[
          { icon: <Home className="h-6 w-6" />, label: "HOME", path: "/" },
          { icon: <AlertTriangle className="h-6 w-6" />, label: "EMERGÊNCIA", path: "/emergencia" },
          { icon: <Map className="h-6 w-6 text-purple-600" />, label: "ROTAS", path: "/rotas" },
          { icon: <User className="h-6 w-6" />, label: "PERFIL", path: "/perfil" },
        ].map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className="flex flex-col items-center justify-center py-2 h-auto rounded-none"
            onClick={() => router.push(item.path)}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
