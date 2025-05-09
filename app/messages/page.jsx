"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Facebook, Instagram, Search, Send, Twitter } from "lucide-react"
import { messagesData } from "@/lib/mock-data"

export default function MessagesPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [typingMessage, setTypingMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      sender: "Alex Johnson",
      avatar: "/placeholder.svg",
      message: "Hey! I love your latest post. Could you share more details about the product?",
      time: "10:30 AM",
      isUser: false,
    },
    {
      sender: "You",
      avatar: "/placeholder.svg",
      message: "Thanks for reaching out! It's our new summer collection. What would you like to know?",
      time: "10:45 AM",
      isUser: true,
    },
    {
      sender: "Alex Johnson",
      avatar: "/placeholder.svg",
      message: "I'm interested in the pricing and available sizes. Also, do you ship internationally?",
      time: "11:02 AM",
      isUser: false,
    },
  ])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleSendMessage = () => {
    if (typingMessage.trim() === "") return

    const newMessage = {
      sender: "You",
      avatar: "/placeholder.svg",
      message: typingMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isUser: true,
    }

    setMessages([...messages, newMessage])
    setTypingMessage("")

    // Simulate response after a delay
    setTimeout(() => {
      const responseMessage = {
        sender: "Alex Johnson",
        avatar: "/placeholder.svg",
        message: "Thanks for the information! I'll check out your website for more details.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isUser: false,
      }
      setMessages((prev) => [...prev, responseMessage])
    }, 2000)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const formatTime = (time) => {
    if (typeof time === 'string') return time;
    return new Date().toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className={`transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <h1 className="text-2xl font-bold tracking-tight animate-slide-in">Messages</h1>
        <p className="text-muted-foreground animate-slide-in stagger-1">Manage your conversations across platforms</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[300px_1fr] animate-fade-in stagger-2">
        {/* Messages List Card */}
        <Card className="h-[calc(100vh-180px)] overflow-hidden hover-lift">
          <CardHeader className="px-6 pt-6 pb-4">
            <div className="relative animate-slide-in">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search messages..."
                className="w-full rounded-md border bg-background pl-8 input-focus"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="all" className="h-full">
              <TabsList className="grid w-full grid-cols-4 animate-fade-in px-6">
                <TabsTrigger value="all" className="tab-indicator">
                  All
                </TabsTrigger>
                <TabsTrigger value="twitter" className="text-[#1DA1F2] tab-indicator">
                  <Twitter className="h-4 w-4 transition-transform duration-300 hover:scale-110" />
                </TabsTrigger>
                <TabsTrigger value="instagram" className="text-[#E1306C] tab-indicator">
                  <Instagram className="h-4 w-4 transition-transform duration-300 hover:scale-110" />
                </TabsTrigger>
                <TabsTrigger value="facebook" className="text-[#4267B2] tab-indicator">
                  <Facebook className="h-4 w-4 transition-transform duration-300 hover:scale-110" />
                </TabsTrigger>
              </TabsList>
              {/* Messages List */}
              <div className="h-[calc(100%-40px)] overflow-auto px-6">
                <div className="divide-y animate-list">
                  {messagesData.map((message) => (
                    <div
                      key={message.id}
                      className="flex cursor-pointer items-center gap-3 py-3 hover:bg-muted/50 transition-all duration-300 hover:translate-x-1"
                    >
                      <Avatar className="h-10 w-10 transition-transform duration-300 hover:scale-110">
                        <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.sender} />
                        <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-medium truncate">{message.sender}</p>
                          <div className="flex items-center gap-2 shrink-0">
                            {message.platform === "Twitter" ? (
                              <Twitter className="h-3 w-3 text-[#1DA1F2]" />
                            ) : message.platform === "Instagram" ? (
                              <Instagram className="h-3 w-3 text-[#E1306C]" />
                            ) : (
                              <Facebook className="h-3 w-3 text-[#4267B2]" />
                            )}
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {new Date(message.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <p className="truncate text-sm text-muted-foreground">{message.message}</p>
                      </div>
                      {!message.read && (
                        <Badge className="ml-2 h-2 w-2 rounded-full bg-primary p-0 shrink-0 animate-pulse" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* Chat Window Card */}
        <Card className="flex h-[calc(100vh-180px)] flex-col hover-lift">
          <CardHeader className="border-b px-6 py-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 animate-bounce-in">
                <AvatarImage src="/placeholder.svg" alt="Alex Johnson" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <CardTitle className="text-base truncate">Alex Johnson</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Instagram className="h-3 w-3 text-[#E1306C]" />
                  <span className="truncate">Instagram</span>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto px-6 py-4">
            <div className="space-y-4 animate-list">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.isUser ? "flex-row-reverse" : ""} gap-3`}>
                  <Avatar className="h-8 w-8 shrink-0 animate-scale-in">
                    <AvatarImage src={msg.avatar || "/placeholder.svg"} alt={msg.sender} />
                    <AvatarFallback>{msg.sender.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className={`group relative max-w-[80%] ${msg.isUser ? "ml-12" : "mr-12"}`}>
                    <div
                      className={`rounded-lg p-3 ${
                        msg.isUser
                          ? "bg-primary text-primary-foreground animate-slide-in-right"
                          : "bg-muted animate-slide-in"
                      }`}
                    >
                      <p className="text-sm break-words">{msg.message}</p>
                    </div>
                    <span
                      className={`mt-1 text-xs opacity-0 transition-opacity group-hover:opacity-100 absolute bottom-[-18px] ${
                        msg.isUser ? "right-0 text-primary-foreground/80" : "left-0 text-muted-foreground"
                      }`}
                    >
                      {formatTime(msg.time)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <div className="border-t px-6 py-4 animate-slide-up">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                className="flex-1 input-focus"
                value={typingMessage}
                onChange={(e) => setTypingMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button 
                size="icon" 
                className="button-pop hover-glow"
                onClick={handleSendMessage}
                disabled={!typingMessage.trim()}
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
