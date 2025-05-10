"use client"

import { useState } from "react"
import { Play, Square, Save, MapPin, MapIcon, Home, AlertTriangle, Map, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function GravarRotasPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [routeName, setRouteName] = useState("")
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const router = useRouter()

  const toggleRecording = () => {
    if (isRecording) {
      setShowSaveDialog(true)
    } else {
      setIsRecording(true)
    }
  }

  const saveRoute = () => {
    // In a real app, this would save the route to a database
    setIsRecording(false)
    setShowSaveDialog(false)
    setRouteName("")
    // Show success message or navigate back
    router.push("/rotas")
  }

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

      {/* Main content */}
      <div className="flex-grow flex flex-col bg-black text-white">
        <div className="p-4">
          <h1 className="text-xl font-bold mb-4 text-center">GRAVAR ROTAS</h1>
        </div>

        {/* Map area */}
        <div className="flex-grow relative">
          <div className="absolute inset-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63201.44826055548!2d-34.94574384179687!3d-8.047565699999992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab18a48ed72541%3A0x9e446515b9fd7871!2sPrefeitura%20do%20Recife!5e0!3m2!1spt-BR!2sbr!4v1715294400000!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
              className="w-full h-full"
            ></iframe>

            {isRecording && (
              <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full flex items-center">
                <div className="w-3 h-3 bg-white rounded-full mr-2 animate-pulse"></div>
                Gravando...
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="p-4">
          <div className="flex justify-between items-center">
            <Button variant="outline" className="flex items-center bg-white text-black hover:bg-gray-200 border-none">
              <MapPin className="h-5 w-5 mr-2" />
              Marcar Ponto
            </Button>

            <Button
              onClick={toggleRecording}
              className={`w-16 h-16 rounded-full flex items-center justify-center ${
                isRecording ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isRecording ? <Square className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
            </Button>

            <Button variant="outline" className="flex items-center bg-white text-black hover:bg-gray-200 border-none">
              <MapIcon className="h-5 w-5 mr-2" />
              Ver Rotas
            </Button>
          </div>
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

      {/* Save dialog */}
      {showSaveDialog && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4 text-black">Salvar Rota</h2>
            <Input
              type="text"
              placeholder="Nome da rota"
              value={routeName}
              onChange={(e) => setRouteName(e.target.value)}
              className="mb-4"
            />
            <div className="flex space-x-2">
              <Button variant="outline" className="flex-1" onClick={() => setShowSaveDialog(false)}>
                Cancelar
              </Button>
              <Button className="flex-1" onClick={saveRoute} disabled={!routeName.trim()}>
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
