"use client"

import { BookOpen, MessageSquare, Phone, Home, AlertTriangle, Map, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function AjudaPage() {
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

      {/* Help content */}
      <div className="flex-grow flex flex-col bg-black text-white overflow-auto">
        <div className="p-4">
          <h1 className="text-xl font-bold mb-6 text-center">AJUDA</h1>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-white">
              <AccordionTrigger className="text-white">Como rastrear uma pessoa?</AccordionTrigger>
              <AccordionContent className="text-white">
                Para rastrear uma pessoa, toque no botão "Rastreio" na tela inicial e digite o nome da pessoa que deseja
                localizar. A pessoa deve ter compartilhado sua localização com você anteriormente.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-white">
              <AccordionTrigger className="text-white">Como usar os comandos de voz?</AccordionTrigger>
              <AccordionContent className="text-white">
                Toque no botão "Gravar comando de voz" na tela inicial. Após ouvir o sinal sonoro, diga o comando
                desejado, como "Localizar Leandro" ou "Ir para casa".
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-white">
              <AccordionTrigger className="text-white">Como gravar uma nova rota?</AccordionTrigger>
              <AccordionContent className="text-white">
                Toque no botão "Gravar Rotas" na tela inicial. Em seguida, toque em "Iniciar Gravação" e comece a se
                movimentar. Quando terminar o percurso, toque em "Finalizar" e dê um nome à rota.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="p-4 space-y-4 mt-auto">
          <Button className="w-full bg-white text-black hover:bg-gray-200 rounded-full">
            <BookOpen className="h-5 w-5 mr-3" />
            Tutorial completo
          </Button>

          <Button className="w-full bg-white text-black hover:bg-gray-200 rounded-full">
            <MessageSquare className="h-5 w-5 mr-3" />
            Fale conosco
          </Button>

          <Button className="w-full bg-white text-black hover:bg-gray-200 rounded-full">
            <Phone className="h-5 w-5 mr-3" />
            Suporte técnico
          </Button>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="grid grid-cols-4 border-t bg-white">
        {[
          { icon: <Home className="h-6 w-6" />, label: "HOME", path: "/" },
          { icon: <AlertTriangle className="h-6 w-6" />, label: "EMERGÊNCIA", path: "/emergencia" },
          { icon: <Map className="h-6 w-6" />, label: "ROTAS", path: "/rotas" },
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
