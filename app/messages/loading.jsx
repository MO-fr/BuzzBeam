"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      <div className="transition-opacity duration-500">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="mt-2 h-4 w-96" />
      </div>

      <div className="grid gap-4 lg:grid-cols-[300px_1fr] animate-fade-in">
        {/* Sidebar Card */}
        <Card className="h-[calc(100vh-180px)] overflow-hidden">
          <CardHeader className="p-4">
            <Skeleton className="h-10 w-full" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex items-center gap-4 p-4">
              <Skeleton className="h-8 w-12" />
              <Skeleton className="h-8 w-12" />
              <Skeleton className="h-8 w-12" />
              <Skeleton className="h-8 w-12" />
            </div>
            <div className="space-y-4 p-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Chat Card */}
        <Card className="flex h-[calc(100vh-180px)] flex-col">
          <CardHeader className="border-b p-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-4">
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`flex ${i % 2 === 0 ? "" : "flex-row-reverse"} gap-3`}>
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className={`flex-1 space-y-2 ${i % 2 === 0 ? "mr-12" : "ml-12"}`}>
                    <Skeleton className={`h-20 w-full rounded-lg ${i % 2 === 0 ? "bg-muted" : "bg-primary/20"}`} />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <div className="border-t p-4">
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </Card>
      </div>
    </div>
  )
}
