"use client"

import { useState } from "react"
import { Home, AlertTriangle, Mic, Map, User, Volume2 } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const [isListening, setIsListening] = useState(false)
  const [userName, setUserName] = useState("Leandro")
  const [origin, setOrigin] = useState("Localização atual")
  const [destination, setDestination] = useState("")
  const [savedLocations, setSavedLocations] = useState([
    { name: "Casa de Mãe", checked: false },
    { name: "CRAS", checked: false },
    { name: "Prefeitura do Recife", checked: true },
  ])
  const [voicePrompt, setVoicePrompt] = useState("")
  const router = useRouter()

  // Simulate voice recognition
  const toggleVoiceRecognition = () => {
    setIsListening(!isListening)
    if (!isListening) {
      // In a real app, this would start voice recognition
      setVoicePrompt("Ouvindo...")

      setTimeout(() => {
        setVoicePrompt("Para onde você quer ir?")

        setTimeout(() => {
          setVoicePrompt("Entendi! Você quer ir para Prefeitura do Recife.")
          setDestination("Prefeitura do Recife")

          // Update the checkbox selection
          const newLocations = [...savedLocations]
          newLocations.forEach((loc, index) => {
            newLocations[index].checked = loc.name === "Prefeitura do Recife"
          })
          setSavedLocations(newLocations)

          setTimeout(() => {
            setIsListening(false)
            setVoicePrompt("")
          }, 2000)
        }, 2000)
      }, 2000)
    }
  }

  const navigateTo = (path: string) => {
    router.push(path)
  }

  const toggleLocationSelection = (index: number) => {
    const newLocations = [...savedLocations]
    // Uncheck all locations first
    newLocations.forEach((loc) => (loc.checked = false))
    // Check the selected one
    newLocations[index].checked = true
    setSavedLocations(newLocations)
    setDestination(newLocations[index].name)
  }

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white relative overflow-hidden">
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
          <p className="font-semibold">{userName}</p>
        </div>
      </div>

      {/* Voice visualization */}
      <div className="p-4 flex justify-center items-center bg-white relative">
        <Button variant="ghost" size="icon" className="absolute left-4" onClick={toggleVoiceRecognition}>
          <Volume2 className="h-6 w-6" />
          <span className="sr-only">Ativar voz</span>
        </Button>
        <div className="h-8 w-full flex items-center justify-center">
          {isListening ? (
            <div className="flex items-center space-x-1">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="bg-black w-1 rounded-full"
                  style={{
                    height: `${Math.random() * 24 + 4}px`,
                    animationDelay: `${i * 0.05}s`,
                  }}
                ></div>
              ))}
            </div>
          ) : (
            <div className="flex items-center space-x-1">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="bg-gray-300 w-1 h-2 rounded-full"></div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow flex flex-col bg-black text-white">
        {/* Voice Record Button */}
        <div className="p-4">
          <Button
            onClick={toggleVoiceRecognition}
            className={`w-full py-3 rounded-full flex items-center justify-center space-x-2 ${
              isListening ? "bg-red-600 hover:bg-red-700" : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            <Mic className="h-5 w-5" />
            <span>{isListening ? "Gravando..." : "Gravar comando de voz"}</span>
          </Button>

          {voicePrompt && (
            <div className="mt-2 p-3 bg-gray-800 rounded-lg text-center">
              <p>{voicePrompt}</p>
            </div>
          )}
        </div>

        {/* Navigation form */}
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="font-bold text-white">ORIGEM</label>
            <Input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="bg-gray-100 border-gray-300 text-black rounded-full"
            />
          </div>

          <div className="space-y-2">
            <label className="font-bold text-white">DESTINO</label>
            <Input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Digite seu destino"
              className="bg-gray-100 border-gray-300 text-black rounded-full"
            />
          </div>

          <div className="space-y-2 mt-4">
            <p className="font-bold text-white">ACESSAR LOCAIS SALVOS</p>
            <div className="space-y-2">
              {savedLocations.map((location, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 p-1"
                  onClick={() => toggleLocationSelection(index)}
                >
                  <div
                    className={`w-4 h-4 border border-white flex items-center justify-center ${location.checked ? "bg-white" : ""}`}
                  >
                    {location.checked && <div className="w-2 h-2 bg-black"></div>}
                  </div>
                  <span className="text-white">{location.name}</span>
                </div>
              ))}
            </div>
          </div>
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
          { icon: <Home className="h-6 w-6 text-purple-600" />, label: "HOME", path: "/" },
          { icon: <AlertTriangle className="h-6 w-6" />, label: "EMERGÊNCIA", path: "/emergencia" },
          { icon: <Map className="h-6 w-6" />, label: "ROTAS", path: "/rotas" },
          { icon: <User className="h-6 w-6" />, label: "PERFIL", path: "/perfil" },
        ].map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className="flex flex-col items-center justify-center py-2 h-auto rounded-none"
            onClick={() => navigateTo(item.path)}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
