"use client"

import { Settings, Bell, Share2, HelpCircle, LogOut, Home, AlertTriangle, Map, User, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function PerfilPage() {
  const router = useRouter()

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

      {/* Profile content */}
      <div className="flex-grow flex flex-col bg-black text-white">
        <div className="p-4">
          <h1 className="text-xl font-bold mb-6 text-center">PERFIL</h1>

          {/* Profile info */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-24 h-24 rounded-full overflow-hidden mr-4 border-4 border-white">
              <Image
                src="/placeholder.svg?height=96&width=96"
                alt="Profile"
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-xl font-bold">Leandro</h2>
            <p className="text-gray-400">leandro@email.com</p>
          </div>
        </div>

        {/* Settings */}
        <div className="flex-grow px-4 space-y-4">
          {/* New option: Locate Leandro */}
          <Button
            variant="outline"
            className="w-full flex justify-between items-center p-4 h-auto bg-gray-800 hover:bg-gray-700 text-white border-gray-700"
            onClick={() => router.push("/localizar-leandro")}
          >
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-3" />
              <span>Localizar Leandro</span>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>

          <Button
            variant="outline"
            className="w-full flex justify-between items-center p-4 h-auto bg-gray-800 hover:bg-gray-700 text-white border-gray-700"
          >
            <div className="flex items-center">
              <Settings className="h-5 w-5 mr-3" />
              <span>Configurações do aplicativo</span>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>

          <Button
            variant="outline"
            className="w-full flex justify-between items-center p-4 h-auto bg-gray-800 hover:bg-gray-700 text-white border-gray-700"
          >
            <div className="flex items-center">
              <Bell className="h-5 w-5 mr-3" />
              <span>Notificações</span>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>

          <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center">
              <Share2 className="h-5 w-5 mr-3" />
              <span>Compartilhar localização</span>
            </div>
            <Switch />
          </div>

          <Button
            variant="outline"
            className="w-full flex justify-between items-center p-4 h-auto bg-gray-800 hover:bg-gray-700 text-white border-gray-700"
            onClick={() => router.push("/ajuda")}
          >
            <div className="flex items-center">
              <HelpCircle className="h-5 w-5 mr-3" />
              <span>Ajuda e suporte</span>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>

        {/* Logout */}
        <div className="p-4">
          <Button variant="outline" className="w-full bg-white text-black hover:bg-gray-200 rounded-full">
            <LogOut className="h-5 w-5 mr-2" />
            Sair
          </Button>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="grid grid-cols-4 border-t bg-white">
        {[
          { icon: <Home className="h-6 w-6" />, label: "HOME", path: "/" },
          { icon: <AlertTriangle className="h-6 w-6" />, label: "EMERGÊNCIA", path: "/emergencia" },
          { icon: <Map className="h-6 w-6" />, label: "ROTAS", path: "/rotas" },
          { icon: <User className="h-6 w-6 text-purple-600" />, label: "PERFIL", path: "/perfil" },
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
