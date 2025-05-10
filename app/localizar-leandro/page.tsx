"use client"

import { useState } from "react"
import { Home, AlertTriangle, Map, User, Search, HelpCircle, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function LocalizarLeandroPage() {
  const router = useRouter()
  const [isListening, setIsListening] = useState(false)

  // Simulate voice recognition
  const toggleVoiceRecognition = () => {
    setIsListening(!isListening)
    if (!isListening) {
      // In a real app, this would start voice recognition
      setTimeout(() => {
        setIsListening(false)
      }, 3000)
    }
  }

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white relative overflow-hidden">
      {/* Status bar */}
      <div className="bg-black text-white p-2 flex justify-between items-center text-xs">
        <span>07:00</span>
        <span className="font-bold">AM</span>
      </div>

      {/* Voice visualization */}
      <div className="p-4 flex justify-center items-center bg-white relative">
        <Button variant="ghost" size="icon" className="absolute left-4" onClick={toggleVoiceRecognition}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11 5L6 9H2V15H6L11 19V5Z"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.54 8.46C16.4774 9.39764 17.004 10.6692 17.004 11.995C17.004 13.3208 16.4774 14.5924 15.54 15.53"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="sr-only">Ativar voz</span>
        </Button>
        <div className="h-8 w-full flex items-center justify-center">
          <div className="flex items-center space-x-1">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="bg-gray-300 w-1 h-2 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow flex flex-col bg-black">
        {/* Quick action buttons */}
        <div className="grid grid-cols-3 gap-4 p-4">
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-24 bg-white hover:bg-gray-100 text-black border-white"
            onClick={() => router.push("/rastreio")}
          >
            <Search className="h-8 w-8 mb-2" />
            <span>Rastreio</span>
          </Button>

          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-24 bg-white hover:bg-gray-100 text-black border-white"
            onClick={() => router.push("/emergencia")}
          >
            <div className="relative mb-2">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <span className="absolute w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="absolute w-4 h-1 bg-white"></span>
                  <span className="absolute h-4 w-1 bg-white"></span>
                </span>
              </div>
            </div>
            <span>Emergência</span>
          </Button>

          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-24 bg-white hover:bg-gray-100 text-black border-white"
            onClick={() => router.push("/ajuda")}
          >
            <HelpCircle className="h-8 w-8 mb-2" />
            <span>Ajuda</span>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 px-4">
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-24 bg-white hover:bg-gray-100 text-black border-white"
            onClick={() => router.push("/gravar-rotas")}
          >
            <MapPin className="h-8 w-8 mb-2" />
            <span>Gravar Rotas</span>
          </Button>
          <div></div> {/* Empty space to maintain grid layout */}
        </div>

        {/* Locate user section */}
        <div className="p-4 text-white text-center my-4">
          <h2 className="text-xl font-bold">LOCALIZE O LEANDRO</h2>
        </div>

        {/* Map */}
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
          </div>
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
